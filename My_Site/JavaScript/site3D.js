import {
    PerspectiveCamera,
    Scene,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    WebGLRenderer,
    AmbientLight,
    DirectionalLight
} from "./vendor/three/build/three.module.js";

import { OrbitControls } from "./vendor/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./vendor/three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, cube, controls;

function init() {
    // Create the scene
    scene = new Scene();

    // Create a camera, which determines what we'll see when we render the scene
    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer and attach it to our document
    renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add orbit controls to the camera
    controls = new OrbitControls(camera, renderer.domElement);

    // Create a cube and add it to the scene
    const geometry = new BoxGeometry();
    const material = new MeshStandardMaterial({ color: 0x0077ff });
    cube = new Mesh(geometry, material);
    scene.add(cube);

    // Add ambient light to the scene
    const ambientLight = new AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Add directional light to the scene
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start the animation loop
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for some basic animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Update the controls
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Initialize the scene
init();