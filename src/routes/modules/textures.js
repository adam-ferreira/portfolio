import * as THREE from 'three';

export function loadTextures(scene) {
	new THREE.CubeTextureLoader()
		.setPath('cubeMaps/')
		.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], (texture) => {
			scene.environment = texture;
		});
}
