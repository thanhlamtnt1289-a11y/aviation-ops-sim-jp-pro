// Real-Geo 5-Airport Three.js 3D Engine + Authentic Textbook ERA/ESA/PBB Markings
// + Realistic GSE Staging, 5m Brake-Check, Mechanical Lifts/Hoses/ULDs + Articulated 3D Ground Crew
import * as THREE from 'three';
import { convertAirportToCartesian } from '../data/airport_geo_data.js';
import { AIRCRAFT_PROFILES } from '../data/aircraft.js';
import { createDetailedAirliner3D } from './aircraftBuilder3D.js';
import {
  AIRCRAFT_3D_SPECS,
  AIRLINE_LIVERIES,
  createProceduralAirliner3D,
  createJetBlastHazardZone3D,
  animateJetBlastZone3D,
  animateAircraft3D,
  resolveAircraft3DType
} from './aircraft_3d_models.js';
import {
  createOpenCabTowingTractor3D,
  createBaggageCart3D,
  createArticulatedCrew3D,
  animateCrewSignal
} from './crewBuilder3D.js';

// =====================================================================
// PROCEDURAL PBR TEXTURES (RUNWAY, CONCRETE, GLASS, SPOT SIGN)
// =====================================================================
function makeGeoRunwayTexture(rwyPair = '36/18', isSnow = false) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 2048;
  const ctx = c.getContext('2d');
  const [rA = '36', rB = '18'] = String(rwyPair).split('/');

  ctx.fillStyle = isSnow ? '#374151' : '#252B34';
  ctx.fillRect(0, 0, 512, 2048);

  for (let i = 0; i < 6000; i++) {
    const g = (isSnow ? 48 : 30) + ((i * 23) % 24);
    ctx.fillStyle = `rgb(${g},${g + 3},${g + 7})`;
    ctx.fillRect((i * 53) % 512, (i * 97) % 2048, 2, 3);
  }
  if (isSnow) {
    ctx.fillStyle = 'rgba(235,244,255,0.52)';
    ctx.fillRect(0, 0, 26, 2048);
    ctx.fillRect(486, 0, 26, 2048);
  }

  const drawSkid = (y0, y1) => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, 'rgba(8,10,14,0)');
    g.addColorStop(0.35, 'rgba(8,10,14,0.72)');
    g.addColorStop(0.75, 'rgba(8,10,14,0.4)');
    g.addColorStop(1, 'rgba(8,10,14,0)');
    ctx.fillStyle = g;
    ctx.fillRect(110, y0, 292, y1 - y0);
  };
  drawSkid(260, 680);
  drawSkid(1368, 1788);

  ctx.fillStyle = '#E8EEF5';
  ctx.fillRect(22, 0, 12, 2048);
  ctx.fillRect(478, 0, 12, 2048);

  for (let x = 58; x <= 434; x += 38) {
    ctx.fillRect(x, 28, 20, 96);
    ctx.fillRect(x, 1924, 20, 96);
  }

  const drawNum = (yPos, rot, txt) => {
    ctx.save();
    ctx.fillStyle = '#F8FAFC';
    ctx.font = txt.length > 2 ? '900 96px "Arial Black", sans-serif' : '900 112px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(256, yPos);
    ctx.rotate(rot);
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  };
  drawNum(205, Math.PI, rA);
  drawNum(1843, 0, rB);

  ctx.fillStyle = '#E5ECF4';
  ctx.fillRect(96, 360, 56, 130);
  ctx.fillRect(360, 360, 56, 130);
  ctx.fillRect(96, 1558, 56, 130);
  ctx.fillRect(360, 1558, 56, 130);

  for (let y = 300; y < 1740; y += 92) {
    ctx.fillRect(248, y, 16, 48);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeApronConcreteTex() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#B8C3D0';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4000; i++) {
    const v = 168 + ((i * 19) % 24);
    ctx.fillStyle = `rgb(${v},${v + 4},${v + 9})`;
    ctx.fillRect((i * 59) % 512, (i * 83) % 512, 3, 3);
  }
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.28)';
  ctx.lineWidth = 2;
  for (let p = 0; p <= 512; p += 64) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(512, p); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(20, 20);
  return tex;
}

function makeTerminalGlassTex() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#336599');
  g.addColorStop(0.5, '#649ACA');
  g.addColorStop(1, '#264C73');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'rgba(255, 240, 190, 0.28)';
  ctx.fillRect(0, 44, 512, 22);
  ctx.fillRect(0, 154, 512, 22);
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 4;
  for (let x = 0; x <= 512; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke(); }
  for (let y = 0; y <= 256; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke(); }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
  return tex;
}

function makeSpotNumberTexture(spotLabel) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 256, 160);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 240, 144);
  ctx.fillStyle = '#FACC15';
  ctx.font = '900 76px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(spotLabel).replace(/^S/, ''), 128, 84);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// =====================================================================
// AUTHENTIC TEXTBOOK ERA + ESA + PBB + UTILITY PIT MARKINGS BUILDER
// Source: JEAE GHtext_1 p.20–21, sws_ii_GH p.131–133 (別添2・別添3), NGO 01-1 p.30, 02-2 p.3 & p.8
//   - ERA (機材制限区域): Single solid Bright Red line (明るい赤) hugging swept wings & nose chevron, OPEN at rear!
//   - ESA (機材待機区域): White dashed rectangular GSE staging bays OUTSIDE the red ERA!
//   - PBB稼働区域: Red cross-hatched zone on Port (+X) + White [ ] PBB待機位置 standby box!
// =====================================================================
export function computeWingHuggingEraPolyline(halfL = 31.4, halfSpan = 30.0, fuseR = 2.88) {
  const bodyW = fuseR + 6.8;         // ≥7.5m clearance along fuselage waist
  const noseShoulderW = fuseR + 5.0; // Tapered shoulder beside radome
  const wingW = halfSpan + 3.8;      // ≥3.75m clearance outside wingtips
  const noseApexZ = halfL + 7.5;     // Pointed nose chevron apex (︿) per NGO #77 & JEAE diagram!
  const noseShoulderZ = halfL + 2.2;
  const wingRootLeadZ = halfL * 0.36;
  const wingTipLeadZ = -halfSpan * 0.12 + 2.4;
  const wingTipTrailZ = -halfSpan * 0.32 - 4.8;
  const wingRootTrailZ = -halfL * 0.24 - 2.2;
  const tailEndZ = -(halfL + 4.5);   // Open rear toward taxilane / ABL!

  return [
    [ bodyW,          tailEndZ],       // 0: Port (+X) rear tail end (OPEN BACK)
    [ bodyW,          wingRootTrailZ], // 1: Port aft fuselage waist
    [ wingW,          wingTipTrailZ],  // 2: Port wingtip trailing corner
    [ wingW,          wingTipLeadZ],   // 3: Port wingtip leading corner
    [ bodyW,          wingRootLeadZ],  // 4: Port forward fuselage shoulder (swept leading edge!)
    [ noseShoulderW,  noseShoulderZ],  // 5: Port nose shoulder
    [ 0,              noseApexZ],      // 6: Nose Diamond Chevron Apex (︿)
    [-noseShoulderW,  noseShoulderZ],  // 7: Starboard (-X) nose shoulder
    [-bodyW,          wingRootLeadZ],  // 8: Starboard forward fuselage shoulder
    [-wingW,          wingTipLeadZ],   // 9: Starboard wingtip leading corner
    [-wingW,          wingTipTrailZ],  // 10: Starboard wingtip trailing corner
    [-bodyW,          wingRootTrailZ], // 11: Starboard aft fuselage waist
    [-bodyW,          tailEndZ]        // 12: Starboard rear tail end (OPEN BACK)
  ];
}

function populateTextbookSpotMarkings(group, opts = {}) {
  const halfL = opts.halfL || 32.0;
  const halfSpan = opts.halfSpan || 30.5;
  const fuseR = opts.fuseR || 2.9;
  const hasPbb = opts.hasPbb !== false;
  const spotLabel = opts.spotLabel || '07';

  const redEraMat = new THREE.MeshBasicMaterial({
    color: 0xef233c,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -6,
    polygonOffsetUnits: -6
  });
  const eraTintMat = new THREE.MeshBasicMaterial({
    color: 0xef233c,
    transparent: true,
    opacity: 0.055,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -5,
    polygonOffsetUnits: -5
  });
  const whiteLineMat = new THREE.MeshBasicMaterial({
    color: 0xf8fafc,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -6,
    polygonOffsetUnits: -6
  });
  const yellowLineMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -6,
    polygonOffsetUnits: -6
  });

  const addSeg = (ax, az, bx, bz, thick, mat, yOff = 0.01) => {
    const len = Math.hypot(bx - ax, bz - az);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(thick, len + thick * 0.35), mat);
    m.rotation.x = -Math.PI / 2;
    const w = new THREE.Group();
    w.position.set((ax + bx) * 0.5, yOff, (az + bz) * 0.5);
    w.rotation.y = Math.atan2(bx - ax, bz - az);
    m.renderOrder = 6;
    w.add(m);
    group.add(w);
  };

  const addDashedRect = (x1, z1, x2, z2, mat, dash = 2.0, gap = 1.4, thick = 0.28) => {
    const drawDashed = (ax, az, bx, bz) => {
      const total = Math.hypot(bx - ax, bz - az);
      const dx = (bx - ax) / total, dz = (bz - az) / total;
      for (let d = 0; d < total; d += dash + gap) {
        const dEnd = Math.min(total, d + dash);
        addSeg(ax + dx * d, az + dz * d, ax + dx * dEnd, az + dz * dEnd, thick, mat, 0.012);
      }
    };
    drawDashed(x1, z1, x2, z1);
    drawDashed(x2, z1, x2, z2);
    drawDashed(x2, z2, x1, z2);
    drawDashed(x1, z2, x1, z1);
  };

  // 1. Yellow Lead-In Line (導入線) + Multi-Aircraft Nose Stop Bars (B777 / B787 / A321·B737) + Pushback Limit Bar
  const leadStartZ = -(halfL + 10);
  const leadEndZ = halfL + 4.0;
  addSeg(0, leadStartZ, 0, leadEndZ, 0.48, yellowLineMat, 0.01);
  [halfL - 6.8, halfL - 5.2, halfL - 3.6].forEach((sz, idx) => {
    addSeg(-3.2, sz, 3.2, sz, idx === 0 ? 0.45 : 0.32, yellowLineMat, 0.012);
  });
  // White Towbarless Pushback Limit T-bar on lead-in line (別添3 No.7)
  addSeg(-1.8, -halfL * 0.35, 1.8, -halfL * 0.35, 0.28, whiteLineMat, 0.012);

  // Red Apron Boundary Line (ABL / スポット誘導経路境界線) along rear taxilane edge
  addSeg(-(halfSpan + 10), -(halfL + 6.5), (halfSpan + 10), -(halfL + 6.5), 0.55, redEraMat, 0.01);

  // 2. Authentic Wing-Hugging Open-Back Bright Red ERA Polyline (12 segments, OPEN at rear!)
  const eraPts = computeWingHuggingEraPolyline(halfL, halfSpan, fuseR);
  const fillShape = new THREE.Shape();
  fillShape.moveTo(eraPts[0][0], -eraPts[0][1]);
  for (let i = 1; i < eraPts.length; i++) fillShape.lineTo(eraPts[i][0], -eraPts[i][1]);
  fillShape.closePath();
  const fillMesh = new THREE.Mesh(new THREE.ShapeGeometry(fillShape), eraTintMat);
  fillMesh.rotation.x = -Math.PI / 2;
  fillMesh.position.y = 0.004;
  fillMesh.renderOrder = 5;
  group.add(fillMesh);

  for (let i = 0; i < eraPts.length - 1; i++) {
    const a = eraPts[i], b = eraPts[i + 1];
    addSeg(a[0], a[1], b[0], b[1], 0.46, redEraMat, 0.014);
  }
  // Small outward terminal flare ticks at open rear ends (per textbook diagram!)
  addSeg(eraPts[0][0], eraPts[0][1], eraPts[0][0] + 2.4, eraPts[0][1], 0.46, redEraMat, 0.014);
  addSeg(eraPts[12][0], eraPts[12][1], eraPts[12][0] - 2.4, eraPts[12][1], 0.46, redEraMat, 0.014);

  // 3. White-Dashed ESA (機材待機区域 — Equipment Staging Areas) OUTSIDE the Red ERA Line!
  const bodyW = fuseR + 6.8;
  const wingW = halfSpan + 3.8;
  // Starboard-Forward ESA (GPU, Catering, Fwd Cargo Loader + Dollies)
  addDashedRect(-(wingW - 1.0), halfL * 0.44, -(bodyW + 2.5), halfL + 7.5, whiteLineMat);
  // Starboard-Aft ESA (Aft Cargo Loader, Bulk Belt, Hydrant Servicer, Lavatory)
  addDashedRect(-(wingW - 1.0), -(halfL + 3.5), -(bodyW + 2.5), -halfSpan * 0.34 - 6.2, whiteLineMat);
  // Port-Forward ESA (Pushback Tug / Stairs) & Port-Aft ESA (Cabin Cleaning / Potable Water)
  addDashedRect(bodyW + 2.5, halfL + 1.5, bodyW + 14.5, halfL + 9.5, whiteLineMat);
  addDashedRect(bodyW + 2.5, -(halfL + 3.5), wingW - 2.0, -halfSpan * 0.34 - 6.2, whiteLineMat);

  // 4. Port (+X) PBB Red Cross-Hatched Movement Zone (PBB稼働区域) + White [ ] Standby Box (PBB待機位置)
  if (hasPbb) {
    const pbbZ = halfL - 7.5;
    const xIn = fuseR + 2.2;
    const xOut = bodyW + 13.5;
    addSeg(xIn, pbbZ - 4.5, xOut, pbbZ - 4.5, 0.30, redEraMat, 0.013);
    addSeg(xIn, pbbZ + 4.5, xOut, pbbZ + 4.5, 0.30, redEraMat, 0.013);
    addSeg(xIn, pbbZ - 4.5, xIn, pbbZ + 4.5, 0.30, redEraMat, 0.013);
    addSeg(xOut, pbbZ - 4.5, xOut, pbbZ + 4.5, 0.30, redEraMat, 0.013);
    for (let hx = xIn + 2.2; hx < xOut - 1.5; hx += 3.2) {
      addSeg(hx - 1.6, pbbZ - 4.3, hx + 1.6, pbbZ + 4.3, 0.24, redEraMat, 0.012);
    }
    // White [ ] PBB Standby Wheel Box outside ERA (別添3 No.6)
    const sbX = xOut - 2.2;
    addDashedRect(sbX - 2.2, pbbZ - 2.4, sbX + 2.2, pbbZ + 2.4, whiteLineMat, 1.4, 0.6, 0.32);
  }

  // 5. Spot Number Placard ahead of Nose Apex
  const numPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(8.6, 5.4),
    new THREE.MeshBasicMaterial({ map: makeSpotNumberTexture(spotLabel), depthWrite: false, polygonOffset: true, polygonOffsetFactor: -7 })
  );
  numPlane.rotation.x = -Math.PI / 2;
  numPlane.position.set(0, 0.03, halfL + 11.8);
  numPlane.renderOrder = 7;
  group.add(numPlane);
}

