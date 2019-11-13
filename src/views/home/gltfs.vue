<template>
	<div class="hello"><canvas id="mainCanvas"></canvas></div>
</template>

<script>
import * as THREE from 'three';
// import OrbitControls from "three/examples/js/controls/OrbitControls";
// import {OBJLoader} from 'three/examples/js/loaders/OBJLoader';
// import OrbitControls from "three/examples/js/controls/OrbitControls"
// import {
// 	OBJLoader,
// 	MTLLoader
// } from 'three-obj-mtl-loader';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';




import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import  OBJLoader  from "three/examples/jsm/loaders/OBJLoader"
// import  MTLLoader  from "three/examples/jsm/loaders/MTLLoader"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
		var renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('mainCanvas'),
			antialias: true
		});
		renderer.autoClear = false;
		renderer.gammaInput = true;
		
			    // renderer.gammaOutput = true;
		renderer.setClearColor(0x000000);
		renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer = renderer;
		this.imgMaterial();
		// },5000)
		// console.log()
	},
	methods: {
		imgMaterial: function() {
			//加了材质
			let that = this;

			// var cubeMap = new THREE.CubeTextureLoader().load('../obj/测试/4c895e8e0ff541529da048cf5e09bab6.jpeg');
			// scene.background=texture
			var texture = new THREE.TextureLoader().load('../obj/测试/4c895e8e0ff541529da048cf5e09bab6.jpeg');
			texture.wrapS = THREE.MirroredRepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(1, 1);

			scene.background = texture;

			// var renderer = null;

			var mesh = null;
			var id = null;
			// canvas size is 400x300
		// 	var camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
		
		// 	// camera.lookAt(new THREE.Vector3(0, 0, 0));
		// 	// camera.position.set(0, 0, 8);
		// 	camera.position.set(0, 10, 20);
		// 	// camera.lookAt(new THREE.Vector3(0, 3, 0));

			
			var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 0, 10);
			camera.layers.enable(1);
			
			
			
			

			let controls = new OrbitControls(camera, document.getElementById('mainCanvas'));
			// controls.minDistance = 20;

			// controls.target.set(0, 2, 0);
			controls.update();
			
			
			
			
			
				// this.renderer.toneMappingExposure = Math.pow( 1, 4.0 );
				
			
			let root = undefined;
			var loader = new GLTFLoader();
			let cars = [];
			
			loader.load('../obj/测试/scene.gltf', gltf => {
				root = gltf.scene;
				// root.traverse(function(child) {
				// // 	console.log(child)
				// 	if (child.isMesh) {
				// 		child.material.emissive = child.material.color;
				// 		child.material.emissiveMap = child.material.map;
				// 	}
				// });
				// root.layers.set(1);
				// scene.add(gltf.scene);
				scene.add(root);
				
				root.castShadow = true;
				// console.log(root)
				// console.log(dumpObject(root).join('\n'));
				const loadedCars = root.getObjectByName('Lotus');
				// from root and below
				// console.log(loadedCars);

				for (const car of loadedCars.children.slice()) {
					// id++
					// const fix = fixes.find(fix => car.name.startsWith(fix.prefix));
					const obj = new THREE.Object3D();
					console.log('卡车',car)
					// car.material.emissive=0xffffff
					// car.material.
					// car.material.side = THREE.DoubleSide;
				    // car.material= new THREE.MeshPhongMaterial({ color: 0x3AB5C5 });
					// if(car.name=='Lotus_Mat_8'){
					// 	car.position.set(0, 500, 0);
					// }
					car.layers.set(0);
					// car.material.depthWrite = true;
					car.position.set(0, 30, 260);
				
					
					if(car.name=='Lotus_Mat_8'){
						// console.log(car)
						// var light = new THREE.PointLight(0xffffff,2,100);
						// light.position.set(0, 1.5, 2);
						
						// scene.add(light);
						
						// var light = new THREE.PointLight(0xffffff,10,100);
						// light.position.set(200, 100, -450);
						
						// car.add(light);
						
							// console.log('卡车22',car)
									// car.layers.set(1);
						// car.position.set(0, 30, 260);
						 car.material= new THREE.MeshBasicMaterial({ color: 'red' , wireframe: false});
						 car.layers.set(1);
						 	// console.log('卡车33',car)
					}
					// car.rotation.set(...fix.rot);
					obj.add(car);
					scene.add(obj);
					cars.push(obj);
					// console.log(obj,car,id)
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
			
			var objBack = new THREE.Mesh(new THREE.BoxGeometry(55, 55, 1),
				new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
			);
				objBack.position.set(0, 100, 260);
			// objBack.position. = -2.25;
			objBack.layers.set(1);
			scene.add(objBack);
			
			var renderScene = new RenderPass(scene, camera);
			// var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
			// // bloomPass.renderToScreen=true;
			// bloomPass.threshold = .21;
			var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
			bloomPass.threshold = .21;
			bloomPass.strength = 1.5;
			bloomPass.radius = 0;
			
			
			var composer = new EffectComposer(this.renderer);
			composer.setSize(window.innerWidth, window.innerHeight);
					
			composer.addPass(renderScene);
			
			composer.addPass(bloomPass);
			
			

			// var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
			// 			light.position.set(2, 5, 3);
			// 			light.target = root;
			// 			scene.add(light);
			// var light = new THREE.SpotLight(0xffff00,1,100,Math.PI / 6, 25);
			// light.position.set(1, 1, 1);
			// light.target = root;
			// scene.add(light);

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

			var light = new THREE.AmbientLight(0xffffff);
			light.position.set(0, 0, 0);
			scene.add(light);

			// var _spotLight = new THREE.SpotLight(0x88008d);
			// _spotLight.castShadow = true;
			// 	_spotLight.penumbra = 1;
			// _spotLight.shadowCameraVisible = true;
			// _spotLight.position.set(0, 500, 0);
			// // _spotLight.target = root;
			// _spotLight.shadowMapWidth = _spotLight.shadowMapHeight = 1024*4;
			// scene.add(_spotLight);
			
			// var light = new THREE.DirectionalLight(0xffffff, 0.95);
			// light.position.setScalar(100);
			// scene.add(light);
			// scene.add(new THREE.AmbientLight(0xffffff, 0.65));
			
			// var _spotLight = new THREE.SpotLight(0xFFFFFF);
			// _spotLight.castShadow = true;
			// 	_spotLight.penumbra = 1;
			// _spotLight.shadowCameraVisible = true;
			// _spotLight.position.set(0, 10, 0);
			// // _spotLight.target = root;
			// // _spotLight.shadowMapWidth = _spotLight.shadowMapHeight = 1024*4;
			// scene.add(_spotLight);

			// var light = new THREE.SpotLight(0x4C004F, 1, 100, Math.PI / 6, 25);
			// 				light.position.set(0, 5, 0);
			// 				light.target = root;

			// let spotLight = new THREE.spotLight(0xffffff);  //通过spotLight()方法创建一个光源
			// spotLight.position.set(-40,60,-10);   //灯光在这个位置照射场景
			// scene.add(spotLight);                 //加入场景
		
				
			
				
			// id = setInterval(draw, 200);
			function dumpObject(obj, lines = [], isLast = true, prefix = '') {
				const localPrefix = isLast ? '└─' : '├─';
				lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
				const newPrefix = prefix + (isLast ? '  ' : '│ ');
				const lastNdx = obj.children.length - 1;
				obj.children.forEach((child, ndx) => {
					const isLast = ndx === lastNdx;
					dumpObject(child, lines, isLast, newPrefix);
				});
				return lines;
			}
			// composer.addPass(renderScene);
			
			
			
			// 	var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
			// 	camera.position.set(0, 0, 10);
			// 	camera.layers.enable(1);
				
				
			// 	var renderer = new THREE.WebGLRenderer({ antialias: true });
			// 	renderer.autoClear = false;
				
			// 	renderer.setSize(window.innerWidth, window.innerHeight);
			// 	// renderer.setClearColor(0x101000);
			// 	document.body.appendChild(renderer.domElement);
			
			// 	var controls = new OrbitControls(camera, renderer.domElement);
			
				// var light = new THREE.DirectionalLight(0xffffff, 0.75);
				// light.position.setScalar(100);
				// scene.add(light);
				// scene.add(new THREE.AmbientLight(0xffffff, 0.25));
				
				// var light = new THREE.AmbientLight(0xffffff);
				// light.position.set(0, 0, 0);
				// scene.add(light);
			
				// var obj = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 4), 
				// new THREE.MeshLambertMaterial({color: "aqua", wireframe: false}
				// ));
				// obj.layers.set(0);
				// obj.position.z = 0.25;
				// scene.add(obj);
			
				
				
			
			
			// 	/** COMPOSER */
			// 	var renderScene = new RenderPass(scene, camera);
			
			// 	// var effectFXAA = new ShaderPass(FXAAShader);
			// 	// effectFXAA.uniforms.resolution.value.set( 1 / window.innerWidth, 1 / window.innerHeight )
			
			// 	var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
			// 	bloomPass.threshold = .21;
			// 	// bloomPass.strength = 1.2;
			// 	// bloomPass.radius = 0.55;
			// 	// bloomPass.renderToScreen = true;
			// // renderer.toneMappingExposure = Math.pow( 1, 4.0 );
			// 	var composer = new EffectComposer(this.renderer);
			// 	composer.setSize(window.innerWidth, window.innerHeight);
			
			// 	composer.addPass(renderScene);
			// 	// composer.addPass(effectFXAA);
				
			// 	composer.addPass(bloomPass);
			
			
			
			
			
			
			
			
			
			
			
			
			
			// render();
			// function render() {
			// 	requestAnimationFrame(render);
			
			// 	renderer.clear();
			
			// 	camera.layers.set(1);
			// 	composer.render();
			
			// 	renderer.clearDepth();
			// 	camera.layers.set(0);
			// 	renderer.render(scene, camera);
			// }
			
			draw()
			function draw() {
				console.log('f')
				requestAnimationFrame(draw);
				that.renderer.clear();
					// camera.layers.set(1);
				composer.render();
				
				that.renderer.clearDepth();
					// camera.layers.set(0);
				that.renderer.render(scene, camera);
				// console.log(cars)
				// cars.forEach((car, ndx) => {
				// a number between 0 and 1 to evenly space the cars
				// var light = new THREE.SpotLight(0x4C004F, 1, 100, Math.PI / 6, 25);
				// light.position.set(10, 0, 0);
				// 				light.target = car;
				// console.log(car)
				// car.rotation.x += 0.01;
				// new THREE.MeshBasicMaterial({
				// 	color: 0xff0000,
				// 	wireframe: true
				// })
				// put the car between the 2 points
				// car.position.lerpVectors(carPosition, carTarget, 0.5);
				// });
				// console.log(root)
			
				// if (mesh.rotation.y > Math.PI * 2) {
				// 	mesh.rotation.y -= Math.PI * 2;
				// }
			}

			// function draw() {
			// 	that.renderer.render(scene, camera);
			// }
			// scene.add(cube);
			// render
			// this.renderer.render(scene, camera);
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
