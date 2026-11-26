// Commercial 3D Airliner Library powered by real sculpted GLB models (amvlab/aircraft-models, CC-BY 4.0)
// + Vendored Three.js GLTFLoader (100% Offline in both PWA & Single-File HTML)
// + Authentic Flush 3D Japanese Airline Liveries (ANA, JAL, Peach, Jetstar) projected directly onto Fuselage & Swept Tail Fin
// + Animated Openable Cargo/Cabin Doors + Exact Textbook GSE Attach Points + High-Visibility Jet Blast Hazard Zone
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
    subtitle: 'Inspiration of JAPAN',
    regPrefix: 'JA8',
    wingletHex: 0x0b3b8c,
    bellyHex: 0xd8e0ea
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
    subtitle: '',
    regPrefix: 'JA7',
    wingletHex: 0xd6001c,
    bellyHex: 0xe6ebf2
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
    subtitle: 'FLY PEACH',
    regPrefix: 'JA9',
    wingletHex: 0xc8167a,
    bellyHex: 0xf3e8ff
  },
  JETSTAR: {
    id: 'JETSTAR',
    name: 'Jetstar Japan (LCC)',
    shortName: 'Jetstar',
    badgeColor: '#FF5000',
    primaryHex: 0xff5000,
    secondaryHex: 0x334155,
    accentCss: '#FF5000',
    title: 'Jetstar',
    subtitle: 'Jetstar Japan',
    regPrefix: 'JA0',
    wingletHex: 0xff5000,
    bellyHex: 0xcbd5e1
  }
};

