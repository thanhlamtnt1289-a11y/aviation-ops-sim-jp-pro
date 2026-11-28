import { ALL_QUESTIONS } from './quizModule.js';
// 00. Flight Ops Hub Dashboard — Pure Trilingual JA / VI / EN · Readiness Score, NGO Centrair Shortcuts & Quick Launch
import { ROADMAP, stageProgress, isPro } from '../core/roadmap.js';
import { AIRCRAFT_PROFILES, WB_SCENARIOS } from '../data/aircraft.js';
import { QUIZ_BANK } from '../data/quizBank.js';
import { NGO_DRIVING_QUIZ, NGO_EXTRA_DICTIONARY } from '../data/centrairNgo.js';
import { OPS_DICTIONARY } from '../data/dictionary.js';
import { appState, computeOverallProgress, saveState, t } from '../core/state.js';

export function renderDashboard(actions) {
  const mount = document.getElementById('dashboard-mount');
  if (!mount) return;

  const overall = computeOverallProgress();
  const totalQ = ALL_QUESTIONS.length;
  const totalDict = OPS_DICTIONARY.length + NGO_EXTRA_DICTIONARY.length;
  const srsCount = Object.keys(appState.srsWrong || {}).length;
  const acc = appState.quizStats.answered > 0
    ? Math.round((appState.quizStats.correct / appState.quizStats.answered) * 100)
    : 0;
  const safetyDone = Object.values(appState.safetyChecked || {}).filter(Boolean).length;
  const a3dDone = (appState.airport3dSolved || []).length + ((appState.exam3dBest || 0) >= 80 ? 1 : 0);

  mount.innerHTML = `
    <div class="dash-hero">
      <div>
        <div style="font-family:var(--font-mono);font-size:11px;color:#7DD3FC;letter-spacing:0.08em;text-transform:uppercase;">
          NEXT-GEN EFB TRAINING SUITE · THREE.JS PBR · NGO CENTRAIR · PWA OFFLINE
        </div>
        <h2 class="ja" style="margin:4px 0 6px;font-size:20px;">
          ${t(
            '航空グランドハンドリング・特定技能 ＆ NGOセントレア運転 総合訓練ハブ',
            'Trung tâm Huấn luyện Nghiệp vụ Mặt đất, Kỹ năng Đặc định & Bằng lái Sân đỗ NGO Centrair',
            'Aviation Ground Handling, SSW Exam & NGO Centrair Airside Driving Training Hub'
          )}
        </h2>
        <div style="font-size:12.5px;color:#BAE6FD;">
          ${t(
            `10機種W&B・5空港Three.js 3D（影・Bloom・直接クリック）・${totalQ}問試験（NGO運転50問含む）・ライトガン＆MCA無線`,
            `10 dòng tàu bay W&B · 5 sân bay Three.js 3D · ${totalQ} câu thi (gồm 50 câu bằng lái NGO) · Light Gun & MCA Radio`,
            `10-Fleet W&B · 5-Airport Three.js PBR 3D · ${totalQ} Exam Qs (incl. 50 NGO Driving) · Light Gun & MCA Radio`
          )}
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <div style="text-align:center;padding:10px 16px;border-radius:10px;background:rgba(56,189,248,0.14);border:1px solid rgba(56,189,248,0.38);">
          <div style="font-family:var(--font-mono);font-size:10px;color:#93C5FD;">${t('総合習熟度', 'MỨC ĐỘ SẴN SÀNG', 'READINESS')}</div>
          <div style="font-family:var(--font-mono);font-size:26px;font-weight:800;color:#38BDF8;">${overall}%</div>
        </div>
        <div class="pro-only" style="display:flex;flex-direction:column;gap:6px;">
          <button class="efb-btn active" id="dash-go-uld-sim">🏗 ${t('3D ULDビルドアップ実習へ', 'Chơi Đóng hàng ULD 3D thực tế', 'Open 3D ULD Buildup Game')}</button>
          <button class="efb-btn" id="dash-go-ngo-exam">🚗 ${t('NGO車両運転 50問試験へ', 'Thi Bằng lái Sân đỗ NGO (50 câu)', 'NGO Airside Driving Exam (50Q)')}</button>
          <button class="efb-btn" id="dash-go-3d">🛫 ${t('3D空港 (Three.js) を開く', 'Mở Sân bay 3D Three.js', 'Open Three.js 3D Airport')}</button>
          <button class="efb-btn" id="dash-go-wb">⚖ ${t('W&B + 3D分割画面へ', 'Mở W&B + 3D song song', 'Open W&B + Split 3D')}</button>
        </div>
      </div>
    </div>

    <div class="roadmap-head">
      <h3 class="ja">🧭 ${t('受験ロードマップ：1号 → GSE運転 → 搭載 → 2号', 'Lộ trình thi: Số 1 → Bằng lái GSE → Xếp hàng → Số 2', 'Certification path: SSW (i) → GSE permit → Loading → SSW (ii)')}</h3>
      <span class="badge badge-neutral" style="font-family:var(--font-sans);">${isPro() ? 'Pro' : t('初心者モード', 'Chế độ Người mới', 'Beginner mode')}</span>
    </div>
    <div class="roadmap-grid">
      ${ROADMAP.map(st => {
        const pct = stageProgress(st.id);
        const isCur = (appState.activeStage || 'tg1') === st.id;
        const items = st.items.filter(it => isPro() || !it.pro);
        const resumeItem = items.find(it => it.id === appState.navItem) || items[0];
        return `
          <div class="roadmap-card ${isCur ? 'current' : ''} ${pct >= 100 ? 'done' : ''}" data-rm-card="${st.id}">
            <div class="roadmap-card-top">
              <span class="stage-no">${pct >= 100 ? '✓' : st.no}</span>
              <div style="min-width:0;">
                <div class="ja roadmap-card-title" style="font-weight:800;font-size:14px;">${t(st.ja, st.vi, st.en)}</div>
                <div class="ja roadmap-card-sub" style="font-size:11.5px;color:var(--text-muted);">${t(st.subJa, st.subVi, st.subEn)}</div>
              </div>
            </div>
            <div class="stage-bar" style="margin:10px 0 8px;border-radius:3px;"><i style="width:${pct}%"></i></div>
            <div style="font-family:var(--font-mono);font-size:11px;color:var(--text-secondary);margin-bottom:8px;">${pct}% ${t('完了', 'hoàn thành', 'complete')}</div>
            ${resumeItem ? `<button class="btn btn-primary rm-mobile-cta" data-rm="${resumeItem.id}">▶ ${t('続ける', 'Tiếp tục', 'Continue')} · ${t(resumeItem.ja, resumeItem.vi, resumeItem.en)}</button>` : ''}
            <button class="btn rm-mobile-toggle" data-rm-toggle="${st.id}" aria-expanded="false">
              <span>${t(`全${items.length}項目を表示`, `Xem ${items.length} mục học`, `View ${items.length} items`)}</span>
              <span>▾</span>
            </button>
            <div class="roadmap-items">
              ${items.map(it => `<button class="roadmap-item ${it.exam ? 'exam' : ''}" data-rm="${it.id}"><span>${it.icon}</span><span>${t(it.ja, it.vi, it.en)}</span></button>`).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>

    <div class="pro-only">
    <div class="dash-grid">
      <button class="dash-tile" data-nav="wb">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="badge badge-accent">W&amp;B · 10 FLEET</span>
          <strong style="font-family:var(--font-mono);color:var(--accent);">${appState.wbSolved.length} / ${WB_SCENARIOS.length}</strong>
        </div>
        <div class="ja" style="font-weight:700;margin-top:8px;">${t('D. 重量重心・離陸性能・誤計算ラボ', 'D. Weight & Balance + Xem 3D song song', 'D. Weight & Balance + Split 3D')}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">
          ${t(`${Object.keys(AIRCRAFT_PROFILES).length}機種・気象/滑走路性能・LMC未申告シミュレーション`, `${Object.keys(AIRCRAFT_PROFILES).length} dòng tàu bay · Thời tiết/Đường băng · Hậu quả tính sai tải`, `${Object.keys(AIRCRAFT_PROFILES).length} aircraft · Weather/runway perf · Miscalculation lab`)}
        </div>
      </button>

      <button class="dash-tile" data-nav="airport3d">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="badge badge-ok">THREE.JS PBR</span>
          <strong style="font-family:var(--font-mono);color:var(--ok);">${a3dDone} / 4</strong>
        </div>
        <div class="ja" style="font-weight:700;margin-top:8px;">${t('G. 5空港 3Dシミュレーター ＆ NGO運転実習', 'G. Sân bay 3D PBR & Lái xe NGO Centrair', 'G. 3D Airport PBR & NGO Driving Sim')}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">
          ${t('サービスレーン・PBB危険区域・3.8m制限・場周道路ILS・FOD直接クリック', 'Service Lane, PBB gạch chéo đỏ, giới hạn 3.8m, ILS, click FOD trực tiếp', 'Service Lane, PBB danger zone, 3.8m limit, ILS lamp & direct 3D clicks')}
        </div>
      </button>

      <button class="dash-tile" data-nav="quiz">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="badge ${srsCount > 0 ? 'badge-danger' : 'badge-ok'}">${srsCount > 0 ? t(`SRS要復習 ${srsCount}問`, `Ôn SRS: ${srsCount} câu`, `SRS Due: ${srsCount}`) : 'SRS CLEAR'}</span>
          <strong style="font-family:var(--font-mono);">${appState.quizStats.bestNgoExam !== null ? 'NGO ' + appState.quizStats.bestNgoExam + '%' : acc + '%'}</strong>
        </div>
        <div class="ja" style="font-weight:700;margin-top:8px;">${t(`F. 特定技能＆NGO運転 模擬試験 (${totalQ}問)`, `F. Ôn thi Kỹ năng Đặc định & Lái xe NGO (${totalQ} câu)`, `F. SSW & NGO Driving Exam Bank (${totalQ} Qs)`)}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">
          ${t('公式NGO運転50問＋特定技能110問・図版SVG 32問・タイマー模試', '50 câu chuẩn giáo trình NGO + 110 câu JEAE · 32 hình SVG', '50 official NGO driving + 110 JEAE SSW questions · 32 SVG visuals')}
        </div>
      </button>

      <button class="dash-tile" data-nav="ops">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="badge badge-warn">FIELD DRILLS</span>
          <strong style="font-family:var(--font-mono);">${totalDict} ${t('語', 'từ', 'terms')}</strong>
        </div>
        <div class="ja" style="font-weight:700;margin-top:8px;">${t('H. ライトガン・MCA無線・NGO早見表・辞典', 'H. Light Gun, MCA Radio, Sổ tay NGO & Từ điển', 'H. Light Gun, MCA Radio, NGO Guide & Dict')}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">
          ${t('指向信号灯5信号ドリル・フォネティック・COC連絡先・3言語音声辞典', '5 tín hiệu Light Gun · Bảng Phonetic · Số khẩn COC · Từ điển 3 ngôn ngữ', '5-signal Light Gun drill · ICAO Phonetic · COC hotline · Trilingual dict')}
        </div>
      </button>
    </div>

    <div class="workspace-grid">
      <div class="card">
        <div class="card-title">
          <span class="ja">${t('実務モジュール ＆ NGO公式ツール クイックアクセス', 'Truy cập nhanh các Module Nghiệp vụ & Công cụ NGO', 'Quick Access — Ground Ops & NGO Tools')}</span>
          <span class="badge badge-neutral">⌘K / Ctrl+K</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button class="btn" id="dash-go-lg">🔦 ${t('ライトガン 5信号ドリル', 'Luyện Đèn Light Gun', 'Light Gun 5-Signal Drill')}</button>
          <button class="btn" id="dash-go-guide">📘 ${t('NGO運転 7段階速度＆パス表', 'Sổ tay Tốc độ & Thẻ Pass NGO', 'NGO Speed & Pass Guide')}</button>
          <button class="btn" data-nav="turnaround">⏱ A. ${t('ターンアラウンド', 'Turnaround', 'Turnaround')} (${appState.taBestScore !== null ? appState.taBestScore + 'pt' : 'Start'})</button>
          <button class="btn" data-nav="pax">🧳 B. ${t('旅客サービス', 'Hành khách', 'Passenger')} (${appState.paxSolved.length}/5)</button>
          <button class="btn" data-nav="cargo">🏗 C. ${t('3D ULD・貨物・DGR', 'Đóng ULD 3D & DGR', '3D ULD & DGR')} (${appState.cargoSolved.length + (appState.uldSolved || []).length}/11)</button>
          <button class="btn" data-nav="safety">🛡 E. ${t('安全・SMS', 'An toàn SMS', 'Safety / SMS')} (${safetyDone}/16)</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span class="ja">${t('高速アクセス ＆ 3言語切替・PWA案内', 'Mẹo truy cập siêu tốc, Đổi 3 ngôn ngữ & Cài App PWA', 'Fast Access, Trilingual Mode & Offline PWA')}</span>
        </div>
        <ul style="margin:0;padding-left:18px;font-size:12.5px;color:var(--text-secondary);">
          <li class="ja"><strong>Ctrl+K / ⌘K:</strong> ${t('機種名（B77F）・NGO規則（ERA/ILS/COC）・用語を一発検索ジャンプ', 'Tìm nhanh máy bay (B77F), luật NGO (ERA/ILS/COC) hoặc thuật ngữ tức thì', 'Instant jump to any aircraft (B77F), NGO rule (ERA/ILS/COC), or glossary term')}</li>
          <li class="ja"><strong>JA / VI / EN:</strong> ${t('右上の言語ボタンで日本語・ベトナム語・英語を混在なしで即座に切替可能', 'Đổi sạch hoàn toàn giữa Tiếng Nhật, Tiếng Việt và Tiếng Anh ở góc trên bên phải', 'Switch cleanly between Japanese, Vietnamese, and English with zero language mixing')}</li>
          <li class="ja"><strong>PWA Offline:</strong> ${t('Safari/Chromeの「ホーム画面に追加」でiPad・スマホアプリとしてオフライン利用可能', 'Chọn "Add to Home Screen / Install App" trên iPad/Chrome để mở 1 chạm không cần mạng', 'Use "Add to Home Screen / Install App" for 1-tap offline access on iPad, mobile, or desktop')}</li>
        </ul>
      </div>
    </div>
    </div>
  `;

  mount.querySelectorAll('[data-nav]').forEach(el => { el.onclick = () => actions.go(el.dataset.nav); });
  mount.querySelectorAll('[data-rm]').forEach(el => {
    el.onclick = () => {
      for (const st of ROADMAP) {
        const it = st.items.find(x => x.id === el.dataset.rm);
        if (it) { appState.navItem = it.id; appState.activeStage = st.id; saveState(); actions.goRoadmap(it); return; }
      }
    };
  });
  mount.querySelectorAll('[data-rm-toggle]').forEach(btn => {
    btn.onclick = () => {
      const card = mount.querySelector(`[data-rm-card="${btn.dataset.rmToggle}"]`);
      if (!card) return;
      const open = card.classList.toggle('rm-expanded');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
  });
  const bUld = document.getElementById('dash-go-uld-sim');
  if (bUld) bUld.onclick = () => actions.openUldBuildup();
  const bNgo = document.getElementById('dash-go-ngo-exam');
  if (bNgo) bNgo.onclick = () => actions.openNgoExam();
  const b3d = document.getElementById('dash-go-3d');
  if (b3d) b3d.onclick = () => actions.go('airport3d');
  const bwb = document.getElementById('dash-go-wb');
  if (bwb) bwb.onclick = () => actions.openWbWithSplit3D();
  const bLg = document.getElementById('dash-go-lg');
  if (bLg) bLg.onclick = () => actions.openLightGun();
  const bGd = document.getElementById('dash-go-guide');
  if (bGd) bGd.onclick = () => actions.openNgoGuide();
}
