<template>
  <div class="container">
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
    <img
      id="bgimg"
      v-show="false"
      src="../assets/images/ebg.jpg"
      alt=""
      srcset=""
    />
    <div class="rightContainer">
      <div class="right">
        <div class="top">
          <div id="timeline"></div>
          <div id="topchart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/lib/echarts.js";
import "echarts-gl";
import yls_json from "./ljpt_xz.json";
export default {
  data() {
    return {
      carlist: [],
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
    this.getTree(this.formfiled.selectdate);
  },
  mounted() {
    // this.drawFeixian();
    // this.gethuanjie();
    // this.drawTimeline();
    this.getVideoUrl();
    //下钻参考https://blog.csdn.net/qq_23447231/article/details/121928744
  },
  methods: {
    //获取汽车实时画面
    getVideoUrl() {
      this.$http({
        method: "get",
        url: "api/v1/jky/pjcamera/getUrlAddress",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: { carName: "浙F73039" },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
    gethuanjie() {
      // 获取流程环节
      this.$http({
        method: "get",
        url: "api/v1/jky/searchDisposalLink",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {},
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
    //轨迹
    getguiji() {
      this.$http({
        method: "post",
        url: "api/v1/jky/siCarTrack/getPoints2",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          date: this.formfiled.selectdate,
          carNum: "400000000",
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
    getTree(val) {
      // 获取车辆
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
            this.drawFeixian(this.color[0]);
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawFeixian() {
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
          left: 200,
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
          left: 200,
          label: {
            show: false,
            distance: 0,
            formatter(param) {
              console.log(param);
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
        series: [],
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.container {
  height: calc(100% - 90px);
  width: 100%;
  .left {
    z-index: 100;
    width: 150px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.13);
    position: absolute;
    left: 0;
    top: 100px;
    margin: 0 10px;
    padding: 10px;
    height: calc(100% - 125px);
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
        max-height: 700px;
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
    height: 100%;
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
    border-radius: 8px;
    border: solid 1px #66bbf9;
  }
  .rightContainer {
    width: 35%;
    position: absolute;
    right: 10px;
    height: calc(100% - 100px);
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
    }
  }
}
</style>
