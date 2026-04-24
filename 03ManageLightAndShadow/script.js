import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";
import * as dat from "https://cdn.jsdelivr.net/npm/dat.gui/build/dat.gui.module.js";

let width = window.innerWidth;
let height = window.innerHeight;
const gui = new dat.GUI();  // UI panel to interactively control things (e.g., camera movement)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x262626);   // Scene with Dark gray background is created
scene.fog = new THREE.FogExp2(0xff00ff, 0.008)   // Adds Fog with dencity of 0.008

// Camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 0, 10);

const camFolder = gui.addFolder('Camera');
camFolder.add(camera.position, 'z', 10, 80, 1);
camFolder.open();

// Ambitient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional Light
const light = new THREE.DirectionalLight();
light.position.set(2.5, 2, 2);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 100;
scene.add(light);

const helper = new THREE.DirectionalLightHelper(light)
scene.add(helper)

const lightColor = {
    color: light.color.getHex()
}

const lightFolder = gui.addFolder('Directional Light')
lightFolder.addColor(lightColor, 'color').onChange(() => {
    light.color.set(lightColor.color)
})
lightFolder.add(light, 'intensity', 0, 1, 0.01)
lightFolder.close()

const directionalLightFolder = gui.addFolder('Position of Light')
directionalLightFolder.add(light.position, 'x', -10, 10, 0.1)
directionalLightFolder.add(light.position, 'y', -10, 10, 0.1)
directionalLightFolder.add(light.position, 'z', -10, 10, 0.1)
directionalLightFolder.close();

// plane
const planeGeometry = new THREE.PlaneGeometry(100, 20);
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({ color: 0xffffff })
);

plane.rotateX(-Math.PI / 2);
plane.position.y = -1.75;
plane.receiveShadow = true;
scene.add(plane);

const geometry = new THREE.SphereGeometry()
const material = new THREE.MeshStandardMaterial({
    color: 0x87ceeb
})

const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()

const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0.5, 0)
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)

window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// animation
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.y += 0.005
    // cube.rotation.x += 0.005
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threeJsContainer')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()