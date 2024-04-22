import * as THREE from "three";
import gsap from "gsap";
const uniform = {};
export default class createFlyLineByShader {
  constructor() {
    //  三维二次贝塞尔曲线
    this.lineCurve =new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 6, 4),
        new THREE.Vector3(0, 0, 8)
    );
    //   取点
    const points = this.lineCurve.getPoints(1000);
    //   用获取的点创建
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.geometry.computeBoundingBox();
    const {min,max} = this.geometry.boundingBox
    let uWidth = (max.z-min.z).toFixed(1)
    // this.geometry.setAttribute('uwidth',uWidth)
    //添加材质
    let uniforms ={
        uWidth:{value:uWidth},
        utime:{value:0},
        setPointSize:{value:1}
    }
    this.material = new THREE.ShaderMaterial({
        uniforms,
        transparent:true,
        vertexShader:`
            uniform float uWidth;
            uniform float utime;
            uniform float setPointSize;
            varying vec3 vPosition;
            void main(){
                vPosition = position;
                vec4 viewPosition = viewMatrix*modelMatrix *vec4(position,1);
                gl_Position = projectionMatrix * viewPosition;
                if(position.z>utime&&position.z<utime+1.0){
                    gl_PointSize = 5.0 *(1.0-(uWidth-position.z)/uWidth);
                }else{
                    gl_PointSize = setPointSize;
                }
            }
        `,
        fragmentShader:`
        uniform float utime;
        varying vec3 vPosition;
        void main(){
            if(vPosition.z>utime&&vPosition.z<utime+1.0){
                gl_FragColor = mix(vec4(1,0,0,1),vec4(1,0,0,0.8),0.5);
            }else{
                gl_FragColor = vec4(1,1,0,0.2);
                gl_FragColor = vec4(gl_FragColor.rgb,0.2);
            }
        }
        `
    })
    this.mesh=new THREE.Points(this.geometry,this.material)
    gsap.to(uniforms.utime,{
        value:8,
        duration:3,
        repeat:-1,
        ease:'none'
    })
  }
}
