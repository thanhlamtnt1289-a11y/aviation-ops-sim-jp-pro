// Shared image-based lighting for all Three.js scenes (airport, turnaround, ULD build-up).
// A tiny procedural sky (gradient + sun disk) is baked by PMREM into scene.environment, so glass,
// painted metal, aircraft skins and GSE reflect a real sky instead of black → one consistent look.
import * as THREE from 'three';

export const ENV_PRESETS = {
  day:      { top: 0x2f6bb8, hor: 0xb9cde0, gnd: 0x5d636b, sun: 0xfff3d6, sunI: 7, sunY: 0.62, k: 0.55 },
  sunset:   { top: 0x2b396b, hor: 0xd98f6c, gnd: 0x4a3f3a, sun: 0xffb070, sunI: 6, sunY: 0.12, k: 0.5 },
  overcast: { top: 0x7d8895, hor: 0xaeb7c0, gnd: 0x5a5f66, sun: 0xffffff, sunI: 1.5, sunY: 0.7, k: 0.6 },
  night:    { top: 0x040918, hor: 0x1a2640, gnd: 0x101418, sun: 0x6b8cc9, sunI: 1.5, sunY: 0.5, k: 0.5 }
};

const pmremByRenderer = new WeakMap();
const rtByScene = new WeakMap();

export function applySkyEnvironment(renderer, scene, key = 'day') {
  if (!renderer || !scene) return;
  let pmrem = pmremByRenderer.get(renderer);
  if (!pmrem) { pmrem = new THREE.PMREMGenerator(renderer); pmremByRenderer.set(renderer, pmrem); }
  const P = ENV_PRESETS[key] || ENV_PRESETS.day;
  const envScene = new THREE.Scene();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uTop: { value: new THREE.Color(P.top) }, uHor: { value: new THREE.Color(P.hor) }, uGnd: { value: new THREE.Color(P.gnd) } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 uTop; uniform vec3 uHor; uniform vec3 uGnd; varying vec3 vP; void main(){ float h = vP.y; vec3 c = h > 0.0 ? mix(uHor, uTop, pow(h, 0.55)) : mix(uHor, uGnd, pow(-h, 0.35)); gl_FragColor = vec4(c, 1.0); }'
  }));
  envScene.add(sky);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(P.sun).multiplyScalar(P.sunI) }));
  sun.position.set(0.55, P.sunY, 0.45).normalize().multiplyScalar(8);
  envScene.add(sun);
  const rt = pmrem.fromScene(envScene, 0.035);
  const old = rtByScene.get(scene);
  if (old) old.dispose();
  rtByScene.set(scene, rt);
  scene.environment = rt.texture;
  scene.environmentIntensity = P.k;
  sky.geometry.dispose(); sky.material.dispose(); sun.geometry.dispose(); sun.material.dispose();
}
