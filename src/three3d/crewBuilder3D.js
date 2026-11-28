// Articulated 3D Airport Ground Crew (Authentic ICAO/JCAB/JEAE Marshaller, Watchman, Guideman, Loadmaster & Headset Kinematics)
// & Realistic Japanese Airport Open-Cab Baggage Towing Tractor ("TT Mui Trần") w/ Turning Wheels & Towed Dollies
import * as THREE from 'three';

// =========================================================================
// 1. REALISTIC OPEN-CAB AIRPORT TOWING TRACTOR ("TT MUI TRẦN" — Toyota 2TD/3TD Style)
// =========================================================================
export function createOpenCabTowingTractor3D() {
  const g = new THREE.Group();

  const matBodyWhite = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.32, metalness: 0.28 });
  const matAccentYellow = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35, metalness: 0.25 });
  const matChassisDark = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.55, metalness: 0.45 });
  const matRubber = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.88, metalness: 0.05 });
  const matRim = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.35, metalness: 0.65 });
  const matSeat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const matGlass = new THREE.MeshPhysicalMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.42, roughness: 0.08, metalness: 0.1 });

  const addPart = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0, parent = g) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  };

  addPart(new THREE.BoxGeometry(1.62, 0.38, 3.35), matChassisDark, 0, 0.54, 0);
  addPart(new THREE.BoxGeometry(1.52, 0.56, 1.48), matBodyWhite, 0, 0.96, 0.88);
  addPart(new THREE.BoxGeometry(1.56, 0.14, 1.50), matAccentYellow, 0, 0.78, 0.88);
  addPart(new THREE.BoxGeometry(1.24, 0.34, 0.10), matChassisDark, 0, 0.96, 1.62);
  addPart(new THREE.BoxGeometry(1.58, 0.52, 1.05), matBodyWhite, 0, 0.94, -1.12);
  addPart(new THREE.BoxGeometry(1.60, 0.15, 1.08), matAccentYellow, 0, 0.78, -1.12);
  addPart(new THREE.BoxGeometry(1.68, 0.24, 0.20), matRubber, 0, 0.56, 1.72);
  addPart(new THREE.BoxGeometry(1.68, 0.24, 0.18), matRubber, 0, 0.56, -1.70);
  addPart(new THREE.CylinderGeometry(0.06, 0.06, 0.32, 8), matRim, 0, 0.62, -1.86);

  // Open-Cab ("Mui trần") Side Cowls + Low Windshield Frame
  addPart(new THREE.BoxGeometry(0.12, 0.52, 1.05), matBodyWhite, -0.75, 0.92, -0.15);
  addPart(new THREE.BoxGeometry(0.12, 0.52, 1.05), matBodyWhite, 0.75, 0.92, -0.15);
  addPart(new THREE.BoxGeometry(0.07, 0.68, 0.07), matChassisDark, -0.72, 1.48, 0.36, -0.22);
  addPart(new THREE.BoxGeometry(0.07, 0.68, 0.07), matChassisDark, 0.72, 1.48, 0.36, -0.22);
  addPart(new THREE.BoxGeometry(1.50, 0.06, 0.07), matChassisDark, 0, 1.80, 0.28);
  addPart(new THREE.BoxGeometry(1.38, 0.58, 0.04), matGlass, 0, 1.50, 0.35, -0.22);

  // Rear safety roll-bar hoop + Rotating Yellow Beacon
  addPart(new THREE.CylinderGeometry(0.045, 0.045, 1.15, 8), matChassisDark, -0.70, 1.56, -0.72);
  addPart(new THREE.CylinderGeometry(0.045, 0.045, 1.15, 8), matChassisDark, 0.70, 1.56, -0.72);
  addPart(new THREE.CylinderGeometry(0.045, 0.045, 1.44, 8), matChassisDark, 0, 2.12, -0.72, 0, 0, Math.PI / 2);

  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const beaconBulb = addPart(new THREE.CylinderGeometry(0.11, 0.13, 0.22, 12), beaconMat, 0, 2.26, -0.72);
  const beaconHalo = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.42 })
  );
  beaconHalo.position.set(0, 2.28, -0.72);
  g.add(beaconHalo);

  addPart(new THREE.CylinderGeometry(0.045, 0.055, 0.62, 8), matChassisDark, 0.34, 1.24, 0.16, -0.52);
  const steerWheel = new THREE.Group();
  steerWheel.position.set(0.34, 1.48, 0.02);
  steerWheel.rotation.x = 1.05;
  addPart(new THREE.TorusGeometry(0.20, 0.030, 8, 20), matRubber, 0, 0, 0, 0, 0, 0, steerWheel);
  // Top-dead-center yellow alignment stripe & 3 steering spokes for clear rotation feedback in cab view
  addPart(new THREE.BoxGeometry(0.045, 0.07, 0.068), matAccentYellow, 0, 0.20, 0, 0, 0, 0, steerWheel);
  addPart(new THREE.CylinderGeometry(0.045, 0.045, 0.05, 10), matChassisDark, 0, 0, 0, Math.PI / 2, 0, 0, steerWheel);
  addPart(new THREE.BoxGeometry(0.36, 0.028, 0.022), matRim, 0, 0, 0, 0, 0, 0, steerWheel);
  addPart(new THREE.BoxGeometry(0.030, 0.19, 0.022), matRim, 0, -0.095, 0, 0, 0, 0, steerWheel);
  g.add(steerWheel);

  // Dashboard instrument cluster (visible in Cab View)
  addPart(new THREE.BoxGeometry(0.54, 0.16, 0.24), matChassisDark, 0.34, 1.24, 0.34, -0.22);
  addPart(new THREE.BoxGeometry(0.42, 0.09, 0.02), new THREE.MeshBasicMaterial({ color: 0x0f172a }), 0.34, 1.27, 0.22, -0.22);

  // Realistic Left (+X in TT local) & Right (-X in TT local) Side Rear-View Mirrors
  const makeSideMirror = (sideSign, ryAim) => {
    const mGrp = new THREE.Group();
    mGrp.position.set(sideSign * 0.76, 1.54, 0.42);
    mGrp.rotation.y = ryAim;
    addPart(new THREE.BoxGeometry(0.18, 0.035, 0.035), matChassisDark, -sideSign * 0.09, -0.03, 0, 0, 0, 0, mGrp);
    addPart(new THREE.BoxGeometry(0.34, 0.23, 0.045), matChassisDark, 0, 0, 0, 0, 0, 0, mGrp);
    addPart(new THREE.BoxGeometry(0.32, 0.21, 0.048), matRim, 0, 0, -0.002, 0, 0, 0, mGrp);
    const faceMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.29, 0.18), faceMat);
    face.position.set(0, 0, -0.029);
    face.rotation.y = Math.PI;
    mGrp.add(face);
    g.add(mGrp);
    return face;
  };
  const mirrorFaceL = makeSideMirror(1, -0.22);
  const mirrorFaceR = makeSideMirror(-1, 0.34);
  addPart(new THREE.BoxGeometry(0.52, 0.14, 0.52), matSeat, 0.34, 0.90, -0.34);
  addPart(new THREE.BoxGeometry(0.52, 0.58, 0.12), matSeat, 0.34, 1.20, -0.56);
  addPart(new THREE.BoxGeometry(0.50, 0.14, 0.50), matSeat, -0.34, 0.90, -0.34);
  addPart(new THREE.BoxGeometry(0.50, 0.54, 0.12), matSeat, -0.34, 1.18, -0.56);

  // Articulated Driver inside Open-Cab TT (supports Steering + Reversing Head-Check + 指差呼称 Yubisasikoshou!)
  const driverGroup = new THREE.Group();
  driverGroup.position.set(0.34, 0.98, -0.34);
  addPart(new THREE.BoxGeometry(0.42, 0.52, 0.24), new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.5 }), 0, 0.32, 0, 0, 0, 0, driverGroup);
  addPart(new THREE.BoxGeometry(0.44, 0.08, 0.26), new THREE.MeshBasicMaterial({ color: 0xe2e8f0 }), 0, 0.26, 0, 0, 0, 0, driverGroup);

  const driverHead = new THREE.Group();
  driverHead.position.set(0, 0.72, 0.02);
  addPart(new THREE.SphereGeometry(0.15, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.6 }), 0, 0, 0, 0, 0, 0, driverHead);
  addPart(new THREE.SphereGeometry(0.165, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.58), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }), 0, 0.03, 0, 0, 0, 0, driverHead);
  driverGroup.add(driverHead);

  const matSleeveDriver = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 });
  const matGloveDriver = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });

  // Left arm stays on steering wheel
  const driverArmL = new THREE.Group();
  driverArmL.position.set(0.22, 0.52, 0.04);
  addPart(new THREE.CylinderGeometry(0.055, 0.05, 0.44, 8), matSleeveDriver, 0, -0.06, 0.16, Math.PI / 2.4, -0.18, 0, driverArmL);
  driverGroup.add(driverArmL);

  // Right arm (pivots at shoulder for 指差呼称 pointing forward/rear!)
  const driverArmR = new THREE.Group();
  driverArmR.position.set(-0.22, 0.52, 0.04);
  const rArmMesh = addPart(new THREE.CylinderGeometry(0.055, 0.048, 0.48, 8), matSleeveDriver, 0, -0.22, 0, 0, 0, 0, driverArmR);
  rArmMesh.castShadow = true;
  addPart(new THREE.SphereGeometry(0.055, 8, 8), matGloveDriver, 0, -0.46, 0, 0, 0, 0, driverArmR);
  // Default grip pose on steering wheel:
  driverArmR.rotation.set(-Math.PI / 2.4, 0, -0.15);
  driverGroup.add(driverArmR);
  g.add(driverGroup);

  const headMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
  addPart(new THREE.BoxGeometry(0.24, 0.14, 0.06), headMat, -0.52, 0.96, 1.63);
  addPart(new THREE.BoxGeometry(0.24, 0.14, 0.06), headMat, 0.52, 0.96, 1.63);
  const beamGeo = new THREE.ConeGeometry(1.2, 5.2, 10, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3, transparent: true, opacity: 0.10, side: THREE.DoubleSide, depthWrite: false });
  const beamL = new THREE.Mesh(beamGeo, beamMat);
  beamL.position.set(-0.48, 0.55, 4.1);
  beamL.rotation.x = -Math.PI / 2 - 0.16;
  const beamR = beamL.clone();
  beamR.position.x = 0.48;
  g.add(beamL, beamR);

  const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  addPart(new THREE.BoxGeometry(0.22, 0.12, 0.06), tailMat, -0.56, 0.96, -1.66);
  addPart(new THREE.BoxGeometry(0.22, 0.12, 0.06), tailMat, 0.56, 0.96, -1.66);

  const makeWheel = (r, w) => {
    const wg = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 16), matRubber);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.52, r * 0.52, w + 0.03, 12), matRim);
    hub.rotation.z = Math.PI / 2;
    wg.add(tire, hub);
    return wg;
  };
  const frontPivots = [];
  const allWheels = [];
  [[-0.82, 0.36, 1.12, 0.36], [0.82, 0.36, 1.12, 0.36]].forEach(([wx, wy, wz, r]) => {
    const piv = new THREE.Group();
    piv.position.set(wx, wy, wz);
    const wh = makeWheel(r, 0.26);
    piv.add(wh);
    g.add(piv);
    frontPivots.push(piv);
    allWheels.push(wh);
  });
  [[-0.84, 0.42, -1.04, 0.42], [0.84, 0.42, -1.04, 0.42]].forEach(([wx, wy, wz, r]) => {
    const wh = makeWheel(r, 0.32);
    wh.position.set(wx, wy, wz);
    g.add(wh);
    allWheels.push(wh);
  });

  const highMast = new THREE.Group();
  highMast.visible = false;
  addPart(new THREE.BoxGeometry(1.55, 2.85, 2.2), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 }), 0, 2.75, -0.35, 0, 0, 0, highMast);
  addPart(new THREE.BoxGeometry(1.62, 0.28, 2.26), matAccentYellow, 0, 4.18, -0.35, 0, 0, 0, highMast);
  g.add(highMast);

  g.userData = { frontPivots, allWheels, steerWheel, beaconBulb, beaconHalo, beams: [beamL, beamR], highMast, driverGroup, driverHead, driverArmR, mirrorFaceL, mirrorFaceR };
  return g;
}

