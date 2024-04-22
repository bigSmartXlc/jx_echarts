<script setup>
import * as THREE from 'three';
import scene from '../sceneMoudles/scene'
import axesHelper from '../sceneMoudles/axesHelper'
import camera from '../sceneMoudles/camera'
import render from '../sceneMoudles/renderer'
import controls from '../sceneMoudles/controls'
import '../sceneMoudles/init'
import { onMounted } from 'vue'
import createCity from '../mesh/City';
import createFlyLine from '../mesh/FlyLine'
import createFlyLineByShader from '../mesh/FlyLineShader'

let mixer
let clock = new THREE.Clock()
initMesh()
animate()
function initMesh() {
    scene.clear()
    camera.position.set(25,10,15)
    createCity()
    const flyLine = new createFlyLine()
    scene.add(flyLine.mesh)
    const flyLineByShader = new createFlyLineByShader()
    scene.add(flyLineByShader.mesh)
}


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