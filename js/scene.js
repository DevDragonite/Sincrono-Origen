import * as THREE from 'three';

let scene, camera, renderer;
let _onUpdate = null;

export function initScene() {
    const canvas = document.querySelector('#webgl-canvas');

    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02); // Obsidian fog

    // CAMERA
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // Copper Rim Light
    const spotLight = new THREE.SpotLight(0xB87333, 50);
    spotLight.position.set(5, 5, 5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 1;
    scene.add(spotLight);

    // Blue/Cold Fill Light for contrast
    const pointLight = new THREE.PointLight(0x445566, 20);
    pointLight.position.set(-5, -2, 2);
    scene.add(pointLight);

    // HANDLE RESIZE
    window.addEventListener('resize', onWindowResize, false);

    return { scene, camera, renderer };
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate(onUpdateCallback) {
    _onUpdate = onUpdateCallback;
    requestAnimationFrame(renderLoop);
}

function renderLoop(time) {
    requestAnimationFrame(renderLoop);

    const t = time * 0.001; // Seconds

    if (_onUpdate) _onUpdate(t);

    renderer.render(scene, camera);
}
