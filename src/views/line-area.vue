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
        <vue-datepicker-local v-model="cpmpomentDate" />
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
    <div class="rightContainer">
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
              var prism = new BMapGL.Prism(path, 1000, {
                topFillColor: "#5679ea",
                topFillOpacity: 0.5,
                sideFillColor: "#5679ea",
                sideFillOpacity: 0.9,
              });
              prism.disableMassClear();
              this.bmap.addOverlay(prism);
            }
          });
          var styleJson = [
            {
              featureType: "land",
              elementType: "geometry",
              stylers: {
                color: "#242f3eff",
              },
            },
            {
              featureType: "manmade",
              elementType: "geometry",
              stylers: {
                color: "#242f3eff",
              },
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: {
                color: "#17263cff",
              },
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: {
                color: "#9e7d60ff",
              },
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: {
                color: "#554631ff",
              },
            },
            {
              featureType: "districtlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d69563ff",
              },
            },
            {
              featureType: "districtlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#17263cff",
                weight: 3,
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d69563ff",
              },
            },
            {
              featureType: "poilabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#17263cff",
                weight: 3,
              },
            },
            {
              featureType: "subway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
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
              featureType: "poilabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
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
              featureType: "nationalwaysign",
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
              featureType: "highwaysign",
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
              featureType: "green",
              elementType: "geometry",
              stylers: {
                color: "#263b3eff",
              },
            },
            {
              featureType: "nationalwaysign",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d0021bff",
              },
            },
            {
              featureType: "nationalwaysign",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#ffffffff",
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
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "city",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d69563ff",
              },
            },
            {
              featureType: "city",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#17263cff",
              },
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d69563ff",
              },
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#242f3eff",
              },
            },
            {
              featureType: "local",
              elementType: "geometry.fill",
              stylers: {
                color: "#38414eff",
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
              featureType: "fourlevelway",
              elementType: "geometry.fill",
              stylers: {
                color: "#38414eff",
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
              featureType: "tertiaryway",
              elementType: "geometry.fill",
              stylers: {
                color: "#38414eff",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#ffffff00",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "highway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry.fill",
              stylers: {
                color: "#9e7d60ff",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#554631ff",
              },
            },
            {
              featureType: "provincialway",
              elementType: "geometry.fill",
              stylers: {
                color: "#9e7d60ff",
              },
            },
            {
              featureType: "provincialway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#554631ff",
              },
            },
            {
              featureType: "tertiaryway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "fourlevelway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "highway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "nationalway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry.fill",
              stylers: {
                color: "#9e7d60ff",
              },
            },
            {
              featureType: "nationalway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#554631ff",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry.fill",
              stylers: {
                color: "#9e7d60ff",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#554631ff",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#9e7d60ff",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.stroke",
              stylers: {
                color: "#554631fa",
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
              featureType: "medicallabel",
              elementType: "labels.icon",
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
              featureType: "entertainmentlabel",
              elementType: "labels.icon",
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
              featureType: "estatelabel",
              elementType: "labels.icon",
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
              featureType: "businesstowerlabel",
              elementType: "labels.icon",
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
              featureType: "companylabel",
              elementType: "labels.icon",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "governmentlabel",
              elementType: "labels",
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
              featureType: "restaurantlabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
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
              elementType: "labels",
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
              featureType: "shoppinglabel",
              elementType: "labels",
              stylers: {
                visibility: "off",
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
              elementType: "labels",
              stylers: {
                visibility: "off",
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
              elementType: "labels",
              stylers: {
                visibility: "off",
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
              elementType: "labels",
              stylers: {
                visibility: "off",
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
              elementType: "labels",
              stylers: {
                visibility: "off",
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
              featureType: "airportlabel",
              elementType: "labels",
              stylers: {
                visibility: "on",
              },
            },
            {
              featureType: "airportlabel",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d69563ff",
              },
            },
            {
              featureType: "airportlabel",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#17263cff",
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
              featureType: "highway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "highway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "highway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "highway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "highway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "highway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "highway",
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
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "provincialway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "8,9",
                level: "8",
              },
            },
            {
              featureType: "provincialway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "8,9",
                level: "9",
              },
            },
            {
              featureType: "provincialway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "8,9",
                level: "8",
              },
            },
            {
              featureType: "provincialway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "8,9",
                level: "9",
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "8,9",
                level: "8",
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "8,9",
                level: "9",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "cityhighway",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "6",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "7",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "8",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "9",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "6,10",
                level: "10",
              },
            },
            {
              featureType: "arterial",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "9,10",
                level: "9",
              },
            },
            {
              featureType: "arterial",
              stylers: {
                curZoomRegionId: "0",
                curZoomRegion: "9,10",
                level: "10",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "9,10",
                level: "9",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "9,10",
                level: "10",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "9,10",
                level: "9",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "off",
                curZoomRegionId: "0",
                curZoomRegion: "9,10",
                level: "10",
              },
            },
            {
              featureType: "building",
              elementType: "geometry.topfill",
              stylers: {
                color: "#2a3341ff",
              },
            },
            {
              featureType: "building",
              elementType: "geometry.sidefill",
              stylers: {
                color: "#313b4cff",
              },
            },
            {
              featureType: "building",
              elementType: "geometry.stroke",
              stylers: {
                color: "#1a212eff",
              },
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels.text.fill",
              stylers: {
                color: "#759879ff",
              },
            },
            {
              featureType: "provincialway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "cityhighway",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#1a2e1cff",
              },
            },
            {
              featureType: "local",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "manmade",
              elementType: "labels.text.fill",
              stylers: {
                color: "#d69563ff",
              },
            },
            {
              featureType: "manmade",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#17263cff",
              },
            },
            {
              featureType: "subwaystation",
              elementType: "geometry",
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
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "estate",
              elementType: "geometry",
              stylers: {
                color: "#2a3341ff",
              },
            },
          ];
          this.bmap.setMapStyleV2({ styleJson: styleJson });
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
              var marker = new BMapGL.Marker(poi); //创建标注
              this.bmap.addOverlay(marker); //将标注添加到地图中
            }

            var pl = new BMapGL.Polyline(point, {
              strokeColor: "#04f197",
              strokeWeight: 10,
              strokeOpacity: 1,
              geodesic: true,
            });
            // var trackAni = new BMapGLLib.TrackAnimation(this.bmap, pl, {
            //   overallView: true, // 动画完成后自动调整视野到总览
            //   tilt: 35, // 轨迹播放的角度，默认为55
            //   duration: 5000, // 动画持续时长，默认为10000，单位ms
            //   delay: 3000, // 动画开始的延迟，默认0，单位ms
            // });
            this.bmap.addOverlay(pl);
            // trackAni.start();
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
      if (typeof date === "string") {
        return date;
      }
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
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
    right: 620px;
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
