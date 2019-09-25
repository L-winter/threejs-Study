<template>
	<div class="hello">
		<canvas id="mainCanvas"></canvas>
	</div>
</template>

<script>
	import * as THREE from 'three';
	// import TrackballControls from 'three/examples/js/controls/TrackballControls'
	// import fonts from '../threex/controls/OrbitControls'

	// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';

	export default {
		name: 'textfont',
		mounted: function() {
			// setTimeout(()=>{
			this.demo()
			// },5000)
			// console.log()
		},
		methods: {
			demo: function() {
				init()

				function init() {
					var renderer = new THREE.WebGLRenderer({
						canvas: document.getElementById('mainCanvas')
					});
					renderer.setClearColor(0x000000);
					var scene = new THREE.Scene();

					// camera
					var camera = new THREE.OrthographicCamera(-2.5, 2.5, 1.875, -1.875, 0.1, 100);
					camera.position.set(5, 5, 20);
					camera.lookAt(new THREE.Vector3(1, 0, 0));
					scene.add(camera);

					// draw axes to help you understand the coordinate
					drawAxes(scene);

					var material = new THREE.MeshBasicMaterial({
						color: 0xffff00,
						wireframe: true
					});

					// var light = new THREE.DirectionalLight(0xffffff);
					// light.position.set(-5, 10, 5);
					// scene.add(light);
					// load font
					var loader = new THREE.FontLoader();
					loader.load('font/helvetiker_regular.typeface.json', function(font) {
						var mesh = new THREE.Mesh(new THREE.TextGeometry('Hello', {
							font: font,
							size: 1,
							height: 1
						}), material);
						scene.add(mesh);

						// render
						renderer.render(scene, camera);
					});
				}

				function drawAxes(scene) {
					// x-axis
					var xGeo = new THREE.Geometry();
					xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
					xGeo.vertices.push(new THREE.Vector3(1, 0, 0));
					var xMat = new THREE.LineBasicMaterial({
						color: 0xff0000
					});
					var xAxis = new THREE.Line(xGeo, xMat);
					scene.add(xAxis);

					// y-axis
					var yGeo = new THREE.Geometry();
					yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
					yGeo.vertices.push(new THREE.Vector3(0, 1, 0));
					var yMat = new THREE.LineBasicMaterial({
						color: 0x00ff00
					});
					var yAxis = new THREE.Line(yGeo, yMat);
					scene.add(yAxis);

					// z-axis
					var zGeo = new THREE.Geometry();
					zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
					zGeo.vertices.push(new THREE.Vector3(0, 0, 1));
					var zMat = new THREE.LineBasicMaterial({
						color: 0x00ccff
					});
					var zAxis = new THREE.Line(zGeo, zMat);
					scene.add(zAxis);
				}

			}
		}
	}
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
