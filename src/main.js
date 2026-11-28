// Aviation Ops Sim JP Pro — Main Bootstrapper, Hash Deep-Link Router, Trilingual JA/VI/EN & PWA
import {
  appState, saveState, resetState, replaceState,
  t, applyTheme, applyStaticI18n, updateProgressBadges
} from './core/state.js';
import { initCommandPalette } from './core/commandPalette.js';
import { initJaPhraseWrap } from './core/jaPhraseWrap.js';
import { renderRoadmapNav, applyLevelClass, isPro } from './core/roadmap.js';
import { renderDashboard } from './modules/dashboard.js';
import {
  wbState, initWbModule, selectWbAircraft, loadWbScenario,
  renderWbScenarioInfo, renderWbInputs, recalcAndRenderWb, ensureWbSplit3D, stopWbSplit3D
} from './modules/wbModule.js';
import {
  a3d, initAirport3dModule, renderAirport3dUI,
  startAirport3dLoop, stopAirport3dLoop, setA3dViewpoint,
  openA3dSubtab, startMarshalDrill
} from './modules/airport3dModule.js';
import {
  renderFieldDrillsModule, openDictionaryQuery, openFieldSubtab
} from './modules/fieldDrillsModule.js';
import { renderQuizModule, openNgoExamMode, stopQuizTimer, openQuizTopic, openQuizExam } from './modules/quizModule.js';
import {
  taState, renderTurnaroundModule, stopTurnaround3D, setTurnaroundNavCallback,
  renderPaxModule, renderCargoModule, openCargoSubtab, stopCargo3D, renderSafetyModule
} from './modules/opsModules.js';
import { AIRCRAFT_PROFILES, WB_SCENARIOS } from './data/aircraft.js';
import { A3D_AIRPORTS } from './data/airports.js';

const MODULE_TITLES = {
  dashboard: ['00. フライト運用ハブ（ダッシュボード）', '00. Trung tâm Điều hành (Dashboard)', '00. Flight Ops Hub Dashboard'],
  wb: ['D. 重量重心・離陸性能 ＆ 3Dリアルタイム同期', 'D. Weight & Balance + Xem 3D trực tiếp', 'D. Weight & Balance + Live 3D Split-Screen'],
  airport3d: ['G. 5空港 3Dシミュレーター ＆ NGOセントレア運転実習', 'G. Sân bay 3D PBR & Thực hành Lái xe NGO Centrair', 'G. 5-Airport Three.js PBR 3D & NGO Airside Driving'],
  turnaround: ['A. ターンアラウンド・シミュレーター（5大空港）', 'A. Mô phỏng Turnaround (5 sân bay Nhật Bản)', 'A. Turnaround Simulator (5 Japanese Airports)'],
  pax: ['B. 旅客サービス（搭乗手続・手荷物・PRM）', 'B. Dịch vụ Hành khách (Check-in, Hành lý, PRM)', 'B. Passenger Service (Check-in, Baggage, PRM)'],
  cargo: ['C. 3D ULDビルドアップ実技ゲーム・航空貨物・IATA危険物', 'C. Trò chơi Đóng hàng ULD 3D thực tế, Hàng hóa & IATA DGR', 'C. Realistic 3D ULD Build-up Sim, Air Cargo & IATA DGR'],
  safety: ['E. 安全管理・FOD・コンプライアンス（JCAB/SMS）', 'E. An toàn Sân đỗ, FOD & Luật JCAB/SMS', 'E. Safety, FOD & Compliance (JCAB/SMS)'],
  quiz: ['F. 特定技能 ＆ NGO車両運転講習 総合試験（342問）', 'F. Ôn thi Kỹ năng Đặc định & Bằng lái Sân đỗ NGO (342 câu)', 'F. SSW & NGO Airside Driving Exam Suite (342 Qs)'],
  ops: ['H. マーシャリング・ライトガン・MCA無線・音声辞典', 'H. Marshalling, Light Gun, MCA Radio & Từ điển', 'H. Marshalling, Light Gun, MCA Radio & Dictionary']
};

