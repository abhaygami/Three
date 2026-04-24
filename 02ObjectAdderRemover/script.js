import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";
import * as dat from "https://cdn.jsdelivr.net/npm/dat.gui/build/dat.gui.module.js";

let width = window.innerWidth;
let height = window.innerHeight;
const gui = new dat.GUI();  // UI panel to interactively control things (e.g., camera movement)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x262626);   // Scene with Dark gray background is created
scene.fog = new THREE.FogExp2(0xff00ff, 0.008)   // Adds Fog with dencity of 0.008

// Lights
// soft light everywhere (no shadows). It prevents total darkness.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// light bulb. It shines from a specific point in space.
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(-10, 10, -10);

// for shadow
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 1000;

scene.add(light);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 10, 40);
camera.lookAt(0, 0, 0);
gui.add(camera.position, 'z', 10, 200, 1).name('camera-z');

// plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
);
plane.rotateX(Math.PI / 2);
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);

function addCube() {
    const cubeSize = Math.ceil(Math.random() * 3);  // 1-4
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: Math.random() * 0xffffff
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = 'cube-' + scene.children.length;
    cube.position.x = -30 + Math.round(Math.random() * 50);
    cube.position.y = 1;
    cube.position.z = -20 + Math.round(Math.random() * 50);
    scene.add(cube);
    console.log("Cube Added");
}

function removeCube() {
    const allChildren = scene.children;
    const lastObject = allChildren[allChildren.length - 1];
    if (lastObject.name) {
        scene.remove(lastObject);
        console.log('cube removed');
    }
}

window.addEventListener('resize', () => {
    // It makes UI responsive
    width = window.innerWidth;
    height = window.innerHeight;

    camera.aspect = width/height;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene,camera);
});

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// animation
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threeJsContainer');
container.append(renderer.domElement);
renderer.render(scene, camera);
animate();

window.addCube = addCube;
window.removeCube = removeCube;