// Animate TT Driver: Steering Glance + Reverse Mirror Check + 指差呼称 (Yubisasikoshou) Point & Call!
export function animateTractorDriver(ttMesh, opts = {}) {
  const ud = ttMesh && ttMesh.userData;
  if (!ud || !ud.driverArmR || !ud.driverHead) return;
  const { steerAngle = 0, reversing = false, yubikoshiTimer = 0, yubikoshiDir = 'fwd', tSec = 0 } = opts;

  if (yubikoshiTimer > 0) {
    // Crisp Japanese 指差呼称: Point right arm decisively forward (+Z) or rearward (-Z) + emphatic nod!
    const pulse = Math.sin(tSec * 9.0) * 0.06;
    if (yubikoshiDir === 'rev') {
      ud.driverArmR.rotation.set(Math.PI * 0.48 + pulse, 0, -0.35);
      ud.driverHead.rotation.set(0.18 + Math.max(0, Math.sin(tSec * 7)) * 0.16, -0.95, 0);
    } else {
      ud.driverArmR.rotation.set(-Math.PI * 0.52 + pulse, 0, -0.08);
      ud.driverHead.rotation.set(Math.max(0, Math.sin(tSec * 7)) * 0.22, -steerAngle * 0.4, 0);
    }
  } else if (reversing) {
    // Reversing: driver turns head over right/left shoulder to check trailer & blind spot
    ud.driverArmR.rotation.set(-Math.PI / 2.5, 0, -0.15);
    ud.driverHead.rotation.set(0.06, -0.78 + steerAngle * 0.45, 0);
  } else {
    // Normal forward driving: both hands on wheel, head looks gently into turns
    ud.driverArmR.rotation.set(-Math.PI / 2.4, 0, -0.15);
    ud.driverHead.rotation.set(0.02, -steerAngle * 0.55, 0);
  }
}

