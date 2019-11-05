<template>
	<div class="hello"><canvas id="mainCanvas"></canvas>
	<router-view/>
	</div>
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
			renderer: {},
			card: []
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
			let that = this;

			var mesh = null;
			var id = null;
			// canvas size is 400x300
			var camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
			// camera.lookAt(new THREE.Vector3(0, 0, 0));
			// camera.position.set(0, 0, 8);
			camera.position.set(0, 10, 20);
			// camera.lookAt(new THREE.Vector3(0, 3, 0));
			scene.add(camera);

			const controls = new OrbitControls(camera, document.getElementById('mainCanvas'));
			// controls.minDistance = 20;

			// controls.target.set(0, 2, 0);
			// controls.update();
			controls.target.set(0, 5, 0);
			controls.update();

			var loader = new GLTFLoader();
			// let cars = '';
		
			loader.load('https://r105.threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', gltf => {
				// https://r105.threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf
				// https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf
				const root = gltf.scene;
				scene.add(root);
				  console.log(dumpObject(root).join('\n'));
				// console.log('rottt只',root.join('\n'))
				console.log('rottt只',root.getObjectByName('Cars'))
				const loadedCars = root.getObjectByName('Cars');
				const fixes = [
					{ prefix: 'Car_08', y: 0, rot: [Math.PI * 0.5, 0, Math.PI * 0.5] },
					{ prefix: 'CAR_03', y: 33, rot: [0, Math.PI, 0] },
					{ prefix: 'Car_04', y: 40, rot: [0, Math.PI, 0] }
				];
				// console.log(loadedCars)
				// root.updateMatrixWorld();
				let id=0;
				for (const car of loadedCars.children.slice()) {
					id++
					const fix = fixes.find(fix => car.name.startsWith(fix.prefix));
					const obj = new THREE.Object3D();
					// console.log('卡车',car)
					car.position.set(0, fix.y, 0);
					car.rotation.set(...fix.rot);
					obj.add(car);
					scene.add(obj);
					cars.push(obj);
					// console.log(obj,car,id)
				}
				
				const box = new THREE.Box3().setFromObject(root);

				const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());

				// console.log(box.getSize(new THREE.Vector3()));

				// set the camera to frame the box
				frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

				// update the Trackball controls to handle the new size
				controls.maxDistance = boxSize * 10;
				controls.target.copy(boxCenter);
				controls.update();
			});

			let cars = [];
			

			function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
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
			light.position.set(20, 10, 0);
			scene.add(light);

			id = setInterval(draw, 20);

			let time = 0.001;
			const carPosition = new THREE.Vector3();
			const carTarget = new THREE.Vector3();
			function render(time) {
				time *= 0.001; // convert to seconds

				
					const pathTime = time * 0.01;
					const targetOffset = 0.01;
					cars.forEach((car, ndx) => {
						// a number between 0 and 1 to evenly space the cars
						const u = pathTime + ndx / cars.length;

						// get the first point
						curve.getPointAt(u % 1, carPosition);
						carPosition.applyMatrix4(curveObject.matrixWorld);

						// get a second point slightly further down the curve
						curve.getPointAt((u + targetOffset) % 1, carTarget);
						carTarget.applyMatrix4(curveObject.matrixWorld);

						// put the car at the first point (temporarily)
						car.position.copy(carPosition);
						// point the car the second point
						car.lookAt(carTarget);

						// put the car between the 2 points
						car.position.lerpVectors(carPosition, carTarget, 0.5);
					});
				

				that.renderer.render(scene, camera);

				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);

			// function render(time) {
			//     time *= 0.001;  // convert to seconds

			//     if (cars) {
			//       for (const car of cars.children) {
			//         car.rotation.y = time;
			//       }
			//     }

			// 		that.renderer.render(scene, camera);

			//     requestAnimationFrame(render);
			//   }

			//   requestAnimationFrame(render);

			function draw() {
				that.renderer.render(scene, camera);

				// mesh.rotation.y += 0.01;
				// if (mesh.rotation.y > Math.PI * 2) {
				// 	mesh.rotation.y -= Math.PI * 2;
				// }
			}
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
			lx();
			let curve;
			let curveObject;
			function lx() {
				const controlPoints = [
					[1.118281, 5.115846, -3.681386],
					[3.948875, 5.115846, -3.641834],
					[3.960072, 5.115846, -0.240352],
					[3.985447, 5.115846, 4.585005],
					[-3.793631, 5.115846, 4.585006],
					[-3.826839, 5.115846, -14.7362],
					[-14.542292, 5.115846, -14.765865],
					[-14.520929, 5.115846, -3.627002],
					[-5.452815, 5.115846, -3.634418],
					[-5.467251, 5.115846, 4.549161],
					[-13.266233, 5.115846, 4.567083],
					[-13.250067, 5.115846, -13.499271],
					[4.081842, 5.115846, -13.435463],
					[4.125436, 5.115846, -5.334928],
					[-14.521364, 5.115846, -5.239871],
					[-14.510466, 5.115846, 5.486727],
					[5.745666, 5.115846, 5.510492],
					[5.787942, 5.115846, -14.728308],
					[-5.42372, 5.115846, -14.761919],
					[-5.373599, 5.115846, -3.704133],
					[1.004861, 5.115846, -3.641834]
				];
				const p0 = new THREE.Vector3();
				const p1 = new THREE.Vector3();
				curve = new THREE.CatmullRomCurve3(
					controlPoints.map((p, ndx) => {
							// console.log(ndx,p)
							p0.set(...p);
							p1.set(...controlPoints[(ndx + 1) % controlPoints.length]);
							return [new THREE.Vector3().copy(p0), new THREE.Vector3().lerpVectors(p0, p1, 0.1), new THREE.Vector3().lerpVectors(p0, p1, 0.9)];
						}).flat()
						
						,
					true
				);
				// var curve = new THREE.CatmullRomCurve3( [
				// 	new THREE.Vector3( -10, 0, 10 ),
				// 	new THREE.Vector3( -5, 5, 5 ),
				// 	new THREE.Vector3( 0, 0, 0 ),
				// 	new THREE.Vector3( 5, -5, 5 ),
				// 	new THREE.Vector3( 10, 0, 10 )
				// ] );
				
					console.log(curve)
					const points = curve.getPoints(250);
					const geometry = new THREE.BufferGeometry().setFromPoints(points);
					const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
					curveObject = new THREE.Line(geometry, material);

					curveObject.scale.set(100, 100, 100);
					curveObject.position.y = -621;
					curveObject.visible = true;   //线路是否可见
					material.depthTest = true;
					curveObject.renderOrder = 1;
					scene.add(curveObject);
				
			}

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
