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
        <span>日期</span><input type="date" name="bday" />
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
      <div class="areatree"></div>
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
      <div class="right"></div>
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
        selectdata: "",
        vehicleModelListName: "请选择回收环节",
        vehicleModelList: "",
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
  watch: {},
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
  },
  mounted() {
    this.drawFeixian();
    this.getTree();
    //下钻参考https://blog.csdn.net/qq_23447231/article/details/121928744
  },
  methods: {
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
    //tree
    getTree() {
      // this.$http({
      //   method: "post",
      //   url: "api/v1/jky/pjcar/pjcarTree",
      //   baseURL: "http://o792k95b.xiaomy.net/",
      //   data: {
      //     deptId: "400000000",
      //     // garbageType: garbageType.toString(),
      //     lnglatTime: "2022-06-12",
      //   },
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.$http({
        method: "get",
        url: "api/v1/jky/searchDisposalLink",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {},
      })
        .then((res) => {
          console.log(res.data.result);
          this.huanjie = res.data.result;
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
      //地市取简称
      // data.features.forEach(v => {
      //     v.properties.name = v.properties.name.indexOf('版纳')>-1 ?v.properties.name.substr(0,4) : v.properties.name.substr(0,2);
      // })
      // const map3Ddata = yls_json.features.map((item) => {
      //   const geoAreaName = item.properties.name; // geo文件中的地理名称
      //   return {
      //     name: geoAreaName,
      //     // value: item.properties.centroid,
      //     itemStyle: {
      //       // color: this.color[index] || "#046357",
      //       color: "#046357",
      //     },
      //   };
      // });
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
    width: 25%;
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
    }
  }
}
</style>
