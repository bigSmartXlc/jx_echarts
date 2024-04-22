import * as THREE from 'three';
import scene from '../sceneMoudles/scene'
import * as d3 from 'd3'

const map = new THREE.Object3D();
export default function createMap(){
    const loader= new THREE.FileLoader();
    loader.load('china.json', (data)=>{
        const jsondata = JSON.parse(data);
        operateData(jsondata);
    })
}


function operateData(data){
    const features = data.features;
    features.forEach(item => {
        // 创建区域对象
        const area = new THREE.Object3D();
        area.properties = item.properties.name;
        // 获取经纬度
        const coordinates = item.geometry.coordinates
        if(item.geometry.type=='Polygon'){
            coordinates.forEach((coordinate)=>{
                const mesh = createMesh(coordinate);
                area.add(mesh);
                const line = createLines(coordinate);
                area.add(line);
            })
        }else if(item.geometry.type=='MultiPolygon'){
            coordinates.forEach((coordinate)=>{
                coordinate.forEach((item)=>{
                    const mesh = createMesh(item);
                    area.add(mesh);
                    const line = createLines(item);
                    area.add(line);
                })
            })
        }
        map.add(area);
    });
    map.name = 'map'
    scene.add(map);
}

const projection = d3.geoMercator().center([108.5,32.5]).translate([0,0,0]);
function createMesh(polygon){
    const shape = new THREE.Shape();
    polygon.forEach((row,i)=>{
        const [lon,lat] = projection(row)
        if(i==0){
            shape.moveTo(lon,-lat);
        }else{
            shape.lineTo(lon,-lat);
        }
    })
    const geometry = new THREE.ExtrudeGeometry(shape,{
        depth: 5,
        bevelEnabled: false
    })
    const metarial = new THREE.MeshLambertMaterial({
        color: Math.random()*0xffffff,
        transparent:true,
        opacity:0.5,
        side:THREE.DoubleSide
    })
    return new THREE.Mesh(geometry,metarial);
 }


 function createLines(polygon){
     const line = new THREE.BufferGeometry();
     const points = [];
     polygon.forEach((row,i)=>{
         const [lon,lat] = projection(row)
         points.push(new THREE.Vector3(lon,-lat,6))
        })
     line.setFromPoints(points)
     const lineMaterial = new THREE.LineBasicMaterial({
         color: Math.random()*0xffffff
     })
     return new THREE.Line(line,lineMaterial);
 }