// Modules A (Turnaround + Live Real-Geo 3D Engine), B (Passenger), C (Cargo & DGR), E (Safety & SMS)
import {
  JP_AIRPORTS, TA_STEPS, TA_EVENTS,
  PAX_SCENARIOS,
  ULD_CATALOG, EXPORT_STEPS, IMPORT_STEPS, DGR_CASES, renderDgrSvg,
  SAFETY_CHECKLIST_GROUPS
} from '../data/airports.js';
import { AIRPORT_GEO_DATA } from '../data/airport_geo_data.js';
import { AIRCRAFT_3D_SPECS, AIRLINE_LIVERIES } from '../three3d/aircraft_3d_models.js';
import { renderUldBuildupUI, stopUldBuildup3D } from './uldBuildupModule.js';
import { appState, saveState, updateProgressBadges, t, bi } from '../core/state.js';

// ============================================================
// MODULE A: TURNAROUND SIMULATOR + REAL-GEO 3D AIRPORT ENGINE
// ============================================================
export const taState = {
  airport: 'NGO',
  spotId: 'S07',
  aircraftType: 'B789',
  liveryId: appState.livery || 'ANA',
  cameraPreset: 'spot', // 'overview' | 'tower' | 'spot'
  showBlastZone: true,
  done: [],
  elapsedMin: 0,
  safetyScore: 100,
  activeEvent: null,
  eventResolved: {},
  logs: []
};

let taScene3d = null;
let taOpenWbCb = null;

export function setTurnaroundNavCallback(cb) {
  taOpenWbCb = cb;
}

export function stopTurnaround3D() {
  if (taScene3d) taScene3d.stop();
}

async function ensureTurnaround3D() {
  const canvas = document.getElementById('ta-3d-canvas');
  if (!canvas) return;
  if (!taScene3d || taScene3d.canvas !== canvas) {
    if (taScene3d) taScene3d.dispose();
    try {
      const { TurnaroundScene3D } = await import('../three3d/TurnaroundScene3D.js');
      taScene3d = new TurnaroundScene3D(canvas, {
        airportCode: taState.airport,
        spotId: taState.spotId,
        aircraftType: taState.aircraftType,
        liveryId: taState.liveryId
      });
      taScene3d.setCameraPreset(taState.cameraPreset, true);
      taScene3d.syncTurnaroundSteps(taState.done);
      taScene3d.start();
    } catch (err) {
      const overlay = document.getElementById('ta-3d-status');
      if (overlay) overlay.textContent = `3D Standby: ${err.message}`;
    }
  } else {
    if (taScene3d.airportCode !== taState.airport) {
      taScene3d.loadAirport(taState.airport, taState.spotId);
    } else if (taScene3d.spotId !== taState.spotId) {
      taScene3d.setSpot(taState.spotId);
    }
    if (taScene3d.aircraftType !== taState.aircraftType || taScene3d.liveryId !== taState.liveryId) {
      taScene3d.setAircraftAndLivery(taState.aircraftType, taState.liveryId);
    }
    taScene3d.syncTurnaroundSteps(taState.done);
    taScene3d.start();
  }
}

function resetTurnaround(airportCode) {
  if (airportCode && AIRPORT_GEO_DATA[airportCode]) {
    taState.airport = airportCode;
    taState.spotId = AIRPORT_GEO_DATA[airportCode].spots[0].id;
  }
  taState.done = [];
  taState.elapsedMin = 0;
  taState.safetyScore = 100;
  taState.activeEvent = null;
  taState.eventResolved = {};
  taState.logs = [];
  if (taScene3d) {
    if (airportCode) taScene3d.loadAirport(taState.airport, taState.spotId);
    taScene3d.syncTurnaroundSteps([]);
    taScene3d.setCameraPreset(taState.cameraPreset, false);
  }
  renderTurnaroundControlsAndChecklist();
}

function renderTurnaroundShell(mount) {
  if (mount.querySelector('#ta-3d-canvas')) return;
  mount.innerHTML = `
    <div id="ta-top-bar"></div>
    <div class="card ta-3d-card" style="margin-bottom:14px;padding:12px;">
      <div id="ta-3d-controls"></div>
      <div class="ta-3d-stage">
        <canvas id="ta-3d-canvas"></canvas>
        <div class="ta-3d-hud-top">
          <span class="ta-hud-pill" id="ta-3d-status">✈ 3D GEO ENGINE LIVE</span>
          <span class="ta-hud-pill" id="ta-3d-hint">🖱 Drag: Orbit · Wheel: Zoom · Shift+Drag: Pan</span>
        </div>
        <div class="ta-cam-bar" id="ta-cam-bar"></div>
      </div>
      <div id="ta-attach-strip" class="ta-attach-strip"></div>
    </div>
    <div id="ta-body-mount"></div>
  `;
}

