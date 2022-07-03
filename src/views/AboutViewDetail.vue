<template>
  <div class="fzjc">
    <div class="left">
      <div class="leftdiv">
        <div class="title_style" @click="enlarge('LT')">垃圾清运量</div>
        <div class="btnlist">
          <span
            v-for="(item, index) in btnlist1"
            @click="garbageType = item.value"
            :class="{ active: item.value == garbageType }"
            :key="index"
            >{{ item.name }}</span
          >
        </div>
        <div id="leftbar" class="map_border"></div>
      </div>
      <div class="leftdiv">
        <div
          style="margin-bottom: 10px"
          class="title_style"
          @click="enlarge('LB')"
        >
          能力分析
        </div>
        <div class="leftbottom map_border">
          <div class="listhead">
            <span>序号</span>
            <span>指标名称</span>
            <span>额定值</span>
            <span>实际值</span>
            <span>负载率 </span>
          </div>
          <div v-for="(item, index) in leftdivdata" :key="index">
            <span>{{ index }}</span
            ><span>{{ item.projectName }}</span
            ><span>{{ item.projectValue }}</span
            ><span>{{ item.pojectVaule2 }}</span
            ><span>{{ item.rate * 100 }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sanlv">
      <div class="lv_container">
        <div class="bg_content">
          <img src="../assets/images/sanlvbg1.svg" alt="" srcset="" />
          <img src="../assets/images/sanlvbg2.png" alt="" />
          <img src="../assets/images/sanlvbg3.png" alt="" />
        </div>
        <div class="sanlvdate">
          <span>知晓率</span>
          <span>{{ sanlv.knowRate }}%</span>
        </div>
      </div>
      <div class="lv_container">
        <div class="bg_content">
          <img src="../assets/images/sanlvbg1.svg" alt="" srcset="" />
          <img src="../assets/images/sanlvbg2.png" alt="" />
          <img src="../assets/images/sanlvbg3.png" alt="" />
        </div>
        <div class="sanlvdate">
          <span>参与率</span>
          <span>{{ sanlv.joinRate }}%</span>
        </div>
      </div>
      <div class="lv_container">
        <div class="bg_content">
          <img src="../assets/images/sanlvbg1.svg" alt="" srcset="" />
          <img src="../assets/images/sanlvbg2.png" alt="" />
          <img src="../assets/images/sanlvbg3.png" alt="" />
        </div>
        <div class="sanlvdate">
          <span>正确率</span>
          <span>{{ sanlv.rightRate }}%</span>
        </div>
      </div>
    </div>
    <div class="mapcontainer">
      <div id="main"></div>
    </div>
    <div class="right">
      <div class="rightdiv">
        <div @click="enlarge('RT')" class="title_style">质量评价</div>
        <div class="btnlist">
          <span
            @click="evaluationType = item.value"
            :class="{ active: item.value == evaluationType }"
            v-for="(item, index) in btnlist2"
            :key="index"
            >{{ item.name }}</span
          >
        </div>
        <div id="rightline" class="map_border"></div>
      </div>
      <div class="rightdiv">
        <div
          class="title_style"
          @click="enlarge('RB')"
          style="margin-bottom: 10px"
        >
          红黑榜
        </div>
        <div class="rightbottom map_border" :key="rightkey">
          <div
            v-show="table == true"
            class="tableone animate__animated animate__fadeInRight"
          >
            <img src="../assets/images/red.svg" alt="" srcset="" />
            <ul class="thead">
              <span style="width: 50px">排名</span>
              <span style="width: 110px">名称</span>
              <span style="width: 70px">综合评分</span>
              <span style="width: 145px">上榜理由</span>
            </ul>
            <VueSeamlessScroll
              :data="redList"
              :class-option="seamlessScrollOption"
              key="bottom"
              class="scroll"
            >
              <div class="table">
                <div
                  class="tbody"
                  v-for="(item, index) in redList"
                  :key="index"
                >
                  <span style="width: 50px">{{ index + 1 }}</span>
                  <span style="width: 145px">{{ item.redblackName }}</span>
                  <span style="width: 70px">{{ item.score }}</span>
                  <span style="width: 145px">{{ item.remarks }}</span>
                </div>
              </div>
            </VueSeamlessScroll>
          </div>
          <div
            v-show="table == false"
            class="tabletwo animate__animated animate__fadeInRight"
          >
            <img src="../assets/images/balck.svg" alt="" srcset="" />
            <ul class="thead">
              <span style="width: 50px">排名</span>
              <span style="width: 110px">名称</span>
              <span style="width: 70px">综合评分</span>
              <span style="width: 145px">上榜理由</span>
            </ul>
            <VueSeamlessScroll
              :data="blackList"
              :class-option="seamlessScrollOption"
              key="bottom"
              class="scroll"
            >
              <div class="table">
                <div
                  class="tbody"
                  v-for="(item, index) in blackList"
                  :key="index"
                >
                  <span style="width: 50px">{{ index + 1 }}</span>
                  <span style="width: 145px">{{ item.redblackName }}</span>
                  <span style="width: 70px">{{ item.score }}</span>
                  <span style="width: 140px">{{ item.remarks }}</span>
                </div>
              </div>
            </VueSeamlessScroll>
          </div>
        </div>
      </div>
    </div>
    <div class="chartPart commom_dialog" v-show="enlargeShow">
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
          <div class="fontStyle">{{ enlargeTitle }}</div>
          <div class="videoOff" @click="enlargeShow = false">关闭</div>
        </div>
        <!---->
      </div>
      <div class="toggle_btn" v-show="enlarge_item == 'LT'">
        <span
          v-for="(item, index) in btnlist1"
          @click="enlarge_bnt_click(item, 'LT')"
          :class="{ dialog_btn_active: item.value == dialog_btn_item1 }"
          :key="index"
          >{{ item.name }}</span
        >
      </div>
      <div class="toggle_btn" v-show="enlarge_item == 'RT'">
        <span
          v-for="(item, index) in btnlist2"
          @click="enlarge_bnt_click(item, 'RT')"
          :class="{ dialog_btn_active: item.value == dialog_btn_item2 }"
          :key="index"
          >{{ item.name }}</span
        >
      </div>
      <div
        v-show="enlarge_item == 'LT' || enlarge_item == 'RT'"
        id="echarts_part"
      ></div>
      <div
        class="rightbottom map_border"
        :key="rightkey"
        v-show="enlarge_item == 'RB'"
      >
        <div
          v-show="table == true"
          class="tableone animate__animated animate__fadeInRight"
        >
          <img src="../assets/images/red.svg" alt="" srcset="" />
          <ul class="thead">
            <span style="width: 50px">排名</span>
            <span style="width: 110px">名称</span>
            <span style="width: 70px">综合评分</span>
            <span style="width: 145px">上榜理由</span>
          </ul>
          <VueSeamlessScroll
            :data="redList"
            :class-option="seamlessScrollOption"
            key="bottom"
            class="scroll"
          >
            <div class="table">
              <div class="tbody" v-for="(item, index) in redList" :key="index">
                <span style="width: 50px">{{ index + 1 }}</span>
                <span style="width: 145px">{{ item.redblackName }}</span>
                <span style="width: 70px">{{ item.score }}</span>
                <span style="width: 145px">{{ item.remarks }}</span>
              </div>
            </div>
          </VueSeamlessScroll>
        </div>
        <div
          v-show="table == false"
          class="tabletwo animate__animated animate__fadeInRight"
        >
          <img src="../assets/images/balck.svg" alt="" srcset="" />
          <ul class="thead">
            <span style="width: 50px">排名</span>
            <span style="width: 110px">名称</span>
            <span style="width: 70px">综合评分</span>
            <span style="width: 145px">上榜理由</span>
          </ul>
          <VueSeamlessScroll
            :data="blackList"
            :class-option="seamlessScrollOption"
            key="bottom"
            class="scroll"
          >
            <div class="table">
              <div
                class="tbody"
                v-for="(item, index) in blackList"
                :key="index"
              >
                <span style="width: 50px">{{ index + 1 }}</span>
                <span style="width: 145px">{{ item.redblackName }}</span>
                <span style="width: 70px">{{ item.score }}</span>
                <span style="width: 140px">{{ item.remarks }}</span>
              </div>
            </div>
          </VueSeamlessScroll>
        </div>
      </div>
      <div v-show="enlarge_item == 'LB'">
        <div class="leftbottom map_border">
          <div class="listhead">
            <span>序号</span>
            <span>指标名称</span>
            <span>额定值</span>
            <span>实际值</span>
            <span>负载率 </span>
          </div>
          <div v-for="(item, index) in leftdivdata" :key="index">
            <span>{{ index }}</span
            ><span>{{ item.projectName }}</span
            ><span>{{ item.projectValue }}</span
            ><span>{{ item.pojectVaule2 }}</span
            ><span>{{ item.rate * 100 }}%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="yujin_bottom" @click="showYujing">
      <VueSeamlessScroll
        :data="yujinglist"
        :class-option="yujingOption"
        class="yujingflow"
      >
        <ul class="item">
          <li
            v-for="(item, index) in yujinglist"
            :key="index"
            :data-index="index"
          >
            {{ item.content }}
          </li>
        </ul>
      </VueSeamlessScroll>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import yls_json from "./ljpt_xz.json";
import "echarts-gl";
import VueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      dialog_btn_item1: "",
      dialog_btn_item2: "10",
      enlarge_item: "",
      enlargeShow: false,
      enlargeTitle: null,
      charts_part_option: [],
      left_option: [],
      right_option: [],
      yujinglist: [
        // 测试数据
        {
          level: 1,
          content: "该区域暂无预警信息......",
        },
      ],
      leftChart: null,
      rightChart: null,
      carrentDate: null,
      carrentMounth: null,
      sanlv: {},
      garbageType: "",
      evaluationType: 10,
      areaValue: "",
      grabge: {
        deptName: [],
        weight: [],
        lastYearMonthWeight: [],
        tong: [],
      },
      btnlist1: [
        { name: "总量", value: "" },
        { name: "其他", value: 40 },
        { name: "餐厨", value: 30 },
        { name: "厨余", value: 31 },
        { name: "生鲜", value: 32 },
        { name: "回收", value: 10 },
        { name: "有害", value: 20 },
        { name: "大件", value: 70 },
        { name: "装修", value: 80 },
        { name: "园林", value: 60 },
      ],
      btnlist2: [
        { name: "日评价数分析", value: 10 },
        { name: "月评价数分析", value: 20 },
        { name: "焚烧率分析", value: 1 },
        { name: "回收利用分析", value: 2 },
        { name: "易腐垃圾占比", value: 3 },
      ],
      blackList: [],
      redList: [],
      table: true,
      rightkey: "rightkey",
      color: [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      leftdivdata: [],
      mapdata: [],
      centerMap: [],
      tMap: null,
      formfiled: {
        deptId: "",
        deptIdEnd: "",
      },
    };
  },
  watch: {
    garbageType: {
      handler: function (val) {
        this.dialog_btn_item1 = val;
        this.getWeight(val);
      },
    },
    evaluationType: {
      handler: function (val) {
        this.dialog_btn_item2 = val;
        if (val == 10) {
          this.getEvaluation(
            "api/v1/jky/dailyEvaluation",
            {
              deptId: this.formfiled.deptId,
              deptIdEnd: this.formfiled.deptIdEnd,
              // date: this.carrentDate,
              // 测试数据
              date: "2022-05-17",
            },
            val
          );
        } else if (val == 20) {
          this.getEvaluation(
            "api/v1/jky/monthlyEvaluation",
            {
              deptId: this.formfiled.deptId,
              deptIdEnd: this.formfiled.deptIdEnd,
            },
            val
          );
        } else {
          this.getEvaluation(
            "api/v1/jky/qualityEvaluation",
            {
              deptId: this.formfiled.deptId,
              deptIdEnd: this.formfiled.deptIdEnd,
              type: val,
            },
            val
          );
        }
      },
    },
  },
  created() {
    this.dateSwitch();
  },
  beforeDestroy() {
    this.leftChart.dispose();
    this.rightChart.dispose();
  },
  mounted() {
    setInterval(() => {
      this.table = !this.table;
      this.rightkey += Math.random();
    }, 5000);
    this.formfiled.deptId = this.$route.query.deptId;
    this.formfiled.deptIdEnd = this.$route.query.deptIdEnd;
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
            console.log("天地图准备完毕");
            this.tMap = new T.Map("main");
            this.toggleArea(this.$route.query.areaName);
            this.getdata();
            this.getRedBlack();
            this.getSanlv();
            this.getYuJing();
            setTimeout(() => {
              this.getWeight();
              this.getEvaluation(
                "api/v1/jky/dailyEvaluation",
                {
                  deptId: this.formfiled.deptId,
                  deptIdEnd: this.formfiled.deptIdEnd,
                  date: this.carrentDate,
                  // 测试数据
                  // date: "2022-05-17",
                },
                10
              );
            }, 1000);
          }
        );
      });
    };
  },
  computed: {
    seamlessScrollOption() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    yujingOption() {
      return {
        step: 1.5,
        direction: 2, // 0向下 1向上 2向左 3向右
        limitMoveNum: this.yujinglist.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true,
        openTouch: false,
      };
    },
  },
  methods: {
    //图标切换
    enlarge_bnt_click(item) {
      if (this.enlarge_item == "LT") {
        this.dialog_btn_item1 = item.value;
        this.getWeight(this.dialog_btn_item1, "echarts_part");
      } else if (this.enlarge_item == "RT") {
        this.dialog_btn_item2 = item.value;
        var val = item.value;
        if (val == 10) {
          this.getEvaluation(
            "api/v1/jky/dailyEvaluation",
            {
              deptId: this.formfiled.deptId,
              deptIdEnd: this.formfiled.deptIdEnd,
              date: this.carrentDate,
            },
            val,
            "echarts_part"
          );
        } else if (val == 20) {
          this.getEvaluation(
            "api/v1/jky/monthlyEvaluation",
            {
              deptId: this.formfiled.deptId,
              deptIdEnd: this.formfiled.deptIdEnd,
            },
            val,
            "echarts_part"
          );
        } else {
          this.getEvaluation(
            "api/v1/jky/qualityEvaluation",
            {
              deptId: this.formfiled.deptId,
              deptIdEnd: this.formfiled.deptIdEnd,
              type: val,
            },
            val,
            "echarts_part"
          );
        }
      }
    },
    //放大图表
    //放大图表
    enlarge(L) {
      this.enlargeShow = true;
      if (L == "LT") {
        this.enlarge_item = "LT";
        this.enlargeTitle = "垃圾清运量";
        setTimeout(() => {
          this.getWeight(this.dialog_btn_item1, "echarts_part");
        }, 200);
      } else if (L == "RT") {
        this.enlarge_item = "RT";
        this.enlargeTitle = "质量评价";
        setTimeout(() => {
          var val = this.dialog_btn_item2;
          if (val == 10) {
            this.getEvaluation(
              "api/v1/jky/dailyEvaluation",
              {
                deptId: this.formfiled.deptId,
                deptIdEnd: this.formfiled.deptIdEnd,
                date: this.carrentDate,
              },
              val,
              "echarts_part"
            );
          } else if (val == 20) {
            this.getEvaluation(
              "api/v1/jky/monthlyEvaluation",
              {
                deptId: this.formfiled.deptId,
                deptIdEnd: this.formfiled.deptIdEnd,
              },
              val,
              "echarts_part"
            );
          } else {
            this.getEvaluation(
              "api/v1/jky/qualityEvaluation",
              {
                deptId: this.formfiled.deptId,
                deptIdEnd: this.formfiled.deptIdEnd,
                type: val,
              },
              val,
              "echarts_part"
            );
          }
        }, 200);
      } else if (L == "LB") {
        this.enlarge_item = "LB";
        this.enlargeTitle = "能力分析";
      } else {
        this.enlarge_item = "RB";
        this.enlargeTitle = "红黑榜";
      }
    },
    showYujing() {
      this.$store.commit("TOGGLE_YUJING", true);
    },
    //预警信息
    getYuJing() {
      var data;
      data = {
        deptId: this.$route.query.deptId,
        deptIdEnd: this.$route.query.deptIdEnd,
        // deptId: "400000000",
        // deptIdEnd: "499999999",
      };
      this.$http({
        method: "get",
        url: "api/v1/jky/getAiWarningPn",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: data,
      })
        .then((res) => {
          console.log(res.data.result);
          if (res.data.result) {
            this.yujinglist = res.data.result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
      this.tMap.setStyle("indigo");
      document.getElementsByClassName(
        "tdt-control-copyright tdt-control"
      )[0].style.display = "none";
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
    //红黑榜
    getRedBlack() {
      //三率
      this.$http({
        method: "post",
        url: "api/v1/jky/redBlack",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: this.formfiled.deptId,
          deptIdEnd: this.formfiled.deptIdEnd,
          date: this.carrentDate,
          // 测试数据
          // date: "2021-05-08",
        },
      })
        .then((res) => {
          this.blackList = res.data.result.blackList;
          this.redList = res.data.result.redList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //日期月份转换
    dateSwitch() {
      var date = new Date();
      var y = date.getFullYear();
      var M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      //    'h+': date.getHours(), // 小时
      // var h = date.getHours();
      // h = h < 10 ? "0" + h : h;
      // var m = date.getMinutes();
      // m = m < 10 ? "0" + m : m;
      // var s = date.getSeconds();
      // s = s < 10 ? "0" + s : s;
      // 'm+': date.getMinutes(), // 分
      // 's+': date.getSeconds(), // 秒
      // return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
      this.carrentDate = y + "-" + M + "-" + d;
      this.carrentMounth = y + "-" + M;
    },
    //能力建设
    getdata() {
      this.$http({
        method: "get",
        url: "api/v1/jky/capabilityAnalysis",
        baseURL: "http://o792k95b.xiaomy.net/",
      })
        .then((res) => {
          this.leftdivdata = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSanlv() {
      //三率
      this.$http({
        method: "post",
        url: "api/v1/jky/threeRate",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: this.formfiled.deptId,
          deptIdEnd: this.formfiled.deptIdEnd,
        },
      })
        .then((res) => {
          const { knowRate, joinRate, rightRate } = res.data.result;
          this.sanlv.knowRate = Math.floor(knowRate * 100);
          this.sanlv.joinRate = Math.floor(joinRate * 100);
          this.sanlv.rightRate = Math.floor(rightRate * 100);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWeight(val = "", id = "leftbar") {
      var chartDom = document.getElementById(id);
      this.leftChart = echarts.init(chartDom);
      this.leftChart.showLoading();
      this.$http({
        method: "post",
        url: "api/v1/jky/DwWeightCarMonthWeight/deptMonthWeight2",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          // 测试数据
          // deptId: "400000000",
          // deptIdEnd: "499999999",
          deptId: this.formfiled.deptId.toString(),
          deptIdEnd: this.formfiled.deptIdEnd.toString(),
          garbageType: val,
        },
      })
        .then((res) => {
          if (res.data.result) {
            this.grabge.weight = [];
            this.grabge.lastYearMonthWeight = [];
            this.grabge.tong = [];
            this.grabge.deptName = [];
            res.data.result.weightList.forEach((item) => {
              this.grabge.deptName.push(item.weightMonth);
              this.grabge.weight.push(item.weight);
              this.grabge.lastYearMonthWeight.push(item.lastYearMonthWeight);
              this.grabge.tong.push(item.tong);
            });
            this.leftbar();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEvaluation(url, data, type, id = "rightline") {
      var chartDom = document.getElementById(id);
      this.rightChart = echarts.init(chartDom);
      this.rightChart.showLoading();
      this.$http({
        method: "post",
        url: url,
        baseURL: "http://o792k95b.xiaomy.net/",
        data: data,
      })
        .then((res) => {
          if (res.data) {
            var result;
            if (typeof res.data === "string") {
              result = eval("(" + res.data + ")").result;
            } else {
              result = res.data.result;
            }
            this.rightline(result, type);
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    rightline(result, type) {
      var option;
      var xData = [];
      var legendData = [];
      const colors = ["#5470C6", "#91CC75", "#EE6666"];
      if (type == 10) {
        var xDataOld = Object.keys(result.map);
        xData = xDataOld.map((item) => {
          return Number(item) + 1;
        });
        var yDataLeft = Object.values(result.map);
        var yDataRight = Object.values(result.mapSum);
        legendData = ["每小时评价数", "当日累计评价数"];
        option = {
          color: colors,
          grid: {
            left: 70,
            bottom: 30,
            right: 10,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {},
          },
          legend: {
            data: legendData,
            textStyle: {
              color: "#fff",
            },
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                color: "#fff",
              },
              data: xData,
            },
          ],
          yAxis: [
            {
              type: "value",
              position: "left",
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff",
                },
              },
              axisLabel: {
                formatter: "{value}",
                clolor: "#fff",
              },
            },
          ],
          series: [
            {
              name: "每小时评价数",
              type: "bar",
              data: yDataLeft,
            },
            {
              name: "当日累计评价数",
              type: "line",
              data: yDataRight,
            },
          ],
        };
      } else if (type == 20) {
        xData = Object.keys(result.goodMap);
        var goodData = Object.values(result.goodMap);
        var sumData = Object.values(result.goodMap);
        legendData = ["月评价数", "好评数"];
        option = {
          color: colors,
          grid: {
            left: 70,
            bottom: 30,
            right: 10,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {},
          },
          legend: {
            data: legendData,
            textStyle: {
              color: "#fff",
            },
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                color: "#fff",
              },
              data: xData,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "评价数",
              position: "left",
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff",
                },
              },
              axisLabel: {
                formatter: "{value}",
              },
            },
          ],
          series: [
            {
              name: "月评价数",
              type: "line",
              data: sumData,
            },
            {
              name: "好评数",
              type: "line",
              data: goodData,
            },
          ],
        };
      } else {
        var yDataold = Object.values(result.rateList);
        var yData = yDataold.map((item) => item * 100);
        xData = Object.values(result.monthList);
        if (type == 1) {
          legendData = ["焚烧率"];
        } else if (type == 2) {
          legendData = ["回收利用率"];
        } else if (type == 3) {
          legendData = ["易腐垃圾占比"];
        }
        option = {
          color: colors,
          tooltip: {
            trigger: "axis",
            axisPointer: {},
          },
          grid: {
            left: 70,
            bottom: 30,
            right: 10,
          },
          legend: {
            data: legendData,
            textStyle: {
              color: "#fff",
            },
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                color: "#fff",
              },
              data: xData,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: legendData[0],
              position: "left",
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff",
                },
              },
              axisLabel: {
                formatter: "{value}%",
              },
            },
          ],
          series: [
            {
              name: legendData[0],
              type: "line",
              data: yData,
            },
          ],
        };
      }
      this.right_option = option;
      this.rightChart.clear();
      this.rightChart.hideLoading();
      option && this.rightChart.setOption(option);
    },
    leftbar() {
      var option;
      const colors = ["#5470C6", "#91CC75", "#EE6666"];
      option = {
        color: colors,
        tooltip: {
          trigger: "axis",
        },
        grid: {
          bottom: 40,
        },
        legend: {
          data: ["当月产生量", "去年同期产生量", "同比增长率"],
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          show: false,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.grabge.deptName,
            axisLabel: {
              // interval: 0,
              color: "#fff",
              // rotate: -30,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
          },
          {
            type: "value",
            name: "同比增长率",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
              },
            },
            axisLabel: {
              formatter: "{value}%",
              color: "#fff",
            },
          },
        ],
        series: [
          {
            name: "同比增长率",
            type: "line",
            yAxisIndex: 1,
            data: this.grabge.tong,
          },
          {
            name: "当月产生量",
            type: "bar",
            data: this.grabge.weight,
          },
          {
            name: "去年同期产生量",
            type: "bar",
            data: this.grabge.lastYearMonthWeight,
          },
        ],
      };
      this.left_option = option;
      this.leftChart.clear();
      this.leftChart.hideLoading();
      option && this.leftChart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.toggle_btn {
  background: url("../assets/images/toggle_btn_bg.svg");
  span {
    display: inline-block;
    cursor: pointer;
    padding: 0 10px;
    font-weight: 800;
    height: 28px;
    color: #0cb3df;
  }
}
@keyframes fadenum {
  100% {
    transform: rotate(360deg);
  }
}
.rightbottom {
  z-index: 10;
  height: calc(100% - 104px);
  overflow: hidden;
  .tableone {
    text-align: left;
    .thead {
      background: linear-gradient(red, black);
    }
  }
  .tabletwo {
    text-align: left;
    .thead {
      background: linear-gradient(rgb(55, 53, 53), black);
    }
  }
  .thead {
    padding: 0;
    display: flex;
    height: 30px;
    margin: 0;
    line-height: 30px;
    justify-content: space-around;
  }
  .thead span {
    display: inline-block;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }
  .scroll {
    height: 100%;
    overflow: hidden;
    color: white;
    font-size: 18px;
    text-align: center;
  }
  .table {
    width: 100%;
    .tbody {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-around;
      background: rgba(252, 250, 250, 0.03);
      span {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
.right span:hover {
  background-color: #587e8f;
  border-radius: 5px;
}
.title_style {
  margin: 0;
  margin-top: 10px;
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
.returnBtn {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 20px;
  cursor: pointer;
}
.fzjc {
  height: calc(100% - 90px);
  position: relative;
  display: flex;
  justify-content: space-around;
  .mapcontainer {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    #main {
      width: 100%;
      height: 100%;
    }
  }
  .sanlv {
    width: 40%;
    height: 200px;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    z-index: 2;
    .lv_container {
      position: relative;
      width: 120px;
      height: 120px;
      .bg_content {
        text-align: center;
        margin: 0 auto;
        img {
          position: absolute;
          animation: fadenum 5s infinite;
        }
        img:first-child {
          top: 20px;
          left: 20px;
          z-index: 1;
          width: 80px;
        }
        img:nth-child(2) {
          top: 6px;
          left: 6px;
          z-index: 2;
          width: 108px;
        }
        img:last-child {
          top: 0;
          left: 0;
          z-index: 3;
          width: 120px;
        }
      }
      .sanlvdate {
        position: absolute;
        top: 14px;
        left: 23px;
        z-index: 3;
        span {
          margin-top: 10px;
          display: block;
          color: #02a7f0;
          font-size: 25px;
          font-weight: 700;
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
  .left {
    width: 30%;
    z-index: 2;
    .leftdiv {
      height: 50%;
      width: 100%;
      .map_border {
        width: 100%;
        height: calc(100% - 104px);
      }
    }
  }
  .right {
    width: 30%;
    z-index: 2;
    .rightdiv {
      width: 100%;
      height: 50%;
      #rightline {
        width: 100%;
        height: calc(100% - 104px);
      }
    }
    .title_style {
      margin-left: 36%;
      cursor: pointer;
    }
  }
}
.leftbottom {
  height: calc(100% - 78px);
  div {
    display: flex;
    justify-content: space-around;
    height: 20%;
    span {
      margin-left: 2px;
      display: inline-block;
      height: 50px;
      line-height: 50px;
      color: #fff;
    }
  }
  .listhead {
    span {
      font-size: 25px;
      font-weight: 700;
      color: #02a7f0;
    }
  }
}
.yujin_bottom {
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 50px;
  z-index: 1000;
  .yujingflow {
    background: rgba(255, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  ul {
    margin: 0;
  }
  ul > li {
    list-style: none;
    margin-left: 30px;
    float: left;
    height: 50px;
    font-size: 38px;
    line-height: 50px;
    color: #fff;
  }
}
.btnlist {
  margin: 5px auto;
  display: flex;
  // justify-content: space-around;
  span {
    cursor: pointer;
    min-width: 30px;
    display: inline-block;
    color: #02a7f0;
    font-size: 1rem;
    border: solid 1px #02a7f0;
    margin-right: 1px;
    padding: 0 2px;
    border-radius: 3px;
  }
}
.active {
  background: #02a7f0;
  color: #fff !important;
}
.dialog_btn_active {
  background: rgb(40, 139, 128);
  color: rgb(255, 255, 255) !important;
}
</style>
