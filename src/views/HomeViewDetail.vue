<template>
  <div class="home">
    <div class="content">
      <div class="left">
        <div class="left_top">
          <div class="enlargeTitle title_style">规划引领</div>
          <div id="review_box" @click="handleClick($event)">
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
              <table class="tbody">
                <tr
                  v-for="(item, index) in lefttopdata"
                  :key="index"
                  :class="{ li_bg: index % 2 == 0, li_bg1: index % 2 == 1 }"
                >
                  <td class="city_container">
                    <div
                      class="l_top_cityname"
                      :data-dept="JSON.stringify(item)"
                    >
                      {{ item.cityName }}
                    </div>
                  </td>
                  <td class="title_container">
                    <div class="l_top_title" :data-dept="JSON.stringify(item)">
                      {{ item.title }}
                    </div>
                  </td>
                </tr>
              </table>
            </VueSeamlessScroll>
          </div>
        </div>
        <div class="left_bottom">
          <div class="enlargeTitle title_style">项目建设</div>
          <div class="map_border">
            <ul class="thead">
              <span style="width: 50px">序号</span>
              <span style="width: 150px">区县</span>
              <span style="width: 70px">项目数</span>
              <span style="width: 150px">完成进度</span>
            </ul>
            <div id="table_box">
              <VueSeamlessScroll
                v-if="leftBottom.length > 0"
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
                    <span style="width: 150px">
                      <span>{{ item.projectName }}</span></span
                    >
                    <span style="width: 70px">{{ item.projectValue }}</span>
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
                  <span class="name"> {{ item.projectName }}</span>
                  <span class="num">{{ item.projectValueTotal }}</span>
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
    <div class="commom_dialog" v-show="point_click_show" :key="info_dialog_key">
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
      <div class="dialog_body" style="height: calc(100% - 108px)">
        <div class="tab_content" v-show="dialog_tab_num == 0">
          <ul class="info">
            <li>站点类型：{{ init_info.paramName }}</li>
            <li>站点名称：{{ init_info.projectName }}</li>
            <li>站点地址：{{ init_info.projectAddress }}</li>
            <li>总投资额：{{ init_info.money }}</li>
            <li>占地面积：{{ init_info.buildArea }}</li>
            <li>投运日期：{{ init_info.endDate }}</li>
            <li>运营单位：{{ init_info.operationUnit }}</li>
          </ul>
        </div>
        <div class="tab_content" v-show="dialog_tab_num == 1">
          <div class="aimg_content">
            <img :src="current_img_url" alt="现场图片" srcset="" />
          </div>
          <div class="img_list">
            <ul>
              <li
                v-for="(item, index) in imgUrlList"
                :key="index"
                @click="current_img_url = item.addUrl"
                :class="{ video_active: current_img_url == item.addUrl }"
              >
                <img :src="item.url" alt="现场图片" srcset="" />
              </li>
            </ul>
          </div>
        </div>
        <div class="tab_content" v-show="dialog_tab_num == 2">
          <div class="aimg_content">
            <img :src="current_live_img_url" alt="定时抓拍" srcset="" />
          </div>
          <div class="img_list">
            <ul>
              <li
                v-for="(item, index) in liveUrlList"
                :key="index"
                :class="{ video_active: current_live_img_url == item.url }"
                @click="current_live_img_url = item.url"
              >
                <img :src="item.url" alt="定时抓拍" srcset="" />
                <p>{{ item.dateTime }}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab_content" v-show="dialog_tab_num == 3">
          <div class="aimg_content">
            <video
              ref="videoPlayer"
              class="video-js"
              controls
              @click="isactive == false ? (isactive = true) : ''"
              muted
            ></video>
          </div>
          <div class="img_list">
            <ul>
              <li
                v-for="(item, index) in videoUrlList"
                :key="index"
                @click="video_select(item, index)"
                :class="{ video_active: video_active_item == index }"
              >
                <div class="video_name">
                  {{ item.cameraName }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSeamlessScroll from "vue-seamless-scroll";
import yls_json from "./ljpt_xz.json";
import videojs from "video.js";
import json11 from "./mock/1.1.json";
import json12 from "./mock/1.2.json";
import json13 from "./mock/1.3.json";
import json14 from "./mock/1.4.json";
import json15 from "./mock/1.5.json";
import json151 from "./mock/1.51.json";
export default {
  components: {
    VueSeamlessScroll,
  },
  name: "HomeViewDetail",
  computed: {
    seamlessScrollOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
      };
    },
  },
  data() {
    return {
      current_img_url: "",
      current_live_img_url: "",
      imgUrlList: [],
      liveUrlList: [],
      videoUrlList: [],
      player: null,
      video_active_item: null,
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
      label: null,
      infoWin: null,
      mapdata: [],
      centerMap: [],
      myChart: null,
      tabContent: 2,
      color: ["#fecb9a", "#fefdce", "#fefa7d", "#cdccfb", "#cdf99d", "#fdcdcc"],
      lefttopdata: [],
      leftBottom: [],
      active_right_item: null,
      villageId: "",
      init_info: {
        paramName: "暂无信息",
        projectName: "暂无信息",
        projectAddress: "暂无信息",
        money: "暂无信息",
        buildArea: "暂无信息",
        endDate: "暂无信息",
        operationUnit: "暂无信息",
      },
      info_object: {
        paramName: "暂无信息",
        projectName: "暂无信息",
        projectAddress: "暂无信息",
        money: "暂无信息",
        buildArea: "暂无信息",
        endDate: "暂无信息",
        operationUnit: "暂无信息",
      },
    };
  },
  created() {
    this.deptId = this.$route.query.deptId;
    this.deptIdEnd = this.$route.query.deptIdEnd;
  },
  watch: {
    dialog_tab_num: {
      handler: function (val) {
        if (val == 1 && this.imgUrlList.length > 0) {
          this.current_img_url = this.imgUrlList[0].addUrl;
        } else if (val == 2 && this.liveUrlList.length > 0) {
          this.current_live_img_url = this.liveUrlList[0].url;
        } else if (val == 3 && this.videoUrlList.length > 0) {
          this.video_select(this.videoUrlList[0], 0);
        }
      },
    },
  },
  mounted() {
    //加载完成去执行代码  ie中不能使用
    this.loadJS("TiandituGovApi.js", () => {
      this.loadJS("D3.js", () => {
        this.loadJS("D3SvgOverlay.js", () => {
          console.log("天地图准备完毕");
          this.tMap = new T.Map("chart-city");
          this.toggleArea(this.$route.query.areaName);
          this.planningGuidance();
          this.projectConstruction();
          this.basicResources(2);
        });
      });
    });
  },
  methods: {
    handleClick(event) {
      //防止重复点击某一条数据
      //获取点击的list对象
      let item = JSON.parse(event.target.dataset.dept);
      this.solution = item.content;
      this.solution_title = item.title;
      this.solutionShow = true;
    },
    //视频选择
    video_select(item, index) {
      this.video_active_item = index;
      this.$http({
        method: "get",
        url: "/api/v1/jky/pjcamera/getUrlAddress",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: {
          rowId: item.rowId,
        },
      })
        .then((res) => {
          setTimeout(() => {
            this.player = videojs(this.$refs.videoPlayer);
            this.player.src(res.data.result);
            videojs(this.$refs.videoPlayer).ready(function () {
              this.player = this;
              this.player.play();
            });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //关闭弹窗
    dialog_off() {
      this.point_click_show = false;
      if (this.player) {
        this.player.pause();
        this.player.dispose();
      }
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
          this.init_info = JSON.parse(JSON.stringify(this.info_object));
          Object.assign(this.init_info, res.data.result);
        })
        .catch((err) => {
          var res = json151;
          this.init_info = JSON.parse(JSON.stringify(this.info_object));
          Object.assign(this.init_info, res.result);
        });
    },
    //现场图片
    livePicture() {
      this.$http({
        method: "post",
        url: "api/v1/jky/livePicture",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          // villageId: "400012965",
          villageId: this.villageId,
        },
      })
        .then((res) => {
          if (res.data.result) {
            this.imgUrlList = res.data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //实时抓拍
    queryCameraImgByVillageId() {
      this.$http({
        method: "get",
        url: "api/v1/jky/queryCameraImgByVillageId",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: {
          villageId: this.villageId,
          // villageId: "400011841",
        },
      })
        .then((res) => {
          if (res.data.result) {
            this.liveUrlList = res.data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //监控视频
    queryCameraByVillageId() {
      this.$http({
        method: "post",
        url: "/api/v1/jky/queryCameraByVillageId",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          villageId: this.villageId,
          // villageId: "400223319",
        },
      })
        .then((res) => {
          if (res.data.result) {
            this.videoUrlList = res.data.result;
          }
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
          var res = json13;
          console.log(res);
          this.dataList1 = res.result;
          this.dataList2 = res.result;
          this.dataList3 = res.result;
          this.dataList4 = res.result;
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
          if (res.data.result) {
            this.leftBottom = res.data.result;
          }
        })
        .catch((err) => {
          var res = json12;
          console.log(res);
          this.leftBottom = res.result;
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
          if (res.data.result) {
            this.lefttopdata = res.data.result;
          }
        })
        .catch((err) => {
          var res = json11;
          this.lefttopdata = res.result;
        });
    },
    //切换tab
    dialog_title_click(item, index) {
      this.dialog_tab_num = index;
      if (this.player) {
        this.player.pause();
      }
    },
    //基础资源点击事件
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
          groupCode: item.groupCode,
        },
      })
        .then((res) => {
          if (res.data.result) {
            var data = JSON.parse(JSON.stringify(res.data.result));
            this.drawPoint(data);
          }
        })
        .catch((err) => {
          var res = json15;
          this.drawPoint(res.result);
        });
    },
    // 天地图添加标记并绑定点击事件
    drawPoint(data) {
      this.tMap.clearOverLays();
      this.draw_map();
      data.forEach((item) => {
        var marker = new T.Marker(new T.LngLat(item.lng, item.lat));
        marker.info = item;
        //向地图上添加标注
        this.tMap.addOverLay(marker);
        marker.addEventListener("click", this.marker_click);
        marker.addEventListener("mouseover", this.point_hover);
        marker.addEventListener("mouseout", this.point_out);
      });
    },
    //
    point_out() {
      this.tMap.removeOverLay(this.infoWin);
      // this.tMap.removeOverLay(this.label);
    },
    //站点hover事件
    point_hover(e) {
      this.infoWin = new T.InfoWindow(`<b>${e.target.info.projectName}</b>`);
      e.target.openInfoWindow(this.infoWin);
    },
    //点位点击事件
    marker_click(e) {
      var p = e.target;
      this.villageId = p.info.rowId;
      this.point_click_show = true;
      this.dialog_tab_num = 0;
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
    // yjitemClick(item) {
    //   console.log("打开弹窗");
    //   this.solution = item.content;
    //   this.solution_title = item.title;
    //   this.solutionShow = true;
    // },
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

      //创建标注对象
      this.draw_map();
    },
    //区域描边
    draw_map() {
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
    isInclude(name) {
      var es = document.getElementsByTagName("script");
      for (var i = 0; i < es.length; i++) {
        if (es[i]["src"]) {
          if (es[i]["src"].indexOf(name) != -1) {
            return true;
          }
        }
      }
      return false;
    },
    //加载js
    loadJS(url, success) {
      if (this.isInclude(url)) {
        console.log(url + "已加载");
        success();
        return;
      }
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
.dialog_body {
  .tab_content {
    width: 100%;
    height: 100%;
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
    .aimg_content {
      display: inline-block;
      width: 80%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img_list {
      width: 20%;
      display: inline-block;
      height: 100%;
      ul {
        height: 100%;
        overflow: auto;
        color: #fff;
        list-style: none;
        margin: 0 auto;
        padding: 0;
        border-left: solid 1px #03a7f0;
        li {
          cursor: pointer;
        }
        img {
          width: 100%;
          height: 130px;
        }
        .video_name {
          height: 30px;
          line-height: 30px;
        }
        .video_active {
          border: solid 1px #03a7f0;
          border-radius: 5px;
        }
      }
    }
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
        tr {
          cursor: pointer;
          font-size: 14px;
          height: 90px;
          margin: auto;
          td {
            padding: 0;
            border: none;
          }
          .city_container {
            width: 90px;
            .l_top_cityname {
              width: 100%;
              vertical-align: middle;
            }
          }
          .title_container {
            .l_top_title {
              display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
              -webkit-line-clamp: 2; //限制行数
              overflow: hidden; //超出部分隐藏
              text-overflow: ellipsis; //用一个省略号代替超出的内容
            }
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
      margin-left: -80px;
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
          margin-bottom: 10px;
          margin-left: -80px;
          span {
            display: inline-block;
            height: 100%;
            vertical-align: top;
          }
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
  .tab-class {
    width: 100%;
    height: calc(100% - 90px);
    .tab-menu {
      width: 100%;
      height: 40px;
      padding-top: 10px;
      color: #f5f6f8;
      display: flex;
      justify-content: space-around;
      .tab-menu-span {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
      }
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
  }
}

.home {
  height: calc(100% - 90px);
  .content {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
}

.active {
  background-color: #0c66a5 !important;
}
.li_bg {
  background: rgba(94, 148, 219, 0.5);
}
.li_bg1 {
  background: rgba(17, 49, 87, 0.5);
}
.menu_active {
  border: solid 1px #0c66a5 !important;
}
</style>
