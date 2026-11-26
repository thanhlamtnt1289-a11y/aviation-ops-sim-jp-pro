// Learning roadmap sidebar: modules grouped by the real certification path
//   ① 特定技能1号 → ② GSE運転許可 (NGO構内運転) → ③ 搭載・ULDビルドアップ → ④ 特定技能2号
// + Beginner / Pro level: beginners see a short, focused menu; Pro sees every tool.
import { appState, saveState, t } from './state.js';

export const ROADMAP = [
  {
    id: 'tg1', no: 1,
    ja: '特定技能1号', vi: 'Kỹ năng đặc định số 1', en: 'SSW (i) Ground Handling',
    subJa: 'グランドハンドリング基礎', subVi: 'Nghiệp vụ mặt đất cơ bản', subEn: 'Ground handling basics',
    items: [
      { id: 'tg1_ta', mod: 'turnaround', icon: '⏱', ja: 'ターンアラウンドの流れ', vi: 'Quy trình Turnaround', en: 'Turnaround flow' },
      { id: 'tg1_marshal', mod: 'ops', sub: 'marshal', icon: '🦺', ja: 'マーシャリング手信号', vi: 'Tín hiệu tay Marshaller', en: 'Marshalling signals' },
      { id: 'tg1_push', mod: 'ops', sub: 'pushback', icon: '🎧', ja: 'プッシュバック交信', vi: 'Đẩy lùi & liên lạc', en: 'Pushback & interphone' },
      { id: 'tg1_pax', mod: 'pax', icon: '🧳', ja: '旅客サービス・PRM', vi: 'Hành khách & PRM', en: 'Passengers & PRM' },
      { id: 'tg1_safety', mod: 'safety', icon: '🛡', ja: '安全・FOD・SMS', vi: 'An toàn, FOD & SMS', en: 'Safety, FOD & SMS' },
      { id: 'tg1_dict', mod: 'ops', sub: 'dict', icon: '📖', ja: '3言語用語辞典', vi: 'Từ điển thuật ngữ', en: 'Trilingual glossary', pro: true },
      { id: 'tg1_exam', mod: 'quiz', topic: 'stage_tg1', icon: '📝', ja: '1号 模擬試験', vi: 'Thi thử Số 1', en: 'SSW (i) mock exam', exam: true }
    ]
  },
  {
    id: 'gse', no: 2,
    ja: 'GSE運転許可', vi: 'Bằng lái GSE', en: 'GSE Driving Permit',
    subJa: 'NGOセントレア構内運転', subVi: 'Lái xe trong sân bay NGO', subEn: 'NGO Centrair airside driving',
    items: [
      { id: 'gse_rules', mod: 'ops', sub: 'ngoguide', icon: '📘', ja: '構内運転ルール・速度', vi: 'Luật lái xe & tốc độ', en: 'Driving rules & speeds' },
      { id: 'gse_light', mod: 'ops', sub: 'lightgun', icon: '🔦', ja: 'ライトガン信号', vi: 'Tín hiệu Light Gun', en: 'Light gun signals' },
      { id: 'gse_drive', mod: 'airport3d', sub: 'drive', icon: '🚜', ja: '3D構内運転実習', vi: 'Lái xe 3D thực hành', en: '3D driving practice' },
      { id: 'gse_ops3d', mod: 'airport3d', sub: 'ops3d', icon: '🖱', ja: '3D実技（FOD・PBB）', vi: 'Thực hành 3D (FOD, PBB)', en: '3D hands-on (FOD, PBB)' },
      { id: 'gse_mca', mod: 'ops', sub: 'mca', icon: '📻', ja: 'MCA無線・フォネティック', vi: 'Bộ đàm MCA & phiên âm', en: 'MCA radio & phonetics', pro: true },
      { id: 'gse_exam', mod: 'quiz', topic: 'ngo_driving', icon: '📝', ja: 'NGO運転 模擬試験', vi: 'Thi thử bằng lái NGO', en: 'NGO driving mock exam', exam: true }
    ]
  },
  {
    id: 'cargo', no: 3,
    ja: '搭載・ULDビルドアップ', vi: 'Xếp hàng & ULD', en: 'Loading & ULD Build-up',
    subJa: '貨物・危険物', subVi: 'Hàng hóa & hàng nguy hiểm', subEn: 'Cargo & dangerous goods',
    items: [
      { id: 'cg_build', mod: 'cargo', sub: 'buildup', icon: '🏗', ja: '3D ULD積付け実習', vi: 'Xếp ULD 3D thực hành', en: '3D ULD build-up' },
      { id: 'cg_uld', mod: 'cargo', sub: 'uld', icon: '📦', ja: 'ULD規格図鑑', vi: 'Danh mục chuẩn ULD', en: 'ULD types guide' },
      { id: 'cg_dgr', mod: 'cargo', sub: 'dgr', icon: '☢', ja: '危険物 (DGR)', vi: 'Hàng nguy hiểm (DGR)', en: 'Dangerous goods (DGR)' },
      { id: 'cg_flow', mod: 'cargo', sub: 'flow', icon: '🔄', ja: '輸出入・NACCS', vi: 'Xuất nhập khẩu & NACCS', en: 'Export/import & NACCS', pro: true },
      { id: 'cg_exam', mod: 'quiz', topic: 'cargo', icon: '📝', ja: '貨物 模擬試験', vi: 'Thi thử Hàng hóa', en: 'Cargo mock exam', exam: true }
    ]
  },
  {
    id: 'tg2', no: 4,
    ja: '特定技能2号', vi: 'Kỹ năng đặc định số 2', en: 'SSW (ii) Ground Handling',
    subJa: '搭載管理・現場リーダー', subVi: 'Quản lý tải & trưởng ca', subEn: 'Load control & team lead',
    items: [
      { id: 'tg2_wb', mod: 'wb', icon: '⚖', ja: '重量重心 (W&B)', vi: 'Cân bằng tải (W&B)', en: 'Weight & Balance' },
      { id: 'tg2_drill', mod: 'airport3d', sub: 'flight', action: 'drill', icon: '🚧', ja: '3D誘導実習（マーシャラー）', vi: 'Tập dẫn tàu 3D (Marshaller)', en: '3D marshalling drill' },
      { id: 'tg2_cycle', mod: 'airport3d', sub: 'flight', icon: '✈', ja: '離着陸〜出発 全工程3D', vi: 'Toàn chu trình bay 3D', en: 'Full flight cycle 3D', pro: true },
      { id: 'tg2_exam', mod: 'quiz', topic: 'stage_tg2', icon: '📝', ja: '2号 総合模擬試験', vi: 'Thi thử Số 2 tổng hợp', en: 'SSW (ii) full mock', exam: true },
      { id: 'tg2_timed', mod: 'quiz', mode: 'exam', icon: '⏱', ja: '本番形式タイマー試験', vi: 'Thi tính giờ như thật', en: 'Timed real-format exam', pro: true }
    ]
  }
];