// =========================================================================
// ALL NGO AIRPORT DOLLY TYPES (AKE, AKH, PMC, BULK BAGGAGE CART, SEMI-TRAILER)
// =========================================================================
export const DOLLY_TYPES = {
  ake:  { id: 'ake',  wheelBase: 3.15, emptyMassKg: 420,  loadedMassKg: 1580, lateralGrip: 0.82, swayGain: 1.00, maxSafeKmh: 15, nameJa: 'コンテナドーリー (AKE/LD-3)', nameVi: 'Dolly Container AKE (LD-3)', nameEn: 'Container Dolly (AKE / LD-3)' },
  akh:  { id: 'akh',  wheelBase: 3.10, emptyMassKg: 380,  loadedMassKg: 1180, lateralGrip: 0.90, swayGain: 0.85, maxSafeKmh: 15, nameJa: '低床ドーリー (AKH/A320系)', nameVi: 'Dolly Thấp AKH (A320/A321)', nameEn: 'Low-Profile Dolly (AKH / A320)' },
  pmc:  { id: 'pmc',  wheelBase: 3.85, emptyMassKg: 750,  loadedMassKg: 4600, lateralGrip: 0.68, swayGain: 1.38, maxSafeKmh: 15, nameJa: 'パレットドーリー (96" PMC/PAG)', nameVi: 'Dolly Pallet 96" (PMC / PAG)', nameEn: 'Pallet Dolly (96" PMC / PAG)' },
  bulk: { id: 'bulk', wheelBase: 3.05, emptyMassKg: 340,  loadedMassKg: 940,  lateralGrip: 0.72, swayGain: 1.48, maxSafeKmh: 15, nameJa: '手荷物カート (バルク/幌付)', nameVi: 'Xe lồng hành lý rời (Bulk Cart)', nameEn: 'Bulk Baggage Cart (Covered)' },
  semi: { id: 'semi', wheelBase: 6.10, emptyMassKg: 3200, loadedMassKg: 9500, lateralGrip: 0.76, swayGain: 1.25, maxSafeKmh: 15, nameJa: '大型セミトレーラー (20ft/2ULD)', nameVi: 'Rơ-moóc dài Semi-Trailer (2 ULD)', nameEn: 'Long Semi-Trailer (Dual ULD)' }
};

