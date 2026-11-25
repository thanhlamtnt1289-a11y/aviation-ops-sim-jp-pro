// Articulated 3D Airport Ground Crew (Authentic ICAO/JCAB Marshaller Signals + Warning Spotters)
// & Realistic Japanese Airport Open-Cab Baggage Towing Tractor (TT Mui Trần) w/ Turning Wheels & Towed Carts
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

  // Heavy lower chassis & side steps (length along +Z = forward!)
  addPart(new THREE.BoxGeometry(1.62, 0.38, 3.35), matChassisDark, 0, 0.54, 0);
  // Front sloped engine hood (classic low-profile Japanese airport TT)
  addPart(new THREE.BoxGeometry(1.52, 0.56, 1.48), matBodyWhite, 0, 0.96, 0.88);
  addPart(new THREE.BoxGeometry(1.56, 0.14, 1.50), matAccentYellow, 0, 0.78, 0.88);
  // Sloped hood grille
  addPart(new THREE.BoxGeometry(1.24, 0.34, 0.10), matChassisDark, 0, 0.96, 1.62);
  // Rear counterweight deck (open flatbed rear w/ yellow safety stripe)
  addPart(new THREE.BoxGeometry(1.58, 0.52, 1.05), matBodyWhite, 0, 0.94, -1.12);
  addPart(new THREE.BoxGeometry(1.60, 0.15, 1.08), matAccentYellow, 0, 0.78, -1.12);
  // Front & rear heavy rubber bumpers + rear tow hitch coupler
  addPart(new THREE.BoxGeometry(1.68, 0.24, 0.20), matRubber, 0, 0.56, 1.72);
  addPart(new THREE.BoxGeometry(1.68, 0.24, 0.18), matRubber, 0, 0.56, -1.70);
  addPart(new THREE.CylinderGeometry(0.06, 0.06, 0.32, 8), matRim, 0, 0.62, -1.86);

  // Open-Cab ("Mui trần") Side Cowls + Low Windshield Frame (NO enclosed roof!)
  addPart(new THREE.BoxGeometry(0.12, 0.52, 1.05), matBodyWhite, -0.75, 0.92, -0.15);
  addPart(new THREE.BoxGeometry(0.12, 0.52, 1.05), matBodyWhite, 0.75, 0.92, -0.15);
  // Low angled windscreen posts + glass
  addPart(new THREE.BoxGeometry(0.07, 0.68, 0.07), matChassisDark, -0.72, 1.48, 0.36, -0.22);
  addPart(new THREE.BoxGeometry(0.07, 0.68, 0.07), matChassisDark, 0.72, 1.48, 0.36, -0.22);
  addPart(new THREE.BoxGeometry(1.50, 0.06, 0.07), matChassisDark, 0, 1.80, 0.28);
  addPart(new THREE.BoxGeometry(1.38, 0.58, 0.04), matGlass, 0, 1.50, 0.35, -0.22);

  // Rear safety roll-bar hoop (classic open-cab airport TT safety frame) + Rotating Yellow Beacon!
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

  // Open Cockpit Interior: Steering Column, Steering Wheel, Dual Seats & Live Driver!
  addPart(new THREE.CylinderGeometry(0.045, 0.055, 0.62, 8), matChassisDark, 0.34, 1.24, 0.16, -0.52);
  const steerWheel = addPart(new THREE.TorusGeometry(0.20, 0.032, 8, 16), matRubber, 0.34, 1.48, 0.02, 1.05);
  // Driver seat (Right-hand drive for Japan!) + Passenger/Escort seat (Left)
  addPart(new THREE.BoxGeometry(0.52, 0.14, 0.52), matSeat, 0.34, 0.90, -0.34);
  addPart(new THREE.BoxGeometry(0.52, 0.58, 0.12), matSeat, 0.34, 1.20, -0.56);
  addPart(new THREE.BoxGeometry(0.50, 0.14, 0.50), matSeat, -0.34, 0.90, -0.34);
  addPart(new THREE.BoxGeometry(0.50, 0.54, 0.12), matSeat, -0.34, 1.18, -0.56);

  // Driver character inside open cab (High-vis yellow vest + white helmet + arms on wheel)
  const driverGroup = new THREE.Group();
  driverGroup.position.set(0.34, 0.98, -0.34);
  addPart(new THREE.BoxGeometry(0.42, 0.52, 0.24), new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.5 }), 0, 0.32, 0, 0, 0, 0, driverGroup);
  addPart(new THREE.BoxGeometry(0.44, 0.08, 0.26), new THREE.MeshBasicMaterial({ color: 0xe2e8f0 }), 0, 0.26, 0, 0, 0, 0, driverGroup);
  addPart(new THREE.SphereGeometry(0.15, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.6 }), 0, 0.72, 0.02, 0, 0, 0, driverGroup);
  addPart(new THREE.SphereGeometry(0.165, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.58), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }), 0, 0.75, 0.02, 0, 0, 0, driverGroup);
  // Driver arms reaching forward to steering wheel
  addPart(new THREE.CylinderGeometry(0.055, 0.05, 0.44, 8), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 }), -0.22, 0.45, 0.18, Math.PI / 2.4, 0.18, 0, driverGroup);
  addPart(new THREE.CylinderGeometry(0.055, 0.05, 0.44, 8), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 }), 0.22, 0.45, 0.18, Math.PI / 2.4, -0.18, 0, driverGroup);
  g.add(driverGroup);

  // Headlights (Low-beam downward cones per NGO J02 rule!) & Tail/Brake Lights
  const headMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
  addPart(new THREE.BoxGeometry(0.24, 0.14, 0.06), headMat, -0.52, 0.96, 1.63);
  addPart(new THREE.BoxGeometry(0.24, 0.14, 0.06), headMat, 0.52, 0.96, 1.63);
  const beamGeo = new THREE.ConeGeometry(1.2, 5.2, 10, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3, transparent: true, opacity: 0.10, side: THREE.DoubleSide, depthWrite: false });
  const beamL = new THREE.Mesh(beamGeo, beamMat);
  beamL.position.set(-0.48, 0.55, 4.1);
  beamL.rotation.x = -Math.PI / 2 - 0.16; // Pointed DOWNWARD (low beam)
  const beamR = beamL.clone();
  beamR.position.x = 0.48;
  g.add(beamL, beamR);

  const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  addPart(new THREE.BoxGeometry(0.22, 0.12, 0.06), tailMat, -0.56, 0.96, -1.66);
  addPart(new THREE.BoxGeometry(0.22, 0.12, 0.06), tailMat, 0.56, 0.96, -1.66);

  // 4 Turning/Spinning Wheels (Front pivot groups for realistic steering!)
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

  // High-Vehicle (>3.8m) Removable Scissor-Mast Cage Visual (shown when user picks 'high38' mode!)
  const highMast = new THREE.Group();
  highMast.visible = false;
  addPart(new THREE.BoxGeometry(1.55, 2.85, 2.2), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 }), 0, 2.75, -0.35, 0, 0, 0, highMast);
  addPart(new THREE.BoxGeometry(1.62, 0.28, 2.26), matAccentYellow, 0, 4.18, -0.35, 0, 0, 0, highMast);
  g.add(highMast);

  g.userData = {
    frontPivots,
    allWheels,
    steerWheel,
    beaconBulb,
    beaconHalo,
    beams: [beamL, beamR],
    highMast
  };
  return g;
}

