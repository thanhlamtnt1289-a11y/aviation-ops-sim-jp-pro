// Module G: Three.js PBR 5-Airport Simulator + Direct 3D Raycasting + 10 POVs + GSE Drive + 100pt 3D Exam
import { AIRCRAFT_PROFILES } from '../data/aircraft.js';
import {
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
      { id: 'F1', x: -5.5, z: 24.5, ja: '金属ボルト (Nose Gear前)', vi: 'Bu-lông kim loại (Trước càng mũi)', cleared: false },
      { id: 'F2', x: -13.0, z: 12.0, ja: 'ビニール袋 (右エンジン前方)', vi: 'Túi nilon (Trước động cơ phải)', cleared: false },
      { id: 'F3', x: 7.5, z: -2.0, ja: '手荷物ベルト (左主翼付近)', vi: 'Dây đai hành lý (Gần cánh trái)', cleared: false }
    ],
    violations: 0,
    lastMsgJa: '到着完了！ビーコン消灯後、3D画面上の赤いFOD・PBB・ローダーを直接クリックまたは右パネルで操作して100点実技試験へ挑戦！',
    lastMsgVi: 'Tàu bay vừa dừng tại Spot 7! Hãy tắt Beacon rồi CLICK TRỰC TIẾP lên FOD đỏ, PBB, High-Loader trên màn hình 3D (hoặc dùng bảng bên phải)!',
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
  backingBay: { cx: 104, cz: 36, len: 11.4, w: 5.0 },
  backingStatus: { hitchDeg: 0, latErr: 0, angErr: 0, depthPct: 0, jackknife: false, parked: false, hintJa: '', hintVi: '', hintEn: '' },
  prevHitch: null,
  trailerHeadings: [0, 0, 0, 0, 0, 0],
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
    showRaycastToast(t('「3. 操作実習」タブで3D直接クリック操作が使えます', 'Chuyển sang Tab 3 (Thực hành 3D) để click thao tác trực tiếp!'));
    return;
  }
  if (hit.type === 'fod') {
    collectHandsOnFod(hit.id);
    showRaycastToast(`✓ ${t('3DクリックでFOD回収', 'Click 3D nhặt sạch FOD')} [${hit.id}]!`);
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
    return false;
  }
  return true;
}

