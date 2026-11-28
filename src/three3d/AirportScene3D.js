// Full 1:1 Chubu Centrair (NGO / RJGG) 4,370m × 1,920m Island + 3,500m × 60m Runway + Multi-Lane Airside/Flight/Skyway Traffic
import * as THREE from 'three';
import { AIRCRAFT_PROFILES } from '../data/aircraft.js';
import { A3D_AIRPORTS, A3D_SPOTS, A3D_CLOUDS, A3D_FLIGHT_PHASES, NGO_CARGO_DISTRICT, NGO_STAND7_X, computeFlightCyclePose, computeViewpointCamera } from '../data/airports.js';
import { createDetailedAirliner3D } from './aircraftBuilder3D.js';
import { registerProceduralFallback } from './aircraft_3d_models.js';
registerProceduralFallback(createDetailedAirliner3D);
import {
  AIRCRAFT_3D_SPECS,
  createProceduralAirliner3D,
  createJetBlastHazardZone3D,
  animateJetBlastZone3D,
  animateAircraft3D,
  resolveAircraft3DType,
  createFleetAircraft3D
} from './aircraft_3d_models.js';
import {
  createOpenCabTowingTractor3D,
  animateTractorDriver,
  createDollyUnit3D,
  DOLLY_TYPES,
  createArticulatedCrew3D,
  animateCrewSignal
} from './crewBuilder3D.js';
import { computeWingHuggingEraPolyline } from './TurnaroundScene3D.js';
import { buildGse, buildTurnaroundGseMesh } from './gseLibrary3D.js';
import { applySkyEnvironment } from './envLighting.js';

function makeRunwayTexture(rwyPair = '36/18', isSnow = false) {
  const c = document.createElement('canvas');
  c.width = 2048;
  c.height = 256;
  const ctx = c.getContext('2d');
  const [rA = '36', rB = '18'] = String(rwyPair).split('/');
  ctx.fillStyle = isSnow ? '#394350' : '#242A34';
  ctx.fillRect(0, 0, 2048, 256);
  for (let i = 0; i < 11000; i++) {
    const g = (isSnow ? 48 : 29) + ((i * 29) % 26);
    ctx.fillStyle = `rgb(${g},${g + 3},${g + 8})`;
    ctx.fillRect((i * 97) % 2048, (i * 41) % 256, 2, 2);
  }
  if (isSnow) {
    ctx.fillStyle = 'rgba(236, 245, 255, 0.58)';
    ctx.fillRect(0, 0, 2048, 14);
    ctx.fillRect(0, 242, 2048, 14);
  }
  const skid = (x0, x1) => {
    const grd = ctx.createLinearGradient(x0, 0, x1, 0);
    grd.addColorStop(0, 'rgba(8,10,14,0)');
    grd.addColorStop(0.32, 'rgba(8,10,14,0.76)');
    grd.addColorStop(0.75, 'rgba(8,10,14,0.44)');
    grd.addColorStop(1, 'rgba(8,10,14,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(x0, 58, x1 - x0, 140);
  };
  skid(210, 620);
  skid(1428, 1838);

  // Side stripes & piano-key threshold markings
  ctx.fillStyle = '#E8EEF5';
  ctx.fillRect(0, 10, 2048, 6);
  ctx.fillRect(0, 240, 2048, 6);
  for (let y = 24; y <= 222; y += 18) {
    ctx.fillRect(16, y, 58, 10);
    ctx.fillRect(1974, y, 58, 10);
  }

  const drawNum = (xPos, rot, txt) => {
    ctx.save();
    ctx.fillStyle = '#F8FAFC';
    ctx.font = txt.length > 2 ? '900 48px "Arial Black", sans-serif' : '900 58px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(xPos, 128);
    ctx.rotate(rot);
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  };
  drawNum(122, Math.PI / 2, rA);
  drawNum(1926, -Math.PI / 2, rB);

  // Touchdown zone & 400m aiming point blocks
  ctx.fillStyle = '#E5ECF4';
  [185, 260, 430, 520].forEach((dx, idx) => {
    const h = idx === 1 ? 28 : 14;
    const w = idx === 1 ? 86 : 46;
    ctx.fillRect(dx, 50, w, h);
    ctx.fillRect(dx, 256 - 50 - h, w, h);
    ctx.fillRect(2048 - dx - w, 50, w, h);
    ctx.fillRect(2048 - dx - w, 256 - 50 - h, w, h);
  });

  // Runway centerline dashes along all 3,500m
  for (let cx = 170; cx < 1878; cx += 48) {
    ctx.fillRect(cx, 124, 28, 8);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeConcreteTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#C4CDD8';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4500; i++) {
    const v = 180 + ((i * 19) % 26);
    ctx.fillStyle = `rgb(${v},${v + 3},${v + 7})`;
    ctx.fillRect((i * 59) % 512, (i * 83) % 512, 3, 3);
  }
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.32)';
  ctx.lineWidth = 2;
  for (let p = 0; p <= 512; p += 64) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(512, p); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(36, 16);
  tex.anisotropy = 8;
  return tex;
}

function makeGlassTexture() {
  // One 3 m × 4.5 m curtain-wall module per 128 px; repeat is set per mesh from its real size.
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#c9d9e6');
  g.addColorStop(0.55, '#9fb7cb');
  g.addColorStop(1, '#7f98ae');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  // subtle per-pane tint variation (real glazing is never perfectly uniform)
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
    ctx.fillStyle = `rgba(${200 + ((x * 37 + y * 53) % 30)}, ${215 + ((x * 19 + y * 7) % 25)}, 235, ${0.06 + ((x + y) % 3) * 0.035})`;
    ctx.fillRect(x * 128, y * 128, 128, 128);
  }
  // spandrel band at each floor slab
  ctx.fillStyle = 'rgba(70, 84, 100, 0.55)';
  for (let y = 0; y < 4; y++) ctx.fillRect(0, y * 128 + 112, 512, 16);
  // aluminium mullions / transoms
  ctx.fillStyle = '#d7dde3';
  for (let x = 0; x <= 512; x += 128) ctx.fillRect(x - 3, 0, 6, 512);
  for (let y = 0; y <= 512; y += 128) ctx.fillRect(0, y - 2, 512, 4);
  ctx.fillStyle = 'rgba(215, 221, 227, 0.7)';
  for (let x = 64; x < 512; x += 128) ctx.fillRect(x - 1, 0, 2, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function makeRoofTexture() {
  // Standing-seam metal roof (light silver, like Centrair's terminal roofs)
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c4cad1';
  ctx.fillRect(0, 0, 256, 256);
  for (let x = 0; x < 256; x += 16) {
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x, 0, 2, 256);
    ctx.fillStyle = 'rgba(60,70,80,0.18)'; ctx.fillRect(x + 2, 0, 2, 256);
  }
  for (let i = 0; i < 400; i++) { ctx.fillStyle = `rgba(90,100,110,${Math.random() * 0.05})`; ctx.fillRect(Math.random() * 256, Math.random() * 256, 3, 3); }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

// Give a box mesh's material a texture repeated by real-world size (avoids one texture stretched over 300 m)
function sizedMaterial(baseMat, w, h, d, modW = 3, modH = 4.5) {
  const m = baseMat.clone();
  if (baseMat.map) {
    m.map = baseMat.map.clone();
    m.map.needsUpdate = true;
    m.map.repeat.set(Math.max(1, Math.max(w, d) / (modW * 4)), Math.max(1, h / (modH * 4)));
  }
  return m;
}

const standBadgeCache = new Map();
function makeStandBadgeTexture(numStr) {
  const key = String(numStr);
  if (standBadgeCache.has(key)) return standBadgeCache.get(key);
  const c = document.createElement('canvas');
  c.width = 256; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 256, 160);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 240, 144);
  ctx.fillStyle = '#FACC15';
  ctx.font = key.length >= 3 ? '900 72px monospace' : '900 84px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(key, 128, 84);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  standBadgeCache.set(key, tex);
  return tex;
}

function makeRoadMarkingTexture(text, bg = '#334155', fg = '#FACC15', border = null) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 160);
  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 492, 140);
  }
  ctx.fillStyle = fg;
  ctx.font = '900 62px "Be Vietnam Pro", "Hiragino Sans", "Noto Sans JP", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 84);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeFrontPrioritySignTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#475569';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(10, 214, 236, 22);
  ctx.beginPath();
  ctx.moveTo(128, 198);
  ctx.lineTo(28, 28);
  ctx.lineTo(228, 28);
  ctx.closePath();
  ctx.fillStyle = '#DC2626';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(128, 168);
  ctx.lineTo(56, 46);
  ctx.lineTo(200, 46);
  ctx.closePath();
  ctx.fillStyle = '#CBD5E1';
  ctx.fill();
  ctx.fillStyle = '#DC2626';
  ctx.fillRect(122, 62, 12, 74);
  ctx.fillRect(88, 86, 80, 14);
  ctx.fillRect(108, 122, 40, 9);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createGseMesh(kind, opts = {}) {
  // Mọi xe GSE dùng chung thư viện gseLibrary3D.js → cùng tỷ lệ, màu, cabin, bánh xe, đèn xoay
  if (kind !== 'musky_train') {
    const libKind = kind === 'tractor' ? 'tractor' : kind;
    return buildGse(libKind, opts.deckY || 2.8, { ...opts, uldCode: opts.uldType || opts.uldCode });
  }
  const g = new THREE.Group();
  const addBox = (w, h, d, col, x, y, z, metal = 0.25, rough = 0.4) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color: col, metalness: metal, roughness: rough })
    );
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    return m;
  };
  {
    // 4-Car Meitetsu 2000 Series "μ-SKY" Limited Express (Centrair Airport Line Blue & White!)
    for (let ci = 0; ci < 4; ci++) {
      const cz = (ci - 1.5) * 20.6;
      addBox(2.85, 3.35, 19.6, 0xf8fafc, 0, 2.35, cz, 0.3, 0.28);
      addBox(2.90, 0.95, 19.65, 0x1d4ed8, 0, 1.55, cz, 0.35, 0.3);
      addBox(2.91, 0.72, 17.8, 0x0f172a, 0, 2.65, cz, 0.8, 0.12);
      addBox(2.75, 0.35, 19.2, 0x94a3b8, 0, 4.15, cz, 0.45, 0.4);
    }
  }
  return g;
}

export class AirportScene3D {
  constructor(canvas, hudCanvas, opts = {}) {
    this.canvas = canvas;
    this.hudCanvas = hudCanvas;
    this.compact = Boolean(opts.compact);
    this.onInteract = opts.onInteract || null;
    this.disposed = false;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.98;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvas.addEventListener('webglcontextlost', e => e.preventDefault());

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xbcdaf5, 420, 6400);
    this.envKey = null;
    this._updateEnvironment('day');

    // 15,000m far clip so the full 4,370m × 1,920m island, 3,500m runway, 2.5km Skyway Bridge & Tokoname coast never clip!
    this.camera = new THREE.PerspectiveCamera(48, 16 / 9, 1.4, 15000);
    this.camera.position.set(38, 22, 54);
    this.smoothCam = null;

    this.sunLight = new THREE.DirectionalLight(0xfff8eb, 2.15);
    this.sunLight.position.set(160, 280, 140);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.near = 25;
    this.sunLight.shadow.camera.far = 920;
    const d = 225;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    this.hemiLight = new THREE.HemisphereLight(0xdde7f1, 0x6b665e, 0.5);
    this.scene.add(this.hemiLight);

    this.createSkyDome();

    this.staticGroup = new THREE.Group();
    this.scene.add(this.staticGroup);

    this.dynamicGroup = new THREE.Group();
    this.scene.add(this.dynamicGroup);

    this.interactiveObjects = [];
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.texConcrete = makeConcreteTexture();
    this.texGlass = makeGlassTexture();
    this.builtAirportId = null;
    this.builtFleetId = null;
    this.ilsLamps = [];
    this.trafficActors = {};

    // Real-time Rear-View Mirror RenderTargets for TT Driver Cab (gse_cab)
    this.mirrorRT_L = new THREE.WebGLRenderTarget(256, 192, { depthBuffer: true });
    this.mirrorRT_R = new THREE.WebGLRenderTarget(256, 192, { depthBuffer: true });
    this.mirrorRT_L.texture.wrapS = THREE.RepeatWrapping;
    this.mirrorRT_L.texture.repeat.set(-1, 1);
    this.mirrorRT_L.texture.offset.set(1, 0);
    this.mirrorRT_R.texture.wrapS = THREE.RepeatWrapping;
    this.mirrorRT_R.texture.repeat.set(-1, 1);
    this.mirrorRT_R.texture.offset.set(1, 0);
    this.mirrorCamL = new THREE.PerspectiveCamera(58, 256 / 192, 0.4, 900);
    this.mirrorCamR = new THREE.PerspectiveCamera(58, 256 / 192, 0.4, 900);

    this.buildStaticAirport('NGO');
    this.initDynamicActors();

    this.composer = null;
    this.bloomPass = null;
    this.initPostProcessing();