// =====================================================================
// REALISTIC ARTICULATED 3D GSE VEHICLE BUILDERS (WITH ANIMATED LIFTS, OUTRIGGERS, HOSES, BELTS & ULDS!)
// =====================================================================
export function buildTurnaroundGseMesh(kind, targetHeightY = 2.8, extra = {}) {
  const g = new THREE.Group();
  g.userData = { kind, targetHeightY };

  const addBox = (w, h, d, col, x, y, z, metal = 0.25, rough = 0.42, parent = g) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color: col, metalness: metal, roughness: rough })
    );
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x16191f, roughness: 0.9 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.6, roughness: 0.3 });
  const addWheels = (wx, wzArr, r = 0.42) => {
    const wheels = [];
    for (const wz of wzArr) {
      [-wx, wx].forEach(x => {
        const wg = new THREE.Group();
        wg.position.set(x, r, wz);
        const w = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.26, 12), wheelMat);
        w.rotation.z = Math.PI / 2;
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.48, r * 0.48, 0.28, 10), rimMat);
        hub.rotation.z = Math.PI / 2;
        wg.add(w, hub);
        g.add(wg);
        wheels.push(wg);
      });
    }
    g.userData.wheels = wheels;
  };

  // Helper: 4 Deployable Yellow Hydraulic Outriggers (アウトリガー)
  const addOutriggers = (xSpan, zFront, zBack) => {
    const riggers = [];
    [[xSpan, zFront], [-xSpan, zFront], [xSpan, zBack], [-xSpan, zBack]].forEach(([rx, rz]) => {
      const rg = new THREE.Group();
      rg.position.set(rx, 0.45, rz);
      addBox(0.32, 0.14, 0.16, 0xfacc15, Math.sign(rx) * 0.14, 0, 0, 0.3, 0.4, rg);
      const foot = addBox(0.14, 0.44, 0.14, 0xf59e0b, Math.sign(rx) * 0.26, -0.22, 0, 0.3, 0.4, rg);
      addBox(0.28, 0.05, 0.28, 0x1e293b, Math.sign(rx) * 0.26, -0.43, 0, 0.4, 0.6, rg);
      rg.scale.x = 0.01;
      rg.visible = false;
      g.add(rg);
      riggers.push({ group: rg, foot });
    });
    g.userData.outriggers = riggers;
  };

  if (kind === 'stairs') {
    // Motorized Passenger Boarding Stairs (パッセンジャー・ステップ車)
    const topY = Math.max(2.6, Math.min(5.3, targetHeightY));
    addBox(2.25, 0.78, 6.2, 0xf8fafc, 0, 0.78, -0.3);
    addBox(2.15, 1.38, 1.9, 0x0284c7, 0, 1.75, -2.35);
    const rampLen = Math.hypot(4.1, topY - 1.05);
    const rampAng = Math.atan2(topY - 1.05, 4.1);
    const ramp = addBox(1.78, 0.32, rampLen, 0xe2e8f0, 0, (topY + 1.05) * 0.5, 0.45);
    ramp.rotation.x = -rampAng;
    // Handrails along stair ramp
    [-0.92, 0.92].forEach(rx => {
      const rail = addBox(0.08, 0.85, rampLen, 0xfacc15, rx, (topY + 1.05) * 0.5 + 0.52, 0.45);
      rail.rotation.x = -rampAng;
    });
    // Top docking canopy flush with doorL1
    addBox(2.08, 0.24, 1.55, 0xfacc15, 0, topY - 0.12, 2.65);
    addBox(0.10, 1.05, 1.5, 0x0284c7, -0.98, topY + 0.42, 2.65);
    addBox(0.10, 1.05, 1.5, 0x0284c7, 0.98, topY + 0.42, 2.65);
    addBox(2.12, 0.12, 0.22, 0x1e293b, 0, topY + 0.05, 3.42); // Soft rubber bumper!
    addWheels(1.08, [-2.2, 1.65], 0.42);
    addOutriggers(1.08, 1.95, -2.0);
  } else if (kind === 'catering' || kind === 'cabinClean') {
    // Authentic Catering Food Loader (フード・ローダー: Floor set -19cm below aircraft sill + 4 Yellow Outriggers!)
    // & Cabin Cleaning Lift Truck (キャビン・サービス・カー)
    const isCat = kind === 'catering';
    const accent = isCat ? 0x0ea5e9 : 0x10b981;
    const dockFloorY = Math.max(2.3, targetHeightY - 0.19); // Textbook 図5-4: -19cm below cabin sill!
    // Truck cab & low chassis (+Z faces aircraft door!)
    addBox(2.42, 0.65, 7.6, 0x334155, 0, 0.68, -0.2);
    addBox(2.34, 1.75, 1.95, 0xf8fafc, 0, 1.62, 2.62); // Low-profile forward cab under bridge!
    addBox(2.38, 0.55, 1.85, 0x38bdf8, 0, 2.02, 2.68, 0.75, 0.12); // Cab windshield
    addBox(2.36, 0.26, 1.98, accent, 0, 1.08, 2.62);

    // X-Scissor Lift Arms supporting the Refrigerated Van Body
    const scissorPivot = new THREE.Group();
    scissorPivot.position.set(0, 0.98, -1.05);
    addBox(1.55, 1.0, 3.2, 0x475569, 0, 0.5, 0, 0.6, 0.4, scissorPivot);
    g.add(scissorPivot);

    // Elevating Refrigerated Van Box + Front Telescoping Half-Canopy Platform
    const vanGroup = new THREE.Group();
    vanGroup.position.set(0, 1.35, 0);
    addBox(2.46, 2.25, 5.15, 0xf8fafc, 0, 1.15, -1.15, 0.18, 0.35, vanGroup);
    addBox(2.50, 0.34, 5.18, accent, 0, 0.42, -1.15, 0.2, 0.4, vanGroup);
    // Refrigeration unit on front of van box
    addBox(1.45, 0.58, 0.45, 0xe2e8f0, 0, 2.02, 1.58, 0.3, 0.4, vanGroup);
    // Front loading platform & rubber bumper over cab roof (+Z)
    addBox(2.15, 0.18, 2.25, 0xcbd5e1, 0, 0.08, 2.48, 0.5, 0.38, vanGroup);
    addBox(0.08, 0.95, 2.15, 0xfacc15, -1.02, 0.58, 2.45, 0.3, 0.4, vanGroup);
    addBox(0.08, 0.95, 2.15, 0xfacc15, 1.02, 0.58, 2.45, 0.3, 0.4, vanGroup);
    addBox(2.18, 0.16, 0.22, 0x111827, 0, 0.14, 3.62, 0.1, 0.9, vanGroup);
    g.add(vanGroup);

    addWheels(1.16, [-2.4, 2.25], 0.46);
    addOutriggers(1.20, 1.55, -2.85);
    g.userData.vanGroup = vanGroup;
    g.userData.scissorPivot = scissorPivot;
    g.userData.restY = 1.35;
    g.userData.dockFloorY = dockFloorY;
  } else if (kind === 'highloader') {
    // Authentic Dual-Platform High-Lift / Low-Deck ULD Loader (ハイリフト・ローダー)
    // Front Bridge Platform stays flush at cargo sill; Main Rear Platform cycles up & down transferring ULDs!
    const sillY = Math.max(1.95, Math.min(3.5, targetHeightY));
    const uldCode = extra.uldCode || 'AKE';
    const isAkh = uldCode === 'AKH';
    addBox(3.15, 0.48, 8.4, 0xe2e8f0, 0, 0.44, 0, 0.35, 0.38);
    // Side operator console on right-front (+X/-X)
    addBox(0.55, 1.35, 1.35, 0x0284c7, -1.45, 1.35, 2.15, 0.3, 0.4);

    // Front Bridge Platform (raises to cargo sill & stays locked level with aircraft cargo floor!)
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(0, 0.85, 2.65);
    addBox(2.65, 0.22, 2.75, 0xd4dce6, 0, 0, 0, 0.5, 0.35, bridgeGroup);
    addBox(0.10, 0.72, 2.6, 0xf59e0b, -1.28, 0.42, 0, 0.3, 0.4, bridgeGroup);
    addBox(0.10, 0.72, 2.6, 0xf59e0b, 1.28, 0.42, 0, 0.3, 0.4, bridgeGroup);
    addBox(2.68, 0.16, 0.20, 0x111827, 0, 0.08, 1.42, 0.1, 0.9, bridgeGroup);
    g.add(bridgeGroup);

    // Main Rear Scissor Lift Platform (oscillates between dolly height 0.56m and sillY!)
    const mainPlat = new THREE.Group();
    mainPlat.position.set(0, 0.68, -1.65);
    addBox(3.05, 0.22, 4.65, 0xc8d2de, 0, 0, 0, 0.5, 0.35, mainPlat);
    addBox(0.10, 0.65, 4.5, 0xf59e0b, -1.48, 0.38, 0, 0.3, 0.4, mainPlat);
    addBox(0.10, 0.65, 4.5, 0xf59e0b, 1.48, 0.38, 0, 0.3, 0.4, mainPlat);

    // Realistic Beveled Aluminium AKE / AKH ULD Container riding on rollers!
    const uldH = isAkh ? 1.14 : 1.60;
    const uldW = isAkh ? 2.25 : 1.92;
    const uldGrp = new THREE.Group();
    uldGrp.position.set(0, 0.12 + uldH * 0.5, 0);
    addBox(uldW, uldH, 1.56, 0xdbe4ef, 0, 0, 0, 0.58, 0.26, uldGrp);
    addBox(uldW + 0.03, 0.22, 1.58, 0x0b3b8c, 0, uldH * 0.30, 0, 0.2, 0.4, uldGrp);
    mainPlat.add(uldGrp);
    g.add(mainPlat);

    // Scissor cylinder column under main platform
    const scissorMesh = addBox(1.4, 1.0, 2.8, 0x334155, 0, 0.55, -1.65, 0.5, 0.5);
    addWheels(1.48, [-3.1, -0.4, 2.8], 0.34);

    g.userData.bridgeGroup = bridgeGroup;
    g.userData.mainPlat = mainPlat;
    g.userData.uldGrp = uldGrp;
    g.userData.scissorMesh = scissorMesh;
    g.userData.sillY = sillY;
  } else if (kind === 'belt') {
    // Mobile Baggage Conveyor Belt Loader (ベルト・ローダー) with Animated Suitcases at 50cm spacing!
    const topY = Math.max(1.55, Math.min(2.85, targetHeightY));
    addBox(2.05, 0.88, 5.4, 0xf59e0b, 0, 0.72, -0.35);
    addBox(0.92, 0.82, 1.55, 0x1e293b, 0.52, 1.38, -1.45); // Driver seat & controls on right side

    const boomGroup = new THREE.Group();
    const boomLen = 6.9;
    const restAng = 0.08;
    const dockAng = Math.atan2(topY - 0.85, 5.6);
    boomGroup.position.set(-0.18, 0.95, -2.2);
    // Inclined conveyor bed + dark rubber belt
    addBox(0.96, 0.22, boomLen, 0xe2e8f0, 0, 0, boomLen * 0.5, 0.35, 0.4, boomGroup);
    addBox(0.76, 0.06, boomLen - 0.2, 0x111827, 0, 0.13, boomLen * 0.5, 0.05, 0.95, boomGroup);
    addBox(0.98, 0.16, 0.20, 0x111827, 0, 0.10, boomLen, 0.05, 0.95, boomGroup); // Soft nose bumper

    // 4 Suitcases spaced evenly along the belt (animated riding up/down when docked!)
    const bagCols = [0x2563eb, 0xdc2626, 0x0f766e, 0xd97706];
    const bags = [];
    for (let bi = 0; bi < 4; bi++) {
      const bag = addBox(0.54, 0.26, 0.72, bagCols[bi], 0, 0.28, 1.0 + bi * 1.45, 0.15, 0.55, boomGroup);
      bag.visible = false;
      bags.push(bag);
    }
    boomGroup.rotation.x = -restAng;
    g.add(boomGroup);
    addWheels(0.98, [-1.95, 1.65], 0.38);

    g.userData.boomGroup = boomGroup;
    g.userData.bags = bags;
    g.userData.restAng = restAng;
    g.userData.dockAng = dockAng;
    g.userData.boomLen = boomLen;
  } else if (kind === 'fuel') {
    // Authentic Japanese Airport Hydrant Dispenser / Servicer (ハイドラント・サービサー)
    // Parks UNDER starboard wing facing FORWARD (+Z) so forward escape route is 100% clear!
    const wingY = Math.max(2.15, targetHeightY);
    addBox(2.38, 1.32, 6.2, 0xf8fafc, 0, 1.02, 0);
    addBox(2.42, 0.32, 4.0, 0xdc2626, 0, 1.18, -0.95); // Red "FLAMMABLE JET A-1" stripe
    addBox(2.32, 1.58, 1.85, 0xf8fafc, 0, 1.28, 2.12); // Forward cab (+Z = clear escape!)
    addBox(2.35, 0.55, 1.75, 0x38bdf8, 0, 1.68, 2.18, 0.75, 0.12);

    // Rear Elevating Fueling Platform (昇降作業台) + Riser Hose + Pit Hose + Red Bonding Wire + Extinguisher!
    const liftDeck = new THREE.Group();
    liftDeck.position.set(0, 1.55, -1.85);
    addBox(1.65, 0.16, 1.65, 0xfacc15, 0, 0, 0, 0.35, 0.4, liftDeck);
    addBox(0.07, 0.85, 1.6, 0xf59e0b, -0.78, 0.45, 0, 0.3, 0.4, liftDeck);
    addBox(0.07, 0.85, 1.6, 0xf59e0b, 0.78, 0.45, 0, 0.3, 0.4, liftDeck);
    g.add(liftDeck);

    // Black Jet A-1 Wing Coupling Hose + Pit Intake Hose + Red Bonding Wire + Wheeled Fire Extinguisher (visible when docked!)
    const fuelHookups = new THREE.Group();
    fuelHookups.visible = false;
    const riserH = Math.max(1.2, wingY - 1.4);
    addBox(0.11, riserH, 0.11, 0x111827, -0.25, 1.4 + riserH * 0.5, -1.85, 0.1, 0.85, fuelHookups);
    // Pit intake hose curving down to White Hydrant Pit (+1.1m X, -2.6m Z)
    const pitHose = addBox(0.12, 0.12, 2.4, 0x111827, 0.65, 0.35, -2.2, 0.1, 0.85, fuelHookups);
    pitHose.rotation.y = 0.48;
    // Red Grounding / Bonding Wire (アース・ボンディング線)
    const bondWire = addBox(0.035, 0.035, 3.2, 0xef4444, -0.95, 0.18, -0.6, 0.2, 0.5, fuelHookups);
    bondWire.rotation.y = -0.35;
    // Red Wheeled Ramp Fire Extinguisher (消火器) stationed upwind!
    const extTank = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.95, 12), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 }));
    extTank.position.set(-2.15, 0.52, 1.2);
    fuelHookups.add(extTank);
    g.add(fuelHookups);

    addWheels(1.16, [-2.1, 2.0], 0.44);
    g.userData.liftDeck = liftDeck;
    g.userData.fuelHookups = fuelHookups;
    g.userData.dockDeckY = Math.max(1.6, wingY - 1.25);
  } else if (kind === 'gpu') {
    // Ground Power Unit (GPU AC 115V / 400Hz) + Deployable Orange Power Cable
    addBox(1.75, 1.22, 3.15, 0xeab308, 0, 0.88, 0);
    addBox(1.80, 0.22, 3.20, 0x1e293b, 0, 1.52, 0);
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    led.position.set(0, 1.72, 1.1);
    g.add(led);

    // 3D Orange 400Hz Power Cable reaching up into starboard nose receptacle when docked!
    const cableGrp = new THREE.Group();
    cableGrp.visible = false;
    const c1 = addBox(0.11, 0.11, 3.1, 0xf97316, 0, 0.18, 2.25, 0.1, 0.7, cableGrp);
    c1.rotation.x = -0.12;
    const c2 = addBox(0.10, 1.35, 0.10, 0xf97316, 0, 0.92, 3.65, 0.1, 0.7, cableGrp);
    c2.rotation.x = 0.15;
    g.add(cableGrp);

    addWheels(0.88, [-1.0, 1.0], 0.32);
    g.userData.cableGrp = cableGrp;
    g.userData.led = led;
  } else if (kind === 'lav' || kind === 'water') {
    // Lavatory Truck (汚水車 — Slate/Yellow hose) & Potable Water Truck (給水車 — Clean Blue tank/hose)
    const isLav = kind === 'lav';
    const col = isLav ? 0x64748b : 0x0284c7;
    const hoseCol = isLav ? 0xfacc15 : 0x38bdf8;
    const panelY = Math.max(1.9, targetHeightY);
    addBox(2.15, 1.35, 5.2, 0xf8fafc, 0, 1.02, -0.2);
    addBox(2.20, 0.68, 3.3, col, 0, 1.38, -0.95);
    addBox(2.08, 1.42, 1.55, col, 0, 1.12, 1.95);
    // Elevating rear/front service platform + flexible hose up to aircraft panel!
    const lift = new THREE.Group();
    lift.position.set(0, 1.05, 2.65);
    addBox(1.45, 0.14, 1.1, 0xcbd5e1, 0, 0, 0, 0.4, 0.4, lift);
    const hose = addBox(0.10, Math.max(0.9, panelY - 1.0), 0.10, hoseCol, 0.22, (panelY - 1.0) * 0.5, 0.35, 0.1, 0.7, lift);
    hose.visible = false;
    g.add(lift);
    addWheels(1.06, [-1.8, 1.75], 0.40);
    g.userData.serviceLift = lift;
    g.userData.serviceHose = hose;
    g.userData.dockLiftY = Math.max(1.15, panelY - 1.15);
  } else if (kind === 'dolly_train') {
    // Authentic Open-Cab TT Tractor ("TT Mui Trần") pulling 2 ULD Dollies / Baggage Carts along U-Loop!
    const tt = createOpenCabTowingTractor3D();
    tt.position.set(0, 0, 3.2);
    g.add(tt);
    const c1 = createBaggageCart3D(0);
    c1.position.set(0, 0, -0.4);
    const c2 = createBaggageCart3D(1);
    c2.position.set(0, 0, -3.9);
    g.add(c1, c2);
    g.userData.tt = tt;
  } else if (kind === 'tug') {
    // Heavy Aircraft Pushback Tractor + Towbar + Flashing Amber Rotating Beacon!
    addBox(3.05, 1.18, 5.8, 0xf59e0b, 0, 0.88, 0, 0.35, 0.35);
    addBox(3.08, 0.24, 5.84, 0x1e293b, 0, 0.42, 0, 0.4, 0.5);
    addBox(2.28, 0.88, 2.15, 0x38bdf8, 0, 1.84, 0.45, 0.8, 0.12);
    const beacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    beacon.position.set(0, 2.48, 0.45);
    g.add(beacon);
    // Yellow Towbar extending from front (+Z) to couple onto aircraft noseGear!
    const towbar = addBox(0.22, 0.20, 4.4, 0xfacc15, 0, 0.52, 4.85, 0.4, 0.35);
    addBox(0.42, 0.26, 0.35, 0xef4444, 0, 0.52, 7.05, 0.3, 0.4); // Red shear-pin coupler head!
    g.userData.towbar = towbar;
    g.userData.beacon = beacon;
    addWheels(1.48, [-1.9, 1.9], 0.52);
  }
  return g;
}

// =====================================================================
// MAIN TURNAROUND 3D ENGINE CLASS (5 REAL AIRPORTS + TEXTBOOK GSE & CREW)
// =====================================================================
export class TurnaroundScene3D {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.disposed = false;
    this.airportCode = opts.airportCode || 'NGO';
    this.aircraftType = resolveAircraft3DType(opts.aircraftType || 'B789');
    this.liveryId = opts.liveryId || AIRCRAFT_3D_SPECS[this.aircraftType].defaultLivery;
    this.spotId = opts.spotId || null;
    this.cameraPreset = 'spot';
    this.doneSteps = new Set();
    this.showBlastZone = true;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._onCtxLost = e => { e.preventDefault(); this.stop(); };
    this._onCtxRestored = () => { this.start(); };
    canvas.addEventListener('webglcontextlost', this._onCtxLost);
    canvas.addEventListener('webglcontextrestored', this._onCtxRestored);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x9bc5e8);
    this.scene.fog = new THREE.FogExp2(0xb8d7f0, 0.00018);

    this.camera = new THREE.PerspectiveCamera(46, 16 / 9, 2.0, 16000);

    this.sunLight = new THREE.DirectionalLight(0xfff7e8, 2.2);
    this.sunLight.position.set(600, 950, 450);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.near = 100;
    this.sunLight.shadow.camera.far = 3000;
    const sd = 240;
    this.sunLight.shadow.camera.left = -sd;
    this.sunLight.shadow.camera.right = sd;
    this.sunLight.shadow.camera.top = sd;
    this.sunLight.shadow.camera.bottom = -sd;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    this.hemiLight = new THREE.HemisphereLight(0x9bd0ff, 0x455568, 0.92);
    this.scene.add(this.hemiLight);

    this.airportGroup = new THREE.Group();
    this.scene.add(this.airportGroup);

    this.spotOpsGroup = new THREE.Group();
    this.scene.add(this.spotOpsGroup);

    this.texConcrete = makeApronConcreteTex();
    this.texGlass = makeTerminalGlassTex();
    this.waterUniforms = { uTime: { value: 0 }, uDeep: { value: new THREE.Color(0x0c4a6e) }, uShallow: { value: new THREE.Color(0x1d709c) } };

    this.orbit = {
      target: new THREE.Vector3(),
      goalTarget: new THREE.Vector3(),
      spherical: { radius: 110, theta: 0.75, phi: 1.05 },
      goalSpherical: { radius: 110, theta: 0.75, phi: 1.05 },
      dragging: false,
      rightDrag: false,
      lastX: 0,
      lastY: 0
    };
    this._bindOrbitControls();

    this.geoData = null;
    this.activeSpot = null;
    this.aircraftMesh = null;
    this.chocksGroup = null;
    this.pbbActor = null;
    this.gseActors = {};
    this.crewActors = {};
    this.pushbackProgress = 0;
    this.pushbackActive = false;
    this.radarDish = null;
    this.rafId = null;
    this.lastTime = 0;

    this.loadAirport(this.airportCode, this.spotId);
  }

  _bindOrbitControls() {
    const el = this.canvas;
    this._onDown = e => {
      this.orbit.dragging = true;
      this.orbit.rightDrag = e.button === 2 || e.shiftKey;
      this.orbit.lastX = e.clientX;
      this.orbit.lastY = e.clientY;
    };
    this._onMove = e => {
      if (!this.orbit.dragging) return;
      const dx = e.clientX - this.orbit.lastX;
      const dy = e.clientY - this.orbit.lastY;
      this.orbit.lastX = e.clientX;
      this.orbit.lastY = e.clientY;
      if (this.orbit.rightDrag) {
        const panScale = this.orbit.goalSpherical.radius * 0.0014;
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        this.orbit.goalTarget.addScaledVector(right, -dx * panScale);
        this.orbit.goalTarget.addScaledVector(forward, dy * panScale);
      } else {
        this.orbit.goalSpherical.theta -= dx * 0.0065;
        this.orbit.goalSpherical.phi = Math.max(0.14, Math.min(1.48, this.orbit.goalSpherical.phi - dy * 0.0055));
      }
    };
    this._onUp = () => { this.orbit.dragging = false; };
    this._onWheel = e => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.12 : 0.89;
      this.orbit.goalSpherical.radius = Math.max(24, Math.min(6500, this.orbit.goalSpherical.radius * factor));
    };
    this._onContext = e => e.preventDefault();

    el.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointermove', this._onMove);
    window.addEventListener('pointerup', this._onUp);
    el.addEventListener('wheel', this._onWheel, { passive: false });
    el.addEventListener('contextmenu', this._onContext);
  }

  loadAirport(airportCode, spotId = null) {
    this.airportCode = airportCode || 'NGO';
    this.geoData = convertAirportToCartesian(this.airportCode);
    this.activeSpot = this.geoData.spotsXYZ.find(s => s.id === spotId) || this.geoData.spotsXYZ[0];
    this.spotId = this.activeSpot.id;

    while (this.airportGroup.children.length) this.airportGroup.remove(this.airportGroup.children[0]);
    this._buildAirportTerrainAndInfra();
    this._rebuildSpotAircraftAndGse();
    this.setCameraPreset(this.cameraPreset, true);
  }

  setSpot(spotId) {
    if (!this.geoData) return;
    const sp = this.geoData.spotsXYZ.find(s => s.id === spotId);
    if (!sp) return;
    this.activeSpot = sp;
    this.spotId = sp.id;
    this._rebuildSpotAircraftAndGse();
    this.setCameraPreset(this.cameraPreset, false);
  }

  setAircraftAndLivery(acType, liveryId) {
    this.aircraftType = resolveAircraft3DType(acType || this.aircraftType);
    this.liveryId = liveryId || this.liveryId || AIRCRAFT_3D_SPECS[this.aircraftType].defaultLivery;
    this._rebuildSpotAircraftAndGse();
  }

  syncTurnaroundSteps(doneStepIds = []) {
    this.doneSteps = new Set(doneStepIds);
    const has = id => this.doneSteps.has(id);
    const pushing = has('pushback');
    this.pushbackActive = pushing;
    if (!pushing) this.pushbackProgress = 0;

    const setActor = (id, active) => {
      if (this.gseActors[id]) this.gseActors[id].active = Boolean(active) && !pushing;
    };

    if (this.chocksGroup) {
      this.chocksGroup.visible = has('chock') && !pushing;
    }
    if (this.pbbActor) {
      this.pbbActor.active = (has('unload') || has('clean') || has('board')) && !pushing;
    }

    setActor('gpu', has('gpu'));
    setActor('stairsL1', has('unload') || has('clean') || has('board'));
    setActor('cateringR1', has('clean'));
    setActor('cabinCleanL4', has('clean'));
    setActor('cargoFwd', has('unload') || has('load'));
    setActor('dollyFwd', has('unload') || has('load'));
    setActor('cargoAft', has('load'));
    setActor('bulkBelt', has('unload') || has('load'));
    setActor('dollyBulk', has('unload') || has('load'));
    setActor('fuel', has('fuel'));
    setActor('lav', has('lav'));
    setActor('water', has('water'));

    if (this.gseActors.tug) {
      this.gseActors.tug.active = pushing;
    }
  }

  setCameraPreset(preset = 'spot', instant = false) {
    this.cameraPreset = preset;
    if (!this.geoData || !this.activeSpot) return;
    const sp = this.activeSpot.pos;

    if (preset === 'overview') {
      const rwys = this.geoData.runwaysXYZ || [];
      let midX = sp.x * 0.35, midZ = sp.z * 0.35;
      if (rwys.length > 1) {
        midX = rwys.reduce((s, r) => s + r.cx, 0) / rwys.length;
        midZ = rwys.reduce((s, r) => s + r.cz, 0) / rwys.length;
      }
      this.orbit.goalTarget.set(midX, 0, midZ);
      this.orbit.goalSpherical.radius = this.geoData.overviewRadius || 2450;
      this.orbit.goalSpherical.theta = 0.72;
      this.orbit.goalSpherical.phi = 0.86;
    } else if (preset === 'tower') {
      const tw = this.geoData.atcTowerXYZ;
      const dx = sp.x - tw.pos.x;
      const dz = sp.z - tw.pos.z;
      const dist = Math.max(120, Math.hypot(dx, dz));
      const thetaFromSpot = Math.atan2(tw.pos.x - sp.x, tw.pos.z - sp.z);
      this.orbit.goalTarget.set(sp.x, 8, sp.z);
      this.orbit.goalSpherical.radius = Math.min(620, dist);
      this.orbit.goalSpherical.theta = thetaFromSpot;
      this.orbit.goalSpherical.phi = Math.max(0.85, Math.min(1.38, Math.atan2(dist, tw.heightM)));
    } else {
      const rotY = this.activeSpot.rotY;
      this.orbit.goalTarget.set(sp.x, 5.5, sp.z);
      this.orbit.goalSpherical.radius = this.aircraftType === 'B77W' || this.aircraftType === 'B789' ? 105 : 80;
      this.orbit.goalSpherical.theta = rotY - 0.88;
      this.orbit.goalSpherical.phi = 1.06;
    }

    if (instant) {
      this.orbit.target.copy(this.orbit.goalTarget);
      this.orbit.spherical.radius = this.orbit.goalSpherical.radius;
      this.orbit.spherical.theta = this.orbit.goalSpherical.theta;
      this.orbit.spherical.phi = this.orbit.goalSpherical.phi;
    }
  }

  // -------------------------------------------------------------------
  // BUILD REAL-GEO 3D AIRPORT TERRAIN, WATER SHADER, RUNWAYS & SPOTS
  // -------------------------------------------------------------------
  _buildAirportTerrainAndInfra() {
    const g = this.geoData;
    const isIsland = g.terrainType === 'bay_island';
    const isSnow = g.hasSnow;

    this.scene.background = new THREE.Color(isSnow ? 0xcadbee : 0x8cc0ea);
    this.scene.fog = new THREE.FogExp2(isSnow ? 0xd2e1ef : 0xb3d5f2, 0.00014);

    if (isIsland) {
      this.waterUniforms.uDeep.value.setHex(g.waterColor);
      this.waterUniforms.uShallow.value.setHex(g.waterColor).offsetHSL(0.01, 0.05, 0.14);
      const waterMat = new THREE.ShaderMaterial({
        uniforms: this.waterUniforms,
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uDeep;
          uniform vec3 uShallow;
          varying vec3 vWorldPos;
          void main() {
            float w1 = sin(vWorldPos.x * 0.018 + uTime * 0.9) * cos(vWorldPos.z * 0.021 - uTime * 0.7);
            float w2 = sin((vWorldPos.x + vWorldPos.z) * 0.035 - uTime * 1.25);
            float wave = (w1 + w2) * 0.5;
            vec3 col = mix(uDeep, uShallow, 0.42 + wave * 0.16);
            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            float fresnel = pow(1.0 - max(viewDir.y, 0.0), 3.0);
            col = mix(col, vec3(0.72, 0.87, 0.98), fresnel * 0.55);
            float glint = smoothstep(0.78, 0.99, wave + fresnel * 0.35);
            col += vec3(0.95, 0.97, 1.0) * glint * 0.14;
            gl_FragColor = vec4(col, 1.0);
          }
        `
      });
      const sea = new THREE.Mesh(new THREE.PlaneGeometry(24000, 24000), waterMat);
      sea.rotation.x = -Math.PI / 2;
      sea.position.y = -3.0;
      sea.renderOrder = 0;
      this.airportGroup.add(sea);
    } else {
      const landMat = new THREE.MeshStandardMaterial({
        color: g.landColor,
        roughness: isSnow ? 0.62 : 0.92,
        metalness: 0.04
      });
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(24000, 24000), landMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.2;
      ground.receiveShadow = true;
      ground.renderOrder = 0;
      this.airportGroup.add(ground);

      const hillCol = isSnow ? 0xb4c8dc : 0x3b6340;
      const hillMat = new THREE.MeshStandardMaterial({ color: hillCol, roughness: 0.92 });
      [
        [-2800, -3600, 950, 260], [2200, -4200, 1200, 320],
        [-3200, 2600, 1100, 220], [4600, 2200, 980, 210]
      ].forEach(([hx, hz, hr, hh]) => {
        const hill = new THREE.Mesh(new THREE.ConeGeometry(hr, hh, 12), hillMat);
        hill.position.set(hx, hh * 0.45 - 5, hz);
        this.airportGroup.add(hill);
      });
    }

    const addExtrudedPoly = (ptsXYZ, height, yBase, mat) => {
      if (!ptsXYZ || ptsXYZ.length < 3) return null;
      const shape = new THREE.Shape();
      shape.moveTo(ptsXYZ[0].x, -ptsXYZ[0].z);
      for (let i = 1; i < ptsXYZ.length; i++) shape.lineTo(ptsXYZ[i].x, -ptsXYZ[i].z);
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = yBase;
      mesh.receiveShadow = true;
      this.airportGroup.add(mesh);
      return mesh;
    };

    const islandMat = new THREE.MeshStandardMaterial({ color: g.landColor, roughness: isSnow ? 0.58 : 0.88 });
    const isl1 = addExtrudedPoly(g.boundaryXYZ, isIsland ? 3.0 : 1.2, isIsland ? -3.0 : -1.2, islandMat);
    if (isl1) isl1.renderOrder = 1;
    if (g.secondaryIslandXYZ) {
      const isl2 = addExtrudedPoly(g.secondaryIslandXYZ, 3.0, -3.0, islandMat);
      if (isl2) isl2.renderOrder = 1;
    }

    if (g.bridgeXYZ && g.bridgeXYZ.length >= 2) {
      const p0 = g.bridgeXYZ[0], p1 = g.bridgeXYZ[1];
      const len = Math.hypot(p1.x - p0.x, p1.z - p0.z);
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(28, 4.5, len),
        new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.5, metalness: 0.25 })
      );
      bridge.position.set((p0.x + p1.x) * 0.5, 9, (p0.z + p1.z) * 0.5);
      bridge.rotation.y = Math.atan2(p1.x - p0.x, p1.z - p0.z);
      this.airportGroup.add(bridge);
    }

    // RUNWAYS
    const edgeLightMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });
    const papiRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const papiWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (const rwy of g.runwaysXYZ) {
      const rwyTex = makeGeoRunwayTexture(rwy.label, isSnow);
      const rwyMat = new THREE.MeshStandardMaterial({
        map: rwyTex,
        roughness: 0.72,
        metalness: 0.08,
        polygonOffset: true,
        polygonOffsetFactor: -3,
        polygonOffsetUnits: -3
      });
      const rwyGroup = new THREE.Group();
      rwyGroup.position.set(rwy.cx, 0.42, rwy.cz);
      rwyGroup.rotation.y = rwy.rotY;

      const strip = new THREE.Mesh(new THREE.PlaneGeometry(rwy.widthM, rwy.actualLen), rwyMat);
      strip.rotation.x = -Math.PI / 2;
      strip.receiveShadow = true;
      strip.renderOrder = 4;
      rwyGroup.add(strip);

      const halfL = rwy.actualLen * 0.48;
      const halfW = rwy.widthM * 0.5 + 2.2;
      const step = 120;
      const count = Math.floor((halfL * 2) / step) * 2 + 4;
      const lightGeo = new THREE.SphereGeometry(1.15, 6, 6);
      const instLights = new THREE.InstancedMesh(lightGeo, edgeLightMat, count);
      const dummy = new THREE.Object3D();
      let idx = 0;
      for (let z = -halfL; z <= halfL; z += step) {
        for (const sx of [-halfW, halfW]) {
          if (idx >= count) break;
          dummy.position.set(sx, 0.9, z);
          dummy.updateMatrix();
          instLights.setMatrixAt(idx++, dummy.matrix);
        }
      }
      instLights.count = idx;
      rwyGroup.add(instLights);

      for (const endSign of [-1, 1]) {
        for (let p = 0; p < 4; p++) {
          const papi = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.4), p < 2 ? papiWhiteMat : papiRedMat);
          papi.position.set(-(halfW + 12 + p * 4.5) * endSign, 0.7, endSign * (halfL - 280));
          rwyGroup.add(papi);
        }
      }
      this.airportGroup.add(rwyGroup);
    }

    // TAXIWAYS
    const twyMat = new THREE.MeshStandardMaterial({
      color: 0x3b4453,
      roughness: 0.78,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const yellowMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -5,
      polygonOffsetUnits: -5
    });
    for (const tw of g.taxiwaysXYZ) {
      for (let i = 0; i < tw.pointsXYZ.length - 1; i++) {
        const a = tw.pointsXYZ[i], b = tw.pointsXYZ[i + 1];
        const len = Math.hypot(b.x - a.x, b.z - a.z);
        const seg = new THREE.Mesh(new THREE.PlaneGeometry(tw.widthM, len + tw.widthM * 0.4), twyMat);
        seg.rotation.x = -Math.PI / 2;
        const rot = Math.atan2(b.x - a.x, b.z - a.z);
        const twGrp = new THREE.Group();
        twGrp.position.set((a.x + b.x) * 0.5, 0.22, (a.z + b.z) * 0.5);
        twGrp.rotation.y = rot;
        seg.receiveShadow = true;
        seg.renderOrder = 2;
        twGrp.add(seg);

        const line = new THREE.Mesh(new THREE.PlaneGeometry(0.7, len), yellowMat);
        line.rotation.x = -Math.PI / 2;
        line.position.y = 0.08;
        line.renderOrder = 6;
        twGrp.add(line);
        this.airportGroup.add(twGrp);
      }
    }

    // CONCRETE APRONS
    const apronMat = new THREE.MeshStandardMaterial({
      map: this.texConcrete,
      roughness: 0.76,
      metalness: 0.05,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    for (const apr of g.apronsXYZ) {
      const m = addExtrudedPoly(apr.pointsXYZ, 0.14, 0.14, apronMat);
      if (m) m.renderOrder = 3;
    }

    // GSE SERVICE ROAD
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4
    });
    const whiteMat = new THREE.MeshBasicMaterial({
      color: 0xf8fafc,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -6,
      polygonOffsetUnits: -6
    });
    for (let i = 0; i < g.gseServiceRoadXYZ.length - 1; i++) {
      const a = g.gseServiceRoadXYZ[i], b = g.gseServiceRoadXYZ[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const rot = Math.atan2(b.x - a.x, b.z - a.z);
      const rdGrp = new THREE.Group();
      rdGrp.position.set((a.x + b.x) * 0.5, 0.48, (a.z + b.z) * 0.5);
      rdGrp.rotation.y = rot;
      const rMesh = new THREE.Mesh(new THREE.PlaneGeometry(12, len + 10), roadMat);
      rMesh.rotation.x = -Math.PI / 2;
      rMesh.receiveShadow = true;
      rMesh.renderOrder = 5;
      rdGrp.add(rMesh);

      const cl = new THREE.Mesh(new THREE.PlaneGeometry(0.45, len), whiteMat);
      cl.rotation.x = -Math.PI / 2;
      cl.position.y = 0.05;
      cl.renderOrder = 6;
      rdGrp.add(cl);
      this.airportGroup.add(rdGrp);
    }

    // TERMINALS
    for (const tm of g.terminalsXYZ) {
      const tg = new THREE.Group();
      tg.position.set(tm.pos.x, 0, tm.pos.z);
      tg.rotation.y = -(tm.rotDeg * Math.PI) / 180;

      const wallMat = new THREE.MeshStandardMaterial({ map: this.texGlass, color: 0xdbeafe, roughness: 0.25, metalness: 0.45 });
      const roofMat = new THREE.MeshStandardMaterial({ color: tm.color || 0xe2e8f0, roughness: 0.48, metalness: 0.22 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(tm.widthM, tm.heightM, tm.depthM), [wallMat, wallMat, roofMat, roofMat, wallMat, wallMat]);
      body.position.y = tm.heightM * 0.5;
      body.castShadow = true;
      body.receiveShadow = true;
      tg.add(body);

      const roof = new THREE.Mesh(new THREE.BoxGeometry(tm.widthM + 8, 2.2, tm.depthM + 8), roofMat);
      roof.position.y = tm.heightM + 1.1;
      roof.castShadow = true;
      tg.add(roof);

      this.airportGroup.add(tg);
    }

    // ATC CONTROL TOWER
    const tw = g.atcTowerXYZ;
    const towerGroup = new THREE.Group();
    towerGroup.position.set(tw.pos.x, 0, tw.pos.z);
    const shaftH = tw.heightM - 10;
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(5.5, 8.2, shaftH, 12),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.5 })
    );
    shaft.position.y = shaftH * 0.5;
    shaft.castShadow = true;
    towerGroup.add(shaft);

    const cab = new THREE.Mesh(
      new THREE.CylinderGeometry(11.5, 8.5, 8.5, 8),
      new THREE.MeshPhysicalMaterial({ color: 0x0f2b4c, roughness: 0.1, metalness: 0.82, clearcoat: 1.0 })
    );
    cab.position.y = shaftH + 4.2;
    towerGroup.add(cab);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(12.2, 12.2, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
    );
    cap.position.y = shaftH + 9.2;
    towerGroup.add(cap);

    const radar = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 1.6, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 })
    );
    radar.position.y = shaftH + 12.5;
    towerGroup.add(radar);
    this.radarDish = radar;
    this.airportGroup.add(towerGroup);

    // ALL NON-ACTIVE STANDS PAINTED WITH AUTHENTIC WING-HUGGING OPEN-BACK ERA + ESA + PBB MARKINGS!
    for (const sp of g.spotsXYZ) {
      if (this.activeSpot && sp.id === this.activeSpot.id) continue; // Active spot gets tailored markings in spotOpsGroup!
      const sg = new THREE.Group();
      sg.position.set(sp.pos.x, 0.50, sp.pos.z);
      sg.rotation.y = sp.rotY;
      const isWb = sp.widebodyCapable !== false;
      populateTextbookSpotMarkings(sg, {
        halfL: isWb ? 33.5 : 22.0,
        halfSpan: isWb ? 31.5 : 18.0,
        fuseR: isWb ? 2.95 : 1.95,
        hasPbb: sp.hasPbb !== false,
        spotLabel: sp.id
      });
      this.airportGroup.add(sg);
    }

    // LIVE AMBIENT AIRSIDE & TAXIWAY TRAFFIC + PARKED NEIGHBOR FLEET!
    this.ambientTraffic = [];
    const nonActiveSpots = g.spotsXYZ.filter(s => !this.activeSpot || s.id !== this.activeSpot.id);
    nonActiveSpots.filter((_, i) => i % 2 === 1).slice(0, 5).forEach((sp, idx) => {
      const profKey = sp.terminal === 'CARGO' ? 'B77F' : (sp.widebodyCapable !== false && idx % 2 === 0 ? 'B788' : 'B738');
      const prof = AIRCRAFT_PROFILES[profKey] || AIRCRAFT_PROFILES.B738;
      const liv = idx % 2 === 0 ? 'ANA' : 'JAL';
      const parked = createDetailedAirliner3D({ ...(prof.visual3d || {}), liveryId: liv });
      parked.position.set(sp.pos.x, 0.30, sp.pos.z);
      parked.rotation.y = sp.rotY;
      this.airportGroup.add(parked);
    });

    if (g.taxiwaysXYZ && g.taxiwaysXYZ.length > 0 && g.taxiwaysXYZ[0].pointsXYZ.length >= 2) {
      const twyJet = createDetailedAirliner3D({ ...(AIRCRAFT_PROFILES.A320.visual3d || {}), liveryId: 'ANA' });
      this.airportGroup.add(twyJet);
      this.ambientTraffic.push({
        mesh: twyJet,
        pts: g.taxiwaysXYZ[0].pointsXYZ,
        speed: 0.0085,
        offset: 0.18,
        y: 0.30,
        latOff: 0
      });
    }
    if (g.gseServiceRoadXYZ && g.gseServiceRoadXYZ.length >= 2) {
      [
        { mesh: buildTurnaroundGseMesh('dolly_train', 1.0), speed: 0.014, offset: 0.12, latOff: -2.8, rev: false },
        { mesh: buildTurnaroundGseMesh('dolly_train', 1.0), speed: 0.013, offset: 0.62, latOff: 2.8, rev: true },
        { mesh: buildTurnaroundGseMesh('fuel', 2.4), speed: 0.019, offset: 0.45, latOff: -2.8, rev: false }
      ].forEach(cfg => {
        const pts = cfg.rev ? [...g.gseServiceRoadXYZ].reverse() : g.gseServiceRoadXYZ;
        this.airportGroup.add(cfg.mesh);
        this.ambientTraffic.push({
          mesh: cfg.mesh,
          pts,
          speed: cfg.speed,
          offset: cfg.offset,
          y: 0.50,
          latOff: cfg.latOff
        });
      });
    }
  }

  // -------------------------------------------------------------------
  // REBUILD ACTIVE AIRCRAFT + TEXTBOOK ERA/ESA/PBB + GSE FLEET + 3D CREW
  // -------------------------------------------------------------------
  _rebuildSpotAircraftAndGse() {
    while (this.spotOpsGroup.children.length) this.spotOpsGroup.remove(this.spotOpsGroup.children[0]);
    this.gseActors = {};
    this.crewActors = {};
    this.pbbActor = null;

    const sp = this.activeSpot;
    if (!sp) return;

    this.spotOpsGroup.position.set(sp.pos.x, 0.30, sp.pos.z);
    this.spotOpsGroup.rotation.y = sp.rotY;

    this.sunLight.target.position.set(sp.pos.x, 0, sp.pos.z);
    this.sunLight.position.set(sp.pos.x + 260, 390, sp.pos.z + 220);

    const spec = AIRCRAFT_3D_SPECS[this.aircraftType];
    const ap = spec.attachPoints;
    const halfL = spec.lengthM * 0.5;
    const halfSpan = spec.wingspanM * 0.5;
    const fuseR = spec.fuseRadius;
    const hasPbb = sp.hasPbb !== false;

    // 1. Active Spot Textbook Markings (Wing-hugging Open-Back ERA + White-Dashed ESA + PBB Hatched Zone + 4 Color Pits!)
    const markGrp = new THREE.Group();
    markGrp.position.y = 0.20;
    populateTextbookSpotMarkings(markGrp, {
      halfL,
      halfSpan,
      fuseR,
      hasPbb,
      spotLabel: sp.id
    });

    // 4 Official Color-Coded Apron Utility Pits (別添2 p.131: White=Hydrant, Red=Earth, Blue=GPU, Yellow=PC-Air)
    const addPit = (x, z, col, size = 1.15) => {
      const p = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshBasicMaterial({ color: col, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -7 })
      );
      p.rotation.x = -Math.PI / 2;
      p.position.set(x, 0.025, z);
      p.renderOrder = 7;
      markGrp.add(p);
    };
    addPit(ap.fuelPort.x + 1.1, ap.fuelPort.z - 0.8, 0xf8fafc, 1.35);  // White Hydrant Fuel Pit!
    addPit(ap.fuelPort.x - 1.2, ap.fuelPort.z + 1.4, 0xef4444, 0.72);  // Red Bonding/Earth Point!
    addPit(-2.8, ap.noseGear.z + 1.6, 0xef4444, 0.68);                 // Nose Earth Point!
    addPit(ap.gpuPort.dockX - 0.6, ap.gpuPort.z + 1.2, 0x2563eb, 1.05);// Blue GPU Pit!
    addPit(fuseR + 3.8, ap.doorL1.z - 2.0, 0xfacc15, 1.05);            // Yellow PC-Air Pit!
    this.spotOpsGroup.add(markGrp);

    // 2. Real Sculpted GLB Airliner (Flush Livery + Openable Cargo/Galley Doors) + Jet Blast Danger Zone
    this.aircraftMesh = createProceduralAirliner3D(this.aircraftType, this.liveryId);
    this.blastZone = createJetBlastHazardZone3D(spec);
    this.aircraftMesh.add(this.blastZone);
    this.spotOpsGroup.add(this.aircraftMesh);

    // 3. Wheel Chocks (Nose + Left/Right Main Gear) & Textbook 6-Point Safety Cones
    const chocks = new THREE.Group();
    const chockMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.45 });
    const addChock = (x, z) => {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.28, 0.32), chockMat);
      c.position.set(x, 0.14, z);
      chocks.add(c);
    };
    addChock(0, ap.noseGear.z + 0.68);
    addChock(0, ap.noseGear.z - 0.68);
    addChock(-spec.mainGearTrackX, spec.mainGearZOffset + 1.35);
    addChock(-spec.mainGearTrackX, spec.mainGearZOffset - 1.35);
    addChock(spec.mainGearTrackX, spec.mainGearZOffset + 1.35);
    addChock(spec.mainGearTrackX, spec.mainGearZOffset - 1.35);

    [
      [0, halfL + 2.2], [0, -(halfL + 2.2)],
      [halfSpan + 1.5, -halfSpan * 0.22], [-(halfSpan + 1.5), -halfSpan * 0.22],
      [spec.engineSpanX, spec.engineZOffset + 4.2], [-spec.engineSpanX, spec.engineZOffset + 4.2]
    ].forEach(([cx, cz]) => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.08, 8), coneMat);
      cone.position.set(cx, 0.54, cz);
      chocks.add(cone);
    });
    chocks.visible = false;
    this.chocksGroup = chocks;
    this.spotOpsGroup.add(chocks);

    // 4. Articulated Telescoping 3D Passenger Boarding Bridge (PBB / 搭乗橋) on PBB-equipped Stands!
    const bodyW = fuseR + 6.8;
    const wingW = halfSpan + 3.8;
    if (hasPbb) {
      const rotX = bodyW + 14.2;
      const rotZ = ap.doorL1.z + 2.2;
      const doorX = ap.doorL1.x;
      const doorZ = ap.doorL1.z;
      const doorH = ap.doorL1.y;

      const pbbGrp = new THREE.Group();
      const rotunda = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 2.2, doorH + 3.2, 16),
        new THREE.MeshStandardMaterial({ color: 0xdbe4ef, roughness: 0.35, metalness: 0.25 })
      );
      rotunda.position.set(rotX, (doorH + 3.2) * 0.5, rotZ);
      rotunda.castShadow = true;
      pbbGrp.add(rotunda);

      // Fixed walkway linking Rotunda toward Terminal
      const linkWalk = new THREE.Mesh(
        new THREE.BoxGeometry(8.5, 3.0, 3.2),
        new THREE.MeshStandardMaterial({ map: this.texGlass, color: 0xdbeafe, roughness: 0.25, metalness: 0.45 })
      );
      linkWalk.position.set(rotX + 4.5, doorH + 1.35, rotZ + 1.8);
      linkWalk.rotation.y = -0.35;
      pbbGrp.add(linkWalk);

      const tunnel = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 2.85, 1.0),
        new THREE.MeshStandardMaterial({ map: this.texGlass, color: 0xe2e8f0, roughness: 0.22, metalness: 0.45 })
      );
      tunnel.castShadow = true;
      const canopy = new THREE.Mesh(
        new THREE.BoxGeometry(2.78, 3.05, 0.95),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 })
      );
      const bogie = new THREE.Group();
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, doorH + 0.4, 10),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5 })
      );
      leg.position.y = (doorH + 0.4) * 0.5;
      const bWheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
      [-0.65, 0.65].forEach(wz => {
        const bw = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.28, 12), bWheelMat);
        bw.position.set(0, 0.45, wz);
        bogie.add(bw);
      });
      bogie.add(leg);
      pbbGrp.add(tunnel, canopy, bogie);
      this.spotOpsGroup.add(pbbGrp);

      this.pbbActor = {
        group: pbbGrp,
        tunnel,
        canopy,
        bogie,
        rotX,
        rotZ,
        doorX,
        doorZ,
        doorH,
        standbyX: bodyW + 11.2,
        standbyZ: ap.doorL1.z,
        ext: 0,
        active: false
      };
      this._updateSpotPbb(0);
    }

    // 5. Register All Authentic GSE Vehicles — Staged VISIBLY in White-Dashed ESA Bays Outside Red ERA!
    const registerGse = (id, kind, targetY, waypoints, finalYaw, extra = {}) => {
      const mesh = buildTurnaroundGseMesh(kind, targetY, extra);
      mesh.position.set(waypoints[0].x, 0, waypoints[0].z);
      mesh.rotation.y = extra.stageYaw ?? finalYaw;
      mesh.visible = true; // Visible inside ESA staging box outside ERA just like a real ramp!
      this.spotOpsGroup.add(mesh);
      this.gseActors[id] = {
        id,
        kind,
        mesh,
        waypoints,
        finalYaw,
        stageYaw: extra.stageYaw ?? finalYaw,
        progress: 0,
        brakeHoldTimer: 0,
        active: false
      };
    };

    const stbdFwdEsaX = -(bodyW + 6.5);
    const stbdOuterEsaX = -(wingW - 4.8);
    const portFwdEsaX = bodyW + 8.5;
    const portAftEsaX = bodyW + 7.5;

    // Only spawn Passenger Stairs on remote/LCC non-PBB stands!
    if (!hasPbb) {
      registerGse('stairsL1', 'stairs', ap.doorL1.y, [
        { x: portFwdEsaX, z: halfL + 5.2 },
        { x: ap.doorL1.x + 9.2, z: ap.doorL1.z }, // 5m brake-check point
        { x: ap.doorL1.x + 3.55, z: ap.doorL1.z }
      ], -Math.PI / 2, { stageYaw: -Math.PI / 2 });
    }

    // GPU Cart -> Starboard Nose (gpuPort)
    registerGse('gpu', 'gpu', ap.gpuPort.y, [
      { x: stbdFwdEsaX, z: halfL + 5.8 },
      { x: -(fuseR + 6.8), z: ap.gpuPort.z + 2.8 },
      { x: -(fuseR + 3.2), z: ap.gpuPort.z + 1.2 }
    ], Math.PI * 0.36, { stageYaw: Math.PI * 0.5 });

    // Catering Food Loader (フード・ローダー) -> Starboard Forward Galley Door R1 (perpendicular rotY = +PI/2!)
    registerGse('cateringR1', 'catering', ap.doorR1.y, [
      { x: stbdOuterEsaX, z: halfL + 4.8 },
      { x: ap.doorR1.x - 9.2, z: ap.doorR1.z }, // 5m brake-check point!
      { x: ap.doorR1.x - 3.72, z: ap.doorR1.z }
    ], Math.PI / 2, { stageYaw: 0 });

    // Cabin Cleaning Lift Truck (キャビン・サービス・カー) -> Port Aft Door L4 (perpendicular rotY = -PI/2!)
    registerGse('cabinCleanL4', 'cabinClean', ap.doorL4.y, [
      { x: portAftEsaX, z: -(halfL - 2.0) },
      { x: ap.doorL4.x + 9.2, z: ap.doorL4.z },
      { x: ap.doorL4.x + 3.72, z: ap.doorL4.z }
    ], -Math.PI / 2, { stageYaw: 0 });

    // Forward Cargo Loader (High-Lift ULD Loader for B789/B77W/A321, Belt Loader for B738) -> cargoFwd
    const cargoKind = ap.cargoFwd.gseKind || 'belt';
    const fwdDockDist = cargoKind === 'highloader' ? 4.15 : 3.35;
    registerGse('cargoFwd', cargoKind, ap.cargoFwd.y, [
      { x: stbdFwdEsaX - 4.0, z: halfL * 0.58 },
      { x: ap.cargoFwd.x - 9.5, z: ap.cargoFwd.z }, // 5m brake-check point!
      { x: ap.cargoFwd.x - fwdDockDist, z: ap.cargoFwd.z }
    ], Math.PI / 2, { stageYaw: Math.PI / 2, uldCode: spec.uldCode });

    // TT Tractor + 2 Container Dollies driving U-Loop to transfer ULDs behind Fwd Loader (never reversing at aircraft!)
    if (cargoKind === 'highloader') {
      registerGse('dollyFwd', 'dolly_train', 1.0, [
        { x: stbdOuterEsaX, z: halfL * 0.72 },
        { x: ap.cargoFwd.x - 11.5, z: ap.cargoFwd.z + 6.0 },
        { x: ap.cargoFwd.x - 9.8, z: ap.cargoFwd.z - 0.5 }
      ], 0, { stageYaw: 0 });
    }

    // Aft Cargo Loader -> cargoAft (behind right wing)
    registerGse('cargoAft', cargoKind, ap.cargoAft.y, [
      { x: stbdOuterEsaX, z: -(halfSpan * 0.36 + 8.0) },
      { x: ap.cargoAft.x - 9.5, z: ap.cargoAft.z },
      { x: ap.cargoAft.x - fwdDockDist, z: ap.cargoAft.z }
    ], Math.PI / 2, { stageYaw: Math.PI / 2, uldCode: spec.uldCode });

    // Aft Bulk Belt Loader (バルク室ベルト・ローダー) + TT Baggage Cart Train -> bulkDoor!
    registerGse('bulkBelt', 'belt', ap.bulkDoor.y, [
      { x: stbdFwdEsaX - 2.0, z: -(halfL - 2.0) },
      { x: ap.bulkDoor.x - 8.5, z: ap.bulkDoor.z - 1.5 },
      { x: ap.bulkDoor.x - 3.35, z: ap.bulkDoor.z - 0.6 }
    ], Math.PI * 0.44, { stageYaw: Math.PI / 2 });

    registerGse('dollyBulk', 'dolly_train', 1.0, [
      { x: stbdOuterEsaX, z: -(halfL + 0.5) },
      { x: ap.bulkDoor.x - 9.2, z: ap.bulkDoor.z - 5.5 },
      { x: ap.bulkDoor.x - 8.6, z: ap.bulkDoor.z - 1.2 }
    ], 0, { stageYaw: 0 });

    // Hydrant Fuel Servicer -> Under Starboard Wing facing FORWARD (+Z = rotY 0 for clear forward escape path!)
    registerGse('fuel', 'fuel', ap.fuelPort.y, [
      { x: -(bodyW + 4.5), z: -(halfSpan * 0.36 + 9.5) },
      { x: ap.fuelPort.x, z: ap.fuelPort.z - 8.5 }, // 5m brake-check point!
      { x: ap.fuelPort.x, z: ap.fuelPort.z + 1.85 }
    ], 0, { stageYaw: 0 });

    // Lavatory Truck (Starboard Tailcone) & Potable Water Truck (Port Aft — strict hygiene separation!)
    registerGse('lav', 'lav', ap.lavPort.y, [
      { x: -(bodyW + 3.8), z: -(halfL + 1.5) },
      { x: ap.lavPort.x - 8.2, z: ap.lavPort.z },
      { x: ap.lavPort.x - 3.35, z: ap.lavPort.z }
    ], Math.PI / 2, { stageYaw: Math.PI / 2 });

    registerGse('water', 'water', ap.waterPort.y, [
      { x: portAftEsaX + 4.2, z: -(halfL + 1.0) },
      { x: ap.waterPort.x + 8.2, z: ap.waterPort.z },
      { x: ap.waterPort.x + 3.35, z: ap.waterPort.z }
    ], -Math.PI / 2, { stageYaw: -Math.PI / 2 });

    // Pushback Tractor + Towbar -> Staged in Port-Forward ESA until pushback!
    registerGse('tug', 'tug', 0.6, [
      { x: bodyW + 6.5, z: halfL + 7.2 },
      { x: 0, z: halfL + 9.5 },
      { x: 0, z: ap.noseGear.z + 7.15 }
    ], Math.PI, { stageYaw: -Math.PI / 2 });

    // 6. Articulated 3D Ground Crew Team (Marshaller, Watchmen L/R, Headset/Mechanic, Loadmaster, Guidemen, Fueler!)
    const addCrew = (id, role, x, z, yaw) => {
      const c = createArticulatedCrew3D(role);
      c.position.set(x, 0, z);
      c.rotation.y = yaw;
      this.spotOpsGroup.add(c);
      this.crewActors[id] = c;
    };
    addCrew('marshaller', 'marshaller', 0, halfL + 8.8, Math.PI);
    addCrew('watchmanL',  'watchman',   halfSpan + 3.8, -2.5, Math.PI);
    addCrew('watchmanR',  'watchman',  -(halfSpan + 3.8), -2.5, Math.PI);
    addCrew('headset',    'headset',   -(bodyW + 2.2), halfL + 2.5, Math.PI * 0.65);
    addCrew('guidemanFwd','guideman',   ap.cargoFwd.x - 6.2, ap.cargoFwd.z + 3.2, -Math.PI / 2);
    addCrew('guidemanCat','guideman',   ap.doorR1.x - 5.8, ap.doorR1.z + 2.8, -Math.PI / 2);
    addCrew('loadmaster', 'loadmaster', ap.cargoFwd.x - 8.2, (ap.cargoFwd.z + ap.cargoAft.z) * 0.5, Math.PI / 2);
    addCrew('fueler',     'fueler',     ap.fuelPort.x - 3.2, ap.fuelPort.z + 1.5, Math.PI * 0.5);

    this.syncTurnaroundSteps(Array.from(this.doneSteps));
  }

  _updateSpotPbb(ext) {
    const p = this.pbbActor;
    if (!p) return;
    p.ext = ext;
    const tipX = p.standbyX + (p.doorX + 0.55 - p.standbyX) * ext;
    const tipZ = p.standbyZ + (p.doorZ - p.standbyZ) * ext;
    const dx = tipX - p.rotX;
    const dz = tipZ - p.rotZ;
    const len = Math.max(3.5, Math.hypot(dx, dz));
    const yaw = Math.atan2(dx, dz);
    p.tunnel.scale.z = len;
    p.tunnel.position.set((p.rotX + tipX) * 0.5, p.doorH + 1.32, (p.rotZ + tipZ) * 0.5);
    p.tunnel.rotation.y = yaw;
    p.canopy.position.set(tipX, p.doorH + 1.38, tipZ);
    p.canopy.rotation.y = yaw;
    p.bogie.position.set(tipX + (p.rotX - tipX) * 0.22, 0, tipZ + (p.rotZ - tipZ) * 0.22);
  }

  _samplePolyline(pts, t) {
    if (pts.length === 1) return { x: pts[0].x, z: pts[0].z, yaw: 0 };
    const segLens = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].z - pts[i].z);
      segLens.push(l);
      total += l;
    }
    const targetDist = Math.max(0, Math.min(1, t)) * total;
    let accum = 0;
    for (let i = 0; i < segLens.length; i++) {
      if (accum + segLens[i] >= targetDist || i === segLens.length - 1) {
        const localT = segLens[i] > 0.001 ? (targetDist - accum) / segLens[i] : 1;
        const a = pts[i], b = pts[i + 1];
        return {
          x: a.x + (b.x - a.x) * localT,
          z: a.z + (b.z - a.z) * localT,
          yaw: Math.atan2(b.x - a.x, b.z - a.z)
        };
      }
      accum += segLens[i];
    }
    const last = pts[pts.length - 1];
    return { x: last.x, z: last.z, yaw: 0 };
  }

  start() {
    if (this.rafId || this.disposed) return;
    this.lastTime = performance.now();
    const tick = now => {
      if (this.disposed) { this.rafId = null; return; }
      const dt = Math.min(0.05, (now - this.lastTime) * 0.001);
      this.lastTime = now;
      this.update(dt, now * 0.001);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  setShowBlastZone(flag) {
    this.showBlastZone = Boolean(flag);
  }

  update(dt, timeSec) {
    const w = this.canvas.clientWidth || 720;
    const h = this.canvas.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    if (this.canvas.width !== Math.floor(w * dpr) || this.canvas.height !== Math.floor(h * dpr)) {
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    this.waterUniforms.uTime.value = timeSec;
    if (this.radarDish) this.radarDish.rotation.y += dt * 1.4;
    if (this.ambientTraffic && this.ambientTraffic.length) {
      for (const item of this.ambientTraffic) {
        const u = (timeSec * item.speed + item.offset) % 1.0;
        const pose = this._samplePolyline(item.pts, u);
        const nx = pose.x + Math.cos(pose.yaw) * (item.latOff || 0);
        const nz = pose.z - Math.sin(pose.yaw) * (item.latOff || 0);
        item.mesh.position.set(nx, item.y || 0.3, nz);
        item.mesh.rotation.y = pose.yaw;
      }
    }

    const has = id => this.doneSteps.has(id);
    const beaconOn = !has('chock') || this.pushbackActive;
    const cargoOpen = (has('unload') || has('load')) && !this.pushbackActive;
    const galleyOpen = has('clean') && !this.pushbackActive;

    animateAircraft3D(this.aircraftMesh, timeSec, {
      dt,
      enginesRunning: !has('chock') || this.pushbackProgress > 0.45,
      beaconOn,
      strobeOn: this.pushbackProgress > 0.55,
      cargoOpen,
      galleyOpen
    });
    if (this.blastZone) {
      animateJetBlastZone3D(this.blastZone, timeSec, this.showBlastZone && beaconOn);
    }

    // Animate PBB Docking / Retracting onto Port L1 Door
    if (this.pbbActor) {
      const targetExt = this.pbbActor.active ? 1.0 : 0.0;
      const nextExt = this.pbbActor.ext + Math.sign(targetExt - this.pbbActor.ext) * Math.min(Math.abs(targetExt - this.pbbActor.ext), dt * 0.35);
      this._updateSpotPbb(nextExt);
    }

    // Update All GSE Vehicles: ESA Staging -> Approach -> Mandatory 5m Brake-Check Pause -> Final Slow Dock -> Mechanical Operations!
    for (const actor of Object.values(this.gseActors)) {
      const targetP = actor.active ? 1 : 0;
      if (actor.active && actor.progress < 1) {
        // Mandatory 5m Brake-Check Full Stop at waypoint 1 (progress ~ 0.68)!
        if (actor.progress >= 0.66 && actor.progress <= 0.70 && actor.brakeHoldTimer < 0.75 && actor.kind !== 'dolly_train') {
          actor.brakeHoldTimer += dt;
        } else {
          // ≤15 km/h outside 5m, creeping ≤10 km/h inside 5m!
          const spd = actor.progress > 0.68 ? 0.20 : 0.34;
          actor.progress = Math.min(1, actor.progress + dt * spd);
        }
      } else if (!actor.active && actor.progress > 0) {
        actor.brakeHoldTimer = 0;
        actor.progress = Math.max(0, actor.progress - dt * 0.38);
      }

      const m = actor.mesh;
      const ud = m.userData || {};
      const docked = actor.active && actor.progress >= 0.98;

      if (!(actor.id === 'tug' && this.pushbackProgress > 0.01)) {
        const pose = this._samplePolyline(actor.waypoints, actor.progress);
        m.position.set(pose.x, 0, pose.z);
        if (actor.progress <= 0.02) {
          m.rotation.y = actor.stageYaw;
        } else if (actor.progress >= 0.94) {
          m.rotation.y = actor.finalYaw;
        } else {
          m.rotation.y = pose.yaw;
        }
      }

      // Spin GSE wheels while driving
      const moving = actor.progress > 0.02 && actor.progress < 0.98 && !(actor.brakeHoldTimer > 0 && actor.brakeHoldTimer < 0.75);
      if (ud.wheels && moving) {
        ud.wheels.forEach(wh => { wh.rotation.x += dt * 4.5; });
      }

      // Deploy Outriggers & Mechanical Lifts / Hoses / Suitcases / ULDs when Docked!
      if (ud.outriggers) {
        ud.outriggers.forEach(rg => {
          rg.group.visible = docked;
          const targetSc = docked ? 1.0 : 0.01;
          rg.group.scale.x += (targetSc - rg.group.scale.x) * Math.min(1, dt * 6);
        });
      }
      if (actor.kind === 'catering' || actor.kind === 'cabinClean') {
        const goalY = docked ? ud.dockFloorY : ud.restY;
        ud.vanGroup.position.y += (goalY - ud.vanGroup.position.y) * Math.min(1, dt * 2.8);
        ud.scissorPivot.scale.y = Math.max(0.25, (ud.vanGroup.position.y - 0.92));
      } else if (actor.kind === 'highloader') {
        const bridgeGoal = docked ? ud.sillY : 0.85;
        ud.bridgeGroup.position.y += (bridgeGoal - ud.bridgeGroup.position.y) * Math.min(1, dt * 3.2);
        if (docked) {
          // Realistic ULD Loading / Offloading Cycle: Lift platform rises to sillY -> ULD rolls across bridge -> lowers to dolly!
          const cyc = (timeSec * 0.22 + (actor.id === 'cargoAft' ? 0.5 : 0)) % 1.0;
          let liftFrac = 0, uldZ = 0;
          if (cyc < 0.32) {
            liftFrac = cyc / 0.32;
            uldZ = has('load') ? -0.3 : 2.8;
          } else if (cyc < 0.62) {
            liftFrac = 1.0;
            const slide = (cyc - 0.32) / 0.30;
            uldZ = has('load') ? (-0.3 + slide * 3.8) : (3.5 - slide * 3.8);
          } else if (cyc < 0.88) {
            liftFrac = 1.0 - (cyc - 0.62) / 0.26;
            uldZ = has('load') ? 3.5 : -0.3;
          } else {
            liftFrac = 0;
            uldZ = -0.3;
          }
          const platY = 0.62 + liftFrac * (ud.sillY - 0.62);
          ud.mainPlat.position.y = platY;
          ud.scissorMesh.scale.y = Math.max(0.25, platY - 0.42);
          ud.scissorMesh.position.y = 0.42 + ud.scissorMesh.scale.y * 0.5;
          ud.uldGrp.visible = !(has('load') && cyc >= 0.62);
          ud.uldGrp.position.z = uldZ;
        } else {
          ud.mainPlat.position.y += (0.68 - ud.mainPlat.position.y) * Math.min(1, dt * 4);
          ud.scissorMesh.scale.y = 0.35;
          ud.uldGrp.visible = true;
          ud.uldGrp.position.z = 0;
        }
      } else if (actor.kind === 'belt') {
        const goalAng = docked ? ud.dockAng : ud.restAng;
        const curAng = -ud.boomGroup.rotation.x;
        ud.boomGroup.rotation.x = -(curAng + (goalAng - curAng) * Math.min(1, dt * 3.5));
        ud.bags.forEach((bag, bi) => {
          bag.visible = docked;
          if (docked) {
            const dir = has('load') ? 1 : -1;
            const raw = ((bi * 0.25 + timeSec * 0.26 * dir) % 1.0 + 1.0) % 1.0;
            bag.position.z = 0.55 + raw * (ud.boomLen - 1.1);
          }
        });
      } else if (actor.kind === 'fuel') {
        const goalDeck = docked ? ud.dockDeckY : 1.55;
        ud.liftDeck.position.y += (goalDeck - ud.liftDeck.position.y) * Math.min(1, dt * 3.0);
        ud.fuelHookups.visible = docked;
      } else if (actor.kind === 'gpu') {
        ud.cableGrp.visible = docked;
      } else if (actor.kind === 'lav' || actor.kind === 'water') {
        const goalL = docked ? ud.dockLiftY : 1.05;
        ud.serviceLift.position.y += (goalL - ud.serviceLift.position.y) * Math.min(1, dt * 3.0);
        ud.serviceHose.visible = docked;
      } else if (actor.kind === 'tug' && ud.beacon) {
        ud.beacon.visible = !actor.active || Math.floor(timeSec * 4) % 2 === 0;
      }
    }

    // Physical Pushback Animation + Articulated Ground Crew Choreography!
    const spec = AIRCRAFT_3D_SPECS[this.aircraftType];
    const ap = spec.attachPoints;
    const halfL = spec.lengthM * 0.5;
    const halfSpan = spec.wingspanM * 0.5;
    const bodyW = spec.fuseRadius + 6.8;

    let acX = 0, acZ = 0, acYaw = 0;
    if (this.pushbackActive && this.gseActors.tug && this.gseActors.tug.progress >= 0.98) {
      this.pushbackProgress = Math.min(1, this.pushbackProgress + dt * 0.12);
      const pb = this.pushbackProgress;
      const straightBack = Math.min(pb * 1.55, 1) * 28;
      const turnPhase = Math.max(0, (pb - 0.36) / 0.64);
      acYaw = turnPhase * 1.18;
      acX = -Math.sin(acYaw) * turnPhase * 22;
      acZ = -straightBack - turnPhase * 24;

      if (this.aircraftMesh) {
        this.aircraftMesh.position.set(acX, 0, acZ);
        this.aircraftMesh.rotation.y = acYaw;
      }
      const tugDist = ap.noseGear.z + 7.15;
      const tugMesh = this.gseActors.tug.mesh;
      if (pb < 0.86) {
        tugMesh.position.set(acX + Math.sin(acYaw) * tugDist, 0, acZ + Math.cos(acYaw) * tugDist);
        tugMesh.rotation.y = acYaw + Math.PI;
      } else {
        // Towbar disconnected — Tug pulls safely clear ahead-right while Headset Man shows Red Bypass Pin on Captain's Left!
        const sep = (pb - 0.86) / 0.14;
        tugMesh.position.set(acX + Math.sin(acYaw) * (tugDist + sep * 7.5) - sep * 3.5, 0, acZ + Math.cos(acYaw) * (tugDist + sep * 7.5));
        tugMesh.rotation.y = acYaw + Math.PI;
      }
    } else if (this.aircraftMesh) {
      this.aircraftMesh.position.set(0, 0, 0);
      this.aircraftMesh.rotation.y = 0;
    }

    // Update Authentic 3D Ground Crew Positions & Hand Signals per Active Step!
    this._updateCrewChoreography(timeSec, acX, acZ, acYaw, spec, ap, halfL, halfSpan, bodyW);

    // Smoothly damp OrbitControls camera
    const damp = Math.min(1, dt * 6.5);
    this.orbit.target.lerp(this.orbit.goalTarget, damp);
    this.orbit.spherical.radius += (this.orbit.goalSpherical.radius - this.orbit.spherical.radius) * damp;
    this.orbit.spherical.theta += (this.orbit.goalSpherical.theta - this.orbit.spherical.theta) * damp;
    this.orbit.spherical.phi += (this.orbit.goalSpherical.phi - this.orbit.spherical.phi) * damp;

    const { radius, theta, phi } = this.orbit.spherical;
    const sinPhi = Math.sin(phi);
    const camY = Math.max(2.5, this.orbit.target.y + radius * Math.cos(phi));
    this.camera.position.set(
      this.orbit.target.x + radius * sinPhi * Math.sin(theta),
      camY,
      this.orbit.target.z + radius * sinPhi * Math.cos(theta)
    );
    const desiredNear = Math.max(1.8, Math.min(45, camY * 0.018));
    if (Math.abs(this.camera.near - desiredNear) > 0.5) {
      this.camera.near = desiredNear;
      this.camera.updateProjectionMatrix();
    }
    this.camera.lookAt(this.orbit.target);

    this.renderer.render(this.scene, this.camera);
  }

  _updateCrewChoreography(timeSec, acX, acZ, acYaw, spec, ap, halfL, halfSpan, bodyW) {
    const c = this.crewActors;
    if (!c.marshaller) return;
    const has = id => this.doneSteps.has(id);
    const pb = this.pushbackProgress;
    const sinY = Math.sin(acYaw), cosY = Math.cos(acYaw);
    const acToSpot = (lx, lz) => [acX + lx * cosY + lz * sinY, acZ - lx * sinY + lz * cosY];

    if (this.pushbackActive) {
      // Departure Phase:
      //  - Marshaller stands clear in Port ESA
      c.marshaller.position.set(bodyW + 3.5, 0, halfL + 6.5);
      c.marshaller.rotation.y = Math.PI;
      animateCrewSignal(c.marshaller, pb > 0.82 ? 'wave_off' : 'm_allclear', timeSec);

      if (pb < 0.84) {
        // Headset Man walks alongside Nose Gear; Watchmen L/R walk alongside Wingtips (>5m clear of engines!)
        const [hx, hz] = acToSpot(4.8, ap.noseGear.z + 2.5);
        c.headset.position.set(hx, 0, hz);
        c.headset.rotation.y = acYaw + Math.PI;
        animateCrewSignal(c.headset, pb > 0.02 ? 'walk_escort' : 'point_and_call', timeSec);

        const [wlx, wlz] = acToSpot(halfSpan + 3.8, -2.0);
        c.watchmanL.position.set(wlx, 0, wlz);
        c.watchmanL.rotation.y = acYaw + Math.PI;
        animateCrewSignal(c.watchmanL, pb > 0.02 ? 'walk_escort' : 'watchman_clear', timeSec);

        const [wrx, wrz] = acToSpot(-(halfSpan + 3.8), -2.0);
        c.watchmanR.position.set(wrx, 0, wrz);
        c.watchmanR.rotation.y = acYaw + Math.PI;
        animateCrewSignal(c.watchmanR, pb > 0.02 ? 'walk_escort' : 'watchman_clear', timeSec);
      } else {
        // Bypass Pin Display on Captain's Forward-Left (+X side of aircraft nose!) & Ramp Team Wave-Off (お見送り)!
        const [pinX, pinZ] = acToSpot(8.5, halfL - 2.0);
        c.headset.position.set(pinX, 0, pinZ);
        c.headset.rotation.y = Math.atan2(acX - pinX, acZ - pinZ);
        animateCrewSignal(c.headset, 'bypass_pin_salute', timeSec);

        // Ramp Team lines up safely along Apron edge bowing & waving off (お見送り)!
        c.watchmanL.position.set(11.5, 0, -(halfL * 0.55));
        c.watchmanL.rotation.y = Math.atan2(acX - 11.5, acZ + halfL * 0.55);
        animateCrewSignal(c.watchmanL, 'wave_off', timeSec);

        c.watchmanR.position.set(8.5, 0, -(halfL * 0.55));
        c.watchmanR.rotation.y = Math.atan2(acX - 8.5, acZ + halfL * 0.55);
        animateCrewSignal(c.watchmanR, 'wave_off', timeSec);
      }

      c.loadmaster.position.set(5.5, 0, -(halfL * 0.55));
      c.loadmaster.rotation.y = Math.atan2(acX - 5.5, acZ + halfL * 0.55);
      animateCrewSignal(c.loadmaster, pb > 0.78 ? 'wave_off' : 'point_and_call', timeSec);
      c.guidemanFwd.visible = false;
      c.guidemanCat.visible = false;
      c.fueler.visible = false;
      return;
    }

    // Arrival & Turnaround Servicing Phases:
    if (!has('chock')) {
      // Step 1 (Marshalling): Marshaller on lead-in line ahead of nose; L/R Watchmen 3.8m outside wingtips (>5m clear of engines!)
      c.marshaller.position.set(0, 0, halfL + 8.8);
      c.marshaller.rotation.y = Math.PI;
      animateCrewSignal(c.marshaller, has('marshal') ? 'm_stop' : 'm_straight', timeSec);

      c.watchmanL.position.set(halfSpan + 3.8, 0, -2.5);
      c.watchmanL.rotation.y = Math.PI;
      animateCrewSignal(c.watchmanL, 'watchman_clear', timeSec);

      c.watchmanR.position.set(-(halfSpan + 3.8), 0, -2.5);
      c.watchmanR.rotation.y = Math.PI;
      animateCrewSignal(c.watchmanR, 'watchman_clear', timeSec);

      // Chock/Headset mechanic & other crew wait strictly OUTSIDE red ERA line!
      c.headset.position.set(-(bodyW + 2.2), 0, halfL + 2.5);
      c.headset.rotation.y = Math.PI * 0.6;
      animateCrewSignal(c.headset, 'm_stop', timeSec);

      c.guidemanFwd.visible = false;
      c.guidemanCat.visible = false;
      c.loadmaster.visible = false;
      c.fueler.visible = false;
    } else {
      // On-Block & Ground Handling Active!
      c.marshaller.position.set(bodyW + 3.8, 0, halfL + 5.5);
      c.marshaller.rotation.y = -Math.PI * 0.5;
      animateCrewSignal(c.marshaller, !has('arrcheck') ? 'm_chocks' : 'point_and_call', timeSec);

      // Walkaround / Nose Mechanic performing 指差呼称 at Nose Gear & Starboard GPU
      if (!has('arrcheck')) {
        const wkAng = timeSec * 0.55;
        const wx = Math.sin(wkAng) * (spec.fuseRadius + 4.5);
        const wz = Math.cos(wkAng) * (halfL * 0.72);
        c.headset.position.set(wx, 0, wz);
        c.headset.rotation.y = Math.atan2(-wx, -wz);
        animateCrewSignal(c.headset, 'point_and_call', timeSec);
      } else {
        c.headset.position.set(-(spec.fuseRadius + 2.6), 0, ap.gpuPort.z - 0.8);
        c.headset.rotation.y = Math.PI * 0.35;
        animateCrewSignal(c.headset, 'point_and_call', timeSec);
      }

      // Watchmen transition to Aft Bulk & Port Water/Safety Supervision
      c.watchmanL.position.set(ap.waterPort.x + 2.8, 0, ap.waterPort.z + 2.2);
      c.watchmanL.rotation.y = -Math.PI * 0.75;
      animateCrewSignal(c.watchmanL, has('water') ? 'point_and_call' : 'spotter_clear', timeSec);

      c.watchmanR.position.set(ap.bulkDoor.x - 2.6, 0, ap.bulkDoor.z + 2.2);
      c.watchmanR.rotation.y = Math.PI * 0.75;
      animateCrewSignal(c.watchmanR, (has('unload') || has('load')) ? 'guideman_beckon' : 'point_and_call', timeSec);

      // Forward Cargo Loader Guideman (offset safely 3.0m forward of loader path — NEVER between loader & fuselage!)
      const fwdAct = this.gseActors.cargoFwd;
      c.guidemanFwd.visible = Boolean(fwdAct && fwdAct.progress > 0.05);
      if (c.guidemanFwd.visible) {
        c.guidemanFwd.position.set(ap.cargoFwd.x - 4.2, 0, ap.cargoFwd.z + 3.4);
        c.guidemanFwd.rotation.y = -Math.PI * 0.75;
        const sig = (fwdAct.progress >= 0.65 && fwdAct.progress <= 0.72) ? 'guideman_hold' : (fwdAct.progress < 0.98 ? 'guideman_beckon' : 'point_and_call');
        animateCrewSignal(c.guidemanFwd, sig, timeSec);
      }

      // Catering Food Loader Guideman (offset safely ahead of R1 catering truck!)
      const catAct = this.gseActors.cateringR1;
      c.guidemanCat.visible = Boolean(catAct && catAct.progress > 0.05);
      if (c.guidemanCat.visible) {
        c.guidemanCat.position.set(ap.doorR1.x - 3.8, 0, ap.doorR1.z + 3.0);
        c.guidemanCat.rotation.y = -Math.PI * 0.75;
        const sig = (catAct.progress >= 0.65 && catAct.progress <= 0.72) ? 'guideman_hold' : (catAct.progress < 0.98 ? 'guideman_beckon' : 'point_and_call');
        animateCrewSignal(c.guidemanCat, sig, timeSec);
      }

      // Loadmaster holding LIR Clipboard supervising Starboard Cargo & W&B!
      c.loadmaster.visible = has('unload') || has('load');
      if (c.loadmaster.visible) {
        c.loadmaster.position.set(ap.cargoFwd.x - 7.8, 0, ap.cargoFwd.z - 4.5);
        c.loadmaster.rotation.y = Math.PI * 0.35;
        animateCrewSignal(c.loadmaster, 'point_and_call', timeSec);
      }

      // HazMat Class 4 Fuel Operator beside Hydrant Pit & Red Bonding Point!
      const fuelAct = this.gseActors.fuel;
      c.fueler.visible = Boolean(fuelAct && fuelAct.progress > 0.1);
      if (c.fueler.visible) {
        c.fueler.position.set(ap.fuelPort.x - 3.0, 0, ap.fuelPort.z - 0.8);
        c.fueler.rotation.y = Math.PI * 0.45;
        animateCrewSignal(c.fueler, fuelAct.progress < 0.96 ? 'guideman_beckon' : 'point_and_call', timeSec);
      }
    }
  }

  getActiveGseSummary() {
    const list = Object.values(this.gseActors)
      .filter(a => a.active || a.progress > 0.05)
      .map(a => ({ id: a.id, kind: a.kind, pct: Math.round(a.progress * 100) }));
    if (this.pbbActor && (this.pbbActor.active || this.pbbActor.ext > 0.05)) {
      list.unshift({ id: 'pbb', kind: 'pbb', pct: Math.round(this.pbbActor.ext * 100) });
    }
    return list;
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.canvas.removeEventListener('pointerdown', this._onDown);
    window.removeEventListener('pointermove', this._onMove);
    window.removeEventListener('pointerup', this._onUp);
    this.canvas.removeEventListener('wheel', this._onWheel);
    this.canvas.removeEventListener('contextmenu', this._onContext);
    this.renderer.dispose();
  }
}