export function toggleHandsOnBeacon() {
  a3d.handsOn.beaconOn = !a3d.handsOn.beaconOn;
  a3dAudio.playChirp();
  a3d.handsOn.lastMsgJa = a3d.handsOn.beaconOn ? '衝突防止灯 ON — 接近禁止！' : 'ビーコン消灯よし！3D上のFOD・PBB・ローダーをクリック操作できます。';
  a3d.handsOn.lastMsgVi = a3d.handsOn.beaconOn ? 'Beacon ON — Cấm tiếp cận!' : 'Beacon OFF! Bạn có thể click thẳng FOD/PBB/Loader trên 3D hoặc thao tác bảng này.';
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
      ${t(ho.lastMsgJa, ho.lastMsgVi)}
    </div>
    <div class="section-label">1. ${t('安全確認・輪止め・コーン', 'Khóa an toàn Beacon, Chèn bánh & Cọc tiêu')}</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;">
      <button class="btn btn-sm ${ho.beaconOn ? 'btn-danger-outline' : 'btn-primary'}" id="ho-btn-beacon">${ho.beaconOn ? '🔴 Beacon ON → OFF' : '⚪ Beacon OFF (SAFE)'}</button>
      <button class="btn btn-sm ${ho.chocksOn ? 'btn-primary' : ''}" id="ho-btn-chocks">${ho.chocksOn ? '✓ Chocks ON' : '輪止め (Chocks)'}</button>
      <button class="btn btn-sm ${ho.conesOn ? 'btn-primary' : ''}" id="ho-btn-cones">${ho.conesOn ? '✓ Cones ON' : 'コーン (Cones)'}</button>
    </div>
    <div class="section-label">2. ${t('ウォークアラウンド FOD回収（3D上を直接クリックも可）', 'Nhặt 3 FOD (Click thẳng trên 3D hoặc bấm bên dưới)')} (${fodCleared}/3)</div>
    <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
      ${ho.fods.map(f => `<button class="btn btn-sm ${f.cleared ? '' : 'btn-danger-outline'}" data-fod="${f.id}" ${f.cleared ? 'disabled' : ''} style="justify-content:space-between;"><span>${f.cleared ? '✓' : '⚠'} [${f.id}] ${t(f.ja, f.vi)}</span><span>${f.cleared ? 'CLEARED' : t('回収', 'Nhặt')}</span></button>`).join('')}
    </div>
    <div class="section-label">3. ${t('PBB ＆ Low-Deck ハイリフト操作', 'Điều khiển PBB & High-Lift Loader')}</div>
    <div class="field" style="margin-bottom:8px;">
      <label>${t('左舷 PBB スライド', 'Ống lồng PBB L1')}: <strong id="ho-pbb-pct">${Math.round(ho.pbbExt * 100)}%</strong></label>
      <input type="range" id="ho-rng-pbb" min="0" max="100" value="${Math.round(ho.pbbExt * 100)}" />
    </div>
    <div class="field" style="margin-bottom:8px;">
      <label>${t('右舷 High-Loader 昇降', 'Độ cao Low-Deck Loader')}: <strong id="ho-ldr-pct">${Math.round(ho.loaderH * 100)}%</strong></label>
      <input type="range" id="ho-rng-ldr" min="0" max="100" value="${Math.round(ho.loaderH * 100)}" />
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
      <button class="btn btn-sm ${ho.uldLoaded ? 'btn-primary' : ''}" id="ho-btn-uld">${ho.uldLoaded ? '✓ AKH ULD Loaded' : '📦 AKH ULD搭載 (Load ULD)'}</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-sm btn-primary" id="ho-btn-grade">🏆 ${t('3D実技試験 採点 (100点)', 'Chấm điểm Thi 3D (100đ)')}</button>
      <button class="btn btn-sm" id="ho-btn-reset">↺ ${t('リセット', 'Làm lại')}</button>
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
    radioEl.innerHTML = `<span class="radio-dot"></span><strong style="color:#38BDF8;flex-shrink:0;">[${radio.ch}]</strong><span class="ja">${t(radio.ja, radio.vi)}</span>`;
  }
  const strip = document.getElementById('a3d-phase-strip');
  if (strip) {
    strip.innerHTML = A3D_FLIGHT_PHASES.map((item, i) => `
      <button class="phase-chip ${i === a3d.flightPhaseIdx ? 'active' : (i < a3d.flightPhaseIdx ? 'passed' : '')}" data-phase="${i}">
        <strong>${i + 1}.</strong> ${t(item.tagJa, item.tagVi)}
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
          <strong>${t(ph.titleJa, ph.titleVi)}</strong>
          <span class="badge badge-accent">STEP ${a3d.flightPhaseIdx + 1} / 10</span>
        </div>
        <div class="progress-bar-wrap" style="margin:7px 0 4px;"><div class="progress-bar-fill" id="a3d-flight-prog" style="width:${Math.round(a3d.flightProgress * 100)}%"></div></div>
        <div style="font-size:12px;margin-top:4px;"><strong>${t('安全ポイント:', 'Trọng điểm an toàn:')}</strong> ${t(ph.safetyJa, ph.safetyVi)}</div>
      </div>
      ${ph.roles.map(r => `
        <div class="crew-role-card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:13px;">${bi(r.roleJa, r.roleVi)}</strong>
            <span class="badge badge-neutral">${r.badge}</span>
          </div>
          <ul>${(appState.lang === 'ja' ? r.tasksJa : r.tasksVi).map(tk => `<li class="ja">${tk}</li>`).join('')}</ul>
        </div>
      `).join('')}
    `;
  }
}

export function setA3dViewpoint(vpId) {
  a3d.camMode = vpId;
  document.querySelectorAll('[data-vp]').forEach(b => b.classList.toggle('btn-primary', b.dataset.vp === vpId));
  const vp = A3D_VIEWPOINTS.find(v => v.id === vpId);
  const descEl = document.getElementById('a3d-vp-desc');
  if (descEl && vp) descEl.textContent = `[${vp.key}] ${t(vp.ja, vp.vi)} — ${t(vp.descJa, vp.descVi)}`;
}

