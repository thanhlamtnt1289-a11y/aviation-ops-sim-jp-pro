// Module D: Weight & Balance / Load Planning + Next-Gen EFB + LIVE Split-Screen Three.js 3D Preview
import { AIRCRAFT_PROFILES, WB_SCENARIOS } from '../data/aircraft.js';
import {
  calculateWeightAndBalance,
  analyzeWbConsequences,
  makeBalancedDefaultInput,
  renderWbRadialGaugeSvg,
  renderCgEnvelopeSvg,
  renderConsequenceAircraftSvg,
  runWbUnitTests,
  fmtWeight,
  kgToLb,
  lbToKg
} from '../engines/wbEngine.js';
import { appState, saveState, t } from '../core/state.js';

export const wbState = {
  aircraftId: 'A320',
  scenarioId: 'S01',
  input: JSON.parse(JSON.stringify(WB_SCENARIOS[0].input)),
  dow: AIRCRAFT_PROFILES.A320.dow,
  dowArm: AIRCRAFT_PROFILES.A320.dowArm,
  stdPaxWt: 75,
  env: { airport: 'NGO', oatC: 15, windKt: 0, surface: 'DRY' },
  simError: { unreportedAftKg: 0, unreportedFwdKg: 0 },
  activeFaultPreset: 'normal',
  split3dOpen: true,
  lastResult: null,
  lastConseq: null
};

let splitScene = null;
let splitRaf = null;
let wbActions = null;

function toDisp(kg) {
  return appState.unit === 'lb' ? Math.round(kgToLb(kg)) : Math.round(kg);
}
function fromDisp(val) {
  const num = Number(val) || 0;
  return appState.unit === 'lb' ? lbToKg(num) : num;
}

export function stopWbSplit3D() {
  if (splitRaf) { cancelAnimationFrame(splitRaf); splitRaf = null; }
}

export async function ensureWbSplit3D() {
  const wrap = document.getElementById('wb-split-3d-wrap');
  const canvas = document.getElementById('wb-split-3d-canvas');
  if (!wrap || !canvas) return;
  wrap.style.display = wbState.split3dOpen ? 'block' : 'none';
  if (!wbState.split3dOpen) {
    stopWbSplit3D();
    return;
  }
  if (!splitScene) {
    try {
      const { AirportScene3D } = await import('../three3d/AirportScene3D.js');
      splitScene = new AirportScene3D(canvas, null, { compact: true });
    } catch (err) {
      wrap.innerHTML = `<div style="padding:18px;font-size:12px;color:#94A3B8;font-family:var(--font-mono);">Three.js preview standby (${err.message}).</div>`;
      return;
    }
  }
  if (!splitRaf && appState.activeModule === 'wb') {
    const loop = now => {
      if (!wbState.split3dOpen || appState.activeModule !== 'wb') { splitRaf = null; return; }
      splitScene.renderFrame({
        subtab: 'flight',
        airportId: wbState.env.airport || 'NGO',
        fleetAircraftId: wbState.aircraftId,
        liveryId: appState.livery || 'ANA',
        weather: wbState.env.surface === 'SNOW' ? 'snow' : (wbState.env.surface === 'WET' ? 'rain' : 'clear'),
        timeOfDay: appState.theme === 'dark' ? 'sunset' : 'day',
        gfxQuality: 'med',
        aiTime: now * 0.001,
        wbConseq: wbState.lastConseq,
        syncWbFailure: true
      }, now);
      splitRaf = requestAnimationFrame(loop);
    };
    splitRaf = requestAnimationFrame(loop);
  }
}

