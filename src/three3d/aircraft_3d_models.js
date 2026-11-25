// Commercial 3D Airliner Library powered by real sculpted GLB models (amvlab/aircraft-models, CC-BY 4.0)
// + Vendored Three.js GLTFLoader (100% Offline in both PWA & Single-File HTML)
// + Japanese Airline Livery Accents (ANA, JAL, Peach, Jetstar) + Exact GSE Attach Points + High-Visibility Jet Blast Hazard Zone
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const AIRLINE_LIVERIES = {
  ANA: {
    id: 'ANA',
    name: 'ANA (All Nippon Airways)',
    shortName: 'ANA',
    badgeColor: '#0B3B8C',
    primaryHex: 0x0b3b8c,
    secondaryHex: 0x1ea1e8,
    accentCss: '#0B3B8C',
    title: 'ANA',
    regPrefix: 'JA8'
  },
  JAL: {
    id: 'JAL',
    name: 'JAL (Japan Airlines)',
    shortName: 'JAL',
    badgeColor: '#D6001C',
    primaryHex: 0xd6001c,
    secondaryHex: 0xffffff,
    accentCss: '#D6001C',
    title: 'JAPAN AIRLINES',
    regPrefix: 'JA7'
  },
  PEACH: {
    id: 'PEACH',
    name: 'Peach Aviation (LCC)',
    shortName: 'Peach',
    badgeColor: '#C8167A',
    primaryHex: 0xc8167a,
    secondaryHex: 0x7b1fa2,
    accentCss: '#C8167A',
    title: 'peach',
    regPrefix: 'JA2'
  },
  JETSTAR: {
    id: 'JETSTAR',
    name: 'Jetstar Japan (LCC)',
    shortName: 'Jetstar',
    badgeColor: '#FF5000',
    primaryHex: 0xff5000,
    secondaryHex: 0x94a3b8,
    accentCss: '#FF5000',
    title: 'Jetstar',
    regPrefix: 'JA0'
  }
};

function buildAttachPoints(spec) {
  const halfL = spec.lengthM * 0.5;
  const r = spec.fuseRadius;
  const zFromNose = m => Number((halfL - m).toFixed(2));
  const raw = spec.attachFromNose;
  return {
    doorL1:   { metersFromNose: raw.doorL1.m,   x: Number((r + 0.12).toFixed(2)),  y: raw.doorL1.y,   z: zFromNose(raw.doorL1.m),   dockX: Number((r + 1.45).toFixed(2)),  side: 'port' },
    doorL2:   { metersFromNose: raw.doorL2.m,   x: Number((r + 0.12).toFixed(2)),  y: raw.doorL2.y,   z: zFromNose(raw.doorL2.m),   dockX: Number((r + 1.45).toFixed(2)),  side: 'port' },
    cargoFwd: { metersFromNose: raw.cargoFwd.m, x: Number(-(r + 0.12).toFixed(2)), y: raw.cargoFwd.y, z: zFromNose(raw.cargoFwd.m), dockX: Number(-(r + 2.65).toFixed(2)), side: 'starboard', gseKind: spec.gseCargoType },
    cargoAft: { metersFromNose: raw.cargoAft.m, x: Number(-(r + 0.12).toFixed(2)), y: raw.cargoAft.y, z: zFromNose(raw.cargoAft.m), dockX: Number(-(r + 2.65).toFixed(2)), side: 'starboard', gseKind: spec.gseCargoType },
    fuelPort: { metersFromNose: raw.fuelPort.m, x: Number(-raw.fuelPort.spanX.toFixed(2)), y: raw.fuelPort.y, z: zFromNose(raw.fuelPort.m), dockX: Number(-(raw.fuelPort.spanX + 1.4).toFixed(2)), side: 'starboard' },
    noseGear: { metersFromNose: raw.noseGear.m, x: 0, y: 0.55, z: zFromNose(raw.noseGear.m), dockZ: Number((zFromNose(raw.noseGear.m) + 5.6).toFixed(2)), side: 'center' },
    gpuPort:  { metersFromNose: raw.gpuPort.m,  x: Number(-(r * 0.78).toFixed(2)), y: 1.5, z: zFromNose(raw.gpuPort.m),  dockX: Number(-(r + 3.2).toFixed(2)),  side: 'starboard' },
    lavPort:  { metersFromNose: raw.lavPort.m,  x: Number(-(r * 0.85).toFixed(2)), y: 2.1, z: zFromNose(raw.lavPort.m),  dockX: Number(-(r + 3.0).toFixed(2)),  side: 'starboard' },
    waterPort:{ metersFromNose: raw.waterPort.m,x: Number((r * 0.85).toFixed(2)),  y: 2.1, z: zFromNose(raw.waterPort.m),dockX: Number((r + 3.0).toFixed(2)),   side: 'port' }
  };
}

