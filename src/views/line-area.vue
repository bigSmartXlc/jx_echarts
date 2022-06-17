/* eslint-disable no-undef */
<template>
  <div class="container1">
    <div class="left">
      <div class="typelist">
        <div
          class="selectdata"
          @click="typeopen == 1 ? (typeopen = 0) : (typeopen = 1)"
        >
          {{ formfiled.garbageName }}
        </div>
        <ul v-show="typeopen == 1">
          <li
            v-for="(item, index) in typelist"
            :key="index"
            @click="typeSelect(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="dateselect">
        <vue-datepicker-local
          v-model="cpmpomentDate"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </div>
      <div class="huanjie">
        <div>
          <div
            class="selectdata"
            @click="typeopen == 2 ? (typeopen = 0) : (typeopen = 2)"
          >
            {{ formfiled.vehicleModelListName }}
          </div>
          <ul v-show="typeopen == 2">
            <li
              v-for="item in huanjie"
              :key="item.rowId"
              @click="vehicleSelect(item)"
            >
              {{ item.paramName }}
            </li>
          </ul>
        </div>
      </div>
      <div class="areatree">
        <div
          class="selectdata"
          @click="typeopen == 3 ? (typeopen = 0) : (typeopen = 3)"
        >
          {{ $route.query.areaName }}
        </div>
        <ul v-show="typeopen == 3">
          <li
            v-for="(item, index) in carlist"
            :key="index"
            @click="carSelect(item)"
          >
            {{ item.vehicleName }}
          </li>
        </ul>
      </div>
    </div>
    <div id="chart-box"></div>
    <div v-show="rightshow" class="rightContainer">
      <div class="right">
        <div class="top">
          <div id="timeline"></div>
          <div id="topchart"></div>
        </div>
        <div class="videocontainer" :class="{ active: isactive }">
          <div class="titleContainer" v-show="isactive">
            <div class="videoPoint">
              <span></span><span></span><span></span> <span></span><span></span
              ><span></span>
            </div>
            <div class="videoTitle">{{ formfiled.vehicleName }}车载监控</div>
            <div class="videoOff" @click="isactive = false">关闭</div>
          </div>
          <div class="videoContiner">
            <div style="width: 100%">
              <video
                ref="videoPlayer"
                class="video-js"
                @click="isactive == false ? (isactive = true) : ''"
                muted
              ></video>
            </div>
            <div class="urlList" v-show="isactive">
              <ul>
                <li
                  v-for="(item, index) in urlList"
                  :key="index"
                  @click="toggleUrl(item)"
                  :class="{ urlActive: item == videoUrl }"
                >
                  车载视频{{ index + 1 }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/lib/echarts.js";
import VueDatepickerLocal from "vue-datepicker-local";
import videojs from "video.js";
import "echarts-gl";
require("echarts/extension/bmap/bmap");
import { BMPGL } from "./bmpgl.js";
import yls_json from "./ljpt_xz.json";
export default {
  components: {
    VueDatepickerLocal,
  },
  data() {
    return {
      ak: "eae1ItjXiOnR6CvVFg5iR4WuGfG6d380",
      rightshow: false,
      bmap: null,
      isactive: false,
      cpmpomentDate: "",
      carlist: [],
      videoUrl: "",
      urlList: [],
      player: null,
      typelist: [
        { name: "可回收物", key: 10 },
        { name: "有害垃圾", key: 20 },
        { name: "餐厨垃圾", key: 30 },
        { name: "厨余垃圾", key: 31 },
        { name: "生鲜垃圾", key: 32 },
        { name: "其他垃圾", key: 40 },
        { name: "园林垃圾", key: 60 },
        { name: "大件垃圾", key: 70 },
        { name: "装修垃圾", key: 80 },
      ],
      formfiled: {
        garbageName: "请选择回收类型",
        vehicleModelListName: "请选择回收环节",
        vehicleName: "",
      },
      formfiled1: {
        vehicleModelList: "",
        selectdate: "",
        garbageType: "",
      },
      typeopen: 0,
      huanjie: [],
      echarts,
      data: {},
      mapdata: {},
      table: 1,
      color: [
        "#4d82c1",
        "#c84139",
        "#5ca864",
        "#5ca864",
        "#5ca864",
        "#040404",
        "#da9141",
        "#9ab575",
        "#97885e",
      ],
      chart: null,
      lines_coord: [],
      scatter_coords: [],
      scatter_coord: [],
      selectcity: null,
      centerMap: {},
    };
  },
  watch: {
    cpmpomentDate(val) {
      this.formfiled1.selectdate = this.dateSwitch(val);
    },
    formfiled1: {
      handler(val) {
        //逻辑处理
        this.formfiled.vehicleName = "";
        this.getcarteamTree(val);
      },
      deep: true,
    },
    "formfiled.vehicleName": function (val) {
      if (val) {
        this.rightshow = true;
        this.drawTimeline();
        this.getVideoUrl();
        this.getlineport();
      }
    },
  },
  computed: {},
  created() {
    this.mapdata = {
      type: "FeatureCollection",
      features: [],
    };
    var data = yls_json.features;
    this.mapdata.features = data.filter(
      (item) => item.properties.name === this.$route.query.areaName
    );
    this.centerMap = this.mapdata.features[0].properties;
    var date = new Date();
    this.cpmpomentDate = this.dateSwitch(date);
    this.formfiled1.garbageType = this.$route.query.garbageType;
    this.typelist.forEach((item) => {
      if (item.key == this.$route.query.garbageType) {
        this.formfiled.garbageName = item.name;
      }
    });
  },
  mounted() {
    this.gethuanjie();
    this.initMap();
    //下钻参考https://blog.csdn.net/qq_23447231/article/details/1219287442022-04-12
  },
  methods: {
    // 百度地图
    initMap() {
      // 传入密钥获取地图回调。
      BMPGL(this.ak)
        .then((BMapGL) => {
          this.bmap = new BMapGL.Map("chart-box", {
            enableDblclickZoom: false,
            displayOptions: {
              building: false,
            },
          });
          this.bmap.centerAndZoom(
            new BMapGL.Point(...this.centerMap.center),
            12
          );
          this.bmap.enableScrollWheelZoom(true);
          this.bmap.setTilt(35);
          this.bmap.enableScrollWheelZoom();
          var bd = new BMapGL.Boundary();
          bd.get(this.centerMap.name, (rs) => {
            var count = rs.boundaries.length; //行政区域的点有多少个
            for (var i = 0; i < count; i++) {
              var path = [];
              var str = rs.boundaries[i].replace(" ", "");
              var points = str.split(";");
              for (var j = 0; j < points.length; j++) {
                var lng = points[j].split(",")[0];
                var lat = points[j].split(",")[1];
                path.push(new BMapGL.Point(lng, lat));
              }
              var prism = new BMapGL.Prism(path, 100, {
                topFillColor: "#5679ea",
                topFillOpacity: 0.4,
                sideFillColor: "#5679ea",
                sideFillOpacity: 0.9,
              });
              prism.disableMassClear();
              this.bmap.addOverlay(prism);
            }
          });
          var styleJson2 = [
            {
              featureType: "land",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#091220ff",
              },
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#113549ff",
              },
            },
            {
              featureType: "green",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#0e1b30ff",
              },
            },
            {
              featureType: "building",
              elementType: "geometry",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "building",
              elementType: "geometry.topfill",
              stylers: {
                color: "#113549ff",
              },
            },
            {
              featureType: "building",
              elementType: "geometry.sidefill",
              stylers: {
                color: "#143e56ff",
              },
            },
            {
              featureType: "building",
              elementType: "geometry.stroke",
              stylers: {
                color: "#dadada00",
              },
            },
            {
              featureType: "subwaystation",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#113549B2",
              },
            },
            {
              featureType: "education",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#12223dff",
              },
            },
            {
              featureType: "medical",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#12223dff",
              },
            },
            {
              featureType: "scenicspots",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                color: "#12223dff",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                weight: 4,
              },
            },
            {
              featureType: "highway",
              elementType: "geometry.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#fed66900",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "highway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "highway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "highway",
              elementType: "labels.icon",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                weight: 2,
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#09c7faff",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffeebb00",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "local",
              elementType: "geometry",
              stylers: {
                visibility: "on",
                weight: 1,
              },
            },
            {
              featureType: "local",
              elementType: "geometry.fill",
              stylers: {
                color: "#05d9f5ff",
              },
            },
            {
              featureType: "local",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "local",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "local",
              elementType: "labels.text.fill",
              stylers: {
                color: "#979c9aff",
              },
            },
            {
              featureType: "local",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffffff",
              },
            },
            {
              featureType: "railway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "subway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                weight: 1,
              },
            },
            {
              featureType: "subway",
              elementType: "geometry.fill",
              stylers: {
                color: "#d8d8d8ff",
              },
            },
            {
              featureType: "subway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "subway",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "subway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#979c9aff",
              },
            },
            {
              featureType: "subway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffffff",
              },
            },
            {
              featureType: "continent",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "continent",
              elementType: "labels.icon",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "continent",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "continent",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "city",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "city",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "city",
              elementType: "labels.text.fill",
              stylers: {
                color: "#161818ff",
              },
            },
            {
              featureType: "city",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "town",
              elementType: "labels.icon",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "town",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "town",
              elementType: "labels.text.fill",
              stylers: {
                color: "#454d50ff",
              },
            },
            {
              featureType: "town",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffffff",
              },
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: {
                color: "#01c7fcff",
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "districtlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffffff",
              },
            },
            {
              featureType: "district",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#292e2eff",
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "manmade",
              elementType: "geometry",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "districtlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffffff",
              },
            },
            {
              featureType: "entertainment",
              elementType: "geometry",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "shopping",
              elementType: "geometry",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "nationalway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "nationalway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "nationalway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "nationalway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "nationalway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "6",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "7",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "8",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "9",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "6",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "7",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "8",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "9",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "6",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "7",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "8",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,9",
                level: "9",
              },
            },
            {
              featureType: "subwaylabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "subwaylabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "tertiarywaysign",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "tertiarywaysign",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "provincialwaysign",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "provincialwaysign",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "nationalwaysign",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "nationalwaysign",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "highwaysign",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "highwaysign",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "village",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "district",
              elementType: "labels.text",
              stylers: {
                fontsize: 20,
              },
            },
            {
              featureType: "district",
              elementType: "labels.text.fill",
              stylers: {
                color: "#181b1bff",
              },
            },
            {
              featureType: "district",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "country",
              elementType: "labels.text.fill",
              stylers: {
                color: "#121414ff",
              },
            },
            {
              featureType: "country",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry.fill",
              stylers: {
                color: "#05c5f8ff",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "geometry.fill",
              stylers: {
                color: "#0fcbe9ff",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff10",
              },
            },
            {
              featureType: "provincialway",
              elementType: "geometry.fill",
              stylers: {
                color: "#04e6f6ff",
              },
            },
            {
              featureType: "provincialway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "highway",
              elementType: "labels.text",
              stylers: {
                fontsize: 20,
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels.text",
              stylers: {
                fontsize: 20,
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels.text",
              stylers: {
                fontsize: 20,
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels.text",
              stylers: {
                fontsize: 20,
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "estate",
              elementType: "geometry",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "scenicspotsway",
              elementType: "geometry.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "scenicspotsway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "universityway",
              elementType: "geometry.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "universityway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "vacationway",
              elementType: "geometry.fill",
              stylers: {
                color: "#12223dff",
              },
            },
            {
              featureType: "vacationway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "geometry",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "geometry.fill",
              stylers: {
                color: "#0bc8faff",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "transportationlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "transportationlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "transportationlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "transportationlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "educationlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "educationlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "educationlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#151919ff",
              },
            },
            {
              featureType: "educationlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "transportation",
              elementType: "geometry",
              stylers: {
                color: "#113549ff",
              },
            },
            {
              featureType: "airportlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#111313ff",
              },
            },
            {
              featureType: "airportlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "scenicspotslabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "scenicspotslabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "medicallabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#171919ff",
              },
            },
            {
              featureType: "medicallabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "medicallabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "scenicspotslabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "airportlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "entertainmentlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "entertainmentlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#121313ff",
              },
            },
            {
              featureType: "entertainmentlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "estatelabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "estatelabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "estatelabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "businesstowerlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "businesstowerlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "businesstowerlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "companylabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "companylabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "companylabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "governmentlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "governmentlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "governmentlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "restaurantlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "restaurantlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "restaurantlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "hotellabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "hotellabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "hotellabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "shoppinglabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "shoppinglabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "shoppinglabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "lifeservicelabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "lifeservicelabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "lifeservicelabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "carservicelabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "carservicelabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "carservicelabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "financelabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "financelabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "financelabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "otherlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "otherlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "otherlabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "manmade",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "manmade",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "transportation",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "transportation",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "education",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "education",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "medical",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "medical",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "scenicspots",
              elementType: "labels.text.fill",
              stylers: {
                color: "#2dc4bbff",
              },
            },
            {
              featureType: "scenicspots",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels.text",
              stylers: {
                fontsize: 21,
              },
            },
            {
              featureType: "airportlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "scenicspotslabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "medicallabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "entertainmentlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "estatelabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "businesstowerlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "companylabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "restaurantlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "hotellabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "shoppinglabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "lifeservicelabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "carservicelabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "financelabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "INTERNATIONALIZEICONICON",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
          ];
          this.bmap.setMapStyleV2({ styleJson: styleJson2 });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取时间线节点数据
    getTimelineData() {
      this.$http({
        method: "post",
        url: "api/v1/jky/timeline",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          date: "2022-04-12",
          carNum: "浙FF5129",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取车辆组织树
    getcarteamTree() {
      this.$http({
        method: "post",
        url: "api/v1/jky/pjcar/pjcarTree",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          lnglatTime: "2022-05-19",
          deptId: "400000000",
          vehicleModelList: this.formfiled1.vehicleModelList,
          garbageType: this.formfiled.garbageType,
        },
      })
        .then((res) => {
          this.getTree();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取轨迹点 || "洒-浙FV2129"  || "2022-06-13"
    getlineport() {
      this.$http
        .post(
          `http://o792k95b.xiaomy.net/api/v1/jky/siCarTrack/getPoints2?carNum=${this.formfiled.vehicleName}&date=${this.formfiled1.selectdate}`
          // params
        )
        .then((res) => {
          var data = res.data.result;
          if (data) {
            var path = [];
            data.forEach((item, index) => {
              if (index < data.length - 1) {
                if (
                  item[0] != data[index + 1][0] &&
                  item[1] != data[index + 1][1]
                ) {
                  path.push({ lng: item[0], lat: item[1] });
                }
              }
            });
            this.bmap.clearOverlays();
            var point = [];
            for (var i = 0; i < path.length; i++) {
              var poi = new BMapGL.Point(path[i].lng, path[i].lat);
              point.push(poi);
              // var marker = new BMapGL.Marker(poi); //创建标注
              // this.bmap.addOverlay(marker); //将标注添加到地图中
            }

            var pl = new BMapGL.Polyline(point, {
              strokeColor: "red",
              strokeWeight: 10,
              strokeOpacity: 1,
            });
            var trackAni = new BMapGLLib.TrackAnimation(this.bmap, pl, {
              overallView: true, // 动画完成后自动调整视野到总览
              tilt: 35, // 轨迹播放的角度，默认为55
              duration: 10000, // 动画持续时长，默认为10000，单位ms
              delay: 1000, // 动画开始的延迟，默认0，单位ms
            });
            // this.bmap.addOverlay(pl);
            trackAni.start();
          } else {
            console.log(res);
            alert("暂无轨迹数据");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取汽车实时画面
    getVideoUrl() {
      this.$http({
        method: "get",
        url: `api/v1/jky/getGpsHslUrl/${
          this.formfiled.vehicleName || "洒-浙FV2129"
        }`,
        baseURL: "http://o792k95b.xiaomy.net/",
      })
        .then((res) => {
          if (res.data.result && res.data.result.length > 0) {
            this.videoUrl = res.data.result[0];
            this.urlList = res.data.result;
            setTimeout(() => {
              this.player = videojs(this.$refs.videoPlayer);
              this.player.src(this.videoUrl);
              videojs(this.$refs.videoPlayer).ready(function () {
                this.player = this;
                this.player.play();
              });
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 切换视角
    toggleUrl(item) {
      if (item != this.videoUrl) {
        this.videoUrl = item;
        this.player.src(this.videoUrl);
        this.player.ready(function () {
          this.on("progress", function () {
            console.log("正在请求数据 ");
          });
          this.on("loadedmetadata", function () {
            console.log("获取资源长度完成 ");
          });
          this.on("canplaythrough", function () {
            console.log("视频源数据加载完成");
            this.play();
          });
          this.on("waiting", function () {
            console.log("等待数据");
          });
          this.on("play", function () {
            console.log("视频开始播放");
          });
          this.on("playing", function () {
            console.log("视频播放中");
          });
          this.on("pause", function () {
            console.log("视频暂停播放");
          });
          this.on("ended", function () {
            console.log("视频播放结束");
          });
          this.on("error", function () {
            console.log("加载错误");
          });
          this.on("seeking", function () {
            console.log("视频跳转中");
          });
          this.on("seeked", function () {
            console.log("视频跳转结束");
          });
          this.on("ratechange", function () {
            console.log("播放速率改变");
          });
          this.on("timeupdate", function () {
            console.log("播放时长改变");
          });
          this.on("volumechange", function () {
            console.log("音量改变");
          });
          this.on("stalled", function () {
            console.log("网速异常");
          });
          this.player = this;
          this.player.play();
        });
      }
    },
    //日期转换
    dateSwitch(date) {
      console.log(date);
      if (typeof date === "string") {
        return date;
      }
      var y = date.getFullYear();
      var M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      //    'h+': date.getHours(), // 小时
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      var s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      // 'm+': date.getMinutes(), // 分
      // 's+': date.getSeconds(), // 秒
      return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
    },
    typeSelect(item) {
      this.formfiled.garbageName = item.name;
      this.formfiled1.garbageType = item.key;
      this.typeopen = 0;
    },
    vehicleSelect(item) {
      this.formfiled.vehicleModelListName = item.paramName;
      this.formfiled1.vehicleModelList = item.paramCode;
      this.typeopen = 0;
    },
    carSelect(item) {
      this.formfiled.vehicleName = item.vehicleName;
    },
    // 获取流程环节
    gethuanjie() {
      this.$http({
        method: "get",
        url: "api/v1/jky/searchDisposalLink",
        baseURL: "http://o792k95b.xiaomy.net/",
      })
        .then((res) => {
          this.huanjie = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取车辆
    getTree() {
      let params = new FormData();
      params.append("lnglatTime", this.formfiled1.selectdate || "2022-04-12");
      this.$http({
        method: "post",
        url: "api/v1/jky/pjcar/pjCarTreeVal",
        baseURL: "http://o792k95b.xiaomy.net/",
        headers: {
          "Content-Type": " multipart/form-data",
        },
        data: params,
      })
        .then((res) => {
          if (typeof res.data === "string") {
            var result = eval("(" + res.data + ")").result;
            if (result) {
              this.carlist = [{ vehicleName: "洒-浙FV2129" }];
              Object.values(result).forEach((item) => {
                item.forEach((num) => {
                  if (num.flag != 0) {
                    this.carlist.push(num);
                  }
                });
              });
            }
          } else if (typeof res.data === "object") {
            // this.drawFeixian();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawTimeline() {
      var timeLineChart = echarts.init(document.getElementById("topchart"));
      var timeLinePart = echarts.init(document.getElementById("timeline"));
      const data = [];
      for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
      }
      const option = {
        xAxis: { max: "dataMax" },
        yAxis: {
          type: "category",
          show: false,
        },
        series: [
          {
            realtimeSort: true,
            name: "X",
            type: "bar",
            data: data,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "red", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "blue", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      const lineOption = {
        timeline: {
          top: 80,
          bottom: 80,
          right: 0,
          currentIndex: 2,
          inverse: true,
          axisType: "category",
          orient: "vertical",
          label: {
            position: "left",
            color: "#ffffff",
          },
          emphasis: {
            checkpointStyle: {
              color: "#B03A5B",
            },
          },
          // itemStyle: {
          //   color: "#316BF3",
          // },
          controlStyle: {
            show: false,
          },
          progress: {
            label: {
              color: "#316BF3",
            },
          },
          data: [
            "2002-01-01",
            "2003-01-01",
            "2004-01-01",
            "2005-01-01",
            "2006-01-01",
          ],
        },
      };
      timeLineChart.setOption(option);
      timeLinePart.setOption(lineOption);
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  overflow-y: scroll;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.container1 {
  width: 100%;
  .left {
    z-index: 100;
    width: 200px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.13);
    position: absolute;
    left: 0;
    top: 100px;
    margin: 0 10px;
    padding: 10px;
    height: calc(100% - 150px);
    border-radius: 5px;
    color: aliceblue;
    .selectdata {
      cursor: pointer;
      height: 35px;
      border-radius: 5px;
      line-height: 35px;
      background: linear-gradient(45deg, #14f3c3, #3111e2);
    }
    ul > li {
      cursor: pointer;
      height: 35px;
      border-radius: 5px;
      line-height: 35px;
    }
    .typelist {
      ul > li {
        background: linear-gradient(45deg, #1eedd9, #84ca91);
      }
    }
    .huanjie {
      ul > li {
        background: linear-gradient(45deg, #0875f2, #c2cbf1);
      }
    }
    .areatree {
      ul {
        max-height: 600px;
        overflow: auto;
        li {
          background: linear-gradient(45deg, #27a37a, #84ca91);
        }
      }
    }
  }
  #chart-box {
    display: inline-block;
    position: absolute;
    left: 0px;
    right: 10px;
    top: 95px;
    // width: calc(100% - 10px);
    height: calc(100% - 95px);
    z-index: 0;
  }
  .videoShow {
    width: 100%;
  }
  .topbtn {
    margin-bottom: 5px;
    span {
      cursor: pointer;
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      color: #66bbf9;
    }
  }
  .active.videocontainer {
    position: fixed;
    left: 200px;
    top: 100px;
    z-index: 200;
    width: 70%;
    height: 70% !important;
  }
  .rightContainer {
    // display: none;
    width: 30%;
    position: absolute;
    right: 50px;
    height: calc(100% - 110px);
    .right {
      border-radius: 10px;
      z-index: 10;
      height: 100%;
      overflow: hidden;
      .top {
        position: relative;
        background: #c2cbf1;
        width: 100%;
        height: 50%;
        margin-bottom: 10px;
        #topchart {
          width: 75%;
          height: 400px;
          position: absolute;
          right: 0;
        }
        #timeline {
          width: 25%;
          height: 400px;
          position: absolute;
          left: 0;
        }
      }
      .videocontainer {
        border: #0875f2;
        margin-top: 30px;
        height: 50%;
        .titleContainer {
          background: #455dc7;
          display: flex;
          justify-content: space-between;
          .videoTitle {
            height: 50px;
            min-width: 200px;
            font-weight: 700;
            color: aliceblue;
            line-height: 50px;
            background-image: url("../assets/images/videotitle.svg");
            background-size: cover;
          }
          .videoOff {
            cursor: pointer;
            height: 50px;
            min-width: 150px;
            font-weight: 700;
            color: aliceblue;
            line-height: 50px;
            background-image: url("../assets/images/videoOff.svg");
            background-size: cover;
          }
          .videoPoint {
            height: 50px;
            line-height: 50px;
            display: flex;
            min-width: 100px;
            justify-content: space-around;
            span {
              display: inline-block;
              margin-top: 20px;
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: #0875f2;
            }
          }
        }
        .videoContiner {
          height: calc(100% - 50px);
          display: flex;
          justify-content: space-between;
          .urlList {
            cursor: pointer;
            z-index: 1000;
            width: 250px;
            height: 100%;
            background: #0875f2;
            ul > li {
              height: 30px;
              margin: 10px auto;
              color: #fff;
            }
            li.urlActive {
              background: linear-gradient(90deg, #455dc7, #0875f2);
            }
          }
        }
      }
    }
  }
}
</style>
