// Full 1:1 Chubu Centrair (NGO / RJGG) 4,370m × 1,920m Island + 3,500m × 60m Runway + Multi-Lane Airside/Flight/Skyway Traffic
import * as THREE from 'three';
import { AIRCRAFT_PROFILES } from '../data/aircraft.js';
import { A3D_AIRPORTS, A3D_SPOTS, A3D_CLOUDS, A3D_FLIGHT_PHASES, computeFlightCyclePose, computeViewpointCamera } from '../data/airports.js';
import { createDetailedAirliner3D } from './aircraftBuilder3D.js';
import {
  AIRCRAFT_3D_SPECS,
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
import {
  computeWingHuggingEraPolyline,
  buildTurnaroundGseMesh
} from './TurnaroundScene3D.js';

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
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#3C6D9E');
  g.addColorStop(0.5, '#689ECF');
  g.addColorStop(1, '#2B537B');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'rgba(255, 240, 195, 0.34)';
  ctx.fillRect(0, 40, 512, 24);
  ctx.fillRect(0, 152, 512, 24);
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
  if (kind === 'lowloader') {
    const w = opts.wide ? 3.5 : 3.0;
    addBox(w, 0.55, 8.2, 0xeef2f8, 0, 0.48, 0, 0.35, 0.4);
    addBox(0.5, 1.3, 1.3, 0x0284c7, -w * 0.46, 1.25, 2.0, 0.3, 0.4);
    const liftGroup = new THREE.Group();
    liftGroup.position.y = opts.deckY ?? 2.05;
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(w * 0.86, 0.24, 2.9), new THREE.MeshStandardMaterial({ color: 0xd7dfe9, metalness: 0.5, roughness: 0.35 }));
    bridge.position.set(0, 0, 2.5);
    liftGroup.add(bridge);
    const plat = new THREE.Mesh(new THREE.BoxGeometry(w, 0.24, 4.6), new THREE.MeshStandardMaterial({ color: 0xc8d2de, metalness: 0.5, roughness: 0.35 }));
    plat.position.set(0, 0, -1.6);
    liftGroup.add(plat);
    const railL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.68, 4.5), new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 }));
    railL.position.set(-w * 0.48, 0.44, -1.6);
    liftGroup.add(railL);
    const railR = railL.clone();
    railR.position.x = w * 0.48;
    liftGroup.add(railR);
    const uld = new THREE.Mesh(
      new THREE.BoxGeometry(opts.uldType === 'PMC' ? 2.7 : 1.9, opts.uldType === 'AKH' ? 1.15 : 1.6, 2.0),
      new THREE.MeshStandardMaterial({ color: opts.uldType === 'PMC' ? 0x3870b2 : 0xdbe4ef, metalness: 0.55, roughness: 0.28 })
    );
    uld.position.set(0, 0.72, -1.2);
    uld.castShadow = true;
    liftGroup.add(uld);
    g.add(liftGroup);
    g.userData.liftGroup = liftGroup;
    g.userData.uldMesh = uld;
    addBox(0.6, 1.4, 3.0, 0x334155, 0, 1.15, -1.6, 0.5, 0.5);
  } else if (kind === 'ramp_bus') {
    addBox(2.85, 2.75, 10.4, 0xf1f5f9, 0, 1.78, 0, 0.25, 0.3);
    addBox(2.90, 1.05, 9.4, 0x38bdf8, 0, 2.18, 0, 0.8, 0.1);
    addBox(2.88, 0.48, 10.4, opts.accent || 0x1b4f9c, 0, 1.12, 0, 0.2, 0.4);
  } else if (kind === 'patrol_suv') {
    // Yellow Airport Operations Patrol Car (黄パト / 場周道路パトロールカー)
    addBox(2.05, 0.92, 4.7, 0xfacc15, 0, 0.82, 0, 0.32, 0.35);
    addBox(1.92, 0.78, 2.45, 0xfef08a, 0, 1.58, -0.15, 0.25, 0.35);
    addBox(1.96, 0.58, 2.25, 0x38bdf8, 0, 1.58, -0.12, 0.8, 0.12);
    addBox(2.08, 0.24, 4.72, 0xffffff, 0, 0.84, 0, 0.2, 0.4);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.22, 0.38), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
    bar.position.set(0, 2.08, -0.1);
    g.add(bar);
    g.userData.beacon = bar;
  } else if (kind === 'musky_train') {
    // 4-Car Meitetsu 2000 Series "μ-SKY" Limited Express (Centrair Airport Line Blue & White!)
    for (let ci = 0; ci < 4; ci++) {
      const cz = (ci - 1.5) * 20.6;
      addBox(2.85, 3.35, 19.6, 0xf8fafc, 0, 2.35, cz, 0.3, 0.28);
      addBox(2.90, 0.95, 19.65, 0x1d4ed8, 0, 1.55, cz, 0.35, 0.3);
      addBox(2.91, 0.72, 17.8, 0x0f172a, 0, 2.65, cz, 0.8, 0.12);
      addBox(2.75, 0.35, 19.2, 0x94a3b8, 0, 4.15, cz, 0.45, 0.4);
    }
  } else if (kind === 'deice') {
    addBox(2.7, 2.2, 7.0, 0xf59e0b, 0, 1.45, 0, 0.3, 0.38);
    addBox(2.1, 1.3, 3.6, 0xf8fafc, 0, 3.1, -0.5, 0.25, 0.35);
    const boom = addBox(6.4, 0.38, 0.38, 0xea580c, 3.2, 4.6, 0, 0.4, 0.4);
    g.userData.boom = boom;
    const spray = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 6.5, 12, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.36, side: THREE.DoubleSide })
    );
    spray.rotation.z = -Math.PI / 2;
    spray.position.set(9.2, 4.3, 0);
    g.add(spray);
  } else {
    addBox(2.1, 1.25, 3.8, 0xf59e0b, 0, 0.95, 0, 0.3, 0.4);
    addBox(1.7, 1.0, 1.7, 0x93c5fd, 0, 2.0, -0.35, 0.75, 0.12);
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
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvas.addEventListener('webglcontextlost', e => e.preventDefault());

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xbcdaf5, 420, 6400);

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

    this.hemiLight = new THREE.HemisphereLight(0x8ec5fc, 0x3b4a5a, 0.88);
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
    this.apronMat = new THREE.MeshStandardMaterial({ map: this.texConcrete, roughness: 0.78, metalness: 0.06 });
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
    // Solid white No-Parallel-Driving line (並走禁止) in front of Airport Fire Station (x = 490) & Cargo entry
    addBox(68, 0.05, 0.40, 0xf8fafc, 490, 0.095, 50);
    addDecal(texNoPar, 16, 4.6, 490, 0.11, 50);
    addBox(52, 0.05, 0.40, 0xf8fafc, 155, 0.095, 50);
    addDecal(texNoPar, 14, 4.4, 155, 0.11, 50);

    // Green Pedestrian Walkway & Zebra Crosswalk at Center Pier Fixed Bridge (x = 46)
    addBox(320, 0.04, 2.6, 0x16a34a, 10, 0.095, 58.2);
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
      addDecal(texPriority, 9.5, 9.5, xCenter, 0.115, Math.max(zStart, zEnd) + 4.8);
    };
    [-31, -155, 148, -520, 520].forEach(sx => addServiceLane(sx, -76, -42));
    [-108, 148, -520, 520].forEach(sx => addServiceLane(sx, -256, -208));

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
      const halfL = halfSpan > 20 ? 23.0 : 18.5;
      const fuseR = halfSpan > 20 ? 2.6 : 1.9;

      addBox(0.50, 0.04, 62, 0xf5c818, sp.cx, 0.08, -3);
      addBox(7.2, 0.04, 0.45, 0xf5c818, sp.cx, 0.085, sp.cz + halfL - 3.5);
      addBox(5.6, 0.04, 0.32, 0xf5c818, sp.cx, 0.085, sp.cz + halfL - 5.5);
      addBox(3.4, 0.04, 0.28, 0xf8fafc, sp.cx, 0.085, sp.cz - 8.5);

      const sTex = makeStandBadgeTexture(sp.ngoNo);
      const sPlate = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 4.4), new THREE.MeshStandardMaterial({ map: sTex, roughness: 0.7 }));
      sPlate.rotation.x = -Math.PI / 2;
      sPlate.position.set(sp.cx, 0.09, sp.cz + halfL + 9.2);
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
      const worldPts = localPts.map(([lx, lz]) => [sp.cx + lx, sp.cz + lz]);

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
      addDashedBox(sp.cx - (wingW - 0.5), sp.cz + halfL * 0.45, sp.cx - (bodyW + 1.8), sp.cz + halfL + 6.5);
      addDashedBox(sp.cx - (wingW - 0.5), sp.cz - (halfL + 3.5), sp.cx - (bodyW + 1.8), sp.cz - 12.5);
    });

    // Helper for painted stand badges & lead-in lines across T1 Wings, Center Pier, T2, Remote & Cargo!
    const addStandMark = (sx, sz, no, rotY = 0, lineLen = 36) => {
      addDecal(makeStandBadgeTexture(no), 7.0, 4.2, sx, 0.10, sz, rotY);
      const dz = rotY === 0 ? -lineLen * 0.5 : 0;
      const dx = rotY !== 0 ? (rotY > 0 ? -lineLen * 0.5 : lineLen * 0.5) : 0;
      const ln = addBox(rotY === 0 ? 0.45 : lineLen, 0.04, rotY === 0 ? lineLen : 0.45, 0xf5c818, sx + dx, 0.08, sz + dz);
      return ln;
    };

    // Center Pier Stands (#8, #9, #10 on North +X side; #11, #12, #13 on South -X side)
    [[92, -35, '8', -Math.PI / 2], [92, -95, '9', -Math.PI / 2], [92, -152, '10', -Math.PI / 2],
     [0, -95, '12', Math.PI / 2], [0, -152, '13', Math.PI / 2]].forEach(([sx, sz, no, ry]) => addStandMark(sx, sz, no, ry, 28));

    // T1 North Domestic (#2-#5) & T1 South International (#16-#24)
    [[210, 28, '5'], [285, 28, '4'], [360, 28, '3'], [420, 28, '2'],
     [-185, 28, '16'], [-265, 28, '19'], [-345, 28, '22'], [-415, 28, '24']].forEach(([sx, sz, no]) => addStandMark(sx, sz, no, 0, 42));

    // Remote Stands (#201-#206 North, #301-#601 South)
    [[230, -110, '201'], [315, -110, '203'], [405, -110, '206'],
     [-260, -110, '301'], [-380, -110, '303'], [-560, -110, '401'], [-740, -110, '501'], [-910, -110, '601']].forEach(([rx, rz, no]) => {
      addStandMark(rx, rz, no, 0, 46);
    });

    // North Cargo Freighter Stands (#101-#119)
    [[575, 22, '101'], [665, 22, '103'], [765, 22, '105'], [875, 22, '107'],
     [990, 22, '109'], [1110, 22, '112'], [1235, 22, '115'], [1365, 22, '119']].forEach(([cx, cz, no]) => {
      addStandMark(cx, cz, no, 0, 54);
    });

    // 9. ALL 1:1 ARCHITECTURE & DISTRICTS (100% ALIGNED WITH A3D_OBSTACLES!)
    this.glassMat = new THREE.MeshPhysicalMaterial({ map: this.texGlass, roughness: 0.14, metalness: 0.72, clearcoat: 1.0, emissive: new THREE.Color(0x000000) });

    // 9A. Terminal 1 Main Building ([-165..185, 68..175]) + North Wing ([185..430, 66..112]) + South Wing ([-435..-165, 66..112])
    addBox(350, 4.5, 107, 0xdbe3ee, 10, 2.25, 121.5);
    const t1Glass = new THREE.Mesh(new THREE.BoxGeometry(344, 14.5, 101), this.glassMat);
    t1Glass.position.set(10, 11.75, 121.5);
    t1Glass.castShadow = true;
    this.staticGroup.add(t1Glass);
    addBox(362, 2.6, 113, 0x1b4f9c, 10, 20.3, 121.5, { metalness: 0.38, roughness: 0.32 });

    // T1 North Domestic Wing & T1 South International Wing
    [[307.5, 89, 245, 46], [-300, 89, 270, 46]].forEach(([wx, wz, ww, wd]) => {
      addBox(ww, 3.6, wd, 0xdbe3ee, wx, 1.8, wz);
      const wg = new THREE.Mesh(new THREE.BoxGeometry(ww - 4, 10.4, wd - 4), this.glassMat);
      wg.position.set(wx, 8.8, wz);
      wg.castShadow = true;
      this.staticGroup.add(wg);
      addBox(ww + 4, 1.9, wd + 4, 0x1b4f9c, wx, 14.9, wz, { metalness: 0.35 });
    });

    // 9B. Iconic 300m T1 Center Pier (センターピア: x ∈ [28, 64], z = +68 out to z = -180 — exact 400.0m from RWY 36/18!)
    //     + Elevated 3.8m-Clearance Fixed Bridge across z = 50 GSE Spine Road + Rooftop Wooden Sky Deck!
    const pierBridge = new THREE.Mesh(new THREE.BoxGeometry(34, 8.8, 28), this.glassMat);
    pierBridge.position.set(46, 9.2, 54); // Bottom at y = 4.8m (>3.8m clearance sign!)
    pierBridge.castShadow = true;
    this.staticGroup.add(pierBridge);
    addBox(36, 1.4, 30, 0x1b4f9c, 46, 14.3, 54, { metalness: 0.35 });
    addBox(36.2, 0.85, 1.1, 0xfacc15, 46, 4.35, 43.2);
    addBox(36.2, 0.85, 1.1, 0xfacc15, 46, 4.35, 56.8);
    addDecal(texH38, 12, 3.4, 46, 0.11, 50);
    addDecal(texStop, 8.5, 3.4, 46, 0.11, 39.5);

    // 220m Main Finger of the 300m Center Pier (x ∈ [28, 64], z ∈ [-180, +40])
    addBox(36, 4.0, 220, 0xdbe3ee, 46, 2.0, -70);
    const pierBody = new THREE.Mesh(new THREE.BoxGeometry(34.5, 9.6, 218), this.glassMat);
    pierBody.position.set(46, 8.8, -70);
    pierBody.castShadow = true;
    this.staticGroup.add(pierBody);
    addBox(36.8, 1.4, 221, 0x1b4f9c, 46, 14.3, -70, { metalness: 0.35 });
    // Famous 300m Centrair Wooden Sky Deck (スカイデッキ) along the roof out to z = -178m!
    addBox(16, 0.65, 238, 0xa8764c, 46, 15.3, -58, { roughness: 0.78 });
    addBox(0.35, 1.2, 238, 0xe2e8f0, 38.2, 16.2, -58, { metalness: 0.6 });
    addBox(0.35, 1.2, 238, 0xe2e8f0, 53.8, 16.2, -58, { metalness: 0.6 });
    addBox(16, 1.2, 0.35, 0xe2e8f0, 46, 16.2, -177, { metalness: 0.6 });

    // Fixed Passenger Bridges & Rotundas for Spot 6 (-48), Spot 7 (+21), and Spot 14 (+122)
    const addPortPier = (rotX, rotZ1, rotZ2) => {
      const zEnd = Math.min(rotZ1, rotZ2 || rotZ1);
      const len = 68 - zEnd;
      const pier = new THREE.Mesh(new THREE.BoxGeometry(3.8, 3.2, len), this.glassMat);
      pier.position.set(rotX, 5.8, zEnd + len * 0.5);
      pier.castShadow = true;
      this.staticGroup.add(pier);
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
    addPortPier(-48, 21.5, null);
    addPortPier(21, 21.5, null);
    addPortPier(122, 23.5, 13.5);

    [[-34, -38], [20, -38], [-145, -38], [-570, 42]].forEach(([ex, ez]) => {
      addDecal(texPriority, 7.2, 7.2, ex, 0.11, ez);
    });

    // 9C. 86.75m Chubu ATC Control Tower ([-158..-134, 215..239], center = -146, 227)
    //     Camera POV sits at [-146, 82.5, 224]; FrontSide glass cylinder (r=6.8) lets camera look out unobstructed!
    addBox(24, 10, 24, 0xd2dae4, -146, 5.0, 227);
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 7.2, 68, 16),
      new THREE.MeshStandardMaterial({ color: 0xeef2f7, roughness: 0.38 })
    );
    shaft.position.set(-146, 44.0, 227);
    shaft.castShadow = true;
    this.staticGroup.add(shaft);
    const cab = new THREE.Mesh(
      new THREE.CylinderGeometry(8.2, 6.2, 7.2, 12),
      new THREE.MeshPhysicalMaterial({ color: 0x1e4e79, roughness: 0.12, metalness: 0.78, clearcoat: 1.0, side: THREE.FrontSide })
    );
    cab.position.set(-146, 81.6, 227);
    this.staticGroup.add(cab);
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 8.8, 2.0, 12),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 })
    );
    cap.position.set(-146, 86.2, 227);
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

    // Cargo Warehouses 1 & 2 ([545..880, 72..155]) & International Cargo Warehouse 3 ([910..1290, 72..155])
    addBox(335, 14.5, 83, 0xcbd5e1, 712.5, 7.25, 113.5);
    addBox(339, 2.0, 86, 0x334155, 712.5, 15.5, 113.5);
    addBox(380, 14.5, 83, 0xd6dee8, 1100, 7.25, 113.5);
    addBox(384, 2.0, 86, 0x1e3a5f, 1100, 15.5, 113.5);

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
    // 1. Primary Interactive Neighbor Stands: Spot 6 (-68, 10: JAL B738) & Spot 14 (98, 10: ANA B788 — clear of 300m Pier at x=46!)
    this.spot6Ac = createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.B738.visual3d, liveryId: 'JAL' });
    this.spot6Ac.position.set(-68, 0, 10);
    this.dynamicGroup.add(this.spot6Ac);

    this.spot14Ac = createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.B788.visual3d, liveryId: 'ANA' });
    this.spot14Ac.position.set(98, 0, 10);
    this.dynamicGroup.add(this.spot14Ac);

    this.spot6Pbb = this.createPbbMesh(-48, -65.9, 21.5, 3.6);
    this.dynamicGroup.add(this.spot6Pbb);
    this.spot14Pbb1 = this.createPbbMesh(122, 101.0, 23.5, 4.4);
    this.spot14Pbb2 = this.createPbbMesh(122, 101.0, 13.5, 4.4);
    this.dynamicGroup.add(this.spot14Pbb1, this.spot14Pbb2);

    const b14a = createGseMesh('lowloader', { wide: true, uldType: 'AKE', deckY: 2.4 });
    b14a.position.set(89.4, 0, 20.0); b14a.rotation.y = Math.PI / 2;
    const b14b = createGseMesh('lowloader', { wide: true, uldType: 'PMC', deckY: 2.4 });
    b14b.position.set(89.4, 0, -3.0); b14b.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(b14a, b14b);

    // 1B. Scale-Authentic Parked Fleet Across the 4.37km Island (T1 Wings, 300m Center Pier, T2 LCC, Remote #200/#300 & North Cargo #103/#109!)
    this.parkedFleetGroup = new THREE.Group();
    if (!this.compact) {
      [
        { prof: 'B738', liveryId: 'ANA', x: 360, z: 12, yaw: 0 },              // T1 North Domestic #3
        { prof: 'B788', liveryId: 'ANA', x: 96, z: -95, yaw: -Math.PI / 2 },   // 300m Center Pier #9
        { prof: 'B788', liveryId: 'JAL', x: -6, z: -152, yaw: Math.PI / 2 },   // 300m Center Pier #13
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
        const ac = createDetailedAirliner3D({ ...(p.visual3d || {}), liveryId: cfg.liveryId });
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
    this.radarBar.position.set(-146, 88.2, 227);
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
      addT('twyAJet', createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.B788.visual3d, liveryId: 'JAL' }));
      addT('twyCJet', createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.A320.visual3d, liveryId: 'ANA' }));
      addT('bayJet', createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.B738.visual3d, liveryId: 'ANA' }));

      // 2.8km GSE Spine Road Multi-Lane Left-Hand Traffic (z = 52.6 Eastbound +X & z = 47.4 Westbound -X)
      addT('spineBusE1', createGseMesh('ramp_bus', { accent: 0x1b4f9c }));
      addT('spineBusE2', createGseMesh('ramp_bus', { accent: 0x0284c7 }));
      addT('spineDollyE1', buildTurnaroundGseMesh('dolly_train', 1.0));
      addT('spineDollyE2', buildTurnaroundGseMesh('dolly_train', 1.0));
      addT('spineCatE', buildTurnaroundGseMesh('catering', 3.2));

      addT('spineBusW1', createGseMesh('ramp_bus', { accent: 0xdc2626 }));
      addT('spineFuelW', buildTurnaroundGseMesh('fuel', 2.5));
      addT('spineDollyW1', buildTurnaroundGseMesh('dolly_train', 1.0));
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

    // 4. Player Drivable Open-Cab TT + 6 Towed Carts + Long Semi-Trailer + BAY 01 Dock (at 218, 26)
    this.playerVeh = createOpenCabTowingTractor3D();
    this.dynamicGroup.add(this.playerVeh);
    this.towedCarts = [];
    for (let ci = 0; ci < 6; ci++) {
      const cart = createBaggageCart3D(ci);
      cart.visible = false;
      this.dynamicGroup.add(cart);
      this.towedCarts.push(cart);
    }

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
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xf8fbff, roughness: 0.95, transparent: true, opacity: 0.85 });
    A3D_CLOUDS.forEach((cl, ci) => {
      const cGrp = new THREE.Group();
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(cl.sx * 0.34, 10, 8), cloudMat);
      s1.scale.set(1.6, 0.38, 0.85);
      const s2 = s1.clone(); s2.position.set(-cl.sx * 0.25, 4.5, 8); s2.scale.set(1.1, 0.35, 0.7);
      const s3 = s1.clone(); s3.position.set(cl.sx * 0.24, 3.2, -6); s3.scale.set(1.0, 0.32, 0.65);
      cGrp.add(s1, s2, s3);
      cGrp.position.set(cl.x, cl.y + (ci % 2) * 18, cl.z);
      cGrp.userData = { base: cl };
      this.cloudGroup.add(cGrp);
    });
    this.dynamicGroup.add(this.cloudGroup);

    this.setActiveFleetAircraft('A320');
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
    if (acId !== 'DHC8' && acId !== 'B77F') {
      const resolved = resolveAircraft3DType(acId);
      const spec = AIRCRAFT_3D_SPECS[resolved];
      this.activeAc = createProceduralAirliner3D(acId, liveryId);
      const s = (resolved === 'B77W') ? 0.72 : (resolved === 'B789' ? 0.78 : 0.90);
      this.activeAc.scale.setScalar(s);
      this.activeBlastZone = createJetBlastHazardZone3D(spec);
      this.activeBlastZone.visible = false;
      this.activeAc.add(this.activeBlastZone);
    } else {
      const prof = AIRCRAFT_PROFILES[acId] || AIRCRAFT_PROFILES.A320;
      this.activeAc = createDetailedAirliner3D({ ...(prof.visual3d || {}), liveryId });
      this.activeBlastZone = createJetBlastHazardZone3D(AIRCRAFT_3D_SPECS.B789);
      this.activeBlastZone.visible = false;
      this.activeAc.add(this.activeBlastZone);
    }
    this.activeAc.position.set(0, 0, 10);
    this.dynamicGroup.add(this.activeAc);
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
    const ph = state.flightPhaseIdx;
    const p = state.flightProgress || 0;

    const stage = (mesh, x, z, yaw) => {
      mesh.visible = !this.compact;
      mesh.position.set(x, 0, z);
      mesh.rotation.y = yaw;
    };

    stage(this.spot7Gpu, -17.5, 34.5, Math.PI * 0.5);
    stage(this.spot7Catering, -20.5, 30.5, 0);
    stage(this.spot7DollyTrain, -20.0, 21.5, 0);
    stage(this.spot7Belt, -17.8, -10.5, Math.PI / 2);
    stage(this.spot7BeltTractor, -21.2, -13.5, 0);
    stage(this.spot7Hydrant, -18.2, -17.5, 0);
    stage(this.spot7Lav, -15.2, -18.5, Math.PI / 2);
    stage(this.spot7Water, 16.5, -14.5, -Math.PI / 2);
    stage(this.spot7Tug, 14.5, 36.5, -Math.PI / 2);

    const gpuUd = this.spot7Gpu.userData;
    const catUd = this.spot7Catering.userData;
    const beltUd = this.spot7Belt.userData;
    const fuelUd = this.spot7Hydrant.userData;
    const lavUd = this.spot7Lav.userData;
    const watUd = this.spot7Water.userData;
    const tugUd = this.spot7Tug.userData;

    if (gpuUd.cableGrp) gpuUd.cableGrp.visible = false;
    if (catUd.vanGroup) catUd.vanGroup.position.y = catUd.restY;
    if (catUd.outriggers) catUd.outriggers.forEach(o => { o.group.visible = false; });
    if (beltUd.boomGroup) beltUd.boomGroup.rotation.x = -beltUd.restAng;
    if (beltUd.bags) beltUd.bags.forEach(b => { b.visible = false; });
    if (fuelUd.fuelHookups) fuelUd.fuelHookups.visible = false;
    if (fuelUd.liftDeck) fuelUd.liftDeck.position.y = 1.55;
    if (lavUd.serviceHose) lavUd.serviceHose.visible = false;
    if (watUd.serviceHose) watUd.serviceHose.visible = false;

    if (this.compact) {
      this.spot7Loader.position.set(-6.4, 0, 18.5);
      this.spot7Loader.rotation.y = Math.PI / 2;
      return { cargoOpen: false, galleyOpen: false };
    }

    if (isOps3d) {
      const ho = state.handsOn;
      this.spot7Loader.visible = true;
      this.spot7Loader.position.set(-6.4, 0, 18.5);
      this.spot7Loader.rotation.y = Math.PI / 2;
      this.spot7Loader.userData.liftGroup.position.y = 0.65 + ho.loaderH * 1.45;
      this.spot7Loader.userData.uldMesh.position.z = ho.uldLoaded ? 3.8 : -1.2;
      if (!ho.beaconOn && ho.chocksOn) {
        stage(this.spot7Gpu, -5.4, 26.2, Math.PI * 0.35);
        if (gpuUd.cableGrp) gpuUd.cableGrp.visible = true;
      }
      return { cargoOpen: ho.loaderH > 0.2, galleyOpen: false };
    }

    if (!isFlight) {
      const drvSc = state.ngoLiveAc || null;
      const isDep = drvSc && (drvSc.mode === 'pushback' || drvSc.mode === 'taxi_cross' || drvSc.mode === 'runup');
      if (!isDep) {
        this.spot7Loader.visible = true;
        this.spot7Loader.position.set(-6.4, 0, 18.5);
        this.spot7Loader.rotation.y = Math.PI / 2;
        stage(this.spot7Gpu, -5.4, 26.2, Math.PI * 0.35);
        if (gpuUd.cableGrp) gpuUd.cableGrp.visible = true;
        stage(this.spot7Belt, -5.8, -6.2, Math.PI / 2);
      } else {
        this.spot7Loader.position.set(-18.5, 0, 22.0);
        this.spot7Loader.rotation.y = Math.PI / 2;
        if (drvSc.mode === 'pushback' && flightPose === null) {
          const noseX = drvSc.x + Math.cos(drvSc.heading) * 20.5;
          const noseZ = drvSc.z + Math.sin(drvSc.heading) * 20.5;
          stage(this.spot7Tug, noseX, noseZ, Math.PI / 2 - (drvSc.heading + Math.PI));
        }
      }
      return { cargoOpen: !isDep, galleyOpen: false };
    }

    let cargoOpen = false, galleyOpen = false;
    this.spot7Loader.visible = true;

    if (ph <= 1 || ph >= 9) {
      this.spot7Loader.position.set(-18.5, 0, 22.0);
      this.spot7Loader.rotation.y = Math.PI / 2;
      this.spot7Loader.userData.liftGroup.position.y = 0.85;
      this.spot7Loader.userData.uldMesh.position.z = -1.2;
    } else if (ph === 2) {
      const app = Math.min(1, p * 1.6);
      stage(this.spot7Gpu, lerp(-17.5, -5.4, app), lerp(34.5, 26.2, app), Math.PI * 0.35);
      if (gpuUd.cableGrp) gpuUd.cableGrp.visible = app >= 0.95;
      this.spot7Loader.position.set(-18.5, 0, 22.0);
    } else if (ph === 3 || ph === 5) {
      cargoOpen = true;
      const app = ph === 3 ? Math.min(1, p * 2.0) : 1.0;
      stage(this.spot7Gpu, -5.4, 26.2, Math.PI * 0.35);
      if (gpuUd.cableGrp) gpuUd.cableGrp.visible = true;

      this.spot7Loader.position.set(lerp(-18.5, -6.4, app), 0, 18.5);
      this.spot7Loader.rotation.y = Math.PI / 2;
      const cyc = (tSec * 0.28) % 1.0;
      const liftFrac = cyc < 0.45 ? (cyc / 0.45) : (cyc < 0.7 ? 1.0 : Math.max(0, 1 - (cyc - 0.7) / 0.3));
      this.spot7Loader.userData.liftGroup.position.y = app >= 0.95 ? (0.72 + liftFrac * 1.45) : 0.85;
      this.spot7Loader.userData.uldMesh.position.z = (app >= 0.95 && cyc >= 0.42 && cyc < 0.72)
        ? (ph === 5 ? (-1.2 + ((cyc - 0.42) / 0.3) * 4.2) : (3.0 - ((cyc - 0.42) / 0.3) * 4.2))
        : -1.2;

      stage(this.spot7DollyTrain, lerp(-20.0, -12.8, app), 18.0, 0);
      stage(this.spot7Belt, lerp(-17.8, -5.8, app), -6.2, Math.PI / 2);
      stage(this.spot7BeltTractor, lerp(-21.2, -12.0, app), -6.8, 0);
      if (app >= 0.92 && beltUd.boomGroup) {
        beltUd.boomGroup.rotation.x = -beltUd.dockAng;
        const dir = ph === 5 ? 1 : -1;
        beltUd.bags.forEach((b, bi) => {
          b.visible = true;
          const u = ((bi * 0.25 + tSec * 0.28 * dir) % 1.0 + 1.0) % 1.0;
          b.position.z = 0.55 + u * (beltUd.boomLen - 1.1);
        });
      }
    } else if (ph === 4) {
      cargoOpen = true;
      galleyOpen = true;
      const app = Math.min(1, p * 2.0);
      stage(this.spot7Gpu, -5.4, 26.2, Math.PI * 0.35);
      if (gpuUd.cableGrp) gpuUd.cableGrp.visible = true;

      this.spot7Loader.position.set(-6.4, 0, 18.5);
      this.spot7Loader.rotation.y = Math.PI / 2;
      this.spot7Loader.userData.liftGroup.position.y = 2.10;

      stage(this.spot7Catering, lerp(-20.5, -5.6, app), 22.8, Math.PI / 2);
      if (app >= 0.92 && catUd.vanGroup) {
        const liftAmt = Math.min(1, (p - 0.45) * 2.5);
        catUd.vanGroup.position.y = lerp(catUd.restY, catUd.dockFloorY, liftAmt);
        catUd.scissorPivot.scale.y = Math.max(0.3, catUd.vanGroup.position.y - 0.92);
        catUd.outriggers.forEach(o => { o.group.visible = true; o.group.scale.x = 1.0; });
      }

      stage(this.spot7Hydrant, lerp(-18.2, -10.5, app), lerp(-17.5, 8.8, app), 0);
      if (app >= 0.92 && fuelUd.fuelHookups) {
        fuelUd.fuelHookups.visible = true;
        fuelUd.liftDeck.position.y = fuelUd.dockDeckY;
      }

      stage(this.spot7Lav, lerp(-15.2, -5.4, app), -10.2, Math.PI / 2);
      if (app >= 0.92 && lavUd.serviceHose) { lavUd.serviceHose.visible = true; lavUd.serviceLift.position.y = lavUd.dockLiftY; }

      stage(this.spot7Water, lerp(16.5, 5.6, app), -7.8, -Math.PI / 2);
      if (app >= 0.92 && watUd.serviceHose) { watUd.serviceHose.visible = true; watUd.serviceLift.position.y = watUd.dockLiftY; }
    } else if (ph === 6) {
      stage(this.spot7Gpu, lerp(-5.4, -17.5, p), lerp(26.2, 34.5, p), Math.PI * 0.5);
      this.spot7Loader.position.set(lerp(-6.4, -18.5, p), 0, lerp(18.5, 22.0, p));
      this.spot7Loader.userData.liftGroup.position.y = 0.85;
      stage(this.spot7Belt, lerp(-5.8, -17.8, p), lerp(-6.2, -10.5, p), Math.PI / 2);
      stage(this.spot7Tug, lerp(14.5, 0, Math.min(1, p * 1.4)), lerp(36.5, 31.2, p), Math.PI);
    } else if (ph === 7 && flightPose) {
      this.spot7Loader.position.set(-18.5, 0, 22.0);
      const ac = flightPose.ac;
      const noseX = ac.x + Math.cos(ac.heading) * 21.2;
      const noseZ = ac.z + Math.sin(ac.heading) * 21.2;
      stage(this.spot7Tug, noseX, noseZ, Math.PI / 2 - (ac.heading + Math.PI));
      if (tugUd.beacon) tugUd.beacon.visible = Math.floor(tSec * 4.5) % 2 === 0;
    } else if (ph === 8) {
      this.spot7Loader.position.set(-18.5, 0, 22.0);
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

    if (!isFlight) {
      this.crewMarshaller.position.set(0, 0, 33.0);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || (acPose.beaconOn ? 'm_stop' : 'm_chocks'), tSec);

      this.crewWingL.position.set(22.2, 0, 8.5);
      this.crewWingL.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingL, 'watchman_clear', tSec);

      this.crewWingR.position.set(-22.2, 0, 8.5);
      this.crewWingR.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingR, 'watchman_clear', tSec);

      this.crewHeadset.position.set(-5.2, 0, 24.5);
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
      this.crewMarshaller.position.set(11.5, 0, 36.5);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_stop', tSec);

      this.crewWingL.position.set(15.5, 0, 35.5);
      this.crewWingL.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingL, 'm_stop', tSec);

      this.crewWingR.position.set(-15.5, 0, 35.5);
      this.crewWingR.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingR, 'm_stop', tSec);

      this.crewHeadset.position.set(-12.5, 0, 36.5);
      this.crewHeadset.rotation.y = Math.PI;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);
    } else if (ph === 1) {
      this.crewMarshaller.position.set(0, 0, 33.5);
      this.crewMarshaller.rotation.y = Math.PI;
      const mSig = demoSig || (p < 0.72 ? 'm_straight' : (p < 0.92 ? 'm_slow' : 'm_stop'));
      animateCrewSignal(this.crewMarshaller, mSig, tSec);

      this.crewWingL.position.set(22.5, 0, 8.0);
      this.crewWingL.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingL, 'watchman_clear', tSec);

      this.crewWingR.position.set(-22.5, 0, 8.0);
      this.crewWingR.rotation.y = Math.PI;
      animateCrewSignal(this.crewWingR, 'watchman_clear', tSec);

      this.crewHeadset.position.set(-13.5, 0, 35.5);
      this.crewHeadset.rotation.y = Math.PI * 0.75;
      animateCrewSignal(this.crewHeadset, 'm_stop', tSec);
    } else if (ph === 2) {
      this.crewMarshaller.position.set(0, 0, 33.5);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_chocks', tSec);

      this.crewHeadset.position.set(-3.2, 0, 24.8);
      this.crewHeadset.rotation.y = Math.PI * 0.55;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewWingL.position.set(12.0, 0, 23.5);
      this.crewWingL.rotation.y = -Math.PI * 0.5;
      animateCrewSignal(this.crewWingL, 'point_and_call', tSec);

      this.crewWingR.position.set(-8.5, 0, 26.5);
      this.crewWingR.rotation.y = Math.PI * 0.4;
      animateCrewSignal(this.crewWingR, 'guideman_beckon', tSec);
    } else if (ph >= 3 && ph <= 5) {
      this.crewMarshaller.position.set(12.5, 0, 25.5);
      this.crewMarshaller.rotation.y = -Math.PI * 0.5;
      animateCrewSignal(this.crewMarshaller, demoSig || 'point_and_call', tSec);

      this.crewHeadset.position.set(-4.2, 0, 25.5);
      this.crewHeadset.rotation.y = Math.PI * 0.45;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewWingL.position.set(8.5, 0, -6.5);
      this.crewWingL.rotation.y = -Math.PI * 0.65;
      animateCrewSignal(this.crewWingL, ph === 4 ? 'point_and_call' : 'spotter_clear', tSec);

      this.crewWingR.position.set(-9.5, 0, ph === 4 ? 25.5 : 21.8);
      this.crewWingR.rotation.y = -Math.PI * 0.75;
      animateCrewSignal(this.crewWingR, p < 0.45 ? 'guideman_beckon' : 'point_and_call', tSec);

      this.crewLoadmaster.visible = (ph === 3 || ph === 5);
      this.crewLoadmaster.position.set(-12.2, 0, 12.8);
      this.crewLoadmaster.rotation.y = Math.PI * 0.42;
      animateCrewSignal(this.crewLoadmaster, 'point_and_call', tSec);

      this.crewFueler.visible = (ph === 4);
      this.crewFueler.position.set(-13.4, 0, 9.2);
      this.crewFueler.rotation.y = Math.PI * 0.45;
      animateCrewSignal(this.crewFueler, 'point_and_call', tSec);
    } else if (ph === 6) {
      const ang = p * Math.PI * 1.4;
      this.crewHeadset.position.set(-Math.cos(ang) * 6.5, 0, 14 + Math.sin(ang) * 14);
      this.crewHeadset.rotation.y = Math.atan2(this.crewHeadset.position.x, 10 - this.crewHeadset.position.z);
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewMarshaller.position.set(13.5, 0, 34.5);
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_allclear', tSec);
      this.crewWingL.position.set(22.5, 0, 8.0);
      animateCrewSignal(this.crewWingL, 'watchman_clear', tSec);
      this.crewWingR.position.set(-22.5, 0, 8.0);
      animateCrewSignal(this.crewWingR, 'watchman_clear', tSec);
    } else if (ph === 7 && flightPose) {
      const ac = flightPose.ac;
      const yaw3d = Math.PI / 2 - ac.heading;
      const noseX = ac.x + Math.cos(ac.heading) * 19.5;
      const noseZ = ac.z + Math.sin(ac.heading) * 19.5;
      const portDX = -Math.sin(ac.heading), portDZ = Math.cos(ac.heading);

      this.crewHeadset.position.set(noseX + portDX * 5.2, 0, noseZ + portDZ * 5.2);
      this.crewHeadset.rotation.y = yaw3d + Math.PI;
      animateCrewSignal(this.crewHeadset, 'walk_escort', tSec);

      this.crewWingL.position.set(ac.x + portDX * 21.5, 0, ac.z + portDZ * 21.5);
      this.crewWingL.rotation.y = yaw3d + Math.PI;
      animateCrewSignal(this.crewWingL, 'walk_escort', tSec);

      this.crewWingR.position.set(ac.x - portDX * 21.5, 0, ac.z - portDZ * 21.5);
      this.crewWingR.rotation.y = yaw3d + Math.PI;
      animateCrewSignal(this.crewWingR, 'walk_escort', tSec);

      this.crewMarshaller.position.set(-14.0, 0, -39.5);
      this.crewMarshaller.rotation.y = Math.PI;
      animateCrewSignal(this.crewMarshaller, demoSig || 'm_allclear', tSec);
    } else if (ph === 8) {
      this.crewHeadset.position.set(-29.0, 0, -53.0);
      this.crewHeadset.rotation.y = Math.atan2(acPose.x - (-29.0), acPose.z - (-53.0));
      animateCrewSignal(this.crewHeadset, p < 0.32 ? 'bypass_pin_salute' : 'wave_off', tSec);

      this.crewLoadmaster.visible = true;
      [
        [this.crewMarshaller, -16.0, -40.5],
        [this.crewLoadmaster, -19.0, -40.5],
        [this.crewWingL,      -22.0, -40.5],
        [this.crewWingR,      -25.0, -40.5]
      ].forEach(([cr, cx, cz]) => {
        cr.position.set(cx, 0, cz);
        cr.rotation.y = Math.atan2(acPose.x - cx, acPose.z - cz);
        animateCrewSignal(cr, 'wave_off', tSec);
      });
    } else {
      this.crewMarshaller.position.set(11.5, 0, 36.5);
      animateCrewSignal(this.crewMarshaller, demoSig || 'wave_off', tSec);
      this.crewHeadset.position.set(-12.5, 0, 36.5);
      animateCrewSignal(this.crewHeadset, 'wave_off', tSec);
      this.crewWingL.position.set(15.5, 0, 35.5);
      animateCrewSignal(this.crewWingL, 'wave_off', tSec);
      this.crewWingR.position.set(-15.5, 0, 35.5);
      animateCrewSignal(this.crewWingR, 'wave_off', tSec);
    }
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
    this.hemiLight.intensity = isNight ? 0.35 : (isSunset ? 0.65 : 0.9);
    if (this.glassMat) this.glassMat.emissive.setHex(isNight ? 0x403214 : (isSunset ? 0x261808 : 0x000000));
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

    let acPose = { x: 0, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: false };
    if (this.compact) {
      const tipPitch = wbConseq && wbConseq.stressFlags.tailTip ? -0.22 : (wbConseq && wbConseq.stressFlags.noseHeavy ? 0.08 : 0);
      acPose = { x: 0, y: tipPitch < -0.1 ? 0.35 : 0, z: 10, heading: Math.PI / 2, pitch: tipPitch, beaconOn: false };
      this.updatePbbExt(this.spot7Pbb, prof.isFreighter ? 0 : 1);
      this.chocksGroup.visible = true;
      this.conesGroup.visible = true;
      this.playerVeh.visible = false;
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
      this.tipRing.visible = Boolean(wbConseq && wbConseq.stressFlags.tailTip);
    } else if (isOps3d) {
      const ho = state.handsOn;
      acPose = { x: 0, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: ho.beaconOn };
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
      this.playerVeh.visible = state.camMode !== 'gse_cab';
      this.playerVeh.position.set(state.veh.x, 0, state.veh.z);
      this.playerVeh.rotation.y = Math.PI / 2 - state.veh.heading;

      const ud = this.playerVeh.userData || {};
      if (ud.frontPivots) ud.frontPivots.forEach(p => { p.rotation.y = -(state.veh.steerAngle || 0); });
      if (ud.steerWheel) ud.steerWheel.rotation.z = -(state.veh.steerAngle || 0) * 3.2;
      if (ud.allWheels) ud.allWheels.forEach(w => { w.rotation.x += (state.veh.speed || 0) * 0.055; });
      if (ud.beaconHalo) ud.beaconHalo.visible = beaconBlink;
      if (ud.highMast) ud.highMast.visible = state.ngoVehMode === 'high38';

      const isBackingMode = state.ngoDriveScenario === 'SC5' || state.ngoVehMode === 'backing';
      if (this.backingBayGroup) {
        this.backingBayGroup.visible = isBackingMode;
        if (isBackingMode && this.backingBayBorderMat) {
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
      const showCarts = !isBackingMode && state.ngoVehMode === 'towing' && Array.isArray(state.cartPoses);
      this.towedCarts.forEach((cart, ci) => {
        if (showCarts && state.cartPoses[ci]) {
          cart.visible = true;
          cart.position.set(state.cartPoses[ci].x, 0, state.cartPoses[ci].z);
          cart.rotation.y = Math.PI / 2 - state.cartPoses[ci].heading;
        } else {
          cart.visible = false;
        }
      });

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
      this.towedCarts.forEach(c => { c.visible = false; });
      if (this.longSemiTrailer) this.longSemiTrailer.visible = false;
      if (this.backingBayGroup) this.backingBayGroup.visible = false;
      if (this.impactRing) this.impactRing.visible = false;
    }

    // Dynamic Directional Shadow-Map Tracking across the entire 4.37km Island!
    const focusX = isFlight ? acPose.x : (state.subtab === 'drive' ? state.veh.x : 0);
    const focusZ = isFlight ? acPose.z : (state.subtab === 'drive' ? state.veh.z : 10);
    this.sunLight.target.position.set(focusX, 0, focusZ);
    this.sunLight.position.set(focusX + sunDirOff[0], sunDirOff[1], focusZ + sunDirOff[2]);

    const doorFlags = this._animateSpot7GseFleet(isFlight, isOps3d, state, flightPose, tSec);
    this._animateGroundCrewChoreography(isFlight, isOps3d, state, flightPose, acPose, tSec);

    this.activeAc.position.set(acPose.x, acPose.y, acPose.z);
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
      targetCam = { pos: [Math.cos(ang) * 34 - 6, 12.5, 10 + Math.sin(ang) * 32], target: [0, 3.8, 10], fov: 44, povKind: 'compact' };
    } else {
      const isBack = state.ngoDriveScenario === 'SC5' || state.ngoVehMode === 'backing';
      const camExtra = {
        driveZoom: state.driveZoom || 1.0,
        backingBay: isBack ? (state.backingBay || { cx: 218, cz: 26 }) : null,
        trailerPose: isBack && Array.isArray(state.cartPoses) && state.cartPoses[0] ? state.cartPoses[0] : state.veh
      };
      targetCam = computeViewpointCamera(state.camMode, isFlight, flightPose, state.veh, state.cam, state.flightPhaseIdx, camExtra);
    }

    if (!this.smoothCam || state.dragging) {
      this.smoothCam = { pos: [...targetCam.pos], target: [...targetCam.target], fov: targetCam.fov };
    } else {
      const k = 0.16;
      for (let i = 0; i < 3; i++) {
        this.smoothCam.pos[i] += (targetCam.pos[i] - this.smoothCam.pos[i]) * k;
        this.smoothCam.target[i] += (targetCam.target[i] - this.smoothCam.target[i]) * k;
      }
      this.smoothCam.fov += (targetCam.fov - this.smoothCam.fov) * k;
    }

    this.camera.fov = this.smoothCam.fov;
    this.camera.near = Math.max(1.2, Math.min(28, this.smoothCam.pos[1] * 0.014));
    this.camera.updateProjectionMatrix();
    const shk = state.camShake || 0;
    const sx = shk > 0.01 ? (Math.random() - 0.5) * shk * 1.4 : 0;
    const sy = shk > 0.01 ? (Math.random() - 0.5) * shk * 1.1 : 0;
    this.camera.position.set(this.smoothCam.pos[0] + sx, this.smoothCam.pos[1] + sy, this.smoothCam.pos[2]);
    this.camera.lookAt(...this.smoothCam.target);
    if (this.skyMesh) this.skyMesh.position.set(this.camera.position.x, 0, this.camera.position.z);

    if (this.composer && state.gfxQuality !== 'low') {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }

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
      drawTag([10, 6.2, 21.5], 'CLICK: PBB Dock', 'rgba(14,116,144,0.88)', '#FFF', 1);
      drawTag([-6.4, 4.5, 18.5], 'CLICK: High-Loader', 'rgba(14,116,144,0.88)', '#FFF', 1);
    } else if (state.subtab === 'flight' && flightPose) {
      const ph = A3D_FLIGHT_PHASES[state.flightPhaseIdx];
      const phTag = lang === 'ja' ? ph.tagJa : (lang === 'en' ? (ph.tagEn || ph.id.toUpperCase()) : ph.tagVi);
      if (povKind !== 'pilot') {
        drawTag([flightPose.ac.x, flightPose.ac.y + 12.8, flightPose.ac.z], `✈ ${state.fleetAircraftId} (${ap.id} Spot 7) · ${phTag}`, 'rgba(14,116,144,0.92)', '#FFF', 2);
      }
      (flightPose.crew || []).forEach(cr => {
        const lbl = lang === 'ja' ? cr.labelJa : (lang === 'en' ? (cr.labelEn || cr.labelVi) : cr.labelVi);
        drawTag([cr.x, 3.2, cr.z], `🦺 ${lbl}`, cr.pin ? 'rgba(220,38,38,0.94)' : 'rgba(15,23,42,0.86)', cr.pin ? '#FEF08A' : '#E2E8F0', cr.pin ? 2 : 1);
      });
    }
    if (povKind !== 'pilot' && povKind !== 'gse_cab') {
      drawTag([0, 4.5, -580], `${ap.id} RWY ${ap.rwy} (3,500m × 60m)`, 'rgba(185,28,28,0.90)', '#FFF', 2);
      drawTag([-146, 92, 227], `${ap.twr} (86.75m)`, 'rgba(15,23,42,0.88)', '#FFF', 1);
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
    }

    if ((state.impactFlash || 0) > 0.02) {
      const grd = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.15, W * 0.5, H * 0.5, W * 0.65);
      grd.addColorStop(0, 'rgba(220,38,38,0)');
      grd.addColorStop(1, `rgba(220,38,38,${(state.impactFlash * 0.68).toFixed(2)})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
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
