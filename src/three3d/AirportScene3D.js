// Full Three.js PBR + Directional Shadow Maps + Authentic Textbook ERA/ESA/PBB + Full Animated GSE Fleet & Ground Crew
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
  c.width = 1024;
  c.height = 256;
  const ctx = c.getContext('2d');
  const [rA = '36', rB = '18'] = String(rwyPair).split('/');
  ctx.fillStyle = isSnow ? '#394350' : '#262C36';
  ctx.fillRect(0, 0, 1024, 256);
  for (let i = 0; i < 6500; i++) {
    const g = (isSnow ? 48 : 30) + ((i * 29) % 26);
    ctx.fillStyle = `rgb(${g},${g + 3},${g + 8})`;
    ctx.fillRect((i * 73) % 1024, (i * 41) % 256, 2, 2);
  }
  if (isSnow) {
    ctx.fillStyle = 'rgba(236, 245, 255, 0.58)';
    ctx.fillRect(0, 0, 1024, 14);
    ctx.fillRect(0, 242, 1024, 14);
  }
  const skid = (x0, x1) => {
    const grd = ctx.createLinearGradient(x0, 0, x1, 0);
    grd.addColorStop(0, 'rgba(8,10,14,0)');
    grd.addColorStop(0.35, 'rgba(8,10,14,0.74)');
    grd.addColorStop(0.75, 'rgba(8,10,14,0.45)');
    grd.addColorStop(1, 'rgba(8,10,14,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(x0, 64, x1 - x0, 128);
  };
  skid(145, 370);
  skid(654, 879);

  ctx.fillStyle = '#E8EEF5';
  ctx.fillRect(0, 10, 1024, 6);
  ctx.fillRect(0, 240, 1024, 6);
  for (let y = 26; y <= 220; y += 22) {
    ctx.fillRect(14, y, 42, 11);
    ctx.fillRect(968, y, 42, 11);
  }
  const drawNum = (xPos, rot, txt) => {
    ctx.save();
    ctx.fillStyle = '#F8FAFC';
    ctx.font = txt.length > 2 ? '900 44px "Arial Black", sans-serif' : '900 54px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(xPos, 128);
    ctx.rotate(rot);
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  };
  drawNum(96, Math.PI / 2, rA);
  drawNum(928, -Math.PI / 2, rB);

  ctx.fillStyle = '#E5ECF4';
  ctx.fillRect(168, 52, 62, 22);
  ctx.fillRect(168, 182, 62, 22);
  ctx.fillRect(794, 52, 62, 22);
  ctx.fillRect(794, 182, 62, 22);
  for (let cx = 144; cx < 870; cx += 52) ctx.fillRect(cx, 124, 28, 8);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeConcreteTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#C6CFD9';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4500; i++) {
    const v = 182 + ((i * 19) % 26);
    ctx.fillStyle = `rgb(${v},${v + 3},${v + 7})`;
    ctx.fillRect((i * 59) % 512, (i * 83) % 512, 3, 3);
  }
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.34)';
  ctx.lineWidth = 2;
  for (let p = 0; p <= 512; p += 64) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(512, p); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 8);
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
  tex.repeat.set(4, 1);
  return tex;
}

