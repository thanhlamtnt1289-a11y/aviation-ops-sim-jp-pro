// Procedural High-Detail Three.js PBR Airliner Builder (10 Fleet Types: Regional Prop → Narrow-Body → Wide-Body → B777F Freighter)
import * as THREE from 'three';

const fuselageTexCache = new Map();

function getFuselageTexture(opts) {
  const key = `${opts.reg || 'JA102J'}_${opts.isFreighter ? 'F' : 'P'}_${(opts.tailColor || [27, 79, 156]).join('-')}`;
  if (fuselageTexCache.has(key)) return fuselageTexCache.get(key);

  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext('2d');

  // Glossy pearl-white upper fuselage & metallic light-gray lower belly
  const grd = ctx.createLinearGradient(0, 0, 0, c.height);
  grd.addColorStop(0.0, '#FFFFFF');
  grd.addColorStop(0.54, '#F4F7FB');
  grd.addColorStop(0.66, '#D9E2EC');
  grd.addColorStop(1.0, '#AEBCCB');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, c.width, c.height);

  // Subtle metallic panel seams
  ctx.strokeStyle = 'rgba(100,116,139,0.16)';
  ctx.lineWidth = 1;
  for (let x = 80; x < 940; x += 48) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, c.height); ctx.stroke();
  }

  // Airline cheatlines
  const tc = opts.tailColor || [27, 79, 156];
  ctx.fillStyle = `rgb(${tc[0]},${tc[1]},${tc[2]})`;
  ctx.fillRect(0, c.height * 0.54, c.width, 16);
  ctx.fillStyle = opts.isFreighter ? '#EA580C' : '#C92A2A';
  ctx.fillRect(0, c.height * 0.58, c.width, 7);

  if (!opts.isFreighter) {
    // 32 crisp oval cabin windows
    ctx.fillStyle = '#0F1C2E';
    for (let wx = 195; wx <= 820; wx += 19) {
      if (Math.abs(wx - 500) < 16) continue;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(wx, c.height * 0.42, 9, 16, 4);
      else ctx.fillRect(wx, c.height * 0.42, 9, 16);
      ctx.fill();
    }
  } else {
    // Main-deck cargo door outline (Orange-trimmed)
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 5;
    ctx.strokeRect(560, c.height * 0.30, 140, 120);
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 34px "Arial", sans-serif';
    ctx.fillText('JAPAN AIR CARGO', 250, c.height * 0.42);
  }

  // Cockpit wrap-around windshield
  ctx.fillStyle = '#0B1320';
  ctx.fillRect(c.width * 0.85, c.height * 0.34, c.width * 0.078, 34);

  // Doors L1/L2 & Registration
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.strokeRect(148, c.height * 0.38, 26, 68);
  ctx.strokeRect(818, c.height * 0.38, 26, 68);
  if (!opts.isFreighter) {
    ctx.fillStyle = `rgb(${tc[0]},${tc[1]},${tc[2]})`;
    ctx.font = '800 30px "Arial", sans-serif';
    ctx.fillText('JAPAN AIR OPS', 540, c.height * 0.37);
  }
  ctx.fillStyle = '#334155';
  ctx.font = '700 22px monospace';
  ctx.fillText(opts.reg || 'JA102J', 210, c.height * 0.37);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  fuselageTexCache.set(key, tex);
  return tex;
}

