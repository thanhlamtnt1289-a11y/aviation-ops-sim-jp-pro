// =====================================================================================
// UNIFIED GSE LIBRARY 3D — một bộ dựng duy nhất cho MỌI xe mặt đất trong cả 2 cảnh 3D
// (AirportScene3D NGO 1:1 & TurnaroundScene3D 5 sân bay)
//
// Quy chuẩn thiết kế chung (giống đội xe handling thực tế tại sân bay Nhật):
//   • Thân xe trắng + 1 dải màu công ty handling (xanh navy) — giống nhau trên mọi xe
//   • Bộ phận nâng / lan can / chân chống: vàng an toàn (安全黄色)
//   • Khung gầm xám than, cản cao su đen, lốp + mâm thống nhất theo cỡ xe
//   • Cabin bo góc cùng 1 kiểu, kính xanh nhạt, đèn xoay vàng (黄色回転灯) trên nóc MỌI xe
//   • Quy ước trục: +Z = đầu xe / mặt tiếp cận tàu bay, +Y = lên, mặt đất y = 0
//   • Kích thước theo mét thật (1:1)
//
// API userData của từng loại được giữ NGUYÊN như bản cũ để mọi animation hiện có vẫn chạy.
// =====================================================================================
import * as THREE from 'three';
import { createOpenCabTowingTractor3D, createBaggageCart3D } from './crewBuilder3D.js';

// ---------------------------------------------------------------- Palette & materials
export const GSE_PALETTE = {
  body: 0xf1f5f9,        // trắng thân xe
  bodyShade: 0xdfe6ee,   // trắng ngà cho khối phụ
  accent: 0x0b4fa8,      // dải màu công ty handling (đồng nhất toàn đội xe)
  safety: 0xf5b301,      // vàng an toàn: lan can, chân chống, bộ nâng
  chassis: 0x2b3442,     // khung gầm
  rubber: 0x15181d,      // lốp, cản
  rim: 0xb8c2cf,         // mâm
  glass: 0x3a5470,       // kính cabin (kính màu khói, phản chiếu trời)
  steel: 0xc3ccd7,       // sàn thép / nhôm
  fuelRed: 0xd32f2f,     // xe nhiên liệu (火気厳禁)
  lavGrey: 0x5b6676,     // xe vệ sinh
  waterBlue: 0x1f7fc4,   // xe nước sạch
  gpuYellow: 0xe8b400,   // GPU
  beacon: 0xffb000
};

const matCache = new Map();
function mat(key, color, opts = {}) {
  const k = `${key}_${color}_${opts.metalness ?? ''}_${opts.roughness ?? ''}_${opts.opacity ?? ''}_${opts.map ? opts.map.uuid : ''}`;
  if (matCache.has(k)) return matCache.get(k);
  let m;
  if (key === 'glass') {
    // Tinted automotive glass: dark, highly reflective (picks up the sky env map)
    m = new THREE.MeshPhysicalMaterial({ color, roughness: 0.04, metalness: 0.35, transparent: true, opacity: opts.opacity ?? 0.82, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.6 });
  } else if (key === 'paint') {
    // Clear-coated fleet paint
    m = new THREE.MeshPhysicalMaterial({ color, metalness: opts.metalness ?? 0.12, roughness: opts.roughness ?? 0.38, clearcoat: 0.7, clearcoatRoughness: 0.18 });
  } else if (key === 'lamp') {
    m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: opts.opacity ?? 1.4, roughness: 0.2, metalness: 0.1 });
  } else if (key === 'tex') {
    m = new THREE.MeshStandardMaterial({ map: opts.map, transparent: true, roughness: 0.5, metalness: 0.05, polygonOffset: true, polygonOffsetFactor: -2 });
  } else if (key === 'basic') {
    m = new THREE.MeshBasicMaterial({ color, transparent: opts.opacity !== undefined, opacity: opts.opacity ?? 1 });
  } else {
    m = new THREE.MeshStandardMaterial({ color, metalness: opts.metalness ?? 0.22, roughness: opts.roughness ?? 0.45 });
  }
  matCache.set(k, m);
  return m;
}
export const GSE_MAT = {
  body: () => mat('paint', GSE_PALETTE.body, { metalness: 0.1, roughness: 0.32 }),
  bodyShade: () => mat('paint', GSE_PALETTE.bodyShade, { metalness: 0.1, roughness: 0.36 }),
  accent: () => mat('paint', GSE_PALETTE.accent, { metalness: 0.15, roughness: 0.34 }),
  safety: () => mat('std', GSE_PALETTE.safety, { metalness: 0.25, roughness: 0.42 }),
  chassis: () => mat('std', GSE_PALETTE.chassis, { metalness: 0.45, roughness: 0.55 }),
  rubber: () => mat('std', GSE_PALETTE.rubber, { metalness: 0.02, roughness: 0.92 }),
  rim: () => mat('std', GSE_PALETTE.rim, { metalness: 0.65, roughness: 0.3 }),
  steel: () => mat('std', GSE_PALETTE.steel, { metalness: 0.55, roughness: 0.35 }),
  glass: () => mat('glass', GSE_PALETTE.glass),
  headLamp: () => mat('lamp', 0xfff4d6, { opacity: 1.2 }),
  tailLamp: () => mat('lamp', 0xd61f1f, { opacity: 0.9 }),
  marker: () => mat('lamp', 0xff9a1a, { opacity: 0.8 }),
  mirror: () => mat('std', 0x1b222c, { metalness: 0.6, roughness: 0.25 }),
  color: (hex, metalness = 0.22, roughness = 0.42) => mat('std', hex, { metalness, roughness })
};

