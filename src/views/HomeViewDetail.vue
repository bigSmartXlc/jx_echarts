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
                  <div class="l_top_cityname">{{ item.cityName }}</div>
                  <div class="l_top_title">{{ item.title }}</div>
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
            <div id="table_box">
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
                    <span style="width: 50px">{{ index + 1 }}</span>
                    <span style="width: 100px">
                      <span>{{ item.projectName }}</span></span
                    >
                    <span style="width: 100px">{{ item.projectValue }}</span>
                    <span style="width: 150px">
                      <span
                        :class="{
                          spanP1: parseFloat(item.completionSchedule) < 50,
                          spanP2:
                            parseFloat(item.completionSchedule) >= 50 &&
                            parseFloat(item.completionSchedule) < 80,
                          spanP3: parseFloat(item.completionSchedule) >= 80,
                        }"
                        class="spanP"
                        :style="{
                          backgroundSize:
                            parseFloat(item.completionSchedule) + '%' + ' 15px',
                        }"
                      >
                      </span>
                      <span class="spanS1"
                        >{{ parseFloat(item.completionSchedule) }}%</span
                      >
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
              :class="{ menu_active: tabContent == 2 }"
              class="tab-menu-span"
              @click="tabContentToggle(2)"
            >
              投放
            </div>
            <div
              :class="{ menu_active: tabContent == 3 }"
              class="tab-menu-span"
              @click="tabContentToggle(3)"
            >
              收集
            </div>
            <div
              :class="{ menu_active: tabContent == 4 }"
              class="tab-menu-span"
              @click="tabContentToggle(4)"
            >
              运输
            </div>
            <div
              :class="{ menu_active: tabContent == 5 }"
              class="tab-menu-span"
              @click="tabContentToggle(5)"
            >
              处置
            </div>
          </div>
          <div class="core-dynamic-content-container">
            <div class="scroll-wrapper" ref="scroll">
              <div class="scroll-content" v-show="tabContent === 2">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 2,
                  }"
                  v-for="(item, index) in dataList1"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 3">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 3,
                  }"
                  v-for="(item, index) in dataList2"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 4">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 4,
                  }"
                  v-for="(item, index) in dataList3"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 5">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item, tabContent)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 5,
                  }"
                  v-for="(item, index) in dataList4"
                  :key="index"
                >
                  <span class="name"> {{ item.projectName }}</span
                  ><span class="num">{{ item.projectValueTotal }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="solutionShow" class="solution commom_dialog">
      <div class="dialog__header">
        <div class="header-title">
          <div class="title_left">
            <div class="circleIcon"></div>
            <div class="circleIcon"></div>
            <div class="circleIcon"></div>
            <div class="circleIcon" style="background: rgb(5, 68, 137)"></div>
            <div
              class="circleIcon"
              style="background: rgba(8, 77, 173, 0.58)"
            ></div>
            <div class="circleIcon" style="background: rgb(8, 40, 78)"></div>
          </div>
          <div class="fontStyle">{{ solution_title }}</div>
          <div class="rightIcon"></div>
        </div>
        <!---->
      </div>
      <div class="dialog_body">
        <div class="solutionContent">
          <p class="dialog_prog" v-html="solution"></p>
        </div>
      </div>
      <div class="videoOff" @click="solutionShow = false">关闭</div>
    </div>
    <div
      class="chartPart commom_dialog"
      v-show="point_click_show"
      :key="info_dialog_key"
    >
      <div class="dialog__header">
        <div class="header-title">
          <div class="title_left">
            <div class="circleIcon"></div>
            <div class="circleIcon"></div>
            <div class="circleIcon"></div>
            <div class="circleIcon" style="background: rgb(5, 68, 137)"></div>
            <div
              class="circleIcon"
              style="background: rgba(8, 77, 173, 0.58)"
            ></div>
            <div class="circleIcon" style="background: rgb(8, 40, 78)"></div>
          </div>
          <div class="fontStyle">
            <span
              v-for="(item, index) in dialogList"
              :key="index"
              :class="{ tab_active: dialog_tab_num == index }"
              @click="dialog_title_click(item, index)"
            >
              {{ item }}
            </span>
          </div>
          <div class="videoOff" @click="dialog_off()">关闭</div>
        </div>
        <!---->
      </div>
      <div class="dialog_body">
        <div v-show="dialog_tab_num == 0">
          <ul class="info">
            <li>站点类型：{{ info_object.paramName }}</li>
            <li>站点名称：{{ info_object.projectName }}</li>
            <li>站点地址：{{ info_object.projectAddress }}</li>
            <li>总投资额：{{ info_object.money }}</li>
            <li>占地面积：{{ info_object.buildArea }}</li>
            <li>投运日期：{{ info_object.endDate }}</li>
            <li>运营单位：{{ info_object.operationUnit }}</li>
          </ul>
        </div>
        <div v-show="dialog_tab_num == 1">现场图片</div>
        <div v-show="dialog_tab_num == 2">定时抓拍</div>
        <div v-show="dialog_tab_num == 3">现场监控</div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSeamlessScroll from "vue-seamless-scroll";
import yls_json from "./ljpt_xz.json";
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
      info_dialog_key: "info_dialog_key",
      dialog_tab_num: 0,
      dialogList: ["基本信息", "现场图片", "定时抓拍", "现场监控"],
      point_click_show: false,
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      solutionShow: false,
      solution: null,
      solution_title: null,
      tMap: null,
      mapdata: [],
      centerMap: [],
      myChart: null,
      tabContent: 2,
      color: ["#fecb9a", "#fefdce", "#fefa7d", "#cdccfb", "#cdf99d", "#fdcdcc"],
      lefttopdata: [],
      leftBottom: [],
      active_right_item: null,
      villageId: null,
      info_object: {
        paramName: "",
        projectName: "",
        projectAddress: "",
        money: "",
        buildArea: "",
        endDate: "",
        operationUnit: "",
      },
    };
  },
  created() {
    this.deptId = this.$route.query.deptId;
    this.deptIdEnd = this.$route.query.deptIdEnd;
  },
  // watch: {
  //   point_click_show: {
  //     handler: function (val) {
  //       if (val) {
  //         setTimeout(() => {
  //           this.basicInformation();
  //         }, 1000);
  //       }
  //     },
  //   },
  // },
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
                this.planningGuidance();
                this.projectConstruction();
                this.basicResources(2);
              }
            );
          }
        );
      });
    };
  },
  methods: {
    //关闭弹窗
    dialog_off() {
      this.point_click_show = false;
      this.info_dialog_key = Math.random();
    },
    //基本信息查询
    basicInformation() {
      this.$http({
        method: "post",
        url: "api/v1/jky/basicInformation",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          villageId: this.villageId,
        },
      })
        .then((res) => {
          Object.assign(this.info_object, res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //现场图片
    livePicture() {
      this.$http({
        method: "post",
        url: "api/v1/jky/livePicture",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          villageId: this.villageId,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queryCameraImgByVillageId() {
      this.$http({
        method: "get",
        url: "api/v1/jky/queryCameraImgByVillageId",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: {
          villageId: this.villageId,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queryCameraByVillageId() {
      this.$http({
        method: "get",
        url: "/api/v1/jky/queryCameraByVillageId",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: {
          villageId: this.villageId,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //基础资源
    basicResources(val) {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/basicResources",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: this.deptId,
          deptIdEnd: this.deptIdEnd,
          state: val,
        },
      })
        .then((res) => {
          if (val == 2) {
            this.dataList1 = res.data.result;
          } else if (val == 3) {
            this.dataList2 = res.data.result;
          } else if (val == 4) {
            this.dataList3 = res.data.result;
          } else if (val == 5) {
            this.dataList4 = res.data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //项目建设
    projectConstruction() {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/projectConstruction",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: this.deptId,
          deptIdEnd: this.deptIdEnd,
          state: 1,
        },
      })
        .then((res) => {
          console.log(res.data.result);
          this.leftBottom = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 规划引领
    planningGuidance() {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/planningGuidance",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: this.deptId,
          deptIdEnd: this.deptIdEnd,
        },
      })
        .then((res) => {
          console.log(res);
          this.lefttopdata = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialog_title_click(item, index) {
      this.dialog_tab_num = index;
    },
    right_item_click(index, item, tabContent) {
      this.active_right_item = index;
      this.subpageMapPoints(item, tabContent);
    },
    //地图点位信息查询
    subpageMapPoints(item, state) {
      this.$http({
        method: "post",
        url: "api/v1/jky/planConstruct/subpageMapPoints",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: this.deptId,
          deptIdEnd: this.deptIdEnd,
          projectName: item.projectName,
          projectType: item.projectType,
          state: state,
        },
      })
        .then((res) => {
          var data = JSON.parse(JSON.stringify(res.data.result));
          this.drawPoint(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 天地图添加标记并绑定点击事件
    drawPoint(data) {
      data.forEach((item) => {
        var marker = new T.Marker(new T.LngLat(item.lng, item.lat));
        marker.info = item;
        //向地图上添加标注
        this.tMap.addOverLay(marker);
        marker.addEventListener("click", this.marker_click);
      });
    },
    marker_click(e) {
      var p = e.target;
      this.villageId = p.info.rowId;
      this.point_click_show = true;
      this.basicInformation();
      this.livePicture();
      this.queryCameraImgByVillageId();
      this.queryCameraByVillageId();
    },
    tabContentToggle(val) {
      this.basicResources(val);
      this.tabContent = val;
      this.active_right_item = null;
    },
    yjitemClick(item) {
      this.solution = item.content;
      this.solution_title = item.title;
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
      //创建标注对象
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
.info {
  list-style: none;
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  li {
    margin-bottom: 10px;
    text-align: left;
  }
}
.title_style {
  margin: 0;
  margin-top: 10px;
  margin-bottom: 5px;
  height: 70px;
  color: #fff;
  font-size: 40px;
  font-weight: 500;
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
    overflow: auto;
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
      width: 3px;
    }

    .scroll-item:hover {
      background: rgba(36, 67, 116, 0.9) !important;
      &::before {
        background: rgba(11, 138, 180, 0.9) !important;
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
          .l_top_cityname {
            display: inline-block;
            width: 12%;
            vertical-align: top;
          }
          .l_top_title {
            display: inline-block;
            width: 88%;
            overflow: hidden;
            /*文本不会换行*/
            white-space: nowrap;
            /*当文本溢出包含元素时，以省略号表示超出的文本*/
            text-overflow: ellipsis;
          }
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
      overflow: hiddden;
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
  opacity: 0.5;
}
.li_bg1 {
  background: #041d4e;
  opacity: 0.5;
}
.menu_active {
  border: solid 1px #0c66a5 !important;
}
</style>
