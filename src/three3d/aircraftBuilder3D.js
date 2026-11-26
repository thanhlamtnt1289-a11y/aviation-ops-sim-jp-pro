// Procedural High-Detail Three.js PBR Airliner Builder (Regional Turboprop DHC8 · Neighbor Fleet · B777F Freighter)
// Authentic Japanese Airline Liveries (ANA / JAL / ANA Cargo) with left-to-right readable Forward Fuselage Titles & Swept Tail Logos!
import * as THREE from 'three';

const fuselageTexCache = new Map();
const tailTexCache = new Map();

function resolveBrandFromOpts(opts = {}) {
  const reg = String(opts.reg || 'JA102J');
  if (opts.isFreighter) return 'ANA_CARGO';
  if (opts.liveryId === 'JAL' || reg.endsWith('J') && (opts.tailColor && opts.tailColor[0] > 140)) return 'JAL';
  return 'ANA';
}

function drawTsurumaruMini(ctx, cx, cy, r) {
  ctx.save();
  ctx.fillStyle = '#D6001C';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    ctx.lineWidth = r * (0.07 - i * 0.012);
    ctx.beginPath(); ctx.arc(cx - r * 0.1, cy - r * 0.05, r * (0.76 - i * 0.12), -Math.PI * 0.78, -Math.PI * 0.18); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + r * 0.1, cy - r * 0.05, r * (0.76 - i * 0.12), -Math.PI * 0.82, -Math.PI * 0.22); ctx.stroke();
  }
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `900 ${Math.round(r * 0.56)}px "Arial Black", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JAL', cx, cy + r * 0.42);
  ctx.restore();
}

function getFuselageTexture(opts, sideSign = 1) {
  const brand = resolveBrandFromOpts(opts);
  const key = `${brand}_${opts.reg || 'JA102J'}_${opts.isProp ? 'P' : 'J'}_${sideSign > 0 ? 'PORT' : 'STBD'}`;
  if (fuselageTexCache.has(key)) return fuselageTexCache.get(key);

  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext('2d');

  // Note: sideSign > 0 (Port +X): Screen Left = Nose (u=0 -> u=1 Nose->Tail)
  //       sideSign < 0 (Starboard -X): Screen Left = Tail, Screen Right = Nose (u=0 -> u=1 Tail->Nose)
  const xAtNoseFrac = f => (sideSign > 0 ? f * 1024 : (1 - f) * 1024);

  const grd = ctx.createLinearGradient(0, 0, 0, c.height);
  grd.addColorStop(0.0, '#FFFFFF');
  grd.addColorStop(0.56, '#F8FAFC');
  grd.addColorStop(0.68, '#DCE4EE');
  grd.addColorStop(1.0, '#B8C4D4');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, c.width, c.height);

  // Airline accent stripe
  if (brand === 'ANA' || brand === 'ANA_CARGO') {
    ctx.fillStyle = '#0B3B8C';
    ctx.fillRect(0, c.height * 0.56, c.width, 14);
    ctx.fillStyle = '#1EA1E8';
    ctx.fillRect(0, c.height * 0.59, c.width, 8);
  } else {
    ctx.fillStyle = '#D6001C';
    ctx.fillRect(0, c.height * 0.57, c.width, 7);
  }

  // Cockpit wrap-around windshield near nose (f = 0.06..0.12)
  const noseW1 = xAtNoseFrac(0.055), noseW2 = xAtNoseFrac(0.125);
  ctx.fillStyle = '#0B1320';
  ctx.fillRect(Math.min(noseW1, noseW2), c.height * 0.34, Math.abs(noseW2 - noseW1), 34);

  if (!opts.isFreighter) {
    ctx.fillStyle = '#0F1C2E';
    for (let f = 0.18; f <= 0.80; f += 0.022) {
      if (Math.abs(f - 0.48) < 0.02) continue;
      const wx = xAtNoseFrac(f) - 4;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(wx, c.height * 0.43, 8, 15, 3);
      else ctx.fillRect(wx, c.height * 0.43, 8, 15);
      ctx.fill();
    }
  } else {
    const cd1 = xAtNoseFrac(0.22), cd2 = xAtNoseFrac(0.36);
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 4;
    ctx.strokeRect(Math.min(cd1, cd2), c.height * 0.28, Math.abs(cd2 - cd1), 118);
  }

  // Doors L1/R1 & L4/R4
  [0.145, 0.835].forEach(df => {
    const dx = xAtNoseFrac(df) - 12;
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 3;
    ctx.strokeRect(dx, c.height * 0.38, 24, 66);
  });

  // Forward Upper Fuselage Airline Title (f ≈ 0.28 from nose — ALWAYS left-to-right readable!)
  const titleCenterX = xAtNoseFrac(0.30);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (brand === 'ANA_CARGO') {
    ctx.fillStyle = '#0B3B8C';
    ctx.font = 'italic 900 36px "Arial Black", sans-serif';
    ctx.fillText('ANA CARGO', titleCenterX, c.height * 0.34);
  } else if (brand === 'JAL') {
    ctx.fillStyle = '#1E293B';
    ctx.font = '900 32px "Arial Black", sans-serif';
    ctx.fillText('JAPAN AIRLINES', titleCenterX, c.height * 0.35);
  } else {
    ctx.fillStyle = '#0B3B8C';
    ctx.font = 'italic 900 36px "Arial Black", sans-serif';
    ctx.fillText(opts.isProp ? 'ANA WINGS' : 'ANA', titleCenterX - 65, c.height * 0.35);
    if (!opts.isProp) {
      ctx.fillStyle = '#1E3A8A';
      ctx.font = '700 20px "Arial", sans-serif';
      ctx.fillText('Inspiration of JAPAN', titleCenterX + 55, c.height * 0.35);
    }
  }

  // Aft Registration + Hinomaru Flag (f ≈ 0.76 from nose)
  const regX = xAtNoseFrac(0.75);
  ctx.fillStyle = '#334155';
  ctx.font = '700 22px "Arial", monospace';
  ctx.fillText(opts.reg || 'JA801A', regX, c.height * 0.35);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  fuselageTexCache.set(key, tex);
  return tex;
}

function getTailFinTexture(opts, sideSign = 1) {
  const brand = resolveBrandFromOpts(opts);
  const key = `${brand}_${sideSign > 0 ? 'PORT' : 'STBD'}`;
  if (tailTexCache.has(key)) return tailTexCache.get(key);

  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext('2d');

  if (brand === 'JAL') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    drawTsurumaruMini(ctx, 256, 260, 145);
  } else {
    // ANA Swept Triton Blue + Mohican Blue aft stripe
    ctx.fillStyle = '#0B3B8C';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#1EA1E8';
    if (sideSign > 0) {
      ctx.fillRect(390, 0, 122, 512);
    } else {
      ctx.fillRect(0, 0, 122, 512);
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'italic 900 112px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ANA', 256, 238);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tailTexCache.set(key, tex);
  return tex;
}

export function createDetailedAirliner3D(opts = {}) {
  const isWide = Boolean(opts.isWide);
  const isProp = Boolean(opts.isProp);
  const brand = resolveBrandFromOpts(opts);
  const fl = opts.fuseLen || 36;
  const halfL = fl * 0.5;
  const fw = isWide ? 2.85 : (isProp ? 1.45 : 1.95);
  const bodyY = isWide ? 5.2 : (isProp ? 2.85 : 4.1);
  const wingletHex = brand === 'JAL' ? 0xd6001c : 0x0b3b8c;
  const wSpan = opts.wingHalf || 18;

  const root = new THREE.Group();
  root.userData.fans = [];
  root.userData.lights = {};

  const wingMat = new THREE.MeshStandardMaterial({ color: 0xe6ecf4, roughness: 0.28, metalness: 0.32 });
  const wingletMat = new THREE.MeshPhysicalMaterial({ color: wingletHex, roughness: 0.25, metalness: 0.18, clearcoat: 0.8 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd0dae6, roughness: 0.18, metalness: 0.85 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x263140, roughness: 0.35, metalness: 0.72 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x1a1e24, roughness: 0.88, metalness: 0.05 });

  // 1. Split Port (+X) & Starboard (-X) Half-Lathe Fuselage so Airline Titles read left-to-right on BOTH sides!
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

  [1, -1].forEach(sideSign => {
    const phiStart = sideSign > 0 ? 0 : Math.PI;
    const halfGeo = new THREE.LatheGeometry(profile, 16, phiStart, Math.PI);
    halfGeo.rotateX(Math.PI / 2);
    const posAttr = halfGeo.attributes.position;
    const uvAttr = halfGeo.attributes.uv;
    const totalLen = fl + 4.25;
    for (let i = 0; i < posAttr.count; i++) {
      const py = posAttr.getY(i);
      const pz = posAttr.getZ(i);
      const uNose = (halfL + 1.85 - pz) / totalLen;
      const u = sideSign > 0 ? uNose : (1 - uNose);
      const v = 0.5 + (py / (fw * 2.05));
      uvAttr.setXY(i, Math.max(0, Math.min(1, u)), Math.max(0, Math.min(1, v)));
    }
    const mat = new THREE.MeshPhysicalMaterial({
      map: getFuselageTexture(opts, sideSign),
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.14,
      clearcoat: 0.92,
      clearcoatRoughness: 0.14
    });
    const m = new THREE.Mesh(halfGeo, mat);
    m.position.y = bodyY;
    m.castShadow = true;
    m.receiveShadow = true;
    root.add(m);
  });

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

    if (!isProp) {
      const wlShape = new THREE.Shape();
      wlShape.moveTo(0, 0);
      wlShape.lineTo(2.4, 0);
      wlShape.lineTo(1.5, 2.75);
      wlShape.lineTo(0.4, 2.75);
      wlShape.closePath();
      const wlGeo = new THREE.ExtrudeGeometry(wlShape, { depth: 0.14, bevelEnabled: false });
      wlGeo.rotateY(Math.PI / 2);
      const wlMesh = new THREE.Mesh(wlGeo, wingletMat);
      wlMesh.position.set(side * (wSpan + 0.02), wY + 1.15, -5.2);
      wlMesh.rotation.z = -side * 0.18;
      wlMesh.castShadow = true;
      root.add(wlMesh);
    }
  });

  // 3. Swept 3D Vertical Stabilizer with Flush Port & Starboard Airline Tail Logo!
  const vH = isWide ? 9.6 : (isProp ? 6.6 : 7.4);
  const finRootFront = halfL * 0.46;
  const finTipFront = halfL * 0.16;
  const finTipBack = -halfL * 0.12;
  const finShape = new THREE.Shape();
  finShape.moveTo(0, 0);
  finShape.lineTo(finRootFront, 0);
  finShape.lineTo(finTipFront, vH);
  finShape.lineTo(finTipBack, vH);
  finShape.closePath();

  const finEdgeCol = brand === 'JAL' ? 0xf8fafc : 0x0b3b8c;
  const finCore = new THREE.ExtrudeGeometry(finShape, { depth: 0.38, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2 });
  finCore.rotateY(Math.PI / 2);
  const finMesh = new THREE.Mesh(finCore, new THREE.MeshStandardMaterial({ color: finEdgeCol, roughness: 0.28 }));
  finMesh.position.set(-0.19, bodyY + fw * 0.68, -halfL * 0.98);
  finMesh.castShadow = true;
  root.add(finMesh);

  // Flush Shaped Tail Fin Side Skins (exact same polygon contour as finShape -> ZERO rectangular protrusion!)
  [1, -1].forEach(sideSign => {
    const faceGeo = new THREE.ShapeGeometry(finShape);
    const fPos = faceGeo.attributes.position;
    const fUv = faceGeo.attributes.uv;
    for (let i = 0; i < fPos.count; i++) {
      const sx = fPos.getX(i); // along Z after rotateY(PI/2)
      const sy = fPos.getY(i);
      const v = Math.max(0, Math.min(1, sy / vH));
      const leadX = finRootFront + (finTipFront - finRootFront) * v;
      const trailX = 0 + (finTipBack - 0) * v;
      const chordFrac = Math.max(0, Math.min(1, (leadX - sx) / Math.max(0.5, leadX - trailX)));
      const u = sideSign > 0 ? chordFrac : (1 - chordFrac);
      fUv.setXY(i, u, v);
    }
    faceGeo.rotateY(Math.PI / 2);
    const faceMat = new THREE.MeshStandardMaterial({
      map: getTailFinTexture(opts, sideSign),
      roughness: 0.26,
      metalness: 0.12,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(sideSign > 0 ? 0.26 : -0.26, bodyY + fw * 0.68, -halfL * 0.98);
    root.add(faceMesh);
  });

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

  // 4. Twin Under-Wing Turbofans / Turboprops
  const engOff = isWide ? 7.8 : (isProp ? 4.8 : 6.0);
  const engR = isWide ? 1.52 : (isProp ? 0.62 : 1.14);
  const engY = isWide ? 2.48 : (isProp ? (wY - 0.45) : 2.12);
  [-engOff, engOff].forEach(ex => {
    const engGroup = new THREE.Group();
    engGroup.position.set(ex, engY, 1.3);

    const cowlGeo = new THREE.CylinderGeometry(engR * 0.92, engR * 0.78, 4.4, 22, 1, false);
    cowlGeo.rotateX(Math.PI / 2);
    const cowl = new THREE.Mesh(cowlGeo, wingMat);
    cowl.castShadow = true;
    engGroup.add(cowl);

    const lip = new THREE.Mesh(new THREE.TorusGeometry(engR * 0.90, 0.11, 10, 24), metalMat);
    lip.position.z = 2.18;
    engGroup.add(lip);

    const exGeo = new THREE.ConeGeometry(engR * 0.56, 1.6, 16);
    exGeo.rotateX(-Math.PI / 2);
    const exMesh = new THREE.Mesh(exGeo, darkMetalMat);
    exMesh.position.z = -2.6;
    engGroup.add(exMesh);

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

    if (!isProp) {
      const pyH = Math.max(0.8, (wY - engY) + 0.5);
      const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.46, pyH, 3.6), wingMat);
      pylon.position.set(0, engR * 0.65 + pyH * 0.32, -0.5);
      pylon.castShadow = true;
      engGroup.add(pylon);
    }

    root.add(engGroup);
  });

  // 5. Landing Gear
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

  // 6. Emissive Navigation Lights, Beacons & Strobes
  const makeLightDot = (col, r, x, y, z) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 10), new THREE.MeshBasicMaterial({ color: col }));
    m.position.set(x, y, z);
    root.add(m);
    return m;
  };
  root.userData.lights.portNav = makeLightDot(0xff2a2a, 0.28, wSpan + 0.2, wY + 1.25, -6.2);
  root.userData.lights.stbdNav = makeLightDot(0x22ff66, 0.28, -wSpan - 0.2, wY + 1.25, -6.2);
  root.userData.lights.beaconTop = makeLightDot(0xff1e1e, 0.34, 0, bodyY + fw + 0.25, 1.4);
  root.userData.lights.noseLight = makeLightDot(0xfffbeb, 0.32, 0, bodyY - fw * 0.65, halfL * 0.76);
  root.userData.lights.strobeL = makeLightDot(0xffffff, 0.42, wSpan + 0.35, wY + 1.35, -6.4);
  root.userData.lights.strobeR = makeLightDot(0xffffff, 0.42, -wSpan - 0.35, wY + 1.35, -6.4);

  return root;
}
