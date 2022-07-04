/* eslint-disable no-undef */
<template>
  <div class="container1">
    <div class="left">
      <div class="typelist select_container">
        <div
          class="selectdata"
          @click="typeopen == 1 ? (typeopen = 0) : (typeopen = 1)"
        >
          {{ formfiled.garbageName }}
        </div>
        <ul v-show="typeopen == 1" class="select_list">
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
      <div class="huanjie select_container">
        <div>
          <div
            class="selectdata"
            @click="typeopen == 2 ? (typeopen = 0) : (typeopen = 2)"
          >
            {{ formfiled.vehicleModelListName }}
          </div>
          <ul v-show="typeopen == 2" class="select_list">
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
      <div class="areatree select_container">
        <div
          class="selectdata"
          @click="typeopen == 4 ? (typeopen = 0) : (typeopen = 4)"
        >
          {{ formfiled.deptName }}
        </div>
        <ul v-show="typeopen == 4" class="select_list">
          <li
            v-for="(item, index) in area_select_data"
            :key="index"
            @click="toggleArea(item.deptName, item.deptId)"
          >
            {{ item.deptName }}({{ item.carStatussuc }}/{{
              item.carStatustotal
            }})
          </li>
        </ul>
      </div>
      <div class="carlist">
        <div v-show="carlist.length < 1" class="loading">车辆加载中.....</div>
        <ul v-show="typeopen == 0">
          <li
            v-for="(item, index) in carlist"
            :key="index"
            @click="carSelect(item)"
          >
            {{ item.vehicleName }}[{{ item.flag == 0 ? "不在线" : "在线" }}]
          </li>
        </ul>
      </div>
    </div>
    <div id="chart-box"></div>
    <div v-show="rightshow" class="rightContainer">
      <div class="right">
        <div class="top">
          <!-- <div id="timeline"></div> -->
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
                controls
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
import yls_json from "./ljpt_xz.json";
export default {
  components: {
    VueDatepickerLocal,
  },
  data() {
    return {
      tk: "647102ae07da59b5275736577f63c21e",
      ak: "eae1ItjXiOnR6CvVFg5iR4WuGfG6d380",
      timeLineChart: null,
      rightshow: false,
      tMap: null,
      CarTrack: null,
      bmap: null,
      isactive: false,
      cpmpomentDate: "",
      carlist: [],
      videoUrl: "",
      urlList: [],
      player: null,
      area_select_data: [],
      arealist: [
        { name: "南湖", value: "410000000" },
        { name: "秀洲", value: "420000000" },
        { name: "嘉善", value: "430000000" },
        { name: "平湖", value: "460000000" },
        { name: "海盐", value: "440000000" },
        { name: "海宁", value: "450000000" },
        { name: "桐乡", value: "470000000" },
        { name: "经开", value: "480000000" },
        { name: "港区", value: "490000000" },
      ],
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
        carId: "",
        deptName: "",
      },
      formfiled1: {
        vehicleModelList: "",
        selectdate: "",
        garbageType: "",
        deptId: "",
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
      timelineData: null,
    };
  },
  watch: {
    cpmpomentDate(val) {
      this.formfiled1.selectdate = this.dateSwitch(val);
    },
    formfiled1: {
      handler(newval) {
        //逻辑处理
        if (
          newval.deptId &&
          newval.deptId != "" &&
          newval.selectdate &&
          newval.selectdate != ""
        ) {
          this.carlist = [];
          this.formfiled.vehicleName = "";
          this.formfiled.carId = "";
          this.getTree();
          this.getcarteamTree();
        }
      },
      deep: true,
    },
    "formfiled.vehicleName": function (val) {
      if (val) {
        this.rightshow = true;
        this.getlineport();
        if (this.CarTrack) {
          this.CarTrack.stop();
          this.CarTrack.clear();
        }
        if (this.player) {
          this.player.pause();
        }
        setTimeout(() => {
          this.getTimelineData();
          this.getVideoUrl();
        }, 1000);
      }
    },
  },
  created() {
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
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://api.tianditu.gov.cn/api?v=4.0&tk=647102ae07da59b5275736577f63c21e";
    document.body.appendChild(script);
    script.onload = () => {
      //加载完成去执行代码  ie中不能使用
      this.loadJS("http://cdn.bootcss.com/d3/3.5.17/d3.js", () => {
        this.loadJS("D3SvgOverlay.js", () => {
          this.loadJS("CarTrack.js", () => {
            this.tMap = new T.Map("chart-box");
            this.toggleArea(this.$route.query.areaName);
            this.getcarteamTree();
          });
        });
      });
    };
  },
  beforeRouteLeave(to, from, next) {
    this.tMap.clearLayers();
    this.tMap.clearOverLays();
    if (this.CarTrack) {
      this.CarTrack.stop();
      this.CarTrack.clear();
    }
    next();
  },
  methods: {
    toggleArea(areaName, val) {
      this.formfiled.deptName = areaName;
      if (val) {
        this.formfiled1.deptId = val;
      } else {
        this.arealist.forEach((item) => {
          if (areaName.indexOf(item.name) != -1) {
            this.formfiled1.deptId = item.value;
          }
        });
      }
      this.typeopen = 0;
      this.mapdata = {
        type: "FeatureCollection",
        features: [],
      };
      var data = yls_json.features;
      this.mapdata.features = data.filter((item) => {
        return item.properties.name.indexOf(areaName) != -1;
      });
      this.centerMap = this.mapdata.features[0].properties;
      if (this.CarTrack != null) {
        this.CarTrack.clear();
      }
      this.load();
    },
    loadJS(url, success) {
      var domScript = document.createElement("script");
      domScript.src = url;
      success = success || function () {};
      domScript.onload = domScript.onreadystatechange = function () {
        if (
          !this.readyState ||
          "loaded" === this.readyState ||
          "complete" === this.readyState
        ) {
          success();
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
        }
      };
      document.getElementsByTagName("head")[0].appendChild(domScript);
    },
    //天地图
    load() {
      this.tMap.clearLayers();
      this.tMap.clearOverLays();
      this.tMap.centerAndZoom(
        new T.LngLat(this.centerMap.centroid[0], this.centerMap.centroid[1]),
        12
      );
      document.getElementsByClassName(
        "tdt-control-copyright tdt-control"
      )[0].style.display = "none";
      this.tMap.setStyle("indigo");
      var mapBorder = this.mapdata.features[0].geometry.coordinates[0];
      var points = [];
      mapBorder.forEach((item) => {
        points.push(new T.LngLat(item[0], item[1]));
      });
      var polygon = new T.Polygon([points], {
        color: "blue",
        weight: 1.5,
        opacity: 1,
        fillColor: "#E2E1F4",
        lineStyle: "dashed",
        fillOpacity: 0.3,
      });
      //向地图上添加面
      this.tMap.addOverLay(polygon);
      //画轨迹
    },
    // 获取时间线节点数据
    getTimelineData() {
      this.timeLineChart = echarts.init(document.getElementById("topchart"));
      this.timeLineChart.showLoading();
      this.$http({
        method: "post",
        url: "api/v1/jky/timeline",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          date: this.formfiled1.selectdate,
          carId: this.formfiled.carId.toString(),
        },
      })
        .then((res) => {
          if (res.data.result) {
            this.timelineData = res.data.result;
            this.drawTimeline();
          } else {
            this.timeLineChart.hideLoading();
          }
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
          lnglatTime: this.formfiled1.selectdate,
          deptId: this.formfiled1.deptId,
          vehicleModelList: this.formfiled1.vehicleModelList,
          garbageType: this.formfiled1.garbageType,
        },
      })
        .then((res) => {
          if (typeof res.data === "string") {
            var result = eval("(" + res.data + ")").result;
            if (result) {
              this.area_select_data = [];
              Object.keys(result).forEach((key) => {
                this.arealist.forEach((n) => {
                  if (key == n.value) {
                    this.area_select_data.push({
                      deptName: n.name,
                      deptId: key,
                      carStatussuc: result[key].carStatussuc,
                      carStatustotal: result[key].carStatustotal,
                    });
                  }
                });
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取轨迹点 || "洒-浙FV2129"  || "2022-06-13"
    getlineport() {
      if (this.CarTrack != null) {
        this.CarTrack.clear();
      }
      this.$http
        .post(
          `http://o792k95b.xiaomy.net/api/v1/jky/siCarTrack/getPoints2?carNum=${this.formfiled.vehicleName}&date=${this.formfiled1.selectdate}`
          // params
        )
        .then((res) => {
          var guiji_data = res.data.result;
          if (guiji_data) {
            var path = [];
            guiji_data.forEach((item, index) => {
              if (index < guiji_data.length - 1) {
                if (
                  item[0] != guiji_data[index + 1][0] ||
                  item[1] != guiji_data[index + 1][1]
                ) {
                  path.push({ lng: item[0], lat: item[1] });
                }
              }
            });
            var point = [];
            for (var i = 0; i < path.length; i++) {
              var poi = new T.LngLat(path[i].lng, path[i].lat);
              point.push(poi);
            }
            this.CarTrack = new T.CarTrack(this.tMap, {
              interval: 20,
              speed: 10,
              dynamicLine: true,
              polylinestyle: { color: "#49d68f", weight: 5, opacity: 1 },
              Datas: point,
              carstyle: {
                iconUrl: "car.png",
                width: 52,
                height: 26,
              },
            });
            this.CarTrack.start();
          } else {
            console.log("暂无轨迹数据");
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
        url: `api/v1/jky/getGpsHslUrl/${this.formfiled.vehicleName}`,
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
      // return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
      return y + "-" + M + "-" + d;
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
      this.formfiled.carId = item.rowId;
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
      params.append("lnglatTime", this.formfiled1.selectdate);
      params.append("deptId", this.formfiled1.deptId);
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
              Object.values(result).forEach((item) => {
                item.forEach((num) => {
                  this.carlist.push(num);
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
      const data = Object.keys(this.timelineData);
      const data1 = [];
      data.forEach((item) => {
        data1.push(this.timelineData[item].sum);
      });
      this.timelineData;
      const option = {
        xAxis: { max: "dataMax", show: false },
        yAxis: {
          type: "category",
          show: true,
          data: data.reverse(),
          axisLabel: {
            color: "#66c9fb",
          },
        },
        grid: {
          left: 70,
          bottom: 30,
          right: 50,
        },
        series: [
          {
            // realtimeSort: true,
            name: "X",
            type: "bar",
            data: data1.reverse(),
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
                    color: "#1dbede", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#5164c4", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      // const lineOption = {
      //   timeline: {
      //     top: 80,
      //     bottom: 80,
      //     right: 0,
      //     currentIndex: 2,
      //     inverse: true,
      //     axisType: "category",
      //     orient: "vertical",
      //     label: {
      //       position: "left",
      //       formatter: (val) => {
      //         return `{textStyle|${
      //           val.split("/")[0] + "\n" + val.split("/")[1]
      //         }}`;
      //       },
      //       rich: {
      //         textStyle: {
      //           // 让年度信息更醒目
      //           color: "#ffffff",
      //           fontWeight: "bold",
      //         },
      //       },
      //     },
      //     emphasis: {
      //       checkpointStyle: {
      //         color: "#B03A5B",
      //       },
      //     },
      //     controlStyle: {
      //       show: false,
      //     },
      //     progress: {
      //       label: {
      //         color: "#316BF3",
      //       },
      //     },
      //     data: data1,
      //   },
      // };
      this.timeLineChart.clear();
      this.timeLineChart.hideLoading();
      this.timeLineChart.setOption(option);
      // timeLinePart.setOption(lineOption);
    },
  },
};
</script>

<style lang="scss" scoped>
#mapDiv {
  width: 100%;
  height: 400px;
}
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
    width: 300px;
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
      position: relative;
    }
    .select_container {
      position: relative;
      margin: 5px 0;
      .select_list {
        position: absolute;
        top: 35px;
        z-index: 50;
        width: 100%;
        li {
          width: 100%;
          background: linear-gradient(45deg, #0875f2, #c2cbf1);
        }
      }
    }
    .dateselect {
      width: 100%;
    }
    ul > li {
      cursor: pointer;
      height: 35px;
      border-radius: 5px;
      line-height: 35px;
    }
    .carlist {
      overflow: auto;
      height: calc(100% - 160px);
      position: relative;
      .loading {
        position: absolute;
        background: rgba(255, 255, 255, 0.8);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      ul {
        li {
          font-size: 14px;
          background: linear-gradient(45deg, #2ba327, #607964);
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
    width: calc(100% - 10px);
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
        width: 100%;
        height: 50%;
        margin-bottom: 10px;
        #topchart {
          width: 100%;
          height: 400px;
          position: absolute;
          right: 0;
        }
        #timeline {
          width: 30%;
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
            padding: 0 15px;
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
