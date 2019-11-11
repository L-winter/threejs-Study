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

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

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
			canvas: document.getElementById('mainCanvas')
		});
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
			// var texture = new THREE.TextureLoader().load('../obj/测试/4c895e8e0ff541529da048cf5e09bab6.jpeg');
			// texture.wrapS = THREE.MirroredRepeatWrapping;
			// texture.wrapT = THREE.RepeatWrapping;
			// texture.repeat.set(1, 1);

			// scene.background = texture;

			// var renderer = null;

			var mesh = null;
			var id = null;
			// canvas size is 400x300
			var camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
			// camera.lookAt(new THREE.Vector3(0, 0, 0));
			// camera.position.set(0, 0, 8);
			camera.position.set(0, 10, 20);
			// camera.lookAt(new THREE.Vector3(0, 3, 0));

			// var camera = new THREE.PerspectiveCamera(40, 2, 31.882576569468796, 318825.76569468796);
			// // camera.lookAt(new THREE.Vector3(0, 0, 0));
			// // camera.position.set(0, 0, 8);
			// camera.position.set(0, 3000, 0);
			// camera.lookAt(new THREE.Vector3(0, 0, 0));
			scene.add(camera);

			const controls = new OrbitControls(camera, document.getElementById('mainCanvas'));
			controls.minDistance = 20;

			controls.target.set(0, 2, 0);
			controls.update();
			let root = undefined;
			var loader = new FBXLoader();
			let cars = [];
			var mixers = [];
			loader.load('../obj/carmaya/source/Lotus.fbx', object => {
				   object.traverse( function ( child ) {
				            scope.mixers=object.mixer = new THREE.AnimationMixer( object );
				            var action = object.mixer.clipAction( object.animations[0]);
				            action.play();
				            if ( child.isMesh ) {
				                child.castShadow = true;
				                child.receiveShadow = true;
				            }
				        });
				        object.scale.set(0.5,0.5,0.5);
				        object.position.set(100,120,30);
				        scope.scene.add(object);
				        scope.personPre=object;
				        scope.referenceModel = object.children[1];
			});

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
			// _spotLight.position.set(0, 300, 0);
			// // _spotLight.target = root;
			// // _spotLight.shadowMapWidth = _spotLight.shadowMapHeight = 1024*4;
			// scene.add(_spotLight);

			// var light = new THREE.SpotLight(0x4C004F, 1, 100, Math.PI / 6, 25);
			// 				light.position.set(0, 5, 0);
			// 				light.target = root;

			// let spotLight = new THREE.spotLight(0xffffff);  //通过spotLight()方法创建一个光源
			// spotLight.position.set(-40,60,-10);   //灯光在这个位置照射场景
			// scene.add(spotLight);                 //加入场景

			id = setInterval(draw, 20);
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
			function draw() {
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
				// root.rotation.y += 0.01;
				// if (mesh.rotation.y > Math.PI * 2) {
				// 	mesh.rotation.y -= Math.PI * 2;
				// }
			}

			// function draw() {
			// 	that.renderer.render(scene, camera);
			// }
			// scene.add(cube);
			// render
			this.renderer.render(scene, camera);
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
