// Real-Geo 5-Airport Three.js 3D Engine + Turnaround GSE Service-Road Dispatcher + Camera Presets
// 100% Procedural & Offline-Ready (Zero external .glb or texture files)
import * as THREE from 'three';
import { convertAirportToCartesian } from '../data/airport_geo_data.js';
import {
  AIRCRAFT_3D_SPECS,
  AIRLINE_LIVERIES,
  createProceduralAirliner3D,
  createJetBlastHazardZone3D,
  animateJetBlastZone3D,
  animateAircraft3D,
  resolveAircraft3DType
} from './aircraft_3d_models.js';

// =====================================================================
// PROCEDURAL PBR TEXTURES (RUNWAY, CONCRETE, GLASS, SPOT SIGN)
// =====================================================================
function makeGeoRunwayTexture(rwyPair = '36/18', isSnow = false) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 2048;
  const ctx = c.getContext('2d');
  const [rA = '36', rB = '18'] = String(rwyPair).split('/');

  ctx.fillStyle = isSnow ? '#374151' : '#252B34';
  ctx.fillRect(0, 0, 512, 2048);

  // Subtle asphalt grain
  for (let i = 0; i < 6000; i++) {
    const g = (isSnow ? 48 : 30) + ((i * 23) % 24);
    ctx.fillStyle = `rgb(${g},${g + 3},${g + 7})`;
    ctx.fillRect((i * 53) % 512, (i * 97) % 2048, 2, 3);
  }
  if (isSnow) {
    ctx.fillStyle = 'rgba(235,244,255,0.52)';
    ctx.fillRect(0, 0, 26, 2048);
    ctx.fillRect(486, 0, 26, 2048);
  }

  // Rubber touchdown skid marks at both ends
  const drawSkid = (y0, y1) => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, 'rgba(8,10,14,0)');
    g.addColorStop(0.35, 'rgba(8,10,14,0.72)');
    g.addColorStop(0.75, 'rgba(8,10,14,0.4)');
    g.addColorStop(1, 'rgba(8,10,14,0)');
    ctx.fillStyle = g;
    ctx.fillRect(110, y0, 292, y1 - y0);
  };
  drawSkid(260, 680);
  drawSkid(1368, 1788);

  // Edge stripes
  ctx.fillStyle = '#E8EEF5';
  ctx.fillRect(22, 0, 12, 2048);
  ctx.fillRect(478, 0, 12, 2048);

  // Piano-key threshold markings (both ends)
  for (let x = 58; x <= 434; x += 38) {
    ctx.fillRect(x, 28, 20, 96);
    ctx.fillRect(x, 1924, 20, 96);
  }

  // Runway Numbers:
  // PlaneGeometry rotated -PI/2 maps canvas top (y=0, v=1) -> local -Z (thresholdA = rA!)
  // and canvas bottom (y=2048, v=0) -> local +Z (thresholdB = rB!)
  const drawNum = (yPos, rot, txt) => {
    ctx.save();
    ctx.fillStyle = '#F8FAFC';
    ctx.font = txt.length > 2 ? '900 96px "Arial Black", sans-serif' : '900 112px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(256, yPos);
    ctx.rotate(rot);
    ctx.fillText(txt, 0, 0);
    ctx.restore();
  };
  drawNum(205, Math.PI, rA);
  drawNum(1843, 0, rB);

  // Aiming point bars
  ctx.fillStyle = '#E5ECF4';
  ctx.fillRect(96, 360, 56, 130);
  ctx.fillRect(360, 360, 56, 130);
  ctx.fillRect(96, 1558, 56, 130);
  ctx.fillRect(360, 1558, 56, 130);

  // Dashed centerline
  for (let y = 300; y < 1740; y += 92) {
    ctx.fillRect(248, y, 16, 48);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeApronConcreteTex() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#B8C3D0';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4000; i++) {
    const v = 168 + ((i * 19) % 24);
    ctx.fillStyle = `rgb(${v},${v + 4},${v + 9})`;
    ctx.fillRect((i * 59) % 512, (i * 83) % 512, 3, 3);
  }
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.28)';
  ctx.lineWidth = 2;
  for (let p = 0; p <= 512; p += 64) {
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(512, p); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(20, 20);
  return tex;
}

function makeTerminalGlassTex() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#336599');
  g.addColorStop(0.5, '#649ACA');
  g.addColorStop(1, '#264C73');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'rgba(255, 240, 190, 0.28)';
  ctx.fillRect(0, 44, 512, 22);
  ctx.fillRect(0, 154, 512, 22);
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

function makeSpotNumberTexture(spotLabel) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 256, 160);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 240, 144);
  ctx.fillStyle = '#FACC15';
  ctx.font = '900 76px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(spotLabel).replace(/^S/, ''), 128, 84);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// =====================================================================
