// Instant Ctrl+K / Cmd+K Command Palette (Pure Trilingual JA/VI/EN Search)
import { AIRCRAFT_PROFILES, WB_SCENARIOS } from '../data/aircraft.js';
import { A3D_AIRPORTS, A3D_VIEWPOINTS } from '../data/airports.js';
import { OPS_DICTIONARY } from '../data/dictionary.js';
import { NGO_EXTRA_DICTIONARY } from '../data/centrairNgo.js';
import { speakJapaneseTerm } from '../engines/audioEngine.js';
import { t } from './state.js';

let paletteItems = [];
let activeIdx = 0;

export function initCommandPalette(actions) {
  const backdrop = document.getElementById('cmdk-backdrop');
  const input = document.getElementById('cmdk-input');
  const list = document.getElementById('cmdk-list');
  const trigger = document.getElementById('btn-cmdk');
  if (!backdrop || !input || !list) return;

  function buildIndex() {
    const items = [
      { cat: 'NAV', label: t('00. フライト運用ハブ（ダッシュボード）', '00. Trung tâm Điều hành (Dashboard)', '00. Flight Ops Hub Dashboard'), keys: 'home dashboard hub overview', run: () => actions.go('dashboard') },
      { cat: 'NAV', label: t('D. 重量重心・搭載計画 (10機種)', 'D. Weight & Balance / Lập kế hoạch tải (10 tàu bay)', 'D. Weight & Balance / Load Planning (10 Fleet)'), keys: 'wb weight balance load sheet lir mac', run: () => actions.go('wb') },
      { cat: 'NAV', label: t('G. 3D空港シミュレーター ＆ NGO運転実習', 'G. Sân bay 3D PBR & Thực hành lái xe NGO', 'G. 3D Airport PBR & NGO Driving Sim'), keys: '3d airport threejs gse pbb fod ngo centrair era', run: () => actions.go('airport3d') },
      { cat: 'NAV', label: t('F. セントレア車両運転講習 模擬試験 (50問)', 'F. Thi thử Bằng lái Sân đỗ NGO Centrair (50 câu)', 'F. NGO Centrair Airside Driving Exam (50 Qs)'), keys: 'ngo centrair driving license exam test quiz', run: () => actions.openNgoExam() },
      { cat: 'NAV', label: t('H. 指向信号灯（ライトガン）＆ MCA無線・フォネティック', 'H. Thực hành Light Gun, MCA Radio & Phonetic', 'H. Light Gun Drill, MCA Radio & Phonetic Code'), keys: 'light gun signal mca radio phonetic coc', run: () => actions.openLightGun() },
      { cat: 'NAV', label: t('A. ターンアラウンド・シミュレーター', 'A. Mô phỏng Turnaround (5 sân bay Nhật)', 'A. Turnaround Simulator (5 JP Airports)'), keys: 'turnaround ramp ground handling', run: () => actions.go('turnaround') },
      { cat: 'NAV', label: t('B. 旅客サービス（搭乗手続・手荷物・PRM）', 'B. Dịch vụ Hành khách (Check-in, Hành lý, PRM)', 'B. Passenger Service (Check-in, Baggage, PRM)'), keys: 'pax passenger baggage prm wchr', run: () => actions.go('pax') },
      { cat: 'NAV', label: t('C. 3D ULDビルドアップ実技ゲーム（PMC/PLA/PGA/AKE/AKH・手積み/フォークリフト）', 'C. Trò chơi Đóng hàng ULD 3D thực tế (PMC/PLA/PGA/AKE/AKH · Xếp tay & Xe nâng)', 'C. Realistic 3D ULD Build-up Simulator (PMC/PLA/PGA/AKE/AKH · Hand & Forklift)'), keys: 'uld buildup pmc pla pga pag ake akh forklift pallet spreader contour game', run: () => actions.openUldBuildup() },
      { cat: 'NAV', label: t('C. 航空貨物・ULD規格・IATA危険物 (DGR)', 'C. Hàng hóa Hàng không, Chuẩn ULD & IATA DGR', 'C. Air Cargo, ULD Specs & IATA DGR'), keys: 'cargo awb uld dgr dangerous goods ti', run: () => actions.go('cargo') },
      { cat: 'NAV', label: t('E. 安全管理・FOD・コンプライアンス (JCAB/SMS)', 'E. An toàn Sân đỗ, FOD & Luật JCAB/SMS', 'E. Safety, FOD & Compliance (JCAB/SMS)'), keys: 'safety fod sms jcab law shell heinrich', run: () => actions.go('safety') },
      { cat: 'NAV', label: t('F. 特定技能・NGO運転 総合試験 (160問)', 'F. Ôn thi Kỹ năng Đặc định & Lái xe NGO (160 câu)', 'F. SSW & NGO Driving Exam Bank (160 Qs)'), keys: 'quiz exam test srs tokutei jeae', run: () => actions.go('quiz') },
      { cat: 'NAV', label: t('H. マーシャリング・無線・ライトガン・音声辞典', 'H. Marshalling, Headset, Light Gun & Từ điển', 'H. Marshalling, Headset, Light Gun & Dictionary'), keys: 'marshalling headset pushback dictionary', run: () => actions.go('ops') }
    ];

    Object.values(AIRCRAFT_PROFILES).forEach(p => {
      items.push({
        cat: 'FLEET',
        label: `✈ ${p.id} — ${t(p.name, p.nameVi || p.name, p.nameEn || p.name)}`,
        keys: `aircraft fleet ${p.id} ${p.name} ${p.nameEn || ''} ${p.category} ${p.gseType}`,
        run: () => actions.openAircraft(p.id)
      });
    });

    WB_SCENARIOS.forEach(s => {
      items.push({
        cat: 'W&B',
        label: `[${s.id}] ${t(s.titleJa, s.titleVi, s.titleEn || s.id + ' (' + s.aircraft + ')')}`,
        keys: `scenario ${s.id} ${s.aircraft} ${s.titleJa} ${s.titleVi}`,
        run: () => actions.openScenario(s.id)
      });
    });

    Object.values(A3D_AIRPORTS).forEach(ap => {
      items.push({
        cat: '3D',
        label: `🛫 ${ap.id} — ${t(ap.nameJa, ap.nameVi, ap.nameEn || ap.id + ' Airport')} (RWY ${ap.rwy})`,
        keys: `airport 3d ${ap.id} ${ap.nameJa} ${ap.nameVi} ${ap.rwy}`,
        run: () => actions.openAirport3D(ap.id)
      });
    });

    A3D_VIEWPOINTS.forEach(vp => {
      items.push({
        cat: 'POV',
        label: `[${vp.key}] ${t(vp.ja, vp.vi, vp.en || vp.id)}`,
        keys: `camera pov viewpoint ${vp.id} ${vp.ja} ${vp.vi}`,
        run: () => actions.openPov3D(vp.id)
      });
    });

    [...OPS_DICTIONARY, ...NGO_EXTRA_DICTIONARY].forEach(d => {
      items.push({
        cat: 'DICT 🔊',
        label: t(`${d.ja}（${d.kana}）`, `${d.vi} (${d.ja})`, `${d.en} (${d.ja})`),
        keys: `dict term ${d.ja} ${d.kana} ${d.en} ${d.vi}`,
        run: () => { speakJapaneseTerm(d.ja); actions.openDictTerm(d.ja); }
      });
    });

    return items;
  }

  function renderList(query) {
    const q = (query || '').trim().toLowerCase();
    const all = buildIndex();
    paletteItems = q
      ? all.filter(it => it.label.toLowerCase().includes(q) || it.keys.toLowerCase().includes(q)).slice(0, 24)
      : all.slice(0, 16);
    activeIdx = Math.min(activeIdx, Math.max(0, paletteItems.length - 1));

    if (paletteItems.length === 0) {
      list.innerHTML = `<div style="padding:18px;text-align:center;color:var(--text-muted);font-size:13px;">${t('該当する項目が見つかりません。', 'Không tìm thấy mục phù hợp.', 'No matching command or term found.')}</div>`;
      return;
    }
    list.innerHTML = paletteItems.map((it, idx) => `
      <button class="cmdk-item ${idx === activeIdx ? 'active' : ''}" data-idx="${idx}">
        <span class="ja">${it.label}</span>
        <span class="cmdk-cat">${it.cat}</span>
      </button>
    `).join('');
    list.querySelectorAll('.cmdk-item').forEach(btn => {
      btn.onclick = () => {
        const i = Number(btn.dataset.idx);
        close();
        if (paletteItems[i]) paletteItems[i].run();
      };
    });
  }

  function open() {
    backdrop.classList.add('open');
    input.value = '';
    activeIdx = 0;
    renderList('');
    setTimeout(() => input.focus(), 10);
  }

  function close() {
    backdrop.classList.remove('open');
  }

  if (trigger) trigger.onclick = open;
  backdrop.onclick = e => { if (e.target === backdrop) close(); };
  input.oninput = () => { activeIdx = 0; renderList(input.value); };

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) close();
      else open();
      return;
    }
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(paletteItems.length - 1, activeIdx + 1);
      renderList(input.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(0, activeIdx - 1);
      renderList(input.value);
    } else if (e.key === 'Enter' && paletteItems[activeIdx]) {
      e.preventDefault();
      const it = paletteItems[activeIdx];
      close();
      it.run();
    }
  });
}