function makeStandBadgeTexture(numStr) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 256, 160);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 240, 144);
  ctx.fillStyle = '#FACC15';
  ctx.font = '900 84px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(numStr), 128, 84);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
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
    addBox(2.8, 2.7, 9.6, 0xf1f5f9, 0, 1.75, 0, 0.25, 0.3);
    addBox(2.86, 1.05, 8.8, 0x38bdf8, 0, 2.15, 0, 0.8, 0.1);
    addBox(2.84, 0.45, 9.6, 0x1b4f9c, 0, 1.1, 0, 0.2, 0.4);
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
    this.scene.fog = new THREE.Fog(0xbcdaf5, 175, 680);

    this.camera = new THREE.PerspectiveCamera(48, 16 / 9, 1.4, 1500);
    this.camera.position.set(38, 22, 54);
    this.smoothCam = null;

    this.sunLight = new THREE.DirectionalLight(0xfff8eb, 2.1);
    this.sunLight.position.set(110, 195, 95);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.near = 20;
    this.sunLight.shadow.camera.far = 520;
    const d = 165;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.bias = -0.0005;
    this.scene.add(this.sunLight);

    this.hemiLight = new THREE.HemisphereLight(0x8ec5fc, 0x3b4a5a, 0.85);
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
    this.skyMesh = new THREE.Mesh(new THREE.SphereGeometry(860, 28, 16), skyMat);
    this.scene.add(this.skyMesh);
  }

  buildStaticAirport(airportId) {
    this.builtAirportId = airportId;
    while (this.staticGroup.children.length) this.staticGroup.remove(this.staticGroup.children[0]);

    const ap = A3D_AIRPORTS[airportId] || A3D_AIRPORTS.NGO;
    const addBox = (w, h, d, col, x, y, z, matExtra = {}) => {
      const mat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.65, metalness: 0.12, ...matExtra });
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = h > 0.4;
      m.receiveShadow = true;
      this.staticGroup.add(m);
      return m;
    };

    const seaHex = (ap.seaCol[0] << 16) | (ap.seaCol[1] << 8) | ap.seaCol[2];
    const seaMat = new THREE.MeshStandardMaterial({ color: seaHex, roughness: ap.island ? 0.16 : 0.88, metalness: ap.island ? 0.65 : 0.05 });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1200), seaMat);
    sea.rotation.x = -Math.PI / 2;
    sea.position.y = ap.island ? -0.45 : -0.12;
    sea.receiveShadow = true;
    this.staticGroup.add(sea);
    this.seaMesh = sea;

    const landHex = (ap.landCol[0] << 16) | (ap.landCol[1] << 8) | ap.landCol[2];
    addBox(580, 0.2, 340, landHex, 0, -0.1, -10, { roughness: ap.snow ? 0.55 : 0.9 });

    if (ap.island) {
      addBox(586, 1.8, 5.5, 0x8e98a6, 0, 0.35, -180);
      addBox(5.5, 1.8, 346, 0x8e98a6, -292, 0.35, -10);
      addBox(5.5, 1.8, 346, 0x8e98a6, 292, 0.35, -10);
    }
    if (ap.bridge) {
      addBox(18, 1.6, 200, 0xbac6d4, 0, 5.4, 245, { metalness: 0.3 });
    }
    if (ap.city) {
      [[-280, -340, 18, 54], [-220, -355, 22, 72], [210, -350, 20, 66], [265, -335, 18, 50]].forEach(([bx, bz, bw, bh]) => {
        addBox(bw, bh, bw, 0xc3d7ee, bx, bh * 0.5, bz, { map: this.texGlass, roughness: 0.2, metalness: 0.65 });
      });
    }
    if (ap.snow) {
      for (let tx = -260; tx <= 260; tx += 40) {
        const pine = new THREE.Mesh(new THREE.ConeGeometry(4.2, 11.5, 7), new THREE.MeshStandardMaterial({ color: 0x305642, roughness: 0.85 }));
        pine.position.set(tx, 5.6, -168);
        pine.castShadow = true;
        this.staticGroup.add(pine);
      }
    }

    [[-45, -450, 115, 76], [-230, -430, 130, 42], [175, -440, 140, 48]].forEach(([mx, mz, mr, mh]) => {
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(mr, mh, 12), new THREE.MeshStandardMaterial({ color: ap.snow ? 0xa8bcd4 : 0x5f7694, roughness: 0.92 }));
      mtn.position.set(mx, mh * 0.45, mz);
      this.staticGroup.add(mtn);
    });

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
    const texIls = makeRoadMarkingTexture('ILS制限', '#334155', '#FFFFFF', '#2563EB');
    const texH38 = makeRoadMarkingTexture('高さ制限 3.8m', '#FACC15', '#0F172A', '#DC2626');

    // Runway + Parallel Taxiways
    const rwyTex = makeRunwayTexture(ap.rwy, ap.snow);
    this.runwayMat = new THREE.MeshStandardMaterial({
      map: rwyTex,
      roughness: 0.72,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    const rwy = new THREE.Mesh(new THREE.PlaneGeometry(460, 32), this.runwayMat);
    rwy.rotation.x = -Math.PI / 2;
    rwy.position.set(0, 0.14, -104);
    rwy.renderOrder = 3;
    rwy.receiveShadow = true;
    this.staticGroup.add(rwy);

    addBox(460, 0.08, 16, 0x3b4453, 0, 0.01, -72, { roughness: 0.78 });
    addBox(456, 0.04, 0.55, 0xf5c818, 0, 0.08, -72);
    addBox(460, 0.08, 18, 0x3d4756, 0, 0.01, -55, { roughness: 0.78 });
    addBox(456, 0.04, 0.6, 0xf5c818, 0, 0.08, -55);
    [-190, -95, 0, 95, 190].forEach(cx => {
      addBox(15, 0.08, 38, 0x3d4756, cx, 0.01, -86, { roughness: 0.78 });
      addBox(0.5, 0.04, 34, 0xf5c818, cx, 0.08, -86);
    });
    [-135, -45, 45, 135].forEach((rx, idx) => {
      const ang = addBox(12, 0.08, 34, 0x3d4756, rx, 0.015, -88, { roughness: 0.78 });
      ang.rotation.y = idx % 2 === 0 ? 0.45 : -0.45;
    });

    // Concrete Apron + GSE Roads + Red ABL Line
    this.apronMat = new THREE.MeshStandardMaterial({ map: this.texConcrete, roughness: 0.78, metalness: 0.06 });
    const apron = new THREE.Mesh(new THREE.PlaneGeometry(510, 165), this.apronMat);
    apron.rotation.x = -Math.PI / 2;
    apron.position.set(0, 0.04, 34);
    apron.receiveShadow = true;
    this.staticGroup.add(apron);

    addBox(480, 0.06, 12, 0x475364, 0, 0.05, 50, { roughness: 0.76 });
    addBox(480, 0.06, 8.5, 0x475364, 0, 0.05, -38, { roughness: 0.76 });
    addBox(495, 0.08, 0.9, 0xdc2626, 0, 0.09, -42.3);
    for (let gx = -225; gx <= 225; gx += 12) {
      addBox(5.5, 0.04, 0.28, 0xf8fafc, gx, 0.09, 50);
    }
    addBox(46, 0.05, 0.36, 0xf8fafc, 125, 0.095, 50);
    addDecal(texNoPar, 14, 4.4, 126, 0.11, 50);

    addBox(120, 0.04, 2.6, 0x16a34a, -25, 0.095, 57.2);
    for (let zx = 34; zx <= 46; zx += 2.2) {
      addBox(1.1, 0.05, 9.6, 0xf8fafc, zx, 0.10, 50);
    }

    // Perimeter Road + ILS Zones
    addBox(540, 0.06, 14, 0x3b4554, 0, 0.05, -142, { roughness: 0.76 });
    addBox(14, 0.06, 260, 0x3b4554, -264, 0.05, -16, { roughness: 0.76 });
    addBox(14, 0.06, 260, 0x3b4554, 264, 0.05, -16, { roughness: 0.76 });
    for (let px = -255; px <= 255; px += 16) addBox(7, 0.04, 0.35, 0xf8fafc, px, 0.09, -142);
    for (let pz = -132; pz <= 105; pz += 16) {
      addBox(0.35, 0.04, 7, 0xf8fafc, -264, 0.09, pz);
      addBox(0.35, 0.04, 7, 0xf8fafc, 264, 0.09, pz);
    }
    addDecal(texStop, 10, 4.2, -264, 0.11, -104, Math.PI / 2);
    addDecal(texStop, 10, 4.2, 264, 0.11, -104, Math.PI / 2);

    [-115, 115].forEach((ix, idx) => {
      addBox(54, 0.05, 0.75, 0x2563eb, ix, 0.10, -135.2);
      addBox(54, 0.05, 0.75, 0x2563eb, ix, 0.10, -148.8);
      addDecal(texIls, 14, 4.8, ix, 0.11, -142);
      addBox(0.45, 4.4, 0.45, 0x94a3b8, ix + (idx === 0 ? 28 : -28), 2.2, -134.2);
      addBox(4.0, 2.0, 0.3, 0xf8fafc, ix + (idx === 0 ? 28 : -28), 3.7, -134.2);
      const lamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      lamp.position.set(ix + (idx === 0 ? 28 : -28), 5.2, -134.2);
      this.staticGroup.add(lamp);
      if (idx === 0) this.ilsLampMesh = lamp;
    });

    const addServiceLane = (xCenter, zStart, zEnd) => {
      const len = Math.abs(zEnd - zStart);
      const zMid = (zStart + zEnd) * 0.5;
      addBox(14, 0.06, len, 0x475364, xCenter, 0.06, zMid, { roughness: 0.75 });
      addBox(0.38, 0.04, len, 0xf8fafc, xCenter, 0.10, zMid);
      for (let sz = Math.min(zStart, zEnd) + 2; sz <= Math.max(zStart, zEnd) - 2; sz += 4.2) {
        addBox(0.32, 0.04, 1.9, 0xf8fafc, xCenter - 6.6, 0.10, sz);
        addBox(0.32, 0.04, 1.9, 0xf8fafc, xCenter - 5.9, 0.10, sz + 1.8);
        addBox(0.32, 0.04, 1.9, 0xf8fafc, xCenter + 6.6, 0.10, sz);
        addBox(0.32, 0.04, 1.9, 0xf8fafc, xCenter + 5.9, 0.10, sz + 1.8);
      }
      addDecal(texPriority, 9.5, 9.5, xCenter, 0.11, Math.max(zStart, zEnd) + 4.8);
    };
    addServiceLane(-31, -68, -42);
    addServiceLane(-155, -68, -42);
    addServiceLane(118, -68, -42);

    // Terminal 2 & Remote / Cargo Stands
    addBox(64, 8.2, 22, 0xdbe4ef, -188, 4.1, 74);
    addBox(66, 1.4, 24, 0x0284c7, -188, 8.8, 74);
    [[-145, 24, '71'], [-170, 24, '72'], [-195, 24, '74'], [-212, 54, '77'], [-185, 54, '79']].forEach(([sx, sz, no]) => {
      addDecal(makeStandBadgeTexture(no), 6.2, 3.8, sx, 0.10, sz);
      addBox(0.45, 0.04, 26, 0xf5c818, sx, 0.08, sz - 12);
    });
    [[-117, -17], [-228, 52]].forEach(([bx, bz]) => {
      addBox(26, 0.05, 0.75, 0xfacc15, bx, 0.10, bz - 9);
      addBox(26, 0.05, 0.75, 0xfacc15, bx, 0.10, bz + 9);
      addBox(0.75, 0.05, 18, 0xfacc15, bx - 13, 0.10, bz);
      addBox(0.75, 0.05, 18, 0xfacc15, bx + 13, 0.10, bz);
      addBox(24.5, 0.03, 16.5, 0xfacc15, bx, 0.075, bz, { transparent: true, opacity: 0.16 });
      addDecal(texBlast, 18, 5.4, bx, 0.11, bz);
    });
    addBox(0.9, 4.2, 22, 0x64748b, -238, 2.1, 32);
    addBox(0.9, 4.2, 22, 0x64748b, -238, 2.1, 68);
    addBox(5.5, 0.05, 76, 0x334155, -245, 0.06, 48);

    [[-148, -20, '301'], [-178, -20, '401'], [-208, -20, '501'], [-236, -20, '601'], [148, -20, '201'], [178, -20, '204'], [208, -20, '101'], [234, -20, '105']].forEach(([rx, rz, no]) => {
      addDecal(makeStandBadgeTexture(no), 6.2, 3.8, rx, 0.10, rz + 10);
      addBox(0.45, 0.04, 24, 0xf5c818, rx, 0.08, rz);
      addBox(8.0, 0.04, 0.5, 0xf5c818, rx, 0.08, rz + 6);
    });
    addBox(52, 9.5, 24, 0xcbd5e1, 188, 4.75, 78);
    addBox(54, 1.4, 26, 0x334155, 188, 10.2, 78);
    addBox(30, 8.8, 22, 0xe2e8f0, 236, 4.4, 42);
    addBox(31, 1.2, 23, 0x0f766e, 236, 9.4, 42);
    addBox(24, 0.05, 16, 0xdc2626, 125, 0.09, -28, { transparent: true, opacity: 0.25 });
    [113, 137].forEach(fx => {
      addBox(0.35, 3.8, 0.35, 0x94a3b8, fx, 1.9, -20);
      const fLamp = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 10), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      fLamp.position.set(fx, 4.1, -20);
      this.staticGroup.add(fLamp);
    });
    [-48, 19, 92].forEach(bx => {
      addDecal(texH38, 10, 2.8, bx, 0.11, 50);
    });
    [[-34, -38], [34, -38], [-145, -38], [-212, 34]].forEach(([ex, ez]) => {
      addDecal(texPriority, 7.2, 7.2, ex, 0.11, ez);
    });

    // AUTHENTIC TEXTBOOK WING-HUGGING OPEN-BACK ERA + WHITE-DASHED ESA + PBB HATCHED + 4 COLOR PITS FOR SPOTS 6, 7, 14!
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

      // Yellow Lead-in Line + Stop Bars + Pushback Limit Bar
      addBox(0.50, 0.04, 62, 0xf5c818, sp.cx, 0.08, -3);
      addBox(7.2, 0.04, 0.45, 0xf5c818, sp.cx, 0.085, sp.cz + halfL - 3.5);
      addBox(5.6, 0.04, 0.32, 0xf5c818, sp.cx, 0.085, sp.cz + halfL - 5.5);
      addBox(3.4, 0.04, 0.28, 0xf8fafc, sp.cx, 0.085, sp.cz - 8.5); // Pushback limit T-bar

      // Stand Number Badge
      const sTex = makeStandBadgeTexture(sp.ngoNo);
      const sPlate = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 4.4), new THREE.MeshStandardMaterial({ map: sTex, roughness: 0.7 }));
      sPlate.rotation.x = -Math.PI / 2;
      sPlate.position.set(sp.cx, 0.09, sp.cz + halfL + 9.2);
      this.staticGroup.add(sPlate);

      // 4 Official Color-Coded Apron Utility Pits (別添2: White Hydrant, Red Earth, Blue GPU, Yellow PC-Air)
      addBox(1.4, 0.05, 1.4, 0xf8fafc, sp.cx - 10.6, 0.095, sp.cz - 2.0); // White Hydrant Pit!
      addBox(0.75, 0.05, 0.75, 0xef4444, sp.cx - 11.8, 0.095, sp.cz + 0.2); // Red Bonding Pit!
      addBox(1.1, 0.05, 1.1, 0x2563eb, sp.cx - 5.8, 0.095, sp.cz + 16.5);  // Blue GPU Pit!
      addBox(1.1, 0.05, 1.1, 0xfacc15, sp.cx + 5.2, 0.095, sp.cz + 10.5);  // Yellow PC-Air Pit!

      // Port (+X) PBB Red Cross-Hatched Zone (PBB稼働区域) + White [ ] Standby Box (PBB待機位置)
      const px = sp.cx + 12.2, pz = sp.cz + 11.5;
      addBox(16.5, 0.04, 9.2, 0xdc2626, px, 0.08, pz, { transparent: true, opacity: 0.20 });
      addBox(16.5, 0.05, 0.32, 0xdc2626, px, 0.09, pz - 4.6);
      addBox(16.5, 0.05, 0.32, 0xdc2626, px, 0.09, pz + 4.6);
      for (let hx = -6.5; hx <= 6.5; hx += 3.2) {
        const bar = addBox(0.30, 0.04, 10.8, 0xef4444, px + hx, 0.095, pz);
        bar.rotation.y = 0.62;
      }
      addDashedBox(px + 4.5, pz - 2.2, px + 8.2, pz + 2.2);

      // Authentic Open-Back Wing-Hugging Bright Red ERA Polyline (12 segments, OPEN at rear!)
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
        const a = worldPts[i], b = worldPts[i + 1];
        addEraSeg(a[0], a[1], b[0], b[1], 0.48, eraRedMat, 0.11);
      }
      // Outward rear flare ticks at open tail ends
      addEraSeg(worldPts[0][0], worldPts[0][1], worldPts[0][0] + 2.0, worldPts[0][1], 0.48, eraRedMat, 0.11);
      addEraSeg(worldPts[12][0], worldPts[12][1], worldPts[12][0] - 2.0, worldPts[12][1], 0.48, eraRedMat, 0.11);

      // White-Dashed ESA (機材待機区域) Staging Bays outside Red ERA!
      const bodyW = fuseR + 6.8;
      const wingW = halfSpan + 3.8;
      addDashedBox(sp.cx - (wingW - 0.5), sp.cz + halfL * 0.45, sp.cx - (bodyW + 1.8), sp.cz + halfL + 6.5);
      addDashedBox(sp.cx - (wingW - 0.5), sp.cz - (halfL + 3.5), sp.cx - (bodyW + 1.8), sp.cz - 12.5);
    });

    // Passenger Terminal + Center Pier + Rotundas + ATC Tower + Cargo + ARFF
    this.glassMat = new THREE.MeshPhysicalMaterial({ map: this.texGlass, roughness: 0.12, metalness: 0.72, clearcoat: 1.0, emissive: new THREE.Color(0x000000) });
    addBox(146, 3.2, 32, 0xdbe3ee, -26, 1.6, 79);
    const termGlass = new THREE.Mesh(new THREE.BoxGeometry(144, 9.6, 30), this.glassMat);
    termGlass.position.set(-26, 8.0, 77);
    termGlass.castShadow = true;
    termGlass.receiveShadow = true;
    this.staticGroup.add(termGlass);
    addBox(152, 1.8, 35, 0x1b4f9c, -26, 13.7, 76, { metalness: 0.35, roughness: 0.35 });
    addBox(16, 0.9, 19, 0xa6764e, 0, 14.0, 54.5, { roughness: 0.75 });
    addBox(12, 13.6, 5.5, 0xd7e0ec, 0, 6.8, 61);

    const pierBridge = new THREE.Mesh(new THREE.BoxGeometry(12.5, 6.4, 24), this.glassMat);
    pierBridge.position.set(34, 7.6, 50);
    pierBridge.castShadow = true;
    this.staticGroup.add(pierBridge);
    addBox(13.2, 0.9, 25, 0x1b4f9c, 34, 11.2, 50, { metalness: 0.35 });
    addBox(13.4, 0.75, 0.9, 0xfacc15, 34, 4.15, 43.8);
    addBox(13.4, 0.75, 0.9, 0xfacc15, 34, 4.15, 56.2);
    addDecal(texH38, 10, 2.8, 34, 0.11, 50);
    addDecal(texStop, 7.5, 3.2, 34, 0.11, 39.5);

    const pierFinger = new THREE.Mesh(new THREE.BoxGeometry(12.2, 9.2, 32), this.glassMat);
    pierFinger.position.set(34, 4.6, 22);
    pierFinger.castShadow = true;
    this.staticGroup.add(pierFinger);
    addBox(13.0, 1.1, 33, 0x1b4f9c, 34, 9.75, 22, { metalness: 0.35 });

    const addPortPier = (rotX, rotZ1, rotZ2) => {
      const zEnd = Math.min(rotZ1, rotZ2 || rotZ1);
      const len = 62 - zEnd;
      const pier = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.0, len), this.glassMat);
      pier.position.set(rotX, 5.1, zEnd + len * 0.5);
      pier.castShadow = true;
      this.staticGroup.add(pier);
      addBox(3.7, 0.4, len, 0xeef2f8, rotX, 6.8, zEnd + len * 0.5);
      const rot1 = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 7.0, 16), new THREE.MeshStandardMaterial({ color: 0xd8e0ea, roughness: 0.35, metalness: 0.25 }));
      rot1.position.set(rotX, 3.5, rotZ1);
      rot1.castShadow = true;
      this.staticGroup.add(rot1);
      if (rotZ2) {
        const rot2 = rot1.clone();
        rot2.position.z = rotZ2;
        this.staticGroup.add(rot2);
      }
    };
    addPortPier(-48, 21.5, null);
    addPortPier(19, 21.5, null);
    addPortPier(92, 23.5, 13.5);

    addBox(11, 5.5, 11, 0xd2dae4, -120, 2.75, 76);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 4.4, 21.5, 16), new THREE.MeshStandardMaterial({ color: 0xeaf0f6, roughness: 0.35 }));
    shaft.position.set(-120, 16.25, 76);
    shaft.castShadow = true;
    this.staticGroup.add(shaft);
    const cab = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 3.9, 4.4, 14), this.glassMat);
    cab.position.set(-120, 30.2, 76);
    this.staticGroup.add(cab);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 5.8, 1.6, 14), new THREE.MeshStandardMaterial({ color: 0xf4f8fc, roughness: 0.35 }));
    cap.position.set(-120, 33.2, 76);
    this.staticGroup.add(cap);

    addBox(68, 10.6, 30, 0xcdd6e1, 92, 5.3, 77);
    addBox(70, 1.5, 31.5, 0x404e60, 92, 11.35, 77);
    addBox(20, 8.6, 22, 0xeef2f8, 125, 4.3, -12);
    addBox(20.5, 1.5, 22.5, 0xc92a2a, 125, 6.95, -12);
    [14, 27].forEach(tz => {
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.4, 9.6, 20), new THREE.MeshStandardMaterial({ color: 0xf6f8fc, roughness: 0.3, metalness: 0.35 }));
      tank.position.set(125, 4.8, tz);
      tank.castShadow = true;
      this.staticGroup.add(tank);
    });

    const addGlowBulb = (col, x, y, z, r = 0.38) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 8, 8), new THREE.MeshBasicMaterial({ color: col }));
      m.position.set(x, y, z);
      this.staticGroup.add(m);
    };
    for (let lx = -148; lx <= 148; lx += 24) {
      addGlowBulb(0xfef9c3, lx, 0.45, -112);
      addGlowBulb(0xfef9c3, lx, 0.45, -82);
    }
    for (let tz = -109; tz <= -85; tz += 6) {
      addGlowBulb(0x22c55e, -154, 0.45, tz, 0.45);
      addGlowBulb(0xef4444, 154, 0.45, tz, 0.45);
    }
    [0, 1, 2, 3].forEach(pi => addGlowBulb(pi < 2 ? 0xffffff : 0xef4444, -108, 0.85, -117 - pi * 2.4, 0.55));
    for (let tx = -142; tx <= 142; tx += 28) {
      addGlowBulb(0x38bdf8, tx, 0.4, -64, 0.34);
      addGlowBulb(0x38bdf8, tx, 0.4, -46, 0.34);
    }
  }

  initDynamicActors() {
    // Spot 6 (JAL B738) & Spot 14 (ANA B788) static neighbor aircraft with authentic liveries!
    this.spot6Ac = createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.B738.visual3d, liveryId: 'JAL' });
    this.spot6Ac.position.set(-68, 0, 10);
    this.dynamicGroup.add(this.spot6Ac);

    this.spot14Ac = createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.B788.visual3d, liveryId: 'ANA' });
    this.spot14Ac.position.set(68, 0, 10);
    this.dynamicGroup.add(this.spot14Ac);

    this.spot6Pbb = this.createPbbMesh(-48, -65.9, 21.5, 3.6);
    this.dynamicGroup.add(this.spot6Pbb);
    this.spot14Pbb1 = this.createPbbMesh(92, 71.0, 23.5, 4.4);
    this.spot14Pbb2 = this.createPbbMesh(92, 71.0, 13.5, 4.4);
    this.dynamicGroup.add(this.spot14Pbb1, this.spot14Pbb2);

    const b14a = createGseMesh('lowloader', { wide: true, uldType: 'AKE', deckY: 2.4 });
    b14a.position.set(59.4, 0, 20.0); b14a.rotation.y = Math.PI / 2;
    const b14b = createGseMesh('lowloader', { wide: true, uldType: 'PMC', deckY: 2.4 });
    b14b.position.set(59.4, 0, -3.0); b14b.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(b14a, b14b);

    // Spot 7 Interactive PBB + Full Textbook GSE Fleet!
    this.spot7Pbb = this.createPbbMesh(19, 2.1, 21.5, 3.6);
    this.spot7Pbb.userData.interact = { type: 'pbb', label: 'PBB Dock / Retract' };
    this.dynamicGroup.add(this.spot7Pbb);

    // Interactive Fwd Low-Deck High-Lift Loader (clickable in Tab 3 + animated in Flight Mode!)
    this.spot7Loader = createGseMesh('lowloader', { uldType: 'AKH', deckY: 2.05 });
    this.spot7Loader.position.set(-6.4, 0, 18.5);
    this.spot7Loader.rotation.y = Math.PI / 2;
    this.spot7Loader.userData.interact = { type: 'loader', label: 'High-Lift Loader & ULD' };
    this.dynamicGroup.add(this.spot7Loader);

    // Accompanying TT + 2 Container Dollies alongside Fwd Loader
    this.spot7DollyTrain = buildTurnaroundGseMesh('dolly_train', 1.0);
    this.spot7DollyTrain.position.set(-13.2, 0, 18.0);
    this.dynamicGroup.add(this.spot7DollyTrain);

    // Aft Bulk Belt Loader (with animated suitcases!) + TT Baggage Cart
    this.spot7Belt = buildTurnaroundGseMesh('belt', 2.15);
    this.spot7Belt.position.set(-5.8, 0, -6.2);
    this.spot7Belt.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Belt);

    this.spot7BeltTractor = buildTurnaroundGseMesh('dolly_train', 1.0);
    this.spot7BeltTractor.position.set(-12.2, 0, -6.8);
    this.dynamicGroup.add(this.spot7BeltTractor);

    // Starboard Nose GPU Cart (with 3D orange power cable)
    this.spot7Gpu = buildTurnaroundGseMesh('gpu', 1.55);
    this.spot7Gpu.position.set(-5.4, 0, 26.2);
    this.spot7Gpu.rotation.y = Math.PI * 0.35;
    this.dynamicGroup.add(this.spot7Gpu);

    // Starboard Forward R1 Catering Food Loader (with 4 yellow outriggers + lifting van box -19cm!)
    this.spot7Catering = buildTurnaroundGseMesh('catering', 3.35);
    this.spot7Catering.position.set(-5.8, 0, 23.2);
    this.spot7Catering.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Catering);

    // Hydrant Fuel Servicer under Starboard Wing facing FORWARD (+Z = rotY 0 -> clear escape path!)
    this.spot7Hydrant = buildTurnaroundGseMesh('fuel', 2.65);
    this.spot7Hydrant.position.set(-10.5, 0, 8.8);
    this.spot7Hydrant.rotation.y = 0;
    this.dynamicGroup.add(this.spot7Hydrant);

    // Lavatory Truck (Starboard Aft) & Potable Water Truck (Port Aft — hygienic separation!)
    this.spot7Lav = buildTurnaroundGseMesh('lav', 2.15);
    this.spot7Lav.position.set(-5.4, 0, -10.2);
    this.spot7Lav.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Lav);

    this.spot7Water = buildTurnaroundGseMesh('water', 2.15);
    this.spot7Water.position.set(5.6, 0, -7.8);
    this.spot7Water.rotation.y = -Math.PI / 2;
    this.dynamicGroup.add(this.spot7Water);

    // Pushback Tractor + Towbar (staged in ESA until Phase 6..8!)
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

    this.radarBar = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.85, 0.65), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 }));
    this.radarBar.position.set(-120, 34.4, 76);
    this.dynamicGroup.add(this.radarBar);

    this.aiBus = createGseMesh('ramp_bus');
    this.aiBus.rotation.y = -Math.PI / 2;
    this.dynamicGroup.add(this.aiBus);

    this.aiTractor = createGseMesh('tractor');
    this.aiTractor.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.aiTractor);

    this.aiJet = createDetailedAirliner3D({ ...AIRCRAFT_PROFILES.A320.visual3d, liveryId: 'ANA' });
    this.aiJet.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.aiJet);

    // Player Drivable Open-Cab TT + 6 Towed Carts + Long Semi-Trailer + Dock Bay
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

    const bayGrp = new THREE.Group();
    bayGrp.position.set(192, 0.14, 26);
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

    // Full Articulated 3D Ground Crew Team: Marshaller, Watchmen L/R, Headset Man (w/ Red Bypass Pin!), Loadmaster (w/ LIR!), Fueler & 3 Warning Spotters!
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

    this.cloudGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xf8fbff, roughness: 0.95, transparent: true, opacity: 0.85 });
    A3D_CLOUDS.forEach((cl, ci) => {
      const cGrp = new THREE.Group();
      const s1 = new THREE.Mesh(new THREE.SphereGeometry(cl.sx * 0.34, 10, 8), cloudMat);
      s1.scale.set(1.6, 0.38, 0.85);
      const s2 = s1.clone(); s2.position.set(-cl.sx * 0.25, 2.5, 3); s2.scale.set(1.1, 0.35, 0.7);
      const s3 = s1.clone(); s3.position.set(cl.sx * 0.24, 1.8, -2); s3.scale.set(1.0, 0.32, 0.65);
      cGrp.add(s1, s2, s3);
      cGrp.position.set(cl.x, cl.y + 18 + (ci % 2) * 10, cl.z - 40);
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

  _animateSpot7GseFleet(isFlight, isOps3d, state, flightPose, tSec) {
    const lerp = (a, b, u) => a + (b - a) * Math.max(0, Math.min(1, u));
    const ph = state.flightPhaseIdx;
    const p = state.flightProgress || 0;

    // Default staged positions inside white-dashed ESA boxes outside Red ERA!
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

    // Reset GSE mechanical attachments by default
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
      // Drive Mode
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
          // Tug coupled to departing aircraft nose during pushback scenario!
          const noseX = drvSc.x + Math.cos(drvSc.heading) * 20.5;
          const noseZ = drvSc.z + Math.sin(drvSc.heading) * 20.5;
          stage(this.spot7Tug, noseX, noseZ, Math.PI / 2 - (drvSc.heading + Math.PI));
        }
      }
      return { cargoOpen: !isDep, galleyOpen: false };
    }

    // 10-Phase Flight Turnaround Mode: Smooth ESA -> 5m Brake-Check -> Dock -> Mechanical Lifts -> Retract to ESA!
    let cargoOpen = false, galleyOpen = false;
    this.spot7Loader.visible = true;

    if (ph <= 1 || ph >= 9) {
      // Landing, Taxi-in & Takeoff: ALL GSE parked cleanly inside white-dashed ESA boxes outside Red ERA!
      this.spot7Loader.position.set(-18.5, 0, 22.0);
      this.spot7Loader.rotation.y = Math.PI / 2;
      this.spot7Loader.userData.liftGroup.position.y = 0.85;
      this.spot7Loader.userData.uldMesh.position.z = -1.2;
    } else if (ph === 2) {
      // Phase 2 (On-Block): GPU approaches Starboard Nose & connects 400Hz cable!
      const app = Math.min(1, p * 1.6);
      stage(this.spot7Gpu, lerp(-17.5, -5.4, app), lerp(34.5, 26.2, app), Math.PI * 0.35);
      if (gpuUd.cableGrp) gpuUd.cableGrp.visible = app >= 0.95;
      this.spot7Loader.position.set(-18.5, 0, 22.0);
    } else if (ph === 3 || ph === 5) {
      // Phase 3 (Offload) & Phase 5 (Outbound Load): GPU + Fwd High-Loader + Dollies + Aft Bulk Belt + Suitcases!
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
      // Phase 4 (Fueling, Catering & Lavatory/Water):
      //   - Hydrant Servicer under Starboard Wing facing +Z (forward escape clear!) + pit hose + bonding!
      //   - Catering Food Loader at Starboard R1 w/ 4 yellow outriggers + van lifted -19cm!
      //   - Lavatory & Water hygienically separated!
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
      // Phase 6 (Clear ERA & Tug Couple): All GSE retract smoothly outside Red ERA into ESA bays while Tug couples to nose gear!
      stage(this.spot7Gpu, lerp(-5.4, -17.5, p), lerp(26.2, 34.5, p), Math.PI * 0.5);
      this.spot7Loader.position.set(lerp(-6.4, -18.5, p), 0, lerp(18.5, 22.0, p));
      this.spot7Loader.userData.liftGroup.position.y = 0.85;
      stage(this.spot7Belt, lerp(-5.8, -17.8, p), lerp(-6.2, -10.5, p), Math.PI / 2);
      stage(this.spot7Tug, lerp(14.5, 0, Math.min(1, p * 1.4)), lerp(36.5, 31.2, p), Math.PI);
    } else if (ph === 7 && flightPose) {
      // Phase 7 (Pushback & Engine Start): Tug coupled to Nose Gear pushing aircraft backward & onto Taxiway A!
      this.spot7Loader.position.set(-18.5, 0, 22.0);
      const ac = flightPose.ac;
      const noseX = ac.x + Math.cos(ac.heading) * 21.2;
      const noseZ = ac.z + Math.sin(ac.heading) * 21.2;
      stage(this.spot7Tug, noseX, noseZ, Math.PI / 2 - (ac.heading + Math.PI));
      if (tugUd.beacon) tugUd.beacon.visible = Math.floor(tSec * 4.5) % 2 === 0;
    } else if (ph === 8) {
      // Phase 8 (Towbar Disconnect & Taxi-out): Tug pulls clear back toward Spot 7!
      this.spot7Loader.position.set(-18.5, 0, 22.0);
      const u = Math.min(1, p * 2.5);
      stage(this.spot7Tug, lerp(-30, -32, u), lerp(-54, -36, u), 0);
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
      // Ops3D or Drive Mode
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

    // 10-Phase Flight Mode Dynamic Crew Choreography (Synced 1:1 with Aircraft & GSE!)
    const ph = state.flightPhaseIdx;
    const p = state.flightProgress || 0;

    if (ph === 0) {
      // Phase 0 (Landing): All ramp crew wait safely OUTSIDE Red ERA!
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
      // Phase 1 (Taxi-in & Marshalling): Marshaller on lead-in line; L/R Watchmen >5m outside engines signaling 通過よし!
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
      // Phase 2 (On-Block, Chocks & GPU): Marshaller signals Chocks Inserted; Mechanic performs 指差呼称 at Nose!
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
      // Phases 3–5 (Active Ground Handling): Guidemen offset safely, Loadmaster w/ LIR Clipboard, Fueler at Hydrant Pit!
      this.crewMarshaller.position.set(12.5, 0, 25.5);
      this.crewMarshaller.rotation.y = -Math.PI * 0.5;
      animateCrewSignal(this.crewMarshaller, demoSig || 'point_and_call', tSec);

      this.crewHeadset.position.set(-4.2, 0, 25.5);
      this.crewHeadset.rotation.y = Math.PI * 0.45;
      animateCrewSignal(this.crewHeadset, 'point_and_call', tSec);

      this.crewWingL.position.set(8.5, 0, -6.5);
      this.crewWingL.rotation.y = -Math.PI * 0.65;
      animateCrewSignal(this.crewWingL, ph === 4 ? 'point_and_call' : 'spotter_clear', tSec);

      // Cargo / Catering Guideman offset laterally outside GSE path!
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
      // Phase 6 (Door Close & Final Walkaround): Mechanic walks around nose performing 指差呼称!
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
      // Phase 7 (Pushback & Engine Start): Headset Man walks alongside Nose Gear; Watchmen walk alongside Wingtips!
      const ac = flightPose.ac;
      const yaw3d = Math.PI / 2 - ac.heading;
      const noseX = ac.x + Math.cos(ac.heading) * 19.5;
      const noseZ = ac.z + Math.sin(ac.heading) * 19.5;
      // Captain's Left (+Port) offset perpendicular to aircraft heading: (-sin(h), +cos(h))
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
      // Phase 8 (Bypass Pin Display on Captain's Forward-Left & Ramp Team お見送り Wave-Off!):
      // Aircraft is on Taxiway A facing West (-X, z=-55) -> Captain's Left is South (+Z, z ≈ -46.5)!
      this.crewHeadset.position.set(-29.0, 0, -46.5);
      this.crewHeadset.rotation.y = Math.atan2(acPose.x - (-29.0), acPose.z - (-46.5));
      animateCrewSignal(this.crewHeadset, p < 0.36 ? 'bypass_pin_salute' : 'wave_off', tSec);

      // 3-Person Japanese Airline Ramp Wave-Off Line (お見送り) along safe Apron edge!
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
      // Phase 9 (Takeoff Roll & Climb): Crew returns to safe apron staging for next arrival
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
    this.sunLight.position.set(isSunset ? 220 : 110, isSunset ? 58 : 195, isSunset ? -160 : 95);
    this.sunLight.castShadow = state.gfxQuality !== 'low';
    this.hemiLight.intensity = isNight ? 0.35 : (isSunset ? 0.65 : 0.9);
    if (this.glassMat) this.glassMat.emissive.setHex(isNight ? 0x403214 : (isSunset ? 0x261808 : 0x000000));
    if (this.runwayMat) this.runwayMat.roughness = wx === 'rain' ? 0.14 : 0.72;
    if (this.apronMat) this.apronMat.roughness = wx === 'rain' ? 0.18 : 0.78;

    const fogHex = isNight ? 0x0a1428 : (isSunset ? 0xd98f6c : (wx === 'fog' || wx === 'snow' ? 0xc6d3e1 : (wx === 'rain' ? 0x7c90a6 : 0xbcdaf5)));
    this.scene.fog.color.setHex(fogHex);
    this.scene.fog.near = wx === 'fog' ? 40 : (wx === 'snow' ? 85 : 175);
    this.scene.fog.far = wx === 'fog' ? 210 : (wx === 'snow' ? 320 : 680);

    this.skyMat.uniforms.uTopCol.value.setHex(isNight ? 0x040918 : (isSunset ? 0x2b396b : 0x1b59a8));
    this.skyMat.uniforms.uHorizonCol.value.setHex(fogHex);
    this.skyMat.uniforms.uSunDir.value.copy(this.sunLight.position).normalize();
    this.skyMat.uniforms.uNight.value = isNight ? 1.0 : 0.0;

    const isFlight = state.subtab === 'flight';
    const isOps3d = state.subtab === 'ops3d';
    const flightPose = isFlight ? computeFlightCyclePose(state.flightPhaseIdx, state.flightProgress) : null;
    const tSec = (now || 0) * 0.001;
    this.radarBar.rotation.y = tSec * 1.4;

    this.cloudGroup.visible = state.gfxQuality !== 'low' && wx !== 'fog';
    this.cloudGroup.children.forEach(c => {
      const b = c.userData.base;
      c.position.x = ((b.x + state.aiTime * b.spd * 1.4 + 320) % 640) - 320;
    });
    const showAi = state.gfxQuality !== 'low' && !this.compact;
    this.aiBus.visible = showAi;
    this.aiTractor.visible = !this.compact;
    this.aiJet.visible = showAi;
    this.aiTractor.position.set(-125 + ((state.aiTime * 7.5) % 250), 0, 52.5);
    this.aiBus.position.set(125 - (((state.aiTime * 6.2) + 90) % 250), 0, 47.2);
    const aiCycle = (state.aiTime * 18) % 520;
    this.aiJet.position.set(-260 + aiCycle, 26 + Math.abs(aiCycle - 260) * 0.14, -215);

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

    // Animate Complete Spot 7 GSE Fleet & Openable Aircraft Doors!
    const doorFlags = this._animateSpot7GseFleet(isFlight, isOps3d, state, flightPose, tSec);

    // Animate Dynamic Phase-Accurate 3D Ground Crew!
    this._animateGroundCrewChoreography(isFlight, isOps3d, state, flightPose, acPose, tSec);

    // Apply Transform & Door/Light Animation to Active Airliner
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
        backingBay: isBack ? (state.backingBay || { cx: 192, cz: 26 }) : null,
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
    this.camera.near = Math.max(1.2, Math.min(18, this.smoothCam.pos[1] * 0.015));
    this.camera.updateProjectionMatrix();
    const shk = state.camShake || 0;
    const sx = shk > 0.01 ? (Math.random() - 0.5) * shk * 1.4 : 0;
    const sy = shk > 0.01 ? (Math.random() - 0.5) * shk * 1.1 : 0;
    this.camera.position.set(this.smoothCam.pos[0] + sx, this.smoothCam.pos[1] + sy, this.smoothCam.pos[2]);
    this.camera.lookAt(...this.smoothCam.target);

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
      const phTag = lang === 'ja' ? ph.tagJa : (lang === 'en' ? ph.id.toUpperCase() : ph.tagVi);
      if (povKind !== 'pilot') {
        drawTag([flightPose.ac.x, flightPose.ac.y + 12.8, flightPose.ac.z], `✈ ${state.fleetAircraftId} (${ap.id} Spot 7) · ${phTag}`, 'rgba(14,116,144,0.92)', '#FFF', 2);
      }
      // Show live 3D Crew Role Callouts above active ground staff!
      (flightPose.crew || []).forEach(cr => {
        const lbl = lang === 'ja' ? cr.labelJa : cr.labelVi;
        drawTag([cr.x, 3.2, cr.z], `🦺 ${lbl}`, cr.pin ? 'rgba(220,38,38,0.94)' : 'rgba(15,23,42,0.86)', cr.pin ? '#FEF08A' : '#E2E8F0', cr.pin ? 2 : 1);
      });
    }
    if (povKind !== 'pilot' && povKind !== 'gse_cab') {
      drawTag([0, 2.5, -104], `${ap.id} RWY ${ap.rwy} (3500m)`, 'rgba(185,28,28,0.88)', '#FFF', 2);
      drawTag([-120, 38, 76], ap.twr, 'rgba(15,23,42,0.88)', '#FFF', 1);
      drawTag([34, 13.5, 22], 'CENTER PIER (#8–#18)', 'rgba(27,79,156,0.9)', '#FFF', 1);
      drawTag([-188, 12, 74], 'T2 (#71–#80)', 'rgba(2,132,199,0.88)', '#FFF', 1);
      drawTag([188, 14, 78], 'CARGO (#101–#119)', 'rgba(71,85,105,0.88)', '#FFF', 1);
      drawTag([-31, 2.2, -55], 'SERVICE LANE', 'rgba(15,23,42,0.88)', '#7DD3FC', 1);
      drawTag([-115, 6.5, -142], state.ilsRedOn ? 'ILS RED: NO ENTRY' : 'ILS ZONE', state.ilsRedOn ? 'rgba(220,38,38,0.92)' : 'rgba(37,99,235,0.86)', '#FFF', 1);
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
      ctx.fillText(`THREE.JS PBR HUD · ${state.fleetAircraftId} · ${ap.id} RWY ${ap.rwy}`, W * 0.5, H * 0.86);
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
