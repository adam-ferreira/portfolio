<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import '.././styles.css';
	import { loadTextures } from '../modules/textures.js';
	import { addLighting } from '../modules/lighting.js';

	const CAMERA_CONFIG = {
		NEAR: 0.1,
		FAR: 1000,
		POSITION_Z: 1
	};

	const SCALE_FACTOR = 45;

	const orange = 'rgb(255, 116, 82)';

	let container;
	let adamLogo;

	// This function sets up the 3D environment
	const setupEnvironment = () => {
		const aspect = container.clientWidth / container.clientHeight;
		const camera = new THREE.OrthographicCamera(
			-aspect,
			aspect,
			1,
			-1,
			CAMERA_CONFIG.NEAR,
			CAMERA_CONFIG.FAR
		);
		camera.position.z = CAMERA_CONFIG.POSITION_Z;
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);
		const scene = new THREE.Scene();

		return { camera, renderer, scene };
	};

	// This function loads the 3D model
	const loadModel = (scene) => {
		const loader = new GLTFLoader();
		loader.load('models/adam_ferreira_logo.glb', (gtlf) => {
			adamLogo = gtlf.scene;
			const scale = container.clientWidth / SCALE_FACTOR;
			adamLogo.scale.set(scale, scale, scale);
			scene.add(adamLogo);

			adamLogo.traverse((node) => {
				if (node.isMesh) {
					node.material.color = new THREE.Color(orange);
					node.material.metalness = 0.5;
					node.material.roughness = 0.1;
				}
			});
		});
	};

	// This function handles the animation of the scene
	const animate = (renderer, scene, camera) => {
		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();
	};

	// This function handles window resize events
	const onWindowResize = (camera, renderer) => {
		const aspect = container.clientWidth / container.clientHeight;
		camera.left = -aspect;
		camera.right = aspect;
		camera.top = 1;
		camera.bottom = -1;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	};

	const onMouseMove = (event) => {
		const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
		const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

		const maxRotationX = Math.PI / 4;
		const maxRotationY = Math.PI / 10;

		const targetRotationX = -mouseY * maxRotationY;
		const targetRotationY = mouseX * maxRotationX;

		const damping = 0.1;

		adamLogo.rotation.x += (targetRotationX - adamLogo.rotation.x) * damping;
		adamLogo.rotation.y += (targetRotationY - adamLogo.rotation.y) * damping;
	};

	onMount(() => {
		const { camera, renderer, scene } = setupEnvironment();

		loadTextures(scene);
		addLighting(scene);

		loadModel(scene);
		animate(renderer, scene, camera);

		window.addEventListener('resize', () => onWindowResize(camera, renderer));
		window.addEventListener('mousemove', (event) => onMouseMove(event));

		// Remove event listeners when the component is unmounted to prevent memory leaks
		return () => {
			window.removeEventListener('resize', () => onWindowResize(camera, renderer));
		};
	});
</script>

<div class="container" bind:this={container}></div>

<style>
	.container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 15%;
		height: 15vh;
	}
</style>