function renderTurnaroundControlsAndChecklist() {
  const mount = document.getElementById('turnaround-mount');
  if (!mount) return;
  renderTurnaroundShell(mount);

  const ap = JP_AIRPORTS[taState.airport] || JP_AIRPORTS.NGO;
  const geo = AIRPORT_GEO_DATA[taState.airport] || AIRPORT_GEO_DATA.NGO;
  const spec = AIRCRAFT_3D_SPECS[taState.aircraftType] || AIRCRAFT_3D_SPECS.B789;
  const liv = AIRLINE_LIVERIES[taState.liveryId] || AIRLINE_LIVERIES.ANA;
  const finished = taState.done.length === TA_STEPS.length;
  const delayMin = Math.max(0, taState.elapsedMin - ap.targetMin);

  // 1. Airport Selector + Timer Bar
  const topBar = document.getElementById('ta-top-bar');
  if (topBar) {
    topBar.innerHTML = `
      <div class="card" style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="font-size:12px;color:var(--text-muted);">${t('空港選択（5大拠点・実測WGS84 3D同期）', 'Chọn sân bay Nhật Bản (5 sân bay thực tế · Đồng bộ 3D WGS84)', 'Select Japanese Airport (5 Real WGS84 3D Airports)')}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
              ${Object.values(JP_AIRPORTS).map(a => `
                <button class="btn btn-sm ${taState.airport === a.code ? 'btn-primary' : ''}" data-ta-ap="${a.code}">${a.code} (${a.targetMin}m)</button>
              `).join('')}
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <span class="badge badge-accent">⏱ ${taState.elapsedMin} / ${ap.targetMin} min</span>
            <span class="badge ${taState.safetyScore >= 85 ? 'badge-ok' : 'badge-danger'}">🛡 Safety ${taState.safetyScore}pt</span>
            <button class="btn btn-sm ${taState.showBlastZone ? 'btn-danger-outline' : ''}" id="ta-toggle-blast">🔥 ${t('ブラスト危険域', 'Vùng nguy hiểm sau máy bay', 'Jet Blast Zone')}</button>
            <button class="btn btn-sm" id="ta-sync-wb">⚖ ${t('W&Bへ同期', 'Mở W&B tàu bay này', 'Sync to W&B')}</button>
            <button class="btn btn-sm" id="ta-reset">↺ ${t('リセット', 'Làm lại', 'Reset')}</button>
          </div>
        </div>
        <div class="alert alert-info" style="margin-top:10px;margin-bottom:0;font-size:12.5px;">
          <strong class="ja">${bi(geo.nameJa, geo.nameVi, geo.nameEn)}</strong> ·
          <span style="font-family:var(--font-mono);font-size:11.5px;">RWY ${geo.runways.map(r => `${r.label} (${r.lengthM}m)`).join(' · ')} · Elev ${geo.origin.alt}m</span><br/>
          <span class="ja">${t(ap.ruleJa, ap.ruleVi, geo.regionEn)}</span>
        </div>
      </div>
    `;
  }

  // 2. 3D Aircraft + Livery + Spot Toolbar
  const ctrlEl = document.getElementById('ta-3d-controls');
  if (ctrlEl) {
    ctrlEl.innerHTML = `
      <div class="ta-3d-toolbar">
        <div class="ta-tool-grp">
          <span class="ta-tool-lbl">${t('機種 (3D実寸)', 'Tàu bay (Tỷ lệ thật)', 'Aircraft (1:1m)')}</span>
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            ${Object.values(AIRCRAFT_3D_SPECS).map(ac => `
              <button class="btn btn-sm ${taState.aircraftType === ac.id ? 'btn-primary' : ''}" data-ta-ac="${ac.id}">${ac.shortName}</button>
            `).join('')}
          </div>
        </div>
        <div class="ta-tool-grp">
          <span class="ta-tool-lbl">${t('航空会社塗装', 'Màu sơn hãng (Livery)', 'Airline Livery')}</span>
          <div style="display:flex;gap:4px;flex-wrap:wrap;">
            ${Object.values(AIRLINE_LIVERIES).map(l => `
              <button class="btn btn-sm ${taState.liveryId === l.id ? 'btn-primary' : ''}" data-ta-liv="${l.id}" style="${taState.liveryId === l.id ? `background:${l.badgeColor};border-color:${l.badgeColor};color:#fff;` : ''}">${l.shortName}</button>
            `).join('')}
          </div>
        </div>
        <div class="ta-tool-grp">
          <span class="ta-tool-lbl">${t('駐機スポット', 'Vị trí đỗ (Spot)', 'Gate / Spot')}</span>
          <select id="ta-spot-sel" style="min-width:170px;height:30px;font-size:12px;">
            ${geo.spots.map(s => `<option value="${s.id}" ${s.id === taState.spotId ? 'selected' : ''}>${s.label}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  }

  // 3. Camera Presets Overlay inside 3D Viewport
  const camBar = document.getElementById('ta-cam-bar');
  if (camBar) {
    const presets = [
      { id: 'overview', icon: '🌐', ja: '空港全体 (Overview)', vi: 'Toàn cảnh sân bay (Overview)', en: 'Airport Overview' },
      { id: 'tower', icon: '🗼', ja: '管制塔視点 (ATC Tower)', vi: 'Tháp không lưu (ATC Tower)', en: 'ATC Tower View' },
      { id: 'spot', icon: '✈', ja: 'スポット近接 (Apron)', vi: 'Cận cảnh sân đỗ (Apron/Spot)', en: 'Apron / Spot View' }
    ];
    camBar.innerHTML = presets.map(p => `
      <button class="btn btn-sm ${taState.cameraPreset === p.id ? 'btn-primary' : ''}" data-ta-cam="${p.id}">
        ${p.icon} ${t(p.ja, p.vi, p.en)}
      </button>
    `).join('');
  }

  const statusEl = document.getElementById('ta-3d-status');
  if (statusEl) {
    statusEl.textContent = `✈ ${geo.code} (${geo.icao}) · ${taState.spotId} · ${spec.shortName} [${liv.shortName}] · ${spec.lengthM}m × ${spec.wingspanM}m`;
  }

  // 4. Exact GSE Attach Points Telemetry Strip (proves zero clipping & exact meter coordinates!)
  const attEl = document.getElementById('ta-attach-strip');
  if (attEl) {
    const apPts = spec.attachPoints;
    const loaderTag = spec.gseCargoType === 'highloader'
      ? t('ハイリフトローダー (LD3/ULD)', 'Xe nâng High-Loader (Container LD3)', 'High-Lift Loader (LD3)')
      : t('ベルトローダー (Bulk)', 'Xe băng chuyền Belt Loader', 'Belt Loader (Bulk)');
    attEl.innerHTML = `
      <span><strong>${t('GSE接続座標 (機首基準)', 'Tọa độ GSE Attach Points (từ mũi tàu bay)', 'GSE Attach Points (from Nose)')}:</strong></span>
      <span class="badge badge-neutral">L1: ${apPts.doorL1.metersFromNose}m (H:${apPts.doorL1.y}m)</span>
      <span class="badge badge-neutral">Cargo Fwd/Aft: ${apPts.cargoFwd.metersFromNose}m / ${apPts.cargoAft.metersFromNose}m</span>
      <span class="badge badge-neutral">Fuel: ${apPts.fuelPort.metersFromNose}m</span>
      <span class="badge badge-neutral">Nose Gear: ${apPts.noseGear.metersFromNose}m</span>
      <span class="badge badge-accent">${loaderTag}</span>
    `;
  }

  // 5. Turnaround Event + 12-Step Checklist + Log
  const body = document.getElementById('ta-body-mount');
  if (body) {
    body.innerHTML = `
      ${taState.activeEvent ? `
        <div class="card" style="margin-bottom:14px;border:2px solid var(--warn);">
          <div class="card-title"><span class="ja">⚡ ${bi(taState.activeEvent.titleJa, taState.activeEvent.titleVi)}</span><span class="badge badge-warn">ABNORMAL EVENT</span></div>
          <p class="ja" style="font-size:13px;margin-top:0;">${t(taState.activeEvent.descJa, taState.activeEvent.descVi)}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${taState.activeEvent.options.map((ch, idx) => `
              <button class="btn" data-ta-ev="${idx}" style="justify-content:flex-start;text-align:left;height:auto;padding:10px 12px;">
                <span class="ja">${bi(ch.ja, ch.vi)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${finished ? `
        <div class="alert ${taState.safetyScore >= 80 && delayMin <= 5 ? 'alert-ok' : 'alert-warn'}" style="margin-bottom:14px;">
          <strong>🏁 OFF-BLOCK COMPLETE!</strong>
          ${t(`総時間: ${taState.elapsedMin}分（遅延 ${delayMin}分） / 安全スコア: ${taState.safetyScore}点`,
              `Tổng thời gian: ${taState.elapsedMin} phút (Trễ ${delayMin} phút) / Điểm an toàn: ${taState.safetyScore}đ`,
              `Total time: ${taState.elapsedMin} min (Delay ${delayMin} min) / Safety Score: ${taState.safetyScore}pt`)}
        </div>
      ` : ''}

      <div class="workspace-grid">
        <div class="card">
          <div class="card-title">
            <span class="ja">${t('12ステップ ターンアラウンド手順（3D GSE自動出動）', '12 bước Turnaround (Xe GSE tự động di chuyển trên sân 3D)', '12-Step Turnaround (Auto-Dispatches 3D GSE on Service Road)')}</span>
            <span class="badge badge-neutral">${taState.done.length}/${TA_STEPS.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            ${TA_STEPS.map((st, idx) => {
              const isDone = taState.done.includes(st.id);
              const missingReqs = st.req.filter(r => !taState.done.includes(r));
              const ready = !isDone && missingReqs.length === 0;
              return `
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid ${isDone ? 'var(--ok)' : (ready ? 'var(--accent)' : 'var(--border)')};background:${isDone ? 'var(--ok-soft)' : 'var(--surface-2)'};">
                  <div>
                    <div class="ja" style="font-size:13px;font-weight:700;">${idx + 1}. ${t(st.ja, st.vi)} <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">(${st.duration}m)</span></div>
                    <div class="ja" style="font-size:11.5px;color:var(--text-secondary);">${t(st.detailJa, st.detailVi)}</div>
                  </div>
                  <button class="btn btn-sm ${isDone ? '' : (ready ? 'btn-primary' : '')}" data-ta-step="${st.id}" ${isDone || taState.activeEvent ? 'disabled' : ''}>
                    ${isDone ? '✓ DONE' : t('実行', 'Thực hiện', 'Execute')}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-title"><span class="ja">${t('運用ログ（安全違反・GSE出動・遅延履歴）', 'Nhật ký vận hành, GSE 3D & An toàn', 'Operations, 3D GSE & Safety Log')}</span></div>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:540px;overflow-y:auto;">
            ${taState.logs.length === 0
              ? `<div style="font-size:12.5px;color:var(--text-muted);">${t('ステップ1「駐機誘導」から開始すると、3D画面上でGSE車両がサービスロードを通って自動接近します。', 'Bắt đầu từ bước 1 (Marshalling) — các xe GSE trên sân đỗ 3D sẽ tự động chạy theo đường dịch vụ tới đúng vị trí quanh tàu bay.', 'Start from Step 1 (Marshalling) to watch GSE vehicles drive along the 3D service road to exact aircraft attach points.')}</div>`
              : taState.logs.map(l => `<div class="alert alert-${l.type}" style="margin:0;padding:7px 10px;font-size:12px;">${l.msg}</div>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Bind Listeners
  mount.querySelectorAll('[data-ta-ap]').forEach(b => { b.onclick = () => resetTurnaround(b.dataset.taAp); });
  mount.querySelectorAll('[data-ta-ac]').forEach(b => {
    b.onclick = () => {
      taState.aircraftType = b.dataset.taAc;
      if (taScene3d) taScene3d.setAircraftAndLivery(taState.aircraftType, taState.liveryId);
      renderTurnaroundControlsAndChecklist();
    };
  });
  mount.querySelectorAll('[data-ta-liv]').forEach(b => {
    b.onclick = () => {
      taState.liveryId = b.dataset.taLiv;
      appState.livery = taState.liveryId;
      saveState();
      if (taScene3d) taScene3d.setAircraftAndLivery(taState.aircraftType, taState.liveryId);
      renderTurnaroundControlsAndChecklist();
    };
  });
  mount.querySelectorAll('[data-ta-cam]').forEach(b => {
    b.onclick = () => {
      taState.cameraPreset = b.dataset.taCam;
      if (taScene3d) taScene3d.setCameraPreset(taState.cameraPreset, false);
      renderTurnaroundControlsAndChecklist();
    };
  });
  const spotSel = document.getElementById('ta-spot-sel');
  if (spotSel) {
    spotSel.onchange = () => {
      taState.spotId = spotSel.value;
      if (taScene3d) taScene3d.setSpot(taState.spotId);
      renderTurnaroundControlsAndChecklist();
    };
  }
  const blastBtn = document.getElementById('ta-toggle-blast');
  if (blastBtn) {
    blastBtn.onclick = () => {
      taState.showBlastZone = !taState.showBlastZone;
      if (taScene3d) taScene3d.setShowBlastZone(taState.showBlastZone);
      renderTurnaroundControlsAndChecklist();
    };
  }
  const syncWbBtn = document.getElementById('ta-sync-wb');
  if (syncWbBtn) {
    syncWbBtn.onclick = () => {
      if (taOpenWbCb) taOpenWbCb(spec.wbId || 'B789', taState.airport, taState.liveryId);
    };
  }
  const rBtn = document.getElementById('ta-reset');
  if (rBtn) rBtn.onclick = () => resetTurnaround();

  mount.querySelectorAll('[data-ta-ev]').forEach(b => {
    b.onclick = () => {
      const ev = taState.activeEvent;
      const ch = ev.options[Number(b.dataset.taEv)];
      taState.elapsedMin += ch.timeDelta || 0;
      taState.safetyScore = Math.max(0, Math.min(100, taState.safetyScore + (ch.safetyDelta || 0)));
      taState.logs.unshift({
        type: ch.ok ? 'ok' : 'danger',
        msg: `⚡ ${t(ev.reasonJa, ev.reasonVi)} (${ch.timeDelta ? '+' + ch.timeDelta + 'm' : '0m'}, Safety ${ch.safetyDelta >= 0 ? '+' : ''}${ch.safetyDelta})`
      });
      taState.eventResolved[ev.id] = true;
      taState.activeEvent = null;
      renderTurnaroundControlsAndChecklist();
    };
  });

  mount.querySelectorAll('[data-ta-step]').forEach(b => {
    b.onclick = () => {
      const st = TA_STEPS.find(s => s.id === b.dataset.taStep);
      if (!st) return;
      const missing = st.req.filter(r => !taState.done.includes(r));
      if (missing.length > 0) {
        taState.safetyScore = Math.max(0, taState.safetyScore - 15);
        taState.logs.unshift({
          type: 'danger',
          msg: `⚠ ${t('手順違反 (-15pt): 先に必要工程を完了してください → ', 'Vi phạm quy trình (-15đ): Phải hoàn thành bước trước → ')}${missing.join(', ')}`
        });
        renderTurnaroundControlsAndChecklist();
        return;
      }
      taState.done.push(st.id);
      taState.elapsedMin += st.duration;
      taState.logs.unshift({ type: 'ok', msg: `✓ ${t(st.ja, st.vi)} (+${st.duration}m)` });
      if (taScene3d) taScene3d.syncTurnaroundSteps(taState.done);

      if ((taState.done.length === 5 || taState.done.length === 9) && TA_EVENTS.length > 0) {
        const pending = TA_EVENTS.filter(ev => !taState.eventResolved[ev.id]);
        if (pending.length > 0) {
          taState.activeEvent = pending[Math.floor(Math.random() * pending.length)];
        }
      }

      if (taState.done.length === TA_STEPS.length) {
        const finalScore = Math.max(0, taState.safetyScore - Math.max(0, taState.elapsedMin - ap.targetMin) * 2);
        if (appState.taBestScore === null || finalScore > appState.taBestScore) {
          appState.taBestScore = finalScore;
          saveState();
          updateProgressBadges();
        }
      }
      renderTurnaroundControlsAndChecklist();
    };
  });
}

export function renderTurnaroundModule() {
  renderTurnaroundControlsAndChecklist();
  ensureTurnaround3D();
}

// ============================================================
// MODULE B: PASSENGER SERVICE (Check-in, Baggage, PRM)
// ============================================================
const paxState = { idx: 0, picked: {} };

export function renderPaxModule() {
  const mount = document.getElementById('pax-mount');
  if (!mount) return;
  const sc = PAX_SCENARIOS[paxState.idx] || PAX_SCENARIOS[0];
  const pick = paxState.picked[sc.id];

  mount.innerHTML = `
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
      ${PAX_SCENARIOS.map((s, i) => {
        const solved = appState.paxSolved.includes(s.id);
        return `<button class="btn btn-sm ${i === paxState.idx ? 'btn-primary' : ''}" data-pax-i="${i}">${solved ? '✓ ' : ''}${s.id}: ${t(s.titleJa, s.titleVi).slice(0, 22)}…</button>`;
      }).join('')}
    </div>
    <div class="card">
      <div class="card-title">
        <span class="ja">${bi(sc.titleJa, sc.titleVi)}</span>
        <span class="badge ${appState.paxSolved.includes(sc.id) ? 'badge-ok' : 'badge-accent'}">${appState.paxSolved.includes(sc.id) ? 'SOLVED' : sc.id}</span>
      </div>
      <div class="alert alert-info" style="font-size:13.5px;">${bi(sc.descJa, sc.descVi)}</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${sc.options.map((ch, ci) => {
          const isPicked = pick === ci;
          const border = pick !== undefined ? (ch.ok ? 'var(--ok)' : (isPicked ? 'var(--danger)' : 'var(--border)')) : 'var(--border)';
          const bg = pick !== undefined ? (ch.ok ? 'var(--ok-soft)' : (isPicked ? 'var(--danger-soft)' : 'var(--surface-2)')) : 'var(--surface-2)';
          return `
            <button data-pax-c="${ci}" style="text-align:left;padding:11px 14px;border-radius:8px;border:1.5px solid ${border};background:${bg};cursor:pointer;color:var(--text-primary);font-size:13.5px;">
              <strong style="margin-right:8px;">${['A', 'B', 'C', 'D'][ci]}.</strong>
              <span class="ja">${bi(ch.ja, ch.vi)}</span>
            </button>
          `;
        }).join('')}
      </div>
      ${pick !== undefined ? `
        <div class="alert ${sc.options[pick].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:12px;margin-bottom:0;">
          <strong>${sc.options[pick].ok ? t('✓ 適切な対応です！', '✓ XỬ LÝ CHUẨN XÁC!', '✓ CORRECT PROCEDURE!') : t('✗ 見直しが必要です', '✗ CẦN ĐIỀU CHỈNH LẠI', '✗ NEEDS CORRECTION')}</strong>
          <div class="ja" style="margin-top:4px;font-size:13px;">${t(sc.expJa, sc.expVi, sc.expVi)}</div>
        </div>
      ` : ''}
    </div>
  `;

  mount.querySelectorAll('[data-pax-i]').forEach(b => { b.onclick = () => { paxState.idx = Number(b.dataset.paxI); renderPaxModule(); }; });
  mount.querySelectorAll('[data-pax-c]').forEach(b => {
    b.onclick = () => {
      const ci = Number(b.dataset.paxC);
      paxState.picked[sc.id] = ci;
      if (sc.options[ci].ok && !appState.paxSolved.includes(sc.id)) {
        appState.paxSolved.push(sc.id);
        saveState();
        updateProgressBadges();
      }
      renderPaxModule();
    };
  });
}

// ============================================================
// MODULE C: CARGO, REALISTIC 3D ULD BUILDUP GAME & IATA DGR
// ============================================================
export const cargoState = { tab: 'buildup', dgrIdx: 0, dgrPicked: {} };

export function openCargoSubtab(tabId = 'buildup') {
  cargoState.tab = tabId;
  renderCargoModule();
}

export function stopCargo3D() {
  stopUldBuildup3D();
}

export function renderCargoModule() {
  const mount = document.getElementById('cargo-mount');
  if (!mount) return;

  if (cargoState.tab !== 'buildup') {
    stopUldBuildup3D();
  }

  let content = '';
  if (cargoState.tab === 'buildup') {
    content = `<div id="uld-buildup-host"></div>`;
  } else if (cargoState.tab === 'uld') {
    content = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:12px;">
        ${ULD_CATALOG.map(u => `
          <div class="card" style="padding:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <strong style="font-family:var(--font-mono);font-size:14.5px;color:var(--accent);">${u.code}</strong>
              <span class="badge badge-neutral">Tare: ${u.tare} kg</span>
            </div>
            <div style="font-size:12px;font-family:var(--font-mono);color:var(--text-primary);margin-top:5px;">
              📏 ${u.dimsCm || ''}
            </div>
            <div style="font-size:12.5px;color:var(--ok);font-weight:700;margin-top:4px;">
              Max Gross: ${u.maxGross.toLocaleString()} kg ${u.maxGrossMain ? `(Main Deck: ${u.maxGrossMain.toLocaleString()} kg)` : ''}
            </div>
            <div style="font-size:11.5px;color:var(--text-secondary);margin-top:3px;">✈ ${u.ac}</div>
            <div class="ja" style="font-size:12px;margin-top:6px;color:var(--text-secondary);">${bi(u.noteJa, u.noteVi, u.noteEn)}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (cargoState.tab === 'flow') {
    content = `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title"><span class="ja">🛫 ${t('輸出貨物フロー (Export AWB → NACCS → ULD Build-up → Ramp)', 'Quy trình Hàng Xuất khẩu (Export → NACCS → Đóng ULD → Sân đỗ)', 'Export Cargo Flow (Acceptance → NACCS → ULD Build-up → Ramp)')}</span></div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
            ${EXPORT_STEPS.map(s => `<div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border:1px solid var(--border);"><strong class="ja">${bi(s.ja, s.vi, s.en)}</strong><div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${t(s.descJa, s.descVi, s.descEn)}</div></div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🛬 ${t('輸入貨物フロー (Ramp → 保税蔵置場 → Breakdown → 通関 → 引渡し)', 'Quy trình Hàng Nhập khẩu (Dỡ tàu → Kho ngoại quan → Breakdown → Giao hàng)', 'Import Cargo Flow (Offload → Bonded Shed → Breakdown → Customs → Delivery)')}</span></div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
            ${IMPORT_STEPS.map(s => `<div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border:1px solid var(--border);"><strong class="ja">${bi(s.ja, s.vi, s.en)}</strong><div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${t(s.descJa, s.descVi, s.descEn)}</div></div>`).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    const c = DGR_CASES[cargoState.dgrIdx] || DGR_CASES[0];
    const pick = cargoState.dgrPicked[c.id];
    content = `
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
        ${DGR_CASES.map((dc, i) => `
          <button class="btn btn-sm ${i === cargoState.dgrIdx ? 'btn-primary' : ''}" data-dgr-i="${i}">
            ${appState.cargoSolved.includes(dc.id) ? '✓ ' : ''}${dc.id}
          </button>
        `).join('')}
      </div>
      <div class="card">
        <div class="card-title"><span class="ja">☢ ${bi(c.titleJa, c.titleVi, c.titleEn)}</span><span class="badge badge-danger">IATA DGR</span></div>
        <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
          <div style="flex-shrink:0;">${renderDgrSvg(c.labelType)}</div>
          <div style="flex:1;min-width:220px;" class="ja">${bi(c.descJa, c.descVi, c.descEn)}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${c.options.map((ch, ci) => {
            const isPicked = pick === ci;
            const border = pick !== undefined ? (ch.ok ? 'var(--ok)' : (isPicked ? 'var(--danger)' : 'var(--border)')) : 'var(--border)';
            const bg = pick !== undefined ? (ch.ok ? 'var(--ok-soft)' : (isPicked ? 'var(--danger-soft)' : 'var(--surface-2)')) : 'var(--surface-2)';
            return `
              <button data-dgr-c="${ci}" style="text-align:left;padding:10px 14px;border-radius:8px;border:1.5px solid ${border};background:${bg};cursor:pointer;color:var(--text-primary);font-size:13.5px;">
                <span class="ja">${bi(ch.ja, ch.vi, ch.en)}</span>
              </button>
            `;
          }).join('')}
        </div>
        ${pick !== undefined ? `
          <div class="alert ${c.options[pick].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:12px;margin-bottom:0;">
            <strong>${c.options[pick].ok ? t('✓ 正解です！', '✓ CHÍNH XÁC!', '✓ CORRECT!') : t('✗ 不正解（DGR規定違反）', '✗ CHƯA ĐÚNG (Sai quy định DGR)', '✗ INCORRECT (DGR Violation)')}</strong>
            <div class="ja" style="margin-top:4px;font-size:13px;">${t(c.expJa, c.expVi, c.expEn || c.expVi)}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  mount.innerHTML = `
    <div class="seg-tabs" style="margin-bottom:12px;">
      <button class="seg-tab ${cargoState.tab === 'buildup' ? 'active' : ''}" data-ctab="buildup">🏗 ${t('3D ULDビルドアップ実技ゲーム', 'Trò chơi Đóng hàng ULD 3D thực tế', '3D ULD Build-up Simulator')}</button>
      <button class="seg-tab ${cargoState.tab === 'uld' ? 'active' : ''}" data-ctab="uld">📦 ${t('ULD規格図鑑 (ANA/JEAE 11種)', 'Danh mục chuẩn ULD (PMC/PLA/PGA/AKE/AKH)', 'ULD Specs Guide (11 Types)')}</button>
      <button class="seg-tab ${cargoState.tab === 'dgr' ? 'active' : ''}" data-ctab="dgr">☢ ${t('IATA 危険物 (DGR / TI) 実践', 'Hàng nguy hiểm IATA DGR & TI (6 Case)', 'IATA DGR & TI Cases (6)')}</button>
      <button class="seg-tab ${cargoState.tab === 'flow' ? 'active' : ''}" data-ctab="flow">🔄 ${t('輸出入・NACCS業務フロー', 'Quy trình Xuất/Nhập khẩu & NACCS', 'Export/Import & NACCS Flow')}</button>
    </div>
    ${content}
  `;

  if (cargoState.tab === 'buildup') {
    renderUldBuildupUI();
  }

  mount.querySelectorAll('[data-ctab]').forEach(b => { b.onclick = () => { cargoState.tab = b.dataset.ctab; renderCargoModule(); }; });
  mount.querySelectorAll('[data-dgr-i]').forEach(b => { b.onclick = () => { cargoState.dgrIdx = Number(b.dataset.dgrI); renderCargoModule(); }; });
  mount.querySelectorAll('[data-dgr-c]').forEach(b => {
    b.onclick = () => {
      const c = DGR_CASES[cargoState.dgrIdx];
      const ci = Number(b.dataset.dgrC);
      cargoState.dgrPicked[c.id] = ci;
      if (c.options[ci].ok && !appState.cargoSolved.includes(c.id)) {
        appState.cargoSolved.push(c.id);
        saveState();
        updateProgressBadges();
      }
      renderCargoModule();
    };
  });
}

// ============================================================
// MODULE E: COMPLIANCE, FOD & SAFETY (JCAB / SMS)
// ============================================================
export function renderSafetyModule() {
  const mount = document.getElementById('safety-mount');
  if (!mount) return;
  const total = SAFETY_CHECKLIST_GROUPS.reduce((s, g) => s + g.items.length, 0);
  const done = Object.values(appState.safetyChecked || {}).filter(Boolean).length;

  mount.innerHTML = `
    <div class="card" style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div>
          <strong class="ja">${t('ランプ安全・FOD・航空法コンプライアンス チェックリスト (JCAB / SMS)', 'Checklist An toàn Sân đỗ, FOD & Luật Hàng không Nhật Bản (JCAB / SMS)')}</strong>
          <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">
            ${t('指差呼称（指さし確認）を行いながら各項目をチェックしてください。', 'Thực hiện chỉ tay hô xác nhận cho từng hạng mục an toàn.', 'Verify each safety item using point-and-call confirmation.')}
          </div>
        </div>
        <span class="badge ${done >= total ? 'badge-ok' : 'badge-accent'}">${done} / ${total} CHECKED</span>
      </div>
      <div class="progress-bar-wrap" style="margin-top:10px;"><div class="progress-bar-fill" style="width:${Math.round((done / Math.max(1, total)) * 100)}%"></div></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px;">
      ${SAFETY_CHECKLIST_GROUPS.map(g => `
        <div class="card">
          <div class="card-title"><span class="ja">${bi(g.groupJa, g.groupVi)}</span></div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${g.items.map(it => {
              const checked = !!appState.safetyChecked[it.id];
              return `
                <label style="display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border-radius:8px;border:1px solid ${checked ? 'var(--ok)' : 'var(--border)'};background:${checked ? 'var(--ok-soft)' : 'var(--surface-2)'};cursor:pointer;">
                  <input type="checkbox" data-saf="${it.id}" ${checked ? 'checked' : ''} style="margin-top:3px;accent-color:var(--ok);" />
                  <span class="ja" style="font-size:13px;">${bi(it.ja, it.vi)}</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  mount.querySelectorAll('[data-saf]').forEach(cb => {
    cb.onchange = () => {
      appState.safetyChecked[cb.dataset.saf] = cb.checked;
      saveState();
      updateProgressBadges();
      renderSafetyModule();
    };
  });
}