// Towed Baggage Cart / Container Dolly (up to 6 units per NGO J03-2 rule!)
export function createBaggageCart3D(idx = 0) {
  const g = new THREE.Group();
  const matFrame = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.4 });
  const matDeck = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.55, metalness: 0.35 });
  const matBag = new THREE.MeshStandardMaterial({ color: idx % 2 === 0 ? 0x2563eb : 0xd97706, roughness: 0.5 });
  const matRubber = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });

  const add = (geo, mat, x, y, z) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
  };
  add(new THREE.BoxGeometry(1.52, 0.16, 2.45), matDeck, 0, 0.44, 0);
  // Tow bar tongue pointing forward (+Z)
  add(new THREE.BoxGeometry(0.10, 0.08, 0.95), matFrame, 0, 0.44, 1.65);
  // Side safety rails + luggage/AKH box
  add(new THREE.BoxGeometry(0.06, 0.55, 2.4), matFrame, -0.74, 0.76, 0);
  add(new THREE.BoxGeometry(0.06, 0.55, 2.4), matFrame, 0.74, 0.76, 0);
  add(new THREE.BoxGeometry(1.30, 0.86, 1.95), matBag, 0, 0.95, 0);
  // 4 dolly wheels
  [[-0.72, 0.24, 0.85], [0.72, 0.24, 0.85], [-0.72, 0.24, -0.85], [0.72, 0.24, -0.85]].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 12), matRubber);
    w.rotation.z = Math.PI / 2;
    w.position.set(wx, wy, wz);
    g.add(w);
  });
  return g;
}

