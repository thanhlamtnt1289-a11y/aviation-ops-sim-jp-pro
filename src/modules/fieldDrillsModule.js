// Module H: Marshalling, Headset Pushback, Interactive Light Gun Drill, MCA Radio + Phonetic, NGO Rules & 92-Term Trilingual Dictionary
import { OPS_DICTIONARY, OPS_MARSHALLING_SIGNALS, OPS_PUSHBACK_STEPS } from '../data/dictionary.js';
import {
  NGO_LIGHT_GUN_SIGNALS, ICAO_PHONETIC_CODE, NGO_MCA_RADIO_DRILLS,
  NGO_QUICK_REFERENCE, NGO_EXTRA_DICTIONARY, renderNgoVisualSvg
} from '../data/centrairNgo.js';
import { renderQuizVisualSvg } from '../data/quizBank.js';
import { a3dAudio, speakJapaneseTerm } from '../engines/audioEngine.js';
import { appState, saveState, t } from '../core/state.js';

export const FULL_DICTIONARY = [...OPS_DICTIONARY, ...NGO_EXTRA_DICTIONARY];

export const opsState = {
  subtab: 'lightgun', // 'lightgun' | 'mca' | 'ngoguide' | 'marshal' | 'pushback' | 'dict'
  // Light Gun drill state
  lgMode: 'study', // 'study' | 'drill'
  lgIdx: 0,
  lgAnswered: null,
  lgScore: 0,
  // MCA Radio state
  mcaIdx: 0,
  mcaChosen: null,
  // Marshalling state
  marshalMode: 'study',
  marshalQuizIdx: 0,
  marshalScore: 0,
  marshalAnswered: null,
  // Pushback state
  pbStepIdx: 0,
  pbChosen: null,
  pbScore: 0,
  // Dictionary state
  dictQuery: '',
  dictCat: 'all'
};

export function openFieldSubtab(tab) {
  const valid = ['lightgun', 'mca', 'ngoguide', 'marshal', 'pushback', 'dict'];
  opsState.subtab = valid.includes(tab) ? tab : 'lightgun';
  renderFieldDrillsModule();
}

export function openDictionaryQuery(q) {
  opsState.subtab = 'dict';
  opsState.dictCat = 'all';
  opsState.dictQuery = q || '';
  renderFieldDrillsModule();
}

function renderLightGunLamp(sig) {
  const animStyle = sig.mode === 'flash'
    ? 'animation: lgFlash 0.85s infinite;'
    : (sig.mode === 'alt' ? 'animation: lgAlt 0.9s infinite;' : '');
  const glow = sig.mode === 'alt' ? '0 0 28px #F59E0B' : `0 0 32px ${sig.color}`;
  return `
    <style>
      @keyframes lgFlash { 0%,45%{opacity:1;transform:scale(1);} 50%,95%{opacity:0.15;transform:scale(0.92);} 100%{opacity:1;} }
      @keyframes lgAlt { 0%,48%{background:#EF4444;box-shadow:0 0 32px #EF4444;} 52%,100%{background:#22C55E;box-shadow:0 0 32px #22C55E;} }
    </style>
    <div style="display:flex;align-items:center;justify-content:center;padding:20px;border-radius:12px;background:#090F1D;border:2px solid #334155;">
      <div style="width:82px;height:82px;border-radius:50%;background:${sig.color};box-shadow:${glow};border:4px solid #E2E8F0;${animStyle}"></div>
    </div>
  `;
}

