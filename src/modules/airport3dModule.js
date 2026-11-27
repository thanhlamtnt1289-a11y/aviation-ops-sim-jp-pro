// Module G: Three.js PBR 5-Airport Simulator + Direct 3D Raycasting + 10 POVs + GSE Drive + 100pt 3D Exam
import { AIRCRAFT_PROFILES } from '../data/aircraft.js';
import {
  NGO_CARGO_DISTRICT,
  A3D_AIRPORTS,
  A3D_FACILITIES,
  A3D_FLIGHT_PHASES,
  A3D_MISSIONS,
  A3D_OBSTACLES,
  A3D_RADIO_COMMS,
  A3D_VIEWPOINTS,
  computeFlightCyclePose,
  evaluateAirportZone
} from '../data/airports.js';
import { a3dAudio } from '../engines/audioEngine.js';
import { appState, bi, saveState, t } from '../core/state.js';
import { wbState } from './wbModule.js';

function makeInitialHandsOn() {
  return {
    beaconOn: true,
    chocksOn: false,
    conesOn: false,
    pbbExt: 0,
    loaderH: 0,
    uldLoaded: false,
    fods: [
      { id: 'F1', x: -5.5, z: 24.5, ja: '金属ボルト (Nose Gear前)', vi: 'Bu-lông kim loại (Trước càng mũi)', en: 'Metal Bolt (Ahead of Nose Gear)', cleared: false },
      { id: 'F2', x: -13.0, z: 12.0, ja: 'ビニール袋 (右エンジン前方)', vi: 'Túi nilon (Trước động cơ phải)', en: 'Plastic Sheet (Ahead of Starboard Engine)', cleared: false },
      { id: 'F3', x: 7.5, z: -2.0, ja: '手荷物ベルト (左主翼付近)', vi: 'Dây đai hành lý (Gần cánh trái)', en: 'Baggage Strap (Near Port Wing)', cleared: false }
    ],
    violations: 0,
    lastMsgJa: '到着完了！ビーコン消灯後、3D画面上の赤いFOD・PBB・ローダーを直接クリックまたは右パネルで操作して100点実技試験へ挑戦！',
    lastMsgVi: 'Tàu bay vừa dừng tại Spot 7! Hãy tắt Beacon rồi CLICK TRỰC TIẾP lên FOD đỏ, PBB, High-Loader trên màn hình 3D (hoặc dùng bảng bên phải)!',
    lastMsgEn: 'Aircraft on-block at Spot 7! Switch Beacon OFF first, then CLICK DIRECTLY on red 3D FOD items, PBB, and High-Loader (or use this panel) for the 100pt exam!',
    examResult: null
  };
}

export const a3d = {
  subtab: 'flight', // 'flight' | 'drive' | 'ops3d'
  airportId: 'NGO',
  fleetAircraftId: 'A320',
  weather: 'clear',
  timeOfDay: 'day',
  gfxQuality: 'high',
  labelMode: 'smart',
  expanded: false,
  soundOn: false,
  showZones: true,
  syncWbFailure: true,
  spot101BeaconOn: true,
  ngoVehMode: 'standard', // 'standard' (TT 30km/h) | 'towing' (TT + 6 carts 15km/h) | 'high38' (>3.8m) | 'backing' (Semi-Trailer Reverse Bay)
  ngoDriveScenario: 'SC1', // 'SC1' | 'SC2' | 'SC3' | 'SC4' | 'SC5' (Reverse Trailer Bay Parking)
  ngoScenarioTime: 0,
  backingBay: { cx: 218, cz: 26, len: 11.4, w: 5.0 },
  backingStatus: { hitchDeg: 0, latErr: 0, angErr: 0, depthPct: 0, jackknife: false, parked: false, hintJa: '', hintVi: '', hintEn: '' },
  prevHitch: null,
  trailerHeadings: [0, 0, 0, 0, 0, 0],
  ui: { views: false, settings: false, map: true, hudInfo: false, landSide: false, panels: {} }, // drawers / collapsible panels (kept across re-renders)
  marshalDrill: { active: false, x: 0, z: -35, heading: Math.PI / 2, v: 0, moved: false, result: null, t: 0 },
  marshallerDemoSignal: null, // null = auto phase | 'm_straight' | 'm_left' | 'm_right' | 'm_slow' | 'm_stop' | 'm_emerg_stop' | 'm_chocks' | 'm_allclear'
  ilsRedOn: true,
  blastActive: false,
  camMode: 'flight_follow',
  gseType: 'tractor',
  missionId: 'M1',
  missionDone: false,
  checkpointIdx: 0,
  brakeCheckedForEra: false,
  heldOutside101: false,
  score: 100,
  selectedFacility: 'serviceroad',
  flightPlaying: true,
  flightPhaseIdx: 0,
  flightProgress: 0,
  flightSpeed: 1,
  handsOn: makeInitialHandsOn(),
  aiTime: 0,
  veh: { x: -48, z: -38, heading: 0, speed: 0, steerAngle: 0 },
  vehTrail: [],
  cartPoses: [],
  ngoLiveAc: null,
  spotterAlert: { pushback: false, service: false, blast: false, blastDist: 999 },
  impactFlash: 0,
  impactPos: null,
  camShake: 0,
  lastSpotterWarnTime: 0,
  cam: { tx: 0, ty: 2, tz: 10, dist: 105, yaw: 0.45, pitch: 0.50 },
  driveZoom: 1.0,
  _lastMinimapMs: 0,
  _lastBkDomMs: 0,
  keys: { up: false, down: false, left: false, right: false, brake: false },
  dragging: false,
  lastMouse: { x: 0, y: 0 },
  lastViolTime: 0,
  logs: [],
  rafId: null,
  lastFrame: 0,
  initialized: false
};

let scene3d = null;
let toastTimer = null;

function showRaycastToast(msg) {
  const el = document.getElementById('a3d-raycast-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function handle3DInteract(hit) {
  if (a3d.subtab !== 'ops3d') {
    showRaycastToast(t('「3. 操作実習」タブで3D直接クリック操作が使えます', 'Chuyển sang Tab 3 (Thực hành 3D) để click thao tác trực tiếp!', 'Switch to Tab 3 (Direct 3D Ops) to click-interact with FOD/PBB/Loader!'));
    return;
  }
  if (hit.type === 'fod') {
    collectHandsOnFod(hit.id);
    showRaycastToast(`✓ ${t('3DクリックでFOD回収', 'Click 3D nhặt sạch FOD', '3D Click Collected FOD')} [${hit.id}]!`);
  } else if (hit.type === 'pbb') {
    setHandsOnPbb(a3d.handsOn.pbbExt > 0.5 ? 0 : 100);
    renderHandsOnPanel();
    showRaycastToast(a3d.handsOn.pbbExt > 0.5 ? '✓ PBB Docked (100%)' : 'PBB Retracted (0%)');
  } else if (hit.type === 'loader') {
    if (a3d.handsOn.loaderH < 0.85) {
      setHandsOnLoader(100);
      renderHandsOnPanel();
      showRaycastToast('✓ High-Lift Loader Raised (100%) — Click again to load ULD!');
    } else {
      toggleHandsOnUld();
      showRaycastToast(a3d.handsOn.uldLoaded ? '✓ AKH ULD Loaded!' : 'ULD Unloaded');
    }
  } else if (hit.type === 'chocks') {
    toggleHandsOnChocks();
    showRaycastToast(a3d.handsOn.chocksOn ? '✓ Chocks ON' : 'Chocks OFF');
  }
}

function logA3d(type, ja, vi, en) {
  a3d.logs.unshift({ type, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), ja, vi, en: en || vi });
  if (a3d.logs.length > 20) a3d.logs.pop();
  const el = document.getElementById('a3d-log-list');
  if (el) {
    el.innerHTML = a3d.logs.map(l => `<div class="alert alert-${l.type === 'ok' ? 'ok' : (l.type === 'danger' ? 'danger' : (l.type === 'warn' ? 'warn' : 'info'))}" style="padding:6px 9px;font-size:12px;margin-bottom:5px;">[${l.time}] ${t(l.ja, l.vi, l.en)}</div>`).join('');
  }
}

function checkHandsOnSafety(label) {
  if (a3d.handsOn.beaconOn) {
    a3d.handsOn.violations += 1;
    a3dAudio.playBeep(360, 0.25);
    a3d.handsOn.lastMsgJa = `⚠ 安全違反 (-15pt): 赤ビーコン点灯中に「${label}」を実施しました！先にビーコンOFFを確認してください。`;
    a3d.handsOn.lastMsgVi = `⚠ VI PHẠM AN TOÀN (-15đ): Thao tác "${label}" khi đèn Beacon đỏ đang SÁNG! Phải tắt Beacon trước.`;
    a3d.handsOn.lastMsgEn = `⚠ SAFETY VIOLATION (-15pt): Performed "${label}" while Red Beacon was still ON! Switch Beacon OFF first.`;
    return false;
  }
  return true;
}

export function toggleHandsOnBeacon() {
  a3d.handsOn.beaconOn = !a3d.handsOn.beaconOn;
  a3dAudio.playChirp();
  a3d.handsOn.lastMsgJa = a3d.handsOn.beaconOn ? '衝突防止灯 ON — 接近禁止！' : 'ビーコン消灯よし！3D上のFOD・PBB・ローダーをクリック操作できます。';
  a3d.handsOn.lastMsgVi = a3d.handsOn.beaconOn ? 'Beacon ON — Cấm tiếp cận!' : 'Beacon OFF! Bạn có thể click thẳng FOD/PBB/Loader trên 3D hoặc thao tác bảng này.';
  a3d.handsOn.lastMsgEn = a3d.handsOn.beaconOn ? 'Anti-Collision Beacon ON — Do Not Approach!' : 'Beacon OFF verified! Click FOD, PBB, and High-Loader directly in 3D or use controls below.';
  renderHandsOnPanel();
}
export function toggleHandsOnChocks() {
  if (!a3d.handsOn.chocksOn && !checkHandsOnSafety('Chocks')) { renderHandsOnPanel(); return; }
  a3d.handsOn.chocksOn = !a3d.handsOn.chocksOn;
  a3dAudio.playChirp();
  renderHandsOnPanel();
}
export function toggleHandsOnCones() {
  if (!a3d.handsOn.conesOn && !checkHandsOnSafety('Cones')) { renderHandsOnPanel(); return; }
  a3d.handsOn.conesOn = !a3d.handsOn.conesOn;
  a3dAudio.playChirp();
  renderHandsOnPanel();
}
export function collectHandsOnFod(fid) {
  if (!checkHandsOnSafety('FOD Walkaround')) { renderHandsOnPanel(); return; }
  const f = a3d.handsOn.fods.find(x => x.id === fid);
  if (f) {
    f.cleared = true;
    a3dAudio.playChirp();
    a3d.handsOn.lastMsgJa = `✓ FOD [${fid}] を回収しました！`;
    a3d.handsOn.lastMsgVi = `✓ Đã nhặt sạch FOD [${fid}] trên sân đỗ!`;
    a3d.handsOn.lastMsgEn = `✓ Collected and cleared FOD [${fid}] from the stand!`;
  }
  renderHandsOnPanel();
}
export function setHandsOnPbb(val) {
  const v = Math.max(0, Math.min(100, Number(val) || 0)) / 100;
  if (v > 0.1 && !checkHandsOnSafety('PBB')) { renderHandsOnPanel(); return; }
  a3d.handsOn.pbbExt = v;
  const lbl = document.getElementById('ho-pbb-pct');
  if (lbl) lbl.textContent = `${Math.round(v * 100)}%`;
}
export function setHandsOnLoader(val) {
  const v = Math.max(0, Math.min(100, Number(val) || 0)) / 100;
  if (v > 0.1 && !checkHandsOnSafety('High-Lift Loader')) { renderHandsOnPanel(); return; }
  a3d.handsOn.loaderH = v;
  const lbl = document.getElementById('ho-ldr-pct');
  if (lbl) lbl.textContent = `${Math.round(v * 100)}%`;
}
export function toggleHandsOnUld() {
  if (!checkHandsOnSafety('Load ULD')) { renderHandsOnPanel(); return; }
  if (a3d.handsOn.loaderH < 0.85) {
    a3dAudio.playBeep(480, 0.18);
    a3d.handsOn.lastMsgJa = '⚠ ローダーを85%以上上げてからULDを押し込んでください！';
    a3d.handsOn.lastMsgVi = '⚠ Hãy nâng sàn High-Lift Loader lên ≥85% trước khi nạp thùng ULD!';
    a3d.handsOn.lastMsgEn = '⚠ Raise the High-Lift Loader platform to ≥85% before transferring the AKH ULD!';
    renderHandsOnPanel();
    return;
  }
  a3d.handsOn.uldLoaded = !a3d.handsOn.uldLoaded;
  a3dAudio.playChirp();
  renderHandsOnPanel();
}
export function gradeHandsOn3dExam() {
  const ho = a3d.handsOn;
  let score = 0;
  const notes = [];
  if (!ho.beaconOn) { score += 15; notes.push('✓ Beacon OFF (+15)'); } else notes.push('✗ Beacon still ON (0/15)');
  if (ho.chocksOn && ho.conesOn) { score += 20; notes.push('✓ Chocks & Cones (+20)'); } else notes.push('✗ Missing Chocks/Cones (0/20)');
  const fodCnt = ho.fods.filter(f => f.cleared).length;
  score += fodCnt * 10;
  notes.push(`${fodCnt === 3 ? '✓' : '⚠'} FOD Walkaround ${fodCnt}/3 (+${fodCnt * 10}/30)`);
  if (ho.pbbExt >= 0.9) { score += 15; notes.push('✓ Port PBB Docked (+15)'); } else notes.push('✗ PBB not docked ≥90% (0/15)');
  if (ho.loaderH >= 0.85 && ho.uldLoaded) { score += 20; notes.push('✓ High-Loader & AKH ULD (+20)'); } else notes.push('✗ ULD not loaded (0/20)');
  if (ho.violations > 0) {
    const pen = ho.violations * 15;
    score = Math.max(0, score - pen);
    notes.push(`⚠ Safety Violations: -${pen}pt`);
  }
  ho.examResult = { score, notes };
  if (appState.exam3dBest === null || score > appState.exam3dBest) {
    appState.exam3dBest = score;
    saveState();
  }
  a3dAudio.playChirp();
  renderHandsOnPanel();
}
export function resetHandsOn3d() {
  a3d.handsOn = makeInitialHandsOn();
  renderHandsOnPanel();
}