function buildAttachPoints(spec) {
  const halfL = spec.lengthM * 0.5;
  const r = spec.fuseRadius;
  const zFromNose = m => Number((halfL - m).toFixed(2));
  const raw = spec.attachFromNose;
  return {
    doorL1:   { metersFromNose: raw.doorL1.m,   x: Number((r + 0.08).toFixed(2)),  y: raw.doorL1.y,   z: zFromNose(raw.doorL1.m),   dockX: Number((r + 1.35).toFixed(2)),  side: 'port' },
    doorL2:   { metersFromNose: raw.doorL2.m,   x: Number((r + 0.08).toFixed(2)),  y: raw.doorL2.y,   z: zFromNose(raw.doorL2.m),   dockX: Number((r + 1.35).toFixed(2)),  side: 'port' },
    doorL4:   { metersFromNose: raw.doorL4.m,   x: Number((r + 0.05).toFixed(2)),  y: raw.doorL4.y,   z: zFromNose(raw.doorL4.m),   dockX: Number((r + 1.55).toFixed(2)),  side: 'port' },
    doorR1:   { metersFromNose: raw.doorR1.m,   x: Number(-(r + 0.08).toFixed(2)), y: raw.doorR1.y,   z: zFromNose(raw.doorR1.m),   dockX: Number(-(r + 1.55).toFixed(2)), side: 'starboard' },
    cargoFwd: { metersFromNose: raw.cargoFwd.m, x: Number(-(r + 0.06).toFixed(2)), y: raw.cargoFwd.y, z: zFromNose(raw.cargoFwd.m), dockX: Number(-(r + 2.45).toFixed(2)), side: 'starboard', gseKind: spec.gseCargoType },
    cargoAft: { metersFromNose: raw.cargoAft.m, x: Number(-(r + 0.06).toFixed(2)), y: raw.cargoAft.y, z: zFromNose(raw.cargoAft.m), dockX: Number(-(r + 2.45).toFixed(2)), side: 'starboard', gseKind: spec.gseCargoType },
    bulkDoor: { metersFromNose: raw.bulkDoor.m, x: Number(-(r * 0.92).toFixed(2)), y: raw.bulkDoor.y, z: zFromNose(raw.bulkDoor.m), dockX: Number(-(r + 2.15).toFixed(2)), side: 'starboard' },
    fuelPort: { metersFromNose: raw.fuelPort.m, x: Number(-raw.fuelPort.spanX.toFixed(2)), y: raw.fuelPort.y, z: zFromNose(raw.fuelPort.m), dockX: Number(-raw.fuelPort.spanX.toFixed(2)), side: 'starboard' },
    noseGear: { metersFromNose: raw.noseGear.m, x: 0, y: 0.55, z: zFromNose(raw.noseGear.m), dockZ: Number((zFromNose(raw.noseGear.m) + 5.6).toFixed(2)), side: 'center' },
    gpuPort:  { metersFromNose: raw.gpuPort.m,  x: Number(-(r * 0.78).toFixed(2)), y: 1.55, z: zFromNose(raw.gpuPort.m), dockX: Number(-(r + 3.2).toFixed(2)), side: 'starboard' },
    lavPort:  { metersFromNose: raw.lavPort.m,  x: Number(-(r * 0.80).toFixed(2)), y: 2.15, z: zFromNose(raw.lavPort.m), dockX: Number(-(r + 2.8).toFixed(2)), side: 'starboard' },
    waterPort:{ metersFromNose: raw.waterPort.m,x: Number((r * 0.80).toFixed(2)),  y: 2.15, z: zFromNose(raw.waterPort.m),dockX: Number((r + 2.8).toFixed(2)),  side: 'port' }
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
    groundLiftM: 1.15,
    engineSpanX: 9.8,
    engineZOffset: 4.5,
    mainGearAxles: 2,
    mainGearTrackX: 4.9,
    mainGearZOffset: -2.2,
    gseCargoType: 'highloader',
    uldCode: 'AKE',
    defaultLivery: 'ANA',
    reg: 'JA899A',
    blastLenM: 76,
    blastWidthM: 32,
    attachFromNose: {
      doorL1:   { m: 7.8,  y: 4.85 },
      doorL2:   { m: 19.6, y: 4.85 },
      doorL4:   { m: 51.2, y: 4.85 },
      doorR1:   { m: 7.8,  y: 4.85 },
      cargoFwd: { m: 15.8, y: 2.75 },
      cargoAft: { m: 43.2, y: 2.85 },
      bulkDoor: { m: 49.4, y: 2.65 },
      fuelPort: { m: 31.8, spanX: 15.2, y: 3.55 },
      noseGear: { m: 6.4 },
      gpuPort:  { m: 5.2 },
      lavPort:  { m: 54.0 },
      waterPort:{ m: 47.5 }
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
    mainGearAxles: 3,
    mainGearTrackX: 5.5,
    mainGearZOffset: -3.1,
    gseCargoType: 'highloader',
    uldCode: 'AKE',
    defaultLivery: 'JAL',
    reg: 'JA738J',
    blastLenM: 88,
    blastWidthM: 36,
    attachFromNose: {
      doorL1:   { m: 8.6,  y: 5.15 },
      doorL2:   { m: 21.8, y: 5.15 },
      doorL4:   { m: 60.5, y: 5.15 },
      doorR1:   { m: 8.6,  y: 5.15 },
      cargoFwd: { m: 18.2, y: 2.95 },
      cargoAft: { m: 50.8, y: 3.05 },
      bulkDoor: { m: 57.6, y: 2.85 },
      fuelPort: { m: 37.5, spanX: 16.5, y: 3.85 },
      noseGear: { m: 7.2 },
      gpuPort:  { m: 5.8 },
      lavPort:  { m: 63.2 },
      waterPort:{ m: 56.2 }
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
    // A321 uses Low-Deck High-Lift Loader for AKH (LD3-45) containers in Fwd/Aft holds + Belt Loader at Bulk!
    gseCargoType: 'highloader',
    uldCode: 'AKH',
    defaultLivery: 'PEACH',
    reg: 'JA901P',
    blastLenM: 58,
    blastWidthM: 22,
    attachFromNose: {
      doorL1:   { m: 5.4,  y: 3.45 },
      doorL2:   { m: 16.5, y: 3.45 },
      doorL4:   { m: 37.8, y: 3.45 },
      doorR1:   { m: 5.4,  y: 3.45 },
      cargoFwd: { m: 11.8, y: 2.15 },
      cargoAft: { m: 30.8, y: 2.22 },
      bulkDoor: { m: 35.4, y: 2.15 },
      fuelPort: { m: 22.8, spanX: 10.2, y: 2.55 },
      noseGear: { m: 5.0 },
      gpuPort:  { m: 4.1 },
      lavPort:  { m: 38.8 },
      waterPort:{ m: 35.8 }
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
    // B737-800 is strictly Bulk-Loaded (Belt Loader ONLY — never High-Lift Loader per textbook!)
    gseCargoType: 'belt',
    uldCode: 'BULK',
    defaultLivery: 'JAL',
    reg: 'JA342J',
    blastLenM: 54,
    blastWidthM: 21,
    attachFromNose: {
      doorL1:   { m: 4.9,  y: 2.85 },
      doorL2:   { m: 31.5, y: 2.85 },
      doorL4:   { m: 33.2, y: 2.85 },
      doorR1:   { m: 4.9,  y: 2.85 },
      cargoFwd: { m: 10.2, y: 1.65 },
      cargoAft: { m: 27.6, y: 1.75 },
      bulkDoor: { m: 31.2, y: 1.72 },
      fuelPort: { m: 20.6, spanX: 9.8, y: 2.15 },
      noseGear: { m: 4.6 },
      gpuPort:  { m: 3.8 },
      lavPort:  { m: 34.2 },
      waterPort:{ m: 31.8 }
    }
  }
};

// Derived fleet types: real 1:1 length/span/height on the nearest sculpted GLB airframe,
// attach points scaled from the parent type so GSE always docks at the correct doors.
function deriveSpec(baseId, o) {
  const b = RAW_SPECS[baseId];
  const kL = o.lengthM / b.lengthM;
  const kR = o.fuseRadius / b.fuseRadius;
  const kY = (o.bellyClearanceM ?? b.bellyClearanceM * kR) / b.bellyClearanceM;
  const att = {};
  Object.entries(b.attachFromNose).forEach(([key, v]) => {
    att[key] = { ...v, m: Number((v.m * kL).toFixed(2)) };
    if (v.y !== undefined) att[key].y = Number((v.y * (key.startsWith('door') ? (kR * 0.5 + kY * 0.5) : kY)).toFixed(2));
    if (v.spanX !== undefined) att[key].spanX = Number((v.spanX * (o.wingspanM / b.wingspanM)).toFixed(2));
  });
  return {
    ...b,
    bellyClearanceM: b.bellyClearanceM * kY,
    groundLiftM: b.groundLiftM * kY,
    engineSpanX: b.engineSpanX * (o.wingspanM / b.wingspanM),
    blastLenM: Math.round(b.blastLenM * Math.sqrt(kL)),
    ...o,
    attachFromNose: { ...att, ...(o.attachFromNose || {}) }
  };
}
Object.assign(RAW_SPECS, {
  A320: deriveSpec('A321', { id: 'A320', wbId: 'A320', name: 'Airbus A320', shortName: 'A320', lengthM: 37.57, wingspanM: 35.8, tailHeightM: 11.76, fuseRadius: 1.98, defaultLivery: 'ANA', reg: 'JA8385' }),
  E190: deriveSpec('B738', { id: 'E190', wbId: 'E190', name: 'Embraer E190', shortName: 'E190', lengthM: 36.24, wingspanM: 28.72, tailHeightM: 10.57, fuseRadius: 1.5, bellyClearanceM: 0.95, gseCargoType: 'belt', uldCode: 'BULK', defaultLivery: 'JAL', reg: 'JA245J' }),
  B788: deriveSpec('B789', { id: 'B788', wbId: 'B788', name: 'Boeing 787-8', shortName: 'B787-8', lengthM: 56.7, wingspanM: 60.1, tailHeightM: 16.9, fuseRadius: 2.88, defaultLivery: 'ANA', reg: 'JA801A' }),
  B763: deriveSpec('B789', { id: 'B763', wbId: 'B763', name: 'Boeing 767-300ER', shortName: 'B767-300', lengthM: 54.9, wingspanM: 47.6, tailHeightM: 15.85, fuseRadius: 2.51, defaultLivery: 'JAL', reg: 'JA623J' }),
  A359: deriveSpec('B77W', { id: 'A359', wbId: 'A359', name: 'Airbus A350-900', shortName: 'A350-900', lengthM: 66.8, wingspanM: 64.75, tailHeightM: 17.05, fuseRadius: 2.98, defaultLivery: 'JAL', reg: 'JA01XJ' }),
  B77F: deriveSpec('B77W', { id: 'B77F', wbId: 'B77F', name: 'Boeing 777F', shortName: 'B777F', lengthM: 63.7, wingspanM: 64.8, tailHeightM: 18.6, fuseRadius: 3.1, freighter: true, gseCargoType: 'mdl', uldCode: 'PMC', defaultLivery: 'ANA', reg: 'JA771F' })
});

export const AIRCRAFT_3D_SPECS = Object.fromEntries(
  Object.entries(RAW_SPECS).map(([k, sp]) => [k, { ...sp, attachPoints: buildAttachPoints(sp) }])
);

export function resolveAircraft3DType(acId) {
  if (!acId) return 'B789';
  const up = String(acId).toUpperCase();
  if (AIRCRAFT_3D_SPECS[up]) return up;
  if (up === 'B773') return 'B77W';
  return 'B738';
}

export function getAircraftAttachPoints(acId) {
  return AIRCRAFT_3D_SPECS[resolveAircraft3DType(acId)].attachPoints;
}

// =====================================================================
// ASYNC GLB MODEL LOADER + BAKED METER-SCALE GEOMETRY CACHE
// =====================================================================
const gltfLoader = new GLTFLoader();
const glbCache = new Map();       // glbFile -> Promise<THREE.Object3D>
const bakedSpecCache = new Map(); // spec.id -> Promise<{ geometry, finBox, finSweep, fuseBox }>

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
    gltfLoader.load(`./vendor/models/${glbFile}`, gltf => resolve(gltf.scene), undefined, reject);
  });

  glbCache.set(glbFile, prom);
  return prom;
}