export function createDollyUnit3D(dollyType = 'ake', idx = 0) {
  const g = new THREE.Group();
  const matFrame = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.45 });
  const matDeck = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.55, metalness: 0.35 });
  const matYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
  const matRubber = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
  const matAlu = new THREE.MeshStandardMaterial({ color: 0xdbe4ef, roughness: 0.32, metalness: 0.55 });
  const stripeCol = idx % 2 === 0 ? 0x0b3b8c : 0xdc2626;

  const add = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    return m;
  };
  const addWheels = (wx, wzArr, r = 0.25) => {
    wzArr.forEach(wz => {
      [-wx, wx].forEach(x => {
        add(new THREE.CylinderGeometry(r, r, 0.17, 12), matRubber, x, r, wz, 0, 0, Math.PI / 2);
      });
    });
  };

  if (dollyType === 'pmc') {
    // Wide 96"×125" Pallet Dolly with rollers + blue waterproof tarped cargo stack + yellow/red net
    add(new THREE.BoxGeometry(2.55, 0.18, 3.35), matDeck, 0, 0.48, 0);
    add(new THREE.BoxGeometry(0.14, 0.10, 1.10), matFrame, 0, 0.46, 2.15);
    add(new THREE.BoxGeometry(0.10, 0.22, 3.30), matYellow, -1.24, 0.62, 0);
    add(new THREE.BoxGeometry(0.10, 0.22, 3.30), matYellow, 1.24, 0.62, 0);
    // Aluminum PMC base + cargo stack + tarpaulin
    add(new THREE.BoxGeometry(2.38, 0.08, 3.12), matAlu, 0, 0.61, 0);
    add(new THREE.BoxGeometry(2.24, 1.38, 2.94), new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.62 }), 0, 1.34, 0);
    add(new THREE.BoxGeometry(2.28, 0.14, 2.98), matYellow, 0, 1.85, 0);
    addWheels(1.18, [1.18, -1.18], 0.27);
  } else if (dollyType === 'bulk') {
    // Covered Bulk Baggage Cart with cage rails + blue canvas roof + colorful suitcases inside
    add(new THREE.BoxGeometry(1.56, 0.15, 2.48), matDeck, 0, 0.44, 0);
    add(new THREE.BoxGeometry(0.10, 0.08, 0.95), matFrame, 0, 0.44, 1.65);
    [[-0.75, 1.15], [0.75, 1.15], [-0.75, -1.15], [0.75, -1.15]].forEach(([px, pz]) => {
      add(new THREE.BoxGeometry(0.07, 1.38, 0.07), matFrame, px, 1.15, pz);
    });
    add(new THREE.BoxGeometry(1.58, 0.10, 2.48), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.7 }), 0, 1.84, 0);
    add(new THREE.BoxGeometry(1.58, 0.55, 2.48), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.72, transparent: true, opacity: 0.85 }), 0, 1.54, 0);
    [0xdc2626, 0xf59e0b, 0x334155, 0x10b981].forEach((bc, bi) => {
      add(new THREE.BoxGeometry(0.55, 0.34, 0.72), new THREE.MeshStandardMaterial({ color: bc, roughness: 0.5 }), (bi % 2 === 0 ? -0.32 : 0.32), 0.70 + Math.floor(bi / 2) * 0.36, (bi < 2 ? 0.45 : -0.45));
    });
    addWheels(0.74, [0.85, -0.85], 0.24);
  } else if (dollyType === 'akh') {
    // Low-profile Bilateral-Bevel AKH (LD-3-45) Dolly for A320/A321
    add(new THREE.BoxGeometry(1.72, 0.16, 2.42), matDeck, 0, 0.44, 0);
    add(new THREE.BoxGeometry(0.10, 0.08, 0.95), matFrame, 0, 0.44, 1.62);
    add(new THREE.BoxGeometry(0.08, 0.20, 2.38), matYellow, -0.82, 0.56, 0);
    add(new THREE.BoxGeometry(0.08, 0.20, 2.38), matYellow, 0.82, 0.56, 0);
    add(new THREE.BoxGeometry(1.56, 1.06, 1.98), matAlu, 0, 1.05, 0);
    add(new THREE.BoxGeometry(1.58, 0.18, 2.00), new THREE.MeshStandardMaterial({ color: stripeCol, roughness: 0.35 }), 0, 1.24, 0);
    addWheels(0.78, [0.84, -0.84], 0.24);
  } else {
    // Standard AKE (LD-3) Container Dolly with outboard bevel & airline stripe
    add(new THREE.BoxGeometry(1.66, 0.16, 2.48), matDeck, 0, 0.44, 0);
    add(new THREE.BoxGeometry(0.10, 0.08, 0.95), matFrame, 0, 0.44, 1.65);
    add(new THREE.BoxGeometry(0.08, 0.22, 2.42), matYellow, -0.79, 0.58, 0);
    add(new THREE.BoxGeometry(0.08, 0.22, 2.42), matYellow, 0.79, 0.58, 0);
    add(new THREE.BoxGeometry(1.50, 1.44, 1.92), matAlu, 0, 1.24, 0);
    add(new THREE.BoxGeometry(1.52, 0.22, 1.94), new THREE.MeshStandardMaterial({ color: stripeCol, roughness: 0.35 }), 0, 1.48, 0);
    addWheels(0.75, [0.85, -0.85], 0.24);
  }
  return g;
}