function renderHandsOnPanel() {
  const el = document.getElementById('a3d-handson-panel');
  if (!el) return;
  const ho = a3d.handsOn;
  const fodCleared = ho.fods.filter(f => f.cleared).length;
  el.innerHTML = `
    <div class="alert ${ho.violations > 0 ? 'alert-danger' : 'alert-info'}" style="font-size:12.5px;margin-bottom:10px;">
      ${t(ho.lastMsgJa, ho.lastMsgVi, ho.lastMsgEn)}
    </div>
    <div class="section-label">1. ${t('安全確認・輪止め・コーン', 'Khóa an toàn Beacon, Chèn bánh & Cọc tiêu', 'Beacon Safety Check, Chocks & Cones')}</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
      <button class="btn btn-sm ${ho.beaconOn ? 'btn-danger-outline' : 'btn-primary'}" id="ho-btn-beacon">${ho.beaconOn ? '🔴 Beacon ON → OFF' : '⚪ Beacon OFF (SAFE)'}</button>
      <button class="btn btn-sm ${ho.chocksOn ? 'btn-primary' : ''}" id="ho-btn-chocks">${ho.chocksOn ? '✓ Chocks ON' : t('輪止め (Chocks)', 'Chèn bánh (Chocks)', 'Wheel Chocks')}</button>
      <button class="btn btn-sm ${ho.conesOn ? 'btn-primary' : ''}" id="ho-btn-cones">${ho.conesOn ? '✓ Cones ON' : t('コーン (Cones)', 'Cọc tiêu (Cones)', 'Safety Cones')}</button>
    </div>
    <div class="section-label">2. ${t('ウォークアラウンド FOD回収（3D上を直接クリックも可）', 'Nhặt 3 FOD (Click thẳng trên 3D hoặc bấm bên dưới)', 'Walkaround FOD Sweep (Click Directly in 3D or Below)')} (${fodCleared}/3)</div>
    <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
      ${ho.fods.map(f => `<button class="btn btn-sm ${f.cleared ? '' : 'btn-danger-outline'}" data-fod="${f.id}" ${f.cleared ? 'disabled' : ''} style="justify-content:space-between;"><span>${f.cleared ? '✓' : '⚠'} [${f.id}] ${t(f.ja, f.vi, f.en)}</span><span>${f.cleared ? 'CLEARED' : t('回収', 'Nhặt', 'Pick Up')}</span></button>`).join('')}
    </div>
    <div class="section-label">3. ${t('PBB ＆ Low-Deck ハイリフト操作', 'Điều khiển PBB & High-Lift Loader', 'Port PBB & Starboard High-Lift Loader')}</div>
    <div class="field" style="margin-bottom:8px;">
      <label>${t('左舷 PBB スライド', 'Ống lồng PBB L1', 'Port L1 PBB Extension')}: <strong id="ho-pbb-pct">${Math.round(ho.pbbExt * 100)}%</strong></label>
      <input type="range" id="ho-rng-pbb" min="0" max="100" value="${Math.round(ho.pbbExt * 100)}" />
    </div>
    <div class="field" style="margin-bottom:8px;">
      <label>${t('右舷 High-Loader 昇降', 'Độ cao Low-Deck Loader', 'Starboard High-Loader Lift')}: <strong id="ho-ldr-pct">${Math.round(ho.loaderH * 100)}%</strong></label>
      <input type="range" id="ho-rng-ldr" min="0" max="100" value="${Math.round(ho.loaderH * 100)}" />
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
      <button class="btn btn-sm ${ho.uldLoaded ? 'btn-primary' : ''}" id="ho-btn-uld">${ho.uldLoaded ? '✓ AKH ULD Loaded' : t('📦 AKH ULD搭載', '📦 Nạp thùng AKH ULD', '📦 Load AKH ULD')}</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-sm btn-primary" id="ho-btn-grade">🏆 ${t('3D実技試験 採点 (100点)', 'Chấm điểm Thi 3D (100đ)', 'Grade 3D Practical Exam (100pt)')}</button>
      <button class="btn btn-sm" id="ho-btn-reset">↺ ${t('リセット', 'Làm lại', 'Reset')}</button>
    </div>
    ${ho.examResult ? `
      <div class="alert ${ho.examResult.score >= 80 ? 'alert-ok' : 'alert-warn'}" style="margin-top:10px;margin-bottom:0;font-size:12.5px;">
        <strong>SCORE: ${ho.examResult.score} / 100 (${ho.examResult.score >= 80 ? 'PASS 合格' : 'RETRY'})</strong>
        <ul style="margin:5px 0 0 16px;padding:0;">${ho.examResult.notes.map(n => `<li>${n}</li>`).join('')}</ul>
      </div>
    ` : ''}
  `;
  document.getElementById('ho-btn-beacon').onclick = toggleHandsOnBeacon;
  document.getElementById('ho-btn-chocks').onclick = toggleHandsOnChocks;
  document.getElementById('ho-btn-cones').onclick = toggleHandsOnCones;
  document.getElementById('ho-btn-uld').onclick = toggleHandsOnUld;
  document.getElementById('ho-btn-grade').onclick = gradeHandsOn3dExam;
  document.getElementById('ho-btn-reset').onclick = resetHandsOn3d;
  document.getElementById('ho-rng-pbb').oninput = e => setHandsOnPbb(e.target.value);
  document.getElementById('ho-rng-ldr').oninput = e => setHandsOnLoader(e.target.value);
  el.querySelectorAll('[data-fod]').forEach(b => { b.onclick = () => collectHandsOnFod(b.dataset.fod); });
}

function renderFlightPhasePanel() {
  const ph = A3D_FLIGHT_PHASES[a3d.flightPhaseIdx];
  const radio = A3D_RADIO_COMMS[a3d.flightPhaseIdx];
  const radioEl = document.getElementById('a3d-radio-bar');
  if (radioEl && radio) {
    radioEl.innerHTML = `<span class="radio-dot"></span><strong style="color:#38BDF8;flex-shrink:0;">[${radio.ch}]</strong><span class="ja">${t(radio.ja, radio.vi, radio.en)}</span>`;
  }
  const strip = document.getElementById('a3d-phase-strip');
  if (strip) {
    strip.innerHTML = A3D_FLIGHT_PHASES.map((item, i) => `
      <button class="phase-chip ${i === a3d.flightPhaseIdx ? 'active' : (i < a3d.flightPhaseIdx ? 'passed' : '')}" data-phase="${i}">
        <strong>${i + 1}.</strong> ${t(item.tagJa, item.tagVi, item.tagEn)}
      </button>
    `).join('');
    strip.querySelectorAll('[data-phase]').forEach(b => {
      b.onclick = () => { a3d.flightPhaseIdx = Number(b.dataset.phase); a3d.flightProgress = 0; a3dAudio.playChirp(); renderFlightPhasePanel(); };
    });
  }
  const panel = document.getElementById('a3d-flight-roles-panel');
  if (panel) {
    panel.innerHTML = `
      <div class="alert alert-info" style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;">
          <strong>${t(ph.titleJa, ph.titleVi, ph.titleEn)}</strong>
          <span class="badge badge-accent">STEP ${a3d.flightPhaseIdx + 1} / 10</span>
        </div>
        <div class="progress-bar-wrap" style="margin:7px 0 4px;"><div class="progress-bar-fill" id="a3d-flight-prog" style="width:${Math.round(a3d.flightProgress * 100)}%"></div></div>
        <div style="font-size:12px;margin-top:4px;"><strong>${t('安全ポイント:', 'Trọng điểm an toàn:', 'Safety Key Point:')}</strong> ${t(ph.safetyJa, ph.safetyVi, ph.safetyEn)}</div>
      </div>
      ${ph.roles.map(r => {
        const tasks = appState.lang === 'ja' ? r.tasksJa : (appState.lang === 'en' ? (r.tasksEn || r.tasksVi) : r.tasksVi);
        return `
        <div class="crew-role-card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:13px;">${bi(r.roleJa, r.roleVi, r.roleEn)}</strong>
            <span class="badge badge-neutral">${r.badge}</span>
          </div>
          <ul>${tasks.map(tk => `<li class="ja">${tk}</li>`).join('')}</ul>
        </div>
      `;
      }).join('')}
    `;
  }
}

export function setA3dViewpoint(vpId) {
  a3d.camMode = vpId;
  document.querySelectorAll('[data-vp]').forEach(b => b.classList.toggle('btn-primary', b.dataset.vp === vpId));
  const vp = A3D_VIEWPOINTS.find(v => v.id === vpId);
  const descEl = document.getElementById('a3d-vp-desc');
  if (descEl && vp) descEl.textContent = `[${vp.key}] ${t(vp.ja, vp.vi, vp.en)} — ${t(vp.descJa, vp.descVi, vp.descEn)}`;
}

function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function resetBackingScenario() {
  // Wide-open Cargo Apron Practice Yard: TT faces West (-X), trailer tail points East (+X) toward BAY 01 (218, 26) — synced with AirportScene3D.js!
  a3d.ngoDriveScenario = 'SC5';
  a3d.ngoVehMode = 'backing';
  a3d.ngoScenarioTime = 0;
  a3d.veh.x = 197.0;
  a3d.veh.z = 22.2;
  a3d.veh.heading = Math.PI - 0.08;
  a3d.veh.speed = 0;
  a3d.veh.steerAngle = 0;
  a3d.prevHitch = null;
  a3d.trailerHeadings = [Math.PI - 0.08, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI];
  a3d.backingStatus = { hitchDeg: 0, latErr: -3.8, angErr: 5, depthPct: 0, jackknife: false, parked: false, hintJa: '', hintVi: '', hintEn: '' };
  a3d.camMode = 'backing';
  const hx = a3d.veh.x - Math.cos(a3d.veh.heading) * 1.95;
  const hz = a3d.veh.z - Math.sin(a3d.veh.heading) * 1.95;
  const th = a3d.trailerHeadings[0];
  a3d.cartPoses = [{ x: hx - Math.cos(th) * 3.2, z: hz - Math.sin(th) * 3.2, heading: th }];
}

