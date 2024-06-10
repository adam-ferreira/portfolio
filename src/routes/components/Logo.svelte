<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import '../styles.css';

	const CAMERA_CONFIG = {
		NEAR: 0.1,
		FAR: 1000,
		POSITION_Z: 1
	};

	const SCALE_FACTOR = 45;
	const orange = 'rgb(255, 116, 82)';
	const AMBIENT_LIGHT_COLOR = 0xffffff;
	const AMBIENT_LIGHT_INTENSITY = 5;

	let container;
	let adamLogo;

	onMount(() => {
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
		new THREE.CubeTextureLoader()
			.setPath('cubeMaps/')
			.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], (texture) => {
				scene.environment = texture;
			});

		const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
		scene.add(ambientLight);

		const loader = new GLTFLoader();
		loader.load('models/adam_ferreira_logo.glb', (gltf) => {
			adamLogo = gltf.scene;
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

		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();

		const onWindowResize = () => {
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
			const damping = 0.1;

			adamLogo.rotation.x += (-mouseY - adamLogo.rotation.x) * damping;
			adamLogo.rotation.y += (mouseX - adamLogo.rotation.y) * damping;
		};

		window.addEventListener('resize', onWindowResize);
		window.addEventListener('mousemove', onMouseMove);

		return () => {
			window.removeEventListener('resize', onWindowResize);
			window.removeEventListener('mousemove', onMouseMove);
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
