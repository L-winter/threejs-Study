<template>
	<div class="hello">
		<img src="FSLog1o.png" alt="" width="100px">
	</div>
</template>

<script>
	import * as THREE from 'three';
	// import TrackballControls from 'three/examples/js/controls/TrackballControls'
	// import fonts from '../threex/controls/OrbitControls'

	// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';

	export default {
		name: 'textfont',
		mounted:function() {
			// setTimeout(()=>{
					this.demo()
			// },5000)
			// console.log()
		},
		methods: {
			demo: function() {
				var scene, camera, renderer ;
				var loader = new THREE.FontLoader();
				//导入字体，设定字体，这里的话，你们找对自己的字体路径，可能和我的不一样的！！下载的three.js包里面examples/fonts里面有字体
				loader.load('font/helvetiker_regular.typeface.json', function(font) {
					init(font);
					animate();
				});
				function init(font) {
					// 老三样 场景scene，相机camera，渲染器render
					scene = new THREE.Scene();
					// 相机
					camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
					camera.position.set(0, 10, 500);

					// 渲染器
					renderer = new THREE.WebGLRenderer();


					//背景颜色修改一下
					renderer.setClearColor(0xf0f0f0);


					renderer.setSize(window.innerWidth, window.innerHeight);


					//显示在窗体
					document.body.appendChild(renderer.domElement);


					// 文字
					var text = "text3D";


					var g = new THREE.TextGeometry(text, {
						// 设定文字字体，
						font: font,
						//尺寸
						size: 30,
						//厚度
						height: 30,
					});
					//计算边界，暂时不用管
					g.computeBoundingBox();
					//3D文字材质
					var m = new THREE.MeshBasicMaterial({
						color: 0xff0000
					});
					var mesh = new THREE.Mesh(g, m);

					// 加入到场景中
					scene.add(mesh);

				}


				function animate() {
					requestAnimationFrame(animate);
					// 渲染
					renderer.render(scene, camera);
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