// =====================================================================
// 4 CORE JAPANESE COMMERCIAL AIRLINERS — MAPPED TO REAL SCULPTED GLB FILES
// =====================================================================
const RAW_SPECS = {
  B789: {
    id: 'B789',
    wbId: 'B789',
    glbFile: 'B787_nologo.glb',
    name: 'Boeing 787-9 Dreamliner',
    shortName: 'B787-9',
    category: 'Wide-body',
    lengthM: 62.8,
    wingspanM: 60.1,
    tailHeightM: 17.0,
    fuseRadius: 2.88,
    bellyClearanceM: 2.05,
    groundLiftM: 1.15, // Engine nacelle bottom clearance above tarmac (gear reaches y=0)
    engineSpanX: 9.8,
    engineZOffset: 4.5,
    mainGearAxles: 2,
    mainGearTrackX: 4.9,
    mainGearZOffset: -2.2,
    gseCargoType: 'highloader',
    defaultLivery: 'ANA',
    reg: 'JA899A',
    blastLenM: 76,
    blastWidthM: 32,
    attachFromNose: {
      doorL1:   { m: 7.8,  y: 4.85 },
      doorL2:   { m: 19.6, y: 4.85 },
      cargoFwd: { m: 15.8, y: 2.75 },
      cargoAft: { m: 44.2, y: 2.85 },
      fuelPort: { m: 33.5, spanX: 16.5, y: 3.55 },
      noseGear: { m: 6.4 },
      gpuPort:  { m: 5.5 },
      lavPort:  { m: 52.5 },
      waterPort:{ m: 50.0 }
    }
  },
  B77W: {
    id: 'B77W',
    wbId: 'B773',
    glbFile: 'A350_nologo.glb',
    name: 'Boeing 777-300ER',
    shortName: 'B777-300ER',
    category: 'Heavy Wide-body',
    lengthM: 73.9,
    wingspanM: 64.8,
    tailHeightM: 18.5,
    fuseRadius: 3.10,
    bellyClearanceM: 2.25,
    groundLiftM: 1.25,
    engineSpanX: 10.6,
    engineZOffset: 5.2,
    mainGearAxles: 3, // Authentic 3-axle 6-wheel bogie per side (12 main wheels)
    mainGearTrackX: 5.5,
    mainGearZOffset: -3.1,
    gseCargoType: 'highloader',
    defaultLivery: 'JAL',
    reg: 'JA738J',
    blastLenM: 88,
    blastWidthM: 36,
    attachFromNose: {
      doorL1:   { m: 8.6,  y: 5.15 },
      doorL2:   { m: 21.8, y: 5.15 },
      cargoFwd: { m: 18.2, y: 2.95 },
      cargoAft: { m: 52.4, y: 3.05 },
      fuelPort: { m: 39.2, spanX: 17.8, y: 3.85 },
      noseGear: { m: 7.2 },
      gpuPort:  { m: 6.2 },
      lavPort:  { m: 62.0 },
      waterPort:{ m: 59.0 }
    }
  },
  A321: {
    id: 'A321',
    wbId: 'A321',
    glbFile: 'A320_nologo.glb',
    name: 'Airbus A321neo',
    shortName: 'A321neo',
    category: 'Stretched Narrow-body',
    lengthM: 44.5,
    wingspanM: 35.8,
    tailHeightM: 11.8,
    fuseRadius: 1.98,
    bellyClearanceM: 1.65,
    groundLiftM: 0.92,
    engineSpanX: 5.8,
    engineZOffset: 3.0,
    mainGearAxles: 1,
    mainGearTrackX: 3.8,
    mainGearZOffset: -1.6,
    gseCargoType: 'belt',
    defaultLivery: 'PEACH',
    reg: 'JA901P',
    blastLenM: 58,
    blastWidthM: 22,
    attachFromNose: {
      doorL1:   { m: 5.4,  y: 3.45 },
      doorL2:   { m: 16.5, y: 3.45 },
      cargoFwd: { m: 12.2, y: 2.15 },
      cargoAft: { m: 31.8, y: 2.25 },
      fuelPort: { m: 23.4, spanX: 10.6, y: 2.55 },
      noseGear: { m: 5.0 },
      gpuPort:  { m: 4.3 },
      lavPort:  { m: 38.2 },
      waterPort:{ m: 36.2 }
    }
  },
  B738: {
    id: 'B738',
    wbId: 'B738',
    glbFile: 'B737_nologo.glb',
    name: 'Boeing 737-800',
    shortName: 'B737-800',
    category: 'Narrow-body',
    lengthM: 39.5,
    wingspanM: 35.8,
    tailHeightM: 12.5,
    fuseRadius: 1.88,
    bellyClearanceM: 1.18,
    groundLiftM: 0.65,
    engineSpanX: 4.9,
    engineZOffset: 2.6,
    mainGearAxles: 1,
    mainGearTrackX: 2.9,
    mainGearZOffset: -1.4,
    gseCargoType: 'belt',
    defaultLivery: 'JAL',
    reg: 'JA342J',
    blastLenM: 54,
    blastWidthM: 21,
    attachFromNose: {
      doorL1:   { m: 4.9,  y: 2.85 },
      doorL2:   { m: 31.5, y: 2.85 },
      cargoFwd: { m: 10.4, y: 1.65 },
      cargoAft: { m: 28.4, y: 1.75 },
      fuelPort: { m: 21.0, spanX: 10.2, y: 2.15 },
      noseGear: { m: 4.6 },
      gpuPort:  { m: 3.9 },
      lavPort:  { m: 33.8 },
      waterPort:{ m: 32.0 }
    }
  }
};