// PROCEDURAL GSE VEHICLE BUILDERS (SCALED IN REAL METERS)
// =====================================================================
function buildTurnaroundGseMesh(kind, targetHeightY = 2.8) {
  const g = new THREE.Group();
  const addBox = (w, h, d, col, x, y, z, metal = 0.25, rough = 0.42) => {
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
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x16191f, roughness: 0.9 });
  const addWheels = (wx, wzArr, r = 0.42) => {
    for (const wz of wzArr) {
      [-wx, wx].forEach(x => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.26, 12), wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(x, r, wz);
        g.add(w);
      });
    }
  };

  // All GSE vehicles face +Z (front of vehicle points toward aircraft attach point!)
  if (kind === 'stairs') {
    // Motorized Passenger Boarding Stairs adjusted to exact doorL1.y height!
    const topY = Math.max(2.6, Math.min(5.3, targetHeightY));
    addBox(2.3, 0.9, 6.2, 0xf8fafc, 0, 0.85, -0.4);
    addBox(2.2, 1.45, 2.0, 0x0284c7, 0, 1.85, -2.5);
    // Sloped stair ramp rising to +Z front platform
    const rampLen = Math.hypot(4.2, topY - 1.1);
    const rampAng = Math.atan2(topY - 1.1, 4.2);
    const ramp = addBox(1.85, 0.35, rampLen, 0xe2e8f0, 0, (topY + 1.1) * 0.5, 0.4);
    ramp.rotation.x = -rampAng;
    // Upper canopy platform flush with doorL1
    addBox(2.15, 0.28, 1.5, 0xfacc15, 0, topY - 0.12, 2.65);
    addBox(0.12, 1.1, 1.5, 0x0284c7, -1.0, topY + 0.45, 2.65);
    addBox(0.12, 1.1, 1.5, 0x0284c7, 1.0, topY + 0.45, 2.65);
    addWheels(1.12, [-2.2, 1.6], 0.44);
  } else if (kind === 'highloader') {
    // Widebody High-Lift ULD Loader (LD3 Container) matched to exact cargoFwd/Aft sill height!
    const deckY = Math.max(2.0, Math.min(3.5, targetHeightY));
    addBox(3.2, 0.72, 8.2, 0xeef2f8, 0, 0.62, 0, 0.35, 0.38);
    // Scissor lift & front bridge platform
    addBox(2.7, 0.25, 2.8, 0xd4dce6, 0, deckY, 2.7, 0.5, 0.35);
    addBox(3.1, 0.25, 4.6, 0xc8d2de, 0, deckY, -1.5, 0.5, 0.35);
    // Safety yellow guard rails
    addBox(0.12, 0.75, 4.5, 0xf59e0b, -1.5, deckY + 0.45, -1.5);
    addBox(0.12, 0.75, 4.5, 0xf59e0b, 1.5, deckY + 0.45, -1.5);
    // Silver LD3 (AKE) ULD container on deck
    addBox(1.85, 1.55, 2.0, 0xcbd5e1, 0, deckY + 0.9, -1.0, 0.62, 0.28);
    addBox(0.55, deckY - 0.8, 2.6, 0x334155, 0, deckY * 0.5, -1.4, 0.5, 0.5);
    addWheels(1.52, [-3.0, 0.2, 3.0], 0.38);
  } else if (kind === 'belt') {
    // Narrowbody Mobile Baggage Belt Loader matched to cargo sill height
    const topY = Math.max(1.5, Math.min(2.6, targetHeightY));
    addBox(2.0, 1.05, 5.6, 0xf59e0b, 0, 0.82, 0);
    addBox(1.8, 0.9, 1.6, 0x1e293b, 0, 1.5, -1.6);
    const boom = addBox(0.95, 0.28, 6.8, 0x1e293b, 0, (topY + 1.1) * 0.52, 0.8);
    boom.rotation.x = -Math.atan2(topY - 1.1, 5.8);
    addWheels(0.98, [-1.9, 1.9], 0.38);
  } else if (kind === 'fuel') {
    // Aviation Jet-A1 Fuel Tanker / Hydrant Dispenser (White + Red Stripe + Yellow Hose Boom)
    addBox(2.6, 1.85, 7.6, 0xf8fafc, 0, 1.35, -0.4);
    addBox(2.68, 0.42, 6.6, 0xdc2626, 0, 1.55, -0.8);
    addBox(2.4, 1.65, 2.1, 0xef4444, 0, 1.32, 3.2);
    // Refueling hose stand
    addBox(0.18, Math.max(1.5, targetHeightY - 1.0), 0.18, 0xfacc15, 0, targetHeightY * 0.65, 1.8);
    addWheels(1.26, [-2.8, -1.2, 2.8], 0.48);
  } else if (kind === 'gpu') {
    // Ground Power Unit (GPU) 400Hz Yellow Generator Cart + Orange Power Cable
    addBox(1.85, 1.35, 3.3, 0xeab308, 0, 0.95, 0);
    addBox(1.9, 0.26, 3.35, 0x1e293b, 0, 1.65, 0);
    addBox(0.16, 0.12, 2.6, 0xf97316, 0, 0.35, 2.6);
    addWheels(0.92, [-1.0, 1.0], 0.34);
  } else if (kind === 'lav' || kind === 'water') {
    const col = kind === 'lav' ? 0x64748b : 0x0ea5e9;
    addBox(2.2, 1.5, 5.2, 0xf8fafc, 0, 1.1, -0.3);
    addBox(2.25, 0.65, 3.4, col, 0, 1.35, -1.0);
    addBox(2.1, 1.35, 1.5, col, 0, 1.05, 2.1);
    addWheels(1.08, [-1.8, 1.8], 0.4);
  } else if (kind === 'tug') {
    // Heavy Aircraft Pushback Tractor + Yellow Towbar extending along -Z toward noseGear!
    addBox(3.0, 1.25, 5.8, 0xf59e0b, 0, 0.92, 0, 0.35, 0.35);
    addBox(2.3, 0.85, 2.2, 0x38bdf8, 0, 1.9, 0.4, 0.8, 0.12);
    // Flashing amber beacon on cab
    const beacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    beacon.position.set(0, 2.52, 0.4);
    g.add(beacon);
    // Yellow Towbar (connects cleanly to aircraft noseGear!)
    const towbar = addBox(0.24, 0.22, 4.2, 0xfacc15, 0, 0.52, 4.6, 0.4, 0.35);
    g.userData.towbar = towbar;
    addWheels(1.48, [-1.9, 1.9], 0.52);
  }
  return g;
}

// =====================================================================
// MAIN TURNAROUND 3D ENGINE CLASS (5 REAL AIRPORTS + ANIMATED GSE)
// =====================================================================
export class TurnaroundScene3D {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.disposed = false;
    this.airportCode = opts.airportCode || 'NGO';
    this.aircraftType = resolveAircraft3DType(opts.aircraftType || 'B789');
    this.liveryId = opts.liveryId || AIRCRAFT_3D_SPECS[this.aircraftType].defaultLivery;
    this.spotId = opts.spotId || null;
    this.cameraPreset = 'spot'; // 'overview' | 'tower' | 'spot'
    this.doneSteps = new Set();
    this.showBlastZone = true; // Shows glowing Jet Blast + Engine Intake danger zone clearly!

    // Renderer (standard depth buffer + dynamic altitude-scaled near plane -> 60fps zero-lag & zero Z-fighting!)
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._onCtxLost = e => { e.preventDefault(); this.stop(); };
    this._onCtxRestored = () => { this.start(); };
    canvas.addEventListener('webglcontextlost', this._onCtxLost);
    canvas.addEventListener('webglcontextrestored', this._onCtxRestored);