function stepPhysics(dt, now) {
  a3d.aiTime += dt;
  const hudZone = document.getElementById('a3d-hud-zone');
  const hudSpd = document.getElementById('a3d-hud-spd');
  const hudScr = document.getElementById('a3d-hud-score');

  if (a3d.subtab === 'ops3d') {
    const ho = a3d.handsOn;
    const fCnt = ho.fods.filter(f => f.cleared).length;
    if (hudZone) { hudZone.textContent = ho.beaconOn ? '🔴 BEACON ON — WAIT' : '🟢 CLICK 3D FOD / PBB / LOADER'; hudZone.className = `hud-pill ${ho.beaconOn ? 'danger' : 'ok'}`; }
    if (hudSpd) hudSpd.textContent = `FOD ${fCnt}/3 | PBB ${Math.round(ho.pbbExt * 100)}%`;
    if (hudScr) hudScr.textContent = `VIOL ${ho.violations}`;
    return;
  }

  if (a3d.subtab === 'flight' && a3d.marshalDrill.active) {
    updateMarshalDrill(dt);
    const md = a3d.marshalDrill;
    const toStop = STOP_Z - md.z;
    if (hudZone) { hudZone.textContent = `🚧 ${t('誘導実習', 'Tập dẫn tàu', 'Lead-in drill')}`; hudZone.className = 'hud-pill ok'; }
    if (hudSpd) hudSpd.textContent = `${(md.v * 3.6).toFixed(1)} km/h`;
    if (hudScr) hudScr.textContent = `${toStop >= 0 ? '▲' : '▼'} ${Math.abs(toStop).toFixed(1)} m`;
    const live = document.getElementById('a3d-drill-live');
    if (live) {
      const r = md.result;
      live.innerHTML = r
        ? `<div class="alert ${r.ok ? 'alert-ok' : 'alert-danger'}" style="margin:0;">${t(r.ja, r.vi, r.en)}<br><span class="mono">${t('停止誤差', 'Sai lệch dừng', 'Stop error')}: ${r.stopErr >= 0 ? '+' : ''}${r.stopErr.toFixed(2)} m · ${t('横ずれ', 'Lệch ngang', 'Lateral')}: ${r.lat.toFixed(2)} m · ${t('機首角', 'Lệch hướng', 'Heading')}: ${r.hdg.toFixed(1)}°</span></div>`
        : `<div class="drill-gauges"><span>${t('速度', 'Tốc độ', 'Speed')} <b>${(md.v * 3.6).toFixed(1)}</b> km/h</span><span>${t('停止線まで', 'Còn tới vạch', 'To stop bar')} <b>${toStop.toFixed(1)}</b> m</span><span>${t('横ずれ', 'Lệch ngang', 'Lateral')} <b>${md.x >= 0 ? t('左', 'trái', 'L') : t('右', 'phải', 'R')} ${Math.abs(md.x).toFixed(1)}</b> m</span></div>`;
    }
    return;
  }

  if (a3d.subtab === 'flight') {
    const ph = A3D_FLIGHT_PHASES[a3d.flightPhaseIdx];
    if (a3d.flightPlaying) {
      a3d.flightProgress += (dt * a3d.flightSpeed) / ph.duration;
      if (a3d.flightProgress >= 1) {
        a3d.flightProgress = 0;
        a3d.flightPhaseIdx = (a3d.flightPhaseIdx + 1) % A3D_FLIGHT_PHASES.length;
        a3dAudio.playChirp();
        renderFlightPhasePanel();
      }
    }
    const pose = computeFlightCyclePose(a3d.flightPhaseIdx, a3d.flightProgress);
    const gsKt = Math.round((pose.ac.gs || 0) * 1.944);
    const compactHud = window.innerWidth <= 900;
    if (hudZone) { hudZone.textContent = `${a3d.flightPhaseIdx + 1}/10 · ${t(ph.tagJa, ph.tagVi, ph.tagEn)}`; hudZone.className = `hud-pill ${pose.ac.beaconOn ? 'danger' : 'ok'}`; }
    if (hudSpd) hudSpd.textContent = compactHud
      ? `${gsKt} kt${pose.ac.y > 1 ? ` · ${Math.round(pose.ac.y)}m` : ''}`
      : `GS ${gsKt} kt${pose.ac.y > 1 ? ` · ALT ${Math.round(pose.ac.y)} m` : ''} · ${pose.ac.beaconOn ? 'BEACON ON' : 'BEACON OFF'}`;
    if (hudScr) hudScr.textContent = compactHud
      ? `${Math.round(a3d.flightProgress * 100)}% · ${pose.ac.beaconOn ? 'BEACON ON' : 'BEACON OFF'}`
      : `${Math.round(a3d.flightProgress * 100)}%`;
    const bar = document.getElementById('a3d-flight-prog');
    if (bar) bar.style.width = `${Math.round(a3d.flightProgress * 100)}%`;
    return;
  }

  // Decay impact flash & camera shake smoothly
  a3d.impactFlash = Math.max(0, (a3d.impactFlash || 0) - dt * 2.2);
  a3d.camShake = Math.max(0, (a3d.camShake || 0) - dt * 2.6);

  // Live Chubu Centrair (NGO) Driving Scenarios (Moving Departing / Taxiing Aircraft + Active Spotters!)
  a3d.ngoScenarioTime = (a3d.ngoScenarioTime || 0) + dt;
  const st = a3d.ngoScenarioTime;
  let liveAc = { x: 0, z: 10, heading: Math.PI / 2, beaconOn: false, chocksOn: true, blastOn: false, mode: 'parked' };
  const sAlert = { pushback: false, service: false, blast: false, blastDist: 999 };

  if (a3d.ngoDriveScenario === 'SC1') {
    // SC1: Aircraft at Spot 7 activates 6 Pushback/Self-Taxi-Out signs & pushes across Behind-Stand Road (-38)!
    const cyc = st % 28;
    if (cyc < 5) {
      liveAc = { x: 0, z: 10, heading: Math.PI / 2, beaconOn: true, chocksOn: false, blastOn: false, mode: 'pushback' };
      sAlert.pushback = true;
    } else if (cyc < 16) {
      const p = (cyc - 5) / 11;
      liveAc = { x: 0, z: 10 - p * 54, heading: Math.PI / 2, beaconOn: true, chocksOn: false, blastOn: true, mode: 'pushback' };
      sAlert.pushback = true;
    } else if (cyc < 22) {
      const p = (cyc - 16) / 6;
      liveAc = { x: p * 75, z: -44 - p * 11, heading: Math.PI / 2 - p * (Math.PI / 2), beaconOn: true, chocksOn: false, blastOn: true, mode: 'pushback' };
      sAlert.pushback = p < 0.7;
    } else {
      // Safe window — Spotter waves CLEAR!
      liveAc = { x: 110, z: -55, heading: 0, beaconOn: true, chocksOn: false, blastOn: false, mode: 'clear' };
      sAlert.pushback = false;
    }
  } else if (a3d.ngoDriveScenario === 'SC2') {
    // SC2: Taxiing aircraft crosses Service Lane (-31, -62) — player MUST wait until >=100m true meter clearance!
    const cyc = st % 26;
    const tx = -145 + (cyc / 26) * 320;
    liveAc = { x: tx, z: -62, heading: 0, beaconOn: true, chocksOn: false, blastOn: true, mode: 'taxi_cross' };
    const tailDist = tx >= -31 ? Math.max(0, Math.round((tx - 19) - (-31))) : 0;
    sAlert.blastDist = tailDist;
    sAlert.service = (tx > -115 && tailDist < 100); // True 1:1 100m jet-blast clearance behind aircraft tail!
  } else if (a3d.ngoDriveScenario === 'SC3') {
    // SC3: 24h Engine Run-Up at Spot 7 (Anti-collision ON + Chocks STILL IN!) + #71 Blast Active
    liveAc = { x: 0, z: 10, heading: Math.PI / 2, beaconOn: true, chocksOn: true, blastOn: true, mode: 'runup' };
    sAlert.pushback = true;
    sAlert.blast = true;
  } else {
    // SC4: High Vehicle >3.8m + ILS Red Lamp + Fire Station Check
    liveAc = { x: 0, z: 10, heading: Math.PI / 2, beaconOn: false, chocksOn: true, blastOn: false, mode: 'parked' };
  }
  a3d.ngoLiveAc = liveAc;
  a3d.spotterAlert = sAlert;

  // Open-Cab TT Driving & Realistic Steering Physics
  const v = a3d.veh;
  const targetSteer = (a3d.keys.left ? -0.52 : 0) + (a3d.keys.right ? 0.52 : 0);
  v.steerAngle = (v.steerAngle || 0) + (targetSteer - (v.steerAngle || 0)) * Math.min(1, dt * 11);

  const isBackMode = a3d.ngoDriveScenario === 'SC5' || a3d.ngoVehMode === 'backing';
  if (a3d.keys.brake) v.speed = Math.abs(v.speed) < 0.35 ? 0 : v.speed - Math.sign(v.speed) * 20 * dt;
  else if (a3d.keys.up) v.speed = Math.min(isBackMode ? 7.5 : 12.2, v.speed + 8.5 * dt);
  else if (a3d.keys.down) v.speed = Math.max(isBackMode ? -3.4 : -4.5, v.speed - 7.5 * dt);
  else v.speed = Math.abs(v.speed) < 0.15 ? 0 : v.speed - Math.sign(v.speed) * 5.2 * dt;

  if (Math.abs(v.speed) > 0.10) {
    const dir = v.speed >= 0 ? 1 : -1;
    // True bicycle-model turning rate when reversing semi-trailer (~0.48 rad/s -> controlled 28°/s, never instant jackknife!)
    const steerGain = (isBackMode && v.speed < 0) ? 0.92 : (isBackMode ? 2.2 : 3.4);
    v.heading += v.steerAngle * steerGain * dt * dir * Math.min(1, Math.abs(v.speed) / 3.0);
  }
  const nx = Math.max(-2072, Math.min(2142, v.x + Math.cos(v.heading) * v.speed * dt));
  const nz = Math.max(-698, Math.min(340, v.z + Math.sin(v.heading) * v.speed * dt));

  // Full 1:1 NGO Island Collision Detection (T1, 300m Center Pier, T2, Blast Fences, Cargo Sheds, Parked & Live Aircraft)
  const dynamicObs = [
    ...A3D_OBSTACLES,
    { x1: -1012, x2: -1006, z1: 52, z2: 118, name: 'T2 Blast Fence' },
    { x1: -72, x2: -64, z1: -8, z2: 28, name: 'Spot 6 Aircraft' },
    { x1: 94, x2: 102, z1: -12, z2: 32, name: 'Spot 14 Aircraft' },
    { x1: liveAc.x - 5.5, x2: liveAc.x + 5.5, z1: liveAc.z - 16, z2: liveAc.z + 16, name: 'Active Aircraft' }
  ];
  const pad = 1.65;
  const hitObj = dynamicObs.find(o => nx >= o.x1 - pad && nx <= o.x2 + pad && nz >= o.z1 - pad && nz <= o.z2 + pad);

  if (hitObj) {
    const impactKmh = Math.abs(v.speed) * 3.6;
    // Realistic physical bounce & push-out along shortest penetration axis!
    const dL = Math.abs(nx - (hitObj.x1 - pad));
    const dR = Math.abs((hitObj.x2 + pad) - nx);
    const dT = Math.abs(nz - (hitObj.z1 - pad));
    const dB = Math.abs((hitObj.z2 + pad) - nz);
    const mMin = Math.min(dL, dR, dT, dB);
    if (mMin === dL) v.x = hitObj.x1 - pad - 0.35;
    else if (mMin === dR) v.x = hitObj.x2 + pad + 0.35;
    else if (mMin === dT) v.z = hitObj.z1 - pad - 0.35;
    else v.z = hitObj.z2 + pad + 0.35;

    v.speed = -v.speed * 0.42;
    v.heading += (Math.random() - 0.5) * Math.min(0.24, impactKmh * 0.012);
    if (impactKmh > 3.0 && now - a3d.lastViolTime > 1200) {
      a3d.lastViolTime = now;
      a3d.impactFlash = Math.min(1.0, 0.45 + impactKmh / 28);
      a3d.impactPos = { x: nx, z: nz };
      a3d.camShake = Math.min(1.0, 0.35 + impactKmh / 25);
      const pen = impactKmh > 15 ? 25 : 15;
      a3d.score = Math.max(0, a3d.score - pen);
      a3dAudio.playCrash(Math.min(1.4, impactKmh / 14));
      logA3d(
        'danger',
        `💥 衝突事故発生 (${impactKmh.toFixed(0)}km/h · -${pen}pt): 現場保存し直ちにCOC (0569-38-1500 / 内線3000) へ通報せよ！`,
        `💥 VA CHẠM CHƯỚNG NGẠI (${impactKmh.toFixed(0)} km/h · -${pen}đ): Giữ nguyên hiện trường và báo ngay COC (0569-38-1500 / nội bộ 3000)!`,
        `💥 COLLISION (${impactKmh.toFixed(0)} km/h · -${pen}pt): Preserve the scene and report immediately to COC (0569-38-1500 / Ext. 3000)!`
      );
    }
  } else {
    v.x = nx;
    v.z = nz;
    // TRUE Articulated Rigid-Hitch Tractor-Trailer Kinematics (Realistic Forward & Reverse Counter-Steering!)
    const isBacking = a3d.ngoDriveScenario === 'SC5' || a3d.ngoVehMode === 'backing';
    const numUnits = isBacking ? 1 : 6;
    const wheelBase = isBacking ? 6.1 : 3.15;
    const hitchArm = isBacking ? 1.95 : 1.9;
    const curHx0 = v.x - Math.cos(v.heading) * hitchArm;
    const curHz0 = v.z - Math.sin(v.heading) * hitchArm;

    if (!a3d.prevHitch || Math.hypot(curHx0 - a3d.prevHitch.x, curHz0 - a3d.prevHitch.z) > 6.0) {
      a3d.prevHitch = { x: curHx0, z: curHz0 };
      if (!a3d.trailerHeadings || a3d.trailerHeadings.length < 6) {
        a3d.trailerHeadings = [v.heading, v.heading, v.heading, v.heading, v.heading, v.heading];
      }
    }

    const cartPoses = [];
    let parentHdg = v.heading;
    let hitchX = curHx0;
    let hitchZ = curHz0;
    let prevHx = a3d.prevHitch.x;
    let prevHz = a3d.prevHitch.z;

    for (let ci = 0; ci < numUnits; ci++) {
      let phi = a3d.trailerHeadings[ci] ?? parentHdg;
      const dHx = hitchX - prevHx;
      const dHz = hitchZ - prevHz;
      if (Math.hypot(dHx, dHz) > 0.0005) {
        // Exact non-holonomic rigid hitch angular displacement (naturally self-aligns forward & jackknifes in reverse!)
        const lateralDisp = -Math.sin(phi) * dHx + Math.cos(phi) * dHz;
        phi = wrapAngle(phi + lateralDisp / wheelBase);
      }
      // Physical hitch bumper limit (±78°) so trailer never clips into TT cab
      let diff = wrapAngle(phi - parentHdg);
      if (Math.abs(diff) > 1.36) {
        diff = Math.sign(diff) * 1.36;
        phi = wrapAngle(parentHdg + diff);
      }
      a3d.trailerHeadings[ci] = phi;

      const cx = hitchX - Math.cos(phi) * (wheelBase * 0.52);
      const cz = hitchZ - Math.sin(phi) * (wheelBase * 0.52);
      cartPoses.push({ x: cx, z: cz, heading: phi });

      // Next trailer's hitch is at the rear of this cart
      const nextPrevHx = prevHx - Math.cos(phi) * wheelBase;
      const nextPrevHz = prevHz - Math.sin(phi) * wheelBase;
      hitchX = hitchX - Math.cos(phi) * wheelBase;
      hitchZ = hitchZ - Math.sin(phi) * wheelBase;
      prevHx = nextPrevHx;
      prevHz = nextPrevHz;
      parentHdg = phi;
    }
    a3d.prevHitch = { x: curHx0, z: curHz0 };
    a3d.cartPoses = cartPoses;

    // SC5 Live Reverse Bay-Parking Telemetry, Counter-Steer Assistant & Cone Collision Grading
    if (isBacking && cartPoses[0]) {
      const tr = cartPoses[0];
      const bay = a3d.backingBay;
      const hitchDeg = Math.round(Math.abs(wrapAngle(tr.heading - v.heading)) * 180 / Math.PI);
      const jackknife = hitchDeg >= 62;
      const latErr = Number((tr.z - bay.cz).toFixed(2));
      const angErr = Math.round(Math.abs(wrapAngle(tr.heading - Math.PI)) * 180 / Math.PI);
      // Bay X spans [212.3, 223.7] (cx 218 ± len/2); depth 100% when trailer center reaches x ≈ 217.8
      const depthPct = Math.max(0, Math.min(100, Math.round(((tr.x - 209.0) / 8.8) * 100)));
      const tailX = tr.x - Math.cos(tr.heading) * 3.1;
      const tailZ = tr.z - Math.sin(tr.heading) * 3.1;

      // Check rear dock wall bumper (+X >= 223.55) & side bay cones (|z - 26| > 1.95 when trailer inside bay X)
      const hitBackWall = tailX >= bay.cx + bay.len * 0.5 - 0.15;
      const hitSideCones = (tailX > bay.cx - bay.len * 0.5 + 0.4) && (Math.abs(tailZ - bay.cz) > bay.w * 0.5 - 0.55);
      if ((hitBackWall || hitSideCones) && Math.abs(v.speed) > 0.3 && now - a3d.lastViolTime > 1500) {
        a3d.lastViolTime = now;
        v.speed = -v.speed * 0.35;
        a3d.impactFlash = 0.65;
        a3d.camShake = 0.55;
        a3d.score = Math.max(0, a3d.score - 10);
        a3dAudio.playCrash(0.65);
        logA3d(
          'danger',
          hitBackWall ? '💥 ドック後壁接触 (-10pt): 少し前進して位置を調整してください！' : '💥 枠線コーン接触 (-10pt): 前進してトレーラー角度を修正！',
          hitBackWall ? '💥 Chạm tường cuối chuồng (-10đ): Nhích tiến lên 1 chút để chỉnh lại!' : '💥 Quẹt cọc tiêu viền chuồng (-10đ): Tiến lên trả lái rồi lùi lại cho thẳng!',
          hitBackWall ? '💥 Dock Rear Bumper Hit (-10pt): Pull forward slightly!' : '💥 Bay Cone Clipped (-10pt): Pull forward to realign trailer!'
        );
      }

      const alignedInBay = depthPct >= 78 && Math.abs(latErr) <= 0.85 && angErr <= 11 && hitchDeg <= 18;
      const wasParked = a3d.backingStatus && a3d.backingStatus.parked;
      const parked = alignedInBay && Math.abs(v.speed) < 0.35;
      if (parked && !wasParked) {
        a3dAudio.playChirp();
        if (!appState.airport3dSolved.includes('SC5_BAY')) {
          appState.airport3dSolved.push('SC5_BAY');
          saveState();
        }
        logA3d(
          'ok',
          `🎉 牽引バック車庫入れ合格（PASS）！スコア ${a3d.score}/100（横ズレ ${Math.abs(latErr)}m・角度誤差 ${angErr}°）`,
          `🎉 ĐỖ CHUỒNG RƠ-MOÓC THÀNH CÔNG (PASS)! Điểm ${a3d.score}/100 (Lệch ngang ${Math.abs(latErr)}m · Lệch góc ${angErr}°)`,
          `🎉 TRAILER BAY PARKING PASS! Score ${a3d.score}/100 (Lat ${Math.abs(latErr)}m · Angle ${angErr}°)`
        );
      }

      // Live real-time counter-steer coaching hint!
      let hintJa, hintVi, hintEn;
      if (parked) {
        hintJa = '✅ 完璧！枠内中央にまっすぐ停車完了！';
        hintVi = '✅ XUẤT SẮC! Rơ-moóc đã nằm gọn & thẳng tắp trong chuồng!';
        hintEn = '✅ PERFECT! Trailer cleanly aligned & stopped inside bay!';
      } else if (jackknife) {
        hintJa = '⚠️ ジャックナイフ危険！一度前進(▲)して頭と荷台を真っ直ぐに戻せ！';
        hintVi = '⚠️ NGUY CƠ GẬP MOÓC (JACKKNIFE)! Bấm TIẾN (▲) kéo thẳng đầu xe và moóc ra ngay!';
        hintEn = '⚠️ JACKKNIFE RISK! Pull FORWARD (▲) to straighten tractor & trailer!';
      } else if (alignedInBay) {
        hintJa = '🟢 枠内進入OK！ブレーキ（Space）で停止すると合格判定！';
        hintVi = '🟢 Đã lọt chuẩn vào chuồng! Phanh dừng hẳn (Space) để chốt đạt chuẩn PASS!';
        hintEn = '🟢 Inside Bay! Brake to a full stop (Space) to complete PASS!';
      } else if (latErr < -0.65) {
        hintJa = '↙ バック(▼)＋左ハンドル(◀)で荷台後端を枠中央(+Z側)へ誘導 → 揃ったら右(▶)で追従！';
        hintVi = '↪ Lùi (▼) + đánh lái TRÁI (◀) để đẩy đuôi moóc dịch sang tâm BAY 01 → rồi trả PHẢI (▶) bám thẳng!';
        hintEn = '↪ Reverse (▼) + Steer LEFT (◀) to swing trailer tail into bay center, then chase RIGHT (▶)!';
      } else if (latErr > 0.65) {
        hintJa = '↖ バック(▼)＋右ハンドル(▶)で荷台後端を枠中央(-Z側)へ誘導 → 揃ったら左(◀)で追従！';
        hintVi = '↩ Lùi (▼) + đánh lái PHẢI (▶) để đẩy đuôi moóc dịch vào tâm BAY 01 → rồi trả TRÁI (◀) bám thẳng!';
        hintEn = '↩ Reverse (▼) + Steer RIGHT (▶) to swing trailer tail into bay center, then chase LEFT (◀)!';
      } else {
        hintJa = '🎯 枠中心線に一致！小刻みに微調整しながらゆっくり後退(▼)してBAY 01奥へ！';
        hintVi = '🎯 Đuôi moóc đã thẳng tâm chuồng! Giữ tay lái êm, lùi chậm (▼) vào vạch BAY 01!';
        hintEn = '🎯 Aligned with Bay Center! Ease gently in REVERSE (▼) into BAY 01!';
      }

      a3d.backingStatus = { hitchDeg, latErr, angErr, depthPct, jackknife, parked, hintJa, hintVi, hintEn };
      // Throttle DOM innerHTML updates to ~8fps (prevents 60fps DOM thrashing & lag!)
      if (now - (a3d._lastBkDomMs || 0) > 125) {
        a3d._lastBkDomMs = now;
        const bkEl = document.getElementById('a3d-backing-live');
        if (bkEl) {
          const badgeCls = parked ? 'badge-ok' : (jackknife ? 'badge-danger' : 'badge-accent');
          bkEl.innerHTML = `
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px;">
              <span class="badge ${jackknife ? 'badge-danger' : (hitchDeg > 40 ? 'badge-warn' : 'badge-ok')}">${t('折れ角', 'Góc gập moóc', 'Hitch')}: ${hitchDeg}°</span>
              <span class="badge badge-neutral">${t('横ズレ', 'Lệch ngang', 'Lat')}: ${latErr >= 0 ? '+' : ''}${latErr}m</span>
              <span class="badge badge-neutral">${t('角度差', 'Lệch góc', 'Angle')}: ${angErr}°</span>
              <span class="badge ${badgeCls}">${t('進入', 'Vào chuồng', 'Depth')}: ${depthPct}%</span>
            </div>
            <div class="alert ${parked ? 'alert-ok' : (jackknife ? 'alert-danger' : 'alert-info')}" style="margin:0;padding:7px 9px;font-size:12px;">
              ${t(hintJa, hintVi, hintEn)}
            </div>
          `;
        }
      }
    }
  }

  const kmh = Math.abs(v.speed) * 3.6;
  const ev = evaluateAirportZone(v.x, v.z, kmh, a3d.spot101BeaconOn, {
    towingCarts: a3d.ngoVehMode === 'towing',
    over38m: a3d.ngoVehMode === 'high38',
    ilsRedOn: a3d.ilsRedOn,
    blastActive: a3d.blastActive || a3d.ngoDriveScenario === 'SC3'
  });

  // Live Ground Spotter Danger Intervention (whistle + STOP alert if driver ignores active Pushback / Service Lane 100m / Run-Up!)
  const inPushbackDanger = sAlert.pushback && v.x >= -17 && v.x <= 18 && v.z >= -44 && v.z <= -28;
  const inServiceBlastDanger = sAlert.service && v.x >= -38 && v.x <= -24 && v.z < -42 && v.z > -76;
  if ((inPushbackDanger || inServiceBlastDanger) && now - a3d.lastSpotterWarnTime > 2400) {
    a3d.lastSpotterWarnTime = now;
    a3d.score = Math.max(0, a3d.score - 20);
    a3dAudio.playWhistle();
    if (inPushbackDanger) {
      logA3d(
        'danger',
        '🛑 [地上監視員 警告 -20pt] 航空機出発／エンジン試運転中！後方の通行禁止、監視員の手前で停止せよ！',
        '🛑 [GIÁM SÁT VIÊN CẢNH BÁO -20đ] Máy bay đang đẩy lùi / thử nổ động cơ! Cấm đi phía sau, hãy dừng trước giám sát viên!',
        '🛑 [SPOTTER WARNING -20pt] Aircraft departing / engine run-up active! Stop short of the spotter!'
      );
    } else {
      logA3d(
        'danger',
        `🛑 [地上監視員 警告 -20pt] 航空機通過後の離隔不足（${sAlert.blastDist}m）！ブラスト回避のため100m以上待機せよ！`,
        `🛑 [GIÁM SÁT VIÊN CẢNH BÁO -20đ] Chưa đủ 100m sau tàu bay (mới ${sAlert.blastDist}m)! Dừng tránh luồng phản lực Jet Blast!`,
        `🛑 [SPOTTER WARNING -20pt] Insufficient jet blast clearance (${sAlert.blastDist}m)! Wait until ≥100m behind aircraft!`
      );
    }
  }

  if ((!ev.allowed || ev.speeding) && now - a3d.lastViolTime > 2500) {
    a3d.lastViolTime = now;
    a3d.score = Math.max(0, a3d.score - ev.penalty);
    a3dAudio.playBeep(400, 0.2);
    logA3d(ev.allowed ? 'warn' : 'danger', `[違反 -${ev.penalty}pt] ${ev.ja}`, `[Vi phạm -${ev.penalty}đ] ${ev.vi}`, `[Violation -${ev.penalty}pt] ${ev.en || ev.vi}`);
  }
  const m = A3D_MISSIONS.find(x => x.id === a3d.missionId);
  if (m && !a3d.missionDone && m.target) {
    if (Math.hypot(v.x - m.target.x, v.z - m.target.z) <= m.target.r && kmh < 1.2 && (!m.requireBeaconOff || !a3d.spot101BeaconOn)) {
      a3d.missionDone = true;
      if (!appState.airport3dSolved.includes(m.id)) { appState.airport3dSolved.push(m.id); saveState(); }
      logA3d('ok', `🎉 ミッション ${m.id} 達成 (${a3d.score}/100)`, `🎉 Hoàn thành ${m.id} (${a3d.score}/100)!`, `🎉 Mission ${m.id} Complete (${a3d.score}/100)!`);
    }
  }
  if (hudZone) {
    const warnTxt = inPushbackDanger
      ? t('🛑 地上監視員停止指示 — 航空機出発待機！', '🛑 GIÁM SÁT VIÊN RA HIỆU DỪNG — CHỜ MÁY BAY RA!', '🛑 SPOTTER STOP — HOLD FOR DEPARTING AIRCRAFT!')
      : (inServiceBlastDanger ? t(`🛑 ブラスト危険！後方100m待機 (${sAlert.blastDist}m)`, `🛑 NGUY HIỂM JET BLAST! ĐỢI ĐỦ 100m (${sAlert.blastDist}m)`, `🛑 JET BLAST HAZARD! HOLD FOR 100m (${sAlert.blastDist}m)`) : t(ev.ja, ev.vi, ev.en));
    hudZone.textContent = warnTxt;
    hudZone.className = `hud-pill ${!ev.allowed || ev.speeding || inPushbackDanger || inServiceBlastDanger ? 'danger' : 'ok'}`;
  }
  if (hudSpd) hudSpd.textContent = `${kmh.toFixed(0)} / ${ev.speedLimit} km/h`;
  if (hudScr) hudScr.textContent = `SCORE ${a3d.score}/100`;
}

