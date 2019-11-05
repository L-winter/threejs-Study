<template>
	<div>
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

// import fonts from '../threex/controls/OrbitControls'

export default {
	name: 'home',
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
		
	},
	methods: {
		

		
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
