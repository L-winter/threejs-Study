<template>
	<!-- <div class="hello"><canvas id="mainCanvas"></canvas></div> -->
</template>

<script>
import * as THREE from 'three';

// import THREELib from "three";
// var THREE = THREELib();
// import OrbitControls from "three/examples/js/controls/OrbitControls";
// import {OBJLoader} from 'three/examples/js/loaders/OBJLoader';
// import OrbitControls from "three/examples/js/controls/OrbitControls"
// import { OBJLoader , MTLLoader} from 'three-obj-mtl-loader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/loaders/OrbitControls';
// import {  } from 'three/examples/js/postprocessing/RenderPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// import OrbitControls from 'three/examples/js/controls/OrbitControls';
// import fonts from '../threex/controls/OrbitControls'

// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';
let scene = new THREE.Scene();
export default {
	name: 'textfont',
	data: function() {
		return {
			renderer: {}
		};
	},
	created() {
		// THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegment s)
		// 这里， width 是 x 方向上的长度； height 是 y 方向上的长度； depth 是 z 方向上的长 度；后三个参数分别是在三个方向上的分段数，如 widthSegments 为 3 的话，代表 x 方 向上水平分为三份。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的 缺省值为 1 。其他几何形状中的分段也是类似的，下面不做说明。
	},
	mounted: function() {
		// setTimeout(()=>{
		// var renderer = new THREE.WebGLRenderer({
		// 	canvas: document.getElementById('mainCanvas')
		// });
		// renderer.setClearColor(0xffffff);
		// renderer.setSize(window.innerWidth, window.innerHeight);
		// this.renderer = renderer;
		this.spoMaterial();
		// },5000)
		// console.log()
	},
	methods: {
		spoMaterial: function() {
			// var scene = new THREE.Scene();

			var group = new THREE.Group()
			var params = {
							x: 1,
							y: 1.5,
							z: 0,
							bloomRadius: 0
						};
						
			var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 0, 10);
			camera.layers.enable(1);

			var renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.autoClear = false;

			renderer.setSize(window.innerWidth, window.innerHeight);
			// renderer.setClearColor(0x101000);
			document.body.appendChild(renderer.domElement);

			var controls = new OrbitControls(camera, renderer.domElement);

			// var light = new THREE.DirectionalLight(0xff0000, 1);
			// light.position.set(0, -50, -100);
			// scene.add(light);
			// scene.add(new THREE.AmbientLight(0xffffff, 0.25));

			// var light = new THREE.AmbientLight(0xffffff);
			// light.position.set(3, 0, 30);
			// scene.add(light);
			
			// var light = new THREE.DirectionalLight(0xffffff, 0.75);
			// light.position.setScalar(100);
			// scene.add(light);
			// scene.add(new THREE.AmbientLight(0xffffff, 0.25));
			var light = new THREE.HemisphereLight( 0xffffbb, 0x080820,0.8 );
scene.add( light );
			

			var obj = new THREE.Mesh(new THREE.BoxGeometry(55, 55, 4), new THREE.MeshLambertMaterial({ color: 'aqua', wireframe: false }));

			obj.layers.set(0);
			obj.position.set(0, 100, 300);
			// obj.position.z = 0.25;
			scene.add(obj);

			// var objBack = new THREE.Mesh(new THREE.BoxGeometry(185, 185, 10), new THREE.MeshBasicMaterial({ color: 'red', wireframe: false }));
			// // objBack.position.z = -2.25;
			// // objBack.position.set(0, 100, 260);
			// objBack.position.set(0, 30, -500);
			// objBack.layers.set(1);
			// scene.add(objBack);


			// var objBackb = new THREE.Mesh(new THREE.BoxGeometry(185, 185, 10), new THREE.MeshBasicMaterial({ color: 'red', wireframe: false }));
			// // objBack.position.z = -2.25;
			// // objBack.position.set(0, 100, 260);
			// objBackb.position.set(0, 30, 500);
			// objBackb.layers.set(1);
			// scene.add(objBackb);
			
			
			var objBackA = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 10), new THREE.MeshBasicMaterial({ color: '0xffffff', wireframe: false }));
			// objBack.position.z = -2.25;
			// objBack.position.set(0, 100, 260);
			objBackA.position.set(310, 30, -400);
			// objBackA.rotation.y = 180;
			// root.rotation.y += 0.01;
			objBackA.layers.set(1);
			// scene.add(objBackA);
			group.add( objBackA );

			/** COMPOSER */
			var renderScene = new RenderPass(scene, camera);

			// var effectFXAA = new ShaderPass(FXAAShader);
			// effectFXAA.uniforms.resolution.value.set( 1 / window.innerWidth, 1 / window.innerHeight )

			var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 5, 0.4, 0.85);
			bloomPass.threshold = 0;
			// bloomPass.strength = 1.2;
			// bloomPass.radius = 0.55;
			// bloomPass.renderToScreen = true;
			// renderer.toneMappingExposure = Math.pow( 1, 4.0 );
			var composer = new EffectComposer(renderer);
			composer.setSize(window.innerWidth, window.innerHeight);

			composer.addPass(renderScene);
			// composer.addPass(effectFXAA);

			composer.addPass(bloomPass);

			// renderer.gammaInput = true;
			// renderer.gammaOutput = true;
			// renderer.toneMappingExposure = Math.pow(0.9, 4.0);

			let root = undefined;
			var loader = new GLTFLoader();
			let cars = [];


			loader.load('../obj/测试/scene.gltf', gltf => {
				root = gltf.scene;
				root.layers.set(0);
				group.add( root );
				// scene.add(root);

				root.castShadow = true;
				
				// console.log(root)
				// console.log(dumpObject(root).join('\n'));
				const loadedCars = root.getObjectByName('Lotus');
				// loadedCars.layers.set(1);

				for (const car of loadedCars.children.slice()) {
					
					const obj = new THREE.Object3D();
					
					car.material.depthWrite = true;
					car.position.set(0, 30, 260);

					if (car.name == 'Lotus_Mat_8') {
						car.position.set(0, 30, 240);
						car.material = new THREE.MeshBasicMaterial({ color: '0xffffff', wireframe: false });
						car.material.depthWrite = false;
						// console.log(car)
						car.layers.set(1);
					}
					// console.log(obj,car)
					obj.add(car);
					// console.log(obj)
					group.add( car );
					// scene.add(car);
					cars.push(obj);
				}

				const box = new THREE.Box3().setFromObject(root);

				const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());
				// console.log(boxSize);

				// set the camera to frame the box
				frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

				// update the Trackball controls to handle the new size
				controls.maxDistance = boxSize * 10;
				controls.target.copy(boxCenter);
				controls.update();
			});
			
			
			

			function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
				//动态设置相机视角位置
				const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
				const halfFovY = THREE.Math.degToRad(camera.fov * 0.5);
				const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
				// compute a unit vector that points in the direction the camera is now
				// in the xz plane from the center of the box
				const direction = new THREE.Vector3()
					.subVectors(camera.position, boxCenter)
					.multiply(new THREE.Vector3(1, 0, 1))
					.normalize();

				// move the camera to a position distance units way from the center
				// in whatever direction the camera was from the center already
				camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

				// pick some near and far values for the frustum that
				// will contain the box.
				camera.near = boxSize / 100;
				camera.far = boxSize * 100;

				camera.updateProjectionMatrix();

				// point the camera to look at the center of the box
				camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
			}
			
			scene.add(group);
			render();
				group.rotation.y = 3.3;
				
				var gui = new GUI();
				gui.add( params, 'x', 0.1, 500 ).onChange( function ( value ) {
					// light.position.set(3, 0, 30);
					light.position.x=value
					// renderer.toneMappingExposure = Math.pow( value, 4.0 );
				
				} );
				gui.add( params, 'y', 0.1, 500 ).onChange( function ( value ) {
					// light.position.set(3, 0, 30);
					light.position.y=value
					// renderer.toneMappingExposure = Math.pow( value, 4.0 );
				
				} );
				gui.add( params, 'z', 0.1, 500 ).onChange( function ( value ) {
					// light.position.set(3, 0, 30);
					light.position.z=value
					// renderer.toneMappingExposure = Math.pow( value, 4.0 );
				
				} );
				
							
			function render() {
				requestAnimationFrame(render);
		renderer.toneMappingExposure = Math.pow( 0.8, 5.0 ); // to allow for very bright scenes.
				renderer.shadowMap.enabled = true;
				
				renderer.clear();
				// root.position.r
				// group.rotation.y += 0.01;
				camera.layers.set(1);
				composer.render();

				renderer.clearDepth();
				camera.layers.set(0);
				renderer.render(scene, camera);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
	font-size: 26px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>
