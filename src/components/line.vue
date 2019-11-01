<template>
	<div class="hello">

	</div>
</template>

<script>
	import * as THREE from 'three';

	const scene = new THREE.Scene();
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		},
		mounted() {
			this.demo()
		},
		methods: {
			demo: function() {
				var renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);
				document.body.appendChild(renderer.domElement);

				var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500); //创建相机（角度、长宽比，远剪切面，近剪切面）+

				camera.position.set(0, 0, 100);
				camera.lookAt(0, 0, 0);


				var material = new THREE.LineBasicMaterial({
					color: 0x0000ff
				}); //定义材质

				var geometry = new THREE.Geometry(); //画线
				geometry.vertices.push(new THREE.Vector3(-10, 0, 0)); //定义点
				geometry.vertices.push(new THREE.Vector3(-10, 10, 10)); //定义点
				geometry.vertices.push(new THREE.Vector3(10, 10, 0));
				geometry.vertices.push(new THREE.Vector3(10, 0, 0));

				var line = new THREE.Line(geometry, material); //组合

				scene.add(line); //添加到场景中
				renderer.render(scene, camera); //渲染器渲染


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