export const AIRCRAFT_3D_SPECS = Object.fromEntries(
  Object.entries(RAW_SPECS).map(([k, sp]) => [k, { ...sp, attachPoints: buildAttachPoints(sp) }])
);

export function resolveAircraft3DType(acId) {
  if (!acId) return 'B789';
  const up = String(acId).toUpperCase();
  if (AIRCRAFT_3D_SPECS[up]) return up;
  if (up === 'B788' || up === 'B763' || up === 'A359') return 'B789';
  if (up === 'B773' || up === 'B77F') return 'B77W';
  if (up === 'A320') return 'A321';
  return 'B738';
}

export function getAircraftAttachPoints(acId) {
  return AIRCRAFT_3D_SPECS[resolveAircraft3DType(acId)].attachPoints;
}

// =====================================================================
// ASYNC GLB MODEL LOADER & CACHE (WORKS BOTH ONLINE PWA & 100% OFFLINE SINGLE-FILE!)
// =====================================================================
const gltfLoader = new GLTFLoader();
const glbCache = new Map(); // glbFile -> Promise<THREE.Object3D>

function base64ToArrayBuffer(b64) {
  const binStr = atob(b64);
  const len = binStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binStr.charCodeAt(i);
  return bytes.buffer;
}

function loadRawGlbModel(glbFile) {
  if (glbCache.has(glbFile)) return glbCache.get(glbFile);

  const prom = new Promise((resolve, reject) => {
    const inlineMap = typeof window !== 'undefined' ? window.__APP_GLB_BASE64__ : null;
    if (inlineMap && inlineMap[glbFile]) {
      try {
        const buf = base64ToArrayBuffer(inlineMap[glbFile]);
        gltfLoader.parse(buf, '', gltf => resolve(gltf.scene), reject);
      } catch (err) {
        reject(err);
      }
      return;
    }
    // Online / local HTTP server fallback -> vendored local file (zero external CDN!)
    gltfLoader.load(`./vendor/models/${glbFile}`, gltf => resolve(gltf.scene), undefined, reject);
  });

  glbCache.set(glbFile, prom);
  return prom;
}