const MOBILE_TITLES = {
  dashboard: ['学習ロードマップ', 'Lộ trình học', 'Roadmap'],
  wb: ['重量重心 (W&B)', 'Weight & Balance', 'Weight & Balance'],
  airport3d: ['3D空港・NGO運転', 'Sân bay 3D', '3D Airport'],
  turnaround: ['ターンアラウンド', 'Turnaround', 'Turnaround'],
  pax: ['旅客・PRM', 'Hành khách', 'Passengers'],
  cargo: ['ULD・貨物・DGR', 'Xếp hàng ULD', 'ULD & Cargo'],
  safety: ['安全・FOD・SMS', 'An toàn SMS', 'Safety & SMS'],
  quiz: ['模擬試験 (342問)', 'Ôn thi (342 câu)', 'Exam (342 Qs)'],
  ops: ['合図・無線・辞典', 'Tín hiệu & Radio', 'Signals & Radio']
};

const PRIMARY_BTABS = new Set(['dashboard', 'airport3d', 'quiz', 'cargo']);

function setTopbarTitle(mod) {
  const titleEl = document.getElementById('topbar-title');
  const full = MODULE_TITLES[mod];
  const short = MOBILE_TITLES[mod] || full;
  if (!titleEl || !full) return;
  titleEl.innerHTML = `<span class="title-full">${t(full[0], full[1], full[2])}</span><span class="title-short">${t(short[0], short[1], short[2])}</span>`;
}

function closeSidebarDrawer() {
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebar-backdrop');
  if (sb) sb.classList.remove('open');
  if (bd) bd.classList.remove('open');
}

function closeMoreSheet() {
  const bd = document.getElementById('more-sheet-backdrop');
  if (bd) { bd.classList.remove('open'); bd.setAttribute('aria-hidden', 'true'); }
}