// =========================================================================
// 2. ARTICULATED 3D AIRPORT GROUND STAFF (Marshaller / Spotter / Wing Walker / Headset)
// =========================================================================
export function createArticulatedCrew3D(role = 'marshaller') {
  const root = new THREE.Group();

  const vestCol = role === 'spotter' ? 0xf97316 : (role === 'headset' ? 0x38bdf8 : 0x84cc16);
  const helmetCol = role === 'spotter' ? 0xfacc15 : (role === 'headset' ? 0x0f172a : 0xf8fafc);
  const wandCol = role === 'spotter' ? 0xef4444 : 0xff5a1f;

  const matPants = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 });
  const matVest = new THREE.MeshStandardMaterial({ color: vestCol, roughness: 0.45 });
  const matReflect = new THREE.MeshBasicMaterial({ color: 0xf1f5f9 });
  const matSleeve = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.65 });
  const matSkin = new THREE.MeshStandardMaterial({ color: 0xf1c27d, roughness: 0.55 });
  const matHelmet = new THREE.MeshStandardMaterial({ color: helmetCol, roughness: 0.3, metalness: 0.15 });
  const matWand = new THREE.MeshBasicMaterial({ color: wandCol });
  const matGrip = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });

  // Scale slightly up (~1.25x real human = 2.15m tall) so arm signals are unmistakably clear in 3D view!
  const scaleWrap = new THREE.Group();
  scaleWrap.scale.setScalar(1.22);
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

  // Torso with High-Visibility Safety Vest & Reflective Strips
  const torso = new THREE.Group();
  torso.position.set(0, 1.18, 0);
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.64, 0.25), matVest);
  chest.castShadow = true;
  torso.add(chest);
  // Horizontal & vertical reflective vest bands
  const band1 = new THREE.Mesh(new THREE.BoxGeometry(0.475, 0.07, 0.265), matReflect);
  band1.position.y = -0.14;
  const band2 = new THREE.Mesh(new THREE.BoxGeometry(0.475, 0.07, 0.265), matReflect);
  band2.position.y = 0.08;
  torso.add(band1, band2);
  scaleWrap.add(torso);

  // Head + Helmet + Hearing Protection Earmuffs!
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.66, 0);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.155, 14, 12), matSkin);
  skull.castShadow = true;
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.172, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.58), matHelmet);
  helmet.position.y = 0.03;
  const brim = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.025, 0.14), matHelmet);
  brim.position.set(0, 0.06, 0.15);
  // Yellow/Black Earmuffs
  const earL = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.05, 10), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 }));
  earL.rotation.z = Math.PI / 2; earL.position.set(-0.17, 0, 0);
  const earR = earL.clone(); earR.position.x = 0.17;
  headGroup.add(skull, helmet, brim, earL, earR);
  scaleWrap.add(headGroup);

  // Articulated Shoulder -> Upper Arm -> Elbow -> Forearm -> Glowing Marshalling Wand!
  const buildArm = side => {
    // side: -1 = viewer's left (character's right if facing +Z), +1 = character's left
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

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), matSkin);
    hand.position.y = -0.32;
    elbow.add(hand);

    // Glowing ICAO Orange/Red Marshalling Wand (48cm baton extending along forearm!)
    const wandGroup = new THREE.Group();
    wandGroup.position.set(0, -0.35, 0);
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.14, 8), matGrip);
    grip.position.y = -0.06;
    const baton = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.030, 0.50, 10), matWand);
    baton.position.y = -0.36;
    const glowHalo = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.054, 0.52, 8),
      new THREE.MeshBasicMaterial({ color: wandCol, transparent: true, opacity: 0.32 })
    );
    glowHalo.position.y = -0.36;
    wandGroup.add(grip, baton, glowHalo);
    if (role === 'headset') wandGroup.visible = false;
    elbow.add(wandGroup);

    scaleWrap.add(shoulder);
    return { shoulder, elbow, wandGroup };
  };

  // Character faces +Z in local space: character's LEFT arm is at +X, RIGHT arm is at -X
  const armLeft = buildArm(1);
  const armRight = buildArm(-1);

  root.userData = { role, torso, headGroup, leftLeg, rightLeg, armLeft, armRight };
  return root;
}