export function createDetailedAirliner3D(opts = {}) {
  const isWide = Boolean(opts.isWide);
  const isProp = Boolean(opts.isProp);
  const isFreighter = Boolean(opts.isFreighter);
  const fl = opts.fuseLen || 36;
  const halfL = fl * 0.5;
  const fw = isWide ? 2.85 : (isProp ? 1.45 : 1.95);
  const bodyY = isWide ? 5.2 : (isProp ? 2.85 : 4.1);
  const tc = opts.tailColor || [27, 79, 156];
  const tailHex = (tc[0] << 16) | (tc[1] << 8) | tc[2];
  const wSpan = opts.wingHalf || 18;

  const root = new THREE.Group();
  root.userData.fans = [];
  root.userData.lights = {};

  // PBR Materials
  const fuseTex = getFuselageTexture(opts);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    map: fuseTex,
    color: 0xffffff,
    roughness: 0.22,
    metalness: 0.14,
    clearcoat: 0.92,
    clearcoatRoughness: 0.14
  });
  const wingMat = new THREE.MeshStandardMaterial({ color: 0xe6ecf4, roughness: 0.28, metalness: 0.32 });
  const tailMat = new THREE.MeshPhysicalMaterial({ color: tailHex, roughness: 0.25, metalness: 0.18, clearcoat: 0.8 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0dae6, roughness: 0.18, metalness: 0.85 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x263140, roughness: 0.35, metalness: 0.72 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x1a1e24, roughness: 0.88, metalness: 0.05 });

  // 1. Aerodynamic Lathe Fuselage (smooth 28 segments, nose along +Z)
  const profile = [
    new THREE.Vector2(0.01, -halfL - 2.4),
    new THREE.Vector2(0.32, -halfL - 2.1),
    new THREE.Vector2(fw * 0.55, -halfL * 0.82),
    new THREE.Vector2(fw * 0.92, -halfL * 0.58),
    new THREE.Vector2(fw, -halfL * 0.35),
    new THREE.Vector2(fw, halfL * 0.62),
    new THREE.Vector2(fw * 0.84, halfL * 0.82),
    new THREE.Vector2(fw * 0.48, halfL * 0.94),
    new THREE.Vector2(0.18, halfL + 1.55),
    new THREE.Vector2(0.01, halfL + 1.85)
  ];
  const fuseGeo = new THREE.LatheGeometry(profile, 28);
  fuseGeo.rotateX(Math.PI / 2); // Align Lathe Y-axis onto +Z (Nose)
  // Fix UV mapping so u runs tail->nose and v runs top->bottom symmetrically on both sides
  const posAttr = fuseGeo.attributes.position;
  const uvAttr = fuseGeo.attributes.uv;
  for (let i = 0; i < posAttr.count; i++) {
    const py = posAttr.getY(i);
    const pz = posAttr.getZ(i);
    const u = (pz + halfL + 2.4) / (fl + 4.25);
    const v = 0.5 + (py / (fw * 2.05));
    uvAttr.setXY(i, Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
  }
  const fuseMesh = new THREE.Mesh(fuseGeo, bodyMat);
  fuseMesh.position.y = bodyY;
  fuseMesh.castShadow = true;
  fuseMesh.receiveShadow = true;
  root.add(fuseMesh);

  // Cockpit wrap-around dark glass visor
  const visorGeo = new THREE.CylinderGeometry(fw * 0.86, fw * 0.94, 0.95, 16, 1, true, -Math.PI * 0.38, Math.PI * 0.76);
  const visorMat = new THREE.MeshPhysicalMaterial({ color: 0x0b1526, roughness: 0.08, metalness: 0.8, clearcoat: 1.0 });
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, bodyY + fw * 0.28, halfL * 0.78);
  root.add(visor);

  // 2. Swept 3D Main Wings + Winglets / Sharklets
  const wY = isProp ? (bodyY + fw * 0.78) : (bodyY - fw * 0.25);
  [-1, 1].forEach(side => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 4.5);
    shape.lineTo(wSpan - fw * 0.6, isProp ? -1.4 : -5.0);
    shape.lineTo(wSpan - fw * 0.6, isProp ? -3.4 : -7.6);
    shape.lineTo(0, -4.4);
    shape.closePath();

    const wingGeo = new THREE.ExtrudeGeometry(shape, { depth: isWide ? 0.68 : 0.48, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.12, bevelSegments: 2 });
    wingGeo.rotateX(Math.PI / 2);
    if (side < 0) wingGeo.scale(-1, 1, 1);
    const wingMesh = new THREE.Mesh(wingGeo, wingMat);
    wingMesh.position.set(side * fw * 0.65, wY + 0.35, 0);
    wingMesh.rotation.z = side * (isProp ? 0.015 : 0.055);
    wingMesh.castShadow = true;
    wingMesh.receiveShadow = true;
    root.add(wingMesh);

    // Winglet / Sharklet
    if (!isProp) {
      const wlShape = new THREE.Shape();
      wlShape.moveTo(0, 0);
      wlShape.lineTo(2.4, 0);
      wlShape.lineTo(1.5, 2.75);
      wlShape.lineTo(0.4, 2.75);
      wlShape.closePath();
      const wlGeo = new THREE.ExtrudeGeometry(wlShape, { depth: 0.14, bevelEnabled: false });
      wlGeo.rotateY(Math.PI / 2);
      const wlMesh = new THREE.Mesh(wlGeo, tailMat);
      wlMesh.position.set(side * (wSpan + 0.02), wY + 1.15, -5.2);
      wlMesh.rotation.z = -side * 0.18;
      wlMesh.castShadow = true;
      root.add(wlMesh);
    }
  });

  // 3. Closed 3D Vertical Stabilizer & Horizontal Stabilizers
  const vH = isWide ? 9.6 : (isProp ? 6.6 : 7.4);
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(halfL * 0.46, 0);
  finShape.lineTo(halfL * 0.16, vH);
  finShape.lineTo(-halfL * 0.12, vH);
  finShape.closePath();
  const finGeo = new THREE.ExtrudeGeometry(finShape, { depth: 0.46, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 2 });
  finGeo.rotateY(Math.PI / 2);
  const finMesh = new THREE.Mesh(finGeo, tailMat);
  finMesh.position.set(-0.23, bodyY + fw * 0.68, -halfL * 0.98);
  finMesh.castShadow = true;
  root.add(finMesh);

  // Horizontal Stabilizers (T-Tail for Dash 8-Q400)
  const hSpan = isWide ? 8.2 : (isProp ? 5.2 : 6.4);
  const hY = isProp ? (bodyY + fw * 0.68 + vH - 0.35) : (bodyY + fw * 0.38);
  const hZ = isProp ? -halfL * 1.02 : -halfL * 0.85;
  [-1, 1].forEach(side => {
    const hShape = new THREE.Shape();
    hShape.moveTo(0, 2.0);
    hShape.lineTo(hSpan, -0.4);
    hShape.lineTo(hSpan, -1.6);
    hShape.lineTo(0, -1.2);
    hShape.closePath();
    const hGeo = new THREE.ExtrudeGeometry(hShape, { depth: 0.24, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 1 });
    hGeo.rotateX(Math.PI / 2);
    if (side < 0) hGeo.scale(-1, 1, 1);
    const hMesh = new THREE.Mesh(hGeo, wingMat);
    hMesh.position.set(side * 0.2, hY, hZ);
    hMesh.castShadow = true;
    root.add(hMesh);
  });

  // 4. Twin Under-Wing Turbofans (or Turboprop Propellers for DHC8) PROPERLY positioned at x = ±engOff!
  const engOff = isWide ? 7.8 : (isProp ? 4.8 : 6.0);
  const engR = isWide ? 1.52 : (isProp ? 0.62 : 1.14);
  const engY = isWide ? 2.48 : (isProp ? (wY - 0.45) : 2.12);
  [-engOff, engOff].forEach(ex => {
    const engGroup = new THREE.Group();
    engGroup.position.set(ex, engY, 1.3);

    // Outer nacelle cowling
    const cowlGeo = new THREE.CylinderGeometry(engR * 0.92, engR * 0.78, 4.4, 22, 1, false);
    cowlGeo.rotateX(Math.PI / 2);
    const cowl = new THREE.Mesh(cowlGeo, wingMat);
    cowl.castShadow = true;
    engGroup.add(cowl);

    // Metallic chrome intake lip ring
    const lipGeo = new THREE.TorusGeometry(engR * 0.90, 0.11, 10, 24);
    const lip = new THREE.Mesh(lipGeo, metalMat);
    lip.position.z = 2.18;
    engGroup.add(lip);

    // Exhaust titanium cone
    const exGeo = new THREE.ConeGeometry(engR * 0.56, 1.6, 16);
    exGeo.rotateX(-Math.PI / 2);
    const exMesh = new THREE.Mesh(exGeo, darkMetalMat);
    exMesh.position.z = -2.6;
    engGroup.add(exMesh);

    // Spinning Fan Assembly / Propellers
    const fanGroup = new THREE.Group();
    fanGroup.position.z = isProp ? 2.38 : 2.08;
    if (isProp) {
      const hub = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.7, 12).rotateX(Math.PI / 2), metalMat);
      fanGroup.add(hub);
      for (let b = 0; b < 6; b++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.05, 0.05), darkMetalMat);
        blade.rotation.z = (b / 6) * Math.PI * 2;
        blade.position.set(Math.sin(blade.rotation.z) * -0.95, Math.cos(blade.rotation.z) * 0.95, 0);
        fanGroup.add(blade);
      }
    } else {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(engR * 0.85, 20), darkMetalMat);
      fanGroup.add(disc);
      const spinner = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.55, 12).rotateX(Math.PI / 2), metalMat);
      spinner.position.z = 0.14;
      fanGroup.add(spinner);
      for (let b = 0; b < 10; b++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.14, engR * 0.78, 0.04), metalMat);
        const ang = (b / 10) * Math.PI * 2;
        blade.rotation.z = ang;
        blade.position.set(-Math.sin(ang) * engR * 0.42, Math.cos(ang) * engR * 0.42, 0.05);
        fanGroup.add(blade);
      }
    }
    engGroup.add(fanGroup);
    root.userData.fans.push(fanGroup);

    // Pylon mounting engine cleanly up into the wing
    if (!isProp) {
      const pyH = Math.max(0.8, (wY - engY) + 0.5);
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.46, pyH, 3.6), wingMat);
      pylon.position.set(0, engR * 0.65 + pyH * 0.32, -0.5);
      pylon.castShadow = true;
      engGroup.add(pylon);
    }

    root.add(engGroup);
  });

  // 5. Realistic Multi-Wheel Landing Gear (Nose + Left/Right Main Bogies)
  const gearGroup = new THREE.Group();
  const addBogie = (gx, gz, wheelR, tandem) => {
    const strutH = Math.max(1.2, bodyY - fw * 0.65 - wheelR);
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, strutH, 10), metalMat);
    strut.position.set(gx, wheelR + strutH * 0.5, gz);
    strut.castShadow = true;
    gearGroup.add(strut);

    const zOffs = tandem ? [-wheelR * 1.15, wheelR * 1.15] : [0];
    zOffs.forEach(zo => {
      [-0.46, 0.46].forEach(wx => {
        const tire = new THREE.Mesh(new THREE.CylinderGeometry(wheelR, wheelR, 0.36, 16).rotateZ(Math.PI / 2), tireMat);
        tire.position.set(gx + wx, wheelR, gz + zo);
        tire.castShadow = true;
        gearGroup.add(tire);
      });
    });
  };
  const gearTrack = isWide ? 4.8 : 3.4;
  addBogie(0, halfL * 0.72, 0.52, false);
  addBogie(-gearTrack, -1.0, isWide ? 0.74 : 0.68, isWide);
  addBogie(gearTrack, -1.0, isWide ? 0.74 : 0.68, isWide);
  root.add(gearGroup);
  root.userData.gearGroup = gearGroup;

  // 6. Emissive Navigation Lights, Beacons & Strobes (Bloom-ready!)
  const makeLightDot = (col, r, x, y, z) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(r, 10, 10),
      new THREE.MeshBasicMaterial({ color: col })
    );
    m.position.set(x, y, z);
    root.add(m);
    return m;
  };
  // Local +X = Port/Left or Starboard? With heading=+PI/2 (nose +Z), +X in aircraft local when rotation.y = 0 faces +Z:
  // In Three.js standard right-handed coords with nose along +Z and up +Y, LEFT (Port) is +X and RIGHT (Starboard) is -X!
  root.userData.lights.portNav = makeLightDot(0xff2a2a, 0.28, wSpan + 0.2, wY + 1.25, -6.2);    // Red Port (Left)
  root.userData.lights.stbdNav = makeLightDot(0x22ff66, 0.28, -wSpan - 0.2, wY + 1.25, -6.2);  // Green Starboard (Right)
  root.userData.lights.beaconTop = makeLightDot(0xff1e1e, 0.34, 0, bodyY + fw + 0.25, 1.4);
  root.userData.lights.noseLight = makeLightDot(0xfffbeb, 0.32, 0, bodyY - fw * 0.65, halfL * 0.76);
  root.userData.lights.strobeL = makeLightDot(0xffffff, 0.42, wSpan + 0.35, wY + 1.35, -6.4);
  root.userData.lights.strobeR = makeLightDot(0xffffff, 0.42, -wSpan - 0.35, wY + 1.35, -6.4);

  return root;
}