export function stopAirport3dLoop() {
  if (a3d.rafId) { cancelAnimationFrame(a3d.rafId); a3d.rafId = null; }
}

function drawNgoMinimap() {
  const now = performance.now();
  if (now - (a3d._lastMinimapMs || 0) < 120) return;
  a3d._lastMinimapMs = now;
  const c = document.getElementById('a3d-minimap');
  if (!c || c.offsetParent === null) return;
  const W = 252, H = 152;
  if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
  const ctx = c.getContext('2d');
  // True 1:1 Chubu Centrair 4,370m × 1,920m Island Coordinate Projection
  const mx = wx => ((wx + 2250) / 4580) * W;
  const mz = wz => ((wz + 780) / 1720) * H;

  // Ise Bay Water
  ctx.fillStyle = '#09223B';
  ctx.fillRect(0, 0, W, H);

  // Authentic Chamfered Centrair Artificial Island Polygon (matching Official Blueprint J08-1!)
  ctx.fillStyle = '#1E293B';
  ctx.beginPath();
  [
    [-2140, -735], [2180, -735], [2180, 320], [1560, 820],
    [-1480, 820], [-2140, 520]
  ].forEach(([ix, iz], idx) => {
    if (idx === 0) ctx.moveTo(mx(ix), mz(iz));
    else ctx.lineTo(mx(ix), mz(iz));
  });
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 1.1;
  ctx.stroke();

  // Centrair Skyway Bridge (連絡橋 + Meitetsu Rail to Tokoname Mainland)
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(mx(110), mz(380), 8, H - mz(380));

  // 8.5km Perimeter Road (場周道路 — Magenta per J04)
  ctx.strokeStyle = '#EC4899';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(mx(-2060), mz(-685), mx(2130) - mx(-2060), mz(520) - mz(-685));

  // Dual ILS Restricted Zones on West Seawall
  ctx.strokeStyle = a3d.ilsRedOn ? '#EF4444' : '#38BDF8';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(mx(-1460), mz(-685)); ctx.lineTo(mx(-1140), mz(-685));
  ctx.moveTo(mx(1140), mz(-685)); ctx.lineTo(mx(1460), mz(-685));
  ctx.stroke();

  // 1:1 3,500m × 60m Runway 36/18 (z = -580, x = -1750..+1750)
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(mx(-1750), mz(-610), mx(1750) - mx(-1750), Math.max(4, mz(-550) - mz(-610)));

  // Parallel Taxiways A (-415), B (-335) & C (-235)
  ctx.fillStyle = '#64748B';
  ctx.fillRect(mx(-1750), mz(-422), mx(1750) - mx(-1750), 2.2);
  ctx.fillRect(mx(-1560), mz(-342), mx(1660) - mx(-1560), 2.0);
  ctx.fillRect(mx(-1350), mz(-242), mx(1620) - mx(-1350), 2.0);

  // Apron Concrete Green Tint (T2, Remote #300-#600, T1, Remote #200, Cargo #101-#119, N-Area)
  ctx.fillStyle = 'rgba(34,197,94,0.24)';
  ctx.fillRect(mx(-1280), mz(-210), mx(1860) - mx(-1280), mz(110) - mz(-210));

  // T1 Main + 300m Center Pier + North/South Wings + T2 + Cargo Sheds
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(mx(-430), mz(72), mx(430) - mx(-430), 6); // T1 Wings
  ctx.fillRect(mx(26), mz(-180), Math.max(3, mx(66) - mx(26)), mz(75) - mz(-180)); // 300m Center Pier!
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(mx(-960), mz(95), mx(-565) - mx(-960), 5); // T2 LCC
  // Cargo District buildings (same data as the 3D scene) + ATC Tower NE of T1
  ctx.fillStyle = '#CBD5E1';
  NGO_CARGO_DISTRICT.filter(b => b.h > 0).forEach(b => {
    ctx.fillRect(mx(b.x1), mz(b.z1), Math.max(1.5, mx(b.x2) - mx(b.x1)), Math.max(1.5, mz(b.z2) - mz(b.z1)));
  });
  ctx.fillStyle = '#F87171';
  ctx.beginPath(); ctx.arc(mx(330), mz(175), 2.2, 0, Math.PI * 2); ctx.fill();

  // Moving AI Airliner & GSE Traffic Dots
  const tSec = a3d.aiTime || 0;
  ctx.fillStyle = '#FACC15';
  const twyAcX = -1550 + ((tSec * 38) % 3100);
  ctx.fillRect(mx(twyAcX) - 2, mz(-415) - 1.5, 4, 3);
  const cTwyX = 1100 - ((tSec * 28) % 2100);
  ctx.fillRect(mx(cTwyX) - 2, mz(-235) - 1.5, 4, 3);

  // Labels
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 7.5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RWY 36 ◀ 3,500m ▶ RWY 18', mx(0), mz(-628));
  ctx.fillText('T2', mx(-770), mz(220));
  ctx.fillText('T1 PIER', mx(35), mz(220));
  ctx.fillText('CARGO #101-119', mx(960), mz(220));
  ctx.fillText('N', mx(1740), mz(220));

  // Active Aircraft or Player Vehicle Marker
  const px = a3d.subtab === 'flight' ? (computeFlightCyclePose(a3d.flightPhaseIdx, a3d.flightProgress).ac.x) : a3d.veh.x;
  const pz = a3d.subtab === 'flight' ? (computeFlightCyclePose(a3d.flightPhaseIdx, a3d.flightProgress).ac.z) : a3d.veh.z;
  ctx.fillStyle = '#22D3EE';
  ctx.beginPath();
  ctx.arc(mx(px), mz(pz), 3.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.3;
  ctx.stroke();
}

export async function startAirport3dLoop() {
  const glCanvas = document.getElementById('airport3d-gl');
  const hudCanvas = document.getElementById('airport3d-hud2d');
  if (!glCanvas || !hudCanvas) return;

  if (!scene3d || scene3d.canvas !== glCanvas) {
    if (scene3d) scene3d.dispose();
    try {
      const { AirportScene3D } = await import('../three3d/AirportScene3D.js');
      scene3d = new AirportScene3D(glCanvas, hudCanvas, { onInteract: handle3DInteract });
    } catch (err) {
      const ctx = hudCanvas.getContext('2d');
      ctx.fillStyle = '#0B1324'; ctx.fillRect(0, 0, hudCanvas.width, hudCanvas.height);
      ctx.fillStyle = '#7DD3FC'; ctx.font = '14px monospace';
      ctx.fillText('Three.js loading error: ' + err.message, 20, 40);
      return;
    }
  }

  if (!a3d.rafId && appState.activeModule === 'airport3d') {
    a3d.lastFrame = 0;
    const loop = now => {
      if (appState.activeModule !== 'airport3d') { a3d.rafId = null; return; }
      const dt = a3d.lastFrame ? Math.min(0.05, (now - a3d.lastFrame) / 1000) : 0.016;
      a3d.lastFrame = now;
      stepPhysics(dt, now);
      scene3d.renderFrame({ ...a3d, lang: appState.lang, liveryId: appState.livery || 'ANA', wbConseq: wbState.aircraftId === a3d.fleetAircraftId ? wbState.lastConseq : null }, now);
      drawNgoMinimap();
      a3d.rafId = requestAnimationFrame(loop);
    };
    a3d.rafId = requestAnimationFrame(loop);
  }
}

export function initAirport3dModule() {
  if (!a3d.initialized) {
    a3d.initialized = true;
    window.addEventListener('keydown', e => {
      if (appState.activeModule !== 'airport3d') return;
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') a3d.keys.up = true;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') a3d.keys.down = true;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') a3d.keys.left = true;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') a3d.keys.right = true;
      if (e.key === ' ') a3d.keys.brake = true;
      const vp = A3D_VIEWPOINTS.find(v => v.key.toLowerCase() === String(e.key).toLowerCase());
      if (vp) setA3dViewpoint(vp.id);
    });
    window.addEventListener('keyup', e => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') a3d.keys.up = false;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') a3d.keys.down = false;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') a3d.keys.left = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') a3d.keys.right = false;
      if (e.key === ' ') a3d.keys.brake = false;
    });
  }
  renderAirport3dUI();
}

