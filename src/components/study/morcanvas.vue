<template>
	<div class="hello">
		<canvas id="c"></canvas>
		<p>
		  <span id="box" class="diagram left"></span>
		  I love boxes. Presents come in boxes.
		  When I find a new box I'm always excited to find out what's inside.
		</p>
		<p>
		  <span id="pyramid" class="diagram right"></span>
		  When I was a kid I dreamed of going on an expedition inside a pyramid
		  and finding a undiscovered tomb full of mummies and treasure.
		</p>
	</div>
</template>

<script>
import * as THREE from 'three';



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
		
		this.twocanvas()
	},
	methods: {
		twocanvas: function(){
			 const canvas = document.querySelector('#c');
			  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
			
			  function makeScene(elem) {
			    const scene = new THREE.Scene();
			
			    const fov = 45;
			    const aspect = 2;  // the canvas default
			    const near = 0.1;
			    const far = 5;
			    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
			    camera.position.set(0, 1, 2);
			    camera.lookAt(0, 0, 0);
			
			    {
			      const color = 0xFFFFFF;
			      const intensity = 1;
			      const light = new THREE.DirectionalLight(color, intensity);
			      light.position.set(-1, 2, 4);
			      scene.add(light);
			    }
			
			    return {scene, camera, elem};
			  }
			
			  function setupScene1() {
			    const sceneInfo = makeScene(document.querySelector('#box'));
			    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
			    const material = new THREE.MeshPhongMaterial({color: 'red'});
			    const mesh = new THREE.Mesh(geometry, material);
			    sceneInfo.scene.add(mesh);
			    sceneInfo.mesh = mesh;
			    return sceneInfo;
			  }
			
			  function setupScene2() {
			    const sceneInfo = makeScene(document.querySelector('#pyramid'));
			    const radius = .8;
			    const widthSegments = 4;
			    const heightSegments = 2;
			    const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
			    const material = new THREE.MeshPhongMaterial({
			      color: 'blue',
			      flatShading: true,
			    });
			    const mesh = new THREE.Mesh(geometry, material);
			    sceneInfo.scene.add(mesh);
			    sceneInfo.mesh = mesh;
			    return sceneInfo;
			  }
			
			  const sceneInfo1 = setupScene1();
			  const sceneInfo2 = setupScene2();
			
			  function resizeRendererToDisplaySize(renderer) {
			    const canvas = renderer.domElement;
			    const width = canvas.clientWidth;
			    const height = canvas.clientHeight;
			    const needResize = canvas.width !== width || canvas.height !== height;
			    if (needResize) {
			      renderer.setSize(width, height, false);
			    }
			    return needResize;
			  }
			
			  function renderSceneInfo(sceneInfo) {
			    const {scene, camera, elem} = sceneInfo;
			
			    // get the viewport relative position opf this element
			    const {left, right, top, bottom, width, height} =
			        elem.getBoundingClientRect();
					console.log(width)
			
			    const isOffscreen =
			        bottom < 0 ||
			        top > renderer.domElement.clientHeight ||
			        right < 0 ||
			        left > renderer.domElement.clientWidth;
			
			    if (isOffscreen) {
			      return;
			    }
			
			    camera.aspect = width / height;
			    camera.updateProjectionMatrix();
			
			    const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
			    renderer.setScissor(left, positiveYUpBottom, width, height);
			    renderer.setViewport(left, positiveYUpBottom, width, height);
			
			    renderer.render(scene, camera);
			  }
			
			  function render(time) {
			    time *= 0.001;
			
			    resizeRendererToDisplaySize(renderer);
			
			    renderer.setScissorTest(false);
			    renderer.clear(true, true);
			    renderer.setScissorTest(true);
			
			    sceneInfo1.mesh.rotation.y = time * .1;
			    sceneInfo2.mesh.rotation.y = time * .1;
			
			    renderSceneInfo(sceneInfo1);
			    renderSceneInfo(sceneInfo2);
			
			    requestAnimationFrame(render);
			  }
			
			  requestAnimationFrame(render);
		},
		imgMaterial: function() {
			  const canvas = document.querySelector('#c');
			  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
			 // const scene = new THREE.Scene();
				function makeScene(elem) {
				  let scene = new THREE.Scene();
				 
				  const fov = 45;
				  const aspect = 2;  // the canvas default
				  const near = 0.1;
				  const far = 5;
				  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
				  camera.position.z = 2;
				  camera.position.set(0, 1, 2);
				  camera.lookAt(0, 0, 0);
				 
				  {
				    const color = 0xFFFFFF;
				    const intensity = 1;
				    const light = new THREE.DirectionalLight(color, intensity);
				    light.position.set(-1, 2, 4);
				    scene.add(light);
				  }
				 
				  return {scene, camera, elem};
				}
				 
				function setupScene1() {
				  const sceneInfo = makeScene(document.querySelector('#box'));
				  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
				  const material = new THREE.MeshPhongMaterial({color: 'red'});
				  const mesh = new THREE.Mesh(geometry, material);
				  sceneInfo.scene.add(mesh);
				  sceneInfo.mesh = mesh;
				  return sceneInfo;
				}
				 
				function setupScene2() {
				  const sceneInfo = makeScene(document.querySelector('#pyramid'));
				  const radius = .8;
				  const widthSegments = 4;
				  const heightSegments = 2;
				  const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
				  const material = new THREE.MeshPhongMaterial({
				    color: 'blue',
				    flatShading: true,
				  });
				  const mesh = new THREE.Mesh(geometry, material);
				  sceneInfo.scene.add(mesh);
				  sceneInfo.mesh = mesh;
				  return sceneInfo;
				}
				
				 
				const sceneInfo1 = setupScene1();
				const sceneInfo2 = setupScene2();
				
				 function resizeRendererToDisplaySize(renderer) {
				    const canvas = renderer.domElement;
				    const width = canvas.clientWidth;
				    const height = canvas.clientHeight;
				    const needResize = canvas.width !== width || canvas.height !== height;
				    if (needResize) {
				      renderer.setSize(width, height, false);
				    }
				    return needResize;
				  }


				function renderSceneInfo(sceneInfo) {
				  const {scene, camera, elem} = sceneInfo;
				 
				  // get the viewport relative position opf this element
				  const {left, right, top, bottom, width, height} =
				      elem.getBoundingClientRect();
				 
				  const isOffscreen =
				      bottom < 0 ||
				      top > renderer.domElement.clientHeight ||
				      right < 0 ||
				      left > renderer.domElement.clientWidth;
				 
				  if (isOffscreen) {
				    return;
				  }
				 
				  camera.aspect = width / height;
				  camera.updateProjectionMatrix();
				 
				  const positiveYUpBottom = canvasRect.height - bottom;
				  renderer.setScissor(left, positiveYUpBottom, width, height);
				  renderer.setViewport(left, positiveYUpBottom, width, height);
				 
				  renderer.render(scene, camera);
				}
				function render(time) {
				  time *= 0.001;
				 
				  resizeRendererToDisplaySize(renderer);
				 
				  renderer.setScissorTest(false);
				  renderer.clear(true, true);
				  renderer.setScissorTest(true);
				 
				  sceneInfo1.mesh.rotation.y = time * .1;
				  sceneInfo2.mesh.rotation.y = time * .1;
				 
				  renderSceneInfo(sceneInfo1);
				  renderSceneInfo(sceneInfo2);
				 
				  requestAnimationFrame(render);
				}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#c {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  z-index: -1;
}
.diagram {
  display: inline-block;
  width: 5em;
  height: 3em;
  border: 1px solid black;
}
.left {
  float: left;
  margin-right: .25em;
}
.right {
  float: right;
  margin-left: .25em;
}
</style>
