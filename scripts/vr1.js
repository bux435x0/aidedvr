import { VRButton } from '../modules/VRButton.js';

let scene, camera, renderer, cube;

function showStatus(message) {
    document.getElementById('status-message').textContent = message;
    console.log(message);
}

function init() {
    showStatus('Initializing scene...');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.xr.enabled = true;
    document.body.appendChild(VRButton.createButton(renderer));
    showStatus('VR button added');

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    camera.position.set(0, 1.6, 3);

    window.addEventListener('resize', onWindowResize, false);

    showStatus('Scene1 initialized');
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

init();
animate();