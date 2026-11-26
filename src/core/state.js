// Global State, LocalStorage Persistence, Pure Trilingual JA/VI/EN i18n Helper, Theme & Progress Badges
import { WB_SCENARIOS } from '../data/aircraft.js';

export const STORAGE_KEY = 'aviation_ops_sim_jp_pro_v3';

export const DEFAULT_STATE = {
  lang: 'ja', // 'ja' | 'vi' | 'en'
  theme: 'dark',
  unit: 'kg',
  livery: 'ANA', // 'ANA' | 'JAL' | 'PEACH' | 'JETSTAR'
  activeModule: 'dashboard',
  wbSolved: [],
  taBestScore: null,
  taCompleted: 0,
  paxSolved: [],
  cargoSolved: [],
  uldSolved: [],
  safetyChecked: {},
  safetyReports: [],
  quizStats: { answered: 0, correct: 0, bestExam: null, bestNgoExam: null },
  srsWrong: {},
  airport3dSolved: [],
  opsBestMarshal: 0,
  opsBestLightGun: 0,
  opsPushbackDone: false,
  exam3dBest: null
};

function clone(obj) {
  return typeof structuredClone === 'function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
      || localStorage.getItem('aviation_ops_sim_jp_pro_v2')
      || localStorage.getItem('aviation_ops_sim_jp_v1');
    if (!raw) return clone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    const validLang = ['ja', 'vi', 'en'].includes(parsed.lang) ? parsed.lang : 'ja';
    return {
      ...clone(DEFAULT_STATE),
      ...parsed,
      lang: validLang,
      quizStats: { ...DEFAULT_STATE.quizStats, ...(parsed.quizStats || {}) }
    };
  } catch {
    return clone(DEFAULT_STATE);
  }
}

export let appState = loadState();

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  appState = clone(DEFAULT_STATE);
  saveState();
}

export function replaceState(parsed) {
  const validLang = ['ja', 'vi', 'en'].includes(parsed.lang) ? parsed.lang : 'ja';
  appState = {
    ...clone(DEFAULT_STATE),
    ...parsed,
    lang: validLang,
    quizStats: { ...DEFAULT_STATE.quizStats, ...(parsed.quizStats || {}) }
  };
  saveState();
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch {}
  updateProgressBadges();
}

// Pure single-language selector — zero accidental mixing across JA / VI / EN
export function t(ja, vi, en) {
  if (appState.lang === 'ja') return ja;
  if (appState.lang === 'en') return en !== undefined && en !== null && en !== '' ? en : (vi || ja);
  return vi !== undefined && vi !== null && vi !== '' ? vi : ja;
}

// Kept as alias for clean single-language rendering (no forced JA + VI mixing)
export function bi(ja, vi, en) {
  return t(ja, vi, en);
}

