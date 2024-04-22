<script setup>
import * as THREE from 'three';
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import '../sceneMoudles/init'
import { onMounted } from 'vue'
import createMap from '../mesh/Map';

let mixer
let clock = new THREE.Clock()
let mouse = new THREE.Vector2()
let lastPicker = null
initMesh()
animate()
function initMesh() {
    scene.clear()
    camera.position.set(0,0,200)
    createMap() 
}

//碰撞检测
window.addEventListener('click',function(event){
     mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
     const raycaster = new THREE.Raycaster()
     raycaster.setFromCamera(mouse, camera)
     const intersects = raycaster.intersectObjects(scene.children[2].children, true)
     if(intersects.length > 0){
          if(lastPicker){
               lastPicker.material.color.copy(lastPicker.material.oldColor)
          }
          lastPicker = intersects[0].object
          lastPicker.material.oldColor = lastPicker.material.color.clone();
          lastPicker.material.color.set(0xff0000)
     }else{
          if(lastPicker){
               lastPicker.material.color.copy(lastPicker.material.oldColor)
          }
     }
})
// light
const dirlight = new THREE.DirectionalLight(0xffffff,10)
dirlight.position.set(5,2,3)
dirlight.castShadow = true
scene.add(dirlight)
scene.add(axesHelper)

onMounted(() => {
     document.getElementById('my-three')?.appendChild(render.domElement)
})
 function animate() {
    const delate = clock.getDelta()
    if(mixer){
         mixer.update(delate)
    }
     controls.update()
     requestAnimationFrame(animate);
     render.render(scene, camera)
}

</script>
<template>
    <div id='my-three'>
    </div>
</template>