function loadBakedAirframeSpec(spec) {
  if (bakedSpecCache.has(spec.id)) return bakedSpecCache.get(spec.id);

  const prom = loadRawGlbModel(spec.glbFile).then(templateScene => {
    const cloned = templateScene.clone(true);
    // Align nose onto +Z (+Y up, +X Port/Left, -X Starboard/Right) BEFORE measuring & scaling!
    const rotWrap = new THREE.Group();
    cloned.rotation.y = -Math.PI / 2;
    rotWrap.add(cloned);
    rotWrap.updateMatrixWorld(true);

    const box0 = new THREE.Box3().setFromObject(rotWrap);
    const size0 = new THREE.Vector3();
    box0.getSize(size0);

    // Apply scale on outer unrotated wrapper so X = exact wingspanM and Z = exact lengthM!
    const scaleX = spec.wingspanM / Math.max(1, size0.x);
    const scaleZ = spec.lengthM / Math.max(1, size0.z);
    const scaleY = (scaleX + scaleZ) * 0.5;

    const scaleWrap = new THREE.Group();
    scaleWrap.scale.set(scaleX, scaleY, scaleZ);
    scaleWrap.add(rotWrap);
    scaleWrap.updateMatrixWorld(true);

    const box1 = new THREE.Box3().setFromObject(scaleWrap);
    const center1 = new THREE.Vector3();
    box1.getCenter(center1);
    const shiftX = -center1.x;
    const shiftY = spec.groundLiftM - box1.min.y;
    const shiftZ = -center1.z;

    const shiftMat = new THREE.Matrix4().makeTranslation(shiftX, shiftY, shiftZ);

    // Merge/extract transformed mesh geometry into exact aircraft meter space
    let bakedGeo = null;
    scaleWrap.traverse(obj => {
      if (obj.isMesh && obj.geometry && !bakedGeo) {
        const g = obj.geometry.clone();
        g.applyMatrix4(obj.matrixWorld);
        g.applyMatrix4(shiftMat);
        g.computeVertexNormals();
        g.computeBoundingBox();
        bakedGeo = g;
      }
    });

    if (!bakedGeo) throw new Error('Empty GLB geometry');

    // Measure exact Fuselage & Vertical Tail Fin bounds directly from baked meter vertices!
    const pos = bakedGeo.attributes.position;
    const halfL = spec.lengthM * 0.5;
    let fuseMinY = Infinity, fuseMaxY = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
      // Forward fuselage station free of wings & dorsal antennas
      if (pz > halfL * 0.14 && pz < halfL * 0.58 && Math.abs(px) < spec.fuseRadius + 0.55) {
        if (py < fuseMinY) fuseMinY = py;
        if (py > fuseMaxY) fuseMaxY = py;
      }
    }
    if (!Number.isFinite(fuseMinY)) {
      fuseMinY = spec.bellyClearanceM;
      fuseMaxY = spec.bellyClearanceM + spec.fuseRadius * 2.0;
    }

    let finMinY = Infinity, finMaxY = -Infinity, finMinZ = Infinity, finMaxZ = -Infinity;
    const finVerts = [];
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
      if (Math.abs(px) < 0.92 && pz < -halfL * 0.22 && py > fuseMaxY + 0.18) {
        if (py < finMinY) finMinY = py;
        if (py > finMaxY) finMaxY = py;
        if (pz < finMinZ) finMinZ = pz;
        if (pz > finMaxZ) finMaxZ = pz;
        finVerts.push([py, pz]);
      }
    }
    if (!Number.isFinite(finMinY)) {
      finMinY = fuseMaxY + 0.2;
      finMaxY = spec.tailHeightM;
      finMinZ = -halfL;
      finMaxZ = -halfL * 0.55;
    }
    const finSpanY = Math.max(1.0, finMaxY - finMinY);
    let rootFrontZ = -Infinity, rootBackZ = Infinity;
    let tipFrontZ = -Infinity, tipBackZ = Infinity;
    for (const [fy, fz] of finVerts) {
      if (fy <= finMinY + finSpanY * 0.22) {
        if (fz > rootFrontZ) rootFrontZ = fz;
        if (fz < rootBackZ) rootBackZ = fz;
      }
      if (fy >= finMaxY - finSpanY * 0.20) {
        if (fz > tipFrontZ) tipFrontZ = fz;
        if (fz < tipBackZ) tipBackZ = fz;
      }
    }
    if (!Number.isFinite(rootFrontZ)) { rootFrontZ = finMaxZ; rootBackZ = finMinZ; }
    if (!Number.isFinite(tipFrontZ)) { tipFrontZ = finMaxZ - 3.0; tipBackZ = finMinZ; }

    return {
      geometry: bakedGeo,
      finBox: new THREE.Vector4(finMinY, finMaxY, finMinZ, finMaxZ),
      finSweep: new THREE.Vector4(rootFrontZ, rootBackZ, tipFrontZ, tipBackZ),
      fuseBox: new THREE.Vector4(fuseMinY, fuseMaxY, halfL, spec.fuseRadius + 0.55)
    };
  });

  bakedSpecCache.set(spec.id, prom);
  return prom;
}

// =====================================================================
// AUTHENTIC JAPANESE AIRLINE LIVERY PROCEDURAL CANVAS TEXTURES
//   1. Tail Fin Background (chordFrac x finV -> swept stripes align to fin leading edge on BOTH sides!)
//   2. Tail Fin Emblem/Logo (alpha-blended left-to-right on BOTH sides of swept tail!)
//   3. Fuselage Symmetric Base (windshield visor, oval cabin windows, doors, cheatlines)
//   4. Fuselage Forward Title + Aft Registration (alpha-blended left-to-right on BOTH sides!)
// =====================================================================
const liveryTexSetCache = new Map();

function drawTsurumaruCrane(ctx, cx, cy, r) {
  // Authentic JAL Red Circle (鶴丸 Tsurumaru) + Stylized White Crane Wings + crisp JAL lettering
  ctx.save();
  ctx.fillStyle = '#D6001C';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // White curved inner wing cutouts forming the iconic crane silhouette
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) {
    ctx.lineWidth = r * (0.065 - i * 0.01);
    ctx.beginPath();
    ctx.arc(cx - r * 0.12, cy - r * 0.06, r * (0.78 - i * 0.11), -Math.PI * 0.78, -Math.PI * 0.18);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + r * 0.12, cy - r * 0.06, r * (0.78 - i * 0.11), -Math.PI * 0.82, -Math.PI * 0.22);
    ctx.stroke();
  }
  // Crane head & neck silhouette at center-top
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(cx - r * 0.06, cy + r * 0.18);
  ctx.quadraticCurveTo(cx - r * 0.02, cy - r * 0.36, cx + r * 0.22, cy - r * 0.44);
  ctx.quadraticCurveTo(cx + r * 0.04, cy - r * 0.16, cx + r * 0.08, cy + r * 0.18);
  ctx.closePath();
  ctx.fill();

  // Bold white "JAL" across lower portion of the red circle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${Math.round(r * 0.56)}px "Arial Black", "Helvetica Neue", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JAL', cx, cy + r * 0.44);
  ctx.restore();
}

function drawOrangeStar(ctx, cx, cy, outerR, innerR, fill = '#FF5000') {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(ang) * rad;
    const y = cy + Math.sin(ang) * rad;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function getLiveryTextureSet(livery, regStr, freighter = false) {
  const key = `${livery.id}_${regStr}_${freighter ? 'F' : 'P'}`;
  if (liveryTexSetCache.has(key)) return liveryTexSetCache.get(key);

  // 1. TAIL FIN BACKGROUND TEXTURE (512x512: u = chordFrac [0=leading edge .. 1=trailing edge], v = height [0=bottom .. 1=top])
  // Note: Canvas y=0 corresponds to v=1 (top of fin), y=512 corresponds to v=0 (root of fin)
  const cTailBg = document.createElement('canvas');
  cTailBg.width = 512; cTailBg.height = 512;
  const gBg = cTailBg.getContext('2d');

  if (livery.id === 'ANA') {
    // Classic ANA Triton Blue (#0B3B8C) forward + Mohican Blue (#1EA1E8) aft diagonal stripe parallel to leading edge!
    gBg.fillStyle = '#FFFFFF';
    gBg.fillRect(0, 0, 512, 512);
    // Leading-edge white fin cap trim, then rich Triton Blue body
    gBg.fillStyle = '#0B3B8C';
    gBg.beginPath();
    gBg.moveTo(22, 0);
    gBg.lineTo(395, 0);
    gBg.lineTo(365, 512);
    gBg.lineTo(18, 512);
    gBg.closePath();
    gBg.fill();
    // Aft Mohican Light-Blue stripe
    gBg.fillStyle = '#1EA1E8';
    gBg.beginPath();
    gBg.moveTo(408, 0);
    gBg.lineTo(512, 0);
    gBg.lineTo(512, 512);
    gBg.lineTo(380, 512);
    gBg.closePath();
    gBg.fill();
  } else if (livery.id === 'JAL') {
    // Pure glossy pearl-white JAL tail fin
    gBg.fillStyle = '#FFFFFF';
    gBg.fillRect(0, 0, 512, 512);
  } else if (livery.id === 'PEACH') {
    // Peach magenta/plum swept fin with soft white/pink curves
    const grd = gBg.createLinearGradient(0, 0, 512, 512);
    grd.addColorStop(0.0, '#D81B80');
    grd.addColorStop(0.62, '#B5177E');
    grd.addColorStop(1.0, '#6A1B9A');
    gBg.fillStyle = grd;
    gBg.fillRect(0, 0, 512, 512);
    gBg.fillStyle = 'rgba(255, 255, 255, 0.20)';
    gBg.beginPath();
    gBg.arc(460, 420, 220, 0, Math.PI * 2);
    gBg.fill();
  } else {
    // Jetstar dark charcoal-silver tail fin with vibrant orange lower/leading accent
    gBg.fillStyle = '#27303F';
    gBg.fillRect(0, 0, 512, 512);
    gBg.fillStyle = '#FF5000';
    gBg.beginPath();
    gBg.moveTo(0, 390);
    gBg.lineTo(512, 290);
    gBg.lineTo(512, 512);
    gBg.lineTo(0, 512);
    gBg.closePath();
    gBg.fill();
  }

  // 2. TAIL FIN EMBLEM OVERLAY TEXTURE (512x512 RGBA — always projected left-to-right on BOTH sides!)
  const cTailLogo = document.createElement('canvas');
  cTailLogo.width = 512; cTailLogo.height = 512;
  const gLogo = cTailLogo.getContext('2d');
  gLogo.clearRect(0, 0, 512, 512);

  if (livery.id === 'ANA') {
    gLogo.save();
    gLogo.fillStyle = '#FFFFFF';
    gLogo.font = 'italic 900 132px "Arial Black", "Helvetica Neue", sans-serif';
    gLogo.textAlign = 'center';
    gLogo.textBaseline = 'middle';
    gLogo.fillText('ANA', 248, 225);
    gLogo.restore();
  } else if (livery.id === 'JAL') {
    drawTsurumaruCrane(gLogo, 256, 256, 185);
  } else if (livery.id === 'PEACH') {
    gLogo.fillStyle = '#FFFFFF';
    gLogo.font = '900 124px "Arial Rounded MT Bold", "Arial Black", sans-serif';
    gLogo.textAlign = 'center';
    gLogo.textBaseline = 'middle';
    gLogo.fillText('peach', 256, 248);
  } else {
    drawOrangeStar(gLogo, 265, 225, 165, 66, '#FF5000');
    drawOrangeStar(gLogo, 265, 225, 142, 56, '#FFFFFF');
    drawOrangeStar(gLogo, 265, 225, 128, 50, '#FF5000');
  }

  // 3. FUSELAGE SYMMETRIC STRUCTURE TEXTURE (2048x512: u = uNose [0=Nose .. 1=Tail], v = fuseV [0=Belly .. 1=Crown])
  const cFuseSym = document.createElement('canvas');
  cFuseSym.width = 2048; cFuseSym.height = 512;
  const gSym = cFuseSym.getContext('2d');

  // Base fuselage vertical gradient (y=0 is Crown v=1, y=512 is Belly v=0)
  const bodyGrd = gSym.createLinearGradient(0, 0, 0, 512);
  if (livery.id === 'JETSTAR') {
    bodyGrd.addColorStop(0.0, '#E2E8F0');
    bodyGrd.addColorStop(0.58, '#CBD5E1');
    bodyGrd.addColorStop(0.72, '#94A3B8');
    bodyGrd.addColorStop(1.0, '#64748B');
  } else {
    bodyGrd.addColorStop(0.0, '#FFFFFF');
    bodyGrd.addColorStop(0.62, '#F8FAFC');
    bodyGrd.addColorStop(0.74, '#E2E8F0');
    bodyGrd.addColorStop(1.0, '#CBD5E1');
  }
  gSym.fillStyle = bodyGrd;
  gSym.fillRect(0, 0, 2048, 512);

  // Airline fuselage accent ribbons / belly cheatlines
  if (livery.id === 'ANA') {
    // ANA blue lower-aft sweep rising toward the tail!
    gSym.fillStyle = '#0B3B8C';
    gSym.beginPath();
    gSym.moveTo(1320, 355);
    gSym.lineTo(2048, 155);
    gSym.lineTo(2048, 250);
    gSym.lineTo(1480, 382);
    gSym.closePath();
    gSym.fill();
    gSym.fillStyle = '#1EA1E8';
    gSym.beginPath();
    gSym.moveTo(1460, 382);
    gSym.lineTo(2048, 242);
    gSym.lineTo(2048, 290);
    gSym.lineTo(1560, 398);
    gSym.closePath();
    gSym.fill();
  } else if (livery.id === 'PEACH') {
    // Peach magenta forward/aft wave accents
    gSym.fillStyle = '#C8167A';
    gSym.beginPath();
    gSym.moveTo(1380, 0);
    gSym.lineTo(2048, 0);
    gSym.lineTo(2048, 360);
    gSym.quadraticCurveTo(1650, 280, 1380, 0);
    gSym.closePath();
    gSym.fill();
  } else if (livery.id === 'JETSTAR') {
    gSym.fillStyle = '#FF5000';
    gSym.fillRect(220, 342, 1650, 12);
  }

  // Radome nose cone ring & dark wrap-around Cockpit Windshield Visor (near uNose = 0.04..0.085)
  gSym.strokeStyle = 'rgba(100,116,139,0.35)';
  gSym.lineWidth = 3;
  gSym.beginPath(); gSym.moveTo(58, 0); gSym.lineTo(58, 512); gSym.stroke();

  gSym.fillStyle = '#0F172A';
  gSym.beginPath();
  gSym.moveTo(86, 212);
  gSym.lineTo(168, 192);
  gSym.lineTo(182, 232);
  gSym.lineTo(96, 240);
  gSym.closePath();
  gSym.fill();
  // Window frame dividers inside cockpit visor
  gSym.strokeStyle = '#94A3B8';
  gSym.lineWidth = 3;
  gSym.beginPath();
  gSym.moveTo(122, 198); gSym.lineTo(126, 238);
  gSym.moveTo(150, 194); gSym.lineTo(154, 235);
  gSym.stroke();

  // Passenger Cabin Doors (Door 1 fwd, Door 2 mid-fwd, Door 3 mid-aft, Door 4 aft)
  const doorStations = [245, 620, 1180, 1640];
  gSym.strokeStyle = '#64748B';
  gSym.lineWidth = 3;
  for (const dx of doorStations) {
    gSym.fillStyle = 'rgba(241,245,249,0.55)';
    gSym.fillRect(dx, 196, 28, 86);
    gSym.strokeRect(dx, 196, 28, 86);
    gSym.fillStyle = '#0F172A';
    gSym.fillRect(dx + 9, 212, 10, 16);
  }

  // Crisp Oval Passenger Cabin Window Row along uNose = 0.14 .. 0.79 (y ≈ 222)
  gSym.fillStyle = '#0F1C2E';
  for (let wx = 292; wx <= (freighter ? 0 : 1610); wx += 22) {
    if (doorStations.some(dx => Math.abs(wx - (dx + 14)) < 24)) continue;
    gSym.beginPath();
    if (gSym.roundRect) gSym.roundRect(wx, 216, 10, 18, 4);
    else gSym.fillRect(wx, 216, 10, 18);
    gSym.fill();
  }

  // 4. FUSELAGE FORWARD TITLE & AFT REGISTRATION OVERLAY (1024x256 RGBA — projected left-to-right on BOTH sides!)
  // Top half (y = 0..155, v = 0.39..1.0): Forward Fuselage Airline Title
  // Bottom half (y = 160..256, v = 0.0..0.37): Aft Registration + Japanese Hinomaru Flag!
  const cFuseDecal = document.createElement('canvas');
  cFuseDecal.width = 1024; cFuseDecal.height = 256;
  const gDec = cFuseDecal.getContext('2d');
  gDec.clearRect(0, 0, 1024, 256);

  if (livery.id === 'ANA') {
    gDec.fillStyle = '#0B3B8C';
    gDec.font = 'italic 900 92px "Arial Black", "Helvetica Neue", sans-serif';
    gDec.textAlign = 'left';
    gDec.textBaseline = 'middle';
    gDec.fillText('ANA', 56, 86);
    gDec.fillStyle = '#1E3A8A';
    gDec.font = '700 42px "Arial", "Helvetica Neue", sans-serif';
    gDec.fillText('Inspiration of JAPAN', 345, 88);
  } else if (livery.id === 'JAL') {
    gDec.fillStyle = '#1E293B';
    gDec.font = '900 76px "Arial Black", "Helvetica Neue", sans-serif';
    gDec.textAlign = 'center';
    gDec.textBaseline = 'middle';
    gDec.fillText('JAPAN AIRLINES', 512, 86);
    // Subtle red JAL speed-mark bar under J
    gDec.fillStyle = '#D6001C';
    gDec.fillRect(142, 122, 120, 10);
  } else if (livery.id === 'PEACH') {
    gDec.fillStyle = '#C8167A';
    gDec.font = '900 108px "Arial Rounded MT Bold", "Arial Black", sans-serif';
    gDec.textAlign = 'left';
    gDec.textBaseline = 'middle';
    gDec.fillText('peach', 80, 84);
  } else {
    gDec.fillStyle = '#1E293B';
    gDec.font = '900 96px "Arial Black", "Helvetica Neue", sans-serif';
    gDec.textAlign = 'left';
    gDec.textBaseline = 'middle';
    gDec.fillText('Jetstar', 72, 86);
    drawOrangeStar(gDec, 520, 78, 52, 21, '#FF5000');
  }

  // Bottom strip: Japanese Hinomaru Flag + Crisp Registration (JAxxxx)
  gDec.fillStyle = '#FFFFFF';
  gDec.fillRect(190, 182, 68, 46);
  gDec.strokeStyle = '#CBD5E1';
  gDec.lineWidth = 2;
  gDec.strokeRect(190, 182, 68, 46);
  gDec.fillStyle = '#D6001C';
  gDec.beginPath();
  gDec.arc(224, 205, 14, 0, Math.PI * 2);
  gDec.fill();

  gDec.fillStyle = '#1E293B';
  gDec.font = '800 46px "Arial", monospace';
  gDec.textAlign = 'left';
  gDec.textBaseline = 'middle';
  gDec.fillText(regStr, 282, 207);

  const mkTex = canvas => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  };

  const set = {
    tailBgTex: mkTex(cTailBg),
    tailLogoTex: mkTex(cTailLogo),
    fuseSymTex: mkTex(cFuseSym),
    fuseDecalTex: mkTex(cFuseDecal)
  };
  liveryTexSetCache.set(key, set);
  return set;
}

function createLiveryAirframeMaterial(spec, livery, bakedInfo) {
  const regStr = spec.defaultLivery === livery.id ? spec.reg : `${livery.regPrefix}${spec.id === 'B789' ? '92A' : (spec.id === 'B77W' ? '41J' : '18P')}`;
  const texSet = getLiveryTextureSet(livery, regStr, Boolean(spec.freighter));
  const halfSpan = spec.wingspanM * 0.5;

  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.28,
    metalness: 0.10
  });

  mat.customProgramCacheKey = () => `jp_livery_v3_${spec.id}_${livery.id}_${spec.freighter ? 'F' : 'P'}`;
  mat.onBeforeCompile = shader => {
    shader.uniforms.uTailBgTex = { value: texSet.tailBgTex };
    shader.uniforms.uTailLogoTex = { value: texSet.tailLogoTex };
    shader.uniforms.uFuseSymTex = { value: texSet.fuseSymTex };
    shader.uniforms.uFuseDecalTex = { value: texSet.fuseDecalTex };
    shader.uniforms.uFinBox = { value: bakedInfo.finBox };
    shader.uniforms.uFinSweep = { value: bakedInfo.finSweep };
    shader.uniforms.uFuseBox = { value: bakedInfo.fuseBox };
    shader.uniforms.uWingletCol = { value: new THREE.Color(livery.wingletHex) };
    shader.uniforms.uHalfSpan = { value: halfSpan };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         varying vec3 vAcPos;
         varying vec3 vAcNorm;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         vAcPos = position;
         vAcNorm = normalize(normal);`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform sampler2D uTailBgTex;
         uniform sampler2D uTailLogoTex;
         uniform sampler2D uFuseSymTex;
         uniform sampler2D uFuseDecalTex;
         uniform vec4 uFinBox;
         uniform vec4 uFinSweep;
         uniform vec4 uFuseBox;
         uniform vec3 uWingletCol;
         uniform float uHalfSpan;
         varying vec3 vAcPos;
         varying vec3 vAcNorm;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
         vec3 baseAirframe = vec3(0.965, 0.975, 0.99);
         // 1. Fuselage Side Projection (Windshield, Windows, Doors, Forward Airline Title & Aft Registration!)
         float isFuseX = 1.0 - smoothstep(uFuseBox.w - 0.15, uFuseBox.w + 0.35, abs(vAcPos.x));
         float isFuseY = smoothstep(uFuseBox.x - 0.35, uFuseBox.x + 0.05, vAcPos.y) * (1.0 - smoothstep(uFuseBox.y - 0.02, uFuseBox.y + 0.32, vAcPos.y));
         float sideFacing = smoothstep(0.32, 0.58, abs(vAcNorm.x));
         float fuseMask = isFuseX * isFuseY;
         if (fuseMask > 0.01) {
           float uNose = clamp((uFuseBox.z - vAcPos.z) / max(1.0, uFuseBox.z * 2.0), 0.0, 1.0);
           float fuseV = clamp((vAcPos.y - uFuseBox.x) / max(0.5, uFuseBox.y - uFuseBox.x), 0.0, 1.0);
           vec3 symCol = texture2D(uFuseSymTex, vec2(uNose, fuseV)).rgb;
           // Blend side details cleanly onto side normals while keeping crown white & belly metallic
           vec3 crownBelly = mix(vec3(0.82, 0.86, 0.91), vec3(0.99, 0.995, 1.0), smoothstep(0.24, 0.52, fuseV));
           vec3 fCol = mix(crownBelly, symCol, sideFacing);

           // Forward Upper Fuselage Airline Title (15%..41% from Nose, right above cabin windows — readable left-to-right on BOTH sides!)
           if (uNose > 0.145 && uNose < 0.415 && fuseV > 0.56 && fuseV < 0.80 && sideFacing > 0.45) {
             float tFwd = (uNose - 0.145) / 0.27;
             float decU = vAcNorm.x >= 0.0 ? tFwd : (1.0 - tFwd);
             float decV = 0.40 + ((fuseV - 0.56) / 0.24) * 0.58;
             vec4 decTex = texture2D(uFuseDecalTex, vec2(decU, decV));
             fCol = mix(fCol, decTex.rgb, decTex.a * sideFacing);
           }
           // Aft Fuselage Registration + Hinomaru Flag (72%..85% from Nose — readable left-to-right on BOTH sides!)
           if (uNose > 0.72 && uNose < 0.84 && fuseV > 0.46 && fuseV < 0.62 && sideFacing > 0.45) {
             float tReg = (uNose - 0.72) / 0.12;
             float regU = vAcNorm.x >= 0.0 ? tReg : (1.0 - tReg);
             float regV = ((fuseV - 0.46) / 0.16) * 0.36;
             vec4 regTex = texture2D(uFuseDecalTex, vec2(regU, regV));
             fCol = mix(fCol, regTex.rgb, regTex.a * sideFacing);
           }
           baseAirframe = mix(baseAirframe, fCol, fuseMask);
         }

         // 2. Swept Vertical Stabilizer (Tail Fin) Flush Airline Emblem & Swept Stripes!
         float inFinX = 1.0 - smoothstep(0.75, 1.05, abs(vAcPos.x));
         float inFinY = smoothstep(uFinBox.x - 0.25, uFinBox.x + 0.25, vAcPos.y);
         float inFinZ = 1.0 - smoothstep(uFinBox.w - 0.2, uFinBox.w + 0.8, vAcPos.z);
         float finSide = smoothstep(0.45, 0.72, abs(vAcNorm.x));
         float finMask = inFinX * inFinY * inFinZ * finSide;
         if (finMask > 0.01) {
           float finV = clamp((vAcPos.y - uFinBox.x) / max(0.5, uFinBox.y - uFinBox.x), 0.0, 1.0);
           float leadZ = mix(uFinSweep.x, uFinSweep.z, finV);
           float trailZ = mix(uFinSweep.y, uFinSweep.w, finV);
           float chordFrac = clamp((leadZ - vAcPos.z) / max(0.6, leadZ - trailZ), 0.0, 1.0);
           vec3 finCol = texture2D(uTailBgTex, vec2(chordFrac, finV)).rgb;

           // Centered Airline Tail Emblem (readable left-to-right on BOTH Port & Starboard faces!)
           if (chordFrac > 0.14 && chordFrac < 0.88 && finV > 0.15 && finV < 0.85) {
             float tLogo = (chordFrac - 0.14) / 0.74;
             float logoU = vAcNorm.x >= 0.0 ? tLogo : (1.0 - tLogo);
             float logoV = (finV - 0.15) / 0.70;
             vec4 logoSample = texture2D(uTailLogoTex, vec2(logoU, logoV));
             finCol = mix(finCol, logoSample.rgb, logoSample.a);
           }
           baseAirframe = mix(baseAirframe, finCol, finMask);
         }

         // 3. Wingtip Winglet / Sharklet Airline Accent Color
         float isWingtip = smoothstep(uHalfSpan - 2.3, uHalfSpan - 0.6, abs(vAcPos.x)) * smoothstep(uFuseBox.x + 1.4, uFuseBox.x + 2.4, vAcPos.y);
         baseAirframe = mix(baseAirframe, uWingletCol, isWingtip * 0.92);

         diffuseColor.rgb *= baseAirframe;`
      );
  };

  return mat;
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

  const ngZ = spec.attachPoints.noseGear.z;
  const ngR = spec.lengthM > 55 ? 0.50 : 0.38;
  const ngH = Math.max(1.2, spec.bellyClearanceM + 0.4 - ngR);
  const ngStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, ngH, 10), chromeMat);
  ngStrut.position.set(0, ngR + ngH * 0.5, ngZ);
  gear.add(ngStrut);
  addWheel(-0.34, ngR, ngZ, ngR, 0.24);
  addWheel(0.34, ngR, ngZ, ngR, 0.24);

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