// Views shown to beginners (Pro shows every camera)
const BASIC_VIEWS = ['flight_follow', 'marshal_rear', 'marshaller', 'pilot', 'orbit', 'top', 'gse_cab'];

// Collapsible side panel whose open/closed state survives re-renders
function panel(id, title, body, defaultOpen = true) {
  const open = a3d.ui.panels[id] !== undefined ? a3d.ui.panels[id] : defaultOpen;
  return `<details class="a3d-panel card" data-panel="${id}" ${open ? 'open' : ''}><summary>${title}</summary><div class="a3d-panel-body">${body}</div></details>`;
}

// ---- Marshaller lead-in drill: the aircraft reacts to the trainee's hand signals ----
const STOP_Z = 10; // aircraft reference point at the Spot 7 stop bar
export function startMarshalDrill() {
  const md = a3d.marshalDrill;
  md.active = true;
  md.x = (Math.random() - 0.5) * 3.2;          // starts slightly off the lead-in line
  md.z = STOP_Z - 45;
  md.heading = Math.PI / 2 + (Math.random() - 0.5) * 0.1;
  md.v = 0; md.moved = false; md.result = null; md.t = 0;
  a3d.subtab = 'flight';
  a3d.flightPlaying = false;
  a3d.flightPhaseIdx = 1;
  a3d.flightProgress = 0.95;
  a3d.marshallerDemoSignal = null;
  a3d.camMode = 'marshal_rear';
}
export function stopMarshalDrill() {
  a3d.marshalDrill.active = false;
  a3d.marshallerDemoSignal = null;
}
function updateMarshalDrill(dt) {
  const md = a3d.marshalDrill;
  if (!md.active || md.result) return;
  md.t += dt;
  const sig = a3d.marshallerDemoSignal;
  let vT = 0, decel = 0.6, yaw = 0;
  if (sig === 'm_straight') vT = 2.4;              // ≈ 9 km/h — brisk walking pace
  else if (sig === 'm_slow') vT = 0.9;
  else if (sig === 'm_left') { vT = Math.max(1.0, Math.min(md.v, 1.6)); yaw = -1; }  // pilot's left = toward +X (port)
  else if (sig === 'm_right') { vT = Math.max(1.0, Math.min(md.v, 1.6)); yaw = 1; }
  else if (sig === 'm_emerg_stop') decel = 2.2;
  const accel = 0.35;
  md.v = md.v < vT ? Math.min(vT, md.v + accel * dt) : Math.max(vT, md.v - decel * dt);
  md.heading += yaw * (md.v / 24) * dt;          // nose-wheel steering, ~24m turn radius
  md.x += Math.cos(md.heading) * md.v * dt;
  md.z += Math.sin(md.heading) * md.v * dt;
  if (md.v > 0.3) md.moved = true;
  const overshoot = md.z - STOP_Z;
  const lat = Math.abs(md.x);
  const finish = (ok, codeJa, codeVi, codeEn) => {
    md.result = { ok, stopErr: overshoot, lat, hdg: Math.abs((md.heading - Math.PI / 2) * 57.3), ja: codeJa, vi: codeVi, en: codeEn };
    logA3d(ok ? 'ok' : 'danger', codeJa, codeVi, codeEn);
    if (ok) { a3dAudio.playChirp(); appState.marshalDrillPassed = true; saveState(); }
    else a3dAudio.playCrash(0.4);
    renderAirport3dUI();
  };
  if (overshoot > 3.0) return finish(false, '停止線を3m以上超過！PBB・GSEと接触の危険', 'Vượt vạch dừng hơn 3m! Nguy cơ đâm PBB/GSE', 'Overran the stop bar by >3m — PBB/GSE collision risk');
  if (lat > 4.0) return finish(false, '誘導線から4m以上逸脱！翼端と障害物に注意', 'Lệch vạch dẫn hơn 4m! Nguy cơ đầu cánh va chạm', 'Drifted >4m off the lead-in line — wingtip clearance lost');
  if (md.moved && md.v < 0.02 && (sig === 'm_stop' || sig === 'm_emerg_stop')) {
    const good = Math.abs(overshoot) <= 0.5 && lat <= 0.6;
    const okish = Math.abs(overshoot) <= 1.5 && lat <= 1.2;
    if (good) finish(true, '完璧！停止線ぴったりに停止', 'Hoàn hảo! Dừng đúng vạch dừng', 'Perfect! Stopped right on the stop bar');
    else if (okish) finish(true, '合格：停止位置の誤差は許容範囲', 'Đạt: sai lệch vị trí dừng trong giới hạn cho phép', 'Pass: stop position within tolerance');
    else finish(false, overshoot < 0 ? '手前で停止しすぎ：PBBが届きません' : '停止位置ずれ：再誘導が必要', overshoot < 0 ? 'Dừng quá sớm: PBB không với tới cửa' : 'Dừng lệch vị trí: phải dẫn lại', overshoot < 0 ? 'Stopped too short — the PBB cannot reach' : 'Off position — re-marshal required');
  }
}