export function isPro() { return appState.userLevel === 'pro'; }

export function applyLevelClass() {
  if (!document.body) return;
  document.body.classList.toggle('level-basic', !isPro());
  document.body.classList.toggle('level-pro', isPro());
}

const clamp01 = v => Math.max(0, Math.min(1, v || 0));
export function stageProgress(stageId) {
  const a = appState;
  const safetyDone = Object.values(a.safetyChecked || {}).filter(Boolean).length;
  const parts = {
    tg1: [clamp01((a.taBestScore || 0) / 100), clamp01((a.paxSolved || []).length / 5), clamp01(safetyDone / 16),
      clamp01((a.opsBestMarshal || 0) / 8), a.opsPushbackDone ? 1 : 0, clamp01((a.quizStats.bestExam || 0) / 70)],
    gse: [clamp01((a.airport3dSolved || []).length / 3), clamp01((a.exam3dBest || 0) / 80), clamp01((a.opsBestLightGun || 0) / 5),
      clamp01((a.quizStats.bestNgoExam || 0) / 80)],
    cargo: [clamp01(((a.uldSolved || []).length) / 5), clamp01(((a.cargoSolved || []).length) / 6)],
    tg2: [clamp01((a.wbSolved || []).length / 14), a.marshalDrillPassed ? 1 : 0, clamp01((a.quizStats.bestExam || 0) / 80)]
  }[stageId] || [0];
  return Math.round((parts.reduce((x, y) => x + y, 0) / parts.length) * 100);
}

