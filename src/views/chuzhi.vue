<template>
  <div id='my-three'>
  </div>
</template>

<script>
import * as THREE from 'three';
import scene from './sceneMoudles/scene'
import axesHelper from './sceneMoudles/axesHelper'
import camera from './sceneMoudles/camera'
import render from './sceneMoudles/renderer'
import controls from './sceneMoudles/controls'
import './sceneMoudles/init'
import createMap from './mesh/Map';
export default {
  data() {
    return {
      mixer: null,
      clock: new THREE.Clock(),
      mouse: new THREE.Vector2(),
      lastPicker: null
    };
  },
  mounted() {
    this.initMesh();
    this.animate();
    //碰撞检测
    // window.addEventListener('click', function (event) {
    //   this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
    //   const raycaster = new THREE.Raycaster()
    //   raycaster.setFromCamera(this.mouse, camera)
    //   const intersects = raycaster.intersectObjects(scene.children[2].children, true)
    //   if (intersects.length > 0) {
    //     if (this.lastPicker) {
    //       this.lastPicker.material.color.copy(this.lastPicker.material.oldColor)
    //     }
    //     this.lastPicker = intersects[0].object
    //     this.lastPicker.material.oldColor = this.lastPicker.material.color.clone();
    //     this.lastPicker.material.color.set(0xff0000)
    //   } else {
    //     if (this.lastPicker) {
    //       this.lastPicker.material.color.copy(this.lastPicker.material.oldColor)
    //     }
    //   }
    // })
    // light
    const dirlight = new THREE.DirectionalLight(0xffffff, 10)
    dirlight.position.set(5, 2, 3)
    dirlight.castShadow = true
    scene.add(dirlight)
    scene.add(axesHelper)
    document.getElementById('my-three')?.appendChild(render.domElement)
  },
  methods: {
    animate() {
      const delate = this.clock.getDelta()
      if (this.mixer) {
        this.mixer.update(delate)
      }
      controls.update()
      requestAnimationFrame(this.animate);
      render.render(scene, camera)
    },
    initMesh() {
      scene.clear()
      camera.position.set(0, 0, 200)
      createMap()
    }
  }
};
</script>

<style>
 
</style>