export const STATIC_I18N = {
  brandSub: ['Three.js PBR・EFB・特定技能＆NGO運転講習', 'Three.js PBR · EFB · Hàng không & Bằng lái NGO', 'Three.js PBR · EFB · SSW & NGO Airside'],
  grpHub: ['運用ハブ', 'TRUNG TÂM ĐIỀU HÀNH', 'COMMAND HUB'],
  grpSim: ['運航 ＆ 3Dシミュレーション', 'MÔ PHỎNG BAY & 3D', 'FLIGHT & 3D SIMULATION'],
  grpOps: ['ランプ・旅客・貨物実務', 'NGHIỆP VỤ SÂN ĐỖ & HÀNG HÓA', 'RAMP, PAX & CARGO OPS'],
  grpExam: ['試験対策 ＆ 現場訓練', 'ÔN THI & THỰC HÀNH', 'EXAM & FIELD DRILLS'],
  navDashboard: ['フライト運用ハブ', 'Trung tâm Điều hành', 'Flight Ops Hub'],
  navWb: ['重量重心・搭載計画 (10機)', 'Weight & Balance (10 tàu bay)', 'Weight & Balance (10 Fleet)'],
  navAirport3d: ['3D空港・NGO運転実習', 'Sân bay 3D & Lái xe NGO', '3D Airport & NGO Driving'],
  navTurnaround: ['ターンアラウンド (5空港)', 'Turnaround (5 sân bay Nhật)', 'Turnaround (5 JP Airports)'],
  navPax: ['旅客サービス・PRM', 'Dịch vụ Hành khách & PRM', 'Passenger Service & PRM'],
  navCargo: ['貨物・3D ULDビルドアップ・DGR', 'Đóng hàng ULD 3D, Hàng hóa & DGR', '3D ULD Buildup, Cargo & DGR'],
  navSafety: ['安全管理・FOD・SMS', 'An toàn Sân đỗ, FOD & SMS', 'Safety, FOD & SMS'],
  navQuiz: ['特定技能＆NGO運転試験', 'Ôn thi Hàng không & Bằng lái NGO', 'SSW & NGO Driving Exams'],
  navOps: ['合図・無線・ライトガン・辞典', 'Tín hiệu, Light Gun, Radio & Từ điển', 'Signals, Light Gun, Radio & Dict'],
  readinessLbl: ['総合習熟度', 'MỨC ĐỘ SẴN SÀNG', 'READINESS'],
  btnExport: ['保存', 'Xuất file', 'Export'],
  btnImport: ['読込', 'Nhập file', 'Import'],
  cmdkTrigger: ['🔍 クイック検索・移動…', '🔍 Tìm nhanh / Nhảy mục…', '🔍 Quick Jump / Search…'],
  cmdkPlaceholder: [
    '機種 (B77F)・空港 (NGO/CTS)・シナリオ (S12)・用語 (ERA/ILS/FOD) を検索…',
    'Tìm máy bay (B77F), sân bay (NGO/CTS), kịch bản (S12), thuật ngữ (ERA/ILS/FOD)…',
    'Search aircraft (B77F), airport (NGO/CTS), scenario (S12), or term (ERA/ILS/FOD)…'
  ],
  wbAircraftLbl: ['機種選択 (10機種):', 'Chọn dòng tàu bay (10 loại):', 'Aircraft (10 Fleet):'],
  wbSplit3dBtn: ['🖥 3D分割ライブ表示', '🖥 Xem 3D song song', '🖥 Split 3D Live Preview'],
  wbOpen3dBtn: ['🛫 3D離陸シミュレーション', '🛫 Mở mô phỏng cất cánh 3D', '🛫 Full 3D Takeoff Sim'],
  wbPrintBtn: ['🖨 ロードシート印刷', '🖨 In Load Sheet', '🖨 Print Load Sheet'],
  wbTestsBtn: ['🧪 13件 物理テスト', '🧪 13 kiểm thử vật lý', '🧪 13 Unit Tests'],
  wbScenarioLbl: ['実務シナリオ (14題):', 'Kịch bản thực hành (14 bài):', 'Scenario (14 Cases):'],
  wbLoadScBtn: ['シナリオ読込', 'Tải kịch bản', 'Load Case'],
  wbVerifyScBtn: ['✓ 合格判定', '✓ Chấm đạt chuẩn', '✓ Verify Pass'],
  wbHintBtn: ['💡 ヒント', '💡 Gợi ý', '💡 Hint'],
  wbAutofixBtn: ['✨ 自動修正', '✨ Cân bằng mẫu', '✨ Auto-Fix'],
  wbSplit3dLabel: ['THREE.JS PBR リアルタイム連動（重心・機首角・滑走路）', 'THREE.JS PBR ĐỒNG BỘ TRỰC TIẾP (TRỌNG TÂM · GÓC NGẨNG · ĐƯỜNG BĂNG)', 'LIVE THREE.JS PBR · CG / PITCH / RUNWAY SYNC'],
  wbWeatherTitle: ['🌦 気象・滑走路パフォーマンス条件', '🌦 Điều kiện Thời tiết & Hiệu năng Đường băng', '🌦 Weather & Runway Performance'],
  wbEnvApLbl: ['離陸空港・滑走路', 'Sân bay & Đường băng', 'Airport Runway'],
  wbEnvSurfLbl: ['滑走路路面状態', 'Tình trạng mặt đường băng', 'Runway Surface'],
  wbEnvOatLbl: ['外気温 OAT (°C)', 'Nhiệt độ ngoài trời OAT (°C)', 'Outside Air Temp (°C)'],
  wbEnvWindLbl: ['向かい風(+) / 追い風(-) (kt)', 'Gió ngược (+) / Gió xuôi (-) (kt)', 'Head(+) / Tail(-) Wind (kt)'],
  wbDowTitle: ['⚖ 基本重量・燃料設定', '⚖ Trọng lượng rỗng (DOW) & Nhiên liệu', '⚖ Operating Weight & Fuel'],
  wbDowLbl: ['運航自重 DOW', 'Trọng lượng rỗng DOW', 'Dry Operating Weight'],
  wbDowArmLbl: ['DOW アーム (m)', 'Cánh tay đòn DOW (m)', 'DOW Arm (m)'],
  wbBlockFuelLbl: ['搭載燃料 (Block Fuel)', 'Nhiên liệu Block Fuel', 'Block Fuel'],
  wbTaxiFuelLbl: ['地上走行燃料 (Taxi Fuel)', 'Nhiên liệu chạy lăn (Taxi)', 'Taxi Fuel'],
  wbTripFuelLbl: ['消費燃料 (Trip Fuel)', 'Nhiên liệu bay (Trip)', 'Trip Fuel'],
  wbPaxWtLbl: ['旅客標準重量', 'Trọng lượng TB hành khách', 'Avg Pax Weight'],
  wbPaxZonesLbl: ['客室ゾーン別 旅客数 (Zone A/B/C)', 'Số hành khách theo khoang (Zone A/B/C)', 'Passengers by Cabin Zone (A/B/C)'],
  wbHoldsLbl: ['貨物室・手荷物・バラ貨物', 'Hầm hàng rời & Hành lý (Lower Deck / Bulk)', 'Cargo Holds (Bulk / Lower Deck)'],
  wbUldsLbl: ['ULD コンテナ・パレット搭載', 'Container & Pallet ULD', 'ULD Containers & Pallets'],
  wbMiscalcTitle: ['🚨 誤計算・LMC未申告シミュレーション', '🚨 Mô phỏng Tính sai Tải & Quên khai báo LMC', '🚨 Miscalculation & Unreported LMC Lab'],
  wbErrAftLbl: ['後方貨物室 未申告重量:', 'Hàng hầm sau quên khai báo:', 'Unreported AFT Cargo:'],
  wbErrFwdLbl: ['前方貨物室 未申告重量:', 'Hàng hầm trước quên khai báo:', 'Unreported FWD Cargo:'],
  wbEfbTitle: ['📊 EFB リアルタイム計器 ＆ CGエンベロープ', '📊 Đồng hồ EFB trực tiếp & Biểu đồ Trọng tâm CG', '📊 Live EFB Gauges & CG Envelope'],
  wbLoadsheetTitle: ['📄 模擬ロードシート ＆ 搭載指示書 (LIR)', '📄 Bảng Cân bằng tải mẫu (Load Sheet & LIR)', '📄 Simulated Load Sheet & LIR'],
  wbTestsTitle: ['🧪 W&B 物理計算・異常判定ユニットテスト', '🧪 Kiểm thử Đơn vị Vật lý W&B', '🧪 W&B Physics & Consequence Unit Tests'],
  footerDisclaimer: [
    '⚠ 教育・訓練専用シミュレーター（実際の運航・搭載計画には使用できません）· Aviation Ops Sim JP Pro',
    '⚠ Chỉ phục vụ huấn luyện & ôn thi (Không dùng cho điều độ bay thực tế) · Aviation Ops Sim JP Pro',
    '⚠ Training Simulation Only (Not for Real Flight Dispatch or Aircraft Loading) · Aviation Ops Sim JP Pro'
  ]
};