function closePrefsPopover() {
  const pop = document.getElementById('mobile-prefs-popover');
  const btn = document.getElementById('btn-mobile-prefs');
  if (pop) { pop.classList.remove('open'); pop.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

function updateBottomTabBar() {
  const labels = {
    dashboard: t('ロードマップ', 'Lộ trình', 'Roadmap'),
    airport3d: t('3D空港', '3D', '3D'),
    quiz: t('試験', 'Thi', 'Exam'),
    cargo: t('搭載', 'Xếp hàng', 'ULD'),
    more: t('その他', 'Thêm', 'More')
  };
  Object.entries(labels).forEach(([k, txt]) => {
    const el = document.querySelector(`[data-btab-lbl="${k}"]`);
    if (el) el.textContent = txt;
  });
  const activeMod = appState.activeModule;
  const activeKey = PRIMARY_BTABS.has(activeMod) ? activeMod : 'more';
  document.querySelectorAll('.btab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.btab === activeKey);
  });
}

function renderMoreSheet() {
  const title = document.getElementById('more-sheet-title');
  const body = document.getElementById('more-sheet-body');
  if (!body) return;
  if (title) title.textContent = t('その他のモジュール', 'Các module khác', 'More Modules');
  const items = [
    { mod: 'wb', icon: '⚖', ja: '重量重心 (W&B)', vi: 'Cân bằng tải (W&B)', en: 'Weight & Balance' },
    { mod: 'turnaround', icon: '⏱', ja: 'ターンアラウンド (5空港)', vi: 'Quy trình Turnaround', en: 'Turnaround Simulator' },
    { mod: 'pax', icon: '🧳', ja: '旅客サービス・PRM', vi: 'Hành khách & PRM', en: 'Passenger Service & PRM' },
    { mod: 'safety', icon: '🛡', ja: '安全・FOD・SMS', vi: 'An toàn, FOD & SMS', en: 'Safety, FOD & SMS' },
    { mod: 'ops', icon: '🦺', ja: '合図・ライトガン・無線・辞典', vi: 'Tín hiệu, Light Gun, Radio & Từ điển', en: 'Signals, Light Gun, Radio & Dict' }
  ];
  const pro = isPro();
  body.innerHTML = `
    <div class="more-sheet-list">
      ${items.map(it => `
        <button class="more-sheet-item ${appState.activeModule === it.mod ? 'active' : ''}" data-more-mod="${it.mod}">
          <span class="more-sheet-ico">${it.icon}</span>
          <span class="more-sheet-name ja">${t(it.ja, it.vi, it.en)}</span>
          <span class="more-sheet-arrow">›</span>
        </button>
      `).join('')}
    </div>
    <div class="more-sheet-footer">
      <div class="more-sheet-lbl">${t('表示モード', 'Chế độ hiển thị', 'Display Mode')}</div>
      <div class="level-toggle" role="group" aria-label="Level">
        <button class="${pro ? '' : 'active'}" data-mlevel="basic">🌱 ${t('初心者', 'Người mới', 'Beginner')}</button>
        <button class="${pro ? 'active' : ''}" data-mlevel="pro">🚀 Pro</button>
      </div>
    </div>
  `;
  body.querySelectorAll('[data-more-mod]').forEach(b => {
    b.onclick = () => { closeMoreSheet(); switchModule(b.dataset.moreMod); };
  });
  body.querySelectorAll('[data-mlevel]').forEach(b => {
    b.onclick = () => {
      appState.userLevel = b.dataset.mlevel;
      appState.stageOpen = {};
      saveState();
      applyLevelClass();
      goRoadmap(null, { levelChanged: true });
      renderMoreSheet();
    };
  });
}

function updateMobilePrefsUI() {
  const lbl = document.getElementById('mobile-prefs-lang-lbl');
  if (lbl) lbl.textContent = t('言語切替', 'Ngôn ngữ', 'Language');
  document.querySelectorAll('[data-mlang]').forEach(b => {
    b.classList.toggle('active', b.dataset.mlang === appState.lang);
  });
  const tBtn = document.getElementById('btn-mobile-theme');
  if (tBtn) {
    const isDark = appState.theme === 'dark';
    tBtn.textContent = isDark
      ? t('☀ ライトモードへ切替', '☀ Chuyển sang nền Sáng', '☀ Switch to Light Mode')
      : t('🌙 ダークモードへ切替', '🌙 Chuyển sang nền Tối', '🌙 Switch to Dark Mode');
  }
}

const VALID_MODULES = new Set(Object.keys(MODULE_TITLES));

const navActions = {
  goRoadmap: item => goRoadmap(item),
  go: mod => switchModule(mod),
  openWbWithSplit3D: () => {
    wbState.split3dOpen = true;
    switchModule('wb');
    const btn = document.getElementById('wb-toggle-split3d');
    if (btn) btn.classList.add('active');
    ensureWbSplit3D();
  },
  openAircraft: acId => {
    switchModule('wb');
    if (AIRCRAFT_PROFILES[acId]) {
      selectWbAircraft(acId);
      setHash(`#wb/${acId}`);
    }
  },
  openScenario: scId => {
    switchModule('wb');
    if (WB_SCENARIOS.some(s => s.id === scId)) {
      loadWbScenario(scId, false);
      setHash(`#wb/${scId}`);
    }
  },
  openAirport3D: apId => {
    if (A3D_AIRPORTS[apId]) a3d.airportId = apId;
    switchModule('airport3d');
    setHash(`#3d/${a3d.airportId}`);
  },
  openPov3D: vpId => {
    switchModule('airport3d');
    setA3dViewpoint(vpId);
  },
  openDictTerm: query => {
    switchModule('ops');
    openDictionaryQuery(query);
    setHash('#ops/dict');
  },
  openLightGun: () => {
    switchModule('ops');
    openFieldSubtab('lightgun');
    setHash('#ops/lightgun');
  },
  openNgoGuide: () => {
    switchModule('ops');
    openFieldSubtab('ngoguide');
    setHash('#ops/ngoguide');
  },
  openNgoExam: () => {
    switchModule('quiz');
    openNgoExamMode();
    setHash('#quiz/ngo');
  },
  openUldBuildup: () => {
    switchModule('cargo');
    openCargoSubtab('buildup');
    setHash('#cargo/buildup');
  },
  openWbIn3D: () => {
    a3d.subtab = 'flight';
    a3d.fleetAircraftId = wbState.aircraftId;
    a3d.airportId = wbState.env.airport || 'NGO';
    a3d.syncWbFailure = true;
    a3d.flightPhaseIdx = 8;
    a3d.flightProgress = 0.25;
    a3d.flightPlaying = true;
    switchModule('airport3d');
  }
};

function setHash(h) {
  try {
    if (window.location.hash !== h) history.replaceState(null, '', h);
  } catch (e) {}
}

export function switchModule(mod, skipHash = false) {
  if (!VALID_MODULES.has(mod)) mod = 'dashboard';
  if (appState.activeModule === 'airport3d' && mod !== 'airport3d') stopAirport3dLoop();
  if (appState.activeModule === 'wb' && mod !== 'wb') stopWbSplit3D();
  if (appState.activeModule === 'turnaround' && mod !== 'turnaround') stopTurnaround3D();
  if (appState.activeModule === 'cargo' && mod !== 'cargo') stopCargo3D();
  if (appState.activeModule === 'quiz' && mod !== 'quiz') stopQuizTimer();

  appState.activeModule = mod;
  saveState();

  document.querySelectorAll('.module-screen').forEach(sec => {
    sec.classList.toggle('active', sec.id === `screen-${mod}`);
  });
  renderRoadmapNav(goRoadmap);

  setTopbarTitle(mod);
  updateBottomTabBar();
  closeSidebarDrawer();
  closeMoreSheet();
  closePrefsPopover();

  if (!skipHash) setHash(`#${mod === 'airport3d' ? '3d' : mod}`);
  renderActiveModule();
}

// Open a roadmap item: module + sub-tab / quiz topic / 3D drill
function goRoadmap(item, opts = {}) {
  if (opts.levelChanged) {
    a3d.ui.map = isPro() && window.innerWidth > 900;
    renderRoadmapNav(goRoadmap);
    renderActiveModule();
    return;
  }
  if (!item) return;
  if (item.mod === 'dashboard') {
    appState.navItem = null;
    saveState();
    switchModule('dashboard');
    return;
  }
  switchModule(item.mod);
  if (item.mod === 'ops' && item.sub) {
    if (item.sub === 'dict') openDictionaryQuery('');
    else openFieldSubtab(item.sub);
    setHash(`#ops/${item.sub}`);
  } else if (item.mod === 'cargo' && item.sub) {
    openCargoSubtab(item.sub);
    setHash(`#cargo/${item.sub}`);
  } else if (item.mod === 'airport3d') {
    openA3dSubtab(item.sub || 'flight');
    if (item.action === 'drill') { startMarshalDrill(); renderAirport3dUI(); }
  } else if (item.mod === 'quiz') {
    if (item.mode === 'exam') openQuizExam();
    else openQuizTopic(item.topic || 'all');
  }
}
export { goRoadmap };

function renderActiveModule() {
  updateProgressBadges();
  switch (appState.activeModule) {
    case 'dashboard': renderDashboard(navActions); break;
    case 'wb': recalcAndRenderWb(); ensureWbSplit3D(); break;
    case 'airport3d': renderAirport3dUI(); startAirport3dLoop(); break;
    case 'turnaround': renderTurnaroundModule(); break;
    case 'pax': renderPaxModule(); break;
    case 'cargo': renderCargoModule(); break;
    case 'safety': renderSafetyModule(); break;
    case 'quiz': renderQuizModule(); break;
    case 'ops': renderFieldDrillsModule(); break;
  }
}

function applyHashRoute() {
  const raw = (window.location.hash || '').replace(/^#/, '');
  if (!raw) return false;
  const [seg, arg] = raw.split('/');
  if (seg === 'wb') {
    switchModule('wb', true);
    if (arg && AIRCRAFT_PROFILES[arg]) selectWbAircraft(arg);
    else if (arg && WB_SCENARIOS.some(s => s.id === arg)) loadWbScenario(arg, false);
    return true;
  }
  if (seg === '3d' || seg === 'airport3d') {
    if (arg && A3D_AIRPORTS[arg]) a3d.airportId = arg;
    switchModule('airport3d', true);
    return true;
  }
  if (seg === 'uld' || (seg === 'cargo' && arg)) {
    switchModule('cargo', true);
    openCargoSubtab(arg || 'buildup');
    return true;
  }
  if (seg === 'quiz' && arg === 'ngo') {
    switchModule('quiz', true);
    openNgoExamMode();
    return true;
  }
  if (seg === 'ops' && arg) {
    switchModule('ops', true);
    if (arg === 'dict') openDictionaryQuery('');
    else openFieldSubtab(arg);
    return true;
  }
  if (VALID_MODULES.has(seg)) {
    switchModule(seg, true);
    return true;
  }
  return false;
}

function updateLangToggleUI() {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === appState.lang);
  });
  applyStaticI18n();
  applyTheme();
  renderRoadmapNav(goRoadmap);
  setTopbarTitle(appState.activeModule);
  updateBottomTabBar();
  updateMobilePrefsUI();
}