export function openA3dSubtab(tab = 'flight') {
  a3d.subtab = ['flight', 'drive', 'ops3d'].includes(tab) ? tab : 'flight';
  if (a3d.subtab !== 'flight') stopMarshalDrill();
  if (a3d.subtab === 'ops3d') { a3d.camMode = 'orbit'; a3d.cam = { tx: 0, ty: 3, tz: 12, dist: 46, yaw: -0.55, pitch: 0.42 }; }
  else if (a3d.subtab === 'drive') a3d.camMode = 'chase';
  else if (!a3d.marshalDrill.active) a3d.camMode = 'flight_follow';
  renderAirport3dUI();
}

export function renderAirport3dUI() {
  const mount = document.getElementById('airport3d-mount');
  if (!mount) return;
  const isFlight = a3d.subtab === 'flight';
  const isDrive = a3d.subtab === 'drive';
  const isOps3d = a3d.subtab === 'ops3d';
  const m = A3D_MISSIONS.find(x => x.id === a3d.missionId) || A3D_MISSIONS[0];
  const fac = A3D_FACILITIES.find(f => f.id === a3d.selectedFacility) || A3D_FACILITIES[0];
  const curVp = A3D_VIEWPOINTS.find(v => v.id === a3d.camMode) || A3D_VIEWPOINTS[0];

  mount.innerHTML = `
    <div class="subtabs">
      <button class="subtab ${isFlight ? 'active' : ''}" data-st="flight">${t('1. 離着陸・地上スタッフ連携 (Three.js PBR)', '1. Cất/Hạ cánh & Nhân viên (Three.js PBR)', '1. Flight Cycle & Ground Crew (Three.js PBR)')}</button>
      <button class="subtab ${isDrive ? 'active' : ''}" data-st="drive">${t(`2. NGOセントレア構内運転実習 (${appState.airport3dSolved.length}/3)`, `2. Thực hành Lái xe NGO Centrair (${appState.airport3dSolved.length}/3)`, `2. NGO Centrair Airside Driving (${appState.airport3dSolved.length}/3)`)}</button>
      <button class="subtab ${isOps3d ? 'active' : ''}" data-st="ops3d">${t(`3. 3D直接クリック実習・実技試験 (${appState.exam3dBest !== null ? appState.exam3dBest + 'pt' : '100pt'})`, `3. Click 3D FOD/PBB/Loader & Thi 3D (${appState.exam3dBest !== null ? appState.exam3dBest + 'đ' : '100đ'})`, `3. Direct 3D Raycast Ops & Exam (${appState.exam3dBest !== null ? appState.exam3dBest + 'pt' : '100pt'})`)}</button>
    </div>

    <div class="workspace-grid wide-left a3d-layout ${a3d.ui.landSide ? 'land-side-open' : ''}">
      <div>
        <div class="card a3d-main-card">
          <!-- Compact toolbar: playback / vehicle on the left, view · map · settings drawers on the right -->
          <div class="a3d-toolbar">
            <div class="a3d-toolbar-left">
              ${isFlight ? `
                <button class="btn btn-sm btn-primary" id="a3d-flight-play" title="${t('再生/一時停止', 'Chạy / Dừng', 'Play / Pause')}">${a3d.flightPlaying ? '⏸' : '▶'}</button>
                <button class="btn btn-sm" id="a3d-flight-prev" title="${t('前の段階', 'Giai đoạn trước', 'Previous phase')}">⏮</button>
                <button class="btn btn-sm" id="a3d-flight-next" title="${t('次の段階', 'Giai đoạn sau', 'Next phase')}">⏭</button>
                <button class="btn btn-sm" id="a3d-flight-spd" title="${t('1x = 実時間', '1x = thời gian thật', '1x = real time')}">${a3d.flightSpeed}x</button>
                <select id="a3d-fleet-sel" class="a3d-select">
                  ${Object.values(AIRCRAFT_PROFILES).map(p => `<option value="${p.id}" ${a3d.fleetAircraftId === p.id ? 'selected' : ''}>✈ ${p.id}</option>`).join('')}
                </select>
              ` : (isDrive ? `
                <select id="a3d-ngo-veh-sel" class="a3d-select">
                  <option value="standard" ${a3d.ngoVehMode === 'standard' ? 'selected' : ''}>🚗 ${t('通常GSE (30km/h)', 'GSE thường (30km/h)', 'Standard GSE (30km/h)')}</option>
                  <option value="towing" ${a3d.ngoVehMode === 'towing' ? 'selected' : ''}>🚜 ${t('カート牽引 (15km/h)', 'Kéo 6 moóc (15km/h)', 'Towing 6 Carts (15km/h)')}</option>
                  <option value="backing" ${a3d.ngoVehMode === 'backing' ? 'selected' : ''}>🅿 ${t('牽引バック車庫入れ', 'Lùi rơ-moóc vào chuồng', 'Semi-Trailer Reverse Bay')}</option>
                  <option value="high38" ${a3d.ngoVehMode === 'high38' ? 'selected' : ''}>🚛 ${t('全高3.8m超', 'Xe cao >3.8m', 'High Vehicle >3.8m')}</option>
                </select>
                <span class="pro-only" style="display:contents;">
                  <button class="btn btn-sm ${a3d.spot101BeaconOn ? 'btn-danger-outline' : ''}" id="a3d-toggle-beacon">S6:${a3d.spot101BeaconOn ? '🔴' : '⚪'}</button>
                  <button class="btn btn-sm ${a3d.ilsRedOn ? 'btn-danger-outline' : ''}" id="a3d-toggle-ils">ILS:${a3d.ilsRedOn ? '🔴' : '⚪'}</button>
                  <button class="btn btn-sm ${a3d.blastActive ? 'btn-danger-outline' : ''}" id="a3d-toggle-blast">#71:${a3d.blastActive ? '🔥' : '⚪'}</button>
                </span>
              ` : `<span class="badge badge-ok">${t('3Dクリック操作', 'Click trực tiếp trên 3D', 'Click directly in 3D')}</span>`)}
            </div>
            <div class="a3d-toolbar-right">
              <button class="btn btn-sm ${a3d.ui.views ? 'btn-primary' : ''}" data-drawer="views" aria-label="${t('視点', 'Góc nhìn', 'Views')}">🎥<span class="a3d-btn-lbl"> ${t('視点', 'Góc nhìn', 'Views')} ▾</span></button>
              <button class="btn btn-sm ${a3d.ui.map ? 'btn-primary' : ''}" id="a3d-toggle-map" aria-label="${t('地図', 'Bản đồ', 'Map')}">🗺<span class="a3d-btn-lbl"> ${t('地図', 'Bản đồ', 'Map')}</span></button>
              <button class="btn btn-sm ${a3d.ui.settings ? 'btn-primary' : ''}" data-drawer="settings" aria-label="${t('設定', 'Cài đặt', 'Settings')}">⚙<span class="a3d-btn-lbl"> ${t('設定', 'Cài đặt', 'Settings')} ▾</span></button>
              <button class="btn btn-sm ${a3d.expanded ? 'btn-primary' : ''}" id="a3d-toggle-expand" title="${t('拡大', 'Phóng to', 'Expand')}">⛶</button>
              <button class="btn btn-sm a3d-land-panel-btn ${a3d.ui.landSide ? 'btn-primary' : ''}" id="a3d-land-panel-btn" aria-label="${t('パネル', 'Bảng điều khiển', 'Panels')}">☰</button>
            </div>
          </div>

          <div class="a3d-drawer ${a3d.ui.views ? 'open' : ''}" id="a3d-drawer-views">
            <div class="pov-bar">
              ${A3D_VIEWPOINTS.map(vp => `<button class="btn btn-sm ${a3d.camMode === vp.id ? 'btn-primary' : ''} ${BASIC_VIEWS.includes(vp.id) ? '' : 'pro-only'}" data-vp="${vp.id}"><span class="kbd-hint">${vp.key}</span> ${t(vp.ja, vp.vi, vp.en)}</button>`).join('')}
            </div>
          </div>

          <div class="a3d-drawer ${a3d.ui.settings ? 'open' : ''}" id="a3d-drawer-settings">
            <div class="a3d-settings-grid">
              <label class="a3d-set"><span>${t('空港', 'Sân bay', 'Airport')}</span>
                <select id="a3d-airport-sel" class="a3d-select">
                  ${Object.values(A3D_AIRPORTS).map(ap => `<option value="${ap.id}" ${a3d.airportId === ap.id ? 'selected' : ''}>${t(ap.nameJa, ap.nameVi, ap.nameEn || ap.id)}</option>`).join('')}
                </select>
              </label>
              <label class="a3d-set"><span>${t('天候', 'Thời tiết', 'Weather')}</span>
                <select id="a3d-wx-sel" class="a3d-select">
                  <option value="clear" ${a3d.weather === 'clear' ? 'selected' : ''}>☀ ${t('晴天', 'Trời quang', 'Clear')}</option>
                  <option value="rain" ${a3d.weather === 'rain' ? 'selected' : ''}>🌧 ${t('雨天', 'Mưa', 'Rain')}</option>
                  <option value="fog" ${a3d.weather === 'fog' ? 'selected' : ''}>🌫 ${t('濃霧', 'Sương mù', 'Fog')}</option>
                  <option value="snow" ${a3d.weather === 'snow' ? 'selected' : ''}>❄ ${t('積雪', 'Tuyết', 'Snow')}</option>
                </select>
              </label>
              <div class="a3d-set"><span>${t('時間帯', 'Thời điểm', 'Time')}</span>
                <div style="display:flex;gap:4px;">
                  <button class="btn btn-sm ${a3d.timeOfDay === 'day' ? 'btn-primary' : ''}" data-tod="day">☀</button>
                  <button class="btn btn-sm ${a3d.timeOfDay === 'sunset' ? 'btn-primary' : ''}" data-tod="sunset">🌅</button>
                  <button class="btn btn-sm ${a3d.timeOfDay === 'night' ? 'btn-primary' : ''}" data-tod="night">🌙</button>
                </div>
              </div>
              <label class="a3d-set pro-only"><span>${t('ラベル表示', 'Nhãn trên 3D', 'Labels')}</span>
                <select id="a3d-lbl-sel" class="a3d-select">
                  <option value="smart" ${a3d.labelMode === 'smart' ? 'selected' : ''}>Smart</option>
                  <option value="all" ${a3d.labelMode === 'all' ? 'selected' : ''}>${t('全部', 'Tất cả', 'All')}</option>
                  <option value="min" ${a3d.labelMode === 'min' ? 'selected' : ''}>${t('最小', 'Tối giản', 'Minimal')}</option>
                </select>
              </label>
              <label class="a3d-set pro-only"><span>${t('画質', 'Đồ họa', 'Graphics')}</span>
                <select id="a3d-gfx-sel" class="a3d-select">
                  <option value="high" ${a3d.gfxQuality === 'high' ? 'selected' : ''}>${t('高', 'Cao', 'High')}</option>
                  <option value="med" ${a3d.gfxQuality === 'med' ? 'selected' : ''}>${t('中', 'Vừa', 'Medium')}</option>
                  <option value="low" ${a3d.gfxQuality === 'low' ? 'selected' : ''}>${t('軽量', 'Nhẹ', 'Fast')}</option>
                </select>
              </label>
              <div class="a3d-set"><span>${t('音', 'Âm thanh', 'Sound')}</span>
                <button class="btn btn-sm ${a3d.soundOn ? 'btn-primary' : ''}" id="a3d-toggle-sound">${a3d.soundOn ? '🔊' : '🔇'}</button>
              </div>
            </div>
          </div>

          <div class="airport3d-stage ${a3d.expanded ? 'expanded' : ''} ${a3d.ui.hudInfo ? 'hud-info-open' : ''}" id="a3d-stage-box">
            <canvas id="airport3d-gl"></canvas>
            <canvas id="airport3d-hud2d"></canvas>
            <div class="a3d-minimap-wrap ${a3d.ui.map && !(a3d.ngoDriveScenario === 'SC5' || a3d.ngoVehMode === 'backing') ? '' : 'hidden'}" id="a3d-minimap-box" title="NGO Centrair">
              <canvas id="a3d-minimap"></canvas>
            </div>
            <div class="raycast-toast" id="a3d-raycast-toast"></div>
            <div class="hud-top">
              <div class="hud-pill ok" id="a3d-hud-zone">THREE.JS</div>
              <div class="a3d-hud-right" style="display:flex;gap:6px;">
                <div class="hud-pill" id="a3d-hud-spd">0 km/h</div>
                <div class="hud-pill a3d-hud-secondary" id="a3d-hud-score">0%</div>
                <button class="a3d-hud-info-btn" id="a3d-hud-info-btn" aria-label="HUD Info">ⓘ</button>
              </div>
            </div>
            <div class="hud-banner">
              <div class="hud-pill pro-only a3d-hud-secondary" id="a3d-vp-desc" style="font-family:var(--font-sans);font-size:11.5px;max-width:70%;">
                [${curVp.key}] ${t(curVp.ja, curVp.vi, curVp.en)} — ${t(curVp.descJa, curVp.descVi, curVp.descEn)}
              </div>
              ${isDrive ? `
                <div class="drive-pad" id="a3d-drive-pad">
                  <div></div><button class="drive-key" data-k="up">▲</button><div></div>
                  <button class="drive-key" data-k="left">◀</button><button class="drive-key" data-k="down">▼</button><button class="drive-key" data-k="right">▶</button>
                </div>
              ` : ''}
            </div>
          </div>

          ${isFlight ? `<div class="phase-strip" id="a3d-phase-strip"></div><div class="radio-bar pro-only" id="a3d-radio-bar"></div>` : ''}
        </div>
      </div>

      <div class="a3d-side">
        ${isFlight ? `
          ${panel('marshal', `🚧 ${t('マーシャリング誘導 実習', 'Tập dẫn tàu bằng tín hiệu tay (Marshaller)', 'Marshalling Lead-in Drill')}`, `
            <div class="drill-box">
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
                <button class="btn btn-sm ${a3d.marshalDrill.active ? '' : 'btn-primary'}" id="a3d-drill-start">${a3d.marshalDrill.active ? '↺ ' + t('やり直し', 'Làm lại', 'Restart') : '🎮 ' + t('誘導実習を開始', 'Bắt đầu tập dẫn tàu', 'Start lead-in drill')}</button>
                ${a3d.marshalDrill.active ? `<button class="btn btn-sm" id="a3d-drill-stop">✕ ${t('終了', 'Thoát', 'Exit')}</button>` : ''}
                <button class="btn btn-sm ${a3d.camMode === 'marshal_rear' ? 'btn-primary' : ''}" id="a3d-focus-marsh">🧍 ${t('後方視点', 'Nhìn sau lưng', 'Rear view')}</button>
              </div>
              <div class="drill-help">${a3d.marshalDrill.active
                ? t('合図を押すと航空機が反応します。停止線（黄T字）ぴったりに止めましょう。', 'Bấm tín hiệu — máy bay sẽ phản ứng theo. Dừng mũi bánh đúng vạch dừng (chữ T vàng).', 'Press a signal — the aircraft responds. Stop the nose gear exactly on the yellow stop bar.')
                : t('「開始」で航空機が停止線の約45m手前で待機します。後方視点で腕の動きと機体の反応を確認。', 'Bấm "Bắt đầu": máy bay chờ cách vạch dừng ~45m. Dùng góc "Nhìn sau lưng" để thấy tay Marshaller và máy bay phản ứng.', 'Press Start: the aircraft waits ~45m before the stop bar. Use the rear view to watch the arm signals and the aircraft response.')}</div>
              <div id="a3d-drill-live" class="drill-live"></div>
            </div>
            <div class="marshal-sig-grid" style="display:flex;gap:5px;flex-wrap:wrap;">
              ${[
                [null, '🔄', t('自動連動', 'Tự động theo pha', 'Auto Sync')],
                ['m_straight', '⬆', t('1. 直進', '1. Đi thẳng', '1. Straight')],
                ['m_left', '⬅', t('2. 左折', '2. Rẽ trái', '2. Turn Left')],
                ['m_right', '➡', t('3. 右折', '3. Rẽ phải', '3. Turn Right')],
                ['m_slow', '🐢', t('4. 減速', '4. Giảm tốc', '4. Slow Down')],
                ['m_stop', '✋', t('5. 停止', '5. Dừng lại', '5. Stop')],
                ['m_emerg_stop', '🛑', t('6. 緊急停止', '6. Dừng khẩn cấp', '6. Emerg Stop')],
                ['m_chocks', '🧱', t('7. 輪止め設置', '7. Chèn bánh', '7. Chocks In')],
                ['m_allclear', '✅', t('8. 出発OK', '8. An toàn / OK', '8. All Clear')]
              ].map(([sid, ico, lbl]) => `<button class="btn btn-sm sig-btn ${a3d.marshallerDemoSignal === sid ? 'btn-primary' : ''}" data-msig="${sid || ''}"><span class="marshal-sig-ico">${ico}</span><span>${lbl}</span></button>`).join('')}
            </div>
          `, true)}
          ${panel('roles', `👷 ${t('地上スタッフ担当役割', 'Vai trò Nhân viên Mặt đất', 'Ground Crew Roles')}`, `<div id="a3d-flight-roles-panel"></div>`, appState.userLevel === 'pro')}
        ` : (isOps3d ? `
          ${panel('handson', `🖱 ${t('3D直接クリック ＆ 実技検定', 'Thao tác 3D trực tiếp & Thi 100đ', 'Direct 3D Ops & 100pt Exam')}`, `<div id="a3d-handson-panel"></div>`, true)}
        ` : `
          ${panel('drive', `🚜 ${t('NGO構内運転 実習', 'Bài tập lái xe NGO', 'NGO Driving Drills')}`, `
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
              ${[
                ['SC5', t('🅿 SC5: トレーラー牽引バック車庫入れ実習（大型牽引・逆ハンドル練習）', '🅿 SC5: Luyện kéo rơ-moóc lùi vô chuồng BAY 01 (Như lái xe đầu kéo — đánh lái ngược)', '🅿 SC5: Semi-Trailer Reverse Bay Parking Drill (Articulated Counter-Steer)')],
                ['SC1', t('SC1: 航空機プッシュバック・自走アウト待機（地上監視員の停止合図）', 'SC1: Máy bay sắp đẩy lùi / tự chạy ra — Dừng chờ hiệu lệnh Giám sát viên', 'SC1: Aircraft Pushback / Self-Taxi-Out — Hold for Ground Spotter')],
                ['SC2', t('SC2: サービスレーン横断・通過後100mブラスト待機', 'SC2: Băng qua Service Lane — Đợi tàu bay đi xa ≥100m tránh Jet Blast', 'SC2: Service Lane Crossing — Wait ≥100m Behind Passing Aircraft')],
                ['SC3', t('SC3: 24時間エンジン試運転（チョーク有＋赤灯）＆ #71ブラスト警戒', 'SC3: Thử nổ động cơ 24h (còn chèn bánh + đèn đỏ) & Cảnh báo #71', 'SC3: 24h Engine Run-Up (Chocks In + Red Beacon) & #71 Blast Caution')],
                ['SC4', t('SC4: 全高3.8m超迂回・消防所赤回転灯・場周道路ILS赤灯', 'SC4: Xe cao >3.8m vòng mũi Center Pier, Trạm cứu hỏa & Đèn đỏ ILS', 'SC4: High Vehicle >3.8m Detour, Fire Station & Perimeter ILS Red Lamp')]
              ].map(([scid, lbl]) => `<button class="btn btn-sm ${a3d.ngoDriveScenario === scid ? 'btn-primary' : ''}" data-ngosc="${scid}" style="justify-content:flex-start;text-align:left;height:auto;padding:7px 10px;">${lbl}</button>`).join('')}
            </div>
            ${a3d.ngoDriveScenario === 'SC5' || a3d.ngoVehMode === 'backing' ? `
              <div style="padding:10px;border-radius:8px;border:1.5px solid var(--accent);background:var(--surface-2);margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
                  <strong style="font-size:12.5px;">🅿 ${t('牽引バック車庫入れモニター (BAY 01)', 'Đồng hồ Lùi Chuồng Xe Đầu Kéo (BAY 01)', 'Trailer Backing Telemetry (BAY 01)')}</strong>
                  <div style="display:flex;gap:4px;flex-wrap:wrap;">
                    <button class="btn btn-sm ${a3d.camMode === 'backing' ? 'btn-primary' : ''}" id="a3d-bk-cam-3q">🎥 ${t('斜め後方', 'Góc lùi', 'Backing')}</button>
                    <button class="btn btn-sm ${a3d.camMode === 'top' ? 'btn-primary' : ''}" id="a3d-bk-cam-top">🦅 ${t('真上', 'Từ trên', 'Top')}</button>
                    <button class="btn btn-sm ${a3d.camMode === 'gse_cab' ? 'btn-primary' : ''}" id="a3d-bk-cam-cab">🪞 ${t('運転席', 'Cabin', 'Cab')}</button>
                    <button class="btn btn-sm" id="a3d-bk-reset">↺ ${t('やり直し', 'Đặt lại', 'Reset')}</button>
                  </div>
                </div>
                <div id="a3d-backing-live">
                  <div class="alert alert-info" style="margin:0;padding:7px 9px;font-size:12px;">
                    ${t('▼（S）で後退しながら◀/▶（A/D）で逆ハンドル操作：左に切ると荷台後端は右へ、右に切ると左へ曲がります！',
                        'Nhấn ▼ (S) để LÙI kết hợp ◀/▶ (A/D) đánh lái ngược: đánh TRÁI (◀) đuôi moóc bẻ sang PHẢI, đánh PHẢI (▶) đuôi moóc bẻ sang TRÁI — phanh dừng gọn trong BAY 01!',
                        'Hold ▼ (S) to REVERSE with ◀/▶ (A/D) counter-steering: steer LEFT to kick trailer tail RIGHT, steer RIGHT to kick tail LEFT — stop straight inside BAY 01!')}
                  </div>
                </div>
              </div>
            ` : ''}
            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;">
              <span style="font-size:11px;font-weight:700;color:var(--text-secondary);width:100%;">${t('🗺 4.37kmセントレア島 クイック移動 (実寸地区ジャンプ):', '🗺 Nhảy nhanh tới các phân khu Sân bay NGO 4,37km:', '🗺 Quick Jump Across 1:1 4.37km NGO Island:')}</span>
              <button class="btn btn-sm" data-ngojump="t1">✈ T1 Spot 7</button>
              <button class="btn btn-sm" data-ngojump="pier">🌉 ${t('300mピア先端', 'Mũi Pier 300m', '300m Pier Tip')}</button>
              <button class="btn btn-sm" data-ngojump="t2">🛫 T2 (#71–80)</button>
              <button class="btn btn-sm" data-ngojump="cargo">📦 Cargo (#101+)</button>
              <button class="btn btn-sm" data-ngojump="ils">🚨 ${t('場周ILS赤灯', 'Vành đai ILS', 'Perimeter ILS')}</button>
            </div>
            <div class="alert alert-warn" style="font-size:12px;margin-bottom:8px;">
              <strong>${t('実車衝突＆COC通報訓練', 'Va chạm vật lý & Quy trình báo COC', 'Collision Physics & COC Protocol')}:</strong>
              ${t('障害物へ接触すると衝撃・反動・衝突音が発生し、現場保存＆COC（0569-38-1500 / 内線3000）通報指示が出ます。',
                  'Đụng chướng ngại vật sẽ có phản lực bật lại, rung camera, âm thanh va chạm và lệnh giữ nguyên hiện trường báo COC (0569-38-1500 / nội bộ 3000).',
                  'Hitting obstacles triggers physical recoil, camera shake, crash audio, and the Centrair COC (0569-38-1500 / Ext. 3000) accident alert.')}
            </div>
            <div id="a3d-log-list" style="max-height:200px;overflow-y:auto;"></div>
        `, true)}
        `)}
      </div>
    </div>
  `;

  mount.querySelectorAll('[data-st]').forEach(b => { b.onclick = () => openA3dSubtab(b.dataset.st); });
  mount.querySelectorAll('[data-tod]').forEach(b => {
    b.onclick = () => { a3d.timeOfDay = b.dataset.tod; mount.querySelectorAll('[data-tod]').forEach(x => x.classList.toggle('btn-primary', x.dataset.tod === a3d.timeOfDay)); };
  });
  mount.querySelectorAll('[data-vp]').forEach(b => { b.onclick = () => setA3dViewpoint(b.dataset.vp); });

  document.getElementById('a3d-airport-sel').onchange = e => {
    a3d.airportId = e.target.value;
    if (a3d.airportId === 'CTS' && a3d.weather === 'clear') { a3d.weather = 'snow'; document.getElementById('a3d-wx-sel').value = 'snow'; }
  };
  document.getElementById('a3d-wx-sel').onchange = e => { a3d.weather = e.target.value; };
  document.getElementById('a3d-lbl-sel').onchange = e => { a3d.labelMode = e.target.value; };
  document.getElementById('a3d-gfx-sel').onchange = e => { a3d.gfxQuality = e.target.value; };
  document.getElementById('a3d-toggle-sound').onclick = () => { a3d.soundOn = !a3d.soundOn; a3dAudio.setEnabled(a3d.soundOn); document.getElementById('a3d-toggle-sound').textContent = a3d.soundOn ? '🔊' : '🔇'; };
  mount.querySelectorAll('[data-drawer]').forEach(b => {
    b.onclick = () => {
      const k = b.dataset.drawer;
      a3d.ui[k] = !a3d.ui[k];
      b.classList.toggle('btn-primary', a3d.ui[k]);
      const d = document.getElementById(`a3d-drawer-${k}`);
      if (d) d.classList.toggle('open', a3d.ui[k]);
    };
  });
  const mapBtn = document.getElementById('a3d-toggle-map');
  if (mapBtn) mapBtn.onclick = () => {
    a3d.ui.map = !a3d.ui.map;
    mapBtn.classList.toggle('btn-primary', a3d.ui.map);
    const mb = document.getElementById('a3d-minimap-box');
    if (mb) mb.classList.toggle('hidden', !a3d.ui.map);
  };
  mount.querySelectorAll('details[data-panel]').forEach(d => {
    d.addEventListener('toggle', () => { a3d.ui.panels[d.dataset.panel] = d.open; });
  });
  document.getElementById('a3d-toggle-expand').onclick = () => {
    a3d.expanded = !a3d.expanded;
    document.getElementById('a3d-stage-box').classList.toggle('expanded', a3d.expanded);
  };
  const hudInfoBtn = document.getElementById('a3d-hud-info-btn');
  if (hudInfoBtn) hudInfoBtn.onclick = () => {
    a3d.ui.hudInfo = !a3d.ui.hudInfo;
    const sb = document.getElementById('a3d-stage-box');
    if (sb) sb.classList.toggle('hud-info-open', a3d.ui.hudInfo);
  };
  const landPanelBtn = document.getElementById('a3d-land-panel-btn');
  if (landPanelBtn) landPanelBtn.onclick = () => {
    a3d.ui.landSide = !a3d.ui.landSide;
    landPanelBtn.classList.toggle('btn-primary', a3d.ui.landSide);
    const lay = mount.querySelector('.a3d-layout');
    if (lay) lay.classList.toggle('land-side-open', a3d.ui.landSide);
  };

  if (isFlight) {
    document.getElementById('a3d-fleet-sel').onchange = e => { a3d.fleetAircraftId = e.target.value; };
    document.getElementById('a3d-flight-play').onclick = () => { if (a3d.marshalDrill.active) { stopMarshalDrill(); renderAirport3dUI(); return; } a3d.flightPlaying = !a3d.flightPlaying; document.getElementById('a3d-flight-play').textContent = a3d.flightPlaying ? '⏸' : '▶'; };
    document.getElementById('a3d-flight-prev').onclick = () => { stopMarshalDrill(); a3d.flightPhaseIdx = (a3d.flightPhaseIdx + 9) % 10; a3d.flightProgress = 0; renderFlightPhasePanel(); };
    document.getElementById('a3d-flight-next').onclick = () => { stopMarshalDrill(); a3d.flightPhaseIdx = (a3d.flightPhaseIdx + 1) % 10; a3d.flightProgress = 0; renderFlightPhasePanel(); };
    document.getElementById('a3d-flight-spd').onclick = () => { const seq = [1, 2, 4, 8, 0.5]; a3d.flightSpeed = seq[(seq.indexOf(a3d.flightSpeed) + 1) % seq.length]; document.getElementById('a3d-flight-spd').textContent = `${a3d.flightSpeed}x`; };
    const fm = document.getElementById('a3d-focus-marsh');
    if (fm) fm.onclick = () => { setA3dViewpoint('marshal_rear'); renderAirport3dUI(); };
    const ds = document.getElementById('a3d-drill-start');
    if (ds) ds.onclick = () => { startMarshalDrill(); renderAirport3dUI(); };
    const dx = document.getElementById('a3d-drill-stop');
    if (dx) dx.onclick = () => { stopMarshalDrill(); renderAirport3dUI(); };
    mount.querySelectorAll('[data-msig]').forEach(b => {
      b.onclick = () => {
        a3d.marshallerDemoSignal = b.dataset.msig || null;
        // Watch the signal from behind the marshaller so the arm movement and the aircraft response are both visible
        if (a3d.marshallerDemoSignal && a3d.camMode !== 'marshaller') a3d.camMode = 'marshal_rear';
        mount.querySelectorAll('[data-msig]').forEach(x => x.classList.toggle('btn-primary', (x.dataset.msig || null) === a3d.marshallerDemoSignal));
        mount.querySelectorAll('[data-vp]').forEach(x => x.classList.toggle('btn-primary', x.dataset.vp === a3d.camMode));
        return;
      };
    });
    renderFlightPhasePanel();
  } else if (isOps3d) {
    renderHandsOnPanel();
  } else {
    const tb = document.getElementById('a3d-toggle-beacon');
    if (tb) tb.onclick = () => { a3d.spot101BeaconOn = !a3d.spot101BeaconOn; tb.textContent = `S6:${a3d.spot101BeaconOn ? '🔴' : '⚪'}`; tb.classList.toggle('btn-danger-outline', a3d.spot101BeaconOn); };
    const tv = document.getElementById('a3d-ngo-veh-sel');
    if (tv) {
      tv.onchange = e => {
        a3d.ngoVehMode = e.target.value;
        if (a3d.ngoVehMode === 'backing') {
          resetBackingScenario();
          renderAirport3dUI();
        }
      };
    }
    const ti = document.getElementById('a3d-toggle-ils');
    if (ti) ti.onclick = () => { a3d.ilsRedOn = !a3d.ilsRedOn; ti.textContent = `ILS:${a3d.ilsRedOn ? '🔴' : '⚪'}`; ti.classList.toggle('btn-danger-outline', a3d.ilsRedOn); };
    const tbl = document.getElementById('a3d-toggle-blast');
    if (tbl) tbl.onclick = () => { a3d.blastActive = !a3d.blastActive; tbl.textContent = `#71:${a3d.blastActive ? '🔥' : '⚪'}`; tbl.classList.toggle('btn-danger-outline', a3d.blastActive); };
    mount.querySelectorAll('[data-ngosc]').forEach(b => {
      b.onclick = () => {
        const sc = b.dataset.ngosc;
        if (sc === 'SC5') {
          resetBackingScenario();
          renderAirport3dUI();
          return;
        }
        a3d.ngoDriveScenario = sc;
        if (a3d.ngoVehMode === 'backing') a3d.ngoVehMode = 'standard';
        a3d.ngoScenarioTime = 0;
        a3d.prevHitch = null;
        a3d.vehTrail = [];
        a3d.veh.speed = 0;
        if (a3d.ngoDriveScenario === 'SC1') { a3d.veh.x = -38; a3d.veh.z = -38; a3d.veh.heading = 0; }
        else if (a3d.ngoDriveScenario === 'SC2') { a3d.veh.x = -31; a3d.veh.z = -32; a3d.veh.heading = -Math.PI / 2; }
        else if (a3d.ngoDriveScenario === 'SC3') { a3d.veh.x = -85; a3d.veh.z = -38; a3d.veh.heading = 0; a3d.blastActive = true; }
        else { a3d.veh.x = -12; a3d.veh.z = 50; a3d.veh.heading = 0; a3d.ngoVehMode = 'high38'; a3d.ilsRedOn = true; }
        a3d.trailerHeadings = [a3d.veh.heading, a3d.veh.heading, a3d.veh.heading, a3d.veh.heading, a3d.veh.heading, a3d.veh.heading];
        a3d.camMode = 'chase';
        renderAirport3dUI();
      };
    });
    const bk3q = document.getElementById('a3d-bk-cam-3q');
    if (bk3q) bk3q.onclick = () => { setA3dViewpoint('backing'); renderAirport3dUI(); };
    const bkTop = document.getElementById('a3d-bk-cam-top');
    if (bkTop) bkTop.onclick = () => { setA3dViewpoint('top'); renderAirport3dUI(); };
    const bkCab = document.getElementById('a3d-bk-cam-cab');
    if (bkCab) bkCab.onclick = () => { setA3dViewpoint('gse_cab'); renderAirport3dUI(); };
    const bkRst = document.getElementById('a3d-bk-reset');
    if (bkRst) bkRst.onclick = () => { resetBackingScenario(); renderAirport3dUI(); };
    mount.querySelectorAll('[data-ngojump]').forEach(jb => {
      jb.onclick = () => {
        const dest = jb.dataset.ngojump;
        a3d.veh.speed = 0;
        a3d.prevHitch = null;
        if (dest === 't1') { a3d.veh.x = -18; a3d.veh.z = 50; a3d.veh.heading = 0; }
        else if (dest === 'pier') { a3d.veh.x = 46; a3d.veh.z = -192; a3d.veh.heading = Math.PI; }
        else if (dest === 't2') { a3d.veh.x = -620; a3d.veh.z = 50; a3d.veh.heading = Math.PI; }
        else if (dest === 'cargo') { a3d.veh.x = 620; a3d.veh.z = 50; a3d.veh.heading = 0; }
        else if (dest === 'ils') { a3d.veh.x = -1100; a3d.veh.z = -685; a3d.veh.heading = Math.PI; a3d.ilsRedOn = true; }
        a3d.trailerHeadings = [a3d.veh.heading, a3d.veh.heading, a3d.veh.heading, a3d.veh.heading, a3d.veh.heading, a3d.veh.heading];
        a3d.camMode = 'chase';
        renderAirport3dUI();
      };
    });
    mount.querySelectorAll('#a3d-drive-pad .drive-key').forEach(btn => {
      const k = btn.dataset.k;
      const on = e => { e.preventDefault(); a3d.keys[k] = true; btn.classList.add('pressed'); };
      const off = () => { a3d.keys[k] = false; btn.classList.remove('pressed'); };
      btn.onmousedown = on; btn.onmouseup = off; btn.onmouseleave = off; btn.ontouchstart = on; btn.ontouchend = off;
    });
  }

  // Orbit drag + smooth wheel zoom (in Drive chase/backing/top, zooms around vehicle smoothly without yanking away!)
  const canvas = document.getElementById('airport3d-gl');
  canvas.onmousedown = e => {
    a3d.dragging = true;
    a3d.lastMouse = { x: e.clientX, y: e.clientY };
    if (a3d.camMode !== 'orbit') {
      if (a3d.subtab === 'drive') {
        a3d.cam.tx = a3d.veh.x;
        a3d.cam.ty = 2;
        a3d.cam.tz = a3d.veh.z;
        a3d.cam.dist = Math.max(24, Math.min(90, 32 * (a3d.driveZoom || 1)));
      }
      setA3dViewpoint('orbit');
    }
  };
  canvas.onmousemove = e => {
    if (!a3d.dragging) return;
    const dx = e.clientX - a3d.lastMouse.x, dy = e.clientY - a3d.lastMouse.y;
    a3d.lastMouse = { x: e.clientX, y: e.clientY };
    a3d.cam.yaw -= dx * 0.008;
    a3d.cam.pitch = Math.max(0.10, Math.min(1.42, a3d.cam.pitch + dy * 0.006));
  };
  canvas.onmouseup = () => { a3d.dragging = false; };
  canvas.onmouseleave = () => { a3d.dragging = false; };
  canvas.onwheel = e => {
    e.preventDefault();
    if (a3d.subtab === 'drive' && (a3d.camMode === 'chase' || a3d.camMode === 'backing' || a3d.camMode === 'top')) {
      a3d.driveZoom = Math.max(0.55, Math.min(2.6, (a3d.driveZoom || 1.0) + e.deltaY * 0.0012));
      return;
    }
    if (a3d.camMode !== 'orbit') setA3dViewpoint('orbit');
    const factor = e.deltaY > 0 ? 1.12 : 0.89;
    a3d.cam.dist = Math.max(18, Math.min(3800, a3d.cam.dist * factor));
  };

  // Touch orbit (1-finger) + pinch zoom (2-finger) for iPhone / iPad
  let pinchDist = 0;
  canvas.ontouchstart = e => {
    if (e.touches.length === 1) {
      a3d.dragging = true;
      a3d.lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      a3d.dragging = false;
      pinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };
  canvas.ontouchmove = e => {
    if (e.touches.length === 1 && a3d.dragging) {
      const dx = e.touches[0].clientX - a3d.lastMouse.x;
      const dy = e.touches[0].clientY - a3d.lastMouse.y;
      if (Math.abs(dx) + Math.abs(dy) > 3 && a3d.camMode !== 'orbit') setA3dViewpoint('orbit');
      a3d.lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      a3d.cam.yaw -= dx * 0.008;
      a3d.cam.pitch = Math.max(0.10, Math.min(1.42, a3d.cam.pitch + dy * 0.006));
    } else if (e.touches.length === 2 && pinchDist > 0) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = pinchDist / Math.max(10, d);
      pinchDist = d;
      if (a3d.camMode !== 'orbit') setA3dViewpoint('orbit');
      a3d.cam.dist = Math.max(18, Math.min(3800, a3d.cam.dist * ratio));
    }
  };
  canvas.ontouchend = () => { a3d.dragging = false; pinchDist = 0; };

  startAirport3dLoop();
}
