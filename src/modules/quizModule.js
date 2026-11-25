// Module F: Unified 140-Question Exam Suite (90 特定技能 + 50 NGO Centrair Airside Driving License)
// Pure Trilingual: Japanese (ja) · Vietnamese (vi) · English (en) — Zero Language Mixing!
import { QUIZ_TOPICS, QUIZ_BANK, renderQuizVisualSvg } from '../data/quizBank.js';
import { NGO_DRIVING_QUIZ, renderNgoVisualSvg } from '../data/centrairNgo.js';
import { appState, saveState, updateProgressBadges, t } from '../core/state.js';

export const ALL_QUESTIONS = [...QUIZ_BANK, ...NGO_DRIVING_QUIZ];

const UNIFIED_TOPICS = {
  all: { ja: '全分野 (140問)', vi: 'Tất cả (140 câu)', en: 'All Topics (140 Qs)' },
  ngo_driving: { ja: '🚗 NGOセントレア車両運転講習 (50問)', vi: '🚗 Bằng lái Sân đỗ NGO Centrair (50 câu)', en: '🚗 NGO Centrair Airside Driving (50 Qs)' },
  turnaround: { ja: 'ターンアラウンド・GSE', vi: 'Turnaround & GSE', en: 'Turnaround & GSE' },
  pax: { ja: '旅客サービス', vi: 'Dịch vụ Hành khách', en: 'Passenger Service' },
  cargo: { ja: '貨物・ULD・危険物', vi: 'Hàng hóa, ULD & DGR', en: 'Cargo, ULD & DGR' },
  wb: { ja: '重量重心計算 (W&B)', vi: 'Weight & Balance', en: 'Weight & Balance' },
  safety: { ja: '法令・安全 (SMS/FOD)', vi: 'Pháp luật & An toàn', en: 'Law & Safety (SMS/FOD)' }
};

export const quizState = {
  mode: 'practice', // 'practice' | 'srs' | 'exam'
  topic: 'all',
  idx: 0,
  answeredMap: {},
  examType: 'ssw', // 'ssw' | 'ngo'
  examActive: false,
  examFinished: false,
  examQuestions: [],
  examAnswers: {},
  examDurationSec: 900,
  examRemainingSec: 900,
  examTimer: null
};

export function stopQuizTimer() {
  if (quizState.examTimer) {
    clearInterval(quizState.examTimer);
    quizState.examTimer = null;
  }
}

export function openNgoExamMode() {
  stopQuizTimer();
  quizState.mode = 'practice';
  quizState.topic = 'ngo_driving';
  quizState.idx = 0;
  renderQuizModule();
}

function renderVisual(visualKey) {
  if (!visualKey) return '';
  if (visualKey.startsWith('ngo_')) return renderNgoVisualSvg(visualKey);
  return renderQuizVisualSvg(visualKey);
}

function getQText(q) {
  return t(q.qJa, q.qVi, q.qEn || q.qVi);
}
function getQOpts(q) {
  if (appState.lang === 'ja') return q.optsJa;
  if (appState.lang === 'en') return q.optsEn || q.optsVi;
  return q.optsVi;
}
function getQExp(q) {
  return t(q.expJa, q.expVi, q.expEn || q.expVi);
}

function getFilteredQuestions() {
  if (quizState.mode === 'srs') {
    const wrongIds = Object.keys(appState.srsWrong || {});
    return ALL_QUESTIONS.filter(q => wrongIds.includes(q.id));
  }
  if (quizState.topic === 'all') return ALL_QUESTIONS;
  return ALL_QUESTIONS.filter(q => q.topic === quizState.topic);
}

