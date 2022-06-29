<template>
  <div class="home">
    <div class="content">
      <div class="left">
        <div class="left_top">
          <div class="enlargeTitle title_style">规划引领</div>
          <div id="review_box">
            <VueSeamlessScroll
              :data="lefttopdata"
              :class-option="seamlessScrollOption"
              style="
                height: 100%;
                overflow: hidden;
                color: white;
                font-size: 18px;
                text-align: center;
              "
            >
              <ul class="tbody">
                <li
                  v-for="(item, index) in lefttopdata"
                  :key="index"
                  :class="{ li_bg: index % 2 == 0, li_bg1: index % 2 == 1 }"
                  @click="yjitemClick(item)"
                >
                  <span style="margin-right: 30px">{{ item.area }}</span
                  >{{ item.name }}
                </li>
              </ul>
            </VueSeamlessScroll>
          </div>
        </div>
        <div class="left_bottom">
          <div class="enlargeTitle title_style">项目建设</div>
          <div class="map_border">
            <ul class="thead">
              <span style="width: 50px">序号</span>
              <span style="width: 100px">区县</span>
              <span style="width: 100px">项目数</span>
              <span style="width: 150px">完成进度</span>
            </ul>
            <div class="box" id="table_box">
              <VueSeamlessScroll
                :data="leftBottom"
                :class-option="seamlessScrollOption"
                style="
                  height: 100%;
                  overflow: hidden;
                  color: white;
                  font-size: 18px;
                  text-align: center;
                "
              >
                <ul>
                  <li v-for="(item, index) in leftBottom" :key="index">
                    <span style="width: 50px">{{ item.index }}</span>
                    <span style="width: 100px">{{ item.position }}</span>
                    <span style="width: 100px">{{ item.num }}</span>
                    <span style="width: 150px">
                      <span
                        :class="{
                          spanP1: item.jingdu < 0.5,
                          spanP2: item.jingdu >= 0.5 && item.jingdu < 0.8,
                          spanP3: item.jingdu >= 0.8,
                        }"
                        class="spanP"
                        :style="{
                          backgroundSize: item.jingdu * 100 + '%' + ' 15px',
                        }"
                      >
                      </span>
                      <span class="spanS1">{{ item.jingdu * 100 }}%</span>
                    </span>
                  </li>
                </ul>
              </VueSeamlessScroll>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="chart-wrapper" id="chart-city"></div>
      </div>
      <div class="right">
        <div class="enlargeTitle title_style right_title">基础资源</div>
        <div class="tab-class map_border">
          <!-- 菜单 -->
          <div class="tab-menu">
            <div
              :class="{ menu_active: tabContent == 0 }"
              class="tab-menu-span"
              @click="tabContentToggle(0)"
            >
              投放
            </div>
            <div
              :class="{ menu_active: tabContent == 1 }"
              class="tab-menu-span"
              @click="tabContentToggle(1)"
            >
              收集
            </div>
            <div
              :class="{ menu_active: tabContent == 2 }"
              class="tab-menu-span"
              @click="tabContentToggle(2)"
            >
              运输
            </div>
            <div
              :class="{ menu_active: tabContent == 3 }"
              class="tab-menu-span"
              @click="tabContentToggle(3)"
            >
              处置
            </div>
          </div>
          <div class="core-dynamic-content-container">
            <div class="scroll-wrapper" ref="scroll">
              <div class="scroll-content" v-if="tabContent === 0">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  :class="{ active_right_item: active_right_item == index }"
                  v-for="(item, index) in dataList1"
                  :key="index"
                >
                  <span class="name">
                    <img src="../assets/images/u608.svg" alt="" srcset="" />
                    {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
              <div class="scroll-content" v-if="tabContent === 1">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  v-for="(item, index) in dataList2"
                  :key="index"
                >
                  <span class="name">
                    <img src="../assets/images/u608.svg" alt="" srcset="" />
                    {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
              <div class="scroll-content" v-if="tabContent === 2">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  v-for="(item, index) in dataList3"
                  :key="index"
                >
                  <span class="name">
                    <img src="../assets/images/u608.svg" alt="" srcset="" />
                    {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
              <div class="scroll-content" v-if="tabContent === 3">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  v-for="(item, index) in dataList4"
                  :key="index"
                >
                  <span class="name">
                    <img src="../assets/images/u608.svg" alt="" srcset="" />
                    {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="solutionShow" class="solution">
      <div class="titleContainer">
        <div class="videoPoint">
          <span></span><span></span><span></span> <span></span><span></span
          ><span></span>
        </div>
        <div class="videoTitle">{{ solution_title }}</div>
        <div>
          <img src="../assets/images/yjt.svg" alt="" srcset="" />
          <img src="../assets/images/yjt.svg" alt="" srcset="" />
          <img src="../assets/images/yjt.svg" alt="" srcset="" />
        </div>
      </div>
      <div class="solutionContent">
        <p>{{ solution }}</p>
      </div>
      <div class="videoOff" @click="solutionShow = false">关闭</div>
    </div>
  </div>
</template>

<script>
import VueSeamlessScroll from "vue-seamless-scroll";
import yls_json from "./ljpt_xz.json";
import BScroll from "@better-scroll/core";
export default {
  components: {
    VueSeamlessScroll,
  },
  name: "HomeView",
  computed: {
    seamlessScrollOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  data() {
    return {
      dataList1: [
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
        { name: "投放点位", num: 5624 },
      ],
      dataList2: [
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
        { name: "收集车辆", num: 5624 },
      ],
      dataList3: [
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
        { name: "转运车辆", num: 5624 },
      ],
      dataList4: [
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
        { name: "焚烧处置场", num: 5624 },
      ],
      solutionShow: false,
      solution: null,
      solution_title: null,
      tMap: null,
      mapdata: [],
      centerMap: [],
      myChart: null,
      tabContent: 0,
      color: ["#fecb9a", "#fefdce", "#fefa7d", "#cdccfb", "#cdf99d", "#fdcdcc"],
      lefttopdata: [
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
        {
          name: "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
          area: "嘉兴市",
          solution:
            "嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排嘉兴市住房和城乡建设局关于2025年垃圾分类规划安排",
        },
      ],
      leftBottom: [
        { index: 1, position: "桐乡市", num: 5, jingdu: 0.1 },
        { index: 2, position: "桐乡市", num: 5, jingdu: 0.2 },
        { index: 3, position: "桐乡市", num: 5, jingdu: 0.3 },
        { index: 4, position: "桐乡市", num: 5, jingdu: 0.4 },
        { index: 5, position: "桐乡市", num: 5, jingdu: 0.5 },
        { index: 6, position: "桐乡市", num: 5, jingdu: 0.6 },
        { index: 7, position: "桐乡市", num: 5, jingdu: 0.7 },
        { index: 8, position: "桐乡市", num: 5, jingdu: 0.8 },
        { index: 9, position: "桐乡市", num: 5, jingdu: 0.99 },
        { index: 10, position: "桐乡市", num: 5, jingdu: 0.1 },
        { index: 11, position: "桐乡市", num: 5, jingdu: 0.2 },
        { index: 12, position: "桐乡市", num: 5, jingdu: 0.3 },
        { index: 13, position: "桐乡市", num: 5, jingdu: 0.4 },
        { index: 14, position: "桐乡市", num: 5, jingdu: 0.5 },
        { index: 15, position: "桐乡市", num: 5, jingdu: 0.6 },
        { index: 16, position: "桐乡市", num: 5, jingdu: 0.7 },
        { index: 17, position: "桐乡市", num: 5, jingdu: 0.8 },
        { index: 18, position: "桐乡市", num: 5, jingdu: 0.99 },
      ],
      active_right_item: "",
    };
  },
  mounted() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://api.tianditu.gov.cn/api?v=4.0&tk=647102ae07da59b5275736577f63c21e";
    document.body.appendChild(script);
    script.onload = () => {
      //加载完成去执行代码  ie中不能使用
      this.loadJS("http://cdn.bootcss.com/d3/3.5.17/d3.js", () => {
        this.loadJS(
          "http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/D3SvgOverlay.js",
          () => {
            this.loadJS(
              "http://lbs.tianditu.gov.cn/api/js4.0/opensource/openlibrary/D3SvgOverlay.js",
              () => {
                console.log("天地图准备完毕");
                this.tMap = new T.Map("chart-city");
                this.toggleArea(this.$route.query.areaName);
                setTimeout(() => {
                  this.$nextTick(() => {
                    this.init();
                  });
                }, 1000);
              }
            );
          }
        );
      });
    };
  },
  methods: {
    right_item_click(index, item) {
      this.active_right_item = index;
      console.log(item);
    },
    tabContentToggle(val) {
      this.tabContent = val;
      setTimeout(() => {
        this.bs.refresh();
      }, 2000);
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, { click: true });
      this.bs.on("scrollStart", () => {
        console.log("scrollStart-");
      });
      this.bs.on("scrollEnd", (pos) => {
        console.log(pos);
      });
    },
    yjitemClick(item) {
      this.solution = item.solution;
      this.solution_title = item.name;
      this.solutionShow = true;
    },
    toggleArea(areaName) {
      this.mapdata = {
        type: "FeatureCollection",
        features: [],
      };
      var data = yls_json.features;
      this.mapdata.features = data.filter((item) => {
        return item.properties.name.indexOf(areaName) != -1;
      });
      this.centerMap = this.mapdata.features[0].properties;
      this.load();
    },
    //天地图
    load() {
      this.tMap.clearLayers();
      this.tMap.clearOverLays();
      this.tMap.centerAndZoom(
        new T.LngLat(this.centerMap.centroid[0], this.centerMap.centroid[1]),
        11
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
    },
    //加载js
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
  },
};
</script>
<style lang="scss" scoped>
.title_style {
  margin: 0;
  margin-top: 10px;
  margin-bottom: 5px;
  height: 70px;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  line-height: 70px;
  background-image: url(../assets/images/u385.svg);
  background-size: cover;
  background-repeat: no-repeat;
  width: 64%;
  text-align: center;
}
.core-dynamic-content-container {
  text-align: center;
  height: calc(100% - 50px);
  .scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .scroll-content {
      color: #fff;
      margin: 0 10px;
      .active_right_item {
        background: rgb(129, 122, 122) !important;
      }
    }
    .scroll-content .name {
      display: inline-block;
      padding-left: 10px;
      font-weight: 800;
      text-align: left;
      width: 45%;
      height: 85px;
    }
    .scroll-content .num {
      display: inline-block;
      font-size: 25px;
      color: #00ece4;
      font-weight: 800;
      text-align: center;
      width: 50%;
      height: 85px;
    }
    .scroll-item {
      font-size: 24px;
      font-weight: bold;
      margin-top: 3px;
      line-height: 85px;
      background: rgba(36, 67, 116, 0.5);
      border-radius: 5px;
      text-align: center;
    }
    .scroll-item::before {
      content: "";
      float: left;
      height: 86px;
      background: rgb(36, 184, 243);
      width: 5px;
    }

    .scroll-item:hover {
      background: rgba(36, 67, 116, 0.9) !important;
      .scroll-item::before {
        background: rgba(189, 219, 247, 0.9) !important;
      }
    }
  }
}
.map_border {
  border: solid 2px #0167dd;
  background: linear-gradient(270deg, #0267d8, #0267d8) 0 0 no-repeat,
    linear-gradient(180deg, #0267d8, #0267d8) 0 0 no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 100% 0 no-repeat,
    linear-gradient(180deg, #0267d8, #0267d8) 100% 0 no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 0 100% no-repeat,
    linear-gradient(180deg, #0267d8, #0267d8) 0 100% no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 100% 100% no-repeat,
    linear-gradient(270deg, #0267d8, #0267d8) 100% 100% no-repeat;
  background-size: 2px 25px, 25px 2px;
}
.solution {
  position: fixed;
  left: 200px;
  top: 100px;
  width: 70%;
  height: 70% !important;
  background: #113157;
  opacity: 1;
  z-index: 300;
  .solutionContent {
    height: calc(100% - 140px);
    overflow: auto;
    color: #ffffff;
    font-size: 26px;
    font-weight: 700;
    p {
      text-indent: 50px;
      text-align: left;
    }
  }
}
.titleContainer {
  background: #041d4e;
  display: flex;
  justify-content: space-between;
  z-index: 500;
  .videoTitle {
    height: 50px;
    min-width: 200px;
    font-weight: 700;
    padding: 0 15px;
    color: aliceblue;
    line-height: 50px;
    background-image: url("../assets/images/videotitle.svg");
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
.chart-wrapper {
  z-index: 1;
  width: 100%;
  height: calc(100% - 90px);
  position: absolute;
  left: 0;
  top: 90px;
}

.select-panel {
  position: absolute;
  z-index: 2;
  color: #ffffff;
}
.left {
  width: 28%;
  height: 100%;
  text-align: center;
  z-index: 10;
  .left_top {
    height: 50%;
    #review_box {
      height: calc(100% - 80px);
      .tbody {
        margin: 0;
        padding: 0;
        li {
          list-style: none;
          font-size: 14px;
          height: 90px;
          line-height: 90px;
          margin: 0 auto;
        }
      }
    }
  }
  .left_bottom {
    height: 50%;
    .map_border {
      height: calc(100% - 100px);
    }
    .thead {
      padding: 0;
      span {
        display: inline-block;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        color: #03a7f0;
      }
    }
    #table_box {
      position: relative;
      height: calc(100% - 58px);
      background-color: transparent;
      overflow: hidden;
      color: #fff;
      border-radius: 5px;
      ul {
        padding: 0 !important;
        margin: 0;
        list-style: none;
        li {
          display: inline-block;
          width: 100%;
          height: 50px;
          line-height: 50px;
        }
      }
      span {
        display: inline-block;
        // text-align: center;
      }
      .spanP {
        display: inline-block;
        width: 120px;
        height: 15px;
        text-align: left;
        background-repeat: no-repeat;
      }
      .spanP1 {
        background-image: url(../assets/images/jingdu2.svg);
      }
      .spanP2 {
        background-image: url(../assets/images/jingdu1.svg);
      }
      .spanP3 {
        background-image: url(../assets/images/jingdu3.svg);
      }
      .spanS1 {
        width: 30px;
      }
    }
  }
}
.center {
  width: 44%;
  z-index: 1;
}
.right {
  width: 28%;
  height: 100%;
  z-index: 10;
  .right_title {
    margin-left: 16%;
  }
}

.tab-menu {
  width: 100%;
  height: 40px;
  padding-top: 10px;
  color: #f5f6f8;
  display: flex;
  justify-content: space-around;
}

.tab-menu-span {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.tab-class {
  width: 100%;
  height: calc(100% - 90px);
}
.home {
  height: calc(100% - 90px);
}
.content {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.active {
  background-color: #0c66a5 !important;
}
.li_bg {
  background: #113157;
}
.li_bg1 {
  background: #041d4e;
}
.menu_active {
  border: solid 1px #0c66a5 !important;
}
</style>
