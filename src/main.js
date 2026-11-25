// Aviation Ops Sim JP Pro — Main Bootstrapper, Hash Deep-Link Router, Trilingual JA/VI/EN & PWA
import {
  appState, saveState, resetState, replaceState,
  t, applyTheme, applyStaticI18n, updateProgressBadges
} from './core/state.js';
import { initCommandPalette } from './core/commandPalette.js';
import { renderDashboard } from './modules/dashboard.js';
import {
  wbState, initWbModule, selectWbAircraft, loadWbScenario,
  renderWbScenarioInfo, renderWbInputs, recalcAndRenderWb, ensureWbSplit3D, stopWbSplit3D
} from './modules/wbModule.js';
import {
  a3d, initAirport3dModule, renderAirport3dUI,
  startAirport3dLoop, stopAirport3dLoop, setA3dViewpoint
} from './modules/airport3dModule.js';
import {
  renderFieldDrillsModule, openDictionaryQuery, openFieldSubtab
} from './modules/fieldDrillsModule.js';
import { renderQuizModule, openNgoExamMode, stopQuizTimer } from './modules/quizModule.js';
import {
  taState, renderTurnaroundModule, stopTurnaround3D, setTurnaroundNavCallback,
  renderPaxModule, renderCargoModule, renderSafetyModule
} from './modules/opsModules.js';
import { AIRCRAFT_PROFILES, WB_SCENARIOS } from './data/aircraft.js';
import { A3D_AIRPORTS } from './data/airports.js';

const MODULE_TITLES = {
  dashboard: ['00. フライト運用ハブ（ダッシュボード）', '00. Trung tâm Điều hành (Dashboard)', '00. Flight Ops Hub Dashboard'],
  wb: ['D. 重量重心・離陸性能 ＆ 3Dリアルタイム同期', 'D. Weight & Balance + Xem 3D trực tiếp', 'D. Weight & Balance + Live 3D Split-Screen'],
  airport3d: ['G. 5空港 3Dシミュレーター ＆ NGOセントレア運転実習', 'G. Sân bay 3D PBR & Thực hành Lái xe NGO Centrair', 'G. 5-Airport Three.js PBR 3D & NGO Airside Driving'],
  turnaround: ['A. ターンアラウンド・シミュレーター（5大空港）', 'A. Mô phỏng Turnaround (5 sân bay Nhật Bản)', 'A. Turnaround Simulator (5 Japanese Airports)'],
  pax: ['B. 旅客サービス（搭乗手続・手荷物・PRM）', 'B. Dịch vụ Hành khách (Check-in, Hành lý, PRM)', 'B. Passenger Service (Check-in, Baggage, PRM)'],
  cargo: ['C. 航空貨物・ULD・IATA危険物（DGR）', 'C. Hàng hóa Hàng không, ULD & IATA DGR', 'C. Air Cargo, ULD & IATA Dangerous Goods'],
  safety: ['E. 安全管理・FOD・コンプライアンス（JCAB/SMS）', 'E. An toàn Sân đỗ, FOD & Luật JCAB/SMS', 'E. Safety, FOD & Compliance (JCAB/SMS)'],
  quiz: ['F. 特定技能 ＆ NGO車両運転講習 総合試験（140問）', 'F. Ôn thi Kỹ năng Đặc định & Bằng lái Sân đỗ NGO (140 câu)', 'F. SSW & NGO Airside Driving Exam Suite (140 Qs)'],
  ops: ['H. マーシャリング・ライトガン・MCA無線・音声辞典', 'H. Marshalling, Light Gun, MCA Radio & Từ điển', 'H. Marshalling, Light Gun, MCA Radio & Dictionary']
};

const VALID_MODULES = new Set(Object.keys(MODULE_TITLES));

const navActions = {
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
  if (appState.activeModule === 'quiz' && mod !== 'quiz') stopQuizTimer();

  appState.activeModule = mod;
  saveState();

  document.querySelectorAll('.module-screen').forEach(sec => {
    sec.classList.toggle('active', sec.id === `screen-${mod}`);
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.module === mod);
  });

  const titleEl = document.getElementById('topbar-title');
  if (titleEl && MODULE_TITLES[mod]) {
    titleEl.textContent = t(MODULE_TITLES[mod][0], MODULE_TITLES[mod][1], MODULE_TITLES[mod][2]);
  }

  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.remove('open');

  if (!skipHash) setHash(`#${mod === 'airport3d' ? '3d' : mod}`);
  renderActiveModule();
}

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
  const titleEl = document.getElementById('topbar-title');
  const pair = MODULE_TITLES[appState.activeModule];
  if (titleEl && pair) titleEl.textContent = t(pair[0], pair[1], pair[2]);
}

function registerPWA() {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('./public/sw.js').catch(() => {});
  }
}

function bootstrap() {
  applyTheme();
  updateLangToggleUI();

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => switchModule(btn.dataset.module);
  });

  const menuBtn = document.getElementById('btn-mobile-menu');
  const sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    menuBtn.onclick = () => sidebar.classList.toggle('open');
  }

  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = () => {
      appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
      saveState();
      applyTheme();
      if (appState.activeModule === 'wb') recalcAndRenderWb();
    };
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.onclick = () => {
      appState.lang = btn.dataset.lang;
      saveState();
      updateLangToggleUI();
      // Refresh W&B scenario dropdown, scenario card & cabin/hold input labels cleanly
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
