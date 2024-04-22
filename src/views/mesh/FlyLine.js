import * as THREE from "three";
import gsap from "gsap";
const uniform = {};
export default class createFlyLine {
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1.8, 3, 0),
      new THREE.Vector3(4, 4, 0),
      new THREE.Vector3(6.2, 3, 0),
      new THREE.Vector3(8, 0, 0),
    ];
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.2, 2, false);
    const textureLoader = new THREE.TextureLoader()
    this.texture = textureLoader.load('z.png')
    this.texture.repeat.set(1,2)
    this.texture.wrapS = THREE.RepeatWrapping
    this.texture.wrapT = THREE.MirroredRepeatWrapping
    // 设置材质
    this.material = new THREE.MeshBasicMaterial({
        map:this.texture,
        color:0xfff000,
        transparent:true,
        opacity:0.5
    })
    this.mesh = new THREE.Mesh(this.geometry,this.material)
    // 创建飞线动画
    gsap.to(this.texture.offset,{
        x:-1,
        duration:2,
        repeat:-1,
        ease:'none'
    })
  }
}