export function applyStaticI18n() {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = appState.lang;
  const idx = appState.lang === 'ja' ? 0 : (appState.lang === 'vi' ? 1 : 2);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const entry = STATIC_I18N[el.dataset.i18n];
    if (entry) el.textContent = entry[idx];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const entry = STATIC_I18N[el.dataset.i18nPlaceholder];
    if (entry) el.placeholder = entry[idx];
  });
}

export function applyTheme() {
  const isDark = appState.theme === 'dark';
  if (document.body) document.body.classList.toggle('theme-dark', isDark);
  const btn = document.getElementById('btn-theme-toggle');
  if (btn) {
    btn.textContent = isDark
      ? t('☀ ライト', '☀ Sáng', '☀ Light')
      : t('🌙 ダーク', '🌙 Tối EFB', '🌙 EFB Dark');
  }
}

export function computeOverallProgress() {
  const wbTotal = WB_SCENARIOS.length;
  const wbDone = appState.wbSolved.length;
  const paxDone = appState.paxSolved.length;
  const cargoDone = appState.cargoSolved.length + (appState.uldSolved || []).length;
  const safetyDone = Object.values(appState.safetyChecked).filter(Boolean).length;
  const a3dDone = (appState.airport3dSolved || []).length + ((appState.exam3dBest || 0) >= 80 ? 1 : 0);
  const bestQuiz = Math.max(appState.quizStats.bestExam || 0, appState.quizStats.bestNgoExam || 0);
  const scores = [
    Math.min(1, wbDone / wbTotal),
    appState.taBestScore !== null ? Math.min(1, appState.taBestScore / 100) : 0,
    Math.min(1, paxDone / 5),
    Math.min(1, cargoDone / 11),
    Math.min(1, safetyDone / 16),
    bestQuiz > 0 ? Math.min(1, bestQuiz / 100) : Math.min(0.6, appState.quizStats.answered / 50),
    Math.min(1, a3dDone / 4)
  ];
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
}

export function updateProgressBadges() {
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const wbTotal = WB_SCENARIOS.length;
  const wbDone = appState.wbSolved.length;
  const safetyDone = Object.values(appState.safetyChecked).filter(Boolean).length;
  const a3dDone = (appState.airport3dSolved || []).length + ((appState.exam3dBest || 0) >= 80 ? 1 : 0);
  const cargoTotalDone = appState.cargoSolved.length + (appState.uldSolved || []).length;
  const overall = computeOverallProgress();

  setTxt('badge-dashboard', `${overall}%`);
  setTxt('badge-wb', `${wbDone}/${wbTotal}`);
  setTxt('badge-turnaround', appState.taBestScore !== null ? `${appState.taBestScore}pt` : '—');
  setTxt('badge-pax', `${appState.paxSolved.length}/5`);
  setTxt('badge-cargo', `${cargoTotalDone}/11`);
  setTxt('badge-safety', `${safetyDone}/16`);
  const bestQuiz = Math.max(appState.quizStats.bestExam || 0, appState.quizStats.bestNgoExam || 0);
  setTxt('badge-quiz', bestQuiz > 0 ? `${bestQuiz}%` : `${appState.quizStats.answered}Q`);
  setTxt('badge-airport3d', `${a3dDone}/4`);
  setTxt('badge-ops', '128');

  const bar = document.getElementById('overall-bar');
  if (bar) bar.style.width = `${overall}%`;
}