// =========================================================================
// 3. AUTHENTIC ICAO / JCAB MARSHALLER ARM KINEMATICS (ALL 8 OFFICIAL SIGNALS!)
// Character faces +Z (towards oncoming pilot/driver):
//   armLeft is at +X (character's left), armRight is at -X (character's right)
//   shoulder.rotation.z > 0 lifts armLeft outward/upward; < 0 lifts armRight outward/upward
//   shoulder.rotation.x < 0 lifts arm forward (+Z)
// =========================================================================
export function animateCrewSignal(crew, signalId, tSec) {
  if (!crew || !crew.userData || !crew.userData.armLeft) return;
  const { armLeft, armRight, torso, headGroup } = crew.userData;
  const sL = armLeft.shoulder.rotation;
  const eL = armLeft.elbow.rotation;
  const sR = armRight.shoulder.rotation;
  const eR = armRight.elbow.rotation;

  // Reset neutral stance
  sL.set(0, 0, 0.14); eL.set(0, 0, 0);
  sR.set(0, 0, -0.14); eR.set(0, 0, 0);
  torso.rotation.set(0, 0, 0);
  headGroup.rotation.set(0, 0, 0);

  if (signalId === 'm_straight') {
    // 1. STRAIGHT AHEAD (直進): Arms out to sides, elbows bent, wands sweeping upward & backward repeatedly
    const wave = Math.sin(tSec * 5.2);
    sL.set(-0.35, 0, 1.48);
    eL.set(-1.35 + wave * 0.52, 0, 0.35);
    sR.set(-0.35, 0, -1.48);
    eR.set(-1.35 + wave * 0.52, 0, -0.35);
  } else if (signalId === 'm_left') {
    // 2. TURN LEFT (pilot's left = marshaller's right): Right arm points straight out, Left arm beckons repeatedly
    const wave = Math.sin(tSec * 5.6);
    sR.set(0, 0, -1.58);
    eR.set(0, 0, 0);
    sL.set(-0.30, 0, 1.45);
    eL.set(-1.45 + wave * 0.58, 0, 0.35);
  } else if (signalId === 'm_right') {
    // 3. TURN RIGHT (pilot's right = marshaller's left): Left arm points straight out, Right arm beckons repeatedly
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
    // 5. NORMAL STOP (停止): Smoothly raise arms overhead crossing wands in an X!
    sL.set(-0.25, 0, 2.75);
    eL.set(0, 0, 0.52);
    sR.set(-0.25, 0, -2.75);
    eR.set(0, 0, -0.52);
  } else if (signalId === 'm_emerg_stop' || signalId === 'spotter_stop') {
    // 6. EMERGENCY STOP / SPOTTER DANGER ALERT: Rapid high X-cross + urgent pulsing wave!
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
    // 8. ALL CLEAR / START ENGINE / DEPARTURE OK: Right arm raised in crisp salute / thumbs-up, Left at side
    sR.set(-0.20, 0, -2.55);
    eR.set(-0.45, 0, 0.72);
    sL.set(0, 0, 0.16);
    eL.set(0, 0, 0);
  } else if (signalId === 'wing_watch') {
    // Wing Walker holding clear-to-proceed wand steady at 45° while scanning wingtip
    sL.set(-0.2, 0, 2.25);
    sR.set(0, 0, -0.35);
    headGroup.rotation.y = Math.sin(tSec * 1.4) * 0.45;
  } else if (signalId === 'spotter_clear') {
    // Ground Spotter waving vehicle through safely
    const wave = Math.sin(tSec * 4.5);
    sR.set(-0.4, 0, -1.6 + wave * 0.45);
    eR.set(-0.8 + wave * 0.35, 0, 0);
    sL.set(0, 0, 0.22);
  }
}
