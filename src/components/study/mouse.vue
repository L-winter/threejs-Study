<template>
	<div class="hello">
		<div v-if="state">
			<canvas id="c"></canvas>
			<p>
				<span id="box" class="diagram left"></span>
				I love boxes. Presents come in boxes. When I find a new box I'm always excited to find out what's inside.
			</p>
			<p>
				<span id="pyramid" class="diagram right"></span>
				When I was a kid I dreamed of going on an expedition inside a pyramid and finding a undiscovered tomb full of mummies and treasure.
			</p>
		</div>
		<div v-else><canvas id="c"></canvas></div>
	</div>
</template>

<script>
import * as THREE from 'three';

export default {
	name: 'textfont',
	data: function() {
		return {
			renderer: {},
			state: false
		};
	},
	created() {
		// THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegment s)
		// 这里， width 是 x 方向上的长度； height 是 y 方向上的长度； depth 是 z 方向上的长 度；后三个参数分别是在三个方向上的分段数，如 widthSegments 为 3 的话，代表 x 方 向上水平分为三份。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的 缺省值为 1 。其他几何形状中的分段也是类似的，下面不做说明。
	},
	mounted: function() {
		this.tunmove();
	},
	methods: {
		tunmove: function() {
			const canvas = document.querySelector('#c');
			const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
			const fov = 60;
			const aspect = 2; // the canvas default
			const near = 0.1;
			const far = 200;
			const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
			camera.position.z = 30;

			const scene = new THREE.Scene();
			scene.background = new THREE.Color('white');
			
			const cameraPole = new THREE.Object3D();
			scene.add(cameraPole);
			cameraPole.add(camera);
			
			    const color = 0xFFFFFF;
			    const intensity = 1;
			    const light = new THREE.DirectionalLight(color, intensity);
			    light.position.set(-1, 2, 4);
			    camera.add(light);
			
			  const boxWidth = 1;
			  const boxHeight = 1;
			  const boxDepth = 1;
			  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
			  
  function rand(min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
	console.log(min + (max - min) * Math.random())
    return min + (max - min) * Math.random();
  }

  function randomColor() {
    return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
  }
  
    const numObjects = 10;
    for (let i = 0; i < numObjects; ++i) {
      const material = new THREE.MeshPhongMaterial({
        // color: randomColor(),
		color: randomColor(),
		    // map: texture,
		    transparent: true,
		    // side: THREE.DoubleSide,
		    alphaTest: 0.1,
      });
  
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(rand(-20, 20), rand(-20, 20), rand(-20, 20));
      cube.rotation.set(rand(Math.PI), rand(Math.PI), 0);
      cube.scale.set(rand(3, 6), rand(3, 6), rand(3, 6));
      scene.add(cube);
  
    }
  
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
  
    class PickHelper {
      constructor() {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
      }
      pick(normalizedPosition, scene, camera, time) {
        // restore the color if there is a picked object
        if (this.pickedObject) {
          this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
          this.pickedObject = undefined;
        }
		console.log(this.pickedObject)
  
        // cast a ray through the frustum
        this.raycaster.setFromCamera(normalizedPosition, camera);
        // get the list of objects the ray intersected
        const intersectedObjects = this.raycaster.intersectObjects(scene.children);
	
        if (intersectedObjects.length) {
		
			console.log(intersectedObjects)
          // pick the first object. It's the closest one
			this.pickedObject = intersectedObjects[0].object;
		  	console.log('object',this.pickedObject)
          // save its color
          // this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
          // set its emissive color to flashing red/yellow
          this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
        }
      }
    }
  
    const pickPosition = {x: 0, y: 0};
    const pickHelper = new PickHelper();
    clearPickPosition();
  
    function render(time) {
      time *= 0.001;  // convert to seconds;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
  // cameraPole.position.x = time * 1.8;
  
      cameraPole.rotation.x = time * .1;
	  
  
      pickHelper.pick(pickPosition, scene, camera, time);
  
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  
    function getCanvasRelativePosition(event) {
      const rect = canvas.getBoundingClientRect();
	// console.log(rect,event)
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  
    function setPickPosition(event) {
		
      const pos = getCanvasRelativePosition(event);
      pickPosition.x = (pos.x / canvas.clientWidth ) *  2 - 1;
      pickPosition.y = (pos.y / canvas.clientHeight) * -2 + 1;  // note we flip Y
    }
  
    function clearPickPosition() {
      // unlike the mouse which always has a position
      // if the user stops touching the screen we want
      // to stop picking. For now we just pick a value
      // unlikely to pick something
      pickPosition.x = -100000;
      pickPosition.y = -100000;
    }
    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);
  
    window.addEventListener('touchstart', (event) => {
      // prevent the window from scrolling
      event.preventDefault();
      setPickPosition(event.touches[0]);
    }, {passive: false});
  
    window.addEventListener('touchmove', (event) => {
      setPickPosition(event.touches[0]);
    });
  
    window.addEventListener('touchend', clearPickPosition);
			
			
		},

		// twocanvas: function() {
		// 	const canvas = document.querySelector('#c');
		// 	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

		// 	function makeScene(elem) {
		// 		const scene = new THREE.Scene();

		// 		const fov = 45;
		// 		const aspect = 400 / 400; // the canvas default
		// 		const near = 0.1;
		// 		const far = 5;
		// 		const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		// 		camera.position.set(0, 1, 2);
		// 		camera.lookAt(0, 0, 0);

		// 		{
		// 			const color = 0xffffff;
		// 			const intensity = 1;
		// 			const light = new THREE.DirectionalLight(color, intensity);
		// 			light.position.set(-1, 2, 4);
		// 			scene.add(light);
		// 		}

		// 		return { scene, camera, elem };
		// 	}

		// 	function setupScene1() {
		// 		const sceneInfo = makeScene(document.querySelector('#box'));
		// 		const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
		// 		const material = new THREE.MeshPhongMaterial({ color: 'red' });
		// 		const mesh = new THREE.Mesh(geometry, material);
		// 		sceneInfo.scene.add(mesh);
		// 		sceneInfo.mesh = mesh;
		// 		return sceneInfo;
		// 	}

		// 	function setupScene2() {
		// 		const sceneInfo = makeScene(document.querySelector('#pyramid'));
		// 		const radius = 0.8;
		// 		const widthSegments = 4;
		// 		const heightSegments = 2;
		// 		const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
		// 		const material = new THREE.MeshPhongMaterial({
		// 			color: 'blue',
		// 			flatShading: true
		// 		});
		// 		const mesh = new THREE.Mesh(geometry, material);
		// 		sceneInfo.scene.add(mesh);
		// 		sceneInfo.mesh = mesh;
		// 		return sceneInfo;
		// 	}

		// 	const sceneInfo1 = setupScene1();
		// 	const sceneInfo2 = setupScene2();

		// 	function resizeRendererToDisplaySize(renderer) {
		// 		const canvas = renderer.domElement;
		// 		const width = canvas.clientWidth;
		// 		const height = canvas.clientHeight;
		// 		const needResize = canvas.width !== width || canvas.height !== height;
		// 		if (needResize) {
		// 			renderer.setSize(width, height, false);
		// 		}
		// 		return needResize;
		// 	}

		// 	function renderSceneInfo(sceneInfo) {
		// 		const { scene, camera, elem } = sceneInfo;

		// 		// get the viewport relative position opf this element
		// 		const { left, right, top, bottom, width, height } = elem.getBoundingClientRect();

		// 		const isOffscreen = bottom < 0 || top > renderer.domElement.clientHeight || right < 0 || left > renderer.domElement.clientWidth;

		// 		if (isOffscreen) {
		// 			return;
		// 		}

		// 		camera.aspect = width / height;
		// 		camera.updateProjectionMatrix();

		// 		const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
		// 		renderer.setScissor(left, positiveYUpBottom, width, height);
		// 		renderer.setViewport(left, positiveYUpBottom, width, height);

		// 		renderer.render(scene, camera);
		// 	}

		// 	function render(time) {
		// 		time *= 0.001;

		// 		resizeRendererToDisplaySize(renderer);

		// 		renderer.setScissorTest(false);
		// 		renderer.clear(true, true);
		// 		renderer.setScissorTest(true);

		// 		sceneInfo1.mesh.rotation.y = time * 0.1;
		// 		sceneInfo2.mesh.rotation.y = time * 0.1;

		// 		renderSceneInfo(sceneInfo1);
		// 		renderSceneInfo(sceneInfo2);

		// 		requestAnimationFrame(render);
		// 	}

		// 	requestAnimationFrame(render);
		// }
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
	width: 15em;
	height: 13em;
	border: 1px solid black;
}
.left {
	float: left;
	margin-right: 0.25em;
}
.right {
	float: right;
	margin-left: 0.25em;
}
</style>