// =====================================================================
// HIGH-VISIBILITY LIVERY BADGE TEXTURE (CRISP ON BOTH SIDES OF TAIL FIN)
// =====================================================================
const liveryBadgeCache = new Map();
function makeLiveryBannerTex(livery) {
  if (liveryBadgeCache.has(livery.id)) return liveryBadgeCache.get(livery.id);
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 192;
  const ctx = c.getContext('2d');
  ctx.fillStyle = livery.badgeColor;
  ctx.fillRect(0, 0, 512, 192);
  if (livery.id === 'ANA') {
    ctx.fillStyle = '#1EA1E8';
    ctx.fillRect(0, 148, 512, 44);
  } else if (livery.id === 'JAL') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 192);
    ctx.fillStyle = '#D6001C';
    ctx.beginPath();
    ctx.arc(88, 96, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 38px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('JAL', 88, 98);
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 44px "Arial", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('JAPAN AIRLINES', 168, 98);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    liveryBadgeCache.set(livery.id, tex);
    return tex;
  }
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 72px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(livery.title, 256, 86);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  liveryBadgeCache.set(livery.id, tex);
  return tex;
}

function buildLandingGearGroup(spec) {
  const gear = new THREE.Group();
  gear.name = 'landing_gear';
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdbe4ef, roughness: 0.22, metalness: 0.85 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4, metalness: 0.7 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x16191f, roughness: 0.9, metalness: 0.05 });

  const addWheel = (x, y, z, r, w) => {
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 16), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.position.set(x, y, z);
    tire.castShadow = true;
    gear.add(tire);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r * 0.45, w + 0.04, 10), chromeMat);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(x, y, z);
    gear.add(rim);
  };

  // Nose Gear at exact attachPoints.noseGear.z
  const ngZ = spec.attachPoints.noseGear.z;
  const ngR = spec.lengthM > 55 ? 0.50 : 0.38;
  const ngH = Math.max(1.2, spec.bellyClearanceM + 0.4 - ngR);
  const ngStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, ngH, 10), chromeMat);
  ngStrut.position.set(0, ngR + ngH * 0.5, ngZ);
  gear.add(ngStrut);
  addWheel(-0.34, ngR, ngZ, ngR, 0.24);
  addWheel(0.34, ngR, ngZ, ngR, 0.24);

  // Main Gear Bogies (3-axle 6-wheel on B77W, 2-axle 4-wheel on B789, 1-axle on A321/B738)
  const mgR = spec.lengthM > 55 ? 0.64 : 0.50;
  const mgH = Math.max(1.4, spec.bellyClearanceM + 0.6 - mgR);
  [-1, 1].forEach(side => {
    const gx = side * spec.mainGearTrackX;
    const gz = spec.mainGearZOffset;
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.24, mgH, 10), chromeMat);
    strut.position.set(gx, mgR + mgH * 0.5, gz);
    gear.add(strut);
    const axles = spec.mainGearAxles;
    const sp = mgR * 2.2;
    if (axles > 1) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.22, sp * (axles - 1) + 0.45), darkMetalMat);
      beam.position.set(gx, mgR, gz);
      gear.add(beam);
    }
    for (let a = 0; a < axles; a++) {
      const az = gz + (a - (axles - 1) * 0.5) * sp;
      addWheel(gx - 0.52, mgR, az, mgR, 0.34);
      addWheel(gx + 0.52, mgR, az, mgR, 0.34);
    }
  });
  return gear;
}