// ---------------------------------------------------------------- Decals (canvas textures, generated once)
const texCache = new Map();
function canvasTex(key, w, h, draw) {
  if (texCache.has(key)) return texCache.get(key);
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  texCache.set(key, t);
  return t;
}
// Yellow/black chevrons on rear bumpers (虎柄 — standard on Japanese airside vehicles)
function hazardTex() {
  return canvasTex('hazard', 256, 32, (x, w, h) => {
    x.fillStyle = '#f5b301'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#111'; for (let i = -h; i < w + h; i += 32) { x.beginPath(); x.moveTo(i, h); x.lineTo(i + 16, h); x.lineTo(i + 16 + h, 0); x.lineTo(i + h, 0); x.closePath(); x.fill(); }
  });
}
// Generic handling-company door mark + fleet number (fictional brand, no real logos)
function doorLogoTex(no) {
  return canvasTex('logo_' + no, 256, 128, (x, w, h) => {
    x.clearRect(0, 0, w, h);
    x.fillStyle = '#0b4fa8';
    x.beginPath(); x.moveTo(18, 70); x.lineTo(70, 20); x.lineTo(92, 20); x.lineTo(40, 70); x.closePath(); x.fill();
    x.fillStyle = '#f5b301'; x.fillRect(18, 76, 74, 8);
    x.fillStyle = '#0f1f33'; x.font = '700 30px system-ui, sans-serif'; x.fillText('NGO GH', 102, 56);
    x.font = '600 22px ui-monospace, monospace'; x.fillStyle = '#334155'; x.fillText('No. ' + no, 104, 92);
  });
}
let fleetSeq = 0;
const FLEET_NOS = [12, 23, 31, 47, 58, 64];
// Tyre: tread blocks on the running surface, black sidewalls (CylinderGeometry: group 0 = side, 1/2 = caps)
function tyreMaterial() {
  const k = 'tyreMat';
  if (texCache.has(k)) return texCache.get(k);
  const t = canvasTex('tread', 256, 64, (x, w, h) => {
    x.fillStyle = '#16191e'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#0b0d10';
    for (let i = 0; i < w; i += 16) { x.fillRect(i, 6, 7, h * 0.4); x.fillRect(i + 8, h * 0.5, 7, h * 0.42); }
    x.fillStyle = '#23272e'; x.fillRect(0, 0, w, 4); x.fillRect(0, h - 4, w, 4);
  });
  const side = new THREE.MeshStandardMaterial({ map: t, roughness: 0.95, metalness: 0.0 });
  const wall = new THREE.MeshStandardMaterial({ color: 0x23272e, roughness: 0.88, metalness: 0.0 });
  const m = t ? [side, wall, wall] : GSE_MAT.rubber();
  texCache.set(k, m);
  return m;
}
// Rim face: silver disc, 6 spokes/windows, 5 lug nuts, dark sidewall ring
function rimFaceMaterial() {
  const k = 'rimFace';
  if (texCache.has(k)) return texCache.get(k);
  const t = canvasTex('rimface', 128, 128, (x, w) => {
    const c = w / 2;
    x.clearRect(0, 0, w, w);
    x.fillStyle = '#23272e'; x.beginPath(); x.arc(c, c, c, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#c3ccd7'; x.beginPath(); x.arc(c, c, c * 0.68, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#4b5563';
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; x.beginPath(); x.ellipse(c + Math.cos(a) * c * 0.45, c + Math.sin(a) * c * 0.45, c * 0.12, c * 0.07, a, 0, Math.PI * 2); x.fill(); }
    x.fillStyle = '#e5e9ef'; x.beginPath(); x.arc(c, c, c * 0.22, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#374151';
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 + 0.3; x.beginPath(); x.arc(c + Math.cos(a) * c * 0.15, c + Math.sin(a) * c * 0.15, c * 0.035, 0, Math.PI * 2); x.fill(); }
  });
  const m = t ? new THREE.MeshStandardMaterial({ map: t, transparent: true, metalness: 0.55, roughness: 0.32 }) : GSE_MAT.rim();
  texCache.set(k, m);
  return m;
}
function circleGeo(r) {
  const key = 'circ_' + r.toFixed(3);
  if (!geoCache.has(key)) geoCache.set(key, new THREE.CircleGeometry(r, 20));
  return geoCache.get(key);
}

// ---------------------------------------------------------------- Geometry helpers
const geoCache = new Map();
function roundedBoxGeo(w, h, d, r = 0.08) {
  const k = `rb_${w.toFixed(2)}_${h.toFixed(2)}_${d.toFixed(2)}_${r.toFixed(2)}`;
  if (geoCache.has(k)) return geoCache.get(k);
  const rr = Math.max(0.005, Math.min(r, w * 0.24, h * 0.24, d * 0.24));
  const sw = w - rr * 2, sh = h - rr * 2;
  const shape = new THREE.Shape();
  shape.moveTo(-sw / 2, -sh / 2 - rr);
  shape.lineTo(sw / 2, -sh / 2 - rr);
  shape.quadraticCurveTo(sw / 2 + rr, -sh / 2 - rr, sw / 2 + rr, -sh / 2);
  shape.lineTo(sw / 2 + rr, sh / 2);
  shape.quadraticCurveTo(sw / 2 + rr, sh / 2 + rr, sw / 2, sh / 2 + rr);
  shape.lineTo(-sw / 2, sh / 2 + rr);
  shape.quadraticCurveTo(-sw / 2 - rr, sh / 2 + rr, -sw / 2 - rr, sh / 2);
  shape.lineTo(-sw / 2 - rr, -sh / 2);
  shape.quadraticCurveTo(-sw / 2 - rr, -sh / 2 - rr, -sw / 2, -sh / 2 - rr);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: Math.max(0.01, d - rr * 2), bevelEnabled: true, bevelSize: rr * 0.6, bevelThickness: rr, bevelSegments: 2, curveSegments: 3 });
  geo.translate(0, 0, -(d - rr * 2) / 2);
  geo.computeVertexNormals();
  geoCache.set(k, geo);
  return geo;
}
function boxGeo(w, h, d) {
  const k = `b_${w}_${h}_${d}`;
  if (!geoCache.has(k)) geoCache.set(k, new THREE.BoxGeometry(w, h, d));
  return geoCache.get(k);
}
function cylGeo(rt, rb, h, seg = 14) {
  const k = `c_${rt}_${rb}_${h}_${seg}`;
  if (!geoCache.has(k)) geoCache.set(k, new THREE.CylinderGeometry(rt, rb, h, seg));
  return geoCache.get(k);
}

function mesh(geo, material, x, y, z, parent) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

