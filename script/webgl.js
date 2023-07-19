import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const loader = new GLTFLoader();
const renderer = new THREE.WebGLRenderer({ alpha: true, physicallyCorrectLights: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-2, 1, 1).normalize();
scene.add(light);

let model; // Declare the model variable in the outer scope

const rotationSets = [
  {
    x: Math.PI / 0.9,
    y: 29.8,
    z: Math.PI / 0.9,
    cameraPosition: new THREE.Vector3(-3, 1, 5),
    lightPosition: new THREE.Vector3(-2, 1, 1).normalize()
  },
  {
    x: Math.PI / 1.0,
    y: 26.5,
    z: Math.PI / 1.0,
    cameraPosition: new THREE.Vector3(4, 1.5, 5),
    lightPosition: new THREE.Vector3(0, 1, 1).normalize()
  },
  {
    x: Math.PI / 1.0,
    y: 28.5,
    z: Math.PI / 1.0,
    cameraPosition: new THREE.Vector3(-3, 1, 6),
    lightPosition: new THREE.Vector3(-2, 1, 1).normalize()
  },
  {
    x: Math.PI / 0.9,
    y: 29.8,
    z: Math.PI / 1.1,
    cameraPosition: new THREE.Vector3(2, 1, 5),
    lightPosition: new THREE.Vector3(0, 1, 1).normalize()
  }
];

let currentRotationSetIndex = 0;
let animationMixer;

loader.load('../3d/shoes-main.glb', function (gltf) {
  model = gltf.scene;
  scene.add(model);

  model.traverse(function (node) {
    if (node.isMesh) {
      // Check if the mesh has a background material
      if (node.material.name === 'Background') {
        node.material.transparent = true;
        node.material = node.material.clone();
        node.material.opacity = 0;
      }
    }
  });


  setRotationFromSet(currentRotationSetIndex);
});

function setRotationFromSet(index) {
  const rotationSet = rotationSets[index];


  if (animationMixer && animationMixer._actions.length > 0) {
    const activeAction = animationMixer._actions[0];
    activeAction.stop();
  }


  const rotationAnimation = new TWEEN.Tween(model.rotation)
    .to(rotationSet, 500) 
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();

 
  const cameraPositionAnimation = new TWEEN.Tween(camera.position)
    .to(rotationSet.cameraPosition, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();


  const lightPositionAnimation = new TWEEN.Tween(light.position)
    .to(rotationSet.lightPosition, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();

  // Create an animation mixer if it doesn't exist
  if (!animationMixer) {
    animationMixer = new THREE.AnimationMixer(model);
  }

  // Create a new animation action for the rotation animation
  const rotationAnimationAction = animationMixer.clipAction(rotationAnimation);

  // Play the rotation animation action
  rotationAnimationAction.play();
}

function handleArrowKeyPress(event) {
  if (event.key === 'ArrowDown') {
    currentRotationSetIndex = (currentRotationSetIndex + 1) % rotationSets.length;
    setRotationFromSet(currentRotationSetIndex);
  } else if (event.key === 'ArrowUp') {
    currentRotationSetIndex = (currentRotationSetIndex - 1 + rotationSets.length) % rotationSets.length;
    setRotationFromSet(currentRotationSetIndex);
  }
}

document.addEventListener('keydown', handleArrowKeyPress);

function animate() {
  requestAnimationFrame(animate);

  if (animationMixer) {
    animationMixer.update(); // Update the animation mixer in each frame
  }

  renderer.render(scene, camera);
  TWEEN.update(); // Update the tween animations
}

animate();
