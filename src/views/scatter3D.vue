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
import createCity from './mesh/City';
import createFlyLine from './mesh/FlyLine'
import createFlyLineByShader from './mesh/FlyLineShader'
export default {
  data() {
    return {
      mixer: null,
      clock: new THREE.Clock(),
    };
  },
  mounted() {
    this.initMesh();
    this.animate();
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
      camera.position.set(25, 10, 15)
      createCity()
      const flyLine = new createFlyLine()
      scene.add(flyLine.mesh)
      const flyLineByShader = new createFlyLineByShader()
      scene.add(flyLineByShader.mesh)
    }
  }
};
</script>

<style></style>