// Builder context: shared parts so every vehicle looks like part of the same fleet
function makeKit(g) {
  const kit = {
    box: (w, h, d, material, x, y, z, parent = g) => mesh(boxGeo(w, h, d), material, x, y, z, parent),
    rbox: (w, h, d, material, x, y, z, r = 0.08, parent = g) => mesh(roundedBoxGeo(w, h, d, r), material, x, y, z, parent),
    cyl: (rt, rb, h, material, x, y, z, parent = g, seg = 14) => mesh(cylGeo(rt, rb, h, seg), material, x, y, z, parent),

    // Chassis frame + front/rear black rubber bumpers
    chassis(w, len, y = 0.62, zc = 0) {
      kit.box(w, 0.34, len, GSE_MAT.chassis(), 0, y, zc);
      // side frame rails & cross-members visible under the body
      [-1, 1].forEach(s => kit.box(0.12, 0.2, len * 0.96, GSE_MAT.color(0x1c232d, 0.5, 0.5), s * (w / 2 - 0.25), y - 0.26, zc));
      kit.box(w + 0.06, 0.22, 0.16, GSE_MAT.rubber(), 0, y - 0.04, zc + len / 2 + 0.06);
      kit.box(w + 0.06, 0.22, 0.16, GSE_MAT.rubber(), 0, y - 0.04, zc - len / 2 - 0.06);
      // rear: 虎柄 chevrons + tail/brake lamps + reflectors
      const hz = hazardTex();
      if (hz) {
        const pl = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.96, 0.2), mat('tex', 0xffffff, { map: hz }));
        pl.position.set(0, y - 0.04, zc - len / 2 - 0.145);
        pl.rotation.y = Math.PI;
        g.add(pl);
      }
      [-1, 1].forEach(s => {
        kit.box(0.22, 0.12, 0.04, GSE_MAT.tailLamp(), s * (w / 2 - 0.22), y + 0.12, zc - len / 2 - 0.02);
        kit.box(0.08, 0.08, 0.03, GSE_MAT.marker(), s * (w / 2 - 0.05), y + 0.12, zc - len / 2 - 0.02);
      });
    },

    // Standard fleet cab (same proportions on every truck): clear-coated white body, navy band, tinted
    // glass with black pillars, mirrors, lamps, door logo + fleet number, grab handle and step, beacon.
    cab(w, h, d, x, yBase, z, opts = {}) {
      const cg = new THREE.Group();
      const so = w / 2 + 0.09; // rounded-box bevel pushes the skin ~0.085 m past w/2
      const fo = d / 2 + 0.01;
      cg.position.set(x, yBase, z);
      kit.rbox(w, h, d, GSE_MAT.body(), 0, h / 2, 0, 0.14, cg);
      kit.box(w + 0.02, 0.2, d + 0.02, GSE_MAT.accent(), 0, 0.28, 0, cg);
      kit.rbox(w + 0.06, 0.08, d + 0.08, GSE_MAT.bodyShade(), 0, h + 0.01, 0, 0.03, cg);        // roof cap
      // glazing: windshield + side windows set into black frames
      const blk = GSE_MAT.color(0x10151c, 0.2, 0.6);
      kit.box(w - 0.12, h * 0.48, 0.03, blk, 0, h * 0.68, fo, cg);
      kit.box(w - 0.26, h * 0.4, 0.03, GSE_MAT.glass(), 0, h * 0.69, fo + 0.012, cg);
      [-1, 1].forEach(s => {
        kit.box(0.03, h * 0.44, d * 0.7, blk, s * so, h * 0.68, 0.04, cg);
        kit.box(0.03, h * 0.36, d * 0.6, GSE_MAT.glass(), s * (so + 0.012), h * 0.69, 0.04, cg);
        // mirror on an arm
        kit.box(0.26, 0.03, 0.03, blk, s * (so + 0.12), h * 0.72, d / 2 - 0.08, cg);
        kit.box(0.05, 0.26, 0.16, GSE_MAT.mirror(), s * (so + 0.26), h * 0.7, d / 2 - 0.08, cg);
        // amber side marker
        kit.box(0.02, 0.06, 0.12, GSE_MAT.marker(), s * (so + 0.006), 0.42, d / 2 - 0.14, cg);
        // door logo + fleet number decal
        const tex = doorLogoTex(opts.no || FLEET_NOS[(fleetSeq++) % FLEET_NOS.length]); // 6 shared textures
        if (tex) {
          const pl = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(0.95, d * 0.55), Math.min(0.48, d * 0.27)), mat('tex', 0xffffff, { map: tex }));
          pl.position.set(s * (so + 0.012), h * 0.36, -0.06);
          pl.rotation.y = s * Math.PI / 2;
          cg.add(pl);
        }
      });
      // front: grille, headlights, turn signals, number plate
      kit.box(w * 0.5, 0.22, 0.03, blk, 0, 0.42, fo + 0.008, cg);
      [-1, 1].forEach(s => {
        kit.box(0.26, 0.13, 0.04, GSE_MAT.headLamp(), s * (w / 2 - 0.3), 0.56, fo + 0.008, cg);
        kit.box(0.1, 0.08, 0.04, GSE_MAT.marker(), s * (w / 2 - 0.1), 0.56, fo + 0.008, cg);
      });
      kit.box(0.42, 0.14, 0.02, GSE_MAT.color(0xf8fafc, 0.0, 0.6), 0, 0.22, fo + 0.012, cg);
      // entry step
      kit.box(0.5, 0.05, 0.28, GSE_MAT.steel(), (opts.stepSide || -1) * (w / 2 + 0.05), 0.12, -d * 0.18, cg);
      if (opts.beacon !== false) kit.beacon(0, h + 0.05, -d * 0.15, cg);
      g.add(cg);
      return cg;
    },

    // Amber rotating beacon (黄色回転灯) — required on every airside vehicle
    beacon(x, y, z, parent = g) {
      const base = kit.cyl(0.09, 0.11, 0.06, GSE_MAT.rubber(), x, y + 0.03, z, parent, 10);
      const bulb = new THREE.Mesh(cylGeo(0.085, 0.1, 0.17, 12), mat('lamp', GSE_PALETTE.beacon, { opacity: 2.2 }));
      bulb.position.set(x, y + 0.14, z);
      parent.add(bulb);
      g.userData.beaconLamps = (g.userData.beaconLamps || []).concat([bulb]);
      return base;
    },

    // Wheels: identical tyre style on every vehicle (dark tyre + light rim + hub cap)
    wheels(trackHalf, zList, r = 0.42, width = 0.28) {
      // 3 meshes per wheel (draw-call friendly): treaded tyre (texture), rim face decal (spokes + lug nuts), hub
      const wheels = [];
      const tyreMat = tyreMaterial();
      const faceMat = rimFaceMaterial();
      zList.forEach(wz => {
        [-trackHalf, trackHalf].forEach(wx => {
          const side = Math.sign(wx) || 1;
          const wg = new THREE.Group();
          wg.position.set(wx, r, wz);
          const tyre = new THREE.Mesh(cylGeo(r, r, width, 22), tyreMat);
          tyre.rotation.z = Math.PI / 2;
          tyre.castShadow = true;
          const face = new THREE.Mesh(circleGeo(r * 0.86), faceMat);
          face.position.x = side * (width / 2 + 0.006);
          face.rotation.y = side * Math.PI / 2;
          const hub = new THREE.Mesh(cylGeo(r * 0.16, r * 0.19, width + 0.08, 10), GSE_MAT.steel());
          hub.rotation.z = Math.PI / 2;
          wg.add(tyre, face, hub);
          g.add(wg);
          wheels.push(wg);
          if (r >= 0.3) {
            const fg = kit.box(width + 0.12, 0.05, r * 2.1, GSE_MAT.chassis(), wx, r * 2 + 0.08, wz);
            fg.castShadow = false;
          }
        });
      });
      g.userData.wheels = (g.userData.wheels || []).concat(wheels);
      return wheels;
    },

    // Yellow safety handrail along an edge
    rail(len, x, y, z, parent = g, along = 'z', h = 0.95) {
      const posts = Math.max(2, Math.round(len / 1.2) + 1);
      for (let i = 0; i < posts; i++) {
        const t = -len / 2 + (len * i) / (posts - 1);
        kit.box(0.06, h, 0.06, GSE_MAT.safety(), along === 'z' ? x : x + t, y + h / 2, along === 'z' ? z + t : z, parent);
      }
      kit.box(along === 'z' ? 0.07 : len, 0.07, along === 'z' ? len : 0.07, GSE_MAT.safety(), x, y + h, z, parent);
      kit.box(along === 'z' ? 0.06 : len, 0.05, along === 'z' ? len : 0.06, GSE_MAT.safety(), x, y + h * 0.52, z, parent);
    },

    // Deployable stabilisers (アウトリガー) — same design on every lift truck
    outriggers(xSpan, zFront, zBack) {
      const riggers = [];
      [[xSpan, zFront], [-xSpan, zFront], [xSpan, zBack], [-xSpan, zBack]].forEach(([rx, rz]) => {
        const rg = new THREE.Group();
        rg.position.set(rx, 0.45, rz);
        kit.box(0.32, 0.14, 0.16, GSE_MAT.safety(), Math.sign(rx) * 0.14, 0, 0, rg);
        const foot = kit.box(0.14, 0.44, 0.14, GSE_MAT.safety(), Math.sign(rx) * 0.26, -0.22, 0, rg);
        kit.box(0.3, 0.05, 0.3, GSE_MAT.rubber(), Math.sign(rx) * 0.26, -0.43, 0, rg);
        rg.scale.x = 0.01;
        rg.visible = false;
        g.add(rg);
        riggers.push({ group: rg, foot });
      });
      g.userData.outriggers = riggers;
    },

    // ULD shapes (1:1): AKE (LD3 contoured), AKH (LD3-45), PMC/PAG pallet with net
    uld(code, parent = g, x = 0, y = 0, z = 0) {
      const ug = new THREE.Group();
      ug.position.set(x, y, z);
      if (code === 'PMC' || code === 'PAG' || code === 'PLA') {
        const w = code === 'PLA' ? 3.18 : 2.44, d = code === 'PLA' ? 1.53 : 3.18, h = 1.6;
        kit.box(w, 0.06, d, GSE_MAT.steel(), 0, 0.03, 0, ug);
        kit.rbox(w - 0.1, h, d - 0.1, GSE_MAT.color(0x7f8ea3, 0.05, 0.8), 0, 0.06 + h / 2, 0, 0.18, ug);
        const net = GSE_MAT.color(0x1f2937, 0.0, 0.9);
        for (let i = -2; i <= 2; i++) kit.box(w - 0.06, 0.04, 0.04, net, 0, 0.06 + h * (0.5 + i * 0.22), d / 2 - 0.02, ug);
      } else {
        const isAkh = code === 'AKH';
        const w = isAkh ? 2.44 : 2.01, h = isAkh ? 1.14 : 1.63, d = 1.53;
        const body = kit.rbox(w, h, d, GSE_MAT.color(0xd7dee8, 0.6, 0.28), 0, h / 2 + 0.02, 0, 0.05, ug);
        kit.box(w + 0.02, 0.16, d + 0.02, GSE_MAT.accent(), 0, h * 0.72, 0, ug);
        kit.box(w * 0.86, h * 0.7, 0.03, GSE_MAT.color(0xa9b4c2, 0.3, 0.6), 0, h * 0.45, d / 2 + 0.005, ug); // door curtain
        ug.userData.body = body;
      }
      parent.add(ug);
      return ug;
    }
  };
  return kit;
}

