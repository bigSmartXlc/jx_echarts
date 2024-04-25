import * as THREE from 'three';
// 渲染器
const render = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true//允许背景透明
})
render.setPixelRatio(window.devicePixelRatio)
render.setSize(window.innerWidth, window.innerHeight)
render.autoClear = true
// 渲染器渲染阴影-----------------------------------------------------------------
render.shadowMap.enabled = true


export default render