// =====================================================================
// HIGH-VISIBILITY JET BLAST & ENGINE INGESTION HAZARD ZONE (3D FLOOR CARPET + PLUMES)
// =====================================================================
let blastCarpetTex = null;
function getJetBlastCarpetTexture() {
  if (blastCarpetTex) return blastCarpetTex;
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 1024;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 1024);

  // Tapered trapezoidal Jet Blast Danger Envelope (narrow at engines top y=0 -> wide aft bottom y=1024)
  const drawTrapezoid = (pad) => {
    ctx.beginPath();
    ctx.moveTo(128 - pad, 12);
    ctx.lineTo(384 + pad, 12);
    ctx.lineTo(498 - pad * 0.3, 1004);
    ctx.lineTo(14 + pad * 0.3, 1004);
    ctx.closePath();
  };

  // High-contrast Red -> Orange -> Amber radial heat gradient
  const grd = ctx.createLinearGradient(0, 0, 0, 1024);
  grd.addColorStop(0.0, 'rgba(239, 68, 68, 0.82)');
  grd.addColorStop(0.35, 'rgba(249, 115, 22, 0.68)');
  grd.addColorStop(0.72, 'rgba(245, 158, 11, 0.45)');
  grd.addColorStop(1.0, 'rgba(234, 179, 8, 0.14)');
  drawTrapezoid(0);
  ctx.fillStyle = grd;
  ctx.fill();

  // Crisp glowing red/yellow warning border
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.92)';
  ctx.setLineDash([28, 18]);
  ctx.stroke();
  ctx.setLineDash([]);

  // High-contrast directional blast chevrons (>>> pointing aft away from engines!)
  for (let y = 90; y <= 880; y += 110) {
    const progress = y / 1024;
    const halfW = 105 + progress * 115;
    ctx.strokeStyle = y < 480 ? 'rgba(255, 255, 255, 0.88)' : 'rgba(254, 240, 138, 0.78)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(256 - halfW, y - 34);
    ctx.lineTo(256, y + 26);
    ctx.lineTo(256 + halfW, y - 34);
    ctx.stroke();
  }

  // Bold readable caution text inside danger zone
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 44px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚠ JET BLAST DANGER', 256, 260);
  ctx.fillStyle = '#FEF08A';
  ctx.font = '800 34px "Hiragino Sans", "Noto Sans JP", sans-serif';
  ctx.fillText('ブラスト危険区域 (100m)', 256, 314);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 30px "Arial", sans-serif';
  ctx.fillText('KEEP CLEAR — NO ENTRY', 256, 610);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  blastCarpetTex = tex;
  return tex;
}

export function createJetBlastHazardZone3D(spec = AIRCRAFT_3D_SPECS.B789) {
  const grp = new THREE.Group();
  grp.name = 'jet_blast_hazard_zone';
  const blastLen = spec.blastLenM || 68;
  const blastW = spec.blastWidthM || 28;
  const halfL = (spec.lengthM || 50) * 0.5;
  const engX = spec.engineSpanX || 8.0;
  const engZ = spec.engineZOffset || 3.5;

  // 1. High-Visibility Rear Jet Blast Floor Carpet (starts right behind engines & sweeps aft!)
  const carpetMat = new THREE.MeshBasicMaterial({
    map: getJetBlastCarpetTexture(),
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -7,
    polygonOffsetUnits: -7
  });
  const carpet = new THREE.Mesh(new THREE.PlaneGeometry(blastW, blastLen), carpetMat);
  carpet.rotation.x = -Math.PI / 2;
  // Local +Z is Nose -> aft is -Z! Rotate Z by PI so canvas top (narrow) sits near engines (+Z side) and bottom fans out to -Z!
  carpet.rotation.z = Math.PI;
  carpet.position.set(0, 0.24, -(halfL * 0.15 + blastLen * 0.5));
  carpet.renderOrder = 8;
  grp.add(carpet);

  // 2. Twin Volumetric Translucent 3D Exhaust Cones behind Left & Right Engines
  const plumes = [];
  const plumeMat = new THREE.MeshBasicMaterial({
    color: 0xff5500,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  [-1, 1].forEach(side => {
    const pLen = blastLen * 0.52;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(blastW * 0.22, pLen, 16, 1, true), plumeMat);
    cone.rotation.x = -Math.PI / 2; // Tip at engines (+Z), wide open end aft (-Z)
    cone.position.set(side * engX, 2.5, engZ - 4.5 - pLen * 0.5);
    cone.renderOrder = 9;
    grp.add(cone);
    plumes.push(cone);
  });

  // 3. Forward Engine Ingestion Danger Semicircles (Red Suction Zones ahead of BOTH intakes!)
  const ingestMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -7
  });
  const ingestRingMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -8
  });
  const suctR = spec.lengthM > 55 ? 8.5 : 6.0;
  [-1, 1].forEach(side => {
    const semi = new THREE.Mesh(new THREE.CircleGeometry(suctR, 20, 0, Math.PI), ingestMat);
    semi.rotation.x = -Math.PI / 2;
    semi.rotation.z = Math.PI; // Bulges forward (+Z) ahead of engine intake!
    semi.position.set(side * engX, 0.26, engZ + 3.2);
    semi.renderOrder = 8;
    grp.add(semi);

    const arc = new THREE.Mesh(new THREE.RingGeometry(suctR - 0.35, suctR, 20, 1, 0, Math.PI), ingestRingMat);
    arc.rotation.x = -Math.PI / 2;
    arc.rotation.z = Math.PI;
    arc.position.set(side * engX, 0.28, engZ + 3.2);
    arc.renderOrder = 9;
    grp.add(arc);
  });

  grp.userData = { carpetMat, plumeMat, ingestMat, plumes };
  return grp;
}