function findItem(id) {
  for (const st of ROADMAP) for (const it of st.items) if (it.id === id) return { st, it };
  return null;
}

export function renderRoadmapNav(onGo) {
  const mount = document.getElementById('nav-roadmap');
  if (!mount) return;
  const pro = isPro();
  const activeMod = appState.activeModule;
  const cur = findItem(appState.navItem);
  const curItemId = cur && cur.it.mod === activeMod ? cur.it.id : null;
  const curStage = appState.activeStage || 'tg1';
  const openMap = appState.stageOpen || {};

  const hub = `
    <button class="nav-btn ${activeMod === 'dashboard' ? 'active' : ''}" data-hub="1">
      <span class="nav-code">⌂</span>
      <span>${t('学習ロードマップ', 'Lộ trình học', 'Learning roadmap')}</span>
      <span class="nav-badge" id="badge-dashboard">0%</span>
    </button>`;

  const stages = ROADMAP.map(st => {
    const pct = stageProgress(st.id);
    const isCur = st.id === curStage;
    const open = openMap[st.id] !== undefined ? openMap[st.id] : (pro || isCur);
    const items = st.items.filter(it => pro || !it.pro).map(it => {
      const active = it.id === curItemId || (!curItemId && it.mod === activeMod && isCur && !it.sub && !it.topic);
      return `<button class="nav-btn ${active ? 'active' : ''}" data-item="${it.id}">
        <span class="nav-code">${it.icon}</span>
        <span>${t(it.ja, it.vi, it.en)}</span>
        ${it.exam ? `<span class="nav-badge">${t('試験', 'Thi', 'Exam')}</span>` : ''}
      </button>`;
    }).join('');
    return `
      <div class="stage ${open ? 'open' : ''} ${isCur ? 'current' : ''} ${pct >= 100 ? 'done' : ''}" data-stage="${st.id}">
        <button class="stage-head" data-stagehead="${st.id}">
          <span class="stage-no">${pct >= 100 ? '✓' : st.no}</span>
          <span class="stage-title">${t(st.ja, st.vi, st.en)}<span class="stage-sub">${t(st.subJa, st.subVi, st.subEn)}</span></span>
          <span class="stage-pct">${pct}%</span>
          <span class="stage-chev">▾</span>
        </button>
        <div class="stage-bar"><i style="width:${pct}%"></i></div>
        <div class="stage-items">${items}</div>
      </div>`;
  }).join('');

  mount.innerHTML = `
    <div class="level-toggle" role="group" aria-label="Level">
      <button class="${pro ? '' : 'active'}" data-level="basic">🌱 ${t('初心者', 'Người mới', 'Beginner')}</button>
      <button class="${pro ? 'active' : ''}" data-level="pro">🚀 Pro</button>
    </div>
    ${hub}
    <div class="nav-group-label">${t('受験ロードマップ', 'LỘ TRÌNH THI', 'CERTIFICATION PATH')}</div>
    ${stages}`;

  mount.querySelector('[data-hub]').onclick = () => onGo({ mod: 'dashboard' });
  mount.querySelectorAll('[data-level]').forEach(b => {
    b.onclick = () => {
      appState.userLevel = b.dataset.level;
      appState.stageOpen = {};
      saveState();
      applyLevelClass();
      onGo(null, { levelChanged: true });
    };
  });
  mount.querySelectorAll('[data-stagehead]').forEach(b => {
    b.onclick = () => {
      const id = b.dataset.stagehead;
      const el = mount.querySelector(`.stage[data-stage="${id}"]`);
      const nowOpen = !el.classList.contains('open');
      appState.stageOpen = { ...(appState.stageOpen || {}), [id]: nowOpen };
      if (nowOpen && !isPro()) {
        // Beginner: one stage at a time keeps the menu short
        appState.activeStage = id;
        ROADMAP.forEach(s => { if (s.id !== id) appState.stageOpen[s.id] = false; });
      }
      saveState();
      renderRoadmapNav(onGo);
    };
  });
  mount.querySelectorAll('[data-item]').forEach(b => {
    b.onclick = () => {
      const f = findItem(b.dataset.item);
      if (!f) return;
      appState.navItem = f.it.id;
      appState.activeStage = f.st.id;
      saveState();
      onGo(f.it);
    };
  });
}