function startTimedExam(pool, count, minutes, examType) {
  stopQuizTimer();
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
  quizState.mode = 'exam';
  quizState.examType = examType;
  quizState.examActive = true;
  quizState.examFinished = false;
  quizState.examQuestions = shuffled;
  quizState.examAnswers = {};
  quizState.idx = 0;
  quizState.examDurationSec = minutes * 60;
  quizState.examRemainingSec = minutes * 60;
  quizState.examTimer = setInterval(() => {
    quizState.examRemainingSec = Math.max(0, quizState.examRemainingSec - 1);
    const clockEl = document.getElementById('quiz-exam-clock');
    if (clockEl) {
      const m = Math.floor(quizState.examRemainingSec / 60);
      const s = String(quizState.examRemainingSec % 60).padStart(2, '0');
      clockEl.textContent = `${m}:${s}`;
    }
    if (quizState.examRemainingSec <= 0) finishTimedExam();
  }, 1000);
  renderQuizModule();
}

function finishTimedExam() {
  stopQuizTimer();
  quizState.examActive = false;
  quizState.examFinished = true;
  let correct = 0;
  quizState.examQuestions.forEach(q => {
    const pick = quizState.examAnswers[q.id];
    if (pick === q.ans) {
      correct++;
      if (appState.srsWrong[q.id]) delete appState.srsWrong[q.id];
    } else {
      appState.srsWrong[q.id] = (appState.srsWrong[q.id] || 0) + 1;
    }
  });
  const pct = quizState.examQuestions.length > 0 ? Math.round((correct / quizState.examQuestions.length) * 100) : 0;
  appState.quizStats.answered += quizState.examQuestions.length;
  appState.quizStats.correct += correct;
  if (quizState.examType === 'ngo') {
    if (appState.quizStats.bestNgoExam === null || pct > appState.quizStats.bestNgoExam) appState.quizStats.bestNgoExam = pct;
  } else {
    if (appState.quizStats.bestExam === null || pct > appState.quizStats.bestExam) appState.quizStats.bestExam = pct;
  }
  saveState();
  updateProgressBadges();
  renderQuizModule();
}

