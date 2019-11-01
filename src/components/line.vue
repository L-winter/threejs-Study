<template>
	<div class="hello"></div>
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
		this.demo();
	},
	methods: {
		demo: function() {
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);

			var camera = new THREE.PerspectiveCamera(165, window.innerWidth / window.innerHeight, 1, 1000); //创建相机（角度、长宽比，远剪切面，近剪切面）+

			camera.position.set(0, 10, 0);
			camera.lookAt(0, 0, 0);
			// camera.lookAt(new THREE.Vector3(0, 1, 0));

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
			var curve = new THREE.CatmullRomCurve3(
				controlPoints
					.map((p, ndx) => {
						// console.log(ndx,p)
						p0.set(...p);
						p1.set(...controlPoints[(ndx + 1) % controlPoints.length]);
						return [new THREE.Vector3().copy(p0), new THREE.Vector3().lerpVectors(p0, p1, 0.1), new THREE.Vector3().lerpVectors(p0, p1, 0.9)];
					})
					.flat(),

				true
			);

			var material = new THREE.LineBasicMaterial({
				color: 0x0000ff
			}); //定义材质

			// var curve = new THREE.CatmullRomCurve3( [
			// 	new THREE.Vector3( -10, 0, 10 ),
			// 	new THREE.Vector3( -5, 5, 5 ),
			// 	new THREE.Vector3( 0, 0, 0 ),
			// 	new THREE.Vector3( 5, -5, 5 ),
			// 	new THREE.Vector3( 10, 0, 10 )
			// ] );
				const points = curve.getPoints(250);
					const geometry = new THREE.BufferGeometry().setFromPoints(points);
					
					
			// var geometry = new THREE.Geometry();
			// geometry.vertices = curve.getPoints(50);

			var line = new THREE.Line(geometry, material); //组合
			
			// line.scale.set(100, 100, 100);
			line.position.y = -1;
			line.visible = false;
			// material.depthTest = true;
			// line.renderOrder = 1;

			scene.add(line); //添加到场景中
			renderer.render(scene, camera); //渲染器渲染
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