export function animateJetBlastZone3D(zoneGrp, timeSec, active = true) {
  if (!zoneGrp) return;
  zoneGrp.visible = Boolean(active);
  if (!active || !zoneGrp.userData) return;
  const pulse = 0.5 + 0.5 * Math.sin(timeSec * 6.5);
  if (zoneGrp.userData.carpetMat) zoneGrp.userData.carpetMat.opacity = 0.72 + pulse * 0.24;
  if (zoneGrp.userData.plumeMat) zoneGrp.userData.plumeMat.opacity = 0.16 + pulse * 0.14;
  if (zoneGrp.userData.ingestMat) zoneGrp.userData.ingestMat.opacity = 0.34 + pulse * 0.22;
}

// =====================================================================
// MAIN REAL-GLB AIRLINER FACTORY (SYNCHRONOUS RETURN + ASYNC GLB HYDRATION)
// =====================================================================
export function createProceduralAirliner3D(acId = 'B789', liveryId = null) {
  const key = resolveAircraft3DType(acId);
  const spec = AIRCRAFT_3D_SPECS[key];
  const livery = AIRLINE_LIVERIES[liveryId] || AIRLINE_LIVERIES[spec.defaultLivery] || AIRLINE_LIVERIES.ANA;

  const root = new THREE.Group();
  root.name = `aircraft_${spec.id}_${livery.id}`;
  root.userData = {
    spec,
    livery,
    attachPoints: spec.attachPoints,
    fans: [],
    lights: {}
  };

  // 1. Detailed Landing Gear resting cleanly at y = 0
  const gearGroup = buildLandingGearGroup(spec);
  root.add(gearGroup);
  root.userData.gearGroup = gearGroup;

  // 2. Navigation, Anti-Collision Beacons & Strobe Lights at exact airframe bounds
  const halfL = spec.lengthM * 0.5;
  const halfSpan = spec.wingspanM * 0.5;
  const bodyTopY = spec.bellyClearanceM + spec.fuseRadius * 2.05;

  const beaconTop = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff1e2a }));
  beaconTop.position.set(0, bodyTopY + 0.15, halfL * 0.18);
  root.add(beaconTop);

  const beaconBot = new THREE.Mesh(new THREE.SphereGeometry(0.30, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff1e2a }));
  beaconBot.position.set(0, spec.bellyClearanceM - 0.1, -halfL * 0.08);
  root.add(beaconBot);

  const tailStrobe = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  tailStrobe.position.set(0, spec.bellyClearanceM + spec.fuseRadius * 1.1, -halfL + 0.4);
  root.add(tailStrobe);

  [-1, 1].forEach(side => {
    const navCol = side === 1 ? 0xff2a2a : 0x10e865;
    const nav = new THREE.Mesh(new THREE.SphereGeometry(0.34, 8, 8), new THREE.MeshBasicMaterial({ color: navCol }));
    nav.position.set(side * halfSpan, spec.bellyClearanceM + spec.fuseRadius * 1.15, -halfL * 0.24);
    root.add(nav);
    const stb = new THREE.Mesh(new THREE.SphereGeometry(0.36, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    stb.position.set(side * halfSpan, spec.bellyClearanceM + spec.fuseRadius * 1.15, -halfL * 0.28);
    root.add(stb);
    root.userData.lights[`strobe_${side > 0 ? 'L' : 'R'}`] = stb;
  });
  root.userData.lights.beaconTop = beaconTop;
  root.userData.lights.beaconBot = beaconBot;
  root.userData.lights.tailStrobe = tailStrobe;

  // 3. Livery Airline Identification Fin Emblem + Accent Band (floating cleanly flush on tail/fuselage)
  const liveryHolder = new THREE.Group();
  const bannerTex = makeLiveryBannerTex(livery);
  const bannerMat = new THREE.MeshStandardMaterial({
    map: bannerTex,
    roughness: 0.3,
    metalness: 0.15,
    side: THREE.DoubleSide
  });
  const badgeW = spec.lengthM > 55 ? 6.2 : 4.2;
  const badgeH = badgeW * 0.38;
  // Crisp airline livery sign mounted cleanly above vertical stabilizer shoulder (readable left-to-right on BOTH sides!)
  [-1, 1].forEach(side => {
    const finBadge = new THREE.Mesh(new THREE.PlaneGeometry(badgeW, badgeH), bannerMat);
    finBadge.rotation.y = side === 1 ? Math.PI / 2 : -Math.PI / 2;
    finBadge.position.set(side * 0.42, spec.tailHeightM * 0.72, -halfL * 0.78);
    liveryHolder.add(finBadge);
  });
  root.add(liveryHolder);

  // 4. Async-Hydrated REAL Sculpted GLB Airframe (B787 / A350 / A320 / B737 from amvlab/aircraft-models!)
  const airframeHolder = new THREE.Group();
  root.add(airframeHolder);

  loadRawGlbModel(spec.glbFile)
    .then(templateScene => {
      const model = templateScene.clone(true);
      // All 4 amvlab GLBs have nose along +X and +Y up -> rotateY(-PI/2) aligns Nose cleanly onto +Z!
      const pivot = new THREE.Group();
      model.rotation.y = -Math.PI / 2;
      pivot.add(model);
      pivot.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(pivot);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      // Scale realistically to target length & wingspan (preserving natural sculpted aircraft proportions!)
      const scaleZ = spec.lengthM / Math.max(1, size.z);
      const scaleX = spec.wingspanM / Math.max(1, size.x);
      const scaleY = (scaleZ + scaleX) * 0.5;
      model.scale.set(scaleX, scaleY, scaleZ);
      pivot.updateMatrixWorld(true);

      const box2 = new THREE.Box3().setFromObject(pivot);
      const c2 = new THREE.Vector3();
      box2.getCenter(c2);

      // Center X/Z at (0,0) and lift lowest point to spec.groundLiftM so landing gear meets tarmac cleanly!
      pivot.position.set(-c2.x, spec.groundLiftM - box2.min.y, -c2.z);

      // Brighten GLB airframe materials so real sculpted fuselage & wings look crisp pearl-white in daylight
      const liveryTint = livery.id === 'PEACH' ? 0xffeef7 : (livery.id === 'JETSTAR' ? 0xf1f5f9 : 0xffffff);
      model.traverse(obj => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
          if (obj.material) {
            obj.material = obj.material.clone();
            obj.material.color.setHex(liveryTint);
            obj.material.emissive = new THREE.Color(0x283242);
            obj.material.emissiveIntensity = 0.35;
            obj.material.roughness = 0.34;
            obj.material.metalness = 0.08;
          }
        }
      });

      airframeHolder.add(pivot);
    })
    .catch(() => {
      // Ultra-minimal clean aerodynamic fallback ONLY if GLB somehow unavailable
      const fallback = new THREE.Mesh(
        new THREE.CapsuleGeometry(spec.fuseRadius, spec.lengthM * 0.72, 12, 24),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 })
      );
      fallback.rotation.x = Math.PI / 2;
      fallback.position.y = spec.bellyClearanceM + spec.fuseRadius;
      airframeHolder.add(fallback);
    });

  return root;
}

export function animateAircraft3D(acGroup, timeSec, opts = {}) {
  if (!acGroup || !acGroup.userData) return;
  const beaconOn = opts.beaconOn !== false;
  const strobeOn = opts.strobeOn !== false;
  const lights = acGroup.userData.lights || {};
  const beaconFlash = beaconOn && (Math.sin(timeSec * 5.2) > 0.45);
  if (lights.beaconTop) lights.beaconTop.visible = beaconFlash;
  if (lights.beaconBot) lights.beaconBot.visible = beaconFlash;

  const strobeCycle = timeSec % 1.4;
  const strobeFlash = strobeOn && (strobeCycle < 0.09 || (strobeCycle > 0.18 && strobeCycle < 0.26));
  if (lights.strobe_L) lights.strobe_L.visible = strobeFlash;
  if (lights.strobe_R) lights.strobe_R.visible = strobeFlash;
  if (lights.tailStrobe) lights.tailStrobe.visible = strobeFlash;
}
