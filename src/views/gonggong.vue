<template>
   <div id="CesiumContainer" ref="CesiumContainer"></div>
</template>

<script>
import * as Cesium from "cesium";
export default {
  data() {
    return {
    };
  },
  mounted() {
    window.CESIUM_BASE_URL = "/";
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjI4NmIwYi02YTc3LTQ5OTctODFiOS0yM2NjNTYyZjFiNDgiLCJpZCI6MjAwNjc4LCJpYXQiOjE3MDk5ODQxOTd9.vm2pqsSyh6oz6E-KMZOKq_R24BsxqzfEdELaUTrFIjQ";
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      89.5,
      20.4,
      110.4,
      61.2
    );
    const viewer = new Cesium.Viewer("CesiumContainer", {
      infoBox: false,//信息框Cesium
      geocoder: false,//搜索框
      fullscreenButton: false,//全屏按钮
      homeButton: false,//默认定位按钮
      sceneModePicker: false,//3D/2D切换
      timeline: false,//时间轴
      animation: false,//动画
      baseLayerPicker: false,//图层选择
      navigationHelpButton: false,//帮助
      navigationInstructionsInitiallyVisible: false,//是否默认显示帮助
      scene3DOnly: false,//是否只显示3D
      //天空盒子
      // skyBox: new Cesium.SkyBox({}),
      // baseLayer: new Cesium.ImageryLayer(
      //   new Cesium.UrlTemplateImageryProvider({
      //     // 天地图矢量
      //     //   url:'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5805c29bcd848140544fb2bcc8390889',
      //     //天地图影像
      //     url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5805c29bcd848140544fb2bcc8390889",
      //     //   高德地图影像
      //     //   url:'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      //     minimumLevel: 1,
      //     maximumLevel: 18,
      //   })
      // ),
    });
    // viewer.imageryLayers.addImageryProvider(
    //   new Cesium.UrlTemplateImageryProvider({
    //     //调用天地图矢量地图中文注记服务
    //     url: "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=5805c29bcd848140544fb2bcc8390889",
    //     minimumLevel: 1,
    //     maximumLevel: 18,
    //   })
    // );
    this.addWorldTerrainAsync(viewer);
  },
  methods: {
    createModel(url, height, viewer) {
      viewer.entities.removeAll();
      const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, height);
      const heading = Cesium.Math.toRadians(135);
      const pitch = 0;
      const roll = 0;
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );

      var entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
        // position: pointsPosition,
        //   label: {
        //     text: "广州塔",
        //     font: "20px sans-serif",
        //     fillColor: Cesium.Color.AQUA,
        //     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        //     outlineWidth: 2,
        //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //     pixelOffset: new Cesium.Cartesian2(20, -20),
        //   },
        //   // 标签
        //   billboard: {
        //     image:'gzt.png',
        //     width:50,height:50,
        //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //     horizontalOrigin: Cesium.HorizontalOrigin.TOP,
        //     show: true,
        //   },
      });
      viewer.trackedEntity = entity;
    },
    async addWorldTerrainAsync(viewer) {
      try {
        //设置地形
        //   //使用Cesium World Terrain全球地形
        // const terrainProvider = await Cesium.createWorldTerrainAsync({
        //   requestWaterMask: true,
        //   requestVertexNormals: true,
        // });
        // viewer.terrainProvider = terrainProvider;
        viewer.cesiumWidget.creditContainer.style.display = "none";
        const OsmBuildings = await Cesium.createOsmBuildingsAsync();
        viewer.scene.primitives.add(OsmBuildings)
        var position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000);
        // 前往广州塔
        viewer.camera.flyTo({
          destination: position2,
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-30),
            roll: 0,
          },
        });
        // 创建一个点
        // var point = viewer.entities.add({
        //   position: pointsPosition,
        //   point: {
        //     pixelSize: 20,
        //     color: Cesium.Color.RED,
        //     outlineColor: Cesium.Color.WHITE,
        //     outlineWidth: 4,
        //   },
        // });
        // //添加gltf模型
        createModel("./Cesium_Air.glb", 700.0, viewer);
      } catch (error) {
        console.log(`Failed to add world imagery: ${error}`);
      }
    }
  }
};
</script>

<style>
   @import url("./Pages/widgets.css");
</style>