function registerPWA() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then(reg => {
      reg.update().catch(() => {});
      // Re-check when the PWA comes back to the foreground (iOS keeps home-screen apps alive for days)
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') reg.update().catch(() => {}); });
    }).catch(() => {});
    // A new version took over → reload once so the user sees it immediately
    let reloaded = false;
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return;
      reloaded = true;
      location.reload();
    });
  }
}

function bootstrap() {
  applyTheme();
  updateLangToggleUI();

  applyLevelClass();
  if (!isPro() || window.innerWidth <= 900) a3d.ui.map = false; // beginners & phones start with the 3D mini-map hidden
  if (window.innerWidth <= 900) a3d.labelMode = 'min'; // avoid overlapping 2D labels on narrow screens
  renderRoadmapNav(goRoadmap);

  const menuBtn = document.getElementById('btn-mobile-menu');
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  if (menuBtn && sidebar) {
    menuBtn.onclick = () => {
      const opening = !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', opening);
      if (sidebarBackdrop) sidebarBackdrop.classList.toggle('open', opening);
      if (opening) { closePrefsPopover(); closeMoreSheet(); }
    };
  }
  if (sidebarBackdrop) {
    sidebarBackdrop.onclick = closeSidebarDrawer;
  }

  const mobSearchBtn = document.getElementById('btn-mobile-search');
  if (mobSearchBtn) {
    mobSearchBtn.onclick = () => {
      closePrefsPopover();
      const cmdkBtn = document.getElementById('btn-cmdk');
      if (cmdkBtn) cmdkBtn.click();
    };
  }

  const mobPrefsBtn = document.getElementById('btn-mobile-prefs');
  const mobPrefsPop = document.getElementById('mobile-prefs-popover');
  if (mobPrefsBtn && mobPrefsPop) {
    mobPrefsBtn.onclick = e => {
      e.stopPropagation();
      const opening = !mobPrefsPop.classList.contains('open');
      mobPrefsPop.classList.toggle('open', opening);
      mobPrefsPop.setAttribute('aria-hidden', opening ? 'false' : 'true');
      mobPrefsBtn.setAttribute('aria-expanded', opening ? 'true' : 'false');
      if (opening) updateMobilePrefsUI();
    };
    document.addEventListener('click', e => {
      if (mobPrefsPop.classList.contains('open') && !mobPrefsPop.contains(e.target) && e.target !== mobPrefsBtn) {
        closePrefsPopover();
      }
    });
  }

  document.querySelectorAll('[data-mlang]').forEach(btn => {
    btn.onclick = () => {
      const target = document.querySelector(`.lang-btn[data-lang="${btn.dataset.mlang}"]`);
      if (target) target.click();
      closePrefsPopover();
    };
  });

  const mobThemeBtn = document.getElementById('btn-mobile-theme');
  if (mobThemeBtn) {
    mobThemeBtn.onclick = () => {
      const tb = document.getElementById('btn-theme-toggle');
      if (tb) tb.click();
      updateMobilePrefsUI();
      closePrefsPopover();
    };
  }

  document.querySelectorAll('.btab-btn').forEach(b => {
    b.onclick = () => {
      const target = b.dataset.btab;
      if (target === 'more') {
        renderMoreSheet();
        const bd = document.getElementById('more-sheet-backdrop');
        if (bd) { bd.classList.add('open'); bd.setAttribute('aria-hidden', 'false'); }
      } else {
        switchModule(target);
      }
    };
  });
  const moreBackdrop = document.getElementById('more-sheet-backdrop');
  const moreClose = document.getElementById('more-sheet-close');
  if (moreBackdrop) moreBackdrop.onclick = e => { if (e.target === moreBackdrop) closeMoreSheet(); };
  if (moreClose) moreClose.onclick = closeMoreSheet;

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSidebarDrawer();
      closeMoreSheet();
      closePrefsPopover();
    }
  });

  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = () => {
      appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyTheme();
      updateMobilePrefsUI();
      if (appState.activeModule === 'wb') recalcAndRenderWb();
    };
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      appState.lang = btn.dataset.lang;
      saveState();
      updateLangToggleUI();
      // Refresh W&B aircraft dropdown, scenario dropdown, scenario card & cabin/hold input labels cleanly
      const acSel = document.getElementById('wb-aircraft');
      if (acSel) {
        const curAc = wbState.aircraftId;
        acSel.innerHTML = Object.values(AIRCRAFT_PROFILES).map(p => `<option value="${p.id}">${t(p.name, p.nameVi || p.name, p.nameEn || p.name)}</option>`).join('');
        acSel.value = curAc;
      }
      const scSel = document.getElementById('wb-scenario');
      if (scSel) {
        const cur = wbState.scenarioId;
        scSel.innerHTML = WB_SCENARIOS.map(s => `<option value="${s.id}">${t(s.titleJa, s.titleVi, s.titleEn || `${s.id}: ${s.aircraft} Load Case`)}</option>`).join('');
        scSel.value = cur;
      }
      renderWbScenarioInfo();
      renderWbInputs();
      renderActiveModule();
    };
  });

  const expBtn = document.getElementById('btn-export-json');
  if (expBtn) {
    expBtn.onclick = () => {
      const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aviation-ops-sim-pro-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };
  }
  const impInput = document.getElementById('input-import-json');
  const impBtn = document.getElementById('btn-import-json');
  if (impBtn && impInput) {
    impBtn.onclick = () => impInput.click();
    impInput.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          replaceState(parsed);
          updateLangToggleUI();
          renderActiveModule();
        } catch (err) {
          alert(t('無効なJSONバックアップファイルです。', 'Tệp sao lưu JSON không hợp lệ.', 'Invalid JSON backup file.'));
        }
      };
      reader.readAsText(file);
      impInput.value = '';
    };
  }
  const resetBtn = document.getElementById('btn-reset-progress');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm(t('学習進捗をすべてリセットしますか？', 'Bạn có chắc muốn xóa toàn bộ tiến độ học tập?', 'Reset all learning progress?'))) {
        resetState();
        updateLangToggleUI();
        switchModule('dashboard');
      }
    };
  }

  initWbModule(navActions);
  initAirport3dModule();
  initCommandPalette(navActions);
  setTurnaroundNavCallback((wbAcId, airportCode, liveryId) => {
    if (liveryId) {
      appState.livery = liveryId;
      saveState();
    }
    if (airportCode) wbState.env.airport = airportCode;
    wbState.split3dOpen = true;
    switchModule('wb');
    if (AIRCRAFT_PROFILES[wbAcId]) selectWbAircraft(wbAcId);
    const envAp = document.getElementById('wb-env-airport');
    if (envAp && airportCode) envAp.value = airportCode;
    recalcAndRenderWb();
    ensureWbSplit3D();
  });

  window.addEventListener('hashchange', applyHashRoute);
  if (!applyHashRoute()) {
    switchModule('dashboard', true);
  }

  registerPWA();
  initJaPhraseWrap();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
