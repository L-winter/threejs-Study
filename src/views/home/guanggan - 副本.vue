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
			
			var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.set(0, 0, 10);
			camera.layers.enable(1);
			
			
			var renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.autoClear = false;
			renderer.setSize(window.innerWidth, window.innerHeight);
			// renderer.setClearColor(0x101000);
			document.body.appendChild(renderer.domElement);

			var controls = new OrbitControls(camera, renderer.domElement);

			var light = new THREE.DirectionalLight(0xffffff, 0.75);
			light.position.setScalar(100);
			scene.add(light);
			scene.add(new THREE.AmbientLight(0xffffff, 0.25));

			var obj = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 4), new THREE.MeshLambertMaterial({color: "aqua", wireframe: false}));
			obj.layers.set(0);
			obj.position.z = 0.25;
			scene.add(obj);

			var objBack = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 1), 
			new THREE.MeshBasicMaterial({ color: 'red', wireframe: false })
			);
			objBack.position.z = -2.25;
			objBack.layers.set(1);
			scene.add(objBack);

			/** COMPOSER */
			var renderScene = new RenderPass(scene, camera);

			// var effectFXAA = new ShaderPass(FXAAShader);
			// effectFXAA.uniforms.resolution.value.set( 1 / window.innerWidth, 1 / window.innerHeight )

			var bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
			bloomPass.threshold = 0.21;
			// bloomPass.strength = 1.2;
			// bloomPass.radius = 0.55;
			// bloomPass.renderToScreen = true;

			var composer = new EffectComposer(renderer);
			composer.setSize(window.innerWidth, window.innerHeight);

			composer.addPass(renderScene);
			// composer.addPass(effectFXAA);
			
			composer.addPass(bloomPass);

			// renderer.gammaInput = true;
			// renderer.gammaOutput = true;
			// renderer.toneMappingExposure = Math.pow(0.9, 4.0);

			render();
			function render() {
				requestAnimationFrame(render);

				renderer.clear();

				// camera.layers.set(1);
				composer.render();

				renderer.clearDepth();
				// camera.layers.set(0);
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