// Legacy alias kept for compatibility
export function createBaggageCart3D(idx = 0) {
  return createDollyUnit3D(idx % 2 === 0 ? 'ake' : 'bulk', idx);
}

// =========================================================================
// 2. ARTICULATED 3D AIRPORT GROUND STAFF
//    Roles: 'marshaller' | 'watchman' | 'guideman' | 'headset' | 'loadmaster' | 'fueler' | 'ramp' | 'spotter'
// =========================================================================
export function createArticulatedCrew3D(role = 'marshaller') {
  const root = new THREE.Group();

  const vestMap = {
    marshaller: 0xf97316, // High-vis Blaze Orange
    watchman:   0x84cc16, // High-vis Lime Yellow
    guideman:   0x84cc16,
    headset:    0x38bdf8, // Mechanic / Headset Blue-vest
    loadmaster: 0xfacc15, // Supervisor / Loadmaster Gold-vest
    fueler:     0xef4444, // HazMat Class 4 Fuel Operator Red-accent vest
    ramp:       0x84cc16,
    spotter:    0xf97316
  };
  const helmetMap = {
    marshaller: 0xf8fafc,
    watchman:   0xf8fafc,
    guideman:   0xfacc15,
    headset:    0x0f172a,
    loadmaster: 0xfacc15,
    fueler:     0xfef08a,
    ramp:       0xf8fafc,
    spotter:    0xfacc15
  };

  const vestCol = vestMap[role] || 0x84cc16;
  const helmetCol = helmetMap[role] || 0xf8fafc;
  const wandCol = role === 'spotter' ? 0xef4444 : 0xff5a1f;
  const hasWands = role === 'marshaller' || role === 'watchman' || role === 'spotter' || role === 'guideman';

  const matPants = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
  const matVest = new THREE.MeshStandardMaterial({ color: vestCol, roughness: 0.45 });
  const matReflect = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
  const matSleeve = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.65 });
  const matSkin = new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.55 });
  const matHelmet = new THREE.MeshStandardMaterial({ color: helmetCol, roughness: 0.3, metalness: 0.15 });
  const matWand = new THREE.MeshBasicMaterial({ color: wandCol });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

  const scaleWrap = new THREE.Group();
  scaleWrap.scale.setScalar(1.20);
  root.add(scaleWrap);

  // Boots + Legs
  const makeLeg = x => {
    const lg = new THREE.Group();
    lg.position.set(x, 0.84, 0);
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.085, 0.82, 10), matPants);
    thigh.position.y = -0.41;
    thigh.castShadow = true;
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.28), matGrip);
    boot.position.set(0, -0.78, 0.05);
    lg.add(thigh, boot);
    scaleWrap.add(lg);
    return lg;
  };
  const leftLeg = makeLeg(-0.14);
  const rightLeg = makeLeg(0.14);

  // Torso + Reflective Safety Vest
  const torso = new THREE.Group();
  torso.position.set(0, 1.18, 0);
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.64, 0.25), matVest);
  chest.castShadow = true;
  torso.add(chest);
  const band1 = new THREE.Mesh(new THREE.BoxGeometry(0.475, 0.07, 0.265), matReflect);
  band1.position.y = -0.14;
  const band2 = new THREE.Mesh(new THREE.BoxGeometry(0.475, 0.07, 0.265), matReflect);
  band2.position.y = 0.08;
  torso.add(band1, band2);
  scaleWrap.add(torso);

  // Head + Helmet + Hearing Protection Earmuffs (+ Boom Mic for Headset Man!)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.66, 0);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.155, 14, 12), matSkin);
  skull.castShadow = true;
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.172, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.58), matHelmet);
  helmet.position.y = 0.03;
  const brim = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.025, 0.14), matHelmet);
  brim.position.set(0, 0.06, 0.15);
  const earCol = role === 'headset' ? 0x38bdf8 : 0xfacc15;
  const earL = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.055, 10), new THREE.MeshStandardMaterial({ color: earCol, roughness: 0.4 }));
  earL.rotation.z = Math.PI / 2; earL.position.set(-0.17, 0, 0);
  const earR = earL.clone(); earR.position.x = 0.17;
  headGroup.add(skull, helmet, brim, earL, earR);

  if (role === 'headset') {
    const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.20, 6), matGrip);
    mic.rotation.x = Math.PI / 2;
    mic.position.set(-0.13, -0.05, 0.10);
    headGroup.add(mic);
  }
  scaleWrap.add(headGroup);

  // Articulated Arms + Optional Wands / Red Bypass Pin Streamer / LIR Clipboard
  const buildArm = side => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.29, 1.44, 0);

    const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.06, 0.34, 10), matSleeve);
    upperArm.position.y = -0.17;
    upperArm.castShadow = true;
    shoulder.add(upperArm);

    const elbow = new THREE.Group();
    elbow.position.set(0, -0.34, 0);
    shoulder.add(elbow);

    const foreArm = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.048, 0.32, 10), matSleeve);
    foreArm.position.y = -0.16;
    foreArm.castShadow = true;
    elbow.add(foreArm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 })); // White safety gloves!
    hand.position.y = -0.32;
    elbow.add(hand);

    // Marshalling / Watchman Illuminated Wand
    const wandGroup = new THREE.Group();
    wandGroup.position.set(0, -0.35, 0);
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.14, 8), matGrip);
    grip.position.y = -0.06;
    const baton = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.48, 10), matWand);
    baton.position.y = -0.34;
    const glowHalo = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.054, 0.50, 8),
      new THREE.MeshBasicMaterial({ color: wandCol, transparent: true, opacity: 0.30 })
    );
    glowHalo.position.y = -0.34;
    wandGroup.add(grip, baton, glowHalo);
    wandGroup.visible = hasWands;
    elbow.add(wandGroup);

    // Red "REMOVE BEFORE FLIGHT" Nose-Gear Steering Bypass Pin Streamer (on Left Arm `side === 1`)
    let pinStreamer = null;
    if (side === 1) {
      pinStreamer = new THREE.Group();
      pinStreamer.position.set(0, -0.34, 0);
      const pinRod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 0.22, 8),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 })
      );
      pinRod.rotation.z = Math.PI / 2;
      const ribbon = new THREE.Mesh(
        new THREE.PlaneGeometry(0.22, 0.92),
        new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide })
      );
      ribbon.position.set(0.06, -0.46, 0.05);
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(0.05, 0.80),
        new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
      );
      stripe.position.set(0.06, -0.46, 0.055);
      pinStreamer.add(pinRod, ribbon, stripe);
      pinStreamer.userData = { ribbon, stripe };
      pinStreamer.visible = false;
      elbow.add(pinStreamer);
    }

    // LIR Load Instruction Report Clipboard (on Left Arm for Loadmaster)
    let clipboard = null;
    if (side === 1 && role === 'loadmaster') {
      clipboard = new THREE.Group();
      clipboard.position.set(0, -0.32, 0.10);
      const board = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 0.025), new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 }));
      const paper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.31, 0.03), new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
      clipboard.add(board, paper);
      elbow.add(clipboard);
    }

    scaleWrap.add(shoulder);
    return { shoulder, elbow, wandGroup, pinStreamer, clipboard };
  };

  const armLeft = buildArm(1);
  const armRight = buildArm(-1);

  root.userData = { role, hasWands, torso, headGroup, leftLeg, rightLeg, armLeft, armRight };
  return root;
}

