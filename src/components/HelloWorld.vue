 <template>
 <div class="page">
     <!-- 123 -->
        <div id="container"></div>
		<!-- <div id="blocker"></div> -->
 </div>
</template>




<script type="text/ecmascript-6">
import TrackballControls from 'three/examples/js/controls/TrackballControls'
// import Orbitcontrols from 'three/examples/js/controls/Orbitcontrols'
import CSS3DObject from 'three/examples/js/renderers/CSS3DRenderer'
import { Vector3 } from 'three';
import * as THREE from 'three';

// import dat from 'dat.gui'
export default {
 data() {
    return {
        camera:null,
        scene:null,
        renderer:null,
        controls:null,
        group:null,
        cube:null,
        MouseLastSecond:[{x:0,y:0}],
    }
 },
created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted(){
    //   console.log(CSS3DObject)
     var _this=this;
     window.UE4SetGraphics=function a(x,y,z) {
        //  console.log(x,y,z)
         _this.updateRoat(x,y,z)
     }
  },
 components: {

 },
 methods:{
     updateRoat(x,y,z){
        //  if(this.MouseLastSecond.x=0){
        //     this.MouseLastSecond.x=x;
        //     this.MouseLastSecond.y=y;
        //  }

         this.group.rotation.x+=(x)*0.08/Math.PI;
         this.group.rotation.y+=(y)*0.08/Math.PI;
         this.MouseLastSecond.x=x;
         this.MouseLastSecond.y=y;
        // this.group.rotateX(x/Math.PI);
        // this.group.rotateY(y/Math.PI);
        //  this.group.rotation.z=z*0.01;
     },
    init(){
      this.initMesh()
    },
    initMesh(){
        var container = document.getElementById( 'container' );

        this.camera = new THREE.OrthographicCamera( -400, 400, 300, -300, 200, 2000);
        this.camera.position.set( 0,1,2);

        var vec = new THREE.Vector3();
        this.scene = new THREE.Scene();
        
        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(160,160)


        this.group = new THREE.Group();
        this.group.add( new this.AroundElement( 'a', 0, 0, 80, 0 ) );
        this.group.add( new this.AroundElement( 'b', 80, 0, 0, Math.PI / 2 ) );
        this.group.add( new this.AroundElement( 'c', 0, 0, - 80, Math.PI ) );
        this.group.add( new this.AroundElement( 'd', - 80, 0, 0, - Math.PI / 2 ) );

        // this.group.add(new this.TopBottomElement('e', 0, 80, 0, Math.PI / 2));
        // this.group.add(new this.TopBottomElement('f', 0, -80, 0, Math.PI / 2));

        var geometry = new THREE.BoxGeometry( 100, 100, 100 );
        var material = new THREE.MeshBasicMaterial({color:0xdddddd});
        this.scene.add( this.group );
        this.cube = new THREE.Mesh(geometry,material)
        this.scene.add(this.cube);
         
        // this.renderer = new THREE.WebGLRenderer({
        //  // 将canvas交给renderer 一个渲染的容器
        // container: container,
        //  // 平滑， 抗锯齿 输出的画面会进行优化，不会带毛边
        //  antialias: true
        //  });
        container.appendChild( this.renderer.domElement );
        // console.log(this.group)
        // this.group.rotation.z=0;
        // this.group.rotation.x=0.1;
        // this.group.rotation.y=0.5;
        this.group.rotateX(-Math.PI/6);

        // this.group.rotateX(0.46/Math.PI);
        // this.group.rotateZ(-0.1);
        


        this.controls = new THREE.TrackballControls( this.camera );
        this.controls.rotateSpeed = 5;
        // this.controls.enableZoom = false;
        // this.controls.enablePan=false;
        this.controls.noPan=true;
        this.controls.noZoom=true;
        this.controls.staticMoving = true;// 静止移动，为 true 则没有惯性

        this.controls.addEventListener( 'change', this.changerota );
        // Block iframe events when dragging camera
        // console.log(this.controls)
        this.animate();
    },
    changerota(){
        // console.log(this.group.rotation.x,this.group.rotation.y,this.group.rotation.z)
        // console.log(this.group.rotation)
    },
    animate(){
        requestAnimationFrame( this.animate );
        // console.log(this.group.rotation.x,this.group.rotation.y,this.group.rotation.z);
        this.camera.lookAt({x:1,y:1,z:1});
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    },
    render() {

    },
    onMouseclick(){
    },
    AroundElement(id, x, y, z, ry){
        var div = document.createElement( 'div' );
        div.style.width = '160px';
        div.style.height = '120px';
        div.style.backgroundColor = '#dddddd';
        // div.addEventListener('mousebuttondown',this.onMouseclick,false);
        var iframe = document.createElement( 'div' );
        iframe.style.width = '80px';
        iframe.style.height = '60px';
        iframe.style.border = '0px';
        iframe.id = id;
        iframe.style.padding=30+'px';
        iframe.style.fontSize=50+'px';

        div.appendChild( iframe );

        if(id=='a'){
            iframe.textContent='前';
        }
        else if(id=='b'){
            iframe.textContent='右';
        }
        else if(id=='c'){
            iframe.textContent='后';
        }
        else if(id=='d'){
            iframe.textContent='左';
        }
        var object = new THREE.CSS3DObject( div );
        object.position.set( x, y, z );
        object.rotation.y = ry;

        
        return object;
    },
    TopBottomElement( id, x, y, z, rx){
        var div = document.createElement('div');
        div.style.width = '160px';
        div.style.height = '160px';
        

        div.style.backgroundColor = '#dddddd';
        //  div.id = id;
         div.style.textAlign='center';
         div.style.fontSize=15;
        var iframe = document.createElement('div');
        iframe.style.width = '120px';
        iframe.style.height = '120px';
        iframe.style.border = '5px';
        iframe.id=id;

        iframe.style.padding=30+'px';
        iframe.style.fontSize=50+'px';

        if(id=='e'){
            iframe.textContent='上';
        }
        else if(id=='f'){
            iframe.textContent='下';
        }
        div.appendChild( iframe );

        var object = new THREE.CSS3DObject(div);
        object.position.set(x, y, z);
        object.rotation.x = rx;
        // console.log(object)
        return object;
    },
  },
}
</script>
<style>


    /* #a:hover, #b:hover, #c:hover, #d:hover, #e:hover, #f:hover{
        background-color : #cccccc!important;
    } */

    #container{
     position: relative;
     top:0px;
     left: 0px;
     width:400px;
     height:200px;   
    }
    /* div:hover {
        box-shadow: 0px 0px 12px rgba(0,255,255,0.75); ;
        border: 1px solid rgba(127,255,255,0.75);
        background-color : #aabbcc;
    } */
</style>
