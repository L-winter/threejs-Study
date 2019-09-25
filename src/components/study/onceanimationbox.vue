<template>
	<div class="hello">
		<canvas id="mainCanvas"></canvas>
		<div id='map'></div>
		<div @click="go">开始</div>
	</div>
</template>

<script>
	import * as THREE from 'three';
	// import TrackballControls from 'three/examples/js/controls/TrackballControls'
	// import fonts from '../threex/controls/OrbitControls'
	import Stats from "stats-js";
	// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';
	let scene = new THREE.Scene();
	export default {
		name: 'animation',
		data() {
			return {
				renderer: {},
				cube: {},
				stats: null,
				ballMesh: null,
				ballRadius: 0.5,
				camera: {},
				bal: {
					v: 0,
					a: -0.1,
					isMoving: false
				},
				animitonid: null
			}
		},
		created() {
			// THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegment s) 
			// 这里， width 是 x 方向上的长度； height 是 y 方向上的长度； depth 是 z 方向上的长 度；后三个参数分别是在三个方向上的分段数，如 widthSegments 为 3 的话，代表 x 方 向上水平分为三份。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的 缺省值为 1 。其他几何形状中的分段也是类似的，下面不做说明。

		},
		mounted: function() {
			// setTimeout(()=>{
			this.initStats()
			var renderer = new THREE.WebGLRenderer({
				canvas: document.getElementById('mainCanvas'),
			});
			renderer.setClearColor(0xFFFFFF);
			renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer = renderer;

			var camera = new THREE.PerspectiveCamera(40, 400 / 400, 1, 1000);
			// camera.lookAt(new THREE.Vector3(0, 0, 0));
			// camera.position.set(0, 0, 8);
			camera.position.set(0, 4, 20);
			camera.lookAt(new THREE.Vector3(0, 5, 0));
			this.camera = camera;
			scene.add(this.camera);

			this.imgMaterial()
			this.pm()
			// this.func()
			// },5000)
			// console.log()
		},
		methods: {
			go() {
				this.bal.isMoving = true;
				this.cube.position.y = 10
				this.bal.v = 0;
			},
			initStats() {
				// debugger;
				this.stats = new Stats();
				// this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
				let statsPosition = this.stats.dom;
				statsPosition.style.left = "213px";
				statsPosition.style.top = "8%";
				document.getElementById("map").appendChild(statsPosition);
			},
			pm: function() { //平面
				let that = this;
				var imgmap = THREE.ImageUtils.loadTexture('img/zk.jpg', {}, function() {
					that.renderer.render(scene, that.camera);
				})

				imgmap.wrapS = imgmap.wrapT = THREE.RepeatWrapping; //②设置 wrapS 和 wrapT 方向都重复
				imgmap.repeat.set(3, 3); //②重复行列数

				var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),
					new THREE.MeshLambertMaterial({
						map: imgmap
					}));
				plane.rotation.x = -Math.PI / 2;
				scene.add(plane);
				this.renderer.render(scene, that.camera);
			},
			imgMaterial: function() { //球
				let that = this;
				// canvas size is 400x300
				var light = new THREE.PointLight(0xffffff, 1, 100);
				light.position.set(10, 15, 5);
				scene.add(light);

				// a cube in the scenefff
				this.cube = new THREE.Mesh(new THREE.SphereGeometry(that.ballRadius, 16, 8), //球
					// new THREE.MeshNormalMaterial()
					new THREE.MeshLambertMaterial({
						color: 0xffff00
					})
				);

				// cube.material = new THREE.MeshLambertMaterial({
				//  color: 0xff0000
				// });
				// that.cube=cube;
				this.cube.position.y = that.ballRadius
				// scene.add(this.cube);

				scene.add(that.cube);
				// render
				this.animitonid = requestAnimationFrame(this.animation);
				this.renderer.render(scene, this.camera);
			},
			animation() {
				
					let that = this;
				//v:速度 a:加速度
				if (this.bal.isMoving) {
					// console.log('gangg',this.cube.position.y,this.bal.v)
					this.cube.position.y += this.bal.v;
					this.bal.v += -0.01;
					console.log(this.cube.position.y,this.bal.v)
					if (this.cube.position.y <= this.ballRadius) {
						console.log('开始', this.cube.position.y,this.bal.v )
						this.bal.v = -(this.bal.v * 0.9);
						console.log('end',this.cube.position.y, this.bal.v )
					}
					if (Math.abs(this.bal.v) < 0.001) {
						console.log('jiesu')
						cancelAnimationFrame(this.animitonid);
						this.bal.isMoving = false;
						this.cube.position.y = this.ballRadius;
					}
					that.stats.update();
				}
				this.renderer.render(scene, that.camera);
				this.animitonid = requestAnimationFrame(this.animation);
			},
			func() {
				var requestAnimationFrame = window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame;
				window.requestAnimationFrame = requestAnimationFrame;

				var scene = null;
				var camera = null;
				var renderer = null;

				var id = null;

				var stat = null;

				var ballMesh = null;
				var ballRadius = 0.5;
				var isMoving = false;
				var maxHeight = 5;

				var v = 0;
				var a = -0.01;
				init()

				function init() {
					stat = new Stats();
					stat.domElement.style.position = 'absolute';
					stat.domElement.style.right = '0px';
					stat.domElement.style.top = '0px';
					document.body.appendChild(stat.domElement);

					renderer = new THREE.WebGLRenderer({
						canvas: document.getElementById('mainCanvas')
					});
					renderer.setSize(window.innerWidth, window.innerHeight);
					scene = new THREE.Scene();

					camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
					camera.position.set(5, 10, 20);
					camera.lookAt(new THREE.Vector3(0, 3, 0));
					scene.add(camera);

					// ball
					ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 16, 8),
						new THREE.MeshLambertMaterial({
							color: 0xffff00
						}));
					ballMesh.position.y = ballRadius;
					scene.add(ballMesh);

					// plane
					var texture = THREE.ImageUtils.loadTexture('../img/chess.png', {}, function() {
						renderer.render(scene, camera);
					});
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
					texture.repeat.set(4, 4);
					var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),
						new THREE.MeshLambertMaterial({
							map: texture
						}));
					plane.rotation.x = -Math.PI / 2;
					scene.add(plane);

					var light = new THREE.DirectionalLight(0xffffff);
					light.position.set(10, 10, 15);
					scene.add(light);

					id = requestAnimationFrame(draw);
				}

				function draw() {
					stat.begin();

					if (isMoving) {
						ballMesh.position.y += v;
						v += a;

						if (ballMesh.position.y <= ballRadius) {
							// hit plane
							v = -v * 0.9;
						}

						if (Math.abs(v) < 0.001) {
							// stop moving
							isMoving = false;
							ballMesh.position.y = ballRadius;
						}
					}

					renderer.render(scene, camera);

					id = requestAnimationFrame(draw);

					stat.end();
				}

				function stop() {
					if (id !== null) {
						cancelAnimationFrame(id);
						id = null;
					}
				}

				drop()

				function drop() {
					isMoving = true;
					ballMesh.position.y = maxHeight;
					v = 0;
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
