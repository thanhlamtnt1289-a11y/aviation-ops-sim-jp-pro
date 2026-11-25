// Modules A (Turnaround), B (Passenger), C (Cargo & DGR), E (Safety & SMS)
import {
  JP_AIRPORTS, TA_STEPS, TA_EVENTS,
  PAX_SCENARIOS,
  ULD_CATALOG, EXPORT_STEPS, IMPORT_STEPS, DGR_CASES, renderDgrSvg,
  SAFETY_CHECKLIST_GROUPS
} from '../data/airports.js';
import { appState, saveState, updateProgressBadges, t, bi } from '../core/state.js';

// ============================================================
// MODULE A: TURNAROUND SIMULATOR (On-block → Off-block)
// ============================================================
const taState = {
  airport: 'NGO',
  done: [],
  elapsedMin: 0,
  safetyScore: 100,
  activeEvent: null,
  eventResolved: {},
  logs: []
};

function resetTurnaround(airportCode) {
  if (airportCode) taState.airport = airportCode;
  taState.done = [];
  taState.elapsedMin = 0;
  taState.safetyScore = 100;
  taState.activeEvent = null;
  taState.eventResolved = {};
  taState.logs = [];
  renderTurnaroundModule();
}

export function renderTurnaroundModule() {
  const mount = document.getElementById('turnaround-mount');
  if (!mount) return;
  const ap = JP_AIRPORTS[taState.airport] || JP_AIRPORTS.NGO;
  const finished = taState.done.length === TA_STEPS.length;
  const delayMin = Math.max(0, taState.elapsedMin - ap.targetMin);

  mount.innerHTML = `
    <div class="card" style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <div style="font-size:12px;color:var(--text-muted);">${t('空港選択（5大拠点）', 'Chọn sân bay Nhật Bản (5 sân bay lớn)')}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
            ${Object.values(JP_AIRPORTS).map(a => `
              <button class="btn btn-sm ${taState.airport === a.code ? 'btn-primary' : ''}" data-ta-ap="${a.code}">${a.code} (${a.targetMin}m)</button>
            `).join('')}
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <span class="badge badge-accent">⏱ ${taState.elapsedMin} / ${ap.targetMin} min</span>
          <span class="badge ${taState.safetyScore >= 85 ? 'badge-ok' : 'badge-danger'}">🛡 Safety ${taState.safetyScore}pt</span>
          <button class="btn btn-sm" id="ta-reset">↺ ${t('リセット', 'Làm lại')}</button>
        </div>
      </div>
      <div class="alert alert-info" style="margin-top:10px;margin-bottom:0;font-size:12.5px;">
        <strong class="ja">${bi(ap.nameJa, ap.nameVi)}</strong><br/>
        <span class="ja">${t(ap.ruleJa, ap.ruleVi)}</span>
      </div>
    </div>

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
            `Tổng thời gian: ${taState.elapsedMin} phút (Trễ ${delayMin} phút) / Điểm an toàn: ${taState.safetyScore}đ`)}
      </div>
    ` : ''}

    <div class="workspace-grid">
      <div class="card">
        <div class="card-title"><span class="ja">${t('12ステップ ターンアラウンド手順（依存関係順）', '12 bước Turnaround (Phải đúng trình tự an toàn)')}</span><span class="badge badge-neutral">${taState.done.length}/${TA_STEPS.length}</span></div>
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
                  ${isDone ? '✓ DONE' : t('実行', 'Thực hiện')}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-title"><span class="ja">${t('運用ログ（安全違反・遅延履歴）', 'Nhật ký vận hành & An toàn')}</span></div>
        <div style="display:flex;flex-direction:column;gap:6px;max-height:540px;overflow-y:auto;">
          ${taState.logs.length === 0
            ? `<div style="font-size:12.5px;color:var(--text-muted);">${t('ステップ1「駐機誘導」から開始してください。', 'Bắt đầu từ bước 1 (Marshalling) để ghi nhận nhật ký.')}</div>`
            : taState.logs.map(l => `<div class="alert alert-${l.type}" style="margin:0;padding:7px 10px;font-size:12px;">${l.msg}</div>`).join('')}
        </div>
      </div>
    </div>
  `;

  mount.querySelectorAll('[data-ta-ap]').forEach(b => { b.onclick = () => resetTurnaround(b.dataset.taAp); });
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
      renderTurnaroundModule();
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
        renderTurnaroundModule();
        return;
      }
      taState.done.push(st.id);
      taState.elapsedMin += st.duration;
      taState.logs.unshift({ type: 'ok', msg: `✓ ${t(st.ja, st.vi)} (+${st.duration}m)` });

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
      renderTurnaroundModule();
    };
  });
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
// MODULE C: CARGO, ULD & IATA DGR
// ============================================================
const cargoState = { tab: 'dgr', dgrIdx: 0, dgrPicked: {} };

export function renderCargoModule() {
  const mount = document.getElementById('cargo-mount');
  if (!mount) return;

  let content = '';
  if (cargoState.tab === 'uld') {
    content = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">
        ${ULD_CATALOG.map(u => `
          <div class="card" style="padding:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-family:var(--font-mono);font-size:15px;color:var(--accent);">${u.code}</strong>
              <span class="badge badge-neutral">Tare: ${u.tare} kg</span>
            </div>
            <div style="font-size:12.5px;color:var(--text-primary);font-weight:700;margin-top:6px;">Max Gross: ${u.maxGross} kg</div>
            <div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">✈ ${u.ac}</div>
            <div class="ja" style="font-size:12px;margin-top:6px;color:var(--text-secondary);">${bi(u.noteJa, u.noteVi)}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (cargoState.tab === 'flow') {
    content = `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title"><span class="ja">🛫 ${t('輸出貨物フロー (Export AWB → Ramp)', 'Quy trình Hàng Xuất khẩu (Export)')}</span></div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
            ${EXPORT_STEPS.map(s => `<div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border:1px solid var(--border);"><strong class="ja">${bi(s.ja, s.vi)}</strong><div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${t(s.descJa, s.descVi)}</div></div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🛬 ${t('輸入貨物フロー (Ramp → Customs → Delivery)', 'Quy trình Hàng Nhập khẩu (Import)')}</span></div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
            ${IMPORT_STEPS.map(s => `<div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border:1px solid var(--border);"><strong class="ja">${bi(s.ja, s.vi)}</strong><div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${t(s.descJa, s.descVi)}</div></div>`).join('')}
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
        <div class="card-title"><span class="ja">☢ ${bi(c.titleJa, c.titleVi)}</span><span class="badge badge-danger">IATA DGR</span></div>
        <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
          <div style="flex-shrink:0;">${renderDgrSvg(c.labelType)}</div>
          <div style="flex:1;min-width:220px;" class="ja">${bi(c.descJa, c.descVi)}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${c.options.map((ch, ci) => {
            const isPicked = pick === ci;
            const border = pick !== undefined ? (ch.ok ? 'var(--ok)' : (isPicked ? 'var(--danger)' : 'var(--border)')) : 'var(--border)';
            const bg = pick !== undefined ? (ch.ok ? 'var(--ok-soft)' : (isPicked ? 'var(--danger-soft)' : 'var(--surface-2)')) : 'var(--surface-2)';
            return `
              <button data-dgr-c="${ci}" style="text-align:left;padding:10px 14px;border-radius:8px;border:1.5px solid ${border};background:${bg};cursor:pointer;color:var(--text-primary);font-size:13.5px;">
                <span class="ja">${bi(ch.ja, ch.vi)}</span>
              </button>
            `;
          }).join('')}
        </div>
        ${pick !== undefined ? `
          <div class="alert ${c.options[pick].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:12px;margin-bottom:0;">
            <strong>${c.options[pick].ok ? t('✓ 正解です！', '✓ CHÍNH XÁC!', '✓ CORRECT!') : t('✗ 不正解（DGR規定違反）', '✗ CHƯA ĐÚNG (Sai quy định DGR)', '✗ INCORRECT (DGR Violation)')}</strong>
            <div class="ja" style="margin-top:4px;font-size:13px;">${t(c.expJa, c.expVi, c.expVi)}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  mount.innerHTML = `
    <div class="seg-tabs" style="margin-bottom:12px;">
      <button class="seg-tab ${cargoState.tab === 'dgr' ? 'active' : ''}" data-ctab="dgr">☢ ${t('IATA 危険物 (DGR) 実践ケース', 'Hàng nguy hiểm IATA DGR (5 Case)')}</button>
      <button class="seg-tab ${cargoState.tab === 'uld' ? 'active' : ''}" data-ctab="uld">📦 ${t('ULDコンテナ・パレット図鑑', 'Danh mục Container & Pallet ULD')}</button>
      <button class="seg-tab ${cargoState.tab === 'flow' ? 'active' : ''}" data-ctab="flow">🔄 ${t('輸出入・AWB業務フロー', 'Quy trình Xuất/Nhập khẩu & AWB')}</button>
    </div>
    ${content}
  `;

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