    // Scene & Lighting
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x9bc5e8);
    this.scene.fog = new THREE.FogExp2(0xb8d7f0, 0.00018);

    this.camera = new THREE.PerspectiveCamera(46, 16 / 9, 2.0, 9500);

    this.sunLight = new THREE.DirectionalLight(0xfff7e8, 2.2);
    this.sunLight.position.set(600, 950, 450);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.near = 100;
    this.sunLight.shadow.camera.far = 3000;
    const sd = 240;
    this.sunLight.shadow.camera.left = -sd;
    this.sunLight.shadow.camera.right = sd;
    this.sunLight.shadow.camera.top = sd;
    this.sunLight.shadow.camera.bottom = -sd;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    this.hemiLight = new THREE.HemisphereLight(0x9bd0ff, 0x455568, 0.92);
    this.scene.add(this.hemiLight);

    // Groups
    this.airportGroup = new THREE.Group();
    this.scene.add(this.airportGroup);

    this.spotOpsGroup = new THREE.Group();
    this.scene.add(this.spotOpsGroup);

    // Shared procedural textures
    this.texConcrete = makeApronConcreteTex();
    this.texGlass = makeTerminalGlassTex();
    this.waterUniforms = { uTime: { value: 0 }, uDeep: { value: new THREE.Color(0x0c4a6e) }, uShallow: { value: new THREE.Color(0x1d709c) } };

    // Smooth Inertial OrbitControls (100% built-in & offline — zero external addon dependency!)
    this.orbit = {
      target: new THREE.Vector3(),
      goalTarget: new THREE.Vector3(),
      spherical: { radius: 110, theta: 0.75, phi: 1.05 },
      goalSpherical: { radius: 110, theta: 0.75, phi: 1.05 },
      dragging: false,
      rightDrag: false,
      lastX: 0,
      lastY: 0
    };
    this._bindOrbitControls();

    // Dynamic Turnaround State
    this.geoData = null;
    this.activeSpot = null;
    this.aircraftMesh = null;
    this.chocksGroup = null;
    this.gseActors = {}; // id -> { mesh, waypoints[], progress, active, kind }
    this.pushbackProgress = 0;
    this.pushbackActive = false;
    this.radarDish = null;
    this.rafId = null;
    this.lastTime = 0;

    // Initial Build
    this.loadAirport(this.airportCode, this.spotId);
  }

  _bindOrbitControls() {
    const el = this.canvas;
    this._onDown = e => {
      this.orbit.dragging = true;
      this.orbit.rightDrag = e.button === 2 || e.shiftKey;
      this.orbit.lastX = e.clientX;
      this.orbit.lastY = e.clientY;
    };
    this._onMove = e => {
      if (!this.orbit.dragging) return;
      const dx = e.clientX - this.orbit.lastX;
      const dy = e.clientY - this.orbit.lastY;
      this.orbit.lastX = e.clientX;
      this.orbit.lastY = e.clientY;
      if (this.orbit.rightDrag) {
        const panScale = this.orbit.goalSpherical.radius * 0.0014;
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
        this.orbit.goalTarget.addScaledVector(right, -dx * panScale);
        this.orbit.goalTarget.addScaledVector(forward, dy * panScale);
      } else {
        this.orbit.goalSpherical.theta -= dx * 0.0065;
        this.orbit.goalSpherical.phi = Math.max(0.14, Math.min(1.48, this.orbit.goalSpherical.phi - dy * 0.0055));
      }
    };
    this._onUp = () => { this.orbit.dragging = false; };
    this._onWheel = e => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.12 : 0.89;
      this.orbit.goalSpherical.radius = Math.max(26, Math.min(4800, this.orbit.goalSpherical.radius * factor));
    };
    this._onContext = e => e.preventDefault();

    el.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointermove', this._onMove);
    window.addEventListener('pointerup', this._onUp);
    el.addEventListener('wheel', this._onWheel, { passive: false });
    el.addEventListener('contextmenu', this._onContext);
  }

  loadAirport(airportCode, spotId = null) {
    this.airportCode = airportCode || 'NGO';
    this.geoData = convertAirportToCartesian(this.airportCode);
    this.activeSpot = this.geoData.spotsXYZ.find(s => s.id === spotId) || this.geoData.spotsXYZ[0];
    this.spotId = this.activeSpot.id;

    // Clear previous static airport meshes
    while (this.airportGroup.children.length) this.airportGroup.remove(this.airportGroup.children[0]);
    this._buildAirportTerrainAndInfra();
    this._rebuildSpotAircraftAndGse();
    this.setCameraPreset(this.cameraPreset, true);
  }

  setSpot(spotId) {
    if (!this.geoData) return;
    const sp = this.geoData.spotsXYZ.find(s => s.id === spotId);
    if (!sp) return;
    this.activeSpot = sp;
    this.spotId = sp.id;
    this._rebuildSpotAircraftAndGse();
    this.setCameraPreset(this.cameraPreset, false);
  }

  setAircraftAndLivery(acType, liveryId) {
    this.aircraftType = resolveAircraft3DType(acType || this.aircraftType);
    this.liveryId = liveryId || this.liveryId || AIRCRAFT_3D_SPECS[this.aircraftType].defaultLivery;
    this._rebuildSpotAircraftAndGse();
  }

  syncTurnaroundSteps(doneStepIds = []) {
    this.doneSteps = new Set(doneStepIds);
    const has = id => this.doneSteps.has(id);
    const pushing = has('pushback');
    this.pushbackActive = pushing;
    if (!pushing) this.pushbackProgress = 0;

    // Activate/Retract each GSE actor cleanly!
    const setActor = (id, active) => {
      if (this.gseActors[id]) this.gseActors[id].active = Boolean(active) && !pushing;
    };

    if (this.chocksGroup) {
      this.chocksGroup.visible = has('chock') && !pushing;
    }
    setActor('gpu', has('gpu'));
    setActor('stairsL1', has('unload') || has('board'));
    setActor('cargoFwd', has('unload') || has('load'));
    setActor('cargoAft', has('load'));
    setActor('fuel', has('fuel'));
    setActor('lav', has('lav'));
    setActor('water', has('water'));

    if (this.gseActors.tug) {
      this.gseActors.tug.active = pushing;
    }
  }

  setCameraPreset(preset = 'spot', instant = false) {
    this.cameraPreset = preset;
    if (!this.geoData || !this.activeSpot) return;
    const sp = this.activeSpot.pos;

    if (preset === 'overview') {
      // Wide dramatic aerial overview of the entire real-scale island / runway / terminals
      this.orbit.goalTarget.set(sp.x * 0.35, 0, sp.z * 0.35);
      this.orbit.goalSpherical.radius = 2350;
      this.orbit.goalSpherical.theta = 0.72;
      this.orbit.goalSpherical.phi = 0.88;
    } else if (preset === 'tower') {
      // Positioned right beside the airport's real ATC Control Tower looking toward the active Spot & Runway!
      const tw = this.geoData.atcTowerXYZ;
      const dx = sp.x - tw.pos.x;
      const dz = sp.z - tw.pos.z;
      const dist = Math.max(120, Math.hypot(dx, dz));
      const thetaFromSpot = Math.atan2(tw.pos.x - sp.x, tw.pos.z - sp.z);
      this.orbit.goalTarget.set(sp.x, 8, sp.z);
      this.orbit.goalSpherical.radius = Math.min(620, dist);
      this.orbit.goalSpherical.theta = thetaFromSpot;
      this.orbit.goalSpherical.phi = Math.max(0.85, Math.min(1.38, Math.atan2(dist, tw.heightM)));
    } else {
      // Apron / Spot Close-up View framing the aircraft + approaching GSE vehicles
      const rotY = this.activeSpot.rotY;
      this.orbit.goalTarget.set(sp.x, 6.5, sp.z);
      this.orbit.goalSpherical.radius = this.aircraftType === 'B77W' || this.aircraftType === 'B789' ? 112 : 84;
      this.orbit.goalSpherical.theta = rotY - 0.85;
      this.orbit.goalSpherical.phi = 1.08;
    }

    if (instant) {
      this.orbit.target.copy(this.orbit.goalTarget);
      this.orbit.spherical.radius = this.orbit.goalSpherical.radius;
      this.orbit.spherical.theta = this.orbit.goalSpherical.theta;
      this.orbit.spherical.phi = this.orbit.goalSpherical.phi;
    }
  }

  // -------------------------------------------------------------------
  // BUILD REAL-GEO 3D AIRPORT TERRAIN, WATER SHADER, RUNWAYS & SPOTS
  // -------------------------------------------------------------------
  _buildAirportTerrainAndInfra() {
    const g = this.geoData;
    const isIsland = g.terrainType === 'bay_island';
    const isSnow = g.hasSnow;

    // Sky & Fog mood tuned to airport geography
    this.scene.background = new THREE.Color(isSnow ? 0xcadbee : 0x8cc0ea);
    this.scene.fog = new THREE.FogExp2(isSnow ? 0xd2e1ef : 0xb3d5f2, 0.00014);

    // 1. Base Ground / Reflective Bay Water Shader
    if (isIsland) {
      this.waterUniforms.uDeep.value.setHex(g.waterColor);
      this.waterUniforms.uShallow.value.setHex(g.waterColor).offsetHSL(0.01, 0.05, 0.14);
      const waterMat = new THREE.ShaderMaterial({
        uniforms: this.waterUniforms,
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uDeep;
          uniform vec3 uShallow;
          varying vec3 vWorldPos;
          void main() {
            float w1 = sin(vWorldPos.x * 0.018 + uTime * 0.9) * cos(vWorldPos.z * 0.021 - uTime * 0.7);
            float w2 = sin((vWorldPos.x + vWorldPos.z) * 0.035 - uTime * 1.25);
            float wave = (w1 + w2) * 0.5;
            vec3 col = mix(uDeep, uShallow, 0.42 + wave * 0.16);
            // Subtle Fresnel sky reflection sheen
            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            float fresnel = pow(1.0 - max(viewDir.y, 0.0), 3.0);
            col = mix(col, vec3(0.72, 0.87, 0.98), fresnel * 0.55);
            // Sun sparkle glint
            float glint = smoothstep(0.78, 0.99, wave + fresnel * 0.35);
            col += vec3(0.95, 0.97, 1.0) * glint * 0.14;
            gl_FragColor = vec4(col, 1.0);
          }
        `
      });
      const sea = new THREE.Mesh(new THREE.PlaneGeometry(16000, 16000), waterMat);
      sea.rotation.x = -Math.PI / 2;
      sea.position.y = -3.0;
      sea.renderOrder = 0;
      this.airportGroup.add(sea);
    } else {
      // Inland Chiba green plateau (NRT) or Hokkaido snow plain (CTS)
      const landMat = new THREE.MeshStandardMaterial({
        color: g.landColor,
        roughness: isSnow ? 0.62 : 0.92,
        metalness: 0.04
      });
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(16000, 16000), landMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.2;
      ground.receiveShadow = true;
      ground.renderOrder = 0;
      this.airportGroup.add(ground);

      // Rolling distant hills / mountains
      const hillCol = isSnow ? 0xb4c8dc : 0x3b6340;
      const hillMat = new THREE.MeshStandardMaterial({ color: hillCol, roughness: 0.92 });
      [
        [-2800, -3400, 950, 260], [1800, -3800, 1200, 320],
        [-3200, 2400, 1100, 220], [3200, 1800, 980, 210]
      ].forEach(([hx, hz, hr, hh]) => {
        const hill = new THREE.Mesh(new THREE.ConeGeometry(hr, hh, 12), hillMat);
        hill.position.set(hx, hh * 0.45 - 5, hz);
        this.airportGroup.add(hill);
      });
    }

    // Helper: Extrude Lat/Lon polygon contour into flat 3D island/apron slab
    const addExtrudedPoly = (ptsXYZ, height, yBase, mat) => {
      if (!ptsXYZ || ptsXYZ.length < 3) return;
      const shape = new THREE.Shape();
      // Shape lives in XY -> rotateX(-PI/2) maps (shapeX, shapeY) -> (worldX, -worldZ), so pass -z!
      shape.moveTo(ptsXYZ[0].x, -ptsXYZ[0].z);
      for (let i = 1; i < ptsXYZ.length; i++) shape.lineTo(ptsXYZ[i].x, -ptsXYZ[i].z);
      shape.closePath();
      const geo = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = yBase;
      mesh.receiveShadow = true;
      this.airportGroup.add(mesh);
      return mesh;
    };

    // Artificial Island Landmass (+ KIX Island 2 + Seawall) -> top strictly at y = 0.0
    const islandMat = new THREE.MeshStandardMaterial({ color: g.landColor, roughness: isSnow ? 0.58 : 0.88 });
    const isl1 = addExtrudedPoly(g.boundaryXYZ, isIsland ? 3.0 : 1.2, isIsland ? -3.0 : -1.2, islandMat);
    if (isl1) isl1.renderOrder = 1;
    if (g.secondaryIslandXYZ) {
      const isl2 = addExtrudedPoly(g.secondaryIslandXYZ, 3.0, -3.0, islandMat);
      if (isl2) isl2.renderOrder = 1;
    }

    // Access Bridge (NGO Centrair Bridge / KIX Sky Gate Bridge)
    if (g.bridgeXYZ && g.bridgeXYZ.length >= 2) {
      const p0 = g.bridgeXYZ[0], p1 = g.bridgeXYZ[1];
      const len = Math.hypot(p1.x - p0.x, p1.z - p0.z);
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(28, 4.5, len),
        new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.5, metalness: 0.25 })
      );
      bridge.position.set((p0.x + p1.x) * 0.5, 9, (p0.z + p1.z) * 0.5);
      bridge.rotation.y = Math.atan2(p1.x - p0.x, p1.z - p0.z);
      this.airportGroup.add(bridge);
    }

    // 2. RUNWAYS (True-to-Scale Meters + Runway Markings + PAPI + Glowing Edge Lights)
    const edgeLightMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });
    const papiRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const papiWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (const rwy of g.runwaysXYZ) {
      const rwyTex = makeGeoRunwayTexture(rwy.label, isSnow);
      const rwyMat = new THREE.MeshStandardMaterial({
        map: rwyTex,
        roughness: 0.72,
        metalness: 0.08,
        polygonOffset: true,
        polygonOffsetFactor: -3,
        polygonOffsetUnits: -3
      });
      // Align PlaneGeometry cleanly using group wrapper (local -Z = thresholdA, local +Z = thresholdB)
      const rwyGroup = new THREE.Group();
      rwyGroup.position.set(rwy.cx, 0.42, rwy.cz);
      rwyGroup.rotation.y = rwy.rotY;

      const strip = new THREE.Mesh(new THREE.PlaneGeometry(rwy.widthM, rwy.actualLen), rwyMat);
      strip.rotation.x = -Math.PI / 2;
      strip.receiveShadow = true;
      strip.renderOrder = 4;
      rwyGroup.add(strip);

      // Glowing Runway Edge Lights (instanced for 60fps!)
      const halfL = rwy.actualLen * 0.48;
      const halfW = rwy.widthM * 0.5 + 2.2;
      const step = 120;
      const count = Math.floor((halfL * 2) / step) * 2 + 4;
      const lightGeo = new THREE.SphereGeometry(1.15, 6, 6);
      const instLights = new THREE.InstancedMesh(lightGeo, edgeLightMat, count);
      const dummy = new THREE.Object3D();
      let idx = 0;
      for (let z = -halfL; z <= halfL; z += step) {
        for (const sx of [-halfW, halfW]) {
          if (idx >= count) break;
          dummy.position.set(sx, 0.9, z);
          dummy.updateMatrix();
          instLights.setMatrixAt(idx++, dummy.matrix);
        }
      }
      instLights.count = idx;
      rwyGroup.add(instLights);

      // PAPI 4-Light Approach Indicator Box beside both ends (2 White / 2 Red = On Glidepath!)
      for (const endSign of [-1, 1]) {
        for (let p = 0; p < 4; p++) {
          const papi = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.4), p < 2 ? papiWhiteMat : papiRedMat);
          papi.position.set(-(halfW + 12 + p * 4.5) * endSign, 0.7, endSign * (halfL - 280));
          rwyGroup.add(papi);
        }
      }

      this.airportGroup.add(rwyGroup);
    }

    // 3. TAXIWAYS (Dark asphalt at y=0.22 + Yellow centerlines at y=0.30, zero Z-fighting!)
    const twyMat = new THREE.MeshStandardMaterial({
      color: 0x3b4453,
      roughness: 0.78,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });
    const yellowMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -5,
      polygonOffsetUnits: -5
    });
    for (const tw of g.taxiwaysXYZ) {
      for (let i = 0; i < tw.pointsXYZ.length - 1; i++) {
        const a = tw.pointsXYZ[i], b = tw.pointsXYZ[i + 1];
        const len = Math.hypot(b.x - a.x, b.z - a.z);
        const seg = new THREE.Mesh(new THREE.PlaneGeometry(tw.widthM, len + tw.widthM * 0.4), twyMat);
        seg.rotation.x = -Math.PI / 2;
        const rot = Math.atan2(b.x - a.x, b.z - a.z);
        const twGrp = new THREE.Group();
        twGrp.position.set((a.x + b.x) * 0.5, 0.22, (a.z + b.z) * 0.5);
        twGrp.rotation.y = rot;
        seg.receiveShadow = true;
        seg.renderOrder = 2;
        twGrp.add(seg);

        const line = new THREE.Mesh(new THREE.PlaneGeometry(0.7, len), yellowMat);
        line.rotation.x = -Math.PI / 2;
        line.position.y = 0.08;
        line.renderOrder = 6;
        twGrp.add(line);
        this.airportGroup.add(twGrp);
      }
    }

    // 4. CONCRETE APRONS (y = 0.28, cleanly above taxiways & island!)
    const apronMat = new THREE.MeshStandardMaterial({
      map: this.texConcrete,
      roughness: 0.76,
      metalness: 0.05,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
    for (const apr of g.apronsXYZ) {
      const m = addExtrudedPoly(apr.pointsXYZ, 0.14, 0.14, apronMat);
      if (m) m.renderOrder = 3;
    }

    // 5. GSE SERVICE ROAD (y = 0.48, cleanly above concrete apron!)
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4
    });
    const whiteMat = new THREE.MeshBasicMaterial({
      color: 0xf8fafc,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -6,
      polygonOffsetUnits: -6
    });
    for (let i = 0; i < g.gseServiceRoadXYZ.length - 1; i++) {
      const a = g.gseServiceRoadXYZ[i], b = g.gseServiceRoadXYZ[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const rot = Math.atan2(b.x - a.x, b.z - a.z);
      const rdGrp = new THREE.Group();
      rdGrp.position.set((a.x + b.x) * 0.5, 0.48, (a.z + b.z) * 0.5);
      rdGrp.rotation.y = rot;
      const rMesh = new THREE.Mesh(new THREE.PlaneGeometry(12, len + 10), roadMat);
      rMesh.rotation.x = -Math.PI / 2;
      rMesh.receiveShadow = true;
      rMesh.renderOrder = 5;
      rdGrp.add(rMesh);

      const cl = new THREE.Mesh(new THREE.PlaneGeometry(0.45, len), whiteMat);
      cl.rotation.x = -Math.PI / 2;
      cl.position.y = 0.05;
      cl.renderOrder = 6;
      rdGrp.add(cl);
      this.airportGroup.add(rdGrp);
    }

    // 6. TERMINAL 1 / TERMINAL 2 ARCHITECTURAL BUILDINGS
    for (const tm of g.terminalsXYZ) {
      const tg = new THREE.Group();
      tg.position.set(tm.pos.x, 0, tm.pos.z);
      // Compass heading clockwise -> negative rotation around Three.js +Y axis!
      tg.rotation.y = -(tm.rotDeg * Math.PI) / 180;

      const wallMat = new THREE.MeshStandardMaterial({ map: this.texGlass, color: 0xdbeafe, roughness: 0.25, metalness: 0.45 });
      const roofMat = new THREE.MeshStandardMaterial({ color: tm.color || 0xe2e8f0, roughness: 0.48, metalness: 0.22 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(tm.widthM, tm.heightM, tm.depthM), [wallMat, wallMat, roofMat, roofMat, wallMat, wallMat]);
      body.position.y = tm.heightM * 0.5;
      body.castShadow = true;
      body.receiveShadow = true;
      tg.add(body);

      // Architectural overhanging roof cornice
      const roof = new THREE.Mesh(new THREE.BoxGeometry(tm.widthM + 8, 2.2, tm.depthM + 8), roofMat);
      roof.position.y = tm.heightM + 1.1;
      roof.castShadow = true;
      tg.add(roof);

      this.airportGroup.add(tg);
    }

    // 7. ATC CONTROL TOWER (Authentic height per airport: 116m HND, 87m NGO/NRT/KIX, 68m CTS)
    const tw = g.atcTowerXYZ;
    const towerGroup = new THREE.Group();
    towerGroup.position.set(tw.pos.x, 0, tw.pos.z);
    const shaftH = tw.heightM - 10;
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(5.5, 8.2, shaftH, 12),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.5 })
    );
    shaft.position.y = shaftH * 0.5;
    shaft.castShadow = true;
    towerGroup.add(shaft);

    const cab = new THREE.Mesh(
      new THREE.CylinderGeometry(11.5, 8.5, 8.5, 8),
      new THREE.MeshPhysicalMaterial({ color: 0x0f2b4c, roughness: 0.1, metalness: 0.82, clearcoat: 1.0 })
    );
    cab.position.y = shaftH + 4.2;
    towerGroup.add(cab);

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(12.2, 12.2, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
    );
    cap.position.y = shaftH + 9.2;
    towerGroup.add(cap);

    const radar = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 1.6, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 })
    );
    radar.position.y = shaftH + 12.5;
    towerGroup.add(radar);
    this.radarDish = radar;
    this.airportGroup.add(towerGroup);

    // 8. ALL 8 NUMBERED SPOTS / GATES PAINTED ON APRON (y=0.52, depthWrite=false -> zero Z-fighting!)
    const redEraMat = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -6,
      polygonOffsetUnits: -6
    });
    for (const sp of g.spotsXYZ) {
      const sg = new THREE.Group();
      sg.position.set(sp.pos.x, 0.52, sp.pos.z);
      sg.rotation.y = sp.rotY;

      const addFlatLine = (w, d, x, z, mat) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
        m.rotation.x = -Math.PI / 2;
        m.position.set(x, 0, z);
        m.renderOrder = 6;
        sg.add(m);
      };
      addFlatLine(0.65, 78, 0, -2, yellowMat);
      addFlatLine(8.5, 0.7, 0, 26, yellowMat);

      const eraW = 68, eraL = 78;
      addFlatLine(eraW, 0.5, 0, eraL * 0.5, redEraMat);
      addFlatLine(eraW, 0.5, 0, -eraL * 0.5, redEraMat);
      addFlatLine(0.5, eraL, -eraW * 0.5, 0, redEraMat);
      addFlatLine(0.5, eraL, eraW * 0.5, 0, redEraMat);

      // Painted Spot Number Placard on Apron
      const numPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 6.4),
        new THREE.MeshBasicMaterial({ map: makeSpotNumberTexture(sp.id), depthWrite: false, polygonOffset: true, polygonOffsetFactor: -7 })
      );
      numPlane.rotation.x = -Math.PI / 2;
      numPlane.position.set(0, 0.04, 34);
      numPlane.renderOrder = 7;
      sg.add(numPlane);

      this.airportGroup.add(sg);
    }
  }

  // -------------------------------------------------------------------
  // REBUILD ACTIVE AIRCRAFT + EXACT ATTACH-POINT GSE FLEET ON SPOT
  // -------------------------------------------------------------------
  _rebuildSpotAircraftAndGse() {
    while (this.spotOpsGroup.children.length) this.spotOpsGroup.remove(this.spotOpsGroup.children[0]);
    this.gseActors = {};

    const sp = this.activeSpot;
    if (!sp) return;

    // Position the entire Spot Ops local coordinate frame at the active Spot (flush on concrete apron y=0.30)!
    this.spotOpsGroup.position.set(sp.pos.x, 0.30, sp.pos.z);
    this.spotOpsGroup.rotation.y = sp.rotY;

    // Keep shadow camera centered tightly on the active Spot for crisp aircraft & GSE shadows!
    this.sunLight.target.position.set(sp.pos.x, 0, sp.pos.z);
    this.sunLight.position.set(sp.pos.x + 280, 420, sp.pos.z + 240);

    // 1. Real Sculpted GLB Airliner + High-Visibility Jet Blast & Engine Ingestion Danger Zone!
    this.aircraftMesh = createProceduralAirliner3D(this.aircraftType, this.liveryId);
    const spec = AIRCRAFT_3D_SPECS[this.aircraftType];
    this.blastZone = createJetBlastHazardZone3D(spec);
    this.aircraftMesh.add(this.blastZone);
    this.spotOpsGroup.add(this.aircraftMesh);

    const ap = spec.attachPoints;

    // 2. Wheel Chocks & Safety Cones (Visible after 'chock')
    const chocks = new THREE.Group();
    const chockMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.45 });
    const addChock = (x, z) => {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.3, 0.35), chockMat);
      c.position.set(x, 0.15, z);
      chocks.add(c);
    };
    addChock(0, ap.noseGear.z + 0.72);
    addChock(0, ap.noseGear.z - 0.72);
    // Safety cones around nose, engines & wingtips
    const halfSpan = spec.wingspanM * 0.5;
    [
      [0, spec.lengthM * 0.5 + 2.2],
      [halfSpan + 1.5, -5], [-halfSpan - 1.5, -5],
      [spec.engineSpanX, spec.engineZOffset + 4.5], [-spec.engineSpanX, spec.engineZOffset + 4.5]
    ].forEach(([cx, cz]) => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.15, 8), coneMat);
      cone.position.set(cx, 0.58, cz);
      chocks.add(cone);
    });
    chocks.visible = false;
    this.chocksGroup = chocks;
    this.spotOpsGroup.add(chocks);

    // 3. Build Animated GSE Actors with Service-Road Waypoints -> Exact `attachPoints` (Zero Clipping!)
    const roadZ = spec.lengthM * 0.5 + 16; // Head-of-stand GSE Service Road in Spot-local coords

    const registerGse = (id, kind, targetY, waypoints, finalFacePt) => {
      const mesh = buildTurnaroundGseMesh(kind, targetY);
      mesh.position.set(waypoints[0].x, 0, waypoints[0].z);
      mesh.visible = false;
      this.spotOpsGroup.add(mesh);
      this.gseActors[id] = {
        id,
        kind,
        mesh,
        waypoints,
        finalFacePt,
        progress: 0, // 0 = parked on GSE Service Road, 1 = docked flush at attachPoint
        active: false
      };
    };

    // Passenger Stairs -> doorL1 (+X port side)
    registerGse('stairsL1', 'stairs', ap.doorL1.y, [
      { x: 34, z: roadZ },
      { x: ap.doorL1.dockX + 8.5, z: roadZ },
      { x: ap.doorL1.dockX + 4.5, z: ap.doorL1.z },
      { x: ap.doorL1.dockX + 2.1, z: ap.doorL1.z }
    ], { x: ap.doorL1.x, z: ap.doorL1.z });

    // GPU Cart -> gpuPort (-X starboard nose)
    registerGse('gpu', 'gpu', ap.gpuPort.y, [
      { x: -32, z: roadZ },
      { x: ap.gpuPort.dockX - 3.5, z: roadZ },
      { x: ap.gpuPort.dockX - 1.5, z: ap.gpuPort.z + 2.5 }
    ], { x: ap.gpuPort.x, z: ap.gpuPort.z });

    // Cargo Forward Loader (High-Lift LD3 for B789/B77W, Belt Loader for A321/B738) -> cargoFwd (-X starboard)
    const cargoKind = ap.cargoFwd.gseKind || 'belt';
    const loaderOffset = cargoKind === 'highloader' ? 3.8 : 2.9;
    registerGse('cargoFwd', cargoKind, ap.cargoFwd.y, [
      { x: -42, z: roadZ },
      { x: ap.cargoFwd.dockX - 14, z: roadZ },
      { x: ap.cargoFwd.dockX - 12, z: ap.cargoFwd.z },
      { x: ap.cargoFwd.dockX - loaderOffset, z: ap.cargoFwd.z }
    ], { x: ap.cargoFwd.x, z: ap.cargoFwd.z });

    // Cargo Aft Loader -> cargoAft (-X starboard aft of wing!)
    registerGse('cargoAft', cargoKind, ap.cargoAft.y, [
      { x: -46, z: roadZ },
      { x: -(halfSpan + 5.5), z: roadZ },
      { x: -(halfSpan + 5.5), z: ap.cargoAft.z },
      { x: ap.cargoAft.dockX - loaderOffset, z: ap.cargoAft.z }
    ], { x: ap.cargoAft.x, z: ap.cargoAft.z });

    // Fuel Truck -> fuelPort (under starboard wing, safely clear of engine & wingtip)
    registerGse('fuel', 'fuel', ap.fuelPort.y, [
      { x: -50, z: roadZ },
      { x: ap.fuelPort.dockX - 6, z: roadZ },
      { x: ap.fuelPort.dockX - 2.5, z: ap.fuelPort.z + 4.0 }
    ], { x: ap.fuelPort.x, z: ap.fuelPort.z });

    // Lavatory Truck (-X aft) & Potable Water Truck (+X aft — strict hygienic separation!)
    registerGse('lav', 'lav', ap.lavPort.y, [
      { x: -54, z: roadZ },
      { x: -(halfSpan + 7), z: roadZ },
      { x: -(halfSpan + 7), z: ap.lavPort.z },
      { x: ap.lavPort.dockX - 3.5, z: ap.lavPort.z }
    ], { x: ap.lavPort.x, z: ap.lavPort.z });

    registerGse('water', 'water', ap.waterPort.y, [
      { x: 48, z: roadZ },
      { x: halfSpan + 6, z: roadZ },
      { x: halfSpan + 6, z: ap.waterPort.z },
      { x: ap.waterPort.dockX + 3.5, z: ap.waterPort.z }
    ], { x: ap.waterPort.x, z: ap.waterPort.z });

    // Pushback Tug + Towbar -> hooks onto exact `attachPoints.noseGear`!
    registerGse('tug', 'tug', 0.6, [
      { x: 24, z: roadZ },
      { x: 0, z: roadZ },
      { x: 0, z: ap.noseGear.dockZ + 2.0 }
    ], { x: 0, z: ap.noseGear.z });

    // Re-apply current Turnaround state cleanly
    this.syncTurnaroundSteps(Array.from(this.doneSteps));
  }

  // -------------------------------------------------------------------
  // POLYLINE INTERPOLATION FOR SMOOTH GSE DRIVING ON SERVICE ROAD
  // -------------------------------------------------------------------
  _samplePolyline(pts, t) {
    if (pts.length === 1) return { x: pts[0].x, z: pts[0].z, yaw: 0 };
    const segLens = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const l = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].z - pts[i].z);
      segLens.push(l);
      total += l;
    }
    const targetDist = Math.max(0, Math.min(1, t)) * total;
    let accum = 0;
    for (let i = 0; i < segLens.length; i++) {
      if (accum + segLens[i] >= targetDist || i === segLens.length - 1) {
        const localT = segLens[i] > 0.001 ? (targetDist - accum) / segLens[i] : 1;
        const a = pts[i], b = pts[i + 1];
        return {
          x: a.x + (b.x - a.x) * localT,
          z: a.z + (b.z - a.z) * localT,
          yaw: Math.atan2(b.x - a.x, b.z - a.z)
        };
      }
      accum += segLens[i];
    }
    const last = pts[pts.length - 1];
    return { x: last.x, z: last.z, yaw: 0 };
  }

  // -------------------------------------------------------------------
  // ANIMATION LOOP (60FPS)
  // -------------------------------------------------------------------
  start() {
    if (this.rafId || this.disposed) return;
    this.lastTime = performance.now();
    const tick = now => {
      if (this.disposed) { this.rafId = null; return; }
      const dt = Math.min(0.05, (now - this.lastTime) * 0.001);
      this.lastTime = now;
      this.update(dt, now * 0.001);
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  setShowBlastZone(flag) {
    this.showBlastZone = Boolean(flag);
  }

  update(dt, timeSec) {
    // Resize cleanly to CSS box (cap DPR at 1.5 to prevent Retina GPU zoom-out lag)
    const w = this.canvas.clientWidth || 720;
    const h = this.canvas.clientHeight || 400;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    if (this.canvas.width !== Math.floor(w * dpr) || this.canvas.height !== Math.floor(h * dpr)) {
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    // Animate water shader & ATC tower radar
    this.waterUniforms.uTime.value = timeSec;
    if (this.radarDish) this.radarDish.rotation.y += dt * 1.4;

    // Animate aircraft lights & High-Visibility Rear Jet Blast + Front Intake Danger Zone
    const beaconOn = !this.doneSteps.has('chock') || this.pushbackActive;
    animateAircraft3D(this.aircraftMesh, timeSec, {
      dt,
      enginesRunning: !this.doneSteps.has('chock') || this.pushbackProgress > 0.45,
      beaconOn,
      strobeOn: this.pushbackProgress > 0.55
    });
    if (this.blastZone) {
      animateJetBlastZone3D(this.blastZone, timeSec, this.showBlastZone || beaconOn);
    }

    // Update GSE actors along GSE Service Road waypoints
    for (const actor of Object.values(this.gseActors)) {
      const targetP = actor.active ? 1 : 0;
      const speed = actor.id === 'tug' ? 0.34 : 0.28;
      if (Math.abs(actor.progress - targetP) > 0.002) {
        actor.progress += Math.sign(targetP - actor.progress) * Math.min(Math.abs(targetP - actor.progress), dt * speed);
      } else {
        actor.progress = targetP;
      }
      actor.mesh.visible = actor.progress > 0.01;
      if (actor.mesh.visible && !(actor.id === 'tug' && this.pushbackProgress > 0.01)) {
        const pose = this._samplePolyline(actor.waypoints, actor.progress);
        actor.mesh.position.set(pose.x, 0, pose.z);
        if (actor.progress > 0.96 && actor.finalFacePt) {
          actor.mesh.rotation.y = Math.atan2(actor.finalFacePt.x - pose.x, actor.finalFacePt.z - pose.z);
        } else {
          actor.mesh.rotation.y = pose.yaw;
        }
      }
    }

    // Physical Pushback Animation (Tug hooked via Towbar to noseGear pushes aircraft backwards onto taxiway!)
    if (this.pushbackActive && this.gseActors.tug && this.gseActors.tug.progress >= 0.98) {
      this.pushbackProgress = Math.min(1, this.pushbackProgress + dt * 0.14);
      const pb = this.pushbackProgress;
      // Straight push back (-Z) then smooth 80° tail-left turn onto taxiway!
      const straightBack = Math.min(pb * 1.6, 1) * 28;
      const turnPhase = Math.max(0, (pb - 0.35) / 0.65);
      const yaw = turnPhase * 1.15;
      const acX = -Math.sin(yaw) * turnPhase * 22;
      const acZ = -straightBack - turnPhase * 24;

      if (this.aircraftMesh) {
        this.aircraftMesh.position.set(acX, 0, acZ);
        this.aircraftMesh.rotation.y = yaw;
      }
      const ap = AIRCRAFT_3D_SPECS[this.aircraftType].attachPoints;
      const tugDist = ap.noseGear.dockZ + 2.0;
      const tugMesh = this.gseActors.tug.mesh;
      tugMesh.position.set(acX + Math.sin(yaw) * tugDist, 0, acZ + Math.cos(yaw) * tugDist);
      tugMesh.rotation.y = yaw + Math.PI;
    } else if (this.aircraftMesh) {
      this.aircraftMesh.position.set(0, 0, 0);
      this.aircraftMesh.rotation.y = 0;
    }

    // Smoothly damp OrbitControls camera
    const damp = Math.min(1, dt * 6.5);
    this.orbit.target.lerp(this.orbit.goalTarget, damp);
    this.orbit.spherical.radius += (this.orbit.goalSpherical.radius - this.orbit.spherical.radius) * damp;
    this.orbit.spherical.theta += (this.orbit.goalSpherical.theta - this.orbit.spherical.theta) * damp;
    this.orbit.spherical.phi += (this.orbit.goalSpherical.phi - this.orbit.spherical.phi) * damp;

    const { radius, theta, phi } = this.orbit.spherical;
    const sinPhi = Math.sin(phi);
    const camY = Math.max(2.5, this.orbit.target.y + radius * Math.cos(phi));
    this.camera.position.set(
      this.orbit.target.x + radius * sinPhi * Math.sin(theta),
      camY,
      this.orbit.target.z + radius * sinPhi * Math.cos(theta)
    );
    // Dynamic altitude-scaled near plane -> ultra-high depth precision at 2,350m with zero GPU Early-Z penalty!
    const desiredNear = Math.max(1.8, Math.min(45, camY * 0.018));
    if (Math.abs(this.camera.near - desiredNear) > 0.5) {
      this.camera.near = desiredNear;
      this.camera.updateProjectionMatrix();
    }
    this.camera.lookAt(this.orbit.target);

    this.renderer.render(this.scene, this.camera);
  }

  getActiveGseSummary() {
    return Object.values(this.gseActors)
      .filter(a => a.active || a.progress > 0.05)
      .map(a => ({ id: a.id, kind: a.kind, pct: Math.round(a.progress * 100) }));
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.canvas.removeEventListener('pointerdown', this._onDown);
    window.removeEventListener('pointermove', this._onMove);
    window.removeEventListener('pointerup', this._onUp);
    this.canvas.removeEventListener('wheel', this._onWheel);
    this.canvas.removeEventListener('contextmenu', this._onContext);
    this.renderer.dispose();
  }
}