// =====================================================================================
// MAIN BUILDER — every vehicle type in both 3D scenes
// =====================================================================================
export function buildGse(kind, targetHeightY = 2.8, extra = {}) {
  const g = new THREE.Group();
  g.userData = { kind, targetHeightY };
  const k = makeKit(g);
  const M = GSE_MAT;

  if (kind === 'stairs') {
    // Passenger step car (パッセンジャーステップ車)
    const topY = Math.max(2.6, Math.min(5.3, targetHeightY));
    k.chassis(2.2, 6.4, 0.62, -0.3);
    k.cab(2.15, 1.55, 1.8, 0, 0.72, -2.35);
    const rampLen = Math.hypot(4.1, topY - 1.05);
    const rampAng = Math.atan2(topY - 1.05, 4.1);
    const ramp = k.box(1.7, 0.3, rampLen, M.bodyShade(), 0, (topY + 1.05) * 0.5, 0.45);
    ramp.rotation.x = -rampAng;
    // stair treads
    const steps = Math.round(rampLen / 0.28);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const s = k.box(1.62, 0.05, 0.16, M.color(0x3b4452, 0.1, 0.85), 0, 1.05 + (topY - 1.05) * t + 0.17, 0.45 - 2.05 + 4.1 * t);
      s.castShadow = false;
    }
    [-0.9, 0.9].forEach(rx => {
      const rail = k.box(0.07, 0.07, rampLen, M.safety(), rx, (topY + 1.05) * 0.5 + 0.95, 0.45);
      rail.rotation.x = -rampAng;
      for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        k.box(0.06, 0.95, 0.06, M.safety(), rx, 1.05 + (topY - 1.05) * t + 0.5, 0.45 - 2.05 + 4.1 * t);
      }
    });
    // top platform & canopy
    k.box(2.05, 0.22, 1.55, M.steel(), 0, topY - 0.11, 2.65);
    k.box(2.1, 0.08, 1.6, M.accent(), 0, topY + 2.1, 2.65);
    [-0.98, 0.98].forEach(sx => k.box(0.08, 2.1, 1.5, M.glass(), sx, topY + 1.05, 2.65));
    k.box(2.1, 0.12, 0.2, M.rubber(), 0, topY + 0.04, 3.45);
    // body deck: white with the fleet's navy band (was one solid blue slab)
    k.rbox(2.24, 0.34, 6.2, M.body(), 0, 0.98, -0.3, 0.06);
    k.box(2.26, 0.12, 6.22, M.accent(), 0, 0.86, -0.3);
    // structure under the stair: side stringers, lift columns under the platform, cross braces
    [-0.88, 0.88].forEach(sx => {
      const str = k.box(0.12, 0.42, rampLen * 0.96, M.chassis(), sx, (topY + 1.05) * 0.5 - 0.3, 0.45);
      str.rotation.x = -rampAng;
      k.box(0.16, topY - 1.15, 0.16, M.chassis(), sx, (topY + 1.15) * 0.5, 2.2);
      k.box(0.16, topY - 1.15, 0.16, M.chassis(), sx, (topY + 1.15) * 0.5, 3.1);
    });
    k.box(1.9, 0.1, 0.1, M.chassis(), 0, topY * 0.55, 2.2);
    k.box(1.9, 0.1, 0.1, M.chassis(), 0, topY * 0.55, 3.1);
    k.wheels(1.06, [-2.2, 1.65], 0.42);
    k.outriggers(1.08, 1.95, -2.0);
  } else if (kind === 'catering' || kind === 'cabinClean') {
    // Catering high-lift truck (フードローダー) / cabin service lift
    const isCat = kind === 'catering';
    const dockFloorY = Math.max(2.3, targetHeightY - 0.19); // −19cm below sill (textbook 図5-4)
    k.chassis(2.4, 7.6, 0.68, -0.2);
    k.cab(2.34, 1.7, 1.95, 0, 0.82, 2.62);
    const scissorPivot = new THREE.Group();
    scissorPivot.position.set(0, 0.98, -1.05);
    // X-scissor arms (visual) + inner block that scales with lift height
    k.box(1.5, 1.0, 3.1, M.chassis(), 0, 0.5, 0, scissorPivot);
    [-1, 1].forEach(s => {
      const arm = k.box(0.1, 0.1, 3.3, M.safety(), s * 0.8, 0.5, 0, scissorPivot);
      arm.rotation.x = 0.28;
      const arm2 = k.box(0.1, 0.1, 3.3, M.safety(), s * 0.8, 0.5, 0, scissorPivot);
      arm2.rotation.x = -0.28;
    });
    g.add(scissorPivot);
    const vanGroup = new THREE.Group();
    vanGroup.position.set(0, 1.35, 0);
    k.rbox(2.46, 2.25, 5.15, M.body(), 0, 1.15, -1.15, 0.1, vanGroup);
    k.box(2.48, 0.3, 5.17, isCat ? M.accent() : M.color(0x0f766e), 0, 0.42, -1.15, vanGroup);
    k.box(1.4, 0.55, 0.42, M.bodyShade(), 0, 2.0, 1.56, vanGroup); // refrigeration unit
    k.box(2.12, 0.16, 2.25, M.steel(), 0, 0.08, 2.48, vanGroup);   // front platform
    k.rail(2.1, -1.02, 0.08, 2.45, vanGroup, 'z', 0.95);
    k.rail(2.1, 1.02, 0.08, 2.45, vanGroup, 'z', 0.95);
    k.box(2.16, 0.16, 0.22, M.rubber(), 0, 0.14, 3.62, vanGroup);
    k.beacon(0.9, 2.28, -3.4, vanGroup);
    g.add(vanGroup);
    k.wheels(1.16, [-2.4, 2.25], 0.46);
    k.outriggers(1.2, 1.55, -2.85);
    g.userData.vanGroup = vanGroup;
    g.userData.scissorPivot = scissorPivot;
    g.userData.restY = 1.35;
    g.userData.dockFloorY = dockFloorY;
  } else if (kind === 'highloader' || kind === 'lowloader') {
    // Lower-deck high-lift ULD loader (ハイリフトローダー)
    const sillY = Math.max(1.95, Math.min(3.5, targetHeightY));
    const uldCode = extra.uldCode || extra.uldType || 'AKE';
    const w = extra.wide ? 3.4 : 3.15;
    k.chassis(w, 8.4, 0.44);
    k.box(w + 0.02, 0.12, 8.3, M.accent(), 0, 0.66, 0);
    // operator console (left-front) with seat & small canopy
    k.rbox(0.6, 1.3, 1.3, M.body(), -w / 2 + 0.25, 1.3, 2.15, 0.06);
    k.box(0.62, 0.08, 1.4, M.accent(), -w / 2 + 0.25, 2.0, 2.15);
    k.beacon(-w / 2 + 0.25, 2.02, 1.8);
    if (kind === 'lowloader') {
      // AirportScene API: single lift group (bridge + platform + ULD) moved as one
      const liftGroup = new THREE.Group();
      liftGroup.position.y = extra.deckY ?? 2.05;
      k.box(w * 0.86, 0.22, 2.9, M.steel(), 0, 0, 2.5, liftGroup);
      k.box(w, 0.22, 4.6, M.steel(), 0, 0, -1.6, liftGroup);
      [-1, 1].forEach(s => k.rail(4.4, s * w * 0.48, 0.1, -1.6, liftGroup, 'z', 0.62));
      // roller-deck stripes
      for (let i = -4; i <= 4; i++) k.box(w * 0.9, 0.03, 0.06, M.color(0x8b97a8, 0.6, 0.4), 0, 0.12, -1.6 + i * 0.5, liftGroup);
      const uld = k.uld(uldCode, liftGroup, 0, 0.12, -1.2);
      g.add(liftGroup);
      g.userData.liftGroup = liftGroup;
      g.userData.uldMesh = uld;
      k.box(1.35, 1.2, 3.0, M.chassis(), 0, 1.1, -1.6);
      k.wheels(w / 2 - 0.1, [-3.1, -0.4, 2.8], 0.34);
    } else {
      const bridgeGroup = new THREE.Group();
      bridgeGroup.position.set(0, 0.85, 2.65);
      k.box(2.65, 0.22, 2.75, M.steel(), 0, 0, 0, bridgeGroup);
      [-1, 1].forEach(s => k.rail(2.6, s * 1.28, 0.1, 0, bridgeGroup, 'z', 0.65));
      k.box(2.68, 0.16, 0.2, M.rubber(), 0, 0.08, 1.42, bridgeGroup);
      g.add(bridgeGroup);
      const mainPlat = new THREE.Group();
      mainPlat.position.set(0, 0.68, -1.65);
      k.box(3.05, 0.22, 4.65, M.steel(), 0, 0, 0, mainPlat);
      [-1, 1].forEach(s => k.rail(4.5, s * 1.48, 0.1, 0, mainPlat, 'z', 0.6));
      for (let i = -4; i <= 4; i++) k.box(2.8, 0.03, 0.06, M.color(0x8b97a8, 0.6, 0.4), 0, 0.12, i * 0.5, mainPlat);
      const uldGrp = k.uld(uldCode, mainPlat, 0, 0.12, 0);
      g.add(mainPlat);
      const scissorMesh = k.box(1.4, 1.0, 2.8, M.chassis(), 0, 0.55, -1.65);
      k.wheels(1.48, [-3.1, -0.4, 2.8], 0.34);
      g.userData.bridgeGroup = bridgeGroup;
      g.userData.mainPlat = mainPlat;
      g.userData.uldGrp = uldGrp;
      g.userData.scissorMesh = scissorMesh;
      g.userData.sillY = sillY;
    }
  } else if (kind === 'mdl') {
    // Main-deck loader for freighters (B777F / B747F) — tall twin-platform loader
    const sillY = Math.max(4.6, Math.min(5.6, targetHeightY));
    k.chassis(3.6, 10.5, 0.5);
    k.box(3.62, 0.12, 10.4, M.accent(), 0, 0.72, 0);
    k.rbox(0.8, 1.5, 1.4, M.body(), -1.6, 1.5, 3.9, 0.06);
    k.beacon(-1.6, 2.28, 3.6);
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(0, sillY - 0.15, 3.9);
    k.box(3.3, 0.24, 2.6, M.steel(), 0, 0, 0, bridgeGroup);
    [-1, 1].forEach(s => k.rail(2.5, s * 1.6, 0.1, 0, bridgeGroup, 'z', 0.95));
    g.add(bridgeGroup);
    [-1.3, 1.3].forEach(x => {
      const col = k.box(0.22, sillY - 0.4, 0.22, M.safety(), x, (sillY - 0.4) / 2 + 0.6, 3.0);
      col.castShadow = true;
    });
    const mainPlat = new THREE.Group();
    mainPlat.position.set(0, 0.9, -1.4);
    k.box(3.4, 0.24, 6.4, M.steel(), 0, 0, 0, mainPlat);
    [-1, 1].forEach(s => k.rail(6.2, s * 1.66, 0.1, 0, mainPlat, 'z', 0.7));
    k.uld('PMC', mainPlat, 0, 0.14, 0);
    g.add(mainPlat);
    k.wheels(1.62, [-4.2, -1.2, 3.6], 0.4);
    g.userData.bridgeGroup = bridgeGroup;
    g.userData.mainPlat = mainPlat;
    g.userData.sillY = sillY;
  } else if (kind === 'belt') {
    // Self-propelled belt loader (ベルトローダー)
    const topY = Math.max(1.55, Math.min(2.85, targetHeightY));
    k.chassis(2.0, 5.6, 0.6, -0.35);
    k.rbox(2.0, 0.6, 5.2, M.body(), 0, 0.98, -0.35, 0.1);
    k.box(2.02, 0.16, 5.22, M.accent(), 0, 0.86, -0.35);
    // driver station (right side)
    k.box(0.9, 0.12, 1.2, M.chassis(), 0.52, 1.36, -1.6);
    k.box(0.55, 0.55, 0.12, M.color(0x1f2937, 0.1, 0.8), 0.52, 1.68, -2.15);
    k.beacon(0.55, 2.5, -2.3);
    k.box(0.06, 1.2, 0.06, M.chassis(), 0.55, 1.9, -2.3);
    const boomGroup = new THREE.Group();
    const boomLen = 6.9;
    const restAng = 0.08;
    const dockAng = Math.atan2(topY - 0.85, 5.6);
    boomGroup.position.set(-0.18, 0.95, -2.2);
    k.box(0.98, 0.22, boomLen, M.steel(), 0, 0, boomLen * 0.5, boomGroup);
    k.box(0.78, 0.06, boomLen - 0.2, M.rubber(), 0, 0.13, boomLen * 0.5, boomGroup);
    [-1, 1].forEach(s => k.box(0.06, 0.24, boomLen - 0.4, M.safety(), s * 0.5, 0.24, boomLen * 0.5, boomGroup));
    k.box(1.0, 0.16, 0.2, M.rubber(), 0, 0.1, boomLen, boomGroup);
    // belt cleats (ribs every 0.45 m) + side guide rollers
    for (let z = 0.3; z < boomLen - 0.2; z += 0.45) k.box(0.74, 0.025, 0.05, M.color(0x0a0c0f, 0.0, 0.9), 0, 0.17, z, boomGroup);
    [-1, 1].forEach(s => { for (let z = 0.6; z < boomLen; z += 1.2) k.cyl(0.05, 0.05, 0.12, M.steel(), s * 0.45, 0.2, z, boomGroup, 8); });
    const bagCols = [0x1e3a8a, 0x9f1239, 0x0f766e, 0x374151];
    const bags = [];
    for (let bi = 0; bi < 4; bi++) {
      const bag = k.rbox(0.54, 0.26, 0.72, M.color(bagCols[bi], 0.1, 0.6), 0, 0.28, 1.0 + bi * 1.45, 0.05, boomGroup);
      bag.visible = false;
      bags.push(bag);
    }
    boomGroup.rotation.x = -restAng;
    g.add(boomGroup);
    k.wheels(0.98, [-1.95, 1.65], 0.38);
    g.userData.boomGroup = boomGroup;
    g.userData.bags = bags;
    g.userData.restAng = restAng;
    g.userData.dockAng = dockAng;
    g.userData.boomLen = boomLen;
  } else if (kind === 'fuel') {
    // Hydrant dispenser (ハイドラントサービサー) — faces forward (+Z) for a clear escape route
    const wingY = Math.max(2.15, targetHeightY);
    k.chassis(2.36, 6.3, 0.6);
    k.cab(2.32, 1.62, 1.85, 0, 0.72, 2.12);
    k.rbox(2.36, 1.2, 3.9, M.body(), 0, 1.35, -0.95, 0.1);
    k.box(2.38, 0.3, 3.92, M.color(GSE_PALETTE.fuelRed, 0.2, 0.45), 0, 1.2, -0.95);
    const liftDeck = new THREE.Group();
    liftDeck.position.set(0, 1.55, -1.85);
    k.box(1.65, 0.14, 1.65, M.steel(), 0, 0, 0, liftDeck);
    k.rail(1.6, -0.8, 0.07, 0, liftDeck, 'z', 0.9);
    k.rail(1.6, 0.8, 0.07, 0, liftDeck, 'z', 0.9);
    g.add(liftDeck);
    const fuelHookups = new THREE.Group();
    fuelHookups.visible = false;
    const riserH = Math.max(1.2, wingY - 1.4);
    k.box(0.11, riserH, 0.11, M.rubber(), -0.25, 1.4 + riserH * 0.5, -1.85, fuelHookups);
    const pitHose = k.box(0.12, 0.12, 2.4, M.rubber(), 0.65, 0.35, -2.2, fuelHookups);
    pitHose.rotation.y = 0.48;
    const bondWire = k.box(0.035, 0.035, 3.2, M.color(0xef4444, 0.2, 0.5), -0.95, 0.18, -0.6, fuelHookups);
    bondWire.rotation.y = -0.35;
    k.cyl(0.18, 0.18, 0.95, M.color(0xdc2626, 0.2, 0.35), -2.15, 0.52, 1.2, fuelHookups);
    g.add(fuelHookups);
    k.wheels(1.16, [-2.1, 2.0], 0.44);
    g.userData.liftDeck = liftDeck;
    g.userData.fuelHookups = fuelHookups;
    g.userData.dockDeckY = Math.max(1.6, wingY - 1.25);
  } else if (kind === 'gpu') {
    // Mobile GPU (AC 115V / 400Hz)
    k.chassis(1.7, 3.1, 0.5);
    k.rbox(1.72, 1.15, 3.05, M.color(GSE_PALETTE.gpuYellow, 0.2, 0.42), 0, 1.15, 0, 0.1);
    k.box(1.74, 0.14, 3.07, M.accent(), 0, 0.68, 0);
    for (let i = -3; i <= 3; i++) k.box(0.02, 0.5, 0.06, M.chassis(), 0.87, 1.2, i * 0.35); // louvres
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), mat('basic', 0x22c55e));
    led.position.set(0, 1.78, 1.1);
    g.add(led);
    k.beacon(0, 1.74, -1.0);
    k.box(0.08, 0.08, 0.9, M.chassis(), 0, 0.5, 1.95); // tow bar
    const cableGrp = new THREE.Group();
    cableGrp.visible = false;
    const c1 = k.box(0.1, 0.1, 3.1, M.color(0xf97316, 0.1, 0.7), 0, 0.18, 2.25, cableGrp);
    c1.rotation.x = -0.12;
    const c2 = k.box(0.1, 1.35, 0.1, M.color(0xf97316, 0.1, 0.7), 0, 0.92, 3.65, cableGrp);
    c2.rotation.x = 0.15;
    g.add(cableGrp);
    k.wheels(0.86, [-1.0, 1.0], 0.32, 0.22);
    g.userData.cableGrp = cableGrp;
    g.userData.led = led;
  } else if (kind === 'lav' || kind === 'water') {
    // Lavatory service truck (汚水車) / potable water truck (給水車)
    const isLav = kind === 'lav';
    const tankCol = isLav ? GSE_PALETTE.lavGrey : GSE_PALETTE.waterBlue;
    const hoseCol = isLav ? 0xfacc15 : 0x38bdf8;
    const panelY = Math.max(1.9, targetHeightY);
    k.chassis(2.1, 5.3, 0.58, -0.2);
    k.cab(2.1, 1.55, 1.55, 0, 0.7, 1.95);
    const tank = k.cyl(0.85, 0.85, 3.2, mat('paint', tankCol, { metalness: 0.35, roughness: 0.3 }), 0, 1.6, -0.95, g, 24);
    tank.rotation.x = Math.PI / 2;
    // dished end caps, 3 hold-down straps, top manhole + walkway rail, cradle saddles, contents label
    [-1, 1].forEach(e => { const cap = k.cyl(0.8, 0.86, 0.12, mat('paint', tankCol, { metalness: 0.35, roughness: 0.3 }), 0, 1.6, -0.95 + e * 1.64, g, 24); cap.rotation.x = Math.PI / 2; });
    [-1.2, -0.95 + 0.0, 0.3].forEach((z, i) => { const st = k.cyl(0.875, 0.875, 0.08, GSE_MAT.chassis(), 0, 1.6, i === 1 ? -0.95 : z, g, 24); st.rotation.x = Math.PI / 2; });
    [-2.1, 0.2].forEach(z => k.box(1.5, 0.5, 0.18, GSE_MAT.chassis(), 0, 0.98, z));
    k.cyl(0.24, 0.26, 0.16, GSE_MAT.steel(), 0, 2.5, -0.55, g, 14);
    k.rail(2.2, 0.42, 2.38, -0.95, g, 'z', 0.4);
    const lbl = canvasTex('tanklbl_' + kind, 256, 64, (x, w, h) => {
      x.fillStyle = 'rgba(255,255,255,0.92)'; x.fillRect(0, 8, w, h - 16);
      x.fillStyle = isLav ? '#374151' : '#075985'; x.font = '700 30px system-ui, sans-serif'; x.textAlign = 'center';
      x.fillText(isLav ? '汚水 LAV WASTE' : '飲料水 POTABLE', w / 2, 44);
    });
    if (lbl) [-1, 1].forEach(sd => {
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), mat('tex', 0xffffff, { map: lbl }));
      pl.position.set(sd * 0.865, 1.55, -0.95); pl.rotation.y = sd * Math.PI / 2; g.add(pl);
    });
    k.box(2.12, 0.14, 3.4, M.accent(), 0, 0.84, -0.95);
    const lift = new THREE.Group();
    lift.position.set(0, 1.05, 2.65);
    k.box(1.45, 0.14, 1.1, M.steel(), 0, 0, 0, lift);
    k.rail(1.0, 0.7, 0.07, 0, lift, 'z', 0.85);
    const hose = k.box(0.1, Math.max(0.9, panelY - 1.0), 0.1, M.color(hoseCol, 0.1, 0.7), 0.22, (panelY - 1.0) * 0.5, 0.35, lift);
    hose.visible = false;
    g.add(lift);
    k.wheels(1.04, [-1.8, 1.75], 0.4);
    g.userData.serviceLift = lift;
    g.userData.serviceHose = hose;
    g.userData.dockLiftY = Math.max(1.15, panelY - 1.15);
  } else if (kind === 'dolly_train') {
    // Open-cab towing tractor (TT) + 2 ULD dollies
    const tt = createOpenCabTowingTractor3D();
    tt.position.set(0, 0, 3.2);
    g.add(tt);
    const uldCode = extra.uldCode || null;
    if (uldCode) {
      [-0.4, -3.9].forEach((z, i) => {
        const d = buildGse('uld_dolly', 0.5, { uldCode });
        d.position.set(0, 0, z);
        g.add(d);
      });
    } else {
      const c1 = createBaggageCart3D(0);
      c1.position.set(0, 0, -0.4);
      const c2 = createBaggageCart3D(1);
      c2.position.set(0, 0, -3.9);
      g.add(c1, c2);
    }
    g.userData.tt = tt;
  } else if (kind === 'tractor') {
    const tt = createOpenCabTowingTractor3D();
    g.add(tt);
    g.userData.tt = tt;
  } else if (kind === 'uld_dolly') {
    // ULD dolly (コンテナドーリー) with roller deck + side stops
    const code = extra.uldCode || 'AKE';
    const isPallet = code === 'PMC' || code === 'PAG';
    const dw = isPallet ? 2.6 : 2.2, dl = isPallet ? 3.4 : 2.0;
    k.box(dw, 0.12, dl, M.steel(), 0, 0.52, 0);
    k.box(dw + 0.04, 0.16, dl + 0.04, M.chassis(), 0, 0.4, 0);
    [-1, 1].forEach(s => k.box(0.06, 0.18, dl, M.safety(), s * dw / 2, 0.65, 0));
    k.box(0.08, 0.08, 1.2, M.chassis(), 0, 0.42, dl / 2 + 0.6); // drawbar
    k.wheels(dw / 2 - 0.15, [-dl / 2 + 0.35, dl / 2 - 0.35], 0.22, 0.14);
    g.userData.uld = k.uld(code, g, 0, 0.58, 0);
  } else if (kind === 'tug') {
    // Conventional pushback tractor (トーイングトラクター) + towbar
    k.chassis(3.0, 5.8, 0.5);
    k.rbox(3.05, 0.95, 5.6, M.body(), 0, 1.05, 0, 0.18);
    k.box(3.07, 0.22, 5.62, M.accent(), 0, 0.72, 0);
    // low centre cab with glass
    const cab = new THREE.Group();
    cab.position.set(0, 1.5, 0.45);
    k.rbox(2.2, 0.9, 2.0, M.bodyShade(), 0, 0.45, 0, 0.12, cab);
    k.box(2.0, 0.55, 2.02, M.glass(), 0, 0.55, 0, cab);
    g.add(cab);
    const beacon = new THREE.Mesh(cylGeo(0.12, 0.14, 0.24, 12), mat('basic', GSE_PALETTE.beacon));
    beacon.position.set(0, 2.55, 0.45);
    g.add(beacon);
    const towbar = k.box(0.22, 0.2, 4.4, M.safety(), 0, 0.52, 4.85);
    k.box(0.42, 0.26, 0.35, M.color(0xef4444, 0.3, 0.4), 0, 0.52, 7.05); // shear-pin coupler head
    k.wheels(1.48, [-1.9, 1.9], 0.52, 0.4);
    g.userData.towbar = towbar;
    g.userData.beacon = beacon;
  } else if (kind === 'ramp_bus') {
    // Apron bus (ランプバス) — low-floor, glass sides, same fleet livery
    const accent = extra.accent ? M.color(extra.accent, 0.25, 0.38) : M.accent();
    k.chassis(2.7, 11.6, 0.4);
    k.rbox(2.85, 2.7, 11.8, M.body(), 0, 1.75, 0, 0.3);
    k.box(2.88, 1.05, 10.6, M.glass(), 0, 2.15, 0);
    k.box(2.9, 0.42, 11.82, accent, 0, 0.62, 0);
    [-1, 1].forEach(s => [-3.2, 0.4, 3.6].forEach(dz => k.box(0.05, 2.1, 1.3, M.color(0x334155, 0.3, 0.5), s * 1.44, 1.35, dz)));
    k.beacon(0, 3.12, 4.2);
    k.wheels(1.24, [-4.2, 4.2], 0.48, 0.32);
  } else if (kind === 'patrol_suv') {
    // Airport operations patrol car (黄パト)
    k.chassis(1.95, 4.6, 0.42);
    k.rbox(2.0, 0.85, 4.6, M.color(0xfacc15, 0.3, 0.35), 0, 0.85, 0, 0.18);
    k.rbox(1.86, 0.72, 2.5, M.color(0xfde047, 0.3, 0.35), 0, 1.6, -0.2, 0.18);
    k.box(1.88, 0.5, 2.3, M.glass(), 0, 1.62, -0.2);
    k.box(2.02, 0.16, 4.62, M.body(), 0, 0.86, 0);
    const bar = new THREE.Mesh(boxGeo(1.3, 0.2, 0.36), mat('basic', GSE_PALETTE.beacon));
    bar.position.set(0, 2.08, -0.1);
    g.add(bar);
    g.userData.beacon = bar;
    k.wheels(0.92, [-1.45, 1.45], 0.36, 0.24);
  } else if (kind === 'deice') {
    // De-icing truck (デアイシング車) with boom basket
    k.chassis(2.6, 7.4, 0.6);
    k.cab(2.5, 1.7, 1.9, 0, 0.75, 2.6);
    k.rbox(2.6, 1.8, 4.6, M.body(), 0, 1.7, -0.9, 0.12);
    k.box(2.62, 0.3, 4.62, M.color(0xf59e0b, 0.25, 0.4), 0, 1.0, -0.9);
    const boomPivot = new THREE.Group();
    boomPivot.position.set(0, 2.7, -2.2);
    const boom = k.box(6.4, 0.36, 0.36, M.safety(), 3.2, 1.9, 0, boomPivot);
    boom.rotation.z = 0.35;
    const basket = k.box(1.2, 1.0, 1.2, M.body(), 6.2, 3.2, 0, boomPivot);
    k.rail(1.1, 6.2, 3.7, 0, boomPivot, 'x', 0.6);
    const spray = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 6.5, 12, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false })
    );
    spray.rotation.z = -Math.PI / 2;
    spray.position.set(9.4, 3.0, 0);
    boomPivot.add(spray);
    g.add(boomPivot);
    g.userData.boom = boomPivot;
    g.userData.basket = basket;
    k.wheels(1.2, [-2.4, 2.3], 0.5, 0.34);
  } else if (kind === 'forklift') {
    // Warehouse forklift (フォークリフト)
    k.rbox(1.2, 1.0, 2.3, M.color(0xf59e0b, 0.25, 0.4), 0, 0.85, 0, 0.12);
    k.box(1.22, 0.3, 0.6, M.chassis(), 0, 0.75, -1.0); // counterweight
    [-0.5, 0.5].forEach(x => k.box(0.06, 2.1, 0.06, M.chassis(), x, 1.6, 0.55)); // overhead guard
    k.box(1.1, 0.06, 1.2, M.chassis(), 0, 2.65, 0.0);
    [-0.32, 0.32].forEach(x => k.box(0.1, 2.6, 0.1, M.chassis(), x, 1.3, 1.25)); // mast
    [-0.3, 0.3].forEach(x => k.box(0.12, 0.05, 1.2, M.steel(), x, 0.2, 1.9)); // forks
    k.beacon(0, 2.68, -0.4);
    k.wheels(0.5, [-0.75, 0.75], 0.3, 0.2);
  } else if (kind === 'cargo_truck') {
    // 10t box truck at warehouse truck dock (10トン車)
    k.chassis(2.45, 11.8, 0.7);
    k.cab(2.45, 2.1, 2.3, 0, 0.9, 4.6, { beacon: false });
    k.rbox(2.5, 2.6, 8.6, M.bodyShade(), 0, 2.25, -1.4, 0.06);
    k.box(2.52, 0.18, 8.62, M.accent(), 0, 1.05, -1.4);
    k.wheels(1.12, [-4.4, -3.2, 3.9], 0.5, 0.34);
  }
  return g;
}

// Backwards-compatible alias (TurnaroundScene3D & AirportScene3D import this name)
export const buildTurnaroundGseMesh = buildGse;

// Animate amber beacons on any GSE built by this library
export function animateGseBeacons(root, timeSec) {
  root.traverse(o => {
    if (o.userData && o.userData.beaconLamps) {
      const on = Math.floor(timeSec * 3 + (o.id % 5) * 0.37) % 2 === 0;
      o.userData.beaconLamps.forEach(b => { b.material = on ? mat('lamp', GSE_PALETTE.beacon, { opacity: 2.2 }) : mat('std', 0x7a5200); });
    }
  });
}