export function initWbModule(actions) {
  wbActions = actions;
  const acSel = document.getElementById('wb-aircraft');
  const scSel = document.getElementById('wb-scenario');
  if (!acSel || !scSel) return;

  acSel.innerHTML = Object.values(AIRCRAFT_PROFILES).map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  scSel.innerHTML = WB_SCENARIOS.map(s => `<option value="${s.id}">${t(s.titleJa, s.titleVi)}</option>`).join('');

  acSel.onchange = () => selectWbAircraft(acSel.value);
  scSel.onchange = () => { wbState.scenarioId = scSel.value; renderWbScenarioInfo(); };

  const rAft = document.getElementById('wb-err-aft');
  const rFwd = document.getElementById('wb-err-fwd');
  if (rAft) rAft.oninput = () => { wbState.simError.unreportedAftKg = Number(rAft.value) || 0; wbState.activeFaultPreset = 'custom'; recalcAndRenderWb(); };
  if (rFwd) rFwd.oninput = () => { wbState.simError.unreportedFwdKg = Number(rFwd.value) || 0; wbState.activeFaultPreset = 'custom'; recalcAndRenderWb(); };

  document.getElementById('wb-open-3d-btn').onclick = () => {
    if (wbActions && wbActions.openWbIn3D) wbActions.openWbIn3D();
  };
  const splitBtn = document.getElementById('wb-toggle-split3d');
  if (splitBtn) {
    splitBtn.onclick = () => {
      wbState.split3dOpen = !wbState.split3dOpen;
      splitBtn.classList.toggle('active', wbState.split3dOpen);
      ensureWbSplit3D();
    };
  }

  document.getElementById('wb-load-scenario').onclick = () => loadWbScenario(wbState.scenarioId, false);
  document.getElementById('wb-apply-solution').onclick = () => loadWbScenario(wbState.scenarioId, true);
  document.getElementById('wb-show-solution').onclick = () => {
    const box = document.getElementById('wb-solution-box');
    const sc = WB_SCENARIOS.find(s => s.id === wbState.scenarioId);
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
    box.innerHTML = `<strong>${t('解答例:', 'Lời giải tham khảo:', 'Reference Solution:')}</strong> ${t(sc.solutionNoteJa, sc.solutionNoteVi, sc.solutionNoteEn || sc.solutionNoteVi)}`;
  };
  document.getElementById('wb-verify-scenario').onclick = () => {
    const prof = AIRCRAFT_PROFILES[wbState.aircraftId];
    const res = calculateWeightAndBalance(getCurrentWbInputKg(), prof);
    const box = document.getElementById('wb-solution-box');
    box.style.display = 'block';
    if (res.status === 'PASS') {
      if (!appState.wbSolved.includes(wbState.scenarioId)) {
        appState.wbSolved.push(wbState.scenarioId);
        saveState();
      }
      box.className = 'alert alert-ok';
      box.innerHTML = t(`合格（PASS）！シナリオ ${wbState.scenarioId} の制限をすべて満たしています。`, `ĐẠT (PASS)! Kịch bản ${wbState.scenarioId} thỏa mãn toàn bộ giới hạn.`, `PASS! Scenario ${wbState.scenarioId} satisfies all weight & CG limits.`);
      document.getElementById('wb-solved-count').textContent = `${appState.wbSolved.length} / ${WB_SCENARIOS.length}`;
    } else {
      box.className = 'alert alert-danger';
      box.innerHTML = t(`未達成（FAIL）: ${res.violations.length} 件の制限違反があります。`, `CHƯA ĐẠT (FAIL): Còn ${res.violations.length} vi phạm giới hạn.`, `FAIL: ${res.violations.length} limit violation(s) remaining.`);
    }
  };
  document.getElementById('wb-unit-toggle').onclick = () => {
    appState.unit = appState.unit === 'kg' ? 'lb' : 'kg';
    saveState();
    renderWbInputs();
    recalcAndRenderWb();
  };
  document.getElementById('wb-btn-print').onclick = () => window.print();
  document.getElementById('wb-btn-tests').onclick = () => {
    const card = document.getElementById('wb-tests-card');
    card.style.display = 'block';
    const tests = runWbUnitTests();
    const passed = tests.filter(x => x.pass).length;
    const sum = document.getElementById('wb-test-summary');
    sum.textContent = `${passed} / ${tests.length} PASS`;
    sum.className = `badge ${passed === tests.length ? 'badge-ok' : 'badge-danger'}`;
    document.getElementById('wb-test-tbody').innerHTML = tests.map((x, i) => `
      <tr>
        <td class="num">${i + 1}</td>
        <td>${x.name}</td>
        <td><span class="badge ${x.pass ? 'badge-ok' : 'badge-danger'}">${x.pass ? 'PASS' : 'FAIL'}</span></td>
        <td style="font-family:var(--font-mono);font-size:11.5px;">${x.detail}</td>
      </tr>
    `).join('');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  loadWbScenario('S01', false);
}

export function selectWbAircraft(acId) {
  if (!AIRCRAFT_PROFILES[acId]) return;
  wbState.aircraftId = acId;
  const p = AIRCRAFT_PROFILES[acId];
  wbState.dow = p.dow;
  wbState.dowArm = p.dowArm;
  wbState.simError = { unreportedAftKg: 0, unreportedFwdKg: 0 };
  wbState.activeFaultPreset = 'normal';
  wbState.input = makeBalancedDefaultInput(p);
  const acSel = document.getElementById('wb-aircraft');
  if (acSel) acSel.value = acId;
  renderWbInputs();
  recalcAndRenderWb();
}

export function loadWbScenario(scId, useSolution = false) {
  const sc = WB_SCENARIOS.find(s => s.id === scId) || WB_SCENARIOS[0];
  wbState.scenarioId = sc.id;
  wbState.aircraftId = sc.aircraft;
  const p = AIRCRAFT_PROFILES[sc.aircraft];
  wbState.dow = p.dow;
  wbState.dowArm = p.dowArm;
  wbState.stdPaxWt = 75;
  wbState.simError = { unreportedAftKg: 0, unreportedFwdKg: 0 };
  wbState.activeFaultPreset = 'normal';
  wbState.input = JSON.parse(JSON.stringify(useSolution ? sc.solutionInput : sc.input));

  const acSel = document.getElementById('wb-aircraft');
  const scSel = document.getElementById('wb-scenario');
  if (acSel) acSel.value = wbState.aircraftId;
  if (scSel) scSel.value = wbState.scenarioId;
  const solBox = document.getElementById('wb-solution-box');
  if (solBox) solBox.style.display = 'none';
  renderWbScenarioInfo();
  renderWbInputs();
  recalcAndRenderWb();
}

export function applyWbFaultPreset(presetId) {
  const p = AIRCRAFT_PROFILES[wbState.aircraftId];
  wbState.activeFaultPreset = presetId;
  if (presetId === 'normal') {
    wbState.simError = { unreportedAftKg: 0, unreportedFwdKg: 0 };
    wbState.input = makeBalancedDefaultInput(p);
  } else if (presetId === 'lmc_aft') {
    wbState.input = makeBalancedDefaultInput(p);
    wbState.simError = { unreportedAftKg: Math.min(6000, Math.round(p.mzfw * 0.035 / 250) * 250 || 1500), unreportedFwdKg: 0 };
  } else if (presetId === 'tail_tip') {
    wbState.simError = { unreportedAftKg: 0, unreportedFwdKg: 0 };
    const inp = makeBalancedDefaultInput(p);
    if (!p.isFreighter) inp.pax = { A: Math.round(p.paxZones[0].maxPax * 0.05), B: Math.round(p.paxZones[1].maxPax * 0.35), C: p.paxZones[2].maxPax };
    p.holds.forEach((h, i) => { inp.holds[h.id] = i === 0 ? { bag: 0, cargo: 0 } : { bag: p.isFreighter ? 0 : Math.round(h.maxWeight * 0.45), cargo: Math.round(h.maxWeight * 0.52) }; });
    p.uldPositions.forEach(pos => { const isFwd = pos.holdId === p.holds[0].id || pos.holdId === 'H1'; inp.ulds[pos.id] = isFwd ? 0 : Math.round(pos.maxWeight * 0.92); });
    wbState.input = inp;
  } else if (presetId === 'nose_heavy') {
    wbState.simError = { unreportedAftKg: 0, unreportedFwdKg: 0 };
    const inp = makeBalancedDefaultInput(p);
    if (!p.isFreighter) inp.pax = { A: p.paxZones[0].maxPax, B: Math.round(p.paxZones[1].maxPax * 0.3), C: 0 };
    p.holds.forEach((h, i) => { inp.holds[h.id] = i === 0 ? { bag: p.isFreighter ? 0 : Math.round(h.maxWeight * 0.5), cargo: Math.round(h.maxWeight * 0.45) } : { bag: 0, cargo: 0 }; });
    p.uldPositions.forEach(pos => { const isFwd = pos.holdId === p.holds[0].id || pos.holdId === 'H1'; inp.ulds[pos.id] = isFwd ? Math.round(pos.maxWeight * 0.95) : 0; });
    wbState.input = inp;
  } else if (presetId === 'over_mtow') {
    wbState.simError = { unreportedAftKg: 0, unreportedFwdKg: 0 };
    const inp = makeBalancedDefaultInput(p);
    if (!p.isFreighter) inp.pax = { A: p.paxZones[0].maxPax, B: p.paxZones[1].maxPax, C: p.paxZones[2].maxPax };
    p.holds.forEach(h => { inp.holds[h.id] = { bag: p.isFreighter ? 0 : Math.round(h.maxWeight * 0.4), cargo: Math.round(h.maxWeight * 0.5) }; });
    inp.fuel.block = Math.round(p.maxFuel * 0.96);
    inp.fuel.trip = Math.round(p.maxFuel * 0.45);
    wbState.input = inp;
  }
  const rAft = document.getElementById('wb-err-aft');
  const rFwd = document.getElementById('wb-err-fwd');
  if (rAft) rAft.value = wbState.simError.unreportedAftKg;
  if (rFwd) rFwd.value = wbState.simError.unreportedFwdKg;
  renderWbInputs();
  recalcAndRenderWb();
}

export function renderWbScenarioInfo() {
  const sc = WB_SCENARIOS.find(s => s.id === wbState.scenarioId) || WB_SCENARIOS[0];
  const solved = appState.wbSolved.includes(sc.id);
  document.getElementById('wb-solved-count').textContent = `${appState.wbSolved.length} / ${WB_SCENARIOS.length} Solved`;
  document.getElementById('wb-scenario-box').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <strong>${t(sc.titleJa, sc.titleVi)}</strong>
      ${solved ? '<span class="badge badge-ok">SOLVED</span>' : '<span class="badge badge-neutral">PENDING</span>'}
    </div>
    <div style="margin-top:4px;font-size:12.5px;">${t(sc.descJa, sc.descVi)}</div>
  `;
}

export function renderWbInputs() {
  const p = AIRCRAFT_PROFILES[wbState.aircraftId];
  const u = appState.unit;
  document.querySelectorAll('.wb-u').forEach(el => { el.textContent = u; });
  document.getElementById('wb-unit-badge').textContent = `Unit: ${u} / m`;
  document.getElementById('wb-unit-toggle').textContent = `${t('単位', 'Đơn vị', 'Unit')}: ${u.toUpperCase()} ⇄ ${u === 'kg' ? 'LB' : 'KG'}`;

  const specBar = document.getElementById('wb-fleet-spec');
  if (specBar) {
    specBar.innerHTML = `
      <span class="efb-chip">${p.category}</span>
      <span class="efb-chip">GSE: ${p.gseType}</span>
      <span class="efb-chip">TAIL-STRIKE: ${p.perf.tailStrikePitchDeg}°</span>
      <span class="efb-chip">MAX FUEL: ${fmtWeight(p.maxFuel, u)} ${u}</span>
    `;
  }

  const bindNum = (el, cb) => { el.oninput = () => { cb(el.value); recalcAndRenderWb(); }; };
  const dowEl = document.getElementById('wb-dow');
  const armEl = document.getElementById('wb-dow-arm');
  const paxWtEl = document.getElementById('wb-pax-wt');
  dowEl.value = toDisp(wbState.dow);
  armEl.value = wbState.dowArm.toFixed(2);
  paxWtEl.value = toDisp(wbState.stdPaxWt);
  document.getElementById('wb-dow-hint').textContent = `MZFW ${fmtWeight(p.mzfw, u)} / MTOW ${fmtWeight(p.mtow, u)} ${u}`;
  bindNum(dowEl, v => { wbState.dow = fromDisp(v); });
  bindNum(armEl, v => { wbState.dowArm = Number(v) || p.dowArm; });
  bindNum(paxWtEl, v => { wbState.stdPaxWt = Math.max(10, fromDisp(v)); });

  const paxWrap = document.getElementById('wb-pax-inputs');
  paxWrap.innerHTML = p.paxZones.map(z => `
    <div class="field">
      <label class="ja">${t(z.labelJa, z.labelVi)}</label>
      <input type="number" min="0" max="${z.maxPax + 20}" value="${(wbState.input.pax && wbState.input.pax[z.id]) || 0}" data-pax="${z.id}" ${z.maxPax === 0 ? 'disabled' : ''} />
      <span class="field-hint">Max ${z.maxPax} | Arm ${z.arm}m</span>
    </div>
  `).join('');
  paxWrap.querySelectorAll('input').forEach(inp => {
    inp.oninput = () => { wbState.input.pax = wbState.input.pax || {}; wbState.input.pax[inp.dataset.pax] = Math.max(0, Number(inp.value) || 0); recalcAndRenderWb(); };
  });

  const holdWrap = document.getElementById('wb-hold-inputs');
  holdWrap.innerHTML = p.holds.map(h => {
    const hv = (wbState.input.holds && wbState.input.holds[h.id]) || { bag: 0, cargo: 0 };
    return `
      <div class="form-grid-2" style="margin-bottom:8px;padding:8px 10px;background:var(--bg-canvas);border:1px solid var(--border);border-radius:6px;">
        <div class="field">
          <label class="ja">${t(h.labelJa, h.labelVi)} — ${t('手荷物', 'Hành lý')} (${u})</label>
          <input type="number" min="0" step="50" value="${toDisp(hv.bag)}" data-hold="${h.id}" data-kind="bag" />
        </div>
        <div class="field">
          <label class="ja">${t('バラ貨物', 'Hàng rời')} (${u}) <span style="color:var(--text-muted);font-weight:400;">[Max ${fmtWeight(h.maxWeight, u)} ${u} | Arm ${h.arm}m]</span></label>
          <input type="number" min="0" step="50" value="${toDisp(hv.cargo)}" data-hold="${h.id}" data-kind="cargo" />
        </div>
      </div>
    `;
  }).join('');
  holdWrap.querySelectorAll('input').forEach(inp => {
    inp.oninput = () => {
      const hid = inp.dataset.hold;
      wbState.input.holds = wbState.input.holds || {};
      wbState.input.holds[hid] = wbState.input.holds[hid] || { bag: 0, cargo: 0 };
      wbState.input.holds[hid][inp.dataset.kind] = Math.max(0, fromDisp(inp.value));
      recalcAndRenderWb();
    };
  });

  const uldWrap = document.getElementById('wb-uld-inputs');
  if (p.uldPositions.length === 0) {
    uldWrap.innerHTML = `<div style="grid-column:1/-1;font-size:12px;color:var(--text-secondary);padding:8px 10px;background:var(--bg-canvas);border:1px dashed var(--border-strong);border-radius:6px;">${t('バルク専用機（ULD非搭載・ベルトローダー対応）', 'Tàu bay xếp rời Bulk-only (dùng Belt Loader, không dùng ULD)')}</div>`;
  } else {
    uldWrap.innerHTML = p.uldPositions.map(pos => `
      <div class="field">
        <label>${pos.id} (${pos.type} / ${pos.holdId}) (${u})</label>
        <input type="number" min="0" step="50" value="${toDisp((wbState.input.ulds && wbState.input.ulds[pos.id]) || 0)}" data-uld="${pos.id}" />
        <span class="field-hint">Max ${fmtWeight(pos.maxWeight, u)} ${u} | ${pos.arm}m</span>
      </div>
    `).join('');
    uldWrap.querySelectorAll('input').forEach(inp => {
      inp.oninput = () => { wbState.input.ulds = wbState.input.ulds || {}; wbState.input.ulds[inp.dataset.uld] = Math.max(0, fromDisp(inp.value)); recalcAndRenderWb(); };
    });
  }

  const fBlock = document.getElementById('wb-fuel-block');
  const fTaxi = document.getElementById('wb-fuel-taxi');
  const fTrip = document.getElementById('wb-fuel-trip');
  fBlock.value = toDisp((wbState.input.fuel && wbState.input.fuel.block) || 0);
  fTaxi.value = toDisp((wbState.input.fuel && wbState.input.fuel.taxi) || 0);
  fTrip.value = toDisp((wbState.input.fuel && wbState.input.fuel.trip) || 0);
  bindNum(fBlock, v => { wbState.input.fuel.block = Math.max(0, fromDisp(v)); });
  bindNum(fTaxi, v => { wbState.input.fuel.taxi = Math.max(0, fromDisp(v)); });
  bindNum(fTrip, v => { wbState.input.fuel.trip = Math.max(0, fromDisp(v)); });

  const eAp = document.getElementById('wb-env-airport');
  const eOat = document.getElementById('wb-env-oat');
  const eWind = document.getElementById('wb-env-wind');
  const eSurf = document.getElementById('wb-env-surface');
  if (eAp) { eAp.value = wbState.env.airport; eAp.onchange = () => { wbState.env.airport = eAp.value; recalcAndRenderWb(); }; }
  if (eOat) { eOat.value = wbState.env.oatC; eOat.oninput = () => { wbState.env.oatC = Number(eOat.value) || 0; recalcAndRenderWb(); }; }
  if (eWind) { eWind.value = wbState.env.windKt; eWind.oninput = () => { wbState.env.windKt = Number(eWind.value) || 0; recalcAndRenderWb(); }; }
  if (eSurf) { eSurf.value = wbState.env.surface; eSurf.onchange = () => { wbState.env.surface = eSurf.value; recalcAndRenderWb(); }; }
}

export function getCurrentWbInputKg() {
  return {
    dow: wbState.dow,
    dowArm: wbState.dowArm,
    stdPaxWt: wbState.stdPaxWt,
    pax: wbState.input.pax,
    holds: wbState.input.holds,
    ulds: wbState.input.ulds,
    fuel: wbState.input.fuel,
    env: wbState.env
  };
}

export function recalcAndRenderWb() {
  const p = AIRCRAFT_PROFILES[wbState.aircraftId];
  const inpKg = getCurrentWbInputKg();
  const res = calculateWeightAndBalance(inpKg, p);
  const conseq = analyzeWbConsequences(inpKg, res, p, wbState.simError);
  wbState.lastResult = res;
  wbState.lastConseq = conseq;
  const u = appState.unit;

  document.getElementById('wb-doi-hint').textContent = `DOI: ${res.doi.toFixed(1)} | LEMAC ${p.lemac}m`;
  const badge = document.getElementById('wb-overall-status');
  badge.textContent = res.status === 'PASS' ? 'PASS · NOMINAL' : `FAIL · ${res.violations.length} ALERTS`;
  badge.className = `badge ${res.status === 'PASS' ? 'badge-ok' : 'badge-danger'}`;
  const pulseEl = document.getElementById('wb-efb-pulse');
  if (pulseEl) pulseEl.className = `efb-pulse ${res.status === 'PASS' ? '' : 'err'}`;

  const zfwOk = res.zfw <= p.mzfw && res.zfwMac >= res.zfwLimits.fwdMac && res.zfwMac <= res.zfwLimits.aftMac;
  const towOk = res.tow <= p.mtow && res.towMac >= res.towLimits.fwdMac && res.towMac <= res.towLimits.aftMac;
  const lwOk = res.lw <= p.mlw && res.lwMac >= res.lwLimits.fwdMac && res.lwMac <= res.lwLimits.aftMac;

  document.getElementById('wb-kpi-grid').innerHTML = [
    renderWbRadialGaugeSvg('ZFW / MZFW', res.zfw, p.mzfw, res.zfwMac, zfwOk, u),
    renderWbRadialGaugeSvg('TOW / MTOW', res.tow, p.mtow, res.towMac, towOk, u),
    renderWbRadialGaugeSvg('LW / MLW', res.lw, p.mlw, res.lwMac, lwOk, u)
  ].join('');

  const pf = res.performance;
  document.getElementById('wb-perf-strip').innerHTML = `
    <div class="efb-stat"><div class="efb-stat-lbl">V1 / VR / V2</div><div class="efb-stat-val">${pf.v1Kt}/${pf.vrKt}/${pf.v2Kt}</div><div class="efb-stat-sub">KT (${pf.surface})</div></div>
    <div class="efb-stat ${conseq.hasHiddenErr ? 'err' : ''}"><div class="efb-stat-lbl">STAB TRIM (THS)</div><div class="efb-stat-val">${pf.stabTrimLabel}</div><div class="efb-stat-sub">${conseq.hasHiddenErr ? `ACT ${conseq.actualRes.performance.stabTrimLabel}` : `MAC ${res.towMac.toFixed(1)}%`}</div></div>
    <div class="efb-stat ${res.underloadBeforeLmc < 0 ? 'err' : ''}"><div class="efb-stat-lbl">UNDERLOAD</div><div class="efb-stat-val">${fmtWeight(res.underloadBeforeLmc, u)} ${u}</div><div class="efb-stat-sub">PAY ${fmtWeight(res.payload, u)} ${u}</div></div>
    <div class="efb-stat ${pf.tailStrikeRisk === 'CRITICAL' || pf.tailTippingRisk === 'CRITICAL' ? 'err' : (pf.tailStrikeRisk === 'HIGH' ? 'warn' : '')}"><div class="efb-stat-lbl">TAIL RISK</div><div class="efb-stat-val">${pf.tailTippingRisk === 'CRITICAL' ? 'TIPPING!' : pf.tailStrikeRisk}</div><div class="efb-stat-sub">LIM ${pf.tailStrikePitchDeg}°</div></div>
  `;

  const rwyPct = Math.min(100, (pf.requiredRunwayM / pf.runwayLengthM) * 100);
  const rwyOver = pf.runwayMarginM < 0;
  const fillBg = rwyOver ? 'linear-gradient(90deg,#F43F5E,#BE123C)' : (rwyPct > 85 ? 'linear-gradient(90deg,#F59E0B,#EA580C)' : 'linear-gradient(90deg,#0284C7,#38BDF8)');
  document.getElementById('wb-runway-bar').innerHTML = `
    <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px;gap:6px;flex-wrap:wrap;">
      <span style="color:#7DD3FC;">${pf.airportCode} RWY (${pf.runwayLengthM.toLocaleString()}m) · ${pf.surface} · OAT ${pf.oatC}°C · WIND ${pf.windKt >= 0 ? '+' : ''}${pf.windKt}kt</span>
      <strong style="color:${rwyOver ? '#FDA4AF' : '#6EE7B7'};">${pf.requiredRunwayM.toLocaleString()}m (${pf.runwayMarginM >= 0 ? '+' : ''}${pf.runwayMarginM.toLocaleString()}m)</strong>
    </div>
    <div class="efb-runway-track"><div class="efb-runway-fill" style="width:${rwyPct.toFixed(1)}%;background:${fillBg};"></div></div>
    <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:#94A3B8;">
      <span>PERF-LIM MTOW: ${fmtWeight(pf.effectiveMtow, u)} ${u}</span>
      <span>${pf.envPenaltyM !== 0 ? `WX ${pf.envPenaltyM > 0 ? '+' : ''}${pf.envPenaltyM}m` : 'ISA DRY'}</span>
    </div>
  `;

  document.getElementById('wb-mac-live-tag').textContent = `TOW ${res.towMac.toFixed(1)}% MAC (${res.towLimits.fwdMac.toFixed(1)}–${res.towLimits.aftMac.toFixed(1)}%)`;
  document.getElementById('wb-svg-wrap').innerHTML = renderCgEnvelopeSvg(res, p, conseq, u);

  document.getElementById('wb-err-aft-val').textContent = `+${fmtWeight(wbState.simError.unreportedAftKg, u)} ${u}`;
  document.getElementById('wb-err-fwd-val').textContent = `+${fmtWeight(wbState.simError.unreportedFwdKg, u)} ${u}`;

  const presets = [
    { id: 'normal', ja: '✓ 標準', vi: '✓ Chuẩn', danger: false },
    { id: 'lmc_aft', ja: '⚠ 未報告LMC', vi: '⚠ Quên báo LMC', danger: true },
    { id: 'tail_tip', ja: '🔴 尻もち', vi: '🔴 Sập đuôi', danger: true },
    { id: 'nose_heavy', ja: '🔴 機首重', vi: '🔴 Nặng mũi', danger: true },
    { id: 'over_mtow', ja: '🔴 MTOW超過', vi: '🔴 Vượt MTOW', danger: true }
  ];
  const prEl = document.getElementById('wb-fault-presets');
  prEl.innerHTML = presets.map(pr => `<button class="efb-btn ${pr.danger ? 'danger' : ''} ${wbState.activeFaultPreset === pr.id ? 'active' : ''}" data-preset="${pr.id}">${t(pr.ja, pr.vi)}</button>`).join('');
  prEl.querySelectorAll('button').forEach(b => { b.onclick = () => applyWbFaultPreset(b.dataset.preset); });

  const cb = document.getElementById('wb-conseq-badge');
  cb.textContent = conseq.overallRisk;
  cb.className = `badge ${conseq.overallRisk === 'SAFE' ? 'badge-ok' : (conseq.overallRisk === 'SEVERE' ? 'badge-warn' : 'badge-danger')}`;
  document.getElementById('wb-conseq-svg-wrap').innerHTML = renderConsequenceAircraftSvg(p, conseq);

  document.getElementById('wb-conseq-list').innerHTML = conseq.consequences.length === 0
    ? `<div class="conseq-card ok"><strong class="ja">${t('✓ 異常・誤計算リスクなし', '✓ An toàn — Không có nguy cơ tính sai')}</strong></div>`
    : conseq.consequences.map(c => `
      <div class="conseq-card ${c.severity === 'SEVERE' ? 'warn' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <strong style="font-size:12px;font-family:var(--font-mono);">${c.id}</strong>
          <span class="badge ${c.severity === 'CRITICAL' ? 'badge-danger' : 'badge-warn'}">${c.severity}</span>
        </div>
        <div class="ja" style="font-size:12.5px;">${t(c.ja, c.vi)}</div>
        <div class="ja" style="font-size:11.5px;margin-top:5px;opacity:0.9;">🛡 ${t(c.sopJa, c.sopVi)}</div>
      </div>
    `).join('');

  document.getElementById('wb-alerts').innerHTML = res.violations.length === 0
    ? `<div class="alert alert-ok">${t('すべての重量・貨物室・CG制限を満たしています。', 'Tất cả giới hạn trọng lượng, hầm hàng & CG đều hợp lệ.')}</div>`
    : res.violations.map(v => `<div class="alert alert-danger"><strong>⚠ </strong>${t(v.ja, v.vi)}</div>`).join('');

  document.getElementById('wb-suggestions').innerHTML = res.suggestions.length > 0
    ? `<div class="alert alert-warn"><strong>${t('調整アドバイス:', 'Gợi ý điều chỉnh:')}</strong><ul style="margin:6px 0 0 18px;padding:0;">${res.suggestions.map(s => `<li>${t(s.ja, s.vi)}</li>`).join('')}</ul></div>`
    : '';

  const holdRows = Object.values(res.holdSummary).map(h => {
    const over = h.totalWeight > h.maxWeight;
    const uldStr = h.ulds.filter(x => x.weight > 0).map(x => `${x.id}:${fmtWeight(x.weight, u)}`).join(', ') || '—';
    return `<tr class="${over ? 'row-error' : ''}"><td>${h.id}</td><td class="num">${fmtWeight(h.bag, u)}</td><td class="num">${fmtWeight(h.cargo, u)}</td><td class="num">${fmtWeight(h.uldWeight, u)}</td><td class="num">${fmtWeight(h.totalWeight, u)} / ${fmtWeight(h.maxWeight, u)}</td><td style="font-family:var(--font-mono);font-size:11px;">${uldStr}</td></tr>`;
  }).join('');

  document.getElementById('wb-loadsheet-content').innerHTML = `
    <div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;">
      <span><strong>AC:</strong> ${p.name}</span>
      <span><strong>PAX:</strong> ${res.totalPaxCount}</span>
      <span><strong>THS:</strong> ${pf.stabTrimLabel} · <strong>V1/VR/V2:</strong> ${pf.v1Kt}/${pf.vrKt}/${pf.v2Kt}kt</span>
      <span><strong>STATUS:</strong> ${res.status}</span>
    </div>
    <div class="table-wrap"><table><thead><tr><th>Item</th><th class="num">Actual (${u})</th><th class="num">Limit (${u})</th><th class="num">Arm</th><th class="num">%MAC</th><th class="num">Allowed</th></tr></thead><tbody>
      <tr class="${!zfwOk ? 'row-error' : ''}"><td><strong>ZFW</strong></td><td class="num"><strong>${fmtWeight(res.zfw, u)}</strong></td><td class="num">${fmtWeight(p.mzfw, u)}</td><td class="num">${res.zfwCgArm.toFixed(2)}</td><td class="num"><strong>${res.zfwMac.toFixed(1)}%</strong></td><td class="num">${res.zfwLimits.fwdMac.toFixed(1)}–${res.zfwLimits.aftMac.toFixed(1)}%</td></tr>
      <tr class="${!towOk ? 'row-error' : ''}"><td><strong>TOW</strong></td><td class="num"><strong>${fmtWeight(res.tow, u)}</strong></td><td class="num">${fmtWeight(p.mtow, u)}</td><td class="num">${res.towCgArm.toFixed(2)}</td><td class="num"><strong>${res.towMac.toFixed(1)}%</strong></td><td class="num">${res.towLimits.fwdMac.toFixed(1)}–${res.towLimits.aftMac.toFixed(1)}%</td></tr>
      <tr class="${!lwOk ? 'row-error' : ''}"><td><strong>LW</strong></td><td class="num"><strong>${fmtWeight(res.lw, u)}</strong></td><td class="num">${fmtWeight(p.mlw, u)}</td><td class="num">${res.lwCgArm.toFixed(2)}</td><td class="num"><strong>${res.lwMac.toFixed(1)}%</strong></td><td class="num">${res.lwLimits.fwdMac.toFixed(1)}–${res.lwLimits.aftMac.toFixed(1)}%</td></tr>
    </tbody></table></div>
    <div class="section-label" style="margin-top:12px;">LIR — Load Instruction / Report</div>
    <div class="table-wrap"><table><thead><tr><th>Hold</th><th class="num">Bag</th><th class="num">Cargo</th><th class="num">ULD</th><th class="num">Total/Max</th><th>Positions</th></tr></thead><tbody>${holdRows}</tbody></table></div>
  `;

  ensureWbSplit3D();
}
