// Full Three.js PBR + Directional Shadow Maps + UnrealBloom + PMREM Sky + Raycasting Interactive 3D Airport Engine
import * as THREE from 'three';
import { AIRCRAFT_PROFILES } from '../data/aircraft.js';
import { A3D_AIRPORTS, A3D_SPOTS, A3D_CLOUDS, A3D_FLIGHT_PHASES, computeFlightCyclePose, computeViewpointCamera } from '../data/airports.js';
import { createDetailedAirliner3D } from './aircraftBuilder3D.js';

// Procedural Canvas Textures (Runway w/ Dynamic Designator, Concrete Slabs, Glass Curtain Wall, Grass)
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

// Helper to create reusable GSE 3D meshes
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
    addBox(w, 0.65, 8.2, 0xeef2f8, 0, 0.55, 0, 0.35, 0.4);
    const liftGroup = new THREE.Group();
    liftGroup.position.y = opts.deckY ?? 2.05;
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(w * 0.86, 0.26, 2.9), new THREE.MeshStandardMaterial({ color: 0xd7dfe9, metalness: 0.5, roughness: 0.35 }));
    bridge.position.set(0, 0, 2.5);
    liftGroup.add(bridge);
    const plat = new THREE.Mesh(new THREE.BoxGeometry(w, 0.26, 4.6), new THREE.MeshStandardMaterial({ color: 0xc8d2de, metalness: 0.5, roughness: 0.35 }));
    plat.position.set(0, 0, -1.6);
    liftGroup.add(plat);
    const railL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.72, 4.5), new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 }));
    railL.position.set(-w * 0.48, 0.45, -1.6);
    liftGroup.add(railL);
    const railR = railL.clone();
    railR.position.x = w * 0.48;
    liftGroup.add(railR);
    const uld = new THREE.Mesh(
      new THREE.BoxGeometry(opts.uldType === 'PMC' ? 2.7 : 1.9, opts.uldType === 'AKH' ? 1.15 : 1.6, 2.2),
      new THREE.MeshStandardMaterial({ color: opts.uldType === 'PMC' ? 0x3870b2 : 0xcfd8e3, metalness: 0.55, roughness: 0.3 })
    );
    uld.position.set(0, 0.75, -1.2);
    uld.castShadow = true;
    liftGroup.add(uld);
    g.add(liftGroup);
    g.userData.liftGroup = liftGroup;
    g.userData.uldMesh = uld;
    addBox(0.6, 1.5, 3.2, 0x334155, 0, 1.35, -1.6, 0.5, 0.5);
  } else if (kind === 'belt') {
    addBox(2.1, 1.2, 5.4, 0xf59e0b, 0, 0.9, 0, 0.3, 0.4);
    const boom = addBox(1.0, 0.32, 6.8, 0x1e293b, 0, 1.95, 0.3, 0.3, 0.6);
    boom.rotation.x = -0.18;
  } else if (kind === 'hydrant') {
    addBox(2.5, 1.85, 5.6, 0xf6f9fc, 0, 1.25, 0, 0.25, 0.3);
    addBox(2.1, 0.35, 3.0, 0xdc2626, 0, 2.35, 0, 0.2, 0.4);
    addBox(1.6, 0.85, 1.6, 0xeab308, 0, 2.9, 1.1, 0.3, 0.4);
  } else if (kind === 'tug') {
    addBox(3.1, 1.4, 6.2, 0xeab308, 0, 1.0, 0, 0.35, 0.35);
    addBox(2.2, 0.9, 2.3, 0x7dd3fc, 0, 2.15, 0, 0.7, 0.12);
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
    this.compact = Boolean(opts.compact); // True when embedded in Split-Screen W&B x 3D!
    this.onInteract = opts.onInteract || null;
    this.disposed = false;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xbcdaf5, 175, 680);

    this.camera = new THREE.PerspectiveCamera(48, 16 / 9, 0.7, 1200);
    this.camera.position.set(38, 22, 54);
    this.smoothCam = null;

    // Sky Dome Shader + Lights
    this.sunLight = new THREE.DirectionalLight(0xfff8eb, 2.1);
    this.sunLight.position.set(110, 195, 95);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
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

    // Scene Groups
    this.staticGroup = new THREE.Group();
    this.scene.add(this.staticGroup);

    this.dynamicGroup = new THREE.Group();
    this.scene.add(this.dynamicGroup);

    this.interactiveObjects = [];
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // Shared textures & materials
    this.texConcrete = makeConcreteTexture();
    this.texGlass = makeGlassTexture();
    this.builtAirportId = null;
    this.builtFleetId = null;

    // Build initial airport & dynamic objects
    this.buildStaticAirport('NGO');
    this.initDynamicActors();

    // Optional Post-Processing Bloom (gracefully loaded from three/addons)
    this.composer = null;
    this.bloomPass = null;
    this.initPostProcessing();

    // Click Raycasting for FOD / PBB / High-Lift Loader / Chocks!
    this._onPointerDown = e => this.handlePointerClick(e);
    this._onPointerMove = e => this.handlePointerHover(e);
    this.canvas.addEventListener('click', this._onPointerDown);
    this.canvas.addEventListener('mousemove', this._onPointerMove);
  }

  async initPostProcessing() {
    if (this.compact) return;
    try {
      const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }] = await Promise.all([
        import('three/addons/postprocessing/EffectComposer.js'),
        import('three/addons/postprocessing/RenderPass.js'),
        import('three/addons/postprocessing/UnrealBloomPass.js')
      ]);
      if (this.disposed) return;
      const composer = new EffectComposer(this.renderer);
      composer.addPass(new RenderPass(this.scene, this.camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(800, 560), 0.32, 0.55, 0.86);
      composer.addPass(bloom);
      this.composer = composer;
      this.bloomPass = bloom;
    } catch {
      // Graceful fallback to direct renderer (zero crash)
    }
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

    // 1. Ocean / Inland Surroundings & Island Base
    const seaHex = (ap.seaCol[0] << 16) | (ap.seaCol[1] << 8) | ap.seaCol[2];
    const seaMat = new THREE.MeshStandardMaterial({ color: seaHex, roughness: ap.island ? 0.16 : 0.88, metalness: ap.island ? 0.65 : 0.05 });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1200), seaMat);
    sea.rotation.x = -Math.PI / 2;
    sea.position.y = ap.island ? -0.45 : -0.12;
    sea.receiveShadow = true;
    this.staticGroup.add(sea);
    this.seaMesh = sea;

    const landHex = (ap.landCol[0] << 16) | (ap.landCol[1] << 8) | ap.landCol[2];
    addBox(420, 0.2, 276, landHex, 0, -0.1, -11, { roughness: ap.snow ? 0.55 : 0.9 });

    if (ap.island) {
      addBox(424, 1.5, 4.5, 0x8e98a6, 0, 0.3, -150);
      addBox(4.5, 1.5, 280, 0x8e98a6, -212, 0.3, -12);
      addBox(4.5, 1.5, 280, 0x8e98a6, 212, 0.3, -12);
    }
    if (ap.bridge) {
      addBox(18, 1.6, 200, 0xbac6d4, 0, 5.4, 225, { metalness: 0.3 });
    }
    if (ap.city) {
      [[-230, -300, 18, 54], [-185, -315, 22, 72], [175, -310, 20, 66], [225, -295, 18, 50]].forEach(([bx, bz, bw, bh]) => {
        addBox(bw, bh, bw, 0xc3d7ee, bx, bh * 0.5, bz, { map: this.texGlass, roughness: 0.2, metalness: 0.65 });
      });
    }
    if (ap.snow) {
      for (let tx = -190; tx <= 190; tx += 38) {
        const pine = new THREE.Mesh(new THREE.ConeGeometry(4.2, 11.5, 7), new THREE.MeshStandardMaterial({ color: 0x305642, roughness: 0.85 }));
        pine.position.set(tx, 5.6, -138);
        pine.castShadow = true;
        this.staticGroup.add(pine);
      }
    }

    // Distant Mountains
    [[-45, -420, 115, 76], [-210, -400, 130, 42], [145, -410, 140, 48]].forEach(([mx, mz, mr, mh]) => {
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(mr, mh, 12), new THREE.MeshStandardMaterial({ color: ap.snow ? 0xa8bcd4 : 0x5f7694, roughness: 0.92 }));
      mtn.position.set(mx, mh * 0.45, mz);
      this.staticGroup.add(mtn);
    });

    // 2. Runway with Dynamic Airport Designator Texture
    const rwyTex = makeRunwayTexture(ap.rwy, ap.snow);
    this.runwayMat = new THREE.MeshStandardMaterial({ map: rwyTex, roughness: 0.72, metalness: 0.08 });
    const rwy = new THREE.Mesh(new THREE.PlaneGeometry(310, 30), this.runwayMat);
    rwy.rotation.x = -Math.PI / 2;
    rwy.position.set(0, 0.06, -97);
    rwy.receiveShadow = true;
    this.staticGroup.add(rwy);

    // 3. Taxiway A + Connectors + Yellow Centerlines
    addBox(300, 0.08, 18, 0x3d4756, 0, 0.01, -55, { roughness: 0.78 });
    addBox(16, 0.08, 20, 0x3d4756, -95, 0.01, -73, { roughness: 0.78 });
    addBox(16, 0.08, 20, 0x3d4756, 95, 0.01, -73, { roughness: 0.78 });
    addBox(296, 0.04, 0.6, 0xf5c818, 0, 0.08, -55);

    // 4. Concrete Apron + Service Roads + Stand Numbers (6, 7, 14) + Red ERA Boundaries
    this.apronMat = new THREE.MeshStandardMaterial({ map: this.texConcrete, roughness: 0.78, metalness: 0.06 });
    const apron = new THREE.Mesh(new THREE.PlaneGeometry(276, 140), this.apronMat);
    apron.rotation.x = -Math.PI / 2;
    apron.position.set(0, 0.04, 28);
    apron.receiveShadow = true;
    this.staticGroup.add(apron);

    addBox(272, 0.06, 12, 0x475364, 0, 0.05, 50, { roughness: 0.76 });
    addBox(272, 0.06, 8, 0x475364, 0, 0.05, -38, { roughness: 0.76 });
    addBox(276, 0.08, 0.8, 0xdc2626, 0, 0.08, -42.1);

    // NGO Official Perimeter Road (場周道路 40km/h) + ILS Restricted Area Sign & Red Beacon
    addBox(340, 0.06, 14, 0x3b4554, 0, 0.05, -129, { roughness: 0.76 });
    for (let px = -155; px <= 155; px += 14) {
      addBox(6, 0.04, 0.35, 0xf8fafc, px, 0.09, -129);
    }
    // ILS Restricted Area Blue Border & Red Lamp Post (West side of Perimeter Road)
    addBox(50, 0.05, 0.65, 0x2563eb, -110, 0.10, -122.2);
    addBox(50, 0.05, 0.65, 0x2563eb, -110, 0.10, -135.8);
    addBox(0.4, 4.2, 0.4, 0x94a3b8, -85, 2.1, -121.5);
    addBox(3.6, 1.8, 0.25, 0xf8fafc, -85, 3.6, -121.5);
    this.ilsLampMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    this.ilsLampMesh.position.set(-85, 4.95, -121.5);
    this.staticGroup.add(this.ilsLampMesh);

    // NGO Official Service Lane (交互破線 alternating white dashes + solid centerline + Red Priority Triangle)
    addBox(14, 0.06, 28, 0x475364, -31, 0.06, -56, { roughness: 0.75 });
    addBox(0.35, 0.04, 28, 0xf8fafc, -31, 0.10, -56);
    for (let sz = -68; sz <= -44; sz += 4.2) {
      addBox(0.32, 0.04, 1.9, 0xf8fafc, -37.5, 0.10, sz);
      addBox(0.32, 0.04, 1.9, 0xf8fafc, -36.8, 0.10, sz + 1.8);
      addBox(0.32, 0.04, 1.9, 0xf8fafc, -24.5, 0.10, sz);
      addBox(0.32, 0.04, 1.9, 0xf8fafc, -25.2, 0.10, sz + 1.8);
    }
    // Red Aircraft Priority Ahead Triangle (前方航空機優先標識) + Stop Line at Service Lane entry
    addBox(12, 0.05, 0.7, 0xf8fafc, -31, 0.10, -40.5);
    const triGeo = new THREE.ConeGeometry(2.6, 0.06, 3);
    const triMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
    const triMesh = new THREE.Mesh(triGeo, triMat);
    triMesh.position.set(-31, 0.11, -38.0);
    triMesh.rotation.y = Math.PI;
    this.staticGroup.add(triMesh);

    // NGO T2 Blast Caution Zone (#71 / #77 Yellow Box)
    addBox(26, 0.05, 0.7, 0xfacc15, -117, 0.10, -26);
    addBox(26, 0.05, 0.7, 0xfacc15, -117, 0.10, -8);
    addBox(0.7, 0.05, 18, 0xfacc15, -130, 0.10, -17);
    addBox(0.7, 0.05, 18, 0xfacc15, -104, 0.10, -17);
    addBox(24.5, 0.03, 16.5, 0xfacc15, -117, 0.07, -17, { transparent: true, opacity: 0.16 });

    A3D_SPOTS.forEach(sp => {
      addBox(0.55, 0.04, 62, 0xf5c818, sp.cx, 0.08, -3);
      addBox(10.4, 0.04, 0.6, 0xf5c818, sp.cx, 0.08, 25);
      // Painted Stand Number Plate directly on concrete!
      const sTex = makeStandBadgeTexture(sp.ngoNo);
      const sPlate = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 4.4), new THREE.MeshStandardMaterial({ map: sTex, roughness: 0.7 }));
      sPlate.rotation.x = -Math.PI / 2;
      sPlate.position.set(sp.cx, 0.09, 30.8);
      this.staticGroup.add(sPlate);
      // Hydrant Fuel Pit under Starboard Wing
      addBox(1.8, 0.05, 1.8, 0xeab308, sp.cx - 11.4, 0.09, 7.6);
      // NGO Official PBB Red-Hatched Danger Zone (PBB危険区域) on Port (+X) side
      const px = sp.cx + 12.2, pz = sp.cz + 11.5;
      addBox(18.0, 0.04, 9.6, 0xdc2626, px, 0.08, pz, { transparent: true, opacity: 0.20 });
      addBox(18.0, 0.05, 0.35, 0xdc2626, px, 0.09, pz - 4.8);
      addBox(18.0, 0.05, 0.35, 0xdc2626, px, 0.09, pz + 4.8);
      for (let hx = -7; hx <= 7; hx += 3.5) {
        const bar = addBox(0.35, 0.04, 11.5, 0xef4444, px + hx, 0.095, pz);
        bar.rotation.y = 0.65;
      }
      // ERA Red Perimeter
      const e = sp.era;
      addBox(e.x2 - e.x1, 0.05, 0.5, 0xdc2626, (e.x1 + e.x2) * 0.5, 0.09, e.z1);
      addBox(e.x2 - e.x1, 0.05, 0.5, 0xdc2626, (e.x1 + e.x2) * 0.5, 0.09, e.z2);
      addBox(0.5, 0.05, e.z2 - e.z1, 0xdc2626, e.x1, 0.09, (e.z1 + e.z2) * 0.5);
      addBox(0.5, 0.05, e.z2 - e.z1, 0xdc2626, e.x2, 0.09, (e.z1 + e.z2) * 0.5);
    });

    // 5. Passenger Terminal + Glass Facade + Sky Deck + Port-Side Fixed PBB Piers & Rotundas
    this.glassMat = new THREE.MeshPhysicalMaterial({ map: this.texGlass, roughness: 0.12, metalness: 0.72, clearcoat: 1.0, emissive: new THREE.Color(0x000000) });
    addBox(146, 3.2, 32, 0xdbe3ee, -26, 1.6, 79);
    const termGlass = new THREE.Mesh(new THREE.BoxGeometry(144, 9.6, 30), this.glassMat);
    termGlass.position.set(-26, 8.0, 77);
    termGlass.castShadow = true;
    termGlass.receiveShadow = true;
    this.staticGroup.add(termGlass);
    addBox(152, 1.8, 35, 0x1b4f9c, -26, 13.7, 76, { metalness: 0.35, roughness: 0.35 });
    // Sky Deck
    addBox(16, 0.9, 19, 0xa6764e, 0, 14.0, 54.5, { roughness: 0.75 });
    addBox(12, 13.6, 5.5, 0xd7e0ec, 0, 6.8, 61);

    // Port-Side (+X) Fixed Piers & Rotundas
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

    // 6. ATC Control Tower + Cargo Terminal + Fire Station + Fuel Tanks
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

    // 7. Runway Lights & PAPI (Bloom emissive dots!)
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
    // Spot 6 (B738) & Spot 14 (B788) static neighbor aircraft + Spot 7 active fleet aircraft
    this.spot6Ac = createDetailedAirliner3D(AIRCRAFT_PROFILES.B738.visual3d);
    this.spot6Ac.position.set(-68, 0, 10);
    this.dynamicGroup.add(this.spot6Ac);

    this.spot14Ac = createDetailedAirliner3D(AIRCRAFT_PROFILES.B788.visual3d);
    this.spot14Ac.position.set(68, 0, 10);
    this.dynamicGroup.add(this.spot14Ac);

    // Spot 6 & Spot 14 PBBs & GSE
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

    // Spot 7 Interactive PBB, High-Lift Loader, Belt Loader, Chocks, Cones, FODs, De-icing Truck
    this.spot7Pbb = this.createPbbMesh(19, 2.1, 21.5, 3.6);
    this.spot7Pbb.userData.interact = { type: 'pbb', label: 'PBB Dock / Retract' };
    this.dynamicGroup.add(this.spot7Pbb);

    this.spot7Loader = createGseMesh('lowloader', { uldType: 'AKH', deckY: 2.05 });
    this.spot7Loader.position.set(-7.6, 0, 18.5);
    this.spot7Loader.rotation.y = Math.PI / 2;
    this.spot7Loader.userData.interact = { type: 'loader', label: 'High-Lift Loader & ULD' };
    this.dynamicGroup.add(this.spot7Loader);

    this.spot7Belt = createGseMesh('belt');
    this.spot7Belt.position.set(-7.2, 0, -7.5);
    this.spot7Belt.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.spot7Belt);

    this.spot7Hydrant = createGseMesh('hydrant');
    this.spot7Hydrant.position.set(-14.5, 0, 7.5);
    this.dynamicGroup.add(this.spot7Hydrant);

    this.deiceTruck = createGseMesh('deice');
    this.deiceTruck.position.set(-20, 0, 5);
    this.dynamicGroup.add(this.deiceTruck);

    // Chocks & Safety Cones group
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

    // 3 Interactive Glowing 3D FOD Objects (Directly clickable with Raycaster!)
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

    // Tail-Tipping Holographic Danger Ring
    this.tipRing = new THREE.Mesh(
      new THREE.RingGeometry(3.2, 5.2, 28).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.72, side: THREE.DoubleSide })
    );
    this.tipRing.position.set(0, 0.16, -10.5);
    this.tipRing.visible = false;
    this.dynamicGroup.add(this.tipRing);

    // Radar bar on ATC tower
    this.radarBar = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.85, 0.65), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 }));
    this.radarBar.position.set(-120, 34.4, 76);
    this.dynamicGroup.add(this.radarBar);

    // Living AI Traffic (Ramp Bus, Baggage Tractor, Distant AI Jet, Drifting 3D Clouds)
    this.aiBus = createGseMesh('ramp_bus');
    this.aiBus.rotation.y = -Math.PI / 2;
    this.dynamicGroup.add(this.aiBus);

    this.aiTractor = createGseMesh('tractor');
    this.aiTractor.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.aiTractor);

    this.aiJet = createDetailedAirliner3D(AIRCRAFT_PROFILES.A320.visual3d);
    this.aiJet.rotation.y = Math.PI / 2;
    this.dynamicGroup.add(this.aiJet);

    // Player Drivable GSE Vehicle
    this.playerVeh = createGseMesh('tractor');
    this.dynamicGroup.add(this.playerVeh);

    // Drifting Volumetric Cloud Clusters
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

  setActiveFleetAircraft(acId) {
    if (this.builtFleetId === acId && this.activeAc) return;
    if (this.activeAc) this.dynamicGroup.remove(this.activeAc);
    this.builtFleetId = acId;
    const prof = AIRCRAFT_PROFILES[acId] || AIRCRAFT_PROFILES.A320;
    this.activeAc = createDetailedAirliner3D(prof.visual3d || {});
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

  renderFrame(state, now) {
    if (this.disposed) return;
    const rect = this.canvas.getBoundingClientRect();
    const W = Math.max(240, Math.round(rect.width));
    const H = Math.max(200, Math.round(rect.height));
    const rawDpr = window.devicePixelRatio || 1;
    const dpr = state.gfxQuality === 'low' ? 0.85 : (state.gfxQuality === 'med' ? Math.min(rawDpr, 1.25) : Math.min(rawDpr, 2));

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
    this.setActiveFleetAircraft(state.fleetAircraftId || 'A320');

    // Time of Day & Weather Lighting + Wet Runway Reflections
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
    if (this.bloomPass) this.bloomPass.strength = isNight ? 0.65 : (isSunset ? 0.42 : 0.22);

    // Animate Actors
    const isFlight = state.subtab === 'flight';
    const isOps3d = state.subtab === 'ops3d';
    const flightPose = isFlight ? computeFlightCyclePose(state.flightPhaseIdx, state.flightProgress) : null;
    const tSec = (now || 0) * 0.001;
    this.radarBar.rotation.y = tSec * 1.4;

    // Clouds & AI Traffic
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

    // Position Spot 7 Active Aircraft + PBB + Loader + FODs + Tail-Tipping Physics
    const prof = AIRCRAFT_PROFILES[state.fleetAircraftId] || AIRCRAFT_PROFILES.A320;
    const wbConseq = state.wbConseq || null;
    const beaconBlink = Math.floor((now || 0) / 420) % 2 === 0;
    const strobeOn = ((now || 0) % 1100) < 110;

    let acPose = { x: 0, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: false };
    if (this.compact) {
      // Compact Live W&B x 3D Split Preview!
      const tipPitch = wbConseq && wbConseq.stressFlags.tailTip ? -0.22 : (wbConseq && wbConseq.stressFlags.noseHeavy ? 0.08 : 0);
      acPose = { x: 0, y: tipPitch < -0.1 ? 0.35 : 0, z: 10, heading: Math.PI / 2, pitch: tipPitch, beaconOn: false };
      this.updatePbbExt(this.spot7Pbb, prof.isFreighter ? 0 : 1);
      this.spot7Loader.visible = true;
      this.chocksGroup.visible = true;
      this.conesGroup.visible = true;
      this.playerVeh.visible = false;
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
      this.tipRing.visible = Boolean(wbConseq && wbConseq.stressFlags.tailTip);
    } else if (isOps3d) {
      const ho = state.handsOn;
      acPose = { x: 0, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: ho.beaconOn };
      this.updatePbbExt(this.spot7Pbb, ho.pbbExt);
      this.spot7Loader.visible = true;
      this.spot7Loader.userData.liftGroup.position.y = 0.65 + ho.loaderH * 1.45;
      this.spot7Loader.userData.uldMesh.position.z = ho.uldLoaded ? 3.8 : -1.2;
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
      this.spot7Loader.visible = state.flightPhaseIdx >= 3 && state.flightPhaseIdx <= 5;
      this.spot7Belt.visible = state.flightPhaseIdx >= 3 && state.flightPhaseIdx <= 5;
      this.spot7Hydrant.visible = state.flightPhaseIdx === 4;
      this.chocksGroup.visible = flightPose.chocksOn;
      this.conesGroup.visible = flightPose.conesOn;
      this.playerVeh.visible = false;
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
    } else {
      // Drive mode
      this.updatePbbExt(this.spot7Pbb, 1.0);
      this.spot7Loader.visible = true;
      this.spot7Belt.visible = true;
      this.spot7Hydrant.visible = false;
      this.chocksGroup.visible = true;
      this.conesGroup.visible = true;
      this.tipRing.visible = false;
      this.playerVeh.visible = state.camMode !== 'gse_cab';
      this.playerVeh.position.set(state.veh.x, 0, state.veh.z);
      this.playerVeh.rotation.y = Math.PI / 2 - state.veh.heading;
      Object.values(this.fodMeshes).forEach(m => { m.visible = false; });
    }

    // Apply Transform to Active Airliner (heading: 0 = +X, PI/2 = +Z -> Three.js rotation.y = Math.PI/2 - heading)
    this.activeAc.position.set(acPose.x, acPose.y, acPose.z);
    this.activeAc.rotation.order = 'YXZ';
    this.activeAc.rotation.y = Math.PI / 2 - acPose.heading;
    this.activeAc.rotation.x = -(acPose.pitch || 0);
    if (this.activeAc.userData.gearGroup) this.activeAc.userData.gearGroup.visible = acPose.y < 22;

    // Spin Engine Fans & Blink Aircraft Lights
    const fanSpeed = acPose.beaconOn ? 0.38 : 0.025;
    this.activeAc.userData.fans.forEach(f => { f.rotation.z += fanSpeed; });
    const lts = this.activeAc.userData.lights;
    if (lts.beaconTop) lts.beaconTop.visible = Boolean(acPose.beaconOn && beaconBlink);
    if (lts.strobeL) lts.strobeL.visible = Boolean(acPose.beaconOn && strobeOn);
    if (lts.strobeR) lts.strobeR.visible = Boolean(acPose.beaconOn && strobeOn);
    if (lts.noseLight) lts.noseLight.visible = Boolean(acPose.beaconOn);

    // Camera Smooth Damping
    let targetCam;
    if (this.compact) {
      const ang = tSec * 0.22;
      targetCam = { pos: [Math.cos(ang) * 34 - 6, 12.5, 10 + Math.sin(ang) * 32], target: [0, 3.8, 10], fov: 44, povKind: 'compact' };
    } else {
      targetCam = computeViewpointCamera(state.camMode, isFlight, flightPose, state.veh, state.cam, state.flightPhaseIdx);
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
    this.camera.updateProjectionMatrix();
    this.camera.position.set(...this.smoothCam.pos);
    this.camera.lookAt(...this.smoothCam.target);

    // Render with Post-Processing Bloom if ready
    if (this.composer && state.gfxQuality !== 'low') {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    // Render 2D HUD Overlay (Rain/Snow Particles, Anti-Overlap Labels, Pilot Glass-Cockpit HUD)
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

    // Weather particles (Rain / Snow / Fog)
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

    // Anti-overlap 3D Labels
    const placed = [];
    const drawTag = (pt, text, bg, fg = '#FFF', priority = 1) => {
      if (state.labelMode === 'min' && priority < 2) return;
      if (state.labelMode === 'smart' && priority < 1) return;
      const p = this.projectToScreen(pt, W, H);
      if (!p || p.x < -30 || p.x > W + 30 || p.y < 44 || p.y > H - 46) return;
      ctx.font = '600 10.5px "Hiragino Sans", system-ui, sans-serif';
      const tw = ctx.measureText(text).width + 12;
      const th = 19;
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
    if (state.subtab === 'ops3d') {
      state.handsOn.fods.filter(f => !f.cleared).forEach(f => {
        drawTag([f.x, 1.8, f.z], `⚠ CLICK FOD ${f.id}`, 'rgba(225,29,72,0.95)', '#FEF08A', 2);
      });
      drawTag([10, 6.2, 21.5], 'CLICK: PBB Dock', 'rgba(14,116,144,0.88)', '#FFF', 1);
      drawTag([-7.6, 4.5, 18.5], 'CLICK: High-Loader', 'rgba(14,116,144,0.88)', '#FFF', 1);
    } else if (state.subtab === 'flight' && flightPose) {
      const ph = A3D_FLIGHT_PHASES[state.flightPhaseIdx];
      if (povKind !== 'pilot') {
        drawTag([flightPose.ac.x, flightPose.ac.y + 12.8, flightPose.ac.z], `✈ ${state.fleetAircraftId} (${ap.id} Spot 7) · ${ph.tagJa}`, 'rgba(14,116,144,0.92)', '#FFF', 2);
      }
    }
    if (povKind !== 'pilot' && povKind !== 'gse_cab') {
      drawTag([0, 2.2, -97], `${ap.id} RWY ${ap.rwy}`, 'rgba(185,28,28,0.86)', '#FFF', 1);
      drawTag([-120, 38, 76], ap.twr, 'rgba(15,23,42,0.86)', '#FFF', 1);
    }

    // Pilot Glass-Cockpit HUD
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
