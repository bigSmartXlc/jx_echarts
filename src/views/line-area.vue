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
        <span>日期</span
        ><input type="date" placeholder="" v-model="formfiled.selectdate" />
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
          {{ $route.params.areaName }}
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
            <div class="videoTitle">{{ carName }}车载监控</div>
            <div class="videoOff" @click="isactive = false">关闭</div>
          </div>
          <div class="videoContiner">
            <div style="width: 100%">
              <video
                id="videoPlayer"
                ref="videoPlayer"
                class="video-js"
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
import videojs from "video.js";
import "echarts-gl";
import yls_json from "./ljpt_xz.json";
export default {
  data() {
    return {
      videoOptions: {
        controls: true, // 是否显示控制条
        preload: "auto",
        sources: [
          {
            src: "xxx",
            type: "application/x-mpegURL",
          },
        ],
      },
      isactive: true,
      carlist: [],
      carName: "收集-浙F10BY2",
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
        garbageType: "",
        selectdate: "",
        vehicleModelListName: "请选择回收环节",
        vehicleModelList: "",
        vehicleName: "",
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
    };
  },
  watch: {
    "formfiled.selectdate": function (val) {
      this.getTree(val);
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
      (item) => item.properties.name === this.$route.params.areaName
    );
    var date = new Date();
    this.formfiled.selectdate = this.dateSwitch(date);
    // this.getTree("2022-06-14");
  },
  mounted() {
    // this.drawFeixian();
    // this.gethuanjie();
    // this.drawTimeline();
    this.getVideoUrl();
    // this.getlineport();
    // this.getTimelineData();
    //下钻参考https://blog.csdn.net/qq_23447231/article/details/1219287442022-04-12
  },
  methods: {
    // 获取轨迹点
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
    // 获取轨迹点
    getlineport() {
      // let params = new FormData();
      // params.append("carName", "浙FF5129");
      // params.append("date", "2022-4-12");
      this.$http
        .post(
          "http://o792k95b.xiaomy.net/api/v1/jky/siCarTrack/getPoints2?carNum=浙FF5129&date=2022-04-12"
          // params
        )
        .then((res) => {
          // var data = res.data.result;
          var data = [
            ["121.2522100", "30.7005377", "2022-04-12 00:01:03"],
            ["121.2522100", "30.7005377", "2022-04-12 00:10:03"],
            ["121.2522100", "30.7005377", "2022-04-12 00:20:03"],
            ["121.2522100", "30.7005377", "2022-04-12 00:30:03"],
            ["121.2522100", "30.7005377", "2022-04-12 00:40:03"],
            ["121.2522100", "30.7005377", "2022-04-12 00:50:03"],
            ["121.2522100", "30.7005377", "2022-04-12 01:00:03"],
            ["121.2522100", "30.7005377", "2022-04-12 01:10:03"],
            ["121.2522100", "30.7005377", "2022-04-12 01:20:03"],
            ["121.2522100", "30.7005377", "2022-04-12 01:30:03"],
            ["121.2522100", "30.7005377", "2022-04-12 01:40:03"],
            ["121.2522100", "30.7005377", "2022-04-12 01:50:03"],
            ["121.2522100", "30.7005377", "2022-04-12 02:00:04"],
            ["121.2522100", "30.7005377", "2022-04-12 02:10:04"],
            ["121.2522100", "30.7005377", "2022-04-12 02:20:05"],
            ["121.2522100", "30.7005377", "2022-04-12 02:30:05"],
            ["121.2522100", "30.7005377", "2022-04-12 02:40:05"],
            ["121.2522100", "30.7005377", "2022-04-12 02:50:05"],
            ["121.2522100", "30.7005377", "2022-04-12 03:00:05"],
            ["121.2522100", "30.7005377", "2022-04-12 03:10:05"],
            ["121.2522100", "30.7005377", "2022-04-12 03:20:05"],
            ["121.2522100", "30.7005377", "2022-04-12 03:30:05"],
            ["121.2522100", "30.7005377", "2022-04-12 03:40:35"],
            ["121.2522100", "30.7005377", "2022-04-12 03:50:05"],
            ["121.2522100", "30.7005377", "2022-04-12 04:00:05"],
            ["121.2522100", "30.7005377", "2022-04-12 04:10:05"],
            ["121.2522100", "30.7005377", "2022-04-12 04:20:05"],
            ["121.2522100", "30.7005377", "2022-04-12 04:30:05"],
            ["121.2522100", "30.7005377", "2022-04-12 04:40:05"],
            ["121.2522100", "30.7005377", "2022-04-12 04:50:05"],
            ["121.2522100", "30.7005377", "2022-04-12 05:00:05"],
            ["121.2522100", "30.7005377", "2022-04-12 05:10:05"],
            ["121.2522100", "30.7005377", "2022-04-12 05:20:05"],
            ["121.2522100", "30.7005377", "2022-04-12 05:30:05"],
            ["121.2522100", "30.7005377", "2022-04-12 05:40:05"],
            ["121.2522100", "30.7005377", "2022-04-12 05:50:06"],
            ["121.2522100", "30.7005377", "2022-04-12 06:00:06"],
            ["121.2522100", "30.7005377", "2022-04-12 06:10:36"],
            ["121.2522100", "30.7005377", "2022-04-12 06:20:06"],
            ["121.2522100", "30.7005377", "2022-04-12 06:30:06"],
            ["121.2522100", "30.7005377", "2022-04-12 06:40:06"],
            ["121.2522100", "30.7005377", "2022-04-12 06:50:06"],
            ["121.2522100", "30.7005377", "2022-04-12 07:00:06"],
            ["121.2522100", "30.7005377", "2022-04-12 07:10:06"],
            ["121.2522100", "30.7005377", "2022-04-12 07:20:07"],
            ["121.2522100", "30.7005377", "2022-04-12 07:30:07"],
            ["121.2522100", "30.7005377", "2022-04-12 07:40:07"],
            ["121.2522100", "30.7005377", "2022-04-12 07:50:07"],
            ["121.2522100", "30.7005377", "2022-04-12 08:00:07"],
            ["121.2522100", "30.7005377", "2022-04-12 08:10:07"],
            ["121.2522100", "30.7005377", "2022-04-12 08:20:07"],
            ["121.2522100", "30.7005377", "2022-04-12 08:30:07"],
            ["121.2522100", "30.7005377", "2022-04-12 08:40:07"],
            ["121.2522101", "30.7005377", "2022-04-12 08:50:07"],
          ];
          var linedata = [];
          data.forEach((item, index) => {
            if (index < data.length - 2) {
              linedata.push({
                coords: [
                  [item[0], item[1]],
                  [
                    data[index + 1][0] || item[0],
                    data[index + 1][1] || item[1],
                  ],
                ],
              });
            }
          });
          console.log(linedata);
          this.drawFeixian(linedata);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取汽车实时画面
    getVideoUrl() {
      this.$http({
        method: "get",
        url: `api/v1/jky/getGpsHslUrl/${this.carName}`,
        baseURL: "http://o792k95b.xiaomy.net/",
        // params: { carName: "浙FF5129", rowId: "92971" },
      })
        .then((res) => {
          if (res.data.result && res.data.result.length > 0) {
            this.videoUrl = res.data.result[0];
            this.urlList = res.data.result;
            this.player = videojs(
              this.$refs.videoPlayer,
              {
                controls: true, // 是否显示控制条
                preload: "auto",
                sources: [
                  {
                    src: this.videoUrl,
                    type: "application/x-mpegURL",
                  },
                ],
              },
              function onPlayerReady() {
                this.on("loadstart", function () {
                  console.log("开始请求数据 ");
                });
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
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$http({
      //   method: "get",
      //   url: `api/v1/jky/pjcamera/getUrlAddress`,
      //   baseURL: "http://o792k95b.xiaomy.net/",
      //   params: { carName: "浙FF5129", rowId: "92971" },
      // })
      //   .then((res) => {
      //     if (res.data.result && res.data.result.length > 0) {
      //       this.videoUrl = res.data.result;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    // 切换视角
    toggleUrl(item) {
      if (item != this.videoUrl) {
        this.videoUrl = item;
        // this.player.src({ src: this.videoUrl, type: "application/x-mpegURL" });
        this.player.load({ src: this.videoUrl, type: "application/x-mpegURL" });
        // setTimeout(() => {
        //   this.player.play();
        // }, 1000);
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
      this.formfiled.garbageType = item.key;
      this.typeopen = 0;
    },
    vehicleSelect(item) {
      this.formfiled.vehicleModelListName = item.paramName;
      this.formfiled.vehicleModelList = item.paramCode;
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
    //待定
    getgjtree() {
      this.$http({
        method: "post",
        url: "api/v1/jky/pjcar/pjcarTree",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          lnglatTime: "2022-05-19",
          deptId: "400000000",
          // vehicleModelList: "",
          // garbageType: "",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取车辆
    getTree(val) {
      let params = new FormData();
      params.append("lnglatTime", val);
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
                  if (num.flag != 0) {
                    this.carlist.push(num);
                  }
                });
              });
            }
          } else if (typeof res.data === "object") {
            this.drawFeixian();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawFeixian(linedata = []) {
      let data = this.mapdata;
      echarts.registerMap("yls", data);
      if (this.chart != null && this.chart != "" && this.chart != undefined) {
        this.chart.dispose(); //销毁
      }
      this.chart = echarts.init(document.getElementById("chart-box"));
      this.chart.showLoading();
      const option = {
        title: {
          text: `当前位置-${this.$route.params.areaName}`,
          left: 220,
          top: 160,
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: "yls",
          show: true,
          regionHeight: 0.1,
          zoom: 1,
          top: 190,
          left: 300,
          label: {
            show: false,
            distance: 0,
            formatter(param) {
              const city = param.name;
              return `{sty1|${city}}`;
            },
            rich: {
              sty1: {
                color: "#ffffff",
                align: "center",
              },
            },
            textStyle: {
              fontSize: 12,
              color: "#f51c0b",
            },
          },
          itemStyle: {
            color: "rgba(107,91,237,.7)",
            opacity: 1,
            borderWidth: 1.5,
            // borderColor: "#0b7ef5",
          },
          emphasis: {
            label: {
              show: false,
              formatter: (params) => {
                this.selectcity = params.name;
                return `{sty1|${params.name}}`;
              },
              rich: {
                sty1: {
                  color: "#ffffff",
                  align: "center",
                },
              },
            },
            itemStyle: {
              color: "#0c66a5",
              opacity: 1,
              borderWidth: 1.5,
              borderColor: "#ffffff",
            },
          },
          viewControl: {
            distance: 110,
            zoomSensitivity: 0,
            panSensitivity: 0,
            // rotateSensitivity: 0,
          },
        },
        series: [
          {
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 15,
            effect: {
              show: false,
              constantSpeed: 80,
              symbol: "pin",
              symbolSize: 10,
              trailLength: 0,
            },
            lineStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#58B3CC",
                    },
                    {
                      offset: 1,
                      color: "#F58158",
                    },
                  ],
                  false
                ),
                width: 2,
                opacity: 0.4,
                curveness: 0,
              },
            },
            // label: {
            //   show: true,
            //   position: "middle",
            //   formatter: (params) => {
            //     console.log(params);
            //     return params.data.coords[0];
            //   },
            // },
            emphasis: {
              lineStyle: {
                disabled: false,
                color: "#cb7f26",
              },
            },
            data: linedata,
          },
        ],
      };
      this.chart.hideLoading();
      this.chart.setOption(option);
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
    right: 80px;
    top: -60px;
    width: calc(100% - 100px);
    height: 99%;
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
  .active {
    position: fixed;
    left: 200px;
    top: 200px;
    z-index: 200;
    width: 70%;
    height: 70%;
  }
  .rightContainer {
    // display: none;
    width: 35%;
    position: absolute;
    right: 50px;
    height: calc(100% - 150px);
    .right {
      border: solid 1px rgb(11, 100, 233);
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      z-index: 10;
      height: 100%;
      overflow: hidden;
      .top {
        position: relative;
        width: 100%;
        height: 50%;
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
