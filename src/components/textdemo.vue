<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
	import * as THREE from 'three';
import Stats from "stats-js";
import OrbitControls from "three/examples/js/controls/OrbitControls";

export default {
  data() {
    return {
      scene: null, //场景
      camera: null, //相机
      renderer: null, //渲染器
      light: null, //灯光
      material: null, //材质
      geometry: null,
      controls: null,
      stats: null
    };
  },
  created() {
	  
	
  },
  mounted() {
	  console.log(THREE)
    let mapEle = document.getElementById("map");
    let width = mapEle.clientWidth;
    let height = mapEle.clientHeight;
    window.vue = this;
    //场景
    this.initScene();

    //相机
    this.initCamera();

    //渲染器
    this.initRender();

    //灯光
    this.initLight();
    //模型
    this.initModel();
    // this.initControls();
    this.initStats();
    //渲染
    this.animate();
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
    },
    initCamera() {
      let mapEle = document.getElementById("map");
      let width = mapEle.clientWidth;
      let height = mapEle.clientHeight;
      // ( fov, aspect, near, far )
      // 这里使用最常见的远景相机（PerspectiveCamera），也就是类似于人眼观察的方式。
      // fov,第一个属性75设置的是视角（field of view）。类似眼睛睁多大
      // aspect,第二个属性设置的是相机拍摄面的长宽比（aspect ratio）。我们几乎总是会使用元素的宽除以高，否则会出现挤压变形。
      // near,接下来的2个属性是近裁剪面（near clipping plane）
      // far,远裁剪面（far clipping plane）
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
      //设置相机的位置
      this.camera.position.z = 500;
      //
      //this.camera.lookAt(0, 0, 0);
    },
    initRender() {
      let mapEle = document.getElementById("map");
      let width = mapEle.clientWidth;
      let height = mapEle.clientHeight;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true //antialias（是否启用抗锯齿）
      });
      //设置渲染器的尺寸
      this.renderer.setSize(width, height);

      // 设置颜色及其透明度
      //this.renderer.setClearColor(0xffffff, 1.0);

      //设置设备像素比
      this.renderer.setPixelRatio(window.devicePixelRatio);

      //将渲染器放置到指定dom当中
      mapEle.appendChild(this.renderer.domElement);
    },
    initLight() {
      //添加环境光
      this.scene.add(new THREE.AmbientLight(0x404040));
      //创建一个平行光光源照射到物体上
      /**
       * DirectionalLight( color : Integer, intensity : Float )
          color - (可选参数) 16进制表示光的颜色。 缺省值为 0xffffff (白色)。
          intensity - (可选参数) 光照的强度。缺省值为1。

       */
      let light = new THREE.DirectionalLight(0xffffff, 1.5);
      //设置平型光照射方向，照射方向为设置的点照射到原点
      //position : Vector3 假如这个值设置等于 Object3D.DefaultUp (0, 1, 0),那么光线将会从上往下照射。
      light.position.set(1, 1, 1);
      this.scene.add(light);
    },
    initModel() {
      var font;
      var loader = new THREE.FontLoader();
      // /node_modules/three/examples/fonts/helvetiker_regular.typeface.json
      // /src/static/fonts/gentilis_regular.typeface.json  
      loader.load("/src/static/fonts/新叶念体_常规.json",
       function(res) {
         //onLoad回调
        font = new THREE.TextBufferGeometry("梦里稻香听风雨,亭外客至踏剑来", {
          /**
           * font — THREE.Font的实例。
              size — Float。字体大小，默认值为100。
              height — Float。挤出文本的厚度。默认值为50。
              curveSegments — Integer。（表示文本的）曲线上点的数量。默认值为12。
              bevelEnabled — Boolean。是否开启斜角，默认为false。
              bevelThickness — Float。文本上斜角的深度，默认值为20。
              bevelSize — Float。斜角与原始文本轮廓之间的延伸距离。默认值为8。
              bevelSegments — Integer。斜角的分段数。默认值为3。
           */
          font: res,
          size: 30,
          height: 60
        });
        font.center();//BufferGeometry:根据边界矩形将几何体居中。
        //UV_Grid_Sm
        var map = new THREE.TextureLoader().load(
          "/src/static/textures/万花.jpg"
        );
        var material = new THREE.MeshLambertMaterial({
          map: map,
          side: THREE.DoubleSide
        });

        let fontModel = new THREE.Mesh(font, material);
        window.vue.scene.add(fontModel);
      });
    },
    initControls() {
      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      // 如果使用animate方法时，将此函数删除
      //controls.addEventListener( 'change', render );
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true;
      //动态阻尼系数 就是鼠标拖拽旋转灵敏度
      //controls.dampingFactor = 0.25;
      //是否可以缩放
      this.controls.enableZoom = true;
      //是否自动旋转
      this.controls.autoRotate = true;
      //设置相机距离原点的最远距离
      this.controls.minDistance = 100;
      //设置相机距离原点的最远距离
      this.controls.maxDistance = 800;
      //是否开启右键拖拽
      this.controls.enablePan = true;

      // this.camera.position.set(0, 20, 100);
      this.controls.update();
    },
    initStats() {
      // debugger;
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      let statsPosition = this.stats.dom;
      statsPosition.style.left = "230px";
      statsPosition.style.top = "9.5%";
      document.getElementById("map").appendChild(statsPosition);
    },
    render() {
      //渲染图形

      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      // this.stats.begin();
      this.controls.update();
      this.render();
      //  this.stats.end();
      this.stats.update();
      requestAnimationFrame(this.animate);
    }
  }
};
</script>
<style>
#map {
  border: none;
  /* cursor: pointer; */
  width: 100%;
  height: 600px;
  /* background-color: black; */
}
</style>