// Animated 3D Openable Cargo Hold Cavities & Hinged Doors (Fwd Cargo, Aft Cargo, Bulk Door, Catering Door R1)
function buildAnimatedCargoAndCabinDoors(spec) {
  const grp = new THREE.Group();
  grp.name = 'animated_doors';
  const ap = spec.attachPoints;
  const isWide = spec.lengthM > 55;
  const cavityMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85, metalness: 0.2 });
  const sillMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45 });
  const doorExtMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.28, metalness: 0.15 });
  const doorIntMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.5, metalness: 0.35 });

  const makeCargoDoor = (pt, wZ, hY) => {
    const station = new THREE.Group();
    station.position.set(pt.x + 0.12, pt.y + hY * 0.42, pt.z);
    // Dark recessed cargo hold interior + yellow roller sill bar (visible when door opens!)
    const recess = new THREE.Mesh(new THREE.BoxGeometry(0.28, hY, wZ), cavityMat);
    recess.position.set(0.06, 0, 0);
    const sill = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.10, wZ + 0.12), sillMat);
    sill.position.set(0.02, -hY * 0.5, 0);
    station.add(recess, sill);

    // Top-hinged outward-opening cargo door leaf (authentic Boeing/Airbus outward-upward hinge!)
    const hinge = new THREE.Group();
    hinge.position.set(-0.08, hY * 0.5, 0);
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.09, hY, wZ), doorExtMat);
    leaf.position.set(0, -hY * 0.5, 0);
    const liner = new THREE.Mesh(new THREE.BoxGeometry(0.05, hY * 0.88, wZ * 0.88), doorIntMat);
    liner.position.set(0.04, -hY * 0.5, 0);
    hinge.add(leaf, liner);
    station.add(hinge);
    station.visible = false;
    grp.add(station);
    return { station, hinge };
  };

  const cW = isWide ? 3.35 : (spec.id === 'A321' ? 1.85 : 1.35);
  const cH = isWide ? 1.72 : 1.22;
  const fwdCargo = makeCargoDoor(ap.cargoFwd, cW, cH);
  const aftCargo = makeCargoDoor(ap.cargoAft, cW, cH);
  const bulkCargo = makeCargoDoor(ap.bulkDoor, isWide ? 1.25 : 1.05, isWide ? 1.35 : 1.05);
  const galleyR1 = makeCargoDoor(ap.doorR1, 1.05, isWide ? 1.95 : 1.75);

  grp.userData = { fwdCargo, aftCargo, bulkCargo, galleyR1, openAmt: 0, galleyAmt: 0 };
  return grp;
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

  const drawTrapezoid = pad => {
    ctx.beginPath();
    ctx.moveTo(128 - pad, 12);
    ctx.lineTo(384 + pad, 12);
    ctx.lineTo(498 - pad * 0.3, 1004);
    ctx.lineTo(14 + pad * 0.3, 1004);
    ctx.closePath();
  };

  const grd = ctx.createLinearGradient(0, 0, 0, 1024);
  grd.addColorStop(0.0, 'rgba(239, 68, 68, 0.82)');
  grd.addColorStop(0.35, 'rgba(249, 115, 22, 0.68)');
  grd.addColorStop(0.72, 'rgba(245, 158, 11, 0.45)');
  grd.addColorStop(1.0, 'rgba(234, 179, 8, 0.14)');
  drawTrapezoid(0);
  ctx.fillStyle = grd;
  ctx.fill();

  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.92)';
  ctx.setLineDash([28, 18]);
  ctx.stroke();
  ctx.setLineDash([]);

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
  carpet.rotation.z = Math.PI;
  carpet.position.set(0, 0.24, -(halfL * 0.15 + blastLen * 0.5));
  carpet.renderOrder = 8;
  grp.add(carpet);

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
    cone.rotation.x = -Math.PI / 2;
    cone.position.set(side * engX, 2.5, engZ - 4.5 - pLen * 0.5);
    cone.renderOrder = 9;
    grp.add(cone);
    plumes.push(cone);
  });

  // Textbook Engine Ingestion Hazard Semicircles (B777 = 4.6m radius per GHtext_1 p.10!)
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
  const suctR = spec.lengthM > 55 ? 5.2 : 4.2;
  [-1, 1].forEach(side => {
    const semi = new THREE.Mesh(new THREE.CircleGeometry(suctR, 20, 0, Math.PI), ingestMat);
    semi.rotation.x = -Math.PI / 2;
    semi.rotation.z = Math.PI;
    semi.position.set(side * engX, 0.26, engZ + 3.0);
    semi.renderOrder = 8;
    grp.add(semi);

    const arc = new THREE.Mesh(new THREE.RingGeometry(suctR - 0.30, suctR, 20, 1, 0, Math.PI), ingestRingMat);
    arc.rotation.x = -Math.PI / 2;
    arc.rotation.z = Math.PI;
    arc.position.set(side * engX, 0.28, engZ + 3.0);
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
// MAIN REAL-GLB AIRLINER FACTORY (FLUSH 3D LIVERY + OPENABLE DOORS)
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
    lights: {},
    doorsGroup: null
  };

  // 1. Detailed Landing Gear resting cleanly at y = 0
  const gearGroup = buildLandingGearGroup(spec);
  root.add(gearGroup);
  root.userData.gearGroup = gearGroup;

  // 2. Animated Openable Cargo & Catering Doors (Fwd Cargo, Aft Cargo, Bulk, Galley R1)
  const doorsGroup = buildAnimatedCargoAndCabinDoors(spec);
  root.add(doorsGroup);
  root.userData.doorsGroup = doorsGroup;

  // 3. Navigation, Anti-Collision Beacons & Strobe Lights at exact airframe bounds
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
    const nav = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), new THREE.MeshBasicMaterial({ color: navCol }));
    nav.position.set(side * halfSpan, spec.bellyClearanceM + spec.fuseRadius * 1.12, -halfL * 0.22);
    root.add(nav);
    const stb = new THREE.Mesh(new THREE.SphereGeometry(0.34, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    stb.position.set(side * halfSpan, spec.bellyClearanceM + spec.fuseRadius * 1.12, -halfL * 0.26);
    root.add(stb);
    root.userData.lights[`strobe_${side > 0 ? 'L' : 'R'}`] = stb;
  });
  root.userData.lights.beaconTop = beaconTop;
  root.userData.lights.beaconBot = beaconBot;
  root.userData.lights.tailStrobe = tailStrobe;

  // 4. Async-Hydrated REAL Sculpted GLB Airframe with Flush Surface Livery Shader (ZERO floating billboards!)
  const airframeHolder = new THREE.Group();
  root.add(airframeHolder);

  loadBakedAirframeSpec(spec)
    .then(bakedInfo => {
      const liveryMat = createLiveryAirframeMaterial(spec, livery, bakedInfo);
      const mesh = new THREE.Mesh(bakedInfo.geometry, liveryMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      airframeHolder.add(mesh);
    })
    .catch(() => {
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

// Single entry point used by BOTH 3D scenes for every aircraft (parked, taxiing, active).
// Jets → sculpted GLB + livery shader at real 1:1 dimensions; only the DHC8 turboprop (no GLB) is procedural.
let _detailedBuilder = null;
export function registerProceduralFallback(fn) { _detailedBuilder = fn; }
export function createFleetAircraft3D(profileId = 'A320', liveryId = 'ANA', profileVisual = null) {
  const up = String(profileId || 'A320').toUpperCase();
  if (up === 'DHC8' && _detailedBuilder) {
    const g = _detailedBuilder({ ...(profileVisual || {}), liveryId });
    g.userData.spec = g.userData.spec || { ...AIRCRAFT_3D_SPECS.E190, id: 'DHC8', lengthM: 32.8, wingspanM: 28.4, attachPoints: AIRCRAFT_3D_SPECS.E190.attachPoints };
    return g;
  }
  return createProceduralAirliner3D(up, AIRLINE_LIVERIES[liveryId] ? liveryId : null);
}

export function animateAircraft3D(acGroup, timeSec, opts = {}) {
  if (!acGroup || !acGroup.userData) return;
  const dt = opts.dt || 0.016;
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

  // Smoothly open/close 3D Cargo Hold Doors & Galley Door R1 during Ground Handling!
  const dg = acGroup.userData.doorsGroup;
  if (dg && dg.userData) {
    const targetCargo = opts.cargoOpen ? 1.0 : 0.0;
    const targetGalley = opts.galleyOpen ? 1.0 : 0.0;
    dg.userData.openAmt += (targetCargo - dg.userData.openAmt) * Math.min(1, dt * 3.5);
    dg.userData.galleyAmt += (targetGalley - dg.userData.galleyAmt) * Math.min(1, dt * 3.5);

    const amt = dg.userData.openAmt;
    [dg.userData.fwdCargo, dg.userData.aftCargo, dg.userData.bulkCargo].forEach(d => {
      if (!d) return;
      d.station.visible = amt > 0.03;
      // Outward-upward hinge rotation around Z (starboard is -X -> positive Z rotation swings outward & upward!)
      d.hinge.rotation.z = amt * 2.15;
    });
    if (dg.userData.galleyR1) {
      const gAmt = dg.userData.galleyAmt;
      dg.userData.galleyR1.station.visible = gAmt > 0.03;
      dg.userData.galleyR1.hinge.rotation.z = gAmt * 1.45;
    }
  }
}