export function renderQuizModule() {
  const mount = document.getElementById('quiz-mount');
  if (!mount) return;

  const srsCount = Object.keys(appState.srsWrong || {}).length;
  const visualCount = ALL_QUESTIONS.filter(q => q.visual).length;
  const acc = appState.quizStats.answered > 0
    ? Math.round((appState.quizStats.correct / appState.quizStats.answered) * 100)
    : 0;

  let bodyHtml = '';

  if (quizState.mode === 'exam') {
    if (!quizState.examActive && !quizState.examFinished) {
      bodyHtml = `
        <div class="workspace-grid">
          <div class="card">
            <div class="card-title">
              <span class="ja">🚗 ${t('中部国際空港 (NGO) 車両運転講習 模擬試験', 'Thi thử Bằng lái Sân đỗ NGO Centrair', 'NGO Centrair Airside Driving License Mock Exam')}</span>
              <span class="badge badge-warn">PASS ≥ 80%</span>
            </div>
            <p class="ja" style="font-size:13px;color:var(--text-secondary);margin-top:0;">
              ${t('公式教材（J01〜J08）準拠の50問からランダム出題。制限速度・パス色・ERA・PBB危険区域・サービスレーン・ILS・指向信号灯・COC連絡先を完全網羅。',
                  'Ra đề ngẫu nhiên từ 50 câu chuẩn giáo trình chính thức Centrair (J01–J08): tốc độ 40/30/15/10, 5 màu thẻ Pass, ERA, PBB, Service Lane, ILS, Light Gun & COC.',
                  'Randomized from 50 official Chubu Centrair (J01–J08) questions covering speed limits, 5 pass colors, ERA, PBB danger zone, Service Lanes, ILS, Light Gun & COC.')}
            </p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;">
              <button class="btn btn-primary" id="qz-start-ngo-30">🚗 ${t('NGO運転 30問模試（25分）', 'Thi thử Bằng lái NGO 30 câu (25 phút)', 'NGO Driving 30-Q Exam (25 min)')}</button>
              <button class="btn" id="qz-start-ngo-50">🏆 ${t('NGO運転 全50問完全模試（40分）', 'Thi toàn bộ 50 câu NGO (40 phút)', 'Full 50-Q NGO Exam (40 min)')}</button>
            </div>
          </div>
          <div class="card">
            <div class="card-title">
              <span class="ja">🎓 ${t('特定技能 航空分野（グランドハンドリング）模擬試験', 'Thi thử Kỹ năng Đặc định Hàng không (Mặt đất)', 'Japan SSW Aviation Ground Handling Mock Exam')}</span>
              <span class="badge badge-accent">PASS ≥ 70%</span>
            </div>
            <p class="ja" style="font-size:13px;color:var(--text-secondary);margin-top:0;">
              ${t(`全${QUIZ_BANK.length}問（図版問題含む）からランダム出題。不正解問題は自動的にSRS復習キューへ登録されます。`,
                  `Đề ngẫu nhiên từ ${QUIZ_BANK.length} câu hỏi chuyên ngành (kèm câu hình ảnh trực quan). Câu làm sai tự động lưu vào hàng đợi ôn SRS.`,
                  `Randomized from ${QUIZ_BANK.length} SSW aviation questions with visual diagrams. Missed questions are automatically queued for SRS review.`)}
            </p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;">
              <button class="btn btn-primary" id="qz-start-15">⏱ ${t('15問スピード模試（15分）', 'Đề nhanh 15 câu (15 phút)', '15-Q Sprint Exam (15 min)')}</button>
              <button class="btn" id="qz-start-30">🎓 ${t('30問本番形式模試（30分）', 'Đề chuẩn 30 câu (30 phút)', '30-Q Full Mock Exam (30 min)')}</button>
            </div>
          </div>
        </div>
      `;
    } else if (quizState.examFinished) {
      let correct = 0;
      quizState.examQuestions.forEach(q => { if (quizState.examAnswers[q.id] === q.ans) correct++; });
      const pct = Math.round((correct / quizState.examQuestions.length) * 100);
      const passMark = quizState.examType === 'ngo' ? 80 : 70;
      const pass = pct >= passMark;
      bodyHtml = `
        <div class="card">
          <div class="alert ${pass ? 'alert-ok' : 'alert-danger'}" style="margin-bottom:14px;">
            <div style="font-size:18px;font-weight:800;">
              ${pass ? t('🎉 合格！', '🎉 ĐẠT CHUẨN!', '🎉 PASSED!') : t('⚠ 不合格（要復習）', '⚠ CHƯA ĐẠT — CẦN ÔN LẠI', '⚠ NOT PASSED — REVIEW NEEDED')}
              — ${correct} / ${quizState.examQuestions.length} (${pct}% · ${t(`合格基準 ${passMark}%`, `Điểm đỗ ${passMark}%`, `Pass mark ${passMark}%`)})
            </div>
            <div class="ja" style="font-size:12.5px;margin-top:4px;">
              ${t('不正解の問題は「SRS弱点復習」タブに自動登録されました。', 'Các câu trả lời sai đã tự động lưu vào tab Ôn lỗi sai SRS.', 'Incorrect answers have been added to your SRS review queue.')}
            </div>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
            <button class="btn btn-primary" id="qz-back-menu">↻ ${t('別の模試を選ぶ', 'Chọn đề thi khác', 'Choose Another Exam')}</button>
            <button class="btn" id="qz-go-srs">🔁 ${t(`SRS復習へ (${Object.keys(appState.srsWrong).length}問)`, `Ôn SRS (${Object.keys(appState.srsWrong).length} câu)`, `Review SRS (${Object.keys(appState.srsWrong).length})`)}</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${quizState.examQuestions.map((q, i) => {
              const pick = quizState.examAnswers[q.id];
              const ok = pick === q.ans;
              const opts = getQOpts(q);
              return `
                <div style="padding:10px 12px;border-radius:8px;border:1px solid ${ok ? 'var(--ok)' : 'var(--danger)'};background:var(--surface-2);">
                  <div style="font-size:12px;font-weight:700;color:${ok ? 'var(--ok)' : 'var(--danger)'};">
                    Q${i + 1} [${q.id}] ${ok ? t('✓ 正解', '✓ ĐÚNG', '✓ CORRECT') : t('✗ 不正解', '✗ SAI', '✗ INCORRECT')}
                  </div>
                  <div class="ja" style="font-weight:600;margin:4px 0;">${getQText(q)}</div>
                  <div style="font-size:12px;color:var(--text-secondary);">
                    ${t('正解:', 'Đáp án đúng:', 'Correct answer:')} <strong>${opts[q.ans]}</strong>
                    ${!ok && pick !== undefined ? ` | ${t('あなたの回答:', 'Bạn chọn:', 'Your answer:')} ${opts[pick]}` : ''}
                  </div>
                  <div class="ja" style="font-size:12px;margin-top:4px;color:var(--accent);">${getQExp(q)}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    } else {
      const q = quizState.examQuestions[quizState.idx];
      const opts = getQOpts(q);
      const m = Math.floor(quizState.examRemainingSec / 60);
      const s = String(quizState.examRemainingSec % 60).padStart(2, '0');
      const answeredCount = Object.keys(quizState.examAnswers).length;
      bodyHtml = `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
            <span class="badge badge-accent">Q ${quizState.idx + 1} / ${quizState.examQuestions.length} (${answeredCount} ${t('回答済', 'đã chọn', 'answered')})</span>
            <div style="display:flex;gap:8px;align-items:center;">
              <span class="badge badge-danger" style="font-family:var(--font-mono);font-size:13px;">⏱ <span id="quiz-exam-clock">${m}:${s}</span></span>
              <button class="btn btn-sm btn-primary" id="qz-finish-exam">${t('採点・提出', 'Nộp bài & Chấm điểm', 'Submit & Grade')}</button>
            </div>
          </div>
          ${q.visual ? `<div class="quiz-visual-box" style="margin-bottom:12px;">${renderVisual(q.visual)}</div>` : ''}
          <div class="ja" style="font-size:15px;font-weight:700;margin-bottom:12px;">${getQText(q)}</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${opts.map((optTxt, oi) => {
              const sel = quizState.examAnswers[q.id] === oi;
              return `
                <button class="quiz-opt ${sel ? 'selected' : ''}" data-eopt="${oi}" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid ${sel ? 'var(--accent)' : 'var(--border)'};background:${sel ? 'var(--accent-soft)' : 'var(--surface-2)'};cursor:pointer;color:var(--text-primary);">
                  <strong style="margin-right:8px;">${['A', 'B', 'C', 'D'][oi]}.</strong>
                  <span class="ja">${optTxt}</span>
                </button>
              `;
            }).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:14px;">
            <button class="btn btn-sm" id="qz-prev" ${quizState.idx === 0 ? 'disabled' : ''}>◀ ${t('前の問題', 'Câu trước', 'Previous')}</button>
            <button class="btn btn-sm btn-primary" id="qz-next" ${quizState.idx >= quizState.examQuestions.length - 1 ? 'disabled' : ''}>${t('次の問題', 'Câu tiếp', 'Next')} ▶</button>
          </div>
        </div>
      `;
    }
  } else {
    const list = getFilteredQuestions();
    if (list.length === 0) {
      bodyHtml = `
        <div class="card">
          <div class="alert alert-ok" style="margin:0;">
            🎉 ${t('SRS復習キューは空です！不正解問題はありません。', 'Hàng đợi SRS trống! Bạn chưa có câu sai nào cần ôn lại.', 'Your SRS review queue is empty — no missed questions!')}
          </div>
        </div>
      `;
    } else {
      if (quizState.idx >= list.length) quizState.idx = 0;
      const q = list[quizState.idx];
      const opts = getQOpts(q);
      const picked = quizState.answeredMap[q.id];
      const hasAnswered = picked !== undefined;
      bodyHtml = `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
              <span class="badge badge-accent">${quizState.idx + 1} / ${list.length}</span>
              <span class="badge badge-neutral">${q.id}</span>
              ${q.topic === 'ngo_driving' ? `<span class="badge badge-warn">NGO CENTRAIR</span>` : ''}
              ${q.visual ? `<span class="badge badge-ok">🖼 ${t('図版問題', 'HÌNH MINH HỌA', 'VISUAL')}</span>` : ''}
              ${appState.srsWrong[q.id] ? `<span class="badge badge-danger">SRS ×${appState.srsWrong[q.id]}</span>` : ''}
            </div>
            <div style="display:flex;gap:6px;">
              <button class="btn btn-sm" id="qz-prev" ${quizState.idx === 0 ? 'disabled' : ''}>◀</button>
              <button class="btn btn-sm" id="qz-rand" title="Random">🎲</button>
              <button class="btn btn-sm btn-primary" id="qz-next" ${quizState.idx >= list.length - 1 ? 'disabled' : ''}>▶</button>
            </div>
          </div>
          ${q.visual ? `<div class="quiz-visual-box" style="margin-bottom:12px;">${renderVisual(q.visual)}</div>` : ''}
          <div class="ja" style="font-size:15px;font-weight:700;margin-bottom:12px;line-height:1.6;">${getQText(q)}</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${opts.map((optTxt, oi) => {
              let border = 'var(--border)';
              let bg = 'var(--surface-2)';
              if (hasAnswered) {
                if (oi === q.ans) { border = 'var(--ok)'; bg = 'var(--ok-soft)'; }
                else if (oi === picked) { border = 'var(--danger)'; bg = 'var(--danger-soft)'; }
              }
              return `
                <button data-popt="${oi}" style="text-align:left;padding:10px 14px;border-radius:8px;border:1.5px solid ${border};background:${bg};cursor:pointer;color:var(--text-primary);font-size:13.5px;">
                  <strong style="margin-right:8px;">${['A', 'B', 'C', 'D'][oi]}.</strong>
                  <span class="ja">${optTxt}</span>
                </button>
              `;
            }).join('')}
          </div>
          ${hasAnswered ? `
            <div class="alert ${picked === q.ans ? 'alert-ok' : 'alert-danger'}" style="margin-top:12px;margin-bottom:0;">
              <strong>${picked === q.ans
                ? t('✓ 正解です！', '✓ CHÍNH XÁC!', '✓ CORRECT!')
                : t('✗ 不正解（SRS復習リストへ追加しました）', '✗ CHƯA ĐÚNG (Đã lưu vào hàng đợi ôn SRS)', '✗ INCORRECT (Added to SRS review queue)')}</strong>
              <div class="ja" style="margin-top:4px;font-size:13px;">${getQExp(q)}</div>
            </div>
          ` : ''}
        </div>
      `;
    }
  }

  mount.innerHTML = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:12px;">
      <div class="seg-tabs">
        <button class="seg-tab ${quizState.mode === 'practice' ? 'active' : ''}" data-qmode="practice">📘 ${t(`練習 (${ALL_QUESTIONS.length}問 · 図版${visualCount})`, `Luyện tập (${ALL_QUESTIONS.length} câu · ${visualCount} hình)`, `Practice (${ALL_QUESTIONS.length} Qs · ${visualCount} Visual)`)}</button>
        <button class="seg-tab ${quizState.mode === 'srs' ? 'active' : ''}" data-qmode="srs">🔁 ${t(`SRS弱点復習 (${srsCount})`, `Ôn lỗi sai SRS (${srsCount})`, `SRS Review (${srsCount})`)}</button>
        <button class="seg-tab ${quizState.mode === 'exam' ? 'active' : ''}" data-qmode="exam">🎓 ${t('タイマー模擬試験', 'Thi thử bấm giờ', 'Timed Mock Exams')}</button>
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <span class="badge badge-neutral">${t(`正答率 ${acc}%`, `Đúng ${acc}%`, `Accuracy ${acc}%`)}</span>
        <span class="badge badge-warn">NGO: ${appState.quizStats.bestNgoExam !== null ? appState.quizStats.bestNgoExam + '%' : '—'}</span>
        <span class="badge badge-ok">SSW: ${appState.quizStats.bestExam !== null ? appState.quizStats.bestExam + '%' : '—'}</span>
      </div>
    </div>

    ${quizState.mode === 'practice' ? `
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
        ${Object.entries(UNIFIED_TOPICS).map(([tpId, tp]) => {
          const cnt = tpId === 'all' ? ALL_QUESTIONS.length : ALL_QUESTIONS.filter(q => q.topic === tpId).length;
          return `<button class="btn btn-sm ${quizState.topic === tpId ? 'btn-primary' : ''}" data-qtop="${tpId}">${t(tp.ja, tp.vi, tp.en)}${tpId === 'all' || tpId === 'ngo_driving' ? '' : ` (${cnt})`}</button>`;
        }).join('')}
      </div>
    ` : ''}

    ${bodyHtml}
  `;

  mount.querySelectorAll('[data-qmode]').forEach(b => {
    b.onclick = () => {
      if (b.dataset.qmode !== 'exam') stopQuizTimer();
      quizState.mode = b.dataset.qmode;
      quizState.examActive = false;
      quizState.examFinished = false;
      quizState.idx = 0;
      renderQuizModule();
    };
  });
  mount.querySelectorAll('[data-qtop]').forEach(b => {
    b.onclick = () => { quizState.topic = b.dataset.qtop; quizState.idx = 0; renderQuizModule(); };
  });
  const s15 = document.getElementById('qz-start-15');
  if (s15) s15.onclick = () => startTimedExam(QUIZ_BANK, 15, 15, 'ssw');
  const s30 = document.getElementById('qz-start-30');
  if (s30) s30.onclick = () => startTimedExam(QUIZ_BANK, 30, 30, 'ssw');
  const n30 = document.getElementById('qz-start-ngo-30');
  if (n30) n30.onclick = () => startTimedExam(NGO_DRIVING_QUIZ, 30, 25, 'ngo');
  const n50 = document.getElementById('qz-start-ngo-50');
  if (n50) n50.onclick = () => startTimedExam(NGO_DRIVING_QUIZ, 50, 40, 'ngo');
  const backMenu = document.getElementById('qz-back-menu');
  if (backMenu) backMenu.onclick = () => { quizState.examActive = false; quizState.examFinished = false; renderQuizModule(); };
  const fin = document.getElementById('qz-finish-exam');
  if (fin) fin.onclick = finishTimedExam;
  const goSrs = document.getElementById('qz-go-srs');
  if (goSrs) goSrs.onclick = () => { quizState.mode = 'srs'; quizState.idx = 0; renderQuizModule(); };

  const prev = document.getElementById('qz-prev');
  if (prev) prev.onclick = () => { quizState.idx = Math.max(0, quizState.idx - 1); renderQuizModule(); };
  const next = document.getElementById('qz-next');
  if (next) next.onclick = () => { quizState.idx++; renderQuizModule(); };
  const rand = document.getElementById('qz-rand');
  if (rand) rand.onclick = () => {
    const list = getFilteredQuestions();
    quizState.idx = Math.floor(Math.random() * Math.max(1, list.length));
    renderQuizModule();
  };

  mount.querySelectorAll('[data-popt]').forEach(b => {
    b.onclick = () => {
      const list = getFilteredQuestions();
      const q = list[quizState.idx];
      if (!q) return;
      const oi = Number(b.dataset.popt);
      quizState.answeredMap[q.id] = oi;
      appState.quizStats.answered++;
      if (oi === q.ans) {
        appState.quizStats.correct++;
        if (appState.srsWrong[q.id]) delete appState.srsWrong[q.id];
      } else {
        appState.srsWrong[q.id] = (appState.srsWrong[q.id] || 0) + 1;
      }
      saveState();
      updateProgressBadges();
      renderQuizModule();
    };
  });

  mount.querySelectorAll('[data-eopt]').forEach(b => {
    b.onclick = () => {
      const q = quizState.examQuestions[quizState.idx];
      if (!q) return;
      quizState.examAnswers[q.id] = Number(b.dataset.eopt);
      renderQuizModule();
    };
  });
}