export function renderFieldDrillsModule() {
  const mount = document.getElementById('ops-mount');
  if (!mount) return;

  const tabsHtml = `
    <div class="subtabs">
      <button class="subtab ${opsState.subtab === 'lightgun' ? 'active' : ''}" data-ost="lightgun">🔦 ${t('1. 指向信号灯 (ライトガン)', '1. Đèn Light Gun (5 tín hiệu)', '1. ATC Light Gun Drill')}</button>
      <button class="subtab ${opsState.subtab === 'mca' ? 'active' : ''}" data-ost="mca">📻 ${t('2. MCA無線・フォネティック', '2. MCA Radio & Phonetic', '2. MCA Radio & Phonetic')}</button>
      <button class="subtab ${opsState.subtab === 'ngoguide' ? 'active' : ''}" data-ost="ngoguide">📘 ${t('3. NGOセントレア運転早見表', '3. Sổ tay Luật Lái xe NGO', '3. NGO Centrair Quick Guide')}</button>
      <button class="subtab ${opsState.subtab === 'marshal' ? 'active' : ''}" data-ost="marshal">🚧 ${t('4. マーシャリング (8種)', '4. Marshalling (8 tín hiệu)', '4. Marshalling Signals (8)')}</button>
      <button class="subtab ${opsState.subtab === 'pushback' ? 'active' : ''}" data-ost="pushback">🎧 ${t('5. プッシュバック交信', '5. Headset Pushback', '5. Pushback Intercom')}</button>
      <button class="subtab ${opsState.subtab === 'dict' ? 'active' : ''}" data-ost="dict">📖 ${t(`6. 3言語航空辞典 (${FULL_DICTIONARY.length}語)`, `6. Từ điển 3 Ngôn ngữ (${FULL_DICTIONARY.length} từ)`, `6. Trilingual Dictionary (${FULL_DICTIONARY.length})`)}</button>
    </div>
  `;

  if (opsState.subtab === 'lightgun') {
    const sig = NGO_LIGHT_GUN_SIGNALS[opsState.lgIdx % NGO_LIGHT_GUN_SIGNALS.length];
    mount.innerHTML = tabsHtml + `
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn btn-sm ${opsState.lgMode === 'study' ? 'btn-primary' : ''}" id="lg-mode-study">${t('5信号 発光確認カード', 'Thẻ học 5 tín hiệu phát sáng', '5-Signal Study Cards')}</button>
        <button class="btn btn-sm ${opsState.lgMode === 'drill' ? 'btn-primary' : ''}" id="lg-mode-drill">${t('無線故障時 瞬時判別ドリル', 'Bài test phản xạ khi mất sóng radio', 'Radio-Failure Reflex Drill')}</button>
      </div>
      ${opsState.lgMode === 'study' ? `
        <div class="alert alert-warn" style="margin-bottom:12px;font-size:12.5px;">
          ${t('着陸帯等で管制塔（TWR）との無線通信ができなくなった場合、必ず指向信号灯（ライトガン）の指示に従わなければなりません。',
              'Khi mất liên lạc bộ đàm với Đài kiểm soát (TWR) trên đường băng/đường lăn, bắt buộc phải tuân thủ tín hiệu đèn Light Gun.',
              'If radio contact with Control Tower (TWR) is lost on a runway or taxiway, you must strictly obey ATC Light Gun signals.')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px;">
          ${NGO_LIGHT_GUN_SIGNALS.map(s => `
            <div class="card" style="margin-bottom:0;">
              ${renderLightGunLamp(s)}
              <div style="font-weight:800;font-size:14px;color:var(--accent);margin-top:10px;">${t(s.labelJa, s.labelVi, s.labelEn)}</div>
              <div class="ja" style="font-weight:700;font-size:14px;margin-top:4px;">${t(s.meaningJa, s.meaningVi, s.meaningEn)}</div>
              <div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:5px;">${t(s.detailJa, s.detailVi, s.detailEn)}</div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="workspace-grid">
          <div class="card">
            <div class="card-title">
              <span class="ja">${t('管制塔から照射されたライトガンの指示を選択してください', 'Chọn đúng mệnh lệnh của tín hiệu Light Gun từ Đài kiểm soát')}</span>
              <span class="badge badge-accent">${(opsState.lgIdx % 5) + 1} / 5</span>
            </div>
            <div style="margin:12px 0;">${renderLightGunLamp(sig)}</div>
            <div style="text-align:center;font-weight:700;margin-bottom:10px;color:var(--accent);">${t(sig.labelJa, sig.labelVi, sig.labelEn)}</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${NGO_LIGHT_GUN_SIGNALS.map(o => {
                let cls = '';
                if (opsState.lgAnswered !== null) cls = o.id === sig.id ? 'correct' : (o.id === opsState.lgAnswered ? 'wrong' : '');
                return `<button class="quiz-opt ${cls}" data-lgans="${o.id}" ${opsState.lgAnswered !== null ? 'disabled' : ''}>${t(o.meaningJa, o.meaningVi, o.meaningEn)}</button>`;
              }).join('')}
            </div>
            ${opsState.lgAnswered !== null ? `
              <div class="alert ${opsState.lgAnswered === sig.id ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(sig.detailJa, sig.detailVi, sig.detailEn)}</div>
              <button class="btn btn-sm btn-primary" id="lg-next">${t('次の信号 →', 'Tín hiệu tiếp →', 'Next Signal →')}</button>
            ` : ''}
          </div>
          <div class="card">
            <div class="card-title"><span>${t('ライトガン判別スコア', 'Điểm phản xạ Light Gun', 'Light Gun Drill Score')}</span></div>
            <div class="kpi-grid">
              <div class="kpi-box ok"><div class="kpi-label">${t('現在スコア', 'Hiện tại', 'Score')}</div><div class="kpi-val">${opsState.lgScore}</div></div>
              <div class="kpi-box"><div class="kpi-label">${t('最高記録', 'Cao nhất', 'Best')}</div><div class="kpi-val">${appState.opsBestLightGun || 0}</div></div>
            </div>
          </div>
        </div>
      `}
    `;
    document.getElementById('lg-mode-study').onclick = () => { opsState.lgMode = 'study'; renderFieldDrillsModule(); };
    document.getElementById('lg-mode-drill').onclick = () => { opsState.lgMode = 'drill'; opsState.lgAnswered = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-lgans]').forEach(b => {
      b.onclick = () => {
        opsState.lgAnswered = b.dataset.lgans;
        if (b.dataset.lgans === sig.id) {
          opsState.lgScore += 1;
          a3dAudio.playChirp();
          if (opsState.lgScore > (appState.opsBestLightGun || 0)) { appState.opsBestLightGun = opsState.lgScore; saveState(); }
        } else {
          a3dAudio.playBeep(360, 0.2);
        }
        renderFieldDrillsModule();
      };
    });
    const lgn = document.getElementById('lg-next');
    if (lgn) lgn.onclick = () => { opsState.lgIdx = (opsState.lgIdx + 1) % NGO_LIGHT_GUN_SIGNALS.length; opsState.lgAnswered = null; renderFieldDrillsModule(); };
  } else if (opsState.subtab === 'mca') {
    const st = NGO_MCA_RADIO_DRILLS[opsState.mcaIdx];
    mount.innerHTML = tabsHtml + `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title">
            <span class="ja">${t(st.phaseJa, st.phaseVi, st.phaseEn)}</span>
            <span class="badge badge-accent">STEP ${st.step} / ${NGO_MCA_RADIO_DRILLS.length}</span>
          </div>
          <div class="radio-bar" style="margin-bottom:12px;"><span class="radio-dot"></span><strong style="color:#38BDF8;">[MCA RADIO]</strong><span class="ja">${st.towerLine}</span></div>
          <p class="ja" style="font-weight:700;margin:0 0 10px;">${t(st.qJa, st.qVi, st.qEn)}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${st.opts.map((o, idx) => {
              let cls = '';
              if (opsState.mcaChosen !== null) cls = o.ok ? 'correct' : (opsState.mcaChosen === idx ? 'wrong' : '');
              return `<button class="quiz-opt ${cls}" data-mca="${idx}" ${opsState.mcaChosen !== null ? 'disabled' : ''}>${String.fromCharCode(65 + idx)}. ${t(o.ja, o.vi, o.en)}</button>`;
            }).join('')}
          </div>
          ${opsState.mcaChosen !== null ? `
            <div class="alert ${st.opts[opsState.mcaChosen].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(st.expJa, st.expVi, st.expEn)}</div>
            <button class="btn btn-sm btn-primary" id="mca-next">${opsState.mcaIdx < NGO_MCA_RADIO_DRILLS.length - 1 ? t('次の手順 →', 'Bước tiếp theo →', 'Next Step →') : t('最初から復習', 'Luyện lại từ đầu', 'Restart Drill')}</button>
          ` : ''}
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🔤 ${t('世界共通フォネティックコード表 (クリックで発音)', 'Bảng ICAO Phonetic Code (Click để nghe phát âm)', 'ICAO Phonetic Alphabet (Click to Speak)')}</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(108px,1fr));gap:6px;max-height:460px;overflow-y:auto;">
            ${ICAO_PHONETIC_CODE.map(([ch, word, kana]) => `
              <button class="btn btn-sm" data-phon="${kana}" style="justify-content:space-between;padding:6px 8px;height:auto;">
                <strong style="font-family:var(--font-mono);color:var(--accent);">${ch}</strong>
                <span style="font-size:11.5px;">${word}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    mount.querySelectorAll('[data-mca]').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.mca);
        opsState.mcaChosen = idx;
        if (st.opts[idx].ok) a3dAudio.playChirp(); else a3dAudio.playBeep(360, 0.2);
        renderFieldDrillsModule();
      };
    });
    const mcan = document.getElementById('mca-next');
    if (mcan) mcan.onclick = () => { opsState.mcaIdx = (opsState.mcaIdx + 1) % NGO_MCA_RADIO_DRILLS.length; opsState.mcaChosen = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-phon]').forEach(b => { b.onclick = () => speakJapaneseTerm(b.dataset.phon); });
  } else if (opsState.subtab === 'ngoguide') {
    const ref = NGO_QUICK_REFERENCE;
    mount.innerHTML = tabsHtml + `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title"><span class="ja">⚡ ${t('NGOセントレア 制限速度一覧（7区分）', 'Bảng 7 Mức Tốc độ Giới hạn NGO Centrair', 'NGO Centrair 7-Tier Speed Limits')}</span></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>${t('区域・条件', 'Khu vực / Điều kiện', 'Area / Condition')}</th><th>${t('制限速度', 'Tốc độ', 'Limit')}</th><th>${t('要点', 'Lưu ý', 'Key Rule')}</th></tr></thead>
              <tbody>
                ${ref.speeds.map(s => `
                  <tr>
                    <td class="ja" style="font-weight:600;">${t(s.areaJa, s.areaVi, s.areaEn)}</td>
                    <td style="font-family:var(--font-mono);font-weight:800;color:var(--accent);white-space:nowrap;">${s.limit}</td>
                    <td class="ja" style="font-size:12px;">${t(s.noteJa, s.noteVi, s.noteEn)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🪪 ${t('制限区域立入証（5色のパス）', '5 Loại Màu Thẻ Ra Vào Khu Hạn Chế', '5 Restricted Area Pass Colors')}</span></div>
          <div style="margin-bottom:10px;">${renderNgoVisualSvg('ngo_pass_colors')}</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${ref.passes.map(p => `
              <div style="padding:8px 10px;border-radius:8px;border-left:5px solid ${p.color};background:var(--surface-2);font-size:12.5px;">
                <div style="display:flex;justify-content:space-between;"><strong>${t(p.nameJa, p.nameVi, p.nameEn)}</strong><span class="badge badge-neutral">${p.issuer}</span></div>
                <div class="ja" style="color:var(--text-secondary);margin-top:2px;">${t(p.scopeJa, p.scopeVi, p.scopeEn)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="workspace-grid" style="margin-top:14px;">
        <div class="card">
          <div class="card-title"><span class="ja">🛫 ${t('プッシュバック・自走アウト 6つの合図', '6 Dấu hiệu Pushback & Tàu bay tự chạy ra', '6 Indicators of Pushback & Self-Taxi-Out')}</span></div>
          <ol style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;font-size:13px;">
            ${ref.pushbackSigns.map(s => `<li class="ja">${t(s.ja, s.vi, s.en)}</li>`).join('')}
          </ol>
          <div style="margin-top:12px;">${renderNgoVisualSvg('ngo_front_priority')}</div>
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🚨 ${t(ref.coc.nameJa, ref.coc.nameVi, ref.coc.nameEn)}</span><span class="badge badge-danger">${ref.coc.tel}</span></div>
          <ul style="margin:0 0 12px;padding-left:18px;display:flex;flex-direction:column;gap:5px;font-size:12.5px;">
            ${t(ref.coc.itemsJa, ref.coc.itemsVi, ref.coc.itemsEn).map(it => `<li class="ja">${it}</li>`).join('')}
          </ul>
          <div>${renderNgoVisualSvg('ngo_ils_sign')}</div>
        </div>
      </div>
    `;
  } else if (opsState.subtab === 'marshal') {
    const sig = OPS_MARSHALLING_SIGNALS[opsState.marshalQuizIdx % OPS_MARSHALLING_SIGNALS.length];
    const opts = [sig];
    OPS_MARSHALLING_SIGNALS.forEach(s => { if (opts.length < 4 && s.id !== sig.id) opts.push(s); });
    opts.sort((a, b) => a.id.localeCompare(b.id));

    mount.innerHTML = tabsHtml + `
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <button class="btn btn-sm ${opsState.marshalMode === 'study' ? 'btn-primary' : ''}" id="m-mode-study">${t('学習カード', 'Thẻ học trực quan', 'Study Cards')}</button>
        <button class="btn btn-sm ${opsState.marshalMode === 'drill' ? 'btn-primary' : ''}" id="m-mode-drill">${t('瞬時判別ドリル', 'Bài tập phản xạ', 'Reflex Drill')}</button>
      </div>
      ${opsState.marshalMode === 'study' ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px;">
          ${OPS_MARSHALLING_SIGNALS.map(s => `
            <div class="card" style="margin-bottom:0;">
              <div style="margin-bottom:8px;">${renderQuizVisualSvg(s.id)}</div>
              <div style="font-weight:700;font-size:13.5px;color:var(--accent);">${t(s.ja, s.vi, s.en)}</div>
              <div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${t(s.descJa, s.descVi, s.en)}</div>
              <button class="btn btn-sm" style="margin-top:8px;" data-speak="${s.ja}">🔊 JA</button>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="workspace-grid">
          <div class="card">
            <div class="card-title"><span class="ja">${t('合図の意味を選択', 'Chọn ý nghĩa tín hiệu', 'Select Signal Meaning')}</span><span class="badge badge-accent">${(opsState.marshalQuizIdx % 8) + 1}/8</span></div>
            <div style="margin:12px 0;">${renderQuizVisualSvg(sig.id)}</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${opts.map(o => {
                let cls = '';
                if (opsState.marshalAnswered !== null) cls = o.id === sig.id ? 'correct' : (o.id === opsState.marshalAnswered ? 'wrong' : '');
                return `<button class="quiz-opt ${cls}" data-mans="${o.id}" ${opsState.marshalAnswered !== null ? 'disabled' : ''}>${t(o.ja, o.vi, o.en)}</button>`;
              }).join('')}
            </div>
            ${opsState.marshalAnswered !== null ? `<div class="alert ${opsState.marshalAnswered === sig.id ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(sig.descJa, sig.descVi, sig.en)}</div><button class="btn btn-sm btn-primary" id="m-next">${t('次へ →', 'Tiếp →', 'Next →')}</button>` : ''}
          </div>
          <div class="card"><div class="card-title"><span>${t('スコア', 'Điểm số', 'Score')}</span></div><div class="kpi-grid"><div class="kpi-box ok"><div class="kpi-label">${t('現在', 'Hiện tại', 'Score')}</div><div class="kpi-val">${opsState.marshalScore}</div></div><div class="kpi-box"><div class="kpi-label">${t('最高', 'Cao nhất', 'Best')}</div><div class="kpi-val">${appState.opsBestMarshal || 0}</div></div></div></div>
        </div>
      `}
    `;
    document.getElementById('m-mode-study').onclick = () => { opsState.marshalMode = 'study'; renderFieldDrillsModule(); };
    document.getElementById('m-mode-drill').onclick = () => { opsState.marshalMode = 'drill'; opsState.marshalAnswered = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-speak]').forEach(b => { b.onclick = () => speakJapaneseTerm(b.dataset.speak); });
    mount.querySelectorAll('[data-mans]').forEach(b => {
      b.onclick = () => {
        opsState.marshalAnswered = b.dataset.mans;
        if (b.dataset.mans === sig.id) {
          opsState.marshalScore += 1;
          if (opsState.marshalScore > (appState.opsBestMarshal || 0)) { appState.opsBestMarshal = opsState.marshalScore; saveState(); }
        }
        renderFieldDrillsModule();
      };
    });
    const mn = document.getElementById('m-next');
    if (mn) mn.onclick = () => { opsState.marshalQuizIdx = (opsState.marshalQuizIdx + 1) % 8; opsState.marshalAnswered = null; renderFieldDrillsModule(); };
  } else if (opsState.subtab === 'pushback') {
    const st = OPS_PUSHBACK_STEPS[opsState.pbStepIdx];
    mount.innerHTML = tabsHtml + `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title"><span class="ja">${t(st.phaseJa, st.phaseVi, `Pushback Step ${st.step}`)}</span><span class="badge badge-accent">STEP ${st.step}/5</span></div>
          <div class="radio-bar" style="margin-bottom:12px;"><span class="radio-dot"></span><strong style="color:#38BDF8;">[INTERCOM]</strong><span>${st.pilotLine}</span></div>
          <p class="ja" style="font-weight:600;margin:0 0 10px;">${t(st.qJa, st.qVi, st.qVi)}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${st.opts.map((o, idx) => {
              let cls = '';
              if (opsState.pbChosen !== null) cls = o.ok ? 'correct' : (opsState.pbChosen === idx ? 'wrong' : '');
              return `<button class="quiz-opt ${cls}" data-pb="${idx}" ${opsState.pbChosen !== null ? 'disabled' : ''}>${String.fromCharCode(65 + idx)}. ${t(o.ja, o.vi, o.vi)}</button>`;
            }).join('')}
          </div>
          ${opsState.pbChosen !== null ? `<div class="alert ${st.opts[opsState.pbChosen].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(st.expJa, st.expVi, st.expVi)}</div><button class="btn btn-sm btn-primary" id="pb-next">${opsState.pbStepIdx < 4 ? t('次へ →', 'Bước tiếp →', 'Next Step →') : t('最初から', 'Làm lại', 'Restart')}</button>` : ''}
        </div>
        <div class="card">
          <div class="card-title"><span>${t('プッシュバック手順', 'Quy trình Pushback', 'Pushback Intercom Flow')}</span></div>
          ${OPS_PUSHBACK_STEPS.map((s, i) => `<div class="timeline-item ${i < opsState.pbStepIdx ? 'done' : ''}" style="margin-bottom:6px;padding:8px 10px;"><div class="timeline-step-num">${s.step}</div><div style="font-size:12.5px;">${t(s.phaseJa, s.phaseVi, `Step ${s.step}`)}</div></div>`).join('')}
        </div>
      </div>
    `;
    mount.querySelectorAll('[data-pb]').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.pb);
        opsState.pbChosen = idx;
        if (st.opts[idx].ok) {
          opsState.pbScore += 1;
          a3dAudio.playChirp();
          if (opsState.pbStepIdx === 4) { appState.opsPushbackDone = true; saveState(); }
        }
        renderFieldDrillsModule();
      };
    });
    const pn = document.getElementById('pb-next');
    if (pn) pn.onclick = () => {
      if (opsState.pbStepIdx < 4) opsState.pbStepIdx += 1;
      else { opsState.pbStepIdx = 0; opsState.pbScore = 0; }
      opsState.pbChosen = null;
      renderFieldDrillsModule();
    };
  } else {
    const q = (opsState.dictQuery || '').trim().toLowerCase();
    const filtered = FULL_DICTIONARY.filter(d => (opsState.dictCat === 'all' || d.cat === opsState.dictCat) && (!q || d.ja.toLowerCase().includes(q) || d.kana.toLowerCase().includes(q) || d.en.toLowerCase().includes(q) || d.vi.toLowerCase().includes(q)));
    const cats = [
      ['all', t('すべて', 'Tất cả', 'All')],
      ['ramp', t('ランプ・GSE', 'Ramp/GSE', 'Ramp/GSE')],
      ['wb', 'W&B'],
      ['cargo', t('貨物・DGR', 'Cargo/DGR', 'Cargo/DGR')],
      ['pax', t('旅客', 'Hành khách', 'Pax')],
      ['safety', t('安全・NGO運転', 'An toàn / NGO', 'Safety / NGO')]
    ];
    mount.innerHTML = tabsHtml + `
      <div class="card">
        <div class="card-title"><span class="ja">${t('日・英・越 3言語航空専門辞典 (音声付)', 'Từ điển Hàng không 3 Ngôn ngữ Nhật–Anh–Việt (Phát âm)', 'Trilingual Aviation & NGO Dictionary (JA · EN · VI + Audio)')}</span><span class="badge badge-accent">${filtered.length}/${FULL_DICTIONARY.length}</span></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          <input type="text" id="ops-dict-search" value="${opsState.dictQuery}" placeholder="${t('日本語・読み・English・Tiếng Việt で検索…', 'Tìm kiếm tiếng Nhật, Kana, tiếng Anh, tiếng Việt…', 'Search Japanese, Kana, English, or Vietnamese…')}" style="flex:1;min-width:220px;padding:7px 10px;border:1px solid var(--border-strong);border-radius:6px;" />
          <div style="display:flex;gap:4px;flex-wrap:wrap;">${cats.map(([id, lbl]) => `<button class="btn btn-sm ${opsState.dictCat === id ? 'btn-primary' : ''}" data-dcat="${id}">${lbl}</button>`).join('')}</div>
        </div>
        <div class="table-wrap" style="max-height:520px;overflow-y:auto;">
          <table><thead><tr><th>日本語 / 読み</th><th>English</th><th>Tiếng Việt</th><th>🔊</th></tr></thead><tbody>
            ${filtered.map(d => `<tr><td><strong class="ja">${d.ja}</strong><div style="font-size:11px;color:var(--text-muted);">${d.kana}</div></td><td style="font-family:var(--font-mono);font-size:12px;">${d.en}</td><td>${d.vi}</td><td><button class="btn btn-sm" data-speak="${d.ja}">🔊</button></td></tr>`).join('')}
          </tbody></table>
        </div>
      </div>
    `;
    const inp = document.getElementById('ops-dict-search');
    if (inp) inp.oninput = () => { opsState.dictQuery = inp.value; const pos = inp.selectionStart; renderFieldDrillsModule(); const re = document.getElementById('ops-dict-search'); if (re) { re.focus(); try { re.setSelectionRange(pos, pos); } catch {} } };
    mount.querySelectorAll('[data-dcat]').forEach(b => { b.onclick = () => { opsState.dictCat = b.dataset.dcat; renderFieldDrillsModule(); }; });
    mount.querySelectorAll('[data-speak]').forEach(b => { b.onclick = () => speakJapaneseTerm(b.dataset.speak); });
  }

  mount.querySelectorAll('[data-ost]').forEach(b => { b.onclick = () => { opsState.subtab = b.dataset.ost; renderFieldDrillsModule(); }; });
}