// =========================================================================
// 3. AUTHENTIC ICAO / JCAB / JEAE CREW ARM & WALKING KINEMATICS
// =========================================================================
export function animateCrewSignal(crew, signalId, tSec) {
  if (!crew || !crew.userData || !crew.userData.armLeft) return;
  const { armLeft, armRight, torso, headGroup, leftLeg, rightLeg, hasWands } = crew.userData;
  const sL = armLeft.shoulder.rotation;
  const eL = armLeft.elbow.rotation;
  const sR = armRight.shoulder.rotation;
  const eR = armRight.elbow.rotation;

  // Reset neutral stance
  sL.set(0, 0, 0.14); eL.set(0, 0, 0);
  sR.set(0, 0, -0.14); eR.set(0, 0, 0);
  leftLeg.rotation.set(0, 0, 0);
  rightLeg.rotation.set(0, 0, 0);
  torso.rotation.set(0, 0, 0);
  headGroup.rotation.set(0, 0, 0);

  if (armLeft.pinStreamer) armLeft.pinStreamer.visible = false;
  armLeft.wandGroup.visible = Boolean(hasWands && signalId !== 'bypass_pin_salute' && signalId !== 'wave_off' && signalId !== 'point_and_call');
  armRight.wandGroup.visible = Boolean(hasWands && signalId !== 'bypass_pin_salute' && signalId !== 'wave_off' && signalId !== 'point_and_call');

  if (signalId === 'm_straight') {
    // 1. STRAIGHT AHEAD (直進): Arms out to sides, elbows bent, wands sweeping upward & backward repeatedly
    const wave = Math.sin(tSec * 5.2);
    sL.set(-0.35, 0, 1.48);
    eL.set(-1.35 + wave * 0.52, 0, 0.35);
    sR.set(-0.35, 0, -1.48);
    eR.set(-1.35 + wave * 0.52, 0, -0.35);
  } else if (signalId === 'm_left') {
    // 2. TURN LEFT: Right arm points straight out, Left arm beckons repeatedly
    const wave = Math.sin(tSec * 5.6);
    sR.set(0, 0, -1.58);
    eR.set(0, 0, 0);
    sL.set(-0.30, 0, 1.45);
    eL.set(-1.45 + wave * 0.58, 0, 0.35);
  } else if (signalId === 'm_right') {
    // 3. TURN RIGHT: Left arm points straight out, Right arm beckons repeatedly
    const wave = Math.sin(tSec * 5.6);
    sL.set(0, 0, 1.58);
    eL.set(0, 0, 0);
    sR.set(-0.30, 0, -1.45);
    eR.set(-1.45 + wave * 0.58, 0, -0.35);
  } else if (signalId === 'm_slow') {
    // 4. SLOW DOWN (減速): Both arms extended downward/outward, patting gently up & down
    const pat = Math.sin(tSec * 4.4) * 0.28;
    sL.set(-0.25, 0, 1.02 + pat);
    eL.set(-0.22, 0, 0);
    sR.set(-0.25, 0, -1.02 - pat);
    eR.set(-0.22, 0, 0);
  } else if (signalId === 'm_stop') {
    // 5. NORMAL STOP (停止): Cross wands overhead in crisp X!
    sL.set(-0.25, 0, 2.75);
    eL.set(0, 0, 0.52);
    sR.set(-0.25, 0, -2.75);
    eR.set(0, 0, -0.52);
  } else if (signalId === 'm_emerg_stop' || signalId === 'spotter_stop') {
    // 6. EMERGENCY STOP / SPOTTER DANGER ALERT: Rapid high X-cross + urgent wave!
    const pulse = Math.sin(tSec * 12.0) * 0.22;
    sL.set(-0.35, 0, 2.68 + pulse);
    eL.set(0, 0, 0.58);
    sR.set(-0.35, 0, -2.68 - pulse);
    eR.set(0, 0, -0.58);
    headGroup.rotation.y = Math.sin(tSec * 6) * 0.18;
  } else if (signalId === 'm_chocks') {
    // 7. CHOCKS INSERTED (輪止め設置): Arms down-front swinging wands inward together
    const swing = (Math.sin(tSec * 3.8) + 1) * 0.5;
    sL.set(-0.65, 0, 0.58 - swing * 0.42);
    eL.set(-0.45, 0, 0);
    sR.set(-0.65, 0, -0.58 + swing * 0.42);
    eR.set(-0.45, 0, 0);
  } else if (signalId === 'm_allclear' || signalId === 'm_start') {
    // 8. ALL CLEAR / DEPARTURE OK: Right arm raised in crisp salute, Left at side
    sR.set(-0.20, 0, -2.55);
    eR.set(-0.45, 0, 0.72);
    sL.set(0, 0, 0.16);
    eL.set(0, 0, 0);
  } else if (signalId === 'watchman_clear' || signalId === 'wing_watch') {
    // 9. TEXTBOOK WATCHMAN "通過よし" (GHtext_1 p.8 & sws_ii_GH p.29 図2-13):
    //    Left arm held straight vertical overhead (180°), Right arm sweeping from horizontal to vertical!
    const sweep = (Math.sin(tSec * 4.2) + 1) * 0.5;
    sL.set(-0.12, 0, 2.98);
    eL.set(0, 0, 0.05);
    sR.set(-0.22, 0, -1.55 - sweep * 1.25);
    eR.set(-0.15, 0, 0);
    headGroup.rotation.y = Math.sin(tSec * 1.6) * 0.32;
  } else if (signalId === 'guideman_beckon') {
    // 10. GSE VEHICLE GUIDEMAN BECKON ("ピッ・ピッ" — GHtext_1 p.15):
    //     Both arms raised forward, elbows bending repeatedly inward guiding reversing/approaching GSE slowly
    const beck = (Math.sin(tSec * 5.8) + 1) * 0.5;
    sL.set(-1.35, 0, 0.35);
    eL.set(-0.55 - beck * 0.95, 0, 0.15);
    sR.set(-1.35, 0, -0.35);
    eR.set(-0.55 - beck * 0.95, 0, -0.15);
    headGroup.rotation.y = Math.sin(tSec * 2.2) * 0.28;
  } else if (signalId === 'guideman_hold') {
    // 11. GSE 5m BRAKE-CHECK FULL STOP ("5m手前一旦停止 — ピー！"): Both arms raised straight vertical overhead!
    sL.set(-0.18, 0, 2.95);
    sR.set(-0.18, 0, -2.95);
  } else if (signalId === 'point_and_call') {
    // 12. JAPANESE SHISA KOSHO ("指差呼称 — ヨシ！"): Right arm pointing crisply straight ahead + nod!
    const cyc = (tSec * 0.85) % 1.0;
    const raise = cyc < 0.72 ? 1.0 : Math.max(0, 1 - (cyc - 0.72) / 0.28);
    sR.set(-1.52 * raise, 0, -0.10);
    eR.set(0, 0, 0);
    if (crew.userData.armLeft.clipboard) {
      sL.set(-0.75, 0, 0.35);
      eL.set(-0.85, 0, -0.35);
    }
    headGroup.rotation.x = (cyc > 0.42 && cyc < 0.68) ? 0.22 : 0;
  } else if (signalId === 'bypass_pin_salute') {
    // 13. BYPASS PIN DISPLAY ("バイパスピン左前方提示" — NGO 02-2 p.4 & sws_ii_GH p.28):
    //     Left arm held high displaying fluttering RED Bypass Pin Streamer + Right arm crisp OK salute!
    sL.set(-0.35, 0, 2.65);
    eL.set(-0.18, 0, -0.12);
    if (armLeft.pinStreamer) {
      armLeft.pinStreamer.visible = true;
      // Keep red streamer hanging vertically downward & fluttering in propwash/breeze!
      armLeft.pinStreamer.rotation.z = -2.53 + Math.sin(tSec * 8.5) * 0.16;
    }
    const wave = Math.sin(tSec * 4.5) * 0.24;
    sR.set(-0.25, 0, -2.55 + wave);
    eR.set(-0.35, 0, 0.45);
  } else if (signalId === 'wave_off') {
    // 14. JAPANESE RAMP WAVE-OFF ("お見送り"): Respectful bow + warm synchronized wave to departing flight!
    const phase = tSec % 5.0;
    if (phase < 1.3) {
      const bow = Math.sin((phase / 1.3) * Math.PI);
      torso.rotation.x = bow * 0.36;
      headGroup.rotation.x = bow * 0.25;
      sL.set(0, 0, 0.10);
      sR.set(0, 0, -0.10);
    } else {
      const w = Math.sin(tSec * 5.2) * 0.32;
      sR.set(-0.28, 0, -2.58 + w);
      eR.set(-0.25, 0, 0.15 + w * 0.4);
      sL.set(-0.28, 0, 2.58 + w);
      eL.set(-0.25, 0, -0.15 + w * 0.4);
    }
  } else if (signalId === 'walk_escort') {
    // 15. WALKING ESCORT (Headset Man / Wingwalker walking alongside pushback at ~4 km/h)
    const stride = Math.sin(tSec * 5.6);
    leftLeg.rotation.x = stride * 0.48;
    rightLeg.rotation.x = -stride * 0.48;
    sL.set(-stride * 0.38, 0, 0.18);
    eL.set(-0.25, 0, 0);
    if (hasWands) {
      sR.set(-0.25, 0, -2.25);
      eR.set(-0.2, 0, 0);
    } else {
      sR.set(stride * 0.38, 0, -0.18);
      eR.set(-0.25, 0, 0);
    }
    headGroup.rotation.y = Math.sin(tSec * 1.8) * 0.26;
  } else if (signalId === 'spotter_clear') {
    const wave = Math.sin(tSec * 4.5);
    sR.set(-0.4, 0, -1.6 + wave * 0.45);
    eR.set(-0.8 + wave * 0.35, 0, 0);
    sL.set(0, 0, 0.22);
  }
}