function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function resetBackingScenario() {
  // Position Open-Cab TT facing West (-X) with slight lateral offset so trailer tail points East (+X) toward BAY 01 (104, 36)!
  a3d.ngoDriveScenario = 'SC5';
  a3d.ngoVehMode = 'backing';
  a3d.ngoScenarioTime = 0;
  a3d.veh.x = 83.5;
  a3d.veh.z = 31.6;
  a3d.veh.heading = Math.PI - 0.14;
  a3d.veh.speed = 0;
  a3d.veh.steerAngle = 0;
  a3d.prevHitch = null;
  a3d.trailerHeadings = [Math.PI - 0.14, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI];
  a3d.backingStatus = { hitchDeg: 0, latErr: -4.4, angErr: 8, depthPct: 0, jackknife: false, parked: false, hintJa: '', hintVi: '', hintEn: '' };
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
    if (hudZone) { hudZone.textContent = `${a3d.flightPhaseIdx + 1}/10 · ${t(ph.tagJa, ph.tagVi)}`; hudZone.className = `hud-pill ${pose.ac.beaconOn ? 'danger' : 'ok'}`; }
    if (hudSpd) hudSpd.textContent = `ALT ${Math.round(pose.ac.y)}m | ${pose.ac.beaconOn ? 'BEACON ON' : 'BEACON OFF'}`;
    if (hudScr) hudScr.textContent = `${Math.round(a3d.flightProgress * 100)}%`;
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
    // SC2: Taxiing aircraft crosses Service Lane (-31, -55) — player MUST wait until >=100m clearance!
    const cyc = st % 24;
    const tx = -115 + (cyc / 24) * 260;
    liveAc = { x: tx, z: -55, heading: 0, beaconOn: true, chocksOn: false, blastOn: true, mode: 'taxi_cross' };
    // Distance behind tail along X when aircraft is heading +X past Service Lane (-31)
    const distFromLane = tx < -31 ? Math.abs(-31 - tx) : (tx - (-31));
    const tailDist = tx >= -31 ? Math.round(tx - (-31)) : 0;
    sAlert.blastDist = tailDist;
    sAlert.service = (tx > -95 && tx < 70); // Active hold until aircraft is 100m (approx 70 units scaled) past -31!
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

  if (a3d.keys.brake) v.speed = Math.abs(v.speed) < 0.35 ? 0 : v.speed - Math.sign(v.speed) * 20 * dt;
  else if (a3d.keys.up) v.speed = Math.min(12.2, v.speed + 9.2 * dt);
  else if (a3d.keys.down) v.speed = Math.max(-4.5, v.speed - 9.0 * dt);
  else v.speed = Math.abs(v.speed) < 0.15 ? 0 : v.speed - Math.sign(v.speed) * 4.8 * dt;

  if (Math.abs(v.speed) > 0.12) {
    const dir = v.speed >= 0 ? 1 : -1;
    v.heading += v.steerAngle * 3.6 * dt * dir * Math.min(1, Math.abs(v.speed) / 3.5);
  }
  const nx = Math.max(-270, Math.min(270, v.x + Math.cos(v.heading) * v.speed * dt));
  const nz = Math.max(-148, Math.min(96, v.z + Math.sin(v.heading) * v.speed * dt));

  // Expanded Realistic Collision Detection (Buildings, Center Pier, T2, Blast Fence, Parked Aircraft, Live Scenario Aircraft!)
  const dynamicObs = [
    ...A3D_OBSTACLES,
    { x1: 27, x2: 41, z1: 6, z2: 38, name: 'Center Pier' },
    { x1: -220, x2: -156, z1: 63, z2: 85, name: 'Terminal 2' },
    { x1: -239.5, x2: -236.5, z1: 21, z2: 43, name: 'Blast Fence' },
    { x1: -239.5, x2: -236.5, z1: 57, z2: 79, name: 'Blast Fence' },
    { x1: 162, x2: 214, z1: 66, z2: 90, name: 'Cargo Warehouse' },
    { x1: -72, x2: -64, z1: -7, z2: 26, name: 'Spot 6 Aircraft' },
    { x1: 64, x2: 72, z1: -7, z2: 26, name: 'Spot 14 Aircraft' },
    { x1: liveAc.x - 5.5, x2: liveAc.x + 5.5, z1: liveAc.z - 15, z2: liveAc.z + 15, name: 'Active Aircraft' }
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
      // Bay X spans [98.3, 109.7]; trailer center enters cleanly around x = 102.5..105.8
      const depthPct = Math.max(0, Math.min(100, Math.round(((tr.x - 95.0) / 8.8) * 100)));
      const tailX = tr.x - Math.cos(tr.heading) * 3.1;
      const tailZ = tr.z - Math.sin(tr.heading) * 3.1;

      // Check rear dock wall bumper (+X >= 121.7) & side bay cones (|z - 22| > 2.1 when trailer inside bay X)
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
        hintJa = '↙ バック(▼)＋右ハンドル(▶)で荷台後端を南側（枠中央）へ振る → その後左(◀)で追従！';
        hintVi = '↪ Lùi (▼) + đánh lái PHẢI (▶) để bẻ đuôi moóc dịch sang TRÁI vào tâm chuồng → rồi trả TRÁI (◀) bám thẳng!';
        hintEn = '↪ Reverse (▼) + Steer RIGHT (▶) to swing trailer tail toward bay center, then chase LEFT (◀)!';
      } else if (latErr > 0.65) {
        hintJa = '↖ バック(▼)＋左ハンドル(◀)で荷台後端を北側（枠中央）へ振る → その後右(▶)で追従！';
        hintVi = '↩ Lùi (▼) + đánh lái TRÁI (◀) để bẻ đuôi moóc dịch sang PHẢI vào tâm chuồng → rồi trả PHẢI (▶) bám thẳng!';
        hintEn = '↩ Reverse (▼) + Steer LEFT (◀) to swing trailer tail toward bay center, then chase RIGHT (▶)!';
      } else {
        hintJa = '🎯 枠中心線に一致！小刻みに微調整しながらゆっくり後退(▼)してBAY 01奥へ！';
        hintVi = '🎯 Đuôi moóc đã thẳng tâm chuồng! Giữ tay lái êm, lùi chậm (▼) vào vạch BAY 01!';
        hintEn = '🎯 Aligned with Bay Center! Ease gently in REVERSE (▼) into BAY 01!';
      }

      a3d.backingStatus = { hitchDeg, latErr, angErr, depthPct, jackknife, parked, hintJa, hintVi, hintEn };
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

  const kmh = Math.abs(v.speed) * 3.6;
  const ev = evaluateAirportZone(v.x, v.z, kmh, a3d.spot101BeaconOn, {
    towingCarts: a3d.ngoVehMode === 'towing',
    over38m: a3d.ngoVehMode === 'high38',
    ilsRedOn: a3d.ilsRedOn,
    blastActive: a3d.blastActive || a3d.ngoDriveScenario === 'SC3'
  });

  // Live Ground Spotter Danger Intervention (whistle + STOP alert if driver ignores active Pushback / Service Lane 100m / Run-Up!)
  const inPushbackDanger = sAlert.pushback && v.x >= -17 && v.x <= 18 && v.z >= -44 && v.z <= -28;
  const inServiceBlastDanger = sAlert.service && v.x >= -38 && v.x <= -24 && v.z < -42 && v.z > -70;
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
  const c = document.getElementById('a3d-minimap');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width = 230, H = c.height = 145;
  const mx = wx => ((wx + 290) / 580) * W;
  const mz = wz => ((wz + 165) / 280) * H;
  // Sea & Island
  ctx.fillStyle = '#0B2340'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#1E293B'; ctx.fillRect(mx(-278), mz(-154), (556 / 580) * W, (268 / 280) * H);
  // Perimeter Road (pink/magenta matching NGO PDF J04!)
  ctx.strokeStyle = '#EC4899'; ctx.lineWidth = 2.2;
  ctx.strokeRect(mx(-264), mz(-142), (528 / 580) * W, (240 / 280) * H);
  // ILS Restricted Zones (blue)
  ctx.strokeStyle = a3d.ilsRedOn ? '#EF4444' : '#38BDF8'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(mx(-142), mz(-142)); ctx.lineTo(mx(-88), mz(-142));
  ctx.moveTo(mx(88), mz(-142)); ctx.lineTo(mx(142), mz(-142));
  ctx.stroke();
  // Runway 36/18 (Red strip matching PDF J08-1)
  ctx.fillStyle = '#DC2626'; ctx.fillRect(mx(-230), mz(-118), (460 / 580) * W, (28 / 280) * H);
  // Taxiways A/B/C
  ctx.fillStyle = '#475569';
  ctx.fillRect(mx(-230), mz(-78), (460 / 580) * W, 4);
  ctx.fillRect(mx(-230), mz(-61), (460 / 580) * W, 5);
  // Apron (Green matching PDF J08-4)
  ctx.fillStyle = 'rgba(34,197,94,0.28)';
  ctx.fillRect(mx(-245), mz(-42), (490 / 580) * W, (116 / 280) * H);
  // Red ABL Boundary
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(mx(-245), mz(-42)); ctx.lineTo(mx(245), mz(-42)); ctx.stroke();
  // 3 Service Lanes (dashed white)
  ctx.strokeStyle = '#F8FAFC'; ctx.lineWidth = 2; ctx.setLineDash([2, 2]);
  [-155, -31, 118].forEach(sx => {
    ctx.beginPath(); ctx.moveTo(mx(sx), mz(-68)); ctx.lineTo(mx(sx), mz(-40)); ctx.stroke();
  });
  ctx.setLineDash([]);
  // T1 + Center Pier + T2 + Cargo
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(mx(-98), mz(66), (146 / 580) * W, (24 / 280) * H);
  ctx.fillRect(mx(-218), mz(64), (62 / 580) * W, (18 / 280) * H);
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(mx(162), mz(66), (52 / 580) * W, (20 / 280) * H);
  // Blast Caution Zones (#71 / #77 yellow)
  ctx.fillStyle = '#FACC15';
  ctx.fillRect(mx(-128), mz(-24), 10, 8);
  ctx.fillRect(mx(-238), mz(45), 10, 8);
  // Labels (clean inner padding so nothing clips at bottom edge)
  ctx.fillStyle = '#F8FAFC'; ctx.font = '700 8px monospace'; ctx.textAlign = 'center';
  ctx.fillText('RWY 36/18 (3500m)', mx(0), mz(-101));
  ctx.fillText('T2 #71-80', mx(-186), mz(90));
  ctx.fillText('T1 (#1-25)', mx(-25), mz(92));
  ctx.fillText('CARGO #101+', mx(188), mz(92));
  ctx.fillStyle = '#F472B6'; ctx.fillText('PERIMETER 40', mx(0), mz(-145));
  // Live GSE Vehicle Arrow
  const vx = mx(a3d.veh.x), vz = mz(a3d.veh.z);
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(vx, vz, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1.4; ctx.stroke();
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
      const vp = A3D_VIEWPOINTS.find(v => v.key === e.key);
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

    <div class="workspace-grid wide-left">
      <div>
        <div class="card" style="padding:14px 16px;">
          <div class="a3d-deck">
            <div class="a3d-cluster">
              <span class="a3d-cluster-lbl">01 · ${t('5空港・気象・時間帯', '5 Sân bay · Thời tiết · Giờ', '5 Airports · Weather · Time')}</span>
              <div class="a3d-cluster-row">
                <select id="a3d-airport-sel" style="padding:4px 7px;border:1px solid var(--border-strong);border-radius:4px;font-size:11.5px;font-weight:600;">
                  ${Object.values(A3D_AIRPORTS).map(ap => `<option value="${ap.id}" ${a3d.airportId === ap.id ? 'selected' : ''}>🛫 ${t(ap.nameJa, ap.nameVi, ap.id + ' (RWY ' + ap.rwy + ')')}</option>`).join('')}
                </select>
                <select id="a3d-wx-sel" style="padding:4px 7px;border:1px solid var(--border-strong);border-radius:4px;font-size:11.5px;">
                  <option value="clear" ${a3d.weather === 'clear' ? 'selected' : ''}>☀ ${t('晴天', 'Trời quang', 'Clear')}</option>
                  <option value="rain" ${a3d.weather === 'rain' ? 'selected' : ''}>🌧 ${t('雨天（湿潤滑走路）', 'Mưa (Đường băng ướt)', 'Rain (Wet RWY)')}</option>
                  <option value="fog" ${a3d.weather === 'fog' ? 'selected' : ''}>🌫 ${t('濃霧', 'Sương mù', 'Fog')}</option>
                  <option value="snow" ${a3d.weather === 'snow' ? 'selected' : ''}>❄ ${t('積雪・防除氷', 'Tuyết & De-icing', 'Snow + De-ice')}</option>
                </select>
                <button class="btn btn-sm ${a3d.timeOfDay === 'day' ? 'btn-primary' : ''}" data-tod="day">☀</button>
                <button class="btn btn-sm ${a3d.timeOfDay === 'sunset' ? 'btn-primary' : ''}" data-tod="sunset">🌅</button>
                <button class="btn btn-sm ${a3d.timeOfDay === 'night' ? 'btn-primary' : ''}" data-tod="night">🌙</button>
              </div>
            </div>
            <div class="a3d-cluster">
              <span class="a3d-cluster-lbl">02 · ${t('機材・NGO運転設定', 'Đội bay · Chế độ Lái NGO', 'Fleet · NGO Drive Mode')}</span>
              <div class="a3d-cluster-row">
                ${isFlight ? `
                  <select id="a3d-fleet-sel" style="padding:4px 7px;border:1px solid var(--border-strong);border-radius:4px;font-size:11.5px;font-weight:600;max-width:165px;">
                    ${Object.values(AIRCRAFT_PROFILES).map(p => `<option value="${p.id}" ${a3d.fleetAircraftId === p.id ? 'selected' : ''}>✈ ${p.id}</option>`).join('')}
                  </select>
                  <button class="btn btn-sm btn-primary" id="a3d-flight-play">${a3d.flightPlaying ? '⏸' : '▶'}</button>
                  <button class="btn btn-sm" id="a3d-flight-prev">⏮</button>
                  <button class="btn btn-sm" id="a3d-flight-next">⏭</button>
                  <button class="btn btn-sm" id="a3d-flight-spd">${a3d.flightSpeed}x</button>
                ` : (isDrive ? `
                  <select id="a3d-ngo-veh-sel" style="padding:4px 6px;border:1px solid var(--border-strong);border-radius:4px;font-size:11px;font-weight:600;">
                    <option value="standard" ${a3d.ngoVehMode === 'standard' ? 'selected' : ''}>🚗 ${t('通常GSE (30km/h)', 'GSE thường (30km/h)', 'Standard GSE (30km/h)')}</option>
                    <option value="towing" ${a3d.ngoVehMode === 'towing' ? 'selected' : ''}>🚜 ${t('カート牽引 (15km/h)', 'Kéo 6 moóc (15km/h)', 'Towing 6 Carts (15km/h)')}</option>
                    <option value="backing" ${a3d.ngoVehMode === 'backing' ? 'selected' : ''}>🅿 ${t('牽引バック車庫入れ (長尺ドーリー)', 'Lùi rơ-moóc vào chuồng (Đầu kéo)', 'Semi-Trailer Reverse Bay')}</option>
                    <option value="high38" ${a3d.ngoVehMode === 'high38' ? 'selected' : ''}>🚛 ${t('全高3.8m超 (固定橋不可)', 'Xe cao >3.8m (Cấm cầu cố định)', 'High Vehicle >3.8m')}</option>
                  </select>
                  <button class="btn btn-sm ${a3d.spot101BeaconOn ? 'btn-danger-outline' : ''}" id="a3d-toggle-beacon">S6:${a3d.spot101BeaconOn ? '🔴' : '⚪'}</button>
                  <button class="btn btn-sm ${a3d.ilsRedOn ? 'btn-danger-outline' : ''}" id="a3d-toggle-ils">ILS:${a3d.ilsRedOn ? '🔴' : '⚪'}</button>
                  <button class="btn btn-sm ${a3d.blastActive ? 'btn-danger-outline' : ''}" id="a3d-toggle-blast">#71:${a3d.blastActive ? '🔥' : '⚪'}</button>
                ` : `<span class="badge badge-ok">RAYCAST CLICK READY</span>`)}
              </div>
            </div>
            <div class="a3d-cluster">
              <span class="a3d-cluster-lbl">03 · HUD · GFX · VIEW</span>
              <div class="a3d-cluster-row">
                <select id="a3d-lbl-sel" style="padding:4px 6px;border:1px solid var(--border-strong);border-radius:4px;font-size:11px;">
                  <option value="smart" ${a3d.labelMode === 'smart' ? 'selected' : ''}>HUD: Smart</option>
                  <option value="all" ${a3d.labelMode === 'all' ? 'selected' : ''}>HUD: All</option>
                  <option value="min" ${a3d.labelMode === 'min' ? 'selected' : ''}>HUD: Cinema</option>
                </select>
                <select id="a3d-gfx-sel" style="padding:4px 6px;border:1px solid var(--border-strong);border-radius:4px;font-size:11px;">
                  <option value="high" ${a3d.gfxQuality === 'high' ? 'selected' : ''}>PBR Ultra</option>
                  <option value="med" ${a3d.gfxQuality === 'med' ? 'selected' : ''}>PBR Med</option>
                  <option value="low" ${a3d.gfxQuality === 'low' ? 'selected' : ''}>Fast</option>
                </select>
                <button class="btn btn-sm ${a3d.soundOn ? 'btn-primary' : ''}" id="a3d-toggle-sound">${a3d.soundOn ? '🔊' : '🔇'}</button>
                <button class="btn btn-sm ${a3d.expanded ? 'btn-primary' : ''}" id="a3d-toggle-expand">⛶</button>
              </div>
            </div>
          </div>

          <div class="pov-bar">
            <span class="pov-label">${t('視点 (1〜0):', 'Góc nhìn (1-0):')}</span>
            ${A3D_VIEWPOINTS.map(vp => `<button class="btn btn-sm ${a3d.camMode === vp.id ? 'btn-primary' : ''}" data-vp="${vp.id}">${t(vp.ja, vp.vi)}</button>`).join('')}
          </div>

          <div class="airport3d-stage ${a3d.expanded ? 'expanded' : ''}" id="a3d-stage-box">
            <canvas id="airport3d-gl"></canvas>
            <canvas id="airport3d-hud2d"></canvas>
            <div class="a3d-minimap-wrap" title="NGO Centrair Official Tactical Map">
              <canvas id="a3d-minimap"></canvas>
            </div>
            <div class="raycast-toast" id="a3d-raycast-toast"></div>
            <div class="hud-top">
              <div class="hud-pill ok" id="a3d-hud-zone">THREE.JS PBR READY</div>
              <div style="display:flex;gap:6px;">
                <div class="hud-pill" id="a3d-hud-spd">0 km/h</div>
                <div class="hud-pill" id="a3d-hud-score">0%</div>
              </div>
            </div>
            <div class="hud-banner">
              <div class="hud-pill" id="a3d-vp-desc" style="font-family:var(--font-sans);font-size:11.5px;max-width:78%;">
                [${curVp.key}] ${t(curVp.ja, curVp.vi)} — ${t(curVp.descJa, curVp.descVi)}
              </div>
              ${isDrive ? `
                <div class="drive-pad" id="a3d-drive-pad">
                  <div></div><button class="drive-key" data-k="up">▲</button><div></div>
                  <button class="drive-key" data-k="left">◀</button><button class="drive-key" data-k="down">▼</button><button class="drive-key" data-k="right">▶</button>
                </div>
              ` : ''}
            </div>
          </div>

          ${isFlight ? `<div class="radio-bar" id="a3d-radio-bar"></div><div class="phase-strip" id="a3d-phase-strip"></div>` : ''}
        </div>
      </div>

      <div>
        ${isFlight ? `
          <div class="card" style="margin-bottom:12px;">
            <div class="card-title">
              <span class="ja">🚧 ${t('3Dマーシャラー 標準手信号練習 (8種)', 'Luyện 8 Tín hiệu Tay Marshaller Chuẩn 3D', '3D Marshaller Official Hand Signals (8)')}</span>
              <button class="btn btn-sm btn-primary" id="a3d-focus-marsh">👁 ${t('近接視点', 'Zoom Marshaller', 'Zoom In')}</button>
            </div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;">
              ${[
                [null, t('自動連動', 'Tự động theo pha', 'Auto Sync')],
                ['m_straight', t('1. 直進', '1. Đi thẳng', '1. Straight')],
                ['m_left', t('2. 左折', '2. Rẽ trái', '2. Turn Left')],
                ['m_right', t('3. 右折', '3. Rẽ phải', '3. Turn Right')],
                ['m_slow', t('4. 減速', '4. Giảm tốc', '4. Slow Down')],
                ['m_stop', t('5. 停止', '5. Dừng lại', '5. Stop')],
                ['m_emerg_stop', t('6. 緊急停止', '6. Dừng khẩn cấp', '6. Emerg Stop')],
                ['m_chocks', t('7. 輪止め設置', '7. Chèn bánh', '7. Chocks In')],
                ['m_allclear', t('8. 出発OK', '8. An toàn / OK', '8. All Clear')]
              ].map(([sid, lbl]) => `<button class="btn btn-sm ${a3d.marshallerDemoSignal === sid ? 'btn-primary' : ''}" data-msig="${sid || ''}">${lbl}</button>`).join('')}
            </div>
          </div>
          <div class="card"><div class="card-title"><span class="ja">${t('地上スタッフ担当役割', 'Vai trò Nhân viên Mặt đất', 'Ground Crew Roles')}</span><span class="badge badge-ok">LIVE</span></div><div id="a3d-flight-roles-panel"></div></div>
        ` : (isOps3d ? `
          <div class="card"><div class="card-title"><span class="ja">${t('3D直接クリック ＆ 実技検定', 'Thao tác 3D trực tiếp & Thi 100đ', 'Direct 3D Ops & 100pt Exam')}</span><span class="badge badge-warn">RAYCAST</span></div><div id="a3d-handson-panel"></div></div>
        ` : `
          <div class="card">
            <div class="card-title"><span class="ja">🚜 ${t('NGOセントレア 実戦運転 ＆ 牽引バック実習 (TT mui trần)', '5 Bài Tập Lái Xe TT Mui Trần & Lùi Rơ-Moóc Vào Chuồng', '5 Live NGO TT Driving & Semi-Trailer Reverse Scenarios')}</span></div>
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
            <div class="alert alert-warn" style="font-size:12px;margin-bottom:8px;">
              <strong>${t('実車衝突＆COC通報訓練', 'Va chạm vật lý & Quy trình báo COC', 'Collision Physics & COC Protocol')}:</strong>
              ${t('障害物へ接触すると衝撃・反動・衝突音が発生し、現場保存＆COC（0569-38-1500 / 内線3000）通報指示が出ます。',
                  'Đụng chướng ngại vật sẽ có phản lực bật lại, rung camera, âm thanh va chạm và lệnh giữ nguyên hiện trường báo COC (0569-38-1500 / nội bộ 3000).',
                  'Hitting obstacles triggers physical recoil, camera shake, crash audio, and the Centrair COC (0569-38-1500 / Ext. 3000) accident alert.')}
            </div>
            <div id="a3d-log-list" style="max-height:200px;overflow-y:auto;"></div>
          </div>
        `)}
      </div>
    </div>
  `;

  mount.querySelectorAll('[data-st]').forEach(b => {
    b.onclick = () => {
      a3d.subtab = b.dataset.st;
      if (a3d.subtab === 'ops3d') { a3d.camMode = 'orbit'; a3d.cam = { tx: 0, ty: 3, tz: 12, dist: 46, yaw: -0.55, pitch: 0.42 }; }
      else if (a3d.subtab === 'drive') a3d.camMode = 'chase';
      else a3d.camMode = 'flight_follow';
      renderAirport3dUI();
    };
  });
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
  document.getElementById('a3d-toggle-expand').onclick = () => {
    a3d.expanded = !a3d.expanded;
    document.getElementById('a3d-stage-box').classList.toggle('expanded', a3d.expanded);
  };

  if (isFlight) {
    document.getElementById('a3d-fleet-sel').onchange = e => { a3d.fleetAircraftId = e.target.value; };
    document.getElementById('a3d-flight-play').onclick = () => { a3d.flightPlaying = !a3d.flightPlaying; document.getElementById('a3d-flight-play').textContent = a3d.flightPlaying ? '⏸' : '▶'; };
    document.getElementById('a3d-flight-prev').onclick = () => { a3d.flightPhaseIdx = (a3d.flightPhaseIdx + 9) % 10; a3d.flightProgress = 0; renderFlightPhasePanel(); };
    document.getElementById('a3d-flight-next').onclick = () => { a3d.flightPhaseIdx = (a3d.flightPhaseIdx + 1) % 10; a3d.flightProgress = 0; renderFlightPhasePanel(); };
    document.getElementById('a3d-flight-spd').onclick = () => { a3d.flightSpeed = a3d.flightSpeed === 1 ? 2 : (a3d.flightSpeed === 2 ? 0.5 : 1); document.getElementById('a3d-flight-spd').textContent = `${a3d.flightSpeed}x`; };
    const fm = document.getElementById('a3d-focus-marsh');
    if (fm) fm.onclick = () => {
      a3d.camMode = 'orbit';
      a3d.cam = { tx: 0, ty: 1.8, tz: 32.5, dist: 8.5, yaw: 0.12, pitch: 0.22 };
    };
    mount.querySelectorAll('[data-msig]').forEach(b => {
      b.onclick = () => {
        a3d.marshallerDemoSignal = b.dataset.msig || null;
        if (a3d.marshallerDemoSignal) {
          a3d.camMode = 'orbit';
          a3d.cam = { tx: 0, ty: 1.8, tz: 32.5, dist: 8.5, yaw: 0.12, pitch: 0.22 };
        }
        renderAirport3dUI();
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
    mount.querySelectorAll('#a3d-drive-pad .drive-key').forEach(btn => {
      const k = btn.dataset.k;
      const on = e => { e.preventDefault(); a3d.keys[k] = true; btn.classList.add('pressed'); };
      const off = () => { a3d.keys[k] = false; btn.classList.remove('pressed'); };
      btn.onmousedown = on; btn.onmouseup = off; btn.onmouseleave = off; btn.ontouchstart = on; btn.ontouchend = off;
    });
  }

  // Orbit drag + wheel zoom
  const canvas = document.getElementById('airport3d-gl');
  canvas.onmousedown = e => { a3d.dragging = true; a3d.lastMouse = { x: e.clientX, y: e.clientY }; if (a3d.camMode !== 'orbit') setA3dViewpoint('orbit'); };
  canvas.onmousemove = e => {
    if (!a3d.dragging) return;
    const dx = e.clientX - a3d.lastMouse.x, dy = e.clientY - a3d.lastMouse.y;
    a3d.lastMouse = { x: e.clientX, y: e.clientY };
    a3d.cam.yaw -= dx * 0.008;
    a3d.cam.pitch = Math.max(0.10, Math.min(1.42, a3d.cam.pitch + dy * 0.006));
  };
  canvas.onmouseup = () => { a3d.dragging = false; };
  canvas.onmouseleave = () => { a3d.dragging = false; };
  canvas.onwheel = e => { e.preventDefault(); if (a3d.camMode !== 'orbit') setA3dViewpoint('orbit'); a3d.cam.dist = Math.max(22, Math.min(280, a3d.cam.dist + e.deltaY * 0.14)); };

  startAirport3dLoop();
}
