import * as THREE from 'three';
import "./style.css";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

var customColor;

const button=document.getElementById('btn1');

button.addEventListener("click", ()=>{
    const col=document.getElementById("colorPicker")
    customColor=col.value;
    console.log(customColor)
})
const default_color="#00ff83";


//Sizes
const sizes={
  width:window.innerWidth,
  height:window.innerHeight
}
//Scene
const scene=new THREE.Scene();

//Sphere 
const geometry=new THREE.SphereGeometry(3,128,128);
const material=new THREE.MeshStandardMaterial({
  color:customColor||default_color
})
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);


//camera
const camera=new THREE.PerspectiveCamera(45, sizes.width/sizes.height,0.1,100);
camera.position.z=20;
scene.add(camera);

//light 
const light=new THREE.PointLight(0xffffff,1,100)
light.position.set(0,10,10)
scene.add(light);


//renderer
const canvas= document.querySelector('.webgl');
const renderer=new THREE.WebGLRenderer({canvas}) ;

renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera )


//controls
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true;
controls.enablePan=false; 
controls.enableZoom=false;
controls.autoRotate=true;
controls.autoRotateSpeed=4;

//resize
window.addEventListener("resize",()=>{
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight
  //update camera 
  camera.aspect=sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width,sizes.height);

})

//loop
const loop=()=>{
  controls.update();
  scene.add(mesh);
  //console.log(mesh.material.color)
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop()