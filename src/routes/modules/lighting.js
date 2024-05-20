import * as THREE from 'three';

const AMBIENT_LIGHT_COLOR = 0xffffff;
const AMBIENT_LIGHT_INTENSITY = 5;

export function addLighting(scene) {
	const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
	scene.add(ambientLight);
}