    this._onPointerDown = e => this.handlePointerClick(e);
    this._onPointerMove = e => this.handlePointerHover(e);
    this.canvas.addEventListener('click', this._onPointerDown);
    this.canvas.addEventListener('mousemove', this._onPointerMove);
  }

  async initPostProcessing() {
    return;
  }

  createSkyDome() {
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTopCol: { value: new THREE.Color(0x1f5ca8) },
        uHorizonCol: { value: new THREE.Color(0xbddcf7) },
        uSunDir: { value: new THREE.Vector3(0.42, 0.78, 0.36).normalize() },
        uSunCol: { value: new THREE.Color(0xfff6dc) },
        uNight: { value: 0.0 }
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTopCol;
        uniform vec3 uHorizonCol;
        uniform vec3 uSunDir;
        uniform vec3 uSunCol;
        uniform float uNight;
        varying vec3 vDir;
        void main() {
          float h = clamp(vDir.y, 0.0, 1.0);
          vec3 col = mix(uHorizonCol, uTopCol, pow(h, 0.52));
          float sd = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
          col += uSunCol * (pow(sd, 18.0) * 0.48 + smoothstep(0.996, 0.9994, sd) * 1.8) * (1.0 - uNight * 0.9);
          if (uNight > 0.5 && h > 0.1) {
            float st = fract(sin(dot(floor(vDir * 240.0), vec3(12.9898, 78.233, 37.719))) * 43758.5453);
            if (st > 0.995) col += vec3(0.9, 0.95, 1.0) * uNight;
          }
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    this.skyMat = skyMat;
    this.skyMesh = new THREE.Mesh(new THREE.SphereGeometry(11500, 28, 16), skyMat);
    this.scene.add(this.skyMesh);
  }

  buildStaticAirport(airportId) {
    this.builtAirportId = airportId;
    while (this.staticGroup.children.length) this.staticGroup.remove(this.staticGroup.children[0]);
    this.ilsLamps = [];

    const ap = A3D_AIRPORTS[airportId] || A3D_AIRPORTS.NGO;
    const addBox = (w, h, d, col, x, y, z, matExtra = {}) => {
      const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.65, metalness: 0.12, ...matExtra });
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = h > 0.6;
      m.receiveShadow = true;
      this.staticGroup.add(m);
      return m;
    };

    // 1. Vast Ise Bay / Regional Sea or Mainland Terrain (18km × 16km)
    const seaHex = (ap.seaCol[0] << 16) | (ap.seaCol[1] << 8) | ap.seaCol[2];
    const seaMat = new THREE.MeshStandardMaterial({
      color: seaHex,
      roughness: ap.island ? 0.18 : 0.88,
      metalness: ap.island ? 0.62 : 0.05
    });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(18000, 16000), seaMat);
    sea.rotation.x = -Math.PI / 2;
    sea.position.y = ap.island ? -2.2 : -0.35;
    sea.receiveShadow = true;
    this.staticGroup.add(sea);
    this.seaMesh = sea;

    // 2. Authentic 1:1 Meter Chamfered 4,370m × 1,920m Artificial Island (Chubu Centrair RJGG)
    //    Spanning X = -2,120m (South) to +2,250m (North) [4,370m] & Z = -730m (West Ise Bay) to +1,190m (East Marina/Skyway) [1,920m]!
    const landHex = (ap.landCol[0] << 16) | (ap.landCol[1] << 8) | ap.landCol[2];
    const islandPts = [
      [-1820, -730], [1940, -730], [2250, -480], [2250, 480],
      [1650, 960], [380, 1190], [-760, 1190], [-1480, 860],
      [-2120, 460], [-2120, -480]
    ];
    const islShape = new THREE.Shape();
    islShape.moveTo(islandPts[0][0], -islandPts[0][1]);
    for (let i = 1; i < islandPts.length; i++) islShape.lineTo(islandPts[i][0], -islandPts[i][1]);
    islShape.closePath();
    const islDepth = ap.island ? 2.2 : 0.35;
    const islGeo = new THREE.ExtrudeGeometry(islShape, { depth: islDepth, bevelEnabled: false });
    islGeo.rotateX(-Math.PI / 2);
    const islMesh = new THREE.Mesh(
      islGeo,
      new THREE.MeshStandardMaterial({ color: landHex, roughness: ap.snow ? 0.55 : 0.88, metalness: 0.04 })
    );
    islMesh.position.y = -islDepth;
    islMesh.receiveShadow = true;
    this.staticGroup.add(islMesh);

    // Concrete Seawall Revetment (護岸) around the 4.37km Island
    if (ap.island) {
      for (let i = 0; i < islandPts.length; i++) {
        const [ax, az] = islandPts[i];
        const [bx, bz] = islandPts[(i + 1) % islandPts.length];
        const len = Math.hypot(bx - ax, bz - az);
        const wall = addBox(6.5, 2.7, len + 4, 0x8b95a5, (ax + bx) * 0.5, -0.65, (az + bz) * 0.5, { roughness: 0.82 });
        wall.rotation.y = Math.atan2(bx - ax, bz - az);
      }
    }

    // 3. 2.5km Centrair Skyway & Meitetsu Airport Line Bridge + Tokoname Mainland Shoreline (East +Z)
    if (ap.bridge) {
      // Highway deck (x = 104..124) & Meitetsu Dual-Track Railway Viaduct (x = 128..140) spanning z = 360 .. 2,860m!
      addBox(22, 2.4, 2500, 0x94a3b8, 113, 8.2, 1610, { roughness: 0.65 });
      addBox(19, 0.12, 2500, 0x334155, 113, 9.48, 1610, { roughness: 0.8 });
      addBox(0.5, 0.06, 2480, 0xf8fafc, 113, 9.56, 1610);
      addBox(11.5, 2.2, 2500, 0xcbd5e1, 134, 8.6, 1610, { roughness: 0.55 });
      addBox(0.35, 0.14, 2490, 0x475569, 131.8, 9.8, 1610, { metalness: 0.7 });
      addBox(0.35, 0.14, 2490, 0x475569, 136.2, 9.8, 1610, { metalness: 0.7 });
      for (let pz = 460; pz <= 2760; pz += 115) {
        addBox(30, 10.6, 5.5, 0x94a3b8, 122, 3.1, pz, { roughness: 0.75 });
      }
      // Tokoname / Rinku Mainland Coastline & Hills at z = 2,860 .. 4,900m
      addBox(9200, 3.2, 2200, 0x567354, 0, -0.6, 3960, { roughness: 0.9 });
      [[-1400, 3800, 520, 145], [260, 4150, 680, 185], [1750, 3950, 590, 160]].forEach(([mx, mz, mr, mh]) => {
        const hill = new THREE.Mesh(new THREE.ConeGeometry(mr, mh, 12), new THREE.MeshStandardMaterial({ color: 0x4b6850, roughness: 0.92 }));
        hill.position.set(mx, mh * 0.45, mz);
        this.staticGroup.add(hill);
      });
    }

    // Distant Mie / Suzuka Mountain Silhouette across West Ise Bay (z ≈ -4,800m)
    [[-1850, -4900, 920, 290], [-320, -5200, 1180, 360], [1420, -4950, 980, 275]].forEach(([mx, mz, mr, mh]) => {
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(mr, mh, 12), new THREE.MeshStandardMaterial({ color: ap.snow ? 0xa8bcd4 : 0x5f7896, roughness: 0.92 }));
      mtn.position.set(mx, mh * 0.44, mz);
      this.staticGroup.add(mtn);
    });

    if (ap.city) {
      [[-950, 1450, 65, 140], [-740, 1520, 75, 185], [680, 1480, 70, 165], [920, 1420, 64, 130]].forEach(([bx, bz, bw, bh]) => {
        addBox(bw, bh, bw, 0xc3d7ee, bx, bh * 0.5, bz, { map: this.texGlass, roughness: 0.2, metalness: 0.65 });
      });
    }
    if (ap.snow) {
      for (let tx = -1600; tx <= 1600; tx += 160) {
        const pine = new THREE.Mesh(new THREE.ConeGeometry(7.5, 22, 7), new THREE.MeshStandardMaterial({ color: 0x305642, roughness: 0.85 }));
        pine.position.set(tx, 11, 520);
        this.staticGroup.add(pine);
      }
    }

    const addDecal = (tex, w, d, x, y, z, rotY = 0) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.72,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          polygonOffsetUnits: -4
        })
      );
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = rotY;
      m.position.set(x, y + 0.08, z);
      m.renderOrder = 5;
      m.receiveShadow = true;
      this.staticGroup.add(m);
      return m;
    };

    const texPriority = makeFrontPrioritySignTexture();
    const texStop = makeRoadMarkingTexture('STOP', '#334155', '#FFFFFF');
    const texBlast = makeRoadMarkingTexture('ブラスト注意', '#334155', '#FACC15', '#FACC15');
    const texNoPar = makeRoadMarkingTexture('並走禁止', '#334155', '#FACC15');
    const texIls = makeRoadMarkingTexture('ILS制限区域', '#334155', '#FFFFFF', '#2563EB');
    const texH38 = makeRoadMarkingTexture('高さ制限 3.8m', '#FACC15', '#0F172A', '#DC2626');

    // 4. TRUE 1:1 SCALE RUNWAY 36/18 (3,500m × 60m at z = -580, exact 400m West of 300m Center Pier Tip z = -180!)
    const rwyLen = airportId === 'NRT' ? 4000 : (airportId === 'CTS' ? 3000 : 3500);
    const rwyTex = makeRunwayTexture(ap.rwy, ap.snow);
    this.runwayMat = new THREE.MeshStandardMaterial({
      map: rwyTex,
      roughness: 0.72,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    // Graded grass safety strip around runway
    addBox(rwyLen + 360, 0.04, 190, ap.snow ? 0xdbe5ef : 0x5c7c54, 0, 0.01, -580, { roughness: 0.92 });
    const rwy = new THREE.Mesh(new THREE.PlaneGeometry(rwyLen, 60), this.runwayMat);
    rwy.rotation.x = -Math.PI / 2;
    rwy.position.set(0, 0.14, -580);
    rwy.renderOrder = 3;
    rwy.receiveShadow = true;
    this.staticGroup.add(rwy);

    // 420m Approach Lighting System (ALS) Piers extending into Ise Bay off South (RWY 36) & North (RWY 18) ends!
    [-1, 1].forEach(dir => {
      const startX = dir * (rwyLen * 0.5 + 15);
      addBox(420, 1.2, 4.2, 0x94a3b8, startX + dir * 210, 0.8, -580, { metalness: 0.35 });
      for (let step = 30; step <= 420; step += 45) {
        const px = startX + dir * step;
        addBox(2.2, 3.4, 2.2, 0x64748b, px, -0.7, -580);
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, step === 210 ? 22 : 9.5), new THREE.MeshBasicMaterial({ color: 0xfffbeb }));
        bar.position.set(px, 1.65, -580);
        this.staticGroup.add(bar);
      }
    });

    // Instanced Runway Edge Lights (every 60m along 3,500m) + Threshold Bars + Dual PAPI!
    {
      const halfR = rwyLen * 0.5 - 12;
      const step = 60;
      const cnt = Math.floor((halfR * 2) / step) * 2 + 8;
      const edgeInst = new THREE.InstancedMesh(new THREE.SphereGeometry(0.68, 6, 6), new THREE.MeshBasicMaterial({ color: 0xfef9c3 }), cnt);
      const dummy = new THREE.Object3D();
      let idx = 0;
      for (let lx = -halfR; lx <= halfR; lx += step) {
        [-31.8, 31.8].forEach(lz => {
          if (idx < cnt) {
            dummy.position.set(lx, 0.55, -580 + lz);
            dummy.updateMatrix();
            edgeInst.setMatrixAt(idx++, dummy.matrix);
          }
        });
      }
      edgeInst.count = idx;
      this.staticGroup.add(edgeInst);

      // Green / Red Threshold Light Bars & PAPI 4-Light Units
      for (let tz = -28; tz <= 28; tz += 5.6) {
        const gL = new THREE.Mesh(new THREE.SphereGeometry(0.62, 6, 6), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
        gL.position.set(-rwyLen * 0.5 + 3, 0.52, -580 + tz);
        const rL = new THREE.Mesh(new THREE.SphereGeometry(0.62, 6, 6), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        rL.position.set(rwyLen * 0.5 - 3, 0.52, -580 + tz);
        this.staticGroup.add(gL, rL);
      }
      [-rwyLen * 0.5 + 360, rwyLen * 0.5 - 360].forEach(px => {
        for (let pi = 0; pi < 4; pi++) {
          const papi = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.95, 1.4),
            new THREE.MeshBasicMaterial({ color: pi < 2 ? 0xffffff : 0xef4444 })
          );
          papi.position.set(px, 0.75, -618 - pi * 4.2);
          this.staticGroup.add(papi);
        }
      });
    }

    // 5. FULL PARALLEL TAXIWAYS A (-415), B (-335), C (-235), INNER TAXILANE D5 (-62) & RAPID EXITS A1–A10
    const addTwyStrip = (ax, az, bx, bz, widthM = 25) => {
      const len = Math.hypot(bx - ax, bz - az);
      const grp = new THREE.Group();
      grp.position.set((ax + bx) * 0.5, 0.06, (az + bz) * 0.5);
      grp.rotation.y = Math.atan2(bx - ax, bz - az);
      const pav = new THREE.Mesh(
        new THREE.BoxGeometry(widthM, 0.08, len + widthM * 0.35),
        new THREE.MeshStandardMaterial({ color: 0x3b4453, roughness: 0.78 })
      );
      pav.receiveShadow = true;
      grp.add(pav);
      const cl = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.04, len),
        new THREE.MeshBasicMaterial({ color: 0xfacc15 })
      );
      cl.position.y = 0.055;
      grp.add(cl);
      this.staticGroup.add(grp);
    };

    // Parallel A-TWY (-415), B-TWY (-335), C-TWY (-235) & Inner Apron Taxilane (-62)
    addTwyStrip(-1740, -415, 1740, -415, 25);
    addTwyStrip(-1580, -335, 1640, -335, 25);
    addTwyStrip(-1380, -235, 1600, -235, 25);
    addTwyStrip(-1150, -62, 1520, -62, 22);

    // Runway Exits A1–A10 (including high-speed angled exits & Runway Hold-Short bars at z = -470!)
    [
      [-1720, -1720], // A1 (South RWY 36 Threshold)
      [-1380, -1290], // A2
      [-960, -860],   // A3
      [-520, -430],   // A4
      [-160, -160],   // A5
      [180, 255],     // A6 (High-Speed Exit used by JP102 in Phase 2!)
      [560, 470],     // A7
      [980, 890],     // A8
      [1380, 1300],   // A9
      [1720, 1720]    // A10 (North RWY 18 Threshold)
    ].forEach(([rx, ax]) => {
      addTwyStrip(rx, -580, ax, -415, 24);
      // Red/Yellow Runway Hold-Short Bar
      const hx = rx + (ax - rx) * 0.66;
      addBox(24, 0.05, 1.2, 0xdc2626, hx, 0.11, -472);
      addBox(24, 0.06, 0.55, 0xfacc15, hx, 0.12, -470.5);
    });

    // Crossovers between A-TWY, B-TWY, C-TWY & Inner Apron Taxilane
    [-1360, -920, -680, -440, -108, 255, 520, 960, 1380].forEach(cx => {
      addTwyStrip(cx, -415, cx, -235, 23);
    });
    // Apron Entry/Exit Links (avoiding the 300m Center Pier at x ∈ [18, 74]!)
    [-920, -680, -440, -108, 0, 148, 340, 520, 960, 1380].forEach(cx => {
      const zFrom = cx === 0 ? -235 : -235;
      addTwyStrip(cx, zFrom, cx, -55, 22);
    });

    // 6. FULL 1:1 CONCRETE APRONS (T2 South, T1 Main + 300m Center Pier, Remote #200-#600, North Cargo #101-#119 & Coast Guard)
    this.apronMat = new THREE.MeshStandardMaterial({ map: this.texConcrete, color: 0xf3efe6, roughness: 0.82, metalness: 0.0 });
    const addApronSlab = (w, d, cx, cz) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), this.apronMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(cx, 0.04, cz);
      m.receiveShadow = true;
      this.staticGroup.add(m);
    };
    addApronSlab(3180, 185, 340, 38);     // Continuous Main / T2 / Cargo Apron (-1250 .. +1930, z = -54 .. +131)
    addApronSlab(128, 165, 46, -122);     // 300m T1 Center Pier Apron Pad (x = -18..110, z = -204..-40)
    addApronSlab(1340, 124, 860, -142);   // North Remote (#201-#206) & Cargo (#101-#119) Outer Apron Pad
    addApronSlab(960, 124, -680, -142);   // South Remote (#301-#601) Outer Apron Pad

    // 7. OFFICIAL 2.8km AIRSIDE GSE SPINE ROAD, BEHIND-STAND ROAD, CENTER PIER LOOP, SERVICE LANES & 8.5km PERIMETER ROAD
    // 2.8km Dual-Lane Head-of-Stand GSE Spine Road (z = +50, width 13m, x = -1260 .. +1850)
    addBox(3110, 0.06, 13, 0x475364, 295, 0.05, 50, { roughness: 0.76 });
    for (let gx = -1240; gx <= 1830; gx += 20) {
      addBox(8.5, 0.04, 0.30, 0xf8fafc, gx, 0.09, 50);
    }
    // Solid white No-Parallel-Driving line (並走禁止) in front of Airport Fire Station (x = 490), Cargo (155), Center Pier (46) & T2 (-570)
    addBox(68, 0.05, 0.40, 0xf8fafc, 490, 0.095, 50);
    addDecal(texNoPar, 16, 4.6, 490, 0.11, 50);
    addBox(52, 0.05, 0.40, 0xf8fafc, 155, 0.095, 50);
    addDecal(texNoPar, 14, 4.4, 155, 0.11, 50);
    addBox(42, 0.05, 0.40, 0xf8fafc, 46, 0.095, 50);
    addDecal(texNoPar, 12, 4.0, 46, 0.11, 50);
    addBox(48, 0.05, 0.40, 0xf8fafc, -570, 0.095, 50);
    addDecal(texNoPar, 14, 4.4, -570, 0.11, 50);

    // Green Pedestrian & Bicycle Walkway (歩行者・自転車通行帯) along T1 Wings & T2 + Zebra Crosswalk at Center Pier
    addBox(840, 0.04, 2.6, 0x16a34a, 0, 0.095, 58.2);
    addBox(390, 0.04, 2.6, 0x16a34a, -765, 0.095, 58.2);
    for (let zx = 34; zx <= 58; zx += 2.4) {
      addBox(1.2, 0.05, 10.2, 0xf8fafc, zx, 0.10, 50);
    }

    // Behind-Stand Vehicle Road (z = -38) split cleanly around the 300m Center Pier + Red ABL Boundary (-42.3)
    addBox(1280, 0.06, 8.8, 0x475364, -620, 0.05, -38, { roughness: 0.76 }); // x = -1260 .. +20
    addBox(1778, 0.06, 8.8, 0x475364, 961, 0.05, -38, { roughness: 0.76 });  // x = +72 .. +1850
    addBox(1280, 0.08, 0.9, 0xdc2626, -620, 0.09, -42.5);
    addBox(1778, 0.08, 0.9, 0xdc2626, 961, 0.09, -42.5);

    // 300m Center Pier Tip Perimeter Loop Road (x = 20 & x = 72 along z = -38..-194, wrapping across z = -194!)
    addBox(8.8, 0.06, 160, 0x475364, 20.5, 0.05, -116, { roughness: 0.76 });
    addBox(8.8, 0.06, 160, 0x475364, 71.5, 0.05, -116, { roughness: 0.76 });
    addBox(60, 0.06, 8.8, 0x475364, 46.0, 0.05, -194, { roughness: 0.76 });
    addBox(64, 0.08, 0.85, 0xdc2626, 46.0, 0.09, -199.2); // Red ABL at Center Pier Tip!

    // Official White-Zippered Service Lanes (サービスレーン) with Inverted Priority Triangle (前方優先道路)
    const addServiceLane = (xCenter, zStart, zEnd) => {
      const len = Math.abs(zEnd - zStart);
      const zMid = (zStart + zEnd) * 0.5;
      addBox(14, 0.06, len, 0x475364, xCenter, 0.065, zMid, { roughness: 0.75 });
      addBox(0.38, 0.04, len, 0xf8fafc, xCenter, 0.105, zMid);
      for (let sz = Math.min(zStart, zEnd) + 2; sz <= Math.max(zStart, zEnd) - 2; sz += 4.4) {
        addBox(0.32, 0.04, 2.0, 0xf8fafc, xCenter - 6.6, 0.105, sz);
        addBox(0.32, 0.04, 2.0, 0xf8fafc, xCenter - 5.9, 0.105, sz + 1.9);
        addBox(0.32, 0.04, 2.0, 0xf8fafc, xCenter + 6.6, 0.105, sz);
        addBox(0.32, 0.04, 2.0, 0xf8fafc, xCenter + 5.9, 0.105, sz + 1.9);
      }
    };
    // One 前方優先道路 marking + stop bar PER DIRECTION, placed on the lane just before the taxiway edge
    // (the texture carries its own white stop bar along one edge; rot π puts that bar on the -Z side).
    const addPriorityStops = (xCenter, zTwy, twyHalfW) => {
      const stopA = zTwy + twyHalfW + 0.5;   // vehicles heading -Z stop here
      const stopB = zTwy - twyHalfW - 0.5;   // vehicles heading +Z stop here
      addDecal(texPriority, 8, 8, xCenter, 0.115, stopA + 4.2, Math.PI);
      addDecal(texPriority, 8, 8, xCenter, 0.115, stopB - 4.2, 0);
    };
    [-31, -155, 148, -520, 520].forEach(sx => { addServiceLane(sx, -82, -42); addPriorityStops(sx, -62, 11); });
    [-108, 148, -520, 520].forEach(sx => { addServiceLane(sx, -256, -208); addPriorityStops(sx, -235, 12.5); });

    // 8.5km Airport Perimeter Road (場周道路: West Seawall z = -685, South x = -2060, North x = +2130; Max 40 km/h)
    addBox(4204, 0.06, 15, 0x3b4554, 35, 0.05, -685, { roughness: 0.76 });
    addBox(15, 0.06, 1220, 0x3b4554, -2060, 0.05, -80, { roughness: 0.76 });
    addBox(15, 0.06, 1020, 0x3b4554, 2130, 0.05, -180, { roughness: 0.76 });
    for (let px = -2020; px <= 2090; px += 36) addBox(14, 0.04, 0.38, 0xf8fafc, px, 0.09, -685);
    addDecal(texStop, 12, 4.8, -2060, 0.11, -580, Math.PI / 2);
    addDecal(texStop, 12, 4.8, 2130, 0.11, -580, Math.PI / 2);

    // Official Blue-Bordered ILS Restricted Zones (ILS制限区域) with Illuminated Red Warning Lamps!
    [[-1300, 260], [-200, 110], [1300, 260]].forEach(([ix, iw], idx) => {
      addBox(iw, 0.05, 0.85, 0x2563eb, ix, 0.10, -677.2);
      addBox(iw, 0.05, 0.85, 0x2563eb, ix, 0.10, -692.8);
      addDecal(texIls, 22, 6.2, ix, 0.11, -685);
      const poleX = ix + iw * 0.48;
      addBox(0.55, 5.2, 0.55, 0x94a3b8, poleX, 2.6, -675.5);
      addBox(4.8, 2.2, 0.35, 0xf8fafc, poleX, 4.2, -675.5);
      const lamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.85, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      lamp.position.set(poleX, 6.0, -675.5);
      this.staticGroup.add(lamp);
      this.ilsLamps.push(lamp);
      if (idx === 1) this.ilsLampMesh = lamp;
    });

    // 8. AUTHENTIC TEXTBOOK WING-HUGGING OPEN-BACK ERA + ESA + PBB HATCHED + 4 COLOR PITS FOR INTERACTIVE SPOTS 6, 7, 14!
    const eraRedMat = new THREE.MeshBasicMaterial({ color: 0xef233c, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -5 });
    const eraWhtMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -6 });
    const eraTintMat = new THREE.MeshBasicMaterial({ color: 0xef233c, transparent: true, opacity: 0.055, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });

    const addEraSeg = (ax, az, bx, bz, thick, mat, yPos) => {
      const segLen = Math.hypot(bx - ax, bz - az);
      const seg = new THREE.Mesh(new THREE.PlaneGeometry(thick, segLen + thick * 0.35), mat);
      seg.rotation.x = -Math.PI / 2;
      const w = new THREE.Group();
      w.position.set((ax + bx) * 0.5, yPos, (az + bz) * 0.5);
      w.rotation.y = Math.atan2(bx - ax, bz - az);
      seg.renderOrder = 5;
      w.add(seg);
      this.staticGroup.add(w);
    };
    const addDashedBox = (x1, z1, x2, z2) => {
      const side = (ax, az, bx, bz) => {
        const len = Math.hypot(bx - ax, bz - az);
        const dx = (bx - ax) / len, dz = (bz - az) / len;
        for (let d = 0; d < len; d += 3.0) {
          const e = Math.min(len, d + 1.8);
          addEraSeg(ax + dx * d, az + dz * d, ax + dx * e, az + dz * e, 0.24, eraWhtMat, 0.112);
        }
      };
      side(x1, z1, x2, z1); side(x2, z1, x2, z2); side(x2, z2, x1, z2); side(x1, z2, x1, z1);
    };

    A3D_SPOTS.forEach(sp => {
      const halfSpan = sp.wingHalf || 18;
      const halfL = sp.eraHalfL || (halfSpan > 20 ? 23.0 : 18.5);
      const ecz = sp.eraCz ?? sp.cz; // ERA centre (nose-gear-referenced stands extend aft for long types)
      const fuseR = halfSpan > 20 ? 2.6 : 1.9;

      addBox(0.50, 0.04, 62, 0xf5c818, sp.cx, 0.08, -3);
      addBox(7.2, 0.04, 0.45, 0xf5c818, sp.cx, 0.085, ecz + halfL - 3.5);
      addBox(5.6, 0.04, 0.32, 0xf5c818, sp.cx, 0.085, ecz + halfL - 5.5);
      addBox(3.4, 0.04, 0.28, 0xf8fafc, sp.cx, 0.085, sp.cz - 8.5);

      const sTex = makeStandBadgeTexture(sp.ngoNo);
      const sPlate = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 4.4), new THREE.MeshStandardMaterial({ map: sTex, roughness: 0.7 }));
      sPlate.rotation.x = -Math.PI / 2;
      sPlate.position.set(sp.cx, 0.09, ecz + halfL + 9.2);
      this.staticGroup.add(sPlate);

      // 4 Color-Coded Apron Utility Pits (White Hydrant, Red Bonding, Blue GPU, Yellow PC-Air)
      addBox(1.4, 0.05, 1.4, 0xf8fafc, sp.cx - 10.6, 0.095, sp.cz - 2.0);
      addBox(0.75, 0.05, 0.75, 0xef4444, sp.cx - 11.8, 0.095, sp.cz + 0.2);
      addBox(1.1, 0.05, 1.1, 0x2563eb, sp.cx - 5.8, 0.095, sp.cz + 16.5);
      addBox(1.1, 0.05, 1.1, 0xfacc15, sp.cx + 5.2, 0.095, sp.cz + 10.5);

      // Port (+X) PBB Red Cross-Hatched Zone + White [ ] Standby Box
      const px = sp.cx + 12.2, pz = sp.cz + 11.5;
      addBox(16.5, 0.04, 9.2, 0xdc2626, px, 0.08, pz, { transparent: true, opacity: 0.20 });
      addBox(16.5, 0.05, 0.32, 0xdc2626, px, 0.09, pz - 4.6);
      addBox(16.5, 0.05, 0.32, 0xdc2626, px, 0.09, pz + 4.6);
      for (let hx = -6.5; hx <= 6.5; hx += 3.2) {
        const bar = addBox(0.30, 0.04, 10.8, 0xef4444, px + hx, 0.095, pz);
        bar.rotation.y = 0.62;
      }
      addDashedBox(px + 4.5, pz - 2.2, px + 8.2, pz + 2.2);

      // Open-Back Wing-Hugging Bright Red ERA Polyline
      const localPts = computeWingHuggingEraPolyline(halfL, halfSpan, fuseR);
      const worldPts = localPts.map(([lx, lz]) => [sp.cx + lx, ecz + lz]);

      const eShape = new THREE.Shape();
      eShape.moveTo(worldPts[0][0], -worldPts[0][1]);
      for (let i = 1; i < worldPts.length; i++) eShape.lineTo(worldPts[i][0], -worldPts[i][1]);
      eShape.closePath();
      const eFill = new THREE.Mesh(new THREE.ShapeGeometry(eShape), eraTintMat);
      eFill.rotation.x = -Math.PI / 2;
      eFill.position.y = 0.092;
      eFill.renderOrder = 4;
      this.staticGroup.add(eFill);

      for (let i = 0; i < worldPts.length - 1; i++) {
        addEraSeg(worldPts[i][0], worldPts[i][1], worldPts[i + 1][0], worldPts[i + 1][1], 0.48, eraRedMat, 0.11);
      }
      addEraSeg(worldPts[0][0], worldPts[0][1], worldPts[0][0] + 2.0, worldPts[0][1], 0.48, eraRedMat, 0.11);
      addEraSeg(worldPts[12][0], worldPts[12][1], worldPts[12][0] - 2.0, worldPts[12][1], 0.48, eraRedMat, 0.11);

      const bodyW = fuseR + 6.8;
      const wingW = halfSpan + 3.8;
      addDashedBox(sp.cx - (wingW - 0.5), ecz + halfL * 0.45, sp.cx - (bodyW + 1.8), ecz + halfL + 6.5);
      addDashedBox(sp.cx - (wingW - 0.5), ecz - (halfL + 3.5), sp.cx - (bodyW + 1.8), ecz - 12.5);
    });

    // Helper for painted stand badges, lead-in lines & authentic Wing-Hugging Open-Back Red ERA across T1, Pier, T2, Remote & Cargo!
    const drawStandEra = (cx, cz, rotY = 0, halfL = 19, halfSpan = 18, fuseR = 2.0, hasPbb = false) => {
      const grp = new THREE.Group();
      grp.position.set(cx, 0, cz);
      grp.rotation.y = rotY;
      const localPts = computeWingHuggingEraPolyline(halfL, halfSpan, fuseR);
      for (let i = 0; i < localPts.length - 1; i++) {
        const ax = localPts[i][0], az = localPts[i][1];
        const bx = localPts[i + 1][0], bz = localPts[i + 1][1];
        const len = Math.hypot(bx - ax, bz - az);
        const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.42, len + 0.15), eraRedMat);
        seg.rotation.x = -Math.PI / 2;
        const w = new THREE.Group();
        w.position.set((ax + bx) * 0.5, 0.105, (az + bz) * 0.5);
        w.rotation.y = Math.atan2(bx - ax, bz - az);
        seg.renderOrder = 5;
        w.add(seg);
        grp.add(w);
      }
      if (hasPbb) {
        const pbbZ = halfL - 7.5;
        const px = fuseR + 10.2;
        const zone = new THREE.Mesh(new THREE.PlaneGeometry(13, 8.2), eraTintMat);
        zone.rotation.x = -Math.PI / 2;
        zone.position.set(px, 0.095, pbbZ);
        grp.add(zone);
      }
      this.staticGroup.add(grp);
    };

    const addStandMark = (sx, sz, no, rotY = 0, lineLen = 36, opts = {}) => {
      addDecal(makeStandBadgeTexture(no), 7.0, 4.2, sx, 0.10, sz, rotY);
      const dz = rotY === 0 ? -lineLen * 0.5 : 0;
      const dx = rotY !== 0 ? (rotY > 0 ? -lineLen * 0.5 : lineLen * 0.5) : 0;
      const ln = addBox(rotY === 0 ? 0.45 : lineLen, 0.04, rotY === 0 ? lineLen : 0.45, 0xf5c818, sx + dx, 0.08, sz + dz);
      // Place aircraft-center ERA contour slightly behind badge along lead-in
      const eraDist = opts.eraDist ?? 18;
      const ecx = sx + (rotY !== 0 ? (rotY > 0 ? -eraDist : eraDist) : 0);
      const ecz = sz + (rotY === 0 ? -eraDist : 0);
      drawStandEra(ecx, ecz, rotY, opts.halfL || 19, opts.halfSpan || 18, opts.fuseR || 2.0, Boolean(opts.hasPbb));
      return ln;
    };

    // Center Pier Stands (#8, #9, #10 on North +X side; #12, #13 on South -X side)
    [[92, -35, '8', -Math.PI / 2], [92, -95, '9', -Math.PI / 2], [92, -152, '10', -Math.PI / 2],
     [0, -95, '12', Math.PI / 2], [0, -152, '13', Math.PI / 2]].forEach(([sx, sz, no, ry]) => {
      addStandMark(sx, sz, no, ry, 28, { halfL: 21, halfSpan: 20, fuseR: 2.3, hasPbb: true, eraDist: -4 });
    });

    // T1 North Domestic (#2-#5) & T1 South International (#16-#24)
    [[210, 28, '5'], [285, 28, '4'], [360, 28, '3'], [420, 28, '2'],
     [-185, 28, '16'], [-265, 28, '19'], [-345, 28, '22'], [-415, 28, '24']].forEach(([sx, sz, no]) => {
      addStandMark(sx, sz, no, 0, 42, { halfL: 21, halfSpan: 21, fuseR: 2.3, hasPbb: true, eraDist: 18 });
    });

    // Remote Stands (#201-#206 North, #301-#601 South)
    [[230, -110, '201'], [315, -110, '203'], [405, -110, '206'],
     [-260, -110, '301'], [-380, -110, '303'], [-560, -110, '401'], [-740, -110, '501'], [-910, -110, '601']].forEach(([rx, rz, no]) => {
      addStandMark(rx, rz, no, 0, 46, { halfL: 20, halfSpan: 18.5, fuseR: 2.0, hasPbb: false, eraDist: 22 });
    });

    // North Cargo Freighter Stands (#101-#119 — Widebody B77F scale!)
    [[575, 22, '101'], [665, 22, '103'], [765, 22, '105'], [875, 22, '107'],
     [990, 22, '109'], [1110, 22, '112'], [1235, 22, '115'], [1365, 22, '119']].forEach(([cx, cz, no]) => {
      addStandMark(cx, cz, no, 0, 54, { halfL: 26, halfSpan: 25, fuseR: 2.7, hasPbb: false, eraDist: 20 });
    });

    // 9. ALL 1:1 ARCHITECTURE & DISTRICTS (100% ALIGNED WITH A3D_OBSTACLES!)
    this.glassMat = new THREE.MeshPhysicalMaterial({ map: this.texGlass, roughness: 0.06, metalness: 0.15, clearcoat: 1.0, clearcoatRoughness: 0.05, envMapIntensity: 1.35, emissive: new THREE.Color(0x000000) });
    this.roofMat = new THREE.MeshStandardMaterial({ map: makeRoofTexture(), color: 0xffffff, roughness: 0.42, metalness: 0.55, envMapIntensity: 1.0 });
    const glassBox = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), sizedMaterial(this.glassMat, w, h, d));
      m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
      this.glassMeshes = this.glassMeshes || []; this.glassMeshes.push(m);
      this.staticGroup.add(m); return m;
    };
    const roofBox = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.roofMat.clone());
      m.material.map = this.roofMat.map.clone(); m.material.map.needsUpdate = true;
      m.material.map.repeat.set(Math.max(1, w / 24), Math.max(1, d / 24));
      m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
      this.staticGroup.add(m); return m;
    };

    // 9A. Terminal 1 Main Building ([-165..185, 68..175]) + North Wing ([185..430, 66..112]) + South Wing ([-435..-165, 66..112])
    addBox(350, 4.5, 107, 0xdbe3ee, 10, 2.25, 121.5);
    glassBox(344, 14.5, 101, 10, 11.75, 121.5);
    roofBox(362, 2.6, 113, 10, 20.3, 121.5);

    // T1 North Domestic Wing & T1 South International Wing
    [[307.5, 89, 245, 46], [-300, 89, 270, 46]].forEach(([wx, wz, ww, wd]) => {
      addBox(ww, 3.6, wd, 0xdbe3ee, wx, 1.8, wz);
      glassBox(ww - 4, 10.4, wd - 4, wx, 8.8, wz);
      roofBox(ww + 4, 1.9, wd + 4, wx, 14.9, wz);
    });

    // 9B. Iconic 300m T1 Center Pier (センターピア: x ∈ [28, 64], z = +68 out to z = -180 — exact 400.0m from RWY 36/18!)
    //     + Elevated 3.8m-Clearance Fixed Bridge across z = 50 GSE Spine Road + Rooftop Wooden Sky Deck!
    glassBox(34, 8.8, 28, 46, 9.2, 54); // Bottom at y = 4.8m (>3.8m clearance sign!)
    roofBox(36, 1.4, 30, 46, 14.3, 54);
    addBox(36.2, 0.85, 1.1, 0xfacc15, 46, 4.35, 43.2);
    addBox(36.2, 0.85, 1.1, 0xfacc15, 46, 4.35, 56.8);
    addDecal(texH38, 12, 3.4, 46, 0.11, 50);
    addDecal(texStop, 8.5, 3.4, 46, 0.11, 39.5);

    // 220m Main Finger of the 300m Center Pier (x ∈ [28, 64], z ∈ [-180, +40])
    addBox(36, 4.0, 220, 0xdbe3ee, 46, 2.0, -70);
    glassBox(34.5, 9.6, 218, 46, 8.8, -70);
    roofBox(36.8, 1.4, 221, 46, 14.3, -70);
    // Famous 300m Centrair Wooden Sky Deck (スカイデッキ) along the roof out to z = -178m!
    addBox(16, 0.65, 238, 0xa8764c, 46, 15.3, -58, { roughness: 0.78 });
    addBox(0.35, 1.2, 238, 0xe2e8f0, 38.2, 16.2, -58, { metalness: 0.6 });
    addBox(0.35, 1.2, 238, 0xe2e8f0, 53.8, 16.2, -58, { metalness: 0.6 });
    addBox(16, 1.2, 0.35, 0xe2e8f0, 46, 16.2, -177, { metalness: 0.6 });

    // Fixed Passenger Bridges & Rotundas for Spot 6 (-48), Spot 7 (+21), and Spot 14 (+122)
    const addPortPier = (rotX, rotZ1, rotZ2) => {
      const zEnd = Math.min(rotZ1, rotZ2 || rotZ1);
      const len = 68 - zEnd;
      glassBox(3.8, 3.2, len, rotX, 5.8, zEnd + len * 0.5);
      addBox(4.2, 0.45, len, 0xeef2f8, rotX, 7.6, zEnd + len * 0.5);
      addBox(4.4, 0.65, 0.9, 0xfacc15, rotX, 4.1, 43.5);
      addBox(4.4, 0.65, 0.9, 0xfacc15, rotX, 4.1, 56.5);
      addDecal(texH38, 10, 2.8, rotX, 0.11, 50);
      const rot1 = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 7.6, 16), new THREE.MeshStandardMaterial({ color: 0xd8e0ea, roughness: 0.35, metalness: 0.25 }));
      rot1.position.set(rotX, 3.8, rotZ1);
      rot1.castShadow = true;
      this.staticGroup.add(rot1);
      if (rotZ2) {
        const rot2 = rot1.clone();
        rot2.position.z = rotZ2;
        this.staticGroup.add(rot2);
      }
    };
    addPortPier(-44, 21.5, null);
    addPortPier(21, 21.5, null);
    addPortPier(139, 23.5, 13.5);

    // Center-Pier loop roads cross the inner taxilane (z = -62): give way before the taxilane edge.
    // (The old duplicates at (-34,-38) / (-145,-38) sat on top of the service-lane markings — removed.)
    addPriorityStops(20.5, -62, 11);
    addPriorityStops(71.5, -62, 11);
    addDecal(texPriority, 7.2, 7.2, -570, 0.11, 42);

    // 9C. 86.75m Centrair ATC Tower — NORTH-EAST of T1 (Wikipedia: 第1ターミナルの北東) [318..342, 163..187], center (330, 175)
    //     Camera POV sits at [330, 82.5, 172]; FrontSide glass cylinder (r=6.8) lets camera look out unobstructed!
    addBox(24, 10, 24, 0xd2dae4, 330, 5.0, 175);
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 7.2, 68, 16),
      new THREE.MeshStandardMaterial({ color: 0xeef2f7, roughness: 0.38 })
    );
    shaft.position.set(330, 44.0, 175);
    shaft.castShadow = true;
    this.staticGroup.add(shaft);
    const cab = new THREE.Mesh(
      new THREE.CylinderGeometry(8.2, 6.2, 7.2, 12),
      new THREE.MeshPhysicalMaterial({ color: 0x1e4e79, roughness: 0.12, metalness: 0.78, clearcoat: 1.0, side: THREE.FrontSide })
    );
    cab.position.set(330, 81.6, 175);
    this.staticGroup.add(cab);
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 8.8, 2.0, 12),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 })
    );
    cap.position.set(330, 86.2, 175);
    this.staticGroup.add(cap);

    // 9D. Access Plaza, Meitetsu Centrair Station, Airport Hotels & P1/P2 Multi-Storey Car Parks (z = 210..480)
    addBox(120, 15, 76, 0xe2e8f0, 118, 7.5, 255, { roughness: 0.4 });
    addBox(124, 2.0, 80, 0x0284c7, 118, 16.0, 255);
    addBox(28, 11, 80, 0xcbd5e1, 56, 7.5, 215); // Link concourse to T1
    addBox(190, 18, 125, 0xcbd5e1, -15, 9.0, 395); // P1 Multi-Storey Parking
    addBox(190, 18, 125, 0xcbd5e1, 245, 9.0, 395); // P2 Multi-Storey Parking
    addBox(86, 36, 42, 0xdbeafe, -95, 18.0, 260, { map: this.texGlass, roughness: 0.25, metalness: 0.55 }); // Centrair Hotel

    // 9E. South District: Flight of Dreams ([-535..-455, 145..225]), Terminal 2 LCC ([-960..-565, 95..168]), Blast Fence & Aichi Sky Expo!
    addBox(80, 20, 80, 0xf1f5f9, -495, 10.0, 185);
    addBox(84, 2.4, 84, 0x0f172a, -495, 21.2, 185); // Flight of Dreams B787 ZA001 Hall!

    addBox(395, 12.5, 73, 0xe2e8f0, -762.5, 6.25, 131.5);
    addBox(400, 2.0, 76, 0x0284c7, -762.5, 13.5, 131.5);
    [[-590, 36, '71'], [-650, 36, '72'], [-715, 36, '74'], [-785, 36, '76'], [-855, 36, '78'], [-930, 58, '77'], [-890, 58, '80']].forEach(([sx, sz, no]) => {
      addStandMark(sx, sz, no, 0, 34);
    });

    // Official Yellow Jet Blast Caution Boxes (ブラスト注意: training yard -117,-17 + #71 -570,34 + #77 -975,79) & T2 Blast Fence (-1009, 85)
    [[-117, -17, 26, 18], [-570, 34, 38, 22], [-975, 79, 38, 30]].forEach(([bx, bz, bw, bd]) => {
      addBox(bw, 0.05, 0.85, 0xfacc15, bx, 0.10, bz - bd * 0.5);
      addBox(bw, 0.05, 0.85, 0xfacc15, bx, 0.10, bz + bd * 0.5);
      addBox(0.85, 0.05, bd, 0xfacc15, bx - bw * 0.5, 0.10, bz);
      addBox(0.85, 0.05, bd, 0xfacc15, bx + bw * 0.5, 0.10, bz);
      addBox(bw - 1.5, 0.03, bd - 1.5, 0xfacc15, bx, 0.075, bz, { transparent: true, opacity: 0.18 });
      addDecal(texBlast, Math.min(22, bw - 4), 5.8, bx, 0.11, bz);
    });
    addBox(1.8, 6.5, 66, 0x64748b, -1009, 3.25, 85, { metalness: 0.45 }); // T2 Blast Fence!

    // Aichi Sky Expo Exhibition Complex (South Island East side)
    addBox(420, 16, 185, 0xdbe4ef, -850, 8.0, 480);
    addBox(428, 2.2, 192, 0x334155, -850, 17.1, 480);

    // 9F. North District: Airport Fire Station ([465..515, 62..102]), Cargo Sheds 1–3 ([545..1290, 72..155]), Fuel Farm & Coast Guard!
    addBox(50, 10.5, 40, 0xf8fafc, 490, 5.25, 82);
    addBox(52, 1.8, 42, 0xdc2626, 490, 11.4, 82);
    addBox(44, 0.06, 20, 0xdc2626, 490, 0.09, 32, { transparent: true, opacity: 0.28 }); // Red ARFF Emergency Apron Box
    [474, 506].forEach(fx => {
      addBox(0.45, 4.5, 0.45, 0x94a3b8, fx, 2.25, 58);
      const fLamp = new THREE.Mesh(new THREE.SphereGeometry(0.65, 10, 10), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      fLamp.position.set(fx, 4.8, 58);
      this.staticGroup.add(fLamp);
    });

    // North Cargo District (貨物地区): Int'l Cargo Terminals 1–3, domestic sheds, canopies, truck yard, gate
    this._buildNgoCargoDistrict(addBox, addDecal);

    // Jet A-1 Aviation Fuel Farm ([1330..1510, 150..290]) — 8 Cylindrical White Storage Tanks!
    addBox(180, 1.8, 140, 0x94a3b8, 1420, 0.9, 220);
    for (let tx = 1358; tx <= 1484; tx += 42) {
      for (let tz = 185; tz <= 255; tz += 70) {
        const tank = new THREE.Mesh(
          new THREE.CylinderGeometry(15.5, 15.5, 19.5, 20),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.35 })
        );
        tank.position.set(tx, 9.75, tz);
        tank.castShadow = true;
        this.staticGroup.add(tank);
      }
    }

    // Japan Coast Guard Centrair Air Base (海上保安庁 N1–N6: [1620..1820, 68..135])
    addBox(200, 13.5, 67, 0xe2e8f0, 1720, 6.75, 101.5);
    addBox(204, 1.8, 70, 0x0f766e, 1720, 14.4, 101.5);
    [1660, 1730, 1800].forEach((hx, hi) => {
      addStandMark(hx, 18, `N${hi + 1}`, 0, 32);
    });
  }

  initDynamicActors() {
    // 1. Primary Interactive Neighbor Stands: Spot 6 (-68, 10: JAL B738) & Spot 14 (103, 10: ANA B788 — clear of 300m Pier & Spot 14 Rotunda!)
    this.spot6Ac = createFleetAircraft3D('B738', 'JAL');
    this.spot6Ac.position.set(-68, 0, 10);
    this.dynamicGroup.add(this.spot6Ac);

    this.spot14Ac = createFleetAircraft3D('B788', 'ANA');
    this.spot14Ac.position.set(103, 0, 10);
    this.dynamicGroup.add(this.spot14Ac);

    this.spot6Pbb = this.createPbbMesh(-44, -65.9, 21.5, 3.6);
    this.dynamicGroup.add(this.spot6Pbb);
    this.spot14Pbb1 = this.createPbbMesh(139, 106.0, 23.5, 4.4);
    this.spot14Pbb2 = this.createPbbMesh(139, 106.0, 13.5, 4.4);
    this.dynamicGroup.add(this.spot14Pbb1, this.spot14Pbb2);

    const b14a = createGseMesh('lowloader', { wide: true, uldType: 'AKE', deckY: 2.4 });
    b14a.position.set(94.4, 0, 20.0); b14a.rotation.y = Math.PI / 2;
    const b14b = createGseMesh('lowloader', { wide: true, uldType: 'PMC', deckY: 2.4 });
    b14b.position.set(94.4, 0, -3.0); b14b.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(b14a, b14b);
    this.spot14Gse = [b14a, b14b];

    // 1B. Scale-Authentic Parked Fleet Across the 4.37km Island (T1 Wings, 300m Center Pier, T2 LCC, Remote #200/#300 & North Cargo #103/#109!)
    this.parkedFleetGroup = new THREE.Group();
    if (!this.compact) {
      [
        { prof: 'B738', liveryId: 'ANA', x: 360, z: 12, yaw: 0 },              // T1 North Domestic #3
        { prof: 'B788', liveryId: 'ANA', x: 104, z: -95, yaw: -Math.PI / 2 },  // 300m Center Pier #9 (clear of Pier wall x=64!)
        { prof: 'B788', liveryId: 'JAL', x: -14, z: -152, yaw: Math.PI / 2 },  // 300m Center Pier #13 (clear of Pier wall x=28!)
        { prof: 'B788', liveryId: 'JAL', x: -265, z: 12, yaw: 0 },             // T1 South International #19
        { prof: 'A320', liveryId: 'ANA', x: -345, z: 12, yaw: 0 },             // T1 South International #22
        { prof: 'A320', liveryId: 'ANA', x: -650, z: 20, yaw: 0 },             // T2 LCC #72
        { prof: 'B738', liveryId: 'JAL', x: -785, z: 20, yaw: 0 },             // T2 LCC #76
        { prof: 'B738', liveryId: 'ANA', x: 315, z: -135, yaw: 0 },            // North Remote #203
        { prof: 'A320', liveryId: 'JAL', x: -380, z: -135, yaw: 0 },           // South Remote #303
        { prof: 'B77F', liveryId: 'ANA', x: 665, z: 4, yaw: 0 },               // North Cargo #103 (B777F Freighter!)
        { prof: 'B77F', liveryId: 'ANA', x: 990, z: 4, yaw: 0 }                // North Cargo #109 (B777F Freighter!)
      ].forEach(cfg => {
        const p = AIRCRAFT_PROFILES[cfg.prof] || AIRCRAFT_PROFILES.A320;
        const ac = createFleetAircraft3D(cfg.prof, cfg.liveryId, p.visual3d);
        ac.position.set(cfg.x, 0, cfg.z);
        ac.rotation.y = cfg.yaw;
        this.parkedFleetGroup.add(ac);
      });
    }
    this.dynamicGroup.add(this.parkedFleetGroup);

    // 2. Spot 7 Interactive PBB (Rotunda at x = 21) + Full Textbook GSE Fleet!
    this.spot7Pbb = this.createPbbMesh(21, 2.1, 21.5, 3.6);
    this.spot7Pbb.userData.interact = { type: 'pbb', label: 'PBB Dock / Retract' };
    this.dynamicGroup.add(this.spot7Pbb);

    this.spot7Loader = createGseMesh('lowloader', { uldType: 'AKH', deckY: 2.05 });
    this.spot7Loader.position.set(-6.4, 0, 18.5);
    this.spot7Loader.rotation.y = Math.PI / 2;
    this.spot7Loader.userData.interact = { type: 'loader', label: 'High-Lift Loader & ULD' };
    this.dynamicGroup.add(this.spot7Loader);

    this.spot7DollyTrain = buildTurnaroundGseMesh('dolly_train', 1.0);
    this.spot7DollyTrain.position.set(-13.2, 0, 18.0);
    this.dynamicGroup.add(this.spot7DollyTrain);

    this.spot7Belt = buildTurnaroundGseMesh('belt', 2.15);
    this.spot7Belt.position.set(-5.8, 0, -6.2);
    this.spot7Belt.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Belt);

    this.spot7BeltTractor = buildTurnaroundGseMesh('dolly_train', 1.0);
    this.spot7BeltTractor.position.set(-12.2, 0, -6.8);
    this.dynamicGroup.add(this.spot7BeltTractor);

    this.spot7Gpu = buildTurnaroundGseMesh('gpu', 1.55);
    this.spot7Gpu.position.set(-5.4, 0, 26.2);
    this.spot7Gpu.rotation.y = Math.PI * 0.35;
    this.dynamicGroup.add(this.spot7Gpu);

    this.spot7Catering = buildTurnaroundGseMesh('catering', 3.35);
    this.spot7Catering.position.set(-5.8, 0, 23.2);
    this.spot7Catering.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Catering);

    this.spot7Hydrant = buildTurnaroundGseMesh('fuel', 2.65);
    this.spot7Hydrant.position.set(-10.5, 0, 8.8);
    this.spot7Hydrant.rotation.y = 0;
    this.dynamicGroup.add(this.spot7Hydrant);

    this.spot7Lav = buildTurnaroundGseMesh('lav', 2.15);
    this.spot7Lav.position.set(-5.4, 0, -10.2);
    this.spot7Lav.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Lav);

    this.spot7Water = buildTurnaroundGseMesh('water', 2.15);
    this.spot7Water.position.set(5.6, 0, -7.8);
    this.spot7Water.rotation.y = -Math.PI / 2;
    this.dynamicGroup.add(this.spot7Water);

    this.spot7Tug = buildTurnaroundGseMesh('tug', 0.6);
    this.spot7Tug.position.set(14.5, 0, 35.5);
    this.spot7Tug.rotation.y = -Math.PI / 2;
    this.dynamicGroup.add(this.spot7Tug);

    this.deiceTruck = createGseMesh('deice');
    this.deiceTruck.position.set(-20, 0, 5);
    this.dynamicGroup.add(this.deiceTruck);

    // Chocks & Safety Cones
    this.chocksGroup = new THREE.Group();
    const chMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
    [[0, 24.0], [-3.4, 8.8], [3.4, 8.8]].forEach(([x, z]) => {
      const c = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.42, 0.5), chMat);
      c.position.set(x, 0.21, z);
      this.chocksGroup.add(c);
    });
    this.chocksGroup.userData.interact = { type: 'chocks', label: 'Wheel Chocks' };
    this.dynamicGroup.add(this.chocksGroup);

    this.conesGroup = new THREE.Group();
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0x431407, roughness: 0.4 });
    [[0, 31], [-20, 6], [20, 6], [-6.5, 16], [6.5, 16]].forEach(([x, z]) => {
      const cn = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.15, 10), coneMat);
      cn.position.set(x, 0.58, z);
      this.conesGroup.add(cn);
    });
    this.dynamicGroup.add(this.conesGroup);

    // 3 Interactive Glowing 3D FOD Objects
    this.fodMeshes = {};
    [
      { id: 'F1', x: -5.5, z: 24.5 },
      { id: 'F2', x: -13.0, z: 12.0 },
      { id: 'F3', x: 7.5, z: -2.0 }
    ].forEach(fd => {
      const grp = new THREE.Group();
      grp.position.set(fd.x, 0.35, fd.z);
      const box = new THREE.Mesh(new THREE.OctahedronGeometry(0.55), new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.35, 20).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide }));
      ring.position.y = -0.25;
      grp.add(box, ring);
      grp.userData.interact = { type: 'fod', id: fd.id };
      this.dynamicGroup.add(grp);
      this.fodMeshes[fd.id] = grp;
    });

    this.tipRing = new THREE.Mesh(
      new THREE.RingGeometry(3.2, 5.2, 28).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.72, side: THREE.DoubleSide })
    );
    this.tipRing.position.set(0, 0.16, -10.5);
    this.tipRing.visible = false;
    this.dynamicGroup.add(this.tipRing);

    // 86.75m Chubu ATC Tower Rotating Surface-Movement Radar Bar
    this.radarBar = new THREE.Mesh(new THREE.BoxGeometry(7.2, 1.1, 0.9), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 }));
    this.radarBar.position.set(330, 88.2, 175);
    this.dynamicGroup.add(this.radarBar);

    // 3. SYNCHRONIZED MULTI-LANE AIRSIDE, FLIGHT & SKYWAY TRAFFIC ACTORS!
    this.trafficGroup = new THREE.Group();
    this.dynamicGroup.add(this.trafficGroup);
    if (!this.compact) {
      const addT = (key, mesh) => {
        this.trafficGroup.add(mesh);
        this.trafficActors[key] = mesh;
        return mesh;
      };
      // Airliner Traffic: A-TWY Widebody (JAL B788), C-TWY Narrowbody (ANA A320), & Ise Bay Parallel Approach Jet!
      addT('twyAJet', createFleetAircraft3D('B788', 'JAL'));
      addT('twyCJet', createFleetAircraft3D('A320', 'ANA'));
      addT('bayJet', createFleetAircraft3D('B738', 'ANA'));

      // 2.8km GSE Spine Road Multi-Lane Left-Hand Traffic (z = 52.6 Eastbound +X & z = 47.4 Westbound -X)
      addT('spineBusE1', createGseMesh('ramp_bus', { accent: 0x1b4f9c }));
      addT('spineBusE2', createGseMesh('ramp_bus', { accent: 0x0284c7 }));
      addT('spineDollyE1', buildTurnaroundGseMesh('dolly_train', 1.0));
      addT('spineDollyE2', buildTurnaroundGseMesh('dolly_train', 1.0, { uldCode: 'AKE' }));
      addT('spineCatE', buildTurnaroundGseMesh('catering', 3.2));

      addT('spineBusW1', createGseMesh('ramp_bus', { accent: 0xdc2626 }));
      addT('spineFuelW', buildTurnaroundGseMesh('fuel', 2.5));
      addT('spineDollyW1', buildTurnaroundGseMesh('dolly_train', 1.0, { uldCode: 'PMC' }));
      addT('spineDollyW2', buildTurnaroundGseMesh('dolly_train', 1.0));

      // Behind-Stand Road (z = -38) GSE Convoy — Obeys Spotter Hold during Spot 7 Pushback!
      addT('behindDolly1', buildTurnaroundGseMesh('dolly_train', 1.0));
      addT('behindTractor2', createGseMesh('tractor'));

      // 8.5km West Seawall Perimeter Road Patrol SUV (黄パト z = -685, 40 km/h)
      addT('perimPatrol', createGseMesh('patrol_suv'));

      // Centrair Skyway Bridge & Meitetsu Airport Line 2000-Series "μ-SKY" 4-Car Express Train (x = 134, z = 280..2800)!
      addT('muSkyTrain', createGseMesh('musky_train'));
      addT('skywayBusIn', createGseMesh('ramp_bus', { accent: 0x0f766e }));
      addT('skywayBusOut', createGseMesh('ramp_bus', { accent: 0x1d4ed8 }));
    }

    // 4. Player Drivable Open-Cab TT + All Dolly Type Pools (AKE / AKH / PMC / Bulk) + Interactive World Dolly Staging!
    this.playerVeh = createOpenCabTowingTractor3D();
    this.dynamicGroup.add(this.playerVeh);
    this.towedCartPools = {};
    ['ake', 'akh', 'pmc', 'bulk'].forEach(dt => {
      this.towedCartPools[dt] = [];
      for (let ci = 0; ci < 6; ci++) {
        const cart = createDollyUnit3D(dt, ci);
        cart.visible = false;
        this.dynamicGroup.add(cart);
        this.towedCartPools[dt].push(cart);
      }
    });
    this.towedCarts = this.towedCartPools.ake;

    // Interactive World Dolly Staging Groups (parked in GSE/Cargo bays — TT can drive up & Couple/Uncouple!)
    this.worldDollyMeshes = {};
    const dollyStageGrp = new THREE.Group();
    this.dynamicGroup.add(dollyStageGrp);
    this.worldDollyGroup = dollyStageGrp;

    const semi = new THREE.Group();
    const chassis = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 0.34, 6.2),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.45 })
    );
    chassis.position.set(0, 0.62, 0);
    chassis.castShadow = true;
    semi.add(chassis);
    [-1.16, 1.16].forEach(rx => {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.32, 6.1),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 })
      );
      rail.position.set(rx, 0.92, 0);
      semi.add(rail);
    });
    [-1.4, 1.4].forEach(uz => {
      const uld = new THREE.Mesh(
        new THREE.BoxGeometry(2.05, 1.65, 2.45),
        new THREE.MeshStandardMaterial({ color: 0xdbe4ef, roughness: 0.32, metalness: 0.52 })
      );
      uld.position.set(0, 1.62, uz);
      uld.castShadow = true;
      semi.add(uld);
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(2.09, 0.24, 2.47),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35 })
      );
      stripe.position.set(0, 1.85, uz);
      semi.add(stripe);
    });
    const tongue = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.16, 1.7),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 })
    );
    tongue.position.set(0, 0.56, 3.65);
    semi.add(tongue);
    const wMat = new THREE.MeshStandardMaterial({ color: 0x16191f, roughness: 0.9 });
    [-2.3, -1.25].forEach(wz => {
      [-1.12, 1.12].forEach(wx => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.28, 12), wMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(wx, 0.42, wz);
        semi.add(w);
      });
    });
    [-0.95, 0.95].forEach(lx => {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.1), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      lamp.position.set(lx, 0.72, -3.14);
      semi.add(lamp);
    });
    semi.visible = false;
    this.longSemiTrailer = semi;
    this.dynamicGroup.add(semi);

    // BAY 01 Semi-Trailer Reverse Practice Dock at (218, 26) — matches airport3dModule.js!
    const bayGrp = new THREE.Group();
    bayGrp.position.set(218, 0.14, 26);
    const bayLen = 11.4, bayW = 5.0;
    const bayBorderMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -5
    });
    this.backingBayBorderMat = bayBorderMat;
    const bayPad = new THREE.Mesh(
      new THREE.PlaneGeometry(bayLen, bayW),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 })
    );
    bayPad.rotation.x = -Math.PI / 2;
    bayGrp.add(bayPad);
    const baySign = new THREE.Mesh(
      new THREE.PlaneGeometry(7.2, 2.6),
      new THREE.MeshBasicMaterial({ map: makeRoadMarkingTexture('BAY 01 · DOCK', '#1E293B', '#FACC15', '#FACC15'), depthWrite: false, polygonOffset: true, polygonOffsetFactor: -6 })
    );
    baySign.rotation.x = -Math.PI / 2;
    baySign.position.set(0.4, 0.03, 0);
    bayGrp.add(baySign);
    const addBayLine = (w, d, x, z) => {
      const l = new THREE.Mesh(new THREE.PlaneGeometry(w, d), bayBorderMat);
      l.rotation.x = -Math.PI / 2;
      l.position.set(x, 0.04, z);
      bayGrp.add(l);
    };
    addBayLine(bayLen, 0.34, 0, -bayW * 0.5);
    addBayLine(bayLen, 0.34, 0, bayW * 0.5);
    addBayLine(0.38, bayW + 0.34, bayLen * 0.5, 0);
    const dockWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 1.25, bayW + 0.8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 })
    );
    dockWall.position.set(bayLen * 0.5 + 0.45, 0.62, 0);
    dockWall.castShadow = true;
    bayGrp.add(dockWall);
    const bayConeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
    const bayConeRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [
      [-5.6, -2.65], [-2.8, -2.65], [0, -2.65], [2.8, -2.65], [5.4, -2.65],
      [-5.6, 2.65], [-2.8, 2.65], [0, 2.65], [2.8, 2.65], [5.4, 2.65]
    ].forEach(([cx, cz]) => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.95, 10), bayConeMat);
      cone.position.set(cx, 0.48, cz);
      cone.castShadow = true;
      bayGrp.add(cone);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.16, 10), bayConeRingMat);
      band.position.set(cx, 0.58, cz);
      bayGrp.add(band);
    });
    bayGrp.visible = false;
    this.backingBayGroup = bayGrp;
    this.dynamicGroup.add(bayGrp);

    // 5. Full Articulated 3D Ground Crew Team + 3 Safety Spotters!
    this.crewMarshaller = createArticulatedCrew3D('marshaller');
    this.crewMarshaller.position.set(0, 0, 33.0);
    this.crewMarshaller.rotation.y = Math.PI;
    this.dynamicGroup.add(this.crewMarshaller);

    this.crewWingL = createArticulatedCrew3D('watchman');
    this.crewWingL.position.set(22.2, 0, 8.5);
    this.crewWingL.rotation.y = Math.PI;
    this.dynamicGroup.add(this.crewWingL);

    this.crewWingR = createArticulatedCrew3D('watchman');
    this.crewWingR.position.set(-22.2, 0, 8.5);
    this.crewWingR.rotation.y = Math.PI;
    this.dynamicGroup.add(this.crewWingR);

    this.crewHeadset = createArticulatedCrew3D('headset');
    this.crewHeadset.position.set(-4.6, 0, 24.5);
    this.crewHeadset.rotation.y = Math.PI * 0.75;
    this.dynamicGroup.add(this.crewHeadset);

    this.crewLoadmaster = createArticulatedCrew3D('loadmaster');
    this.crewLoadmaster.position.set(-12.5, 0, 14.0);
    this.crewLoadmaster.rotation.y = Math.PI * 0.45;
    this.dynamicGroup.add(this.crewLoadmaster);

    this.crewFueler = createArticulatedCrew3D('fueler');
    this.crewFueler.position.set(-13.5, 0, 9.5);
    this.crewFueler.rotation.y = Math.PI * 0.45;
    this.dynamicGroup.add(this.crewFueler);

    this.spotterPushback = createArticulatedCrew3D('spotter');
    this.spotterPushback.position.set(-19, 0, -35.5);
    this.spotterPushback.rotation.y = -Math.PI / 2;
    this.dynamicGroup.add(this.spotterPushback);

    this.spotterService = createArticulatedCrew3D('spotter');
    this.spotterService.position.set(-22.5, 0, -40.5);
    this.spotterService.rotation.y = 0;
    this.dynamicGroup.add(this.spotterService);

    this.spotterBlast = createArticulatedCrew3D('spotter');
    this.spotterBlast.position.set(-103, 0, -24);
    this.spotterBlast.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spotterBlast);

    this.jetBlastCone = new THREE.Group();
    this.jetBlastCone.visible = false;
    this.dynamicGroup.add(this.jetBlastCone);

    this.impactRing = new THREE.Mesh(
      new THREE.RingGeometry(0.8, 3.2, 24).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.88, side: THREE.DoubleSide })
    );
    this.impactRing.position.y = 0.25;
    this.impactRing.visible = false;
    this.dynamicGroup.add(this.impactRing);

    // Volumetric Clouds across the 4.37km Island & Ise Bay
    this.cloudGroup = new THREE.Group();
    // Soft high cumulus (unlit, semi-transparent) — no dark grey blobs floating in POV shots
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false });
    A3D_CLOUDS.forEach((cl, ci) => {
      const cGrp = new THREE.Group();
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(cl.sx * 0.34, 10, 8), cloudMat);
      s1.scale.set(1.6, 0.38, 0.85);
      const s2 = s1.clone(); s2.position.set(-cl.sx * 0.25, 4.5, 8); s2.scale.set(1.1, 0.35, 0.7);
      const s3 = s1.clone(); s3.position.set(cl.sx * 0.24, 3.2, -6); s3.scale.set(1.0, 0.32, 0.65);
      cGrp.add(s1, s2, s3);
      cGrp.position.set(cl.x, cl.y + 650 + (ci % 2) * 60, cl.z);
      cGrp.scale.set(1.6, 0.7, 1.6);
      cGrp.userData = { base: cl };
      this.cloudGroup.add(cGrp);
    });
    this.dynamicGroup.add(this.cloudGroup);

    this.setActiveFleetAircraft('A320');
  }

  // Image-based lighting shared by every 3D scene (src/three3d/envLighting.js)
  _updateEnvironment(key) {
    if (this.envKey === key) return;
    this.envKey = key;
    applySkyEnvironment(this.renderer, this.scene, key);
  }

  _buildNgoCargoDistrict(addBox, addDecal) {
    const grp = new THREE.Group();
    grp.name = 'ngo_cargo_district';
    this.staticGroup.add(grp);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xe4e9ef, roughness: 0.62, metalness: 0.18, emissive: 0x1d232b });
    const panelMat = new THREE.MeshStandardMaterial({ color: 0xcfd7e1, roughness: 0.55, metalness: 0.3 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x8e9aab, roughness: 0.5, metalness: 0.45 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x3a4555, roughness: 0.7, metalness: 0.35 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x5b87b5, roughness: 0.15, metalness: 0.6 });
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xf3f5f8, roughness: 0.45, metalness: 0.35, side: THREE.DoubleSide });
    const box = (w, h, d, m, x, y, z, parent = grp) => {
      const me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      me.position.set(x, y, z);
      me.castShadow = h > 1;
      me.receiveShadow = true;
      parent.add(me);
      return me;
    };
    const sign = (text1, text2, w, x, y, z, rotY) => {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 192;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#0b2e59'; ctx.fillRect(0, 0, 1024, 192);
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = '800 74px "Hiragino Sans", "Noto Sans JP", "Yu Gothic", sans-serif';
      ctx.fillText(text1, 512, 70);
      ctx.font = '700 40px "Be Vietnam Pro", "Helvetica Neue", Arial, sans-serif';
      ctx.fillText(text2, 512, 150);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * 0.1875), new THREE.MeshBasicMaterial({ map: tex }));
      m.position.set(x, y, z);
      m.rotation.y = rotY;
      grp.add(m);
    };

    NGO_CARGO_DISTRICT.forEach(b => {
      const w = b.x2 - b.x1, d = b.z2 - b.z1, cx = (b.x1 + b.x2) / 2, cz = (b.z1 + b.z2) / 2;
      if (b.kind === 'truckyard') {
        // Painted truck bays + parked 10t trucks
        addBox(w, 0.05, d, 0x5b6472, cx, 0.07, cz, { roughness: 0.85 });
        for (let x = b.x1 + 8; x < b.x2 - 4; x += 6.5) addBox(0.25, 0.04, 15, 0xf8fafc, x, 0.1, b.z1 + 10);
        for (let x = b.x1 + 8; x < b.x2 - 4; x += 6.5) addBox(0.25, 0.04, 15, 0xf8fafc, x, 0.1, b.z2 - 10);
        if (!this.compact) {
          for (let i = 0; i < 10; i++) {
            const tr = buildGse('cargo_truck');
            tr.position.set(b.x1 + 11.25 + i * 6.5 * 4, 0, i % 2 ? b.z2 - 10 : b.z1 + 10);
            tr.rotation.y = i % 2 ? 0 : Math.PI;
            if (tr.position.x < b.x2 - 6) grp.add(tr);
          }
        }
        sign('トラック待機場', 'TRUCK WAITING AREA', 26, cx, 6.5, b.z2 + 1, 0);
        return;
      }
      if (b.kind === 'gate') {
        box(w, b.h, 8, wallMat, cx, b.h / 2, cz);
        box(w + 2, 0.6, 12, roofMat, cx, b.h + 0.3, cz);
        const bar = box(14, 0.18, 0.18, new THREE.MeshStandardMaterial({ color: 0xef4444 }), cx - 20, 1.1, cz + 2);
        bar.castShadow = false;
        addBox(14, 0.05, 0.3, 0xf8fafc, cx - 20, 0.1, cz + 6);
        sign('北ゲート', 'NORTH GATE · CARGO AREA', 12, cx, b.h + 2.2, cz + 6.2, 0);
        return;
      }
      // Building body (2-storey steel shed with ribbed cladding)
      box(w, b.h, d, wallMat, cx, b.h / 2, cz);
      box(w + 0.6, 0.9, d + 0.6, roofMat, cx, b.h + 0.45, cz);
      for (let x = b.x1 + 6; x < b.x2 - 3; x += 6) {
        box(0.35, b.h - 1, 0.25, panelMat, x, (b.h - 1) / 2, b.z1 - 0.15); // airside ribs
      }
      if (b.kind === 'office') {
        for (let fl = 0; fl < 4; fl++) box(w - 2, 1.6, 0.2, glassMat, cx, 3 + fl * 4.4, b.z1 - 0.12);
        sign('貨物事務棟', 'CARGO OFFICE · LAWSON 1F', 30, cx, b.h + 3.2, b.z2 + 0.6, 0);
        return;
      }
      // Airside roll-up doors (ULD in/out) every ~12m + apron-side sign
      const nDoors = Math.max(1, Math.floor((w - 10) / 12));
      for (let i = 0; i < nDoors; i++) {
        const dx = b.x1 + 8 + i * ((w - 16) / Math.max(1, nDoors - 1 || 1));
        box(7.5, 6.0, 0.3, doorMat, nDoors === 1 ? cx : dx, 3.0, b.z1 - 0.2);
      }
      sign(b.ja, b.sign, Math.min(60, w * 0.55), cx, b.h - 2.6, b.z1 - 0.45, Math.PI);
      if (b.canopy) {
        // 20m landside canopy (庇) sheltering 10t trucks at the docks
        box(w - 4, 0.45, 20, canopyMat, cx, 7.2, b.z2 + 10);
        for (let x = b.x1 + 6; x <= b.x2 - 6; x += 18) box(0.5, 7.0, 0.5, panelMat, x, 3.5, b.z2 + 19.5);
        // dock doors + trucks backed in
        for (let x = b.x1 + 8; x < b.x2 - 6; x += 8) box(3.2, 3.6, 0.25, doorMat, x, 2.8, b.z2 + 0.15);
        if (!this.compact) {
          for (let x = b.x1 + 16, n = 0; x < b.x2 - 10 && n < 6; x += 32, n++) {
            const tr = buildGse('cargo_truck');
            tr.position.set(x, 0, b.z2 + 7.2);
            tr.rotation.y = 0; // cab faces landside (+Z), box at the dock door
            grp.add(tr);
          }
        }
        sign(b.ja, b.sign, Math.min(60, w * 0.55), cx, b.h - 2.6, b.z2 + 0.45, 0);
      }
      // Airside build-up / staging lane: ULD dollies (AKE & PMC), forklifts
      if (!this.compact && (b.kind === 'intl' || b.kind === 'dom')) {
        const n = Math.min(10, Math.floor(w / 14));
        for (let i = 0; i < n; i++) {
          const code = i % 3 === 0 ? 'PMC' : 'AKE';
          const dl = buildGse('uld_dolly', 0.5, { uldCode: code });
          dl.position.set(b.x1 + 8 + i * ((w - 16) / Math.max(1, n - 1)), 0, b.z1 - 9);
          grp.add(dl);
        }
        const fl = buildGse('forklift');
        fl.position.set(cx + 6, 0, b.z1 - 3.5);
        fl.rotation.y = Math.PI;
        grp.add(fl);
      }
      // Yellow airside/landside boundary line in front of each shed
      addBox(w, 0.04, 0.35, 0xfacc15, cx, 0.1, b.z1 - 16);
    });

    // 無ナンバー車両通行帯 — unregistered-vehicle lane to the Aichi Logistics District (forwarder sheds)
    addBox(9, 0.05, 150, 0x4a5568, 1250, 0.07, 230, { roughness: 0.85 });
    for (let z = 160; z < 305; z += 12) addBox(0.3, 0.04, 6, 0xf8fafc, 1250, 0.1, z);
    if (addDecal) {
      const tex = makeRoadMarkingTexture('無ナンバー車両通行帯', '#4a5568', '#ffffff');
      addDecal(tex, 8.5, 2.6, 1250, 0.12, 200, Math.PI / 2);
    }
    sign('至 愛知県企業庁総合物流地区', 'TO AICHI LOGISTICS DISTRICT (FORWARDERS)', 22, 1250, 7, 300, 0);
    // A freighter being worked at #103: main-deck loader at the aft port main-deck door + ULD dolly train
    if (!this.compact) {
      const mdl = buildGse('mdl', 5.3);
      mdl.position.set(673.6, 0, -6.5);
      mdl.rotation.y = -Math.PI / 2;
      grp.add(mdl);
      const train = buildGse('dolly_train', 1.0, { uldCode: 'PMC' });
      train.position.set(690, 0, -6.5);
      train.rotation.y = -Math.PI / 2;
      grp.add(train);
    }
  }

  createPbbMesh(rotX, doorX, doorZ, doorH) {
    const grp = new THREE.Group();
    grp.userData = { rotX, doorX, doorZ, doorH };
    const tube = new THREE.Mesh(new THREE.BoxGeometry(1, 2.7, 2.6), this.glassMat);
    tube.castShadow = true;
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.95, 2.75), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 }));
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, doorH, 10), new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5 }));
    grp.add(tube, canopy, leg);
    grp.userData.tube = tube;
    grp.userData.canopy = canopy;
    grp.userData.leg = leg;
    this.updatePbbExt(grp, 1.0);
    return grp;
  }

  updatePbbExt(grp, ext) {
    const { rotX, doorX, doorZ, doorH, tube, canopy, leg } = grp.userData;
    const tipX = rotX - (rotX - doorX) * (0.28 + 0.72 * Math.max(0, Math.min(1, ext)));
    const len = Math.max(4.5, Math.abs(rotX - tipX));
    const midX = (rotX + tipX) * 0.5;
    tube.scale.x = len;
    tube.position.set(midX, doorH + 1.35, doorZ);
    canopy.position.set(tipX + 0.45, doorH + 1.42, doorZ);
    leg.position.set(tipX + 2.2, doorH * 0.5, doorZ);
  }

  setActiveFleetAircraft(acId, liveryId = 'ANA') {
    const key = `${acId}_${liveryId}`;
    if (this.builtFleetId === key && this.activeAc) return;
    if (this.activeAc) this.dynamicGroup.remove(this.activeAc);
    this.builtFleetId = key;
    // Unified pipeline: every jet uses the same sculpted GLB + livery shader (only DHC8 turboprop is procedural)
    this.activeAc = createFleetAircraft3D(acId, liveryId);
    const spec = this.activeAc.userData.spec || AIRCRAFT_3D_SPECS.A320;
    // Every type is 1:1. Spot 7's centreline (NGO_STAND7_X) leaves ≥ 6 m wingtip clearance to the Centre
    // Pier wall (x = 28.75) even for a 65 m-span B777-300ER; only a hypothetical > 77 m span would be fitted.
    const s = Math.min(1, (28.75 - 6.0 - NGO_STAND7_X) / (spec.wingspanM * 0.5));
    this.activeAc.scale.setScalar(s);
    this.activeAcScale = s;
    // Stop-bar logic: the flight pose is the A320's reference point; every other type is shifted along its
    // own axis so its NOSE GEAR stops on the same yellow T (longer jets extend aft toward the taxilane,
    // exactly like real type-specific stop bars) and follows the lead-in line with its nose gear.
    const refNG = (AIRCRAFT_3D_SPECS.A320 || spec).attachPoints.noseGear.z;
    this.acRefOff = refNG - spec.attachPoints.noseGear.z * s;
    this.activeBlastZone = createJetBlastHazardZone3D(spec);
    this.activeBlastZone.visible = false;
    this.activeAc.add(this.activeBlastZone);
    this.activeAc.position.set(NGO_STAND7_X, 0, 10 + this.acRefOff);
    this.dynamicGroup.add(this.activeAc);
    this._computeSpot7Layout(spec, s);
  }

  // All Spot 7 GSE / crew / chock / cone / PBB positions derived from the active aircraft's real door
  // attach points → every vehicle docks at the correct door for EVERY aircraft type.
  _computeSpot7Layout(spec, s) {
    const ap = spec.attachPoints;
    const Z0 = 10 + (this.acRefOff || 0);
    const X0 = NGO_STAND7_X;
    const r = spec.fuseRadius * s;
    const W = id => Z0 + ap[id].z * s;
    const noseZ = Z0 + spec.lengthM * 0.5 * s;
    const tailZ = Z0 - spec.lengthM * 0.5 * s;
    const halfSpan = spec.wingspanM * 0.5 * s;
    const isBeltOnly = spec.gseCargoType === 'belt';
    const beltDoor = isBeltOnly ? 'cargoFwd' : 'bulkDoor';
    const L = {
      s, r, noseZ, tailZ, halfSpan, isBeltOnly, x0: X0,
      noseGearZ: W('noseGear'),
      mainGearZ: Z0 + spec.mainGearZOffset * s,
      mainGearX: spec.mainGearTrackX * s,
      loader: { x: X0 - r - 4.05, z: W('cargoFwd') },
      belt: { x: X0 - r - 4.0, z: W(beltDoor) },
      gpu: { x: X0 - r - 3.4, z: W('gpuPort') },
      cat: { x: X0 - r - 3.75, z: W('doorR1') },
      fuel: { x: X0 + ap.fuelPort.dockX * s, z: W('fuelPort') },
      lav: { x: X0 - r - 2.9, z: W('lavPort') },
      water: { x: X0 + r + 2.9, z: W('waterPort') },
      tugCoupleZ: W('noseGear') + 7.1,
      doorL1: { x: X0 + r + 0.25, z: W('doorL1'), h: ap.doorL1.y * s - 1.25 },
      cargoSill: ap.cargoFwd.y * s
    };
    L.loaderStandby = { x: L.loader.x - 12.5, z: L.loader.z + 3.5 };
    L.dolly = { x: L.loader.x - 6.8, z: L.loader.z - 0.5 };
    L.beltStandby = { x: L.belt.x - 12.0, z: L.belt.z - 4.3 };
    L.beltTractor = { x: L.belt.x - 6.2, z: L.belt.z - 0.6 };
    L.gpuStandby = { x: X0 - r - 15.5, z: noseZ + 6.5 };
    L.catStandby = { x: X0 - r - 16.5, z: L.cat.z + 7.5 };
    L.fuelStandby = { x: L.fuel.x - 8.0, z: L.fuel.z - 26 };
    L.lavStandby = { x: L.lav.x - 10, z: L.lav.z - 8 };
    L.waterStandby = { x: L.water.x + 11, z: L.water.z - 7 };
    L.tugStandby = { x: X0 + r + 12.5, z: noseZ + 8 };
    this.spot7Layout = L;

    // Type-specific nose-wheel stop bar (yellow "T") on the Spot 7 lead-in line — the marshaller drill target
    if (!this.spot7StopBar) {
      const m = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const g = new THREE.Group();
      const bar = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.05, 0.45), m);
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 2.2), m);
      stem.position.z = -1.1;
      g.add(bar, stem);
      g.position.y = 0.13;
      this.dynamicGroup.add(g);
      this.spot7StopBar = g;
    }
    this.spot7StopBar.position.set(X0, 0.13, L.noseGearZ);

    // Chocks: nose gear fore/aft + both main gears
    if (this.chocksGroup) {
      const ch = this.chocksGroup.children;
      const pts = [[X0, L.noseGearZ + 0.85], [X0 - L.mainGearX, L.mainGearZ + 1.1], [X0 + L.mainGearX, L.mainGearZ + 1.1]];
      ch.forEach((c, i) => { if (pts[i]) c.position.set(pts[i][0], 0.21, pts[i][1]); });
    }
    // Cones: nose, both wingtips, both engine intakes
    if (this.conesGroup) {
      const eX = spec.engineSpanX * s, eZ = Z0 + (spec.engineZOffset + 3.2) * s;
      const tipZ = L.mainGearZ - 3.0 * s;
      const pts = [[X0, noseZ + 2.5], [X0 - (halfSpan + 1.0), tipZ], [X0 + halfSpan + 1.0, tipZ], [X0 - eX, eZ], [X0 + eX, eZ]];
      this.conesGroup.children.forEach((c, i) => { if (pts[i]) c.position.set(pts[i][0], 0.58, pts[i][1]); });
    }
    // PBB docks the real door L1 (port side)
    if (this.spot7Pbb) {
      const ud = this.spot7Pbb.userData;
      ud.doorX = L.doorL1.x; ud.doorZ = L.doorL1.z; ud.doorH = Math.max(2.4, L.doorL1.h);
      if (ud.leg) { ud.leg.scale.y = ud.doorH / 3.6; }
      this.updatePbbExt(this.spot7Pbb, 1.0);
    }
  }

  handlePointerHover(e) {
    if (!this.onInteract || this.compact) return;
    const hit = this.raycastInteractive(e);
    this.canvas.style.cursor = hit ? 'pointer' : 'grab';
  }

  handlePointerClick(e) {
    if (!this.onInteract || this.compact) return;
    const hit = this.raycastInteractive(e);
    if (hit) this.onInteract(hit);
  }

  raycastInteractive(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const targets = [
      ...Object.values(this.fodMeshes).filter(m => m.visible),
      this.spot7Pbb,
      this.spot7Loader,
      this.chocksGroup
    ];
    const hits = this.raycaster.intersectObjects(targets, true);
    if (!hits.length) return null;
    let obj = hits[0].object;
    while (obj && !obj.userData.interact) obj = obj.parent;
    return obj ? obj.userData.interact : null;
  }

  // =========================================================================
  // SYNCHRONIZED MULTI-LANE AIRSIDE, TAXIWAY, PERIMETER & SKYWAY TRAFFIC
  // =========================================================================
  _updateAirportTraffic(state, isFlight, flightPose, tSec) {
    if (this.compact || !this.trafficGroup) return;
    const show = state.gfxQuality !== 'low';
    this.trafficGroup.visible = show;
    if (this.parkedFleetGroup) this.parkedFleetGroup.visible = show;
    if (!show) return;

    const tr = this.trafficActors;
    const aiT = state.aiTime || tSec;
    // Note: createDetailedAirliner3D faces +Z at rotY=0 -> +X (North) = Math.PI/2, -X (South) = -Math.PI/2
    const activeCrossingA6 = isFlight && (state.flightPhaseIdx === 0 || state.flightPhaseIdx === 1);
    const activeOnCTwy = isFlight && (state.flightPhaseIdx === 1 || state.flightPhaseIdx === 8);

    // 1. A-TWY (z = -415): JAL B788 taxiing Northbound (-1550 -> +1550m), holds short of A6 (x = +110m) if JP102 is landing/vacating!
    if (tr.twyAJet) {
      let xA = -1550 + ((aiT * 13.5) % 3100);
      if (activeCrossingA6 && xA > 20 && xA < 220) xA = 20;
      tr.twyAJet.position.set(xA, 0, -415);
      tr.twyAJet.rotation.y = Math.PI / 2;
    }

    // 2. C-TWY (z = -235): ANA A320 taxiing Southbound (+1180 -> -980m toward T2 LCC), holds clear of x = 0..280m when JP102 uses C-TWY!
    if (tr.twyCJet) {
      let xC = 1180 - ((aiT * 11.2 + 540) % 2160);
      if (activeOnCTwy && xC > -40 && xC < 310) xC = 310;
      tr.twyCJet.position.set(xC, 0, -235);
      tr.twyCJet.rotation.y = -Math.PI / 2;
    }

    // 3. West Ise Bay Parallel Visual Pattern / Offshore Flight Corridor (z = -1,280m)
    if (tr.bayJet) {
      const cyc = (aiT * 52) % 4400;
      const bx = -2200 + cyc;
      tr.bayJet.position.set(bx, 185 + Math.sin(cyc * 0.0014) * 45, -1280);
      tr.bayJet.rotation.y = Math.PI / 2;
    }

    // 4. 2.8km GSE Spine Road Multi-Lane Left-Hand Traffic (z = 52.6 North/Eastbound +X, z = 47.4 South/Westbound -X)
    //    createGseMesh & buildTurnaroundGseMesh have forward = +Z -> +X = Math.PI/2, -X = -Math.PI/2!
    const setSpine = (mesh, x0, span, spd, zLane, dirSign, phaseOff = 0) => {
      if (!mesh) return;
      const d = ((aiT * spd + phaseOff) % span + span) % span;
      const x = dirSign > 0 ? (x0 + d) : (x0 + span - d);
      mesh.position.set(x, 0, zLane);
      mesh.rotation.y = dirSign > 0 ? Math.PI / 2 : -Math.PI / 2;
    };
    setSpine(tr.spineBusE1,   -920, 2200, 8.2, 52.6,  1, 0);
    setSpine(tr.spineBusE2,   -920, 2200, 8.2, 52.6,  1, 1100);
    setSpine(tr.spineDollyE1, -420, 1680, 4.2, 52.6,  1, 240);  // 15 km/h towing limit!
    setSpine(tr.spineDollyE2, -420, 1680, 4.2, 52.6,  1, 1060);
    setSpine(tr.spineCatE,    -680, 1850, 7.4, 52.6,  1, 620);

    setSpine(tr.spineBusW1,   -920, 2200, 7.9, 47.4, -1, 410);
    setSpine(tr.spineFuelW,   -380, 1780, 6.8, 47.4, -1, 120);
    setSpine(tr.spineDollyW1, -420, 1680, 4.2, 47.4, -1, 520);
    setSpine(tr.spineDollyW2, -420, 1680, 4.2, 47.4, -1, 1340);

    // 5. Behind-Stand Vehicle Road (z = -38, West of Pier x = -880..-24): Halts behind Spotter (-26m) whenever Spot 7 Pushback is active!
    const pushbackBlocking = (isFlight && (state.flightPhaseIdx === 7 || state.flightPhaseIdx === 8)) ||
      (state.subtab === 'drive' && state.spotterAlert && (state.spotterAlert.pushback || state.spotterAlert.service));
    if (tr.behindDolly1) {
      let xB = -760 + ((aiT * 4.2) % 740);
      if (pushbackBlocking && xB > -44) xB = -44;
      tr.behindDolly1.position.set(xB, 0, -36.2);
      tr.behindDolly1.rotation.y = Math.PI / 2;
    }
    if (tr.behindTractor2) {
      let xB2 = 980 - ((aiT * 7.2) % 880); // North side of Center Pier (+100..+980)
      tr.behindTractor2.position.set(xB2, 0, -39.6);
      tr.behindTractor2.rotation.y = -Math.PI / 2;
    }

    // 6. 8.5km West Seawall Perimeter Road Patrol SUV (黄パト at z = -685, 38 km/h = 10.5 m/s; holds outside ILS Red Zone!)
    if (tr.perimPatrol) {
      let xP = -1880 + ((aiT * 10.5) % 3760);
      if (state.ilsRedOn) {
        if (xP > -1485 && xP < -1135) xP = -1485;
        else if (xP > -275 && xP < -135) xP = -275;
        else if (xP > 1125 && xP < 1465) xP = 1125;
      }
      tr.perimPatrol.position.set(xP, 0, -685);
      tr.perimPatrol.rotation.y = Math.PI / 2;
      if (tr.perimPatrol.userData.beacon) {
        tr.perimPatrol.userData.beacon.visible = Math.floor(tSec * 5) % 2 === 0;
      }
    }

    // 7. Centrair Skyway Bridge & Meitetsu 2000-Series "μ-SKY" 4-Car Express Train (z = 300 .. 2,780m!)
    const showBridge = (A3D_AIRPORTS[state.airportId] || A3D_AIRPORTS.NGO).bridge;
    if (tr.muSkyTrain) {
      tr.muSkyTrain.visible = Boolean(showBridge);
      if (showBridge) {
        // Ping-pong shuttle between Tokoname mainland (z = 2760) and Centrair Station (z = 310) with station dwell!
        const cyc = (aiT * 24) % 5400;
        let tz = 310, ry = 0;
        if (cyc < 2450) { tz = 2760 - cyc; ry = Math.PI; }
        else if (cyc < 2700) { tz = 310; ry = Math.PI; }
        else if (cyc < 5150) { tz = 310 + (cyc - 2700); ry = 0; }
        else { tz = 2760; ry = 0; }
        tr.muSkyTrain.position.set(134, 9.8, tz);
        tr.muSkyTrain.rotation.y = ry;
      }
    }
    if (tr.skywayBusIn && tr.skywayBusOut) {
      tr.skywayBusIn.visible = Boolean(showBridge);
      tr.skywayBusOut.visible = Boolean(showBridge);
      if (showBridge) {
        tr.skywayBusIn.position.set(108.5, 9.55, 2780 - ((aiT * 19) % 2420));
        tr.skywayBusIn.rotation.y = Math.PI;
        tr.skywayBusOut.position.set(117.5, 9.55, 360 + (((aiT * 18.5) + 900) % 2420));
        tr.skywayBusOut.rotation.y = 0;
      }
    }
  }

  _animateSpot7GseFleet(isFlight, isOps3d, state, flightPose, tSec) {
    const lerp = (a, b, u) => a + (b - a) * Math.max(0, Math.min(1, u));
    const ease = u => { const x = Math.max(0, Math.min(1, u)); return x * x * (3 - 2 * x); };
    const ph = state.flightPhaseIdx;
    const p = state.flightProgress || 0;
    const L = this.spot7Layout;
    const PI = Math.PI;

    const stage = (mesh, x, z, yaw) => {
      mesh.visible = !this.compact;
      mesh.position.set(x, 0, z);
      mesh.rotation.y = yaw;
    };
    // Drive a vehicle from its ESA standby box to its docking point (u: 0 = standby, 1 = docked)
    const drive = (mesh, from, to, yaw, u) => stage(mesh, lerp(from.x, to.x, ease(u)), lerp(from.z, to.z, ease(u)), yaw);

    // Default: every vehicle waits in its ESA standby box outside the ERA
    stage(this.spot7Gpu, L.gpuStandby.x, L.gpuStandby.z, PI * 0.5);
    stage(this.spot7Catering, L.catStandby.x, L.catStandby.z, PI / 2);
    stage(this.spot7DollyTrain, L.dolly.x - 6.0, L.dolly.z + 3.0, 0);
    stage(this.spot7Belt, L.beltStandby.x, L.beltStandby.z, PI / 2);
    stage(this.spot7BeltTractor, L.beltTractor.x - 6.0, L.beltTractor.z - 3.0, 0);
    stage(this.spot7Hydrant, L.fuelStandby.x, L.fuelStandby.z, 0);
    stage(this.spot7Lav, L.lavStandby.x, L.lavStandby.z, PI / 2);
    stage(this.spot7Water, L.waterStandby.x, L.waterStandby.z, -PI / 2);
    stage(this.spot7Tug, L.tugStandby.x, L.tugStandby.z, -PI / 2);

    const gpuUd = this.spot7Gpu.userData;
    const catUd = this.spot7Catering.userData;
    const beltUd = this.spot7Belt.userData;
    const fuelUd = this.spot7Hydrant.userData;
    const lavUd = this.spot7Lav.userData;
    const watUd = this.spot7Water.userData;
    const tugUd = this.spot7Tug.userData;
    const ldUd = this.spot7Loader.userData;
    const sillLift = Math.max(0.85, L.cargoSill - 0.12);

    if (gpuUd.cableGrp) gpuUd.cableGrp.visible = false;
    if (catUd.vanGroup) catUd.vanGroup.position.y = catUd.restY;
    if (catUd.scissorPivot) catUd.scissorPivot.scale.y = 1;
    if (catUd.outriggers) catUd.outriggers.forEach(o => { o.group.visible = false; });
    if (beltUd.boomGroup) beltUd.boomGroup.rotation.x = -beltUd.restAng;
    if (beltUd.bags) beltUd.bags.forEach(b => { b.visible = false; });
    if (fuelUd.fuelHookups) fuelUd.fuelHookups.visible = false;
    if (fuelUd.liftDeck) fuelUd.liftDeck.position.y = 1.55;
    if (lavUd.serviceHose) lavUd.serviceHose.visible = false;
    if (watUd.serviceHose) watUd.serviceHose.visible = false;

    const loaderAt = (u, liftY, uldZ) => {
      this.spot7Loader.visible = (!L.isBeltOnly || isOps3d) && !this.compact;
      drive(this.spot7Loader, L.loaderStandby, L.loader, PI / 2, u);
      ldUd.liftGroup.position.y = liftY;
      ldUd.uldMesh.position.z = uldZ;
    };
    const dockBelt = (u, dir) => {
      drive(this.spot7Belt, L.beltStandby, L.belt, PI / 2, u);
      drive(this.spot7BeltTractor, { x: L.beltTractor.x - 6.0, z: L.beltTractor.z - 3.0 }, L.beltTractor, 0, u);
      if (u >= 0.92 && beltUd.boomGroup) {
        beltUd.boomGroup.rotation.x = -beltUd.dockAng;
        beltUd.bags.forEach((b, bi) => {
          b.visible = true;
          const v = ((bi * 0.25 + tSec * 0.28 * dir) % 1.0 + 1.0) % 1.0;
          b.position.z = 0.55 + v * (beltUd.boomLen - 1.1);
        });
      }
    };
    const dockGpu = u => {
      drive(this.spot7Gpu, L.gpuStandby, L.gpu, PI * 0.35, u);
      if (gpuUd.cableGrp) gpuUd.cableGrp.visible = u >= 0.95;
    };

    if (this.compact) {
      loaderAt(1, 0.85, -1.2);
      return { cargoOpen: false, galleyOpen: false };
    }

    if (isOps3d) {
      const ho = state.handsOn;
      loaderAt(1, 0.65 + ho.loaderH * (sillLift - 0.65), ho.uldLoaded ? 3.8 : -1.2);
      if (!ho.beaconOn && ho.chocksOn) dockGpu(1);
      return { cargoOpen: ho.loaderH > 0.2, galleyOpen: false };
    }

    if (!isFlight) {
      const drvSc = state.ngoLiveAc || null;
      const isDep = drvSc && (drvSc.mode === 'pushback' || drvSc.mode === 'taxi_cross' || drvSc.mode === 'runup');
      if (!isDep) {
        loaderAt(1, sillLift, -1.2);
        dockGpu(1);
        dockBelt(1, 1);
      } else {
        loaderAt(0, 0.85, -1.2);
        if (drvSc.mode === 'pushback' && flightPose === null) {
          const nz = L.tugCoupleZ - 10;
          const noseX = drvSc.x + Math.cos(drvSc.heading) * nz;
          const noseZ = drvSc.z + Math.sin(drvSc.heading) * nz;
          stage(this.spot7Tug, noseX, noseZ, PI / 2 - (drvSc.heading + PI));
        }
      }
      return { cargoOpen: !isDep, galleyOpen: false };
    }

    let cargoOpen = false, galleyOpen = false;

    if (ph <= 1 || ph >= 9) {
      loaderAt(0, 0.85, -1.2);
    } else if (ph === 2) {
      // Chocks on → GPU connects first (beacon OFF)
      dockGpu(Math.min(1, p * 1.6));
      loaderAt(0, 0.85, -1.2);
    } else if (ph === 3 || ph === 5) {
      // Unload (3) / Load (5): high-lift loader + ULD dolly train at fwd hold, belt loader at bulk
      cargoOpen = true;
      const app = ph === 3 ? Math.min(1, p * 2.0) : 1.0;
      dockGpu(1);
      const cyc = (tSec * 0.28) % 1.0;
      const liftFrac = cyc < 0.45 ? (cyc / 0.45) : (cyc < 0.7 ? 1.0 : Math.max(0, 1 - (cyc - 0.7) / 0.3));
      const uldZ = (app >= 0.95 && cyc >= 0.42 && cyc < 0.72)
        ? (ph === 5 ? (-1.2 + ((cyc - 0.42) / 0.3) * 4.2) : (3.0 - ((cyc - 0.42) / 0.3) * 4.2))
        : -1.2;
      loaderAt(app, app >= 0.95 ? (0.72 + liftFrac * (sillLift - 0.72)) : 0.85, uldZ);
      if (!L.isBeltOnly) drive(this.spot7DollyTrain, { x: L.dolly.x - 6.0, z: L.dolly.z + 3.0 }, L.dolly, 0, app);
      dockBelt(app, ph === 5 ? 1 : -1);
    } else if (ph === 4) {
      // Servicing: catering R1, hydrant fuel under starboard wing, lav & potable water at aft panels
      cargoOpen = true;
      galleyOpen = true;
      const app = Math.min(1, p * 2.0);
      dockGpu(1);
      loaderAt(1, sillLift, -1.2);
      drive(this.spot7Catering, L.catStandby, L.cat, PI / 2, app);
      if (app >= 0.92 && catUd.vanGroup) {
        const liftAmt = Math.min(1, Math.max(0, (p - 0.45) * 2.5));
        const dockY = Math.max(catUd.restY, L.doorL1.h + 0.98); // van floor 19cm below R1 sill
        catUd.vanGroup.position.y = lerp(catUd.restY, dockY, liftAmt);
        catUd.scissorPivot.scale.y = Math.max(0.3, catUd.vanGroup.position.y - 0.92);
        catUd.outriggers.forEach(o => { o.group.visible = true; o.group.scale.x = 1.0; });
      }
      drive(this.spot7Hydrant, L.fuelStandby, L.fuel, 0, app);
      if (app >= 0.92 && fuelUd.fuelHookups) {
        fuelUd.fuelHookups.visible = true;
        fuelUd.liftDeck.position.y = fuelUd.dockDeckY;
      }
      drive(this.spot7Lav, L.lavStandby, L.lav, PI / 2, app);
      if (app >= 0.92 && lavUd.serviceHose) { lavUd.serviceHose.visible = true; lavUd.serviceLift.position.y = lavUd.dockLiftY; }
      drive(this.spot7Water, L.waterStandby, L.water, -PI / 2, app);
      if (app >= 0.92 && watUd.serviceHose) { watUd.serviceHose.visible = true; watUd.serviceLift.position.y = watUd.dockLiftY; }
    } else if (ph === 6) {
      // Departure prep: GSE withdraws to ESA, pushback tug couples to nose gear
      dockGpu(1 - p);
      loaderAt(1 - p, 0.85, -1.2);
      dockBelt(1 - p, 1);
      const tugU = Math.min(1, p * 1.4);
      stage(this.spot7Tug, lerp(L.tugStandby.x, 0, ease(tugU)), lerp(L.tugStandby.z, L.tugCoupleZ, ease(tugU)), tugU > 0.6 ? PI : -PI / 2 + (PI / 2) * ease((tugU - 0.2) / 0.4));
    } else if (ph === 7 && flightPose) {
      loaderAt(0, 0.85, -1.2);
      const ac = flightPose.ac;
      const nz = L.tugCoupleZ - 10;
      const noseX = ac.x + Math.cos(ac.heading) * nz;
      const noseZ = ac.z + Math.sin(ac.heading) * nz;
      stage(this.spot7Tug, noseX, noseZ, PI / 2 - (ac.heading + PI));
      if (tugUd.beacon) tugUd.beacon.visible = Math.floor(tSec * 4.5) % 2 === 0;
    } else if (ph === 8) {
      loaderAt(0, 0.85, -1.2);
      const u = Math.min(1, p * 2.5);
      stage(this.spot7Tug, lerp(-16, -24, u), lerp(-58, -38, u), 0);
    }

    return { cargoOpen, galleyOpen };
  }

  _animateGroundCrewChoreography(isFlight, isOps3d, state, flightPose, acPose, tSec) {
    if (this.compact) {
      [this.crewMarshaller, this.crewWingL, this.crewWingR, this.crewHeadset, this.crewLoadmaster, this.crewFueler].forEach(c => {
        if (c) c.visible = false;
      });
      return;
    }

    [this.crewMarshaller, this.crewWingL, this.crewWingR, this.crewHeadset].forEach(c => { c.visible = true; });
    this.crewLoadmaster.visible = false;
    this.crewFueler.visible = false;

    const demoSig = state.marshallerDemoSignal;
    const L = this.spot7Layout;
    const X0 = L.x0 || 0;
    const tipX = L.halfSpan + 1.5, tipZ = L.mainGearZ - 1.5;

    if (!isFlight) {
      this.crewMarshaller.position.set(X0, 0, L.noseZ + 6.0);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || (acPose.beaconOn ? 'm_stop' : 'm_chocks'), tSec);

      this.crewWingL.position.set(X0 + tipX, 0, tipZ);
      this.crewWingL.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingL, 'watchman_clear', tSec);

      this.crewWingR.position.set(X0 - tipX, 0, tipZ);
      this.crewWingR.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingR, 'watchman_clear', tSec);

      this.crewHeadset.position.set(X0 - (L.r + 1.6), 0, L.noseGearZ + 0.4);
      this.crewHeadset.rotation.y = Math.PI * 0.65;
      animateCrewSignal(this.crewHeadset, isOps3d ? 'point_and_call' : 'm_allclear', tSec);

      const spotAlert = state.spotterAlert || {};
      animateCrewSignal(this.spotterPushback, spotAlert.pushback ? 'spotter_stop' : 'spotter_clear', tSec);
      animateCrewSignal(this.spotterService, spotAlert.service ? 'spotter_stop' : 'spotter_clear', tSec);
      animateCrewSignal(this.spotterBlast, (state.blastActive || spotAlert.blast) ? 'spotter_stop' : 'spotter_clear', tSec);
      return;
    }

    const ph = state.flightPhaseIdx;
    const p = state.flightProgress || 0;

    if (ph === 0) {
      this.crewMarshaller.position.set(X0 + 11.5, 0, L.noseZ + 8.5);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_stop', tSec);

      this.crewWingL.position.set(X0 + 15.5, 0, L.noseZ + 7.5);
      this.crewWingL.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingL, 'm_stop', tSec);

      this.crewWingR.position.set(X0 - 15.5, 0, L.noseZ + 7.5);
      this.crewWingR.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingR, 'm_stop', tSec);

      this.crewHeadset.position.set(X0 - 12.5, 0, L.noseZ + 8.5);
      this.crewHeadset.rotation.y = Math.PI;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);
    } else if (ph === 1) {
      this.crewMarshaller.position.set(X0, 0, L.noseZ + 6.5);
      this.crewMarshaller.rotation.y = Math.PI;
      const mSig = demoSig || (p < 0.72 ? 'm_straight' : (p < 0.92 ? 'm_slow' : 'm_stop'));
      animateCrewSignal(this.crewMarshaller, mSig, tSec);

      this.crewWingL.position.set(X0 + tipX, 0, tipZ);
      this.crewWingL.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingL, 'watchman_clear', tSec);

      this.crewWingR.position.set(X0 - tipX, 0, tipZ);
      this.crewWingR.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingR, 'watchman_clear', tSec);

      this.crewHeadset.position.set(X0 - 13.5, 0, L.noseZ + 7.5);
      this.crewHeadset.rotation.y = Math.PI * 0.75;
      animateCrewSignal(this.crewHeadset, 'm_stop', tSec);
    } else if (ph === 2) {
      this.crewMarshaller.position.set(X0, 0, L.noseZ + 6.5);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_chocks', tSec);

      this.crewHeadset.position.set(X0 - (L.r + 1.2), 0, L.noseGearZ + 0.6);
      this.crewHeadset.rotation.y = Math.PI * 0.55;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewWingL.position.set(X0 + L.r + 8.0, 0, L.noseGearZ - 1.0);
      this.crewWingL.rotation.y = -Math.PI * 0.5;
      animateCrewSignal(this.crewWingL, 'point_and_call', tSec);

      this.crewWingR.position.set(X0 - (L.r + 6.5), 0, L.noseGearZ + 2.0);
      this.crewWingR.rotation.y = Math.PI * 0.4;
      animateCrewSignal(this.crewWingR, 'guideman_beckon', tSec);
    } else if (ph >= 3 && ph <= 5) {
      this.crewMarshaller.position.set(X0 + L.r + 10.5, 0, L.noseGearZ + 1.0);
      this.crewMarshaller.rotation.y = -Math.PI * 0.5;
      animateCrewSignal(this.crewMarshaller, demoSig || 'point_and_call', tSec);

      this.crewHeadset.position.set(X0 - (L.r + 2.2), 0, L.noseGearZ + 1.0);
      this.crewHeadset.rotation.y = Math.PI * 0.45;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewWingL.position.set(L.water.x + 3.0, 0, L.water.z - 2.0);
      this.crewWingL.rotation.y = -Math.PI * 0.65;
      animateCrewSignal(this.crewWingL, ph === 4 ? 'point_and_call' : 'spotter_clear', tSec);

      this.crewWingR.position.set(X0 - (L.r + 7.5), 0, ph === 4 ? L.cat.z + 2.0 : L.loader.z + 3.3);
      this.crewWingR.rotation.y = -Math.PI * 0.75;
      animateCrewSignal(this.crewWingR, p < 0.45 ? 'guideman_beckon' : 'point_and_call', tSec);

      this.crewLoadmaster.visible = (ph === 3 || ph === 5);
      this.crewLoadmaster.position.set(L.loader.x - 5.8, 0, L.loader.z - 5.7);
      this.crewLoadmaster.rotation.y = Math.PI * 0.42;
      animateCrewSignal(this.crewLoadmaster, 'point_and_call', tSec);

      this.crewFueler.visible = (ph === 4);
      this.crewFueler.position.set(L.fuel.x - 2.9, 0, L.fuel.z + 0.4);
      this.crewFueler.rotation.y = Math.PI * 0.45;
      animateCrewSignal(this.crewFueler, 'point_and_call', tSec);
    } else if (ph === 6) {
      const ang = p * Math.PI * 1.4;
      this.crewHeadset.position.set(X0 - Math.cos(ang) * (L.r + 3.5), 0, 10 + Math.sin(ang) * (L.noseZ - 8));
      this.crewHeadset.rotation.y = Math.atan2(this.crewHeadset.position.x, 10 - this.crewHeadset.position.z);
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewMarshaller.position.set(X0 + 13.5, 0, L.noseZ + 6.0);
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_allclear', tSec);
      this.crewWingL.position.set(X0 + tipX, 0, tipZ);
      animateCrewSignal(this.crewWingL, 'watchman_clear', tSec);
      this.crewWingR.position.set(X0 - tipX, 0, tipZ);
      animateCrewSignal(this.crewWingR, 'watchman_clear', tSec);
    } else if (ph === 7 && flightPose) {
      const ac = flightPose.ac;
      const yaw3d = Math.PI / 2 - ac.heading;
      const noseOff = L.noseZ - 10 - 1.5;
      const noseX = ac.x + Math.cos(ac.heading) * noseOff;
      const noseZ = ac.z + Math.sin(ac.heading) * noseOff;
      const portDX = -Math.sin(ac.heading), portDZ = Math.cos(ac.heading);

      this.crewHeadset.position.set(noseX + portDX * 5.2, 0, noseZ + portDZ * 5.2);
      this.crewHeadset.rotation.y = yaw3d + Math.PI;
      animateCrewSignal(this.crewHeadset, 'walk_escort', tSec);

      this.crewWingL.position.set(ac.x + portDX * tipX, 0, ac.z + portDZ * tipX);
      this.crewWingL.rotation.y = yaw3d + Math.PI;
      animateCrewSignal(this.crewWingL, 'walk_escort', tSec);

      this.crewWingR.position.set(ac.x - portDX * tipX, 0, ac.z - portDZ * tipX);
      this.crewWingR.rotation.y = yaw3d + Math.PI;
      animateCrewSignal(this.crewWingR, 'walk_escort', tSec);

      this.crewMarshaller.position.set(X0 - 14.0, 0, -39.5);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_allclear', tSec);
    } else if (ph === 8) {
      this.crewHeadset.position.set(X0 - 29.0, 0, -53.0);
      this.crewHeadset.rotation.y = Math.atan2(acPose.x - (X0 - 29.0), acPose.z - (-53.0));
      animateCrewSignal(this.crewHeadset, p < 0.32 ? 'bypass_pin_salute' : 'wave_off', tSec);

      this.crewLoadmaster.visible = true;
      [
        [this.crewMarshaller, -16.0, -40.5],
        [this.crewLoadmaster, -19.0, -40.5],
        [this.crewWingL,      -22.0, -40.5],
        [this.crewWingR,      -25.0, -40.5]
      ].forEach(([cr, cx, cz]) => {
        cr.position.set(X0 + cx, 0, cz);
        cr.rotation.y = Math.atan2(acPose.x - (X0 + cx), acPose.z - cz);
        animateCrewSignal(cr, 'wave_off', tSec);
      });
    } else {
      this.crewMarshaller.position.set(X0 + 11.5, 0, L.noseZ + 8.5);
      animateCrewSignal(this.crewMarshaller, demoSig || 'wave_off', tSec);
      this.crewHeadset.position.set(X0 - 12.5, 0, L.noseZ + 8.5);
      animateCrewSignal(this.crewHeadset, 'wave_off', tSec);
      this.crewWingL.position.set(X0 + 15.5, 0, L.noseZ + 7.5);
      animateCrewSignal(this.crewWingL, 'wave_off', tSec);
      this.crewWingR.position.set(X0 - 15.5, 0, L.noseZ + 7.5);
      animateCrewSignal(this.crewWingR, 'wave_off', tSec);
    }
  }

  getDynamicColliders() {
    const out = [];
    const pushVeh = (id, mesh, r = 2.6, nameJa = '構内車両', nameVi = 'Phương tiện sân đỗ', nameEn = 'Airside Vehicle') => {
      if (!mesh || !mesh.visible) return;
      out.push({ id, kind: 'vehicle', x: mesh.position.x, z: mesh.position.z, r, nameJa, nameVi, nameEn });
    };
    const pushPer = (id, mesh, r = 1.25, nameJa = '地上作業員', nameVi = 'Nhân viên mặt đất', nameEn = 'Ground Crew') => {
      if (!mesh || !mesh.visible) return;
      out.push({ id, kind: 'person', x: mesh.position.x, z: mesh.position.z, r, nameJa, nameVi, nameEn });
    };

    const tr = this.trafficActors || {};
    pushVeh('tr_busE1', tr.spineBusE1, 3.4, 'ランプバス', 'Xe buýt sân đỗ', 'Apron Bus');
    pushVeh('tr_busE2', tr.spineBusE2, 3.4, 'ランプバス', 'Xe buýt sân đỗ', 'Apron Bus');
    pushVeh('tr_busW1', tr.spineBusW1, 3.4, 'ランプバス', 'Xe buýt sân đỗ', 'Apron Bus');
    pushVeh('tr_dollyE1', tr.spineDollyE1, 2.8, '牽引ドーリー車列', 'Đoàn xe kéo Dolly', 'Dolly Train');
    pushVeh('tr_dollyE2', tr.spineDollyE2, 2.8, '牽引ドーリー車列', 'Đoàn xe kéo Dolly', 'Dolly Train');
    pushVeh('tr_dollyW1', tr.spineDollyW1, 2.8, '牽引ドーリー車列', 'Đoàn xe kéo Dolly', 'Dolly Train');
    pushVeh('tr_dollyW2', tr.spineDollyW2, 2.8, '牽引ドーリー車列', 'Đoàn xe kéo Dolly', 'Dolly Train');
    pushVeh('tr_catE', tr.spineCatE, 3.0, 'ケータリング車', 'Xe suất ăn Catering', 'Catering Truck');
    pushVeh('tr_fuelW', tr.spineFuelW, 2.8, 'ハイドラント給油車', 'Xe tiếp dầu Hydrant', 'Hydrant Servicer');
    pushVeh('tr_behind1', tr.behindDolly1, 2.8, '牽引ドーリー車列', 'Xe kéo sau bến đỗ', 'Behind-Stand Dolly');
    pushVeh('tr_behind2', tr.behindTractor2, 2.2, 'トーイングトラクター', 'Xe đầu kéo TT', 'Towing Tractor');
    pushVeh('tr_patrol', tr.perimPatrol, 2.4, '場周パトロール車', 'Xe tuần tra an ninh', 'Perimeter Patrol SUV');

    pushVeh('gse_loader', this.spot7Loader, 2.8, 'ハイリフトローダー', 'Xe nâng High-Loader', 'High-Lift Loader');
    pushVeh('gse_dolly', this.spot7DollyTrain, 2.6, '駐機ドーリー', 'Đoàn Dolly tại bến', 'Stand Dolly Train');
    (this.spot14Gse || []).forEach((m, i) => pushVeh(`gse_b14_${i}`, m, 2.8, 'Spot 14 ローダー', 'Xe nâng Spot 14', 'Spot 14 Loader'));

    pushPer('crew_marsh', this.crewMarshaller, 1.35, 'マーシャラー', 'Nhân viên Marshaller', 'Marshaller');
    pushPer('crew_head', this.crewHeadset, 1.35, 'ヘッドセットマン', 'Nhân viên Headset', 'Headset Man');
    pushPer('crew_load', this.crewLoadmaster, 1.35, 'ロードマスター', 'Nhân viên Loadmaster', 'Loadmaster');
    pushPer('crew_wingL', this.crewWingL, 1.25, 'ウォッチマン(左)', 'Người canh cánh trái', 'Port Wingwalker');
    pushPer('crew_wingR', this.crewWingR, 1.25, 'ウォッチマン(右)', 'Người canh cánh phải', 'Starboard Wingwalker');
    pushPer('crew_spot_pb', this.spotterPushback, 1.35, '地上監視員 (プッシュバック)', 'Giám sát viên Pushback', 'Pushback Spotter');
    pushPer('crew_spot_sl', this.spotterService, 1.35, '地上監視員 (サービスレーン)', 'Giám sát viên Service Lane', 'Service Lane Spotter');
    pushPer('crew_spot_71', this.spotterBlast71, 1.35, '地上監視員 (#71ブラスト)', 'Giám sát viên #71 Blast', '#71 Blast Spotter');
    return out;
  }

  renderFrame(state, now) {
    if (this.disposed) return;
    const rect = this.canvas.getBoundingClientRect();
    const W = Math.max(240, Math.round(rect.width));
    const H = Math.max(200, Math.round(rect.height));
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = state.gfxQuality === 'low' ? 0.85 : (state.gfxQuality === 'med' ? Math.min(rawDpr, 1.2) : Math.min(rawDpr, 1.5));

    if (this.canvas.width !== Math.round(W * dpr) || this.canvas.height !== Math.round(H * dpr)) {
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(W, H, false);
      this.camera.aspect = W / H;
      this.camera.updateProjectionMatrix();
      if (this.composer) this.composer.setSize(W, H);
    }

    if (this.builtAirportId !== state.airportId) {
      this.buildStaticAirport(state.airportId);
    }
    this.setActiveFleetAircraft(state.fleetAircraftId || 'A320', state.liveryId || 'ANA');

    const tod = state.timeOfDay || 'day';
    const wx = state.weather || 'clear';
    const isNight = tod === 'night';
    const isSunset = tod === 'sunset';

    this.sunLight.intensity = isNight ? 0.45 : (isSunset ? 1.85 : (wx === 'rain' || wx === 'fog' ? 1.15 : 2.2));
    this.sunLight.color.setHex(isNight ? 0x6b8cc9 : (isSunset ? 0xff9f5a : 0xfff8eb));
    this.sunLight.castShadow = state.gfxQuality !== 'low';
    this.hemiLight.intensity = isNight ? 0.3 : (isSunset ? 0.45 : 0.5);
    const glassEm = isNight ? 0x403214 : (isSunset ? 0x261808 : 0x000000);
    if (this.glassMat) this.glassMat.emissive.setHex(glassEm);
    if (this.glassMeshes) this.glassMeshes.forEach(m => m.material.emissive && m.material.emissive.setHex(glassEm));
    if (this.playerVeh && this.playerVeh.userData.beams) this.playerVeh.userData.beams.forEach(b => { b.visible = isNight || wx === 'fog'; });
    this._updateEnvironment(isNight ? 'night' : (isSunset ? 'sunset' : (wx === 'rain' || wx === 'fog' || wx === 'snow' ? 'overcast' : 'day')));
    if (this.runwayMat) this.runwayMat.roughness = wx === 'rain' ? 0.14 : 0.72;
    if (this.apronMat) this.apronMat.roughness = wx === 'rain' ? 0.18 : 0.78;

    const fogHex = isNight ? 0x0a1428 : (isSunset ? 0xd98f6c : (wx === 'fog' || wx === 'snow' ? 0xc6d3e1 : (wx === 'rain' ? 0x7c90a6 : 0xbcdaf5)));
    this.scene.fog.color.setHex(fogHex);
    this.scene.fog.near = wx === 'fog' ? 55 : (wx === 'snow' ? 140 : 480);
    this.scene.fog.far = wx === 'fog' ? 360 : (wx === 'snow' ? 920 : 6800);

    const sunDirOff = isSunset ? [260, 75, -190] : [160, 280, 140];
    this.skyMat.uniforms.uTopCol.value.setHex(isNight ? 0x040918 : (isSunset ? 0x2b396b : 0x1b59a8));
    this.skyMat.uniforms.uHorizonCol.value.setHex(fogHex);
    this.skyMat.uniforms.uSunDir.value.set(sunDirOff[0], sunDirOff[1], sunDirOff[2]).normalize();
    this.skyMat.uniforms.uNight.value = isNight ? 1.0 : 0.0;

    const isFlight = state.subtab === 'flight';
    const isOps3d = state.subtab === 'ops3d';
    const flightPose = isFlight ? computeFlightCyclePose(state.flightPhaseIdx, state.flightProgress) : null;
    // Marshaller drill: the aircraft is driven by the trainee's hand signals (physics in airport3dModule)
    if (flightPose && state.marshalDrill && state.marshalDrill.active) {
      const md = state.marshalDrill;
      Object.assign(flightPose.ac, { x: NGO_STAND7_X + md.x, z: md.z, heading: md.heading, y: 0, pitch: 0, beaconOn: true, gs: md.v });
    }
    const tSec = (now || 0) * 0.001;
    this.radarBar.rotation.y = tSec * 1.4;

    if (this.ilsLamps && this.ilsLamps.length) {
      const redCol = state.ilsRedOn ? 0xef4444 : 0x38bdf8;
      this.ilsLamps.forEach(l => l.material.color.setHex(redCol));
    }

    this.cloudGroup.visible = state.gfxQuality !== 'low' && wx !== 'fog';
    this.cloudGroup.children.forEach(c => {
      const b = c.userData.base;
      c.position.x = ((b.x + state.aiTime * b.spd * 2.2 + 2200) % 4400) - 2200;
    });

    // Update Synchronized Multi-Lane Airside, Flight & Skyway Traffic!
    this._updateAirportTraffic(state, isFlight, flightPose, tSec);

    this.deiceTruck.visible = (wx === 'snow' || state.airportId === 'CTS');
    if (this.deiceTruck.userData.boom) this.deiceTruck.userData.boom.rotation.y = Math.sin(tSec * 2.4) * 0.25;

    const prof = AIRCRAFT_PROFILES[state.fleetAircraftId] || AIRCRAFT_PROFILES.A320;
    const wbConseq = state.wbConseq || null;
    const beaconBlink = Math.floor((now || 0) / 420) % 2 === 0;
    const strobeOn = ((now || 0) % 1100) < 110;

    let acPose = { x: NGO_STAND7_X, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: false };
    if (this.compact) {
      const tipPitch = wbConseq && wbConseq.stressFlags.tailTip ? -0.22 : (wbConseq && wbConseq.stressFlags.noseHeavy ? 0.08 : 0);
      acPose = { x: NGO_STAND7_X, y: tipPitch < -0.1 ? 0.35 : 0, z: 10, heading: Math.PI / 2, pitch: tipPitch, beaconOn: false };
      this.updatePbbExt(this.spot7Pbb, prof.isFreighter ? 0 : 1);
      this.chocksGroup.visible = true;
      this.conesGroup.visible = true;
      this.playerVeh.visible = false;
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
      this.tipRing.visible = Boolean(wbConseq && wbConseq.stressFlags.tailTip);
    } else if (isOps3d) {
      const ho = state.handsOn;
      acPose = { x: NGO_STAND7_X, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: ho.beaconOn };
      this.updatePbbExt(this.spot7Pbb, ho.pbbExt);
      this.chocksGroup.visible = ho.chocksOn;
      this.conesGroup.visible = ho.conesOn;
      this.playerVeh.visible = false;
      this.tipRing.visible = false;
      ho.fods.forEach(f => {
        const m = this.fodMeshes[f.id];
        if (m) {
          m.visible = !f.cleared;
          m.rotation.y = tSec * 2.2;
        }
      });
    } else if (isFlight && flightPose) {
      acPose = { ...flightPose.ac };
      const isTip = state.syncWbFailure && wbConseq && wbConseq.stressFlags.tailTip && state.flightPhaseIdx >= 2 && state.flightPhaseIdx <= 6;
      if (isTip) {
        acPose.pitch = -0.21 - Math.sin(tSec * 4) * 0.012;
        acPose.y = 0.35;
      }
      this.tipRing.visible = Boolean(isTip);
      this.updatePbbExt(this.spot7Pbb, prof.isFreighter ? 0 : flightPose.pbbExt);
      this.chocksGroup.visible = flightPose.chocksOn;
      this.conesGroup.visible = flightPose.conesOn;
      this.playerVeh.visible = false;
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
    } else {
      const drvSc = state.ngoLiveAc || null;
      if (drvSc) {
        acPose = { x: drvSc.x, y: 0, z: drvSc.z, heading: drvSc.heading, pitch: 0, beaconOn: drvSc.beaconOn };
      }
      const isDeparting = drvSc && (drvSc.mode === 'pushback' || drvSc.mode === 'taxi_cross');
      this.updatePbbExt(this.spot7Pbb, isDeparting ? 0.0 : 1.0);
      this.chocksGroup.visible = drvSc ? drvSc.chocksOn : true;
      this.conesGroup.visible = !isDeparting;
      this.tipRing.visible = false;
      this.playerVeh.visible = true;
      this.playerVeh.position.set(state.veh.x, 0, state.veh.z);
      this.playerVeh.rotation.y = Math.PI / 2 - state.veh.heading;

      const ud = this.playerVeh.userData || {};
      const isCab = state.camMode === 'gse_cab';
      if (ud.driverGroup) ud.driverGroup.visible = !isCab;
      if (ud.frontPivots) ud.frontPivots.forEach(p => { p.rotation.y = -(state.veh.steerAngle || 0); });
      if (ud.steerWheel) ud.steerWheel.rotation.z = -(state.veh.steerAngle || 0) * 3.2;
      if (ud.allWheels) ud.allWheels.forEach(w => { w.rotation.x += (state.veh.speed || 0) * 0.055; });
      if (ud.beaconHalo) ud.beaconHalo.visible = beaconBlink;
      if (ud.highMast) ud.highMast.visible = !isCab && state.ngoVehMode === 'high38';

      animateTractorDriver(this.playerVeh, {
        steerAngle: state.veh.steerAngle || 0,
        reversing: (state.veh.speed || 0) < -0.15,
        yubikoshiTimer: state.yubikoshi ? state.yubikoshi.timer : 0,
        yubikoshiDir: state.yubikoshi ? state.yubikoshi.dir : 'fwd',
        tSec
      });

      const isBackingMode = state.ngoDriveScenario === 'SC5' || state.ngoVehMode === 'backing' || (state.coupledDolly && state.coupledDolly.type === 'semi');
      if (this.backingBayGroup) {
        this.backingBayGroup.visible = state.ngoDriveScenario === 'SC5' || state.ngoVehMode === 'backing';
        if (this.backingBayGroup.visible && this.backingBayBorderMat) {
          const bk = state.backingStatus || {};
          this.backingBayBorderMat.color.setHex(bk.parked ? 0x22c55e : (bk.jackknife ? 0xef4444 : 0xfacc15));
        }
      }
      if (this.longSemiTrailer) {
        if (isBackingMode && Array.isArray(state.cartPoses) && state.cartPoses[0]) {
          this.longSemiTrailer.visible = true;
          this.longSemiTrailer.position.set(state.cartPoses[0].x, 0, state.cartPoses[0].z);
          this.longSemiTrailer.rotation.y = Math.PI / 2 - state.cartPoses[0].heading;
        } else {
          this.longSemiTrailer.visible = false;
        }
      }
      const activeDollyType = (state.coupledDolly && state.coupledDolly.type) || state.dollyType || 'ake';
      const showCarts = !isBackingMode && (state.ngoVehMode === 'towing' || Boolean(state.coupledDolly)) && Array.isArray(state.cartPoses);
      Object.entries(this.towedCartPools || {}).forEach(([dtKey, pool]) => {
        const usePool = showCarts && dtKey === activeDollyType;
        pool.forEach((cart, ci) => {
          if (usePool && state.cartPoses[ci]) {
            cart.visible = true;
            cart.position.set(state.cartPoses[ci].x, 0, state.cartPoses[ci].z);
            cart.rotation.y = Math.PI / 2 - state.cartPoses[ci].heading;
          } else {
            cart.visible = false;
          }
        });
      });

      // Render Parked Interactive World Dollies on Apron / GSE Bays
      if (this.worldDollyGroup && Array.isArray(state.worldDollies)) {
        this.worldDollyGroup.visible = true;
        const activeIds = new Set();
        state.worldDollies.forEach(wd => {
          if (wd.coupled) return;
          activeIds.add(wd.id);
          let grp = this.worldDollyMeshes[wd.id];
          if (!grp) {
            grp = new THREE.Group();
            if (wd.type === 'semi') {
              const sClone = this.longSemiTrailer.clone();
              sClone.visible = true;
              grp.add(sClone);
            } else {
              const wb = (DOLLY_TYPES[wd.type] || DOLLY_TYPES.ake).wheelBase;
              for (let ui = 0; ui < wd.count; ui++) {
                const uMesh = createDollyUnit3D(wd.type, ui);
                uMesh.position.set(0, 0, -ui * wb);
                grp.add(uMesh);
              }
            }
            const ring = new THREE.Mesh(
              new THREE.RingGeometry(1.6, 2.2, 24).rotateX(-Math.PI / 2),
              new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.78, side: THREE.DoubleSide })
            );
            ring.position.set(0, 0.14, 2.4);
            grp.add(ring);
            grp.userData.hitchRing = ring;
            this.worldDollyGroup.add(grp);
            this.worldDollyMeshes[wd.id] = grp;
          }
          grp.visible = true;
          grp.position.set(wd.x, 0, wd.z);
          grp.rotation.y = Math.PI / 2 - wd.heading;
          if (grp.userData.hitchRing) {
            const isNear = state.nearbyDolly && state.nearbyDolly.id === wd.id;
            grp.userData.hitchRing.material.color.setHex(isNear ? 0x22c55e : 0x38bdf8);
            const sc = isNear ? (1.0 + Math.sin(tSec * 6) * 0.15) : 0.85;
            grp.userData.hitchRing.scale.set(sc, sc, 1);
          }
        });
        Object.entries(this.worldDollyMeshes).forEach(([id, grp]) => {
          if (!activeIds.has(id)) grp.visible = false;
        });
      }

      if (this.impactRing) {
        if ((state.impactFlash || 0) > 0.02) {
          this.impactRing.visible = true;
          this.impactRing.position.set(state.impactPos ? state.impactPos.x : state.veh.x, 0.3, state.impactPos ? state.impactPos.z : state.veh.z);
          const sc = 1 + (1 - state.impactFlash) * 2.4;
          this.impactRing.scale.set(sc, sc, 1);
          this.impactRing.material.opacity = state.impactFlash;
        } else {
          this.impactRing.visible = false;
        }
      }
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
    }

    if (isFlight || isOps3d || this.compact) {
      Object.values(this.towedCartPools || {}).forEach(pool => pool.forEach(c => { c.visible = false; }));
      if (this.worldDollyGroup) this.worldDollyGroup.visible = false;
      if (this.longSemiTrailer) this.longSemiTrailer.visible = false;
      if (this.backingBayGroup) this.backingBayGroup.visible = false;
      if (this.impactRing) this.impactRing.visible = false;
    }

    // Dynamic Directional Shadow-Map Tracking across the entire 4.37km Island!
    const focusX = isFlight ? acPose.x : (state.subtab === 'drive' ? state.veh.x : NGO_STAND7_X);
    const focusZ = isFlight ? acPose.z : (state.subtab === 'drive' ? state.veh.z : 10);
    this.sunLight.target.position.set(focusX, 0, focusZ);
    this.sunLight.position.set(focusX + sunDirOff[0], sunDirOff[1], focusZ + sunDirOff[2]);

    const doorFlags = this._animateSpot7GseFleet(isFlight, isOps3d, state, flightPose, tSec);
    this._animateGroundCrewChoreography(isFlight, isOps3d, state, flightPose, acPose, tSec);

    // Apply physical knockback / tumble effects on collided crew & traffic vehicles
    if (state.hitEffects && !isFlight) {
      const actorMap = {
        tr_busE1: this.trafficActors.spineBusE1, tr_busE2: this.trafficActors.spineBusE2,
        tr_busW1: this.trafficActors.spineBusW1, tr_dollyE1: this.trafficActors.spineDollyE1,
        tr_dollyE2: this.trafficActors.spineDollyE2, tr_dollyW1: this.trafficActors.spineDollyW1,
        tr_dollyW2: this.trafficActors.spineDollyW2, tr_catE: this.trafficActors.spineCatE,
        tr_fuelW: this.trafficActors.spineFuelW, tr_behind1: this.trafficActors.behindDolly1,
        tr_behind2: this.trafficActors.behindTractor2, tr_patrol: this.trafficActors.perimPatrol,
        gse_loader: this.spot7Loader, gse_dolly: this.spot7DollyTrain,
        crew_marsh: this.crewMarshaller, crew_head: this.crewHeadset,
        crew_load: this.crewLoadmaster, crew_wingL: this.crewWingL, crew_wingR: this.crewWingR,
        crew_spot_pb: this.spotterPushback, crew_spot_sl: this.spotterService, crew_spot_71: this.spotterBlast71
      };
      Object.entries(state.hitEffects).forEach(([cid, eff]) => {
        const m = actorMap[cid];
        if (!m || !eff || eff.ttl <= 0) return;
        const p = Math.min(1, eff.ttl / 4.0);
        m.position.x += eff.dx * p;
        m.position.z += eff.dz * p;
        if (eff.kind === 'person') {
          m.rotation.x = Math.PI * 0.44 * p;
          m.position.y = 0.25 * p;
        } else {
          m.rotation.y += eff.spin * p;
          m.rotation.z = Math.sin(tSec * 28) * 0.08 * p;
        }
      });
    }

    const refOff = this.acRefOff || 0;
    this.activeAc.position.set(acPose.x + Math.cos(acPose.heading) * refOff, acPose.y, acPose.z + Math.sin(acPose.heading) * refOff);
    this.activeAc.rotation.order = 'YXZ';
    this.activeAc.rotation.y = Math.PI / 2 - acPose.heading;
    this.activeAc.rotation.x = -(acPose.pitch || 0);
    if (this.activeAc.userData.gearGroup) this.activeAc.userData.gearGroup.visible = acPose.y < 22;

    animateAircraft3D(this.activeAc, tSec, {
      dt: 0.016,
      beaconOn: acPose.beaconOn,
      strobeOn: acPose.beaconOn && strobeOn,
      cargoOpen: doorFlags.cargoOpen,
      galleyOpen: doorFlags.galleyOpen
    });
    const fanSpeed = acPose.beaconOn ? 0.38 : 0.025;
    if (this.activeAc.userData.fans) this.activeAc.userData.fans.forEach(f => { f.rotation.z += fanSpeed; });
    const lts = this.activeAc.userData.lights || {};
    if (lts.strobeL) lts.strobeL.visible = Boolean(acPose.beaconOn && strobeOn);
    if (lts.strobeR) lts.strobeR.visible = Boolean(acPose.beaconOn && strobeOn);
    if (lts.noseLight) lts.noseLight.visible = Boolean(acPose.beaconOn);

    const onGround = acPose.y < 1.5;
    const drvSc2 = state.ngoLiveAc || null;
    const blastShouldShow = onGround && (
      Boolean(drvSc2 && drvSc2.blastOn) ||
      Boolean(acPose.beaconOn) ||
      Boolean(state.blastActive)
    );
    if (this.activeBlastZone) {
      animateJetBlastZone3D(this.activeBlastZone, tSec, blastShouldShow);
    }

    // Camera Smooth Damping
    let targetCam;
    if (this.compact) {
      const ang = tSec * 0.22;
      const cS = Math.max(1, (this.spot7Layout ? this.spot7Layout.halfSpan : 18) / 18); // frame wide-bodies too
      targetCam = { pos: [NGO_STAND7_X + Math.cos(ang) * 34 * cS - 6, 12.5 * cS, 10 + Math.sin(ang) * 32 * cS], target: [NGO_STAND7_X, 3.8, 10 + (this.acRefOff || 0)], fov: 44, povKind: 'compact' };
    } else {
      const isBack = state.ngoDriveScenario === 'SC5' || state.ngoVehMode === 'backing';
      const camExtra = {
        driveZoom: state.driveZoom || 1.0,
        backingBay: isBack ? (state.backingBay || { cx: 218, cz: 26 }) : null,
        trailerPose: isBack && Array.isArray(state.cartPoses) && state.cartPoses[0] ? state.cartPoses[0] : state.veh
      };
      const L = this.spot7Layout;
      const spec = (this.activeAc && this.activeAc.userData.spec) || AIRCRAFT_3D_SPECS.A320;
      const sc = this.activeAcScale || 1;
      const crewPos = c => (c && c.visible ? [c.position.x, c.position.z] : null);
      camExtra.acInfo = { halfL: spec.lengthM * 0.5 * sc, cockpitY: (spec.bellyClearanceM + spec.fuseRadius * 1.45) * sc, refOff: this.acRefOff || 0 };
      camExtra.noseZ = L ? L.noseZ : 29;
      camExtra.cargoDoor = L ? [L.loader.x + 4.0, Math.max(1.6, L.cargoSill), L.loader.z] : null;
      // Belt-loader driver seat (outboard of the belt, facing the bulk/cargo door) — the GSE cab POV during a turnaround
      camExtra.beltCab = L ? { pos: [L.belt.x - 5.2, 2.15, L.belt.z - 1.2], target: [L.belt.x + 3.6, Math.max(1.4, L.cargoSill * 0.8), L.belt.z + 0.4] } : null;
      camExtra.crew = {
        marshaller: crewPos(this.crewMarshaller),
        headset: crewPos(this.crewHeadset),
        loadmaster: crewPos(this.crewLoadmaster)
      };
      targetCam = computeViewpointCamera(state.camMode, isFlight, flightPose, state.veh, state.cam, state.flightPhaseIdx, camExtra);
    }

    // ---- Camera rig: time-based damping + short eased cut between viewpoints (no fly-through) ----
    const nowMs = now || performance.now();
    const dt = this._lastCamMs ? Math.min(0.1, Math.max(0.001, (nowMs - this._lastCamMs) / 1000)) : 0.016;
    this._lastCamMs = nowMs;
    const tp = targetCam.pos, tt = targetCam.target;
    tp[1] = Math.max(1.3, tp[1]); // never below eye height / ground
    const modeKey = `${state.camMode}|${state.subtab}`;
    if (!this.smoothCam || state.dragging) {
      this.smoothCam = { pos: [...tp], target: [...tt], fov: targetCam.fov };
      this._camTrans = null;
    } else if (modeKey !== this._camModeKey) {
      const jump = Math.hypot(tp[0] - this.smoothCam.pos[0], tp[1] - this.smoothCam.pos[1], tp[2] - this.smoothCam.pos[2]);
      // Far jumps (e.g. island overview → marshaller) cut instantly; near ones blend in 0.6s
      this._camTrans = jump > 450 ? null : { from: { pos: [...this.smoothCam.pos], target: [...this.smoothCam.target], fov: this.smoothCam.fov }, t: 0, dur: 0.6 };
      if (!this._camTrans) this.smoothCam = { pos: [...tp], target: [...tt], fov: targetCam.fov };
    }
    this._camModeKey = modeKey;
    if (this._camTrans) {
      const tr = this._camTrans;
      tr.t += dt;
      const u0 = Math.min(1, tr.t / tr.dur);
      const u = u0 * u0 * (3 - 2 * u0);
      for (let i = 0; i < 3; i++) {
        this.smoothCam.pos[i] = tr.from.pos[i] + (tp[i] - tr.from.pos[i]) * u;
        this.smoothCam.target[i] = tr.from.target[i] + (tt[i] - tr.from.target[i]) * u;
      }
      this.smoothCam.fov = tr.from.fov + (targetCam.fov - tr.from.fov) * u;
      if (u0 >= 1) this._camTrans = null;
    } else if (!state.dragging) {
      // Attached first-person views are rigid; follow / overview cameras ease gently
      const pk = targetCam.povKind;
      const rate = (pk === 'pilot' || pk === 'gse_cab' || pk === 'headset' || pk === 'marshaller' || pk === 'loadmaster') ? 16
        : (pk === 'orbit' ? 12 : (pk === 'flight_follow' || pk === 'chase' || pk === 'backing' ? 4.5 : 6));
      const k = 1 - Math.exp(-rate * dt);
      for (let i = 0; i < 3; i++) {
        this.smoothCam.pos[i] += (tp[i] - this.smoothCam.pos[i]) * k;
        this.smoothCam.target[i] += (tt[i] - this.smoothCam.target[i]) * Math.min(1, k * 1.6);
      }
      this.smoothCam.fov += (targetCam.fov - this.smoothCam.fov) * k;
    }

    this.camera.fov = this.smoothCam.fov;
    this.camera.near = targetCam.povKind === 'gse_cab' ? 0.14 : Math.max(1.2, Math.min(28, this.smoothCam.pos[1] * 0.014));
    this.camera.updateProjectionMatrix();
    const shk = state.camShake || 0;
    const sx = shk > 0.01 ? (Math.random() - 0.5) * shk * 1.4 : 0;
    const sy = shk > 0.01 ? (Math.random() - 0.5) * shk * 1.1 : 0;
    this.camera.position.set(this.smoothCam.pos[0] + sx, this.smoothCam.pos[1] + sy, this.smoothCam.pos[2]);
    this.camera.lookAt(...this.smoothCam.target);
    if (this.skyMesh) this.skyMesh.position.set(this.camera.position.x, 0, this.camera.position.z);

    // First-person crew POV: hide that crew member's own body/arms so they never block the lens
    const povOwner = { marshaller: this.crewMarshaller, headset: this.crewHeadset, loadmaster: this.crewLoadmaster }[targetCam.povKind];
    const hideOwner = Boolean(povOwner && povOwner.visible);
    if (hideOwner) povOwner.visible = false;

    // Render live left & right Rear-View Mirrors when in TT Driver Cab (gse_cab)
    // Mirrors re-render every 3rd frame (2 extra scene passes are expensive on phones)
    this._mirrorTick = ((this._mirrorTick || 0) + 1) % 3;
    if (targetCam.povKind === 'gse_cab' && state.subtab === 'drive' && !this.compact && this.mirrorRT_L && this.playerVeh && this._mirrorTick === 0) {
      const ud = this.playerVeh.userData || {};
      const vh = state.veh.heading || 0;
      const vch = Math.cos(vh), vsh = Math.sin(vh);
      const toW = (lx, ly, lz) => [state.veh.x + lz * vch + lx * vsh, ly, state.veh.z + lz * vsh - lx * vch];
      const wasVis = this.playerVeh.visible;
      this.playerVeh.visible = false; // avoid mirror housing occluding its own camera

      const pL = toW(0.88, 1.56, 0.26), tL = toW(1.55, 1.05, -24.0);
      this.mirrorCamL.position.set(pL[0], pL[1], pL[2]);
      this.mirrorCamL.lookAt(tL[0], tL[1], tL[2]);
      this.renderer.setRenderTarget(this.mirrorRT_L);
      this.renderer.render(this.scene, this.mirrorCamL);

      const pR = toW(-0.88, 1.56, 0.26), tR = toW(-1.55, 1.05, -24.0);
      this.mirrorCamR.position.set(pR[0], pR[1], pR[2]);
      this.mirrorCamR.lookAt(tR[0], tR[1], tR[2]);
      this.renderer.setRenderTarget(this.mirrorRT_R);
      this.renderer.render(this.scene, this.mirrorCamR);

      this.renderer.setRenderTarget(null);
      this.playerVeh.visible = wasVis;
      if (ud.mirrorFaceL && ud.mirrorFaceL.material.map !== this.mirrorRT_L.texture) {
        ud.mirrorFaceL.material.map = this.mirrorRT_L.texture;
        ud.mirrorFaceL.material.color.setHex(0xffffff);
        ud.mirrorFaceL.material.needsUpdate = true;
      }
      if (ud.mirrorFaceR && ud.mirrorFaceR.material.map !== this.mirrorRT_R.texture) {
        ud.mirrorFaceR.material.map = this.mirrorRT_R.texture;
        ud.mirrorFaceR.material.color.setHex(0xffffff);
        ud.mirrorFaceR.material.needsUpdate = true;
      }
    }

    if (this.composer && state.gfxQuality !== 'low') {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
    if (hideOwner) povOwner.visible = true;

    if (this.hudCanvas && !this.compact) {
      this.renderHudOverlay(state, W, H, dpr, targetCam.povKind, flightPose, now);
    }
  }

  projectToScreen(pt, W, H) {
    const v = new THREE.Vector3(pt[0], pt[1], pt[2]).project(this.camera);
    if (v.z > 1 || v.z < -1) return null;
    return { x: (v.x * 0.5 + 0.5) * W, y: (0.5 - v.y * 0.5) * H };
  }

  renderHudOverlay(state, W, H, dpr, povKind, flightPose, now) {
    const ctx = this.hudCanvas.getContext('2d');
    if (this.hudCanvas.width !== Math.round(W * dpr) || this.hudCanvas.height !== Math.round(H * dpr)) {
      this.hudCanvas.width = Math.round(W * dpr);
      this.hudCanvas.height = Math.round(H * dpr);
    }
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const tSec = (now || 0) * 0.001;
    if (state.weather === 'rain' || state.weather === 'snow') {
      const cnt = state.gfxQuality === 'low' ? 35 : (state.gfxQuality === 'med' ? 75 : 130);
      if (state.weather === 'rain') {
        ctx.strokeStyle = 'rgba(186,230,253,0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < cnt; i++) {
          const rx = ((i * 97 + tSec * 150) % (W + 40)) - 20;
          const ry = ((i * 53 + tSec * 720) % (H + 30)) - 15;
          ctx.moveTo(rx, ry); ctx.lineTo(rx - 4, ry + 14);
        }
        ctx.stroke();
      } else {
        ctx.fillStyle = 'rgba(248,250,252,0.85)';
        for (let i = 0; i < cnt; i++) {
          const sx = (i * 89 + Math.sin(tSec + i) * 24 + W) % W;
          const sy = (i * 61 + tSec * (55 + (i % 4) * 18)) % H;
          ctx.beginPath(); ctx.arc(sx, sy, 1.5 + (i % 3) * 0.8, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    const placed = [];
    const drawTag = (pt, text, bg, fg = '#FFF', priority = 1) => {
      if (state.labelMode === 'min' && priority < 2) return;
      if (state.labelMode === 'smart' && priority < 1) return;
      const p = this.projectToScreen(pt, W, H);
      if (!p || p.x < -30 || p.x > W + 30 || p.y < 44 || p.y > H - 46) return;
      ctx.font = '600 11px "Be Vietnam Pro", "Hiragino Sans", "Noto Sans JP", -apple-system, sans-serif';
      const tw = ctx.measureText(text).width + 12;
      const th = 20;
      let rx = p.x - tw / 2, ry = p.y - th / 2;
      const hit = (x1, y1) => placed.some(r => !(x1 + tw + 4 < r.x || x1 > r.x + r.w + 4 || y1 + th + 3 < r.y || y1 > r.y + r.h + 3));
      if (hit(rx, ry)) {
        if (priority >= 2 && !hit(rx, ry - 22)) ry -= 22;
        else if (priority < 2) return;
      }
      placed.push({ x: rx, y: ry, w: tw, h: th });
      ctx.fillStyle = bg;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(rx, ry, tw, th, 4); else ctx.fillRect(rx, ry, tw, th);
      ctx.fill();
      ctx.fillStyle = fg;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(text, rx + tw / 2, ry + th / 2);
    };

    const ap = A3D_AIRPORTS[state.airportId] || A3D_AIRPORTS.NGO;
    const lang = state.lang || 'ja';
    if (state.subtab === 'ops3d') {
      state.handsOn.fods.filter(f => !f.cleared).forEach(f => {
        drawTag([f.x, 1.8, f.z], `⚠ CLICK FOD ${f.id}`, 'rgba(225,29,72,0.95)', '#FEF08A', 2);
      });
      drawTag([this.spot7Layout ? this.spot7Layout.doorL1.x + 8 : 10, 6.2, this.spot7Layout ? this.spot7Layout.doorL1.z : 21.5], 'CLICK: PBB Dock', 'rgba(14,116,144,0.88)', '#FFF', 1);
      drawTag([this.spot7Loader.position.x, 4.5, this.spot7Loader.position.z], 'CLICK: High-Loader', 'rgba(14,116,144,0.88)', '#FFF', 1);
    } else if (state.subtab === 'flight' && flightPose) {
      const ph = A3D_FLIGHT_PHASES[state.flightPhaseIdx];
      const phTag = lang === 'ja' ? ph.tagJa : (lang === 'en' ? (ph.tagEn || ph.id.toUpperCase()) : ph.tagVi);
      if (povKind !== 'pilot') {
        drawTag([flightPose.ac.x, flightPose.ac.y + 12.8, flightPose.ac.z], `✈ ${state.fleetAircraftId} (${ap.id} Spot 7) · ${phTag}`, 'rgba(14,116,144,0.92)', '#FFF', 2);
      }
      // Pin each role label onto the nearest real 3D crew member (greedy, ≤ 18m) so labels never float in empty space
      const meshes = [this.crewMarshaller, this.crewWingL, this.crewWingR, this.crewHeadset, this.crewLoadmaster, this.crewFueler]
        .filter(m => m && m.visible).map(m => ({ x: m.position.x, z: m.position.z, used: false }));
      (flightPose.crew || []).forEach(cr => {
        const lbl = lang === 'ja' ? cr.labelJa : (lang === 'en' ? (cr.labelEn || cr.labelVi) : cr.labelVi);
        let best = null, bestD = 18;
        meshes.forEach(m => { const d = Math.hypot(m.x - cr.x, m.z - cr.z); if (!m.used && d < bestD) { bestD = d; best = m; } });
        if (!best) return; // no crew member there → no orphan label
        best.used = true;
        drawTag([best.x, 3.2, best.z], `🦺 ${lbl}`, cr.pin ? 'rgba(220,38,38,0.94)' : 'rgba(15,23,42,0.86)', cr.pin ? '#FEF08A' : '#E2E8F0', cr.pin ? 2 : 1);
      });
    }
    // Ground-level views (pilot, cab, crew POVs, behind-marshaller) skip far-away landmark tags so nothing covers the aircraft
    if (!['pilot', 'gse_cab', 'marshaller', 'marshal_rear', 'headset', 'loadmaster'].includes(povKind)) {
      drawTag([0, 4.5, -580], `${ap.id} RWY ${ap.rwy} (3,500m × 60m)`, 'rgba(185,28,28,0.90)', '#FFF', 2);
      drawTag([330, 92, 175], `${ap.twr} (86.75m)`, 'rgba(15,23,42,0.88)', '#FFF', 1);
      drawTag([46, 19.5, -145], '300m CENTER PIER · SKY DECK (#8–#18)', 'rgba(27,79,156,0.90)', '#FFF', 1);
      drawTag([-762, 18, 131], 'T2 LCC (#71–#80)', 'rgba(2,132,199,0.88)', '#FFF', 1);
      drawTag([-495, 24, 185], 'FLIGHT OF DREAMS', 'rgba(15,23,42,0.88)', '#FDE68A', 1);
      drawTag([712, 19, 113], 'CARGO (#101–#119)', 'rgba(71,85,105,0.88)', '#FFF', 1);
      drawTag([490, 15, 82], 'ARFF FIRE STATION', 'rgba(185,28,28,0.88)', '#FFF', 1);
      drawTag([124, 16, 860], 'CENTRAIR SKYWAY & μ-SKY RAIL', 'rgba(29,78,216,0.86)', '#FFF', 1);
      drawTag([-31, 2.2, -60], 'SERVICE LANE', 'rgba(15,23,42,0.88)', '#7DD3FC', 1);
      drawTag([-200, 7.5, -685], state.ilsRedOn ? 'ILS RED: NO ENTRY' : 'ILS ZONE (40km/h)', state.ilsRedOn ? 'rgba(220,38,38,0.92)' : 'rgba(37,99,235,0.86)', '#FFF', 1);
    }

    if (state.subtab === 'drive') {
      const sa = state.spotterAlert || {};
      if (sa.pushback) {
        drawTag([-19, 3.6, -35.5], lang === 'ja' ? '🛑 地上監視員: 停止！航空機出発中' : (lang === 'en' ? '🛑 SPOTTER: STOP! AIRCRAFT DEPARTING' : '🛑 GIÁM SÁT VIÊN: DỪNG LẠI! MÁY BAY SẮP RA'), 'rgba(220,38,38,0.95)', '#FEF08A', 2);
      }
      if (sa.service) {
        drawTag([-22.5, 3.6, -40.5], lang === 'ja' ? `🛑 監視員: 後方100m待機 (現在 ${sa.blastDist || 0}m)` : (lang === 'en' ? `🛑 SPOTTER: HOLD FOR 100m BLAST (${sa.blastDist || 0}m)` : `🛑 GIÁM SÁT VIÊN: ĐỢI CÁCH 100m (Hiện ${sa.blastDist || 0}m)`), 'rgba(220,38,38,0.95)', '#FEF08A', 2);
      }
      if (state.blastActive || sa.blast) {
        drawTag([-103, 3.6, -24], lang === 'ja' ? '🛑 監視員: #71 ブラスト注意・進入禁止！' : (lang === 'en' ? '🛑 SPOTTER: #71 JET BLAST — NO ENTRY!' : '🛑 GIÁM SÁT VIÊN: #71 LUỒNG PHẢN LỰC — CẤM VÀO!'), 'rgba(234,88,12,0.95)', '#FEF08A', 2);
      }
      if (state.yubikoshi && state.yubikoshi.timer > 0) {
        const yTxt = lang === 'ja' ? state.yubikoshi.labelJa : (lang === 'en' ? state.yubikoshi.labelEn : state.yubikoshi.labelVi);
        drawTag([state.veh.x, 3.35, state.veh.z], `👉 ${yTxt}`, 'rgba(16,185,129,0.96)', '#FFFFFF', 2);
      }
      if (state.nearbyDolly && !state.coupledDolly) {
        const dtInfo = DOLLY_TYPES[state.nearbyDolly.type] || DOLLY_TYPES.ake;
        const dName = lang === 'ja' ? dtInfo.nameJa : (lang === 'en' ? dtInfo.nameEn : dtInfo.nameVi);
        drawTag([state.nearbyDolly.x, 2.75, state.nearbyDolly.z], `[C] 🔗 ${dName} ×${state.nearbyDolly.count}`, 'rgba(37,99,235,0.94)', '#FEF08A', 2);
      }
    }

    if ((state.impactFlash || 0) > 0.02) {
      const grd = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.15, W * 0.5, H * 0.5, W * 0.65);
      grd.addColorStop(0, 'rgba(220,38,38,0)');
      grd.addColorStop(1, `rgba(220,38,38,${(state.impactFlash * 0.68).toFixed(2)})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }

    if (povKind === 'gse_cab' && state.subtab === 'drive') {
      const steerDeg = Math.round(((state.veh && state.veh.steerAngle) || 0) * 180 / Math.PI);
      const swayPct = Math.round(Math.min(100, (state.swayIntensity || 0) * 100));
      ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
      ctx.fillRect(W * 0.5 - 175, H - 38, 350, 24);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`◀ MIRROR L | CAB STEER ${steerDeg >= 0 ? '+' : ''}${steerDeg}° | SWAY ${swayPct}% | MIRROR R ▶`, W * 0.5, H - 22);
    }

    if (povKind === 'pilot') {
      ctx.strokeStyle = 'rgba(56, 232, 176, 0.84)';
      ctx.lineWidth = 1.6;
      const cy = H * 0.45;
      ctx.beginPath();
      ctx.moveTo(W * 0.36, cy); ctx.lineTo(W * 0.46, cy);
      ctx.moveTo(W * 0.54, cy); ctx.lineTo(W * 0.64, cy);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(W * 0.5, cy, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#38E8B0'; ctx.font = '700 11.5px monospace'; ctx.textAlign = 'center';
      ctx.fillText(`THREE.JS 1:1 HUD · ${state.fleetAircraftId} · ${ap.id} RWY ${ap.rwy} (3,500m)`, W * 0.5, H * 0.86);
    }

    ctx.restore();
  }

  dispose() {
    this.disposed = true;
    this.canvas.removeEventListener('click', this._onPointerDown);
    this.canvas.removeEventListener('mousemove', this._onPointerMove);
    this.renderer.dispose();
  }
}
