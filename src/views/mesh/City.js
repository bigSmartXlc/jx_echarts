import * as THREE from 'three';
import scene from '../sceneMoudles/scene'
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
const uniform ={
    bottomColor: {value:new THREE.Color(0x0c0e6f)},
    topColor:{value:new THREE.Color(0xaaaeff)},
    uSpreadCenter:{value:new THREE.Vector2(0,0)},
    uR:{value:0},
    uX:{value:-500},
    uY:{value:0},
    uZ:{value:-500},
    uXZ:{value:-500},
    uSpreadWidth:{value:10}
}
export default function createCity(){
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('city.glb',(gltf)=>{
        const material = new THREE.ShaderMaterial(
            {
                uniforms: uniform,
                vertexShader:`
                varying vec3 vPosition;
                void main(){
                    vPosition = position;
                    vec4 mvPosition = modelViewMatrix * vec4( position , 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                }
                `,
                fragmentShader:`
                    uniform float uheight;
                    uniform vec3 bottomColor;
                    uniform vec3 topColor;
                    uniform vec2 uSpreadCenter;
                    uniform float uR;
                    uniform float uX;
                    uniform float uZ;
                    uniform float uY;
                    uniform float uXZ;
                    uniform float uSpreadWidth;
                    varying vec3 vPosition;
                    void main(){
                        //渐变
                        float gradmix = (vPosition.y+uheight/2.0)/uheight;
                        vec3 gradMixColor = mix(bottomColor,topColor,gradmix);
                        gl_FragColor = vec4 (gradMixColor, 1);
                        //扩散
                        float spreadRadis = distance(vPosition.xz,uSpreadCenter);
                        if(uR>spreadRadis&&uR<spreadRadis+20.0){
                            gl_FragColor = mix(gl_FragColor,vec4(1,0,0,0.8),0.5);
                        }
                        //x轴向扫描
                        float dis_X = vPosition.x ;
                        if(uX>dis_X&&uX<dis_X+20.0){
                            gl_FragColor = mix(gl_FragColor,vec4(0,1,0,1),0.5);
                        }
                        //z轴向扫描
                        float dis_Z = vPosition.z ;
                        if(uZ>dis_Z&&uZ<dis_Z+20.0){
                            gl_FragColor = mix(gl_FragColor,vec4(0,0,1,1),0.5);
                        }
                        //斜向扫描
                        float dis_XZ = vPosition.z+vPosition.x;
                        if(uXZ>dis_XZ&&uXZ<dis_XZ+20.0){
                            gl_FragColor = mix(gl_FragColor,vec4(0,1,1,1),0.5);
                        }
                        //下到上扫描
                        if(uY>vPosition.y&&uY<vPosition.y+5.0){
                            gl_FragColor = mix(gl_FragColor,vec4(bottomColor,1),0.5);
                        }
                    }
                `
                
            }
        )
        gltf.scene.traverse((item)=>{
            if(item.type=='Mesh'){
                item.geometry.computeBoundingBox()
                const {min,max} = item.geometry.boundingBox
                let uheight = max.y-min.y
                uniform.uheight ={value:uheight}
                item.material=material
            }
            item.castShadow = true
        })
        scene.add(gltf.scene)
        gsap.to(uniform.uR,{
            value:300,
            duration:2,
            ease:'none',
            yoyo:true,
            repeat:-1
        })
        gsap.to(uniform.uX,{
            value:1000,
            duration:5,
            ease:'none',
            repeat:-1
        })
        gsap.to(uniform.uZ,{
            value:1000,
            duration:5,
            ease:'none',
            repeat:-1
        })
        gsap.to(uniform.uXZ,{
            value:1000,
            duration:5,
            ease:'none',
            repeat:-1
        })
        gsap.to(uniform.uY,{
            value:100,
            duration:2,
            ease:'none',
            repeat:-1
        })
    })
}