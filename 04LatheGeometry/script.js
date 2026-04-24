import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(6, 6, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// STEP 1: CUP OUTLINE
const points = [];
points.push(new THREE.Vector2(0.0, 0.0));  
points.push(new THREE.Vector2(1.5, 0.0));  
points.push(new THREE.Vector2(1.8, 1.5));  
points.push(new THREE.Vector2(1.6, 3.0));  
points.push(new THREE.Vector2(1.2, 4.0));  

// STEP 2: CREATE LATHE GEOMETRY
const cupGeometry = new THREE.LatheGeometry(points, 60);

// STEP 3: CUP MATERIAL + MESH
const cupMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.3,
  roughness: 0.2,
});
const cup = new THREE.Mesh(cupGeometry, cupMaterial);
scene.add(cup);

function animate() {
  requestAnimationFrame(animate);
  cup.rotation.y += 0.01;
  renderer.render(scene, camera);
}
const container = document.querySelector('#threeJsContainer')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate();
