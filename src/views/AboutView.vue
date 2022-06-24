<template>
  <div class="fzjc">
    <div class="left">
      <div class="leftdiv">
        <h3>垃圾清运量</h3>
        <div class="btnlist">
          <span
            v-for="(item, index) in btnlist1"
            @click="garbageType = item.value"
            :class="{ active: item.value == garbageType }"
            :key="index"
            >{{ item.name }}</span
          >
        </div>
        <div id="leftbar"></div>
      </div>
      <div class="leftdiv">
        <h3>能力分析</h3>
        <div class="leftbottom">
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
      <div>
        <div>
          <img src="../assets/images/sanlvbg2.png" alt="" />
          <img src="../assets/images/sanlvbg3.png" alt="" />
        </div>
        <div class="sanlvdate">
          <span>知晓率</span>
          <span>{{ sanlv.knowRate }}%</span>
        </div>
      </div>
      <div>
        <div>
          <img src="../assets/images/sanlvbg2.png" alt="" />
          <img src="../assets/images/sanlvbg3.png" alt="" />
        </div>
        <div class="sanlvdate">
          <span>参与率</span>
          <span>{{ sanlv.joinRate }}%</span>
        </div>
      </div>
      <div>
        <div>
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
        <h3>质量评价</h3>
        <div class="btnlist">
          <span
            @click="evaluationType = item.value"
            :class="{ active: item.value == evaluationType }"
            v-for="(item, index) in btnlist2"
            :key="index"
            >{{ item.name }}</span
          >
        </div>
        <div id="rightline"></div>
      </div>
      <div class="rightdiv">
        <h3>红黑榜</h3>
        <div class="btnlist">
          <span
            @click="toggleArea(item)"
            :class="{ active: item.rowId == areaValue }"
            v-for="(item, index) in btnlist3"
            :key="index"
            >{{ item.deptName }}</span
          >
        </div>
        <div class="rightbottom" :key="rightkey">
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
  </div>
</template>

<script>
// import * as echarts from "echarts/lib/echarts.js";
import * as echarts from "echarts";
import "echarts-gl";
import yls_json from "./ljpt_xz.json";
import VueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
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
      // btnlist3: [],
      btnlist3: [
        { deptName: "南湖", rowId: 410000000, rowIdEnd: 419999999 },
        { deptName: "秀洲", rowId: 420000000, rowIdEnd: 429999999 },
        { deptName: "嘉善", rowId: 430000000, rowIdEnd: 439999999 },
        { deptName: "海盐", rowId: 440000000, rowIdEnd: 449999999 },
        { deptName: "海宁", rowId: 450000000, rowIdEnd: 459999999 },
        { deptName: "平湖", rowId: 460000000, rowIdEnd: 469999999 },
        { deptName: "桐乡", rowId: 470000000, rowIdEnd: 479999999 },
        { deptName: "经开", rowId: 480000000, rowIdEnd: 489999999 },
        { deptName: "港区", rowId: 490000000, rowIdEnd: 499999999 },
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
    };
  },
  watch: {
    garbageType: {
      handler: function () {
        this.getWeight();
      },
    },
    evaluationType: {
      handler: function (val) {
        if (val == 10) {
          this.getEvaluation(
            "api/v1/jky/dailyEvaluation",
            {
              deptId: "400000000",
              deptIdEnd: "499999999",
              // date: this.carrentDate,
              //测试数据
              date: "2022-05-17",
            },
            val
          );
        } else if (val == 20) {
          this.getEvaluation(
            "api/v1/jky/monthlyEvaluation",
            {
              deptId: "400000000",
              deptIdEnd: "499999999",
            },
            val
          );
        } else {
          this.getEvaluation(
            "api/v1/jky/qualityEvaluation",
            {
              deptId: "400000000",
              deptIdEnd: "499999999",
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
    // this.getAreaList();
    this.map();
    this.getdata();
    this.getSanlv();
    this.getWeight();
    this.getRedBlack();
    this.getEvaluation(
      "api/v1/jky/dailyEvaluation",
      {
        deptId: "400000000",
        deptIdEnd: "499999999",
        // date: this.carrentDate,
        //测试数据
        date: "2022-05-17",
      },
      10
    );
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
  },
  methods: {
    //切换红黑榜区域
    toggleArea(item) {
      this.areaValue = item.rowId;
      this.getRedBlack(item);
    },
    // 获取区域数据
    getAreaList() {
      this.$http({
        method: "post",
        url: "api/v1/jky/counties",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
        },
      })
        .then((res) => {
          this.btnlist3 = res.data.result.map((item) => {
            return {
              deptName: item.deptName,
              rowId: item.rowId,
              rowIdEnd: item.rowIdEnd,
            };
          });
          console.log(this.btnlist3);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //红黑榜
    getRedBlack(area) {
      //三率
      this.$http({
        method: "post",
        url: "api/v1/jky/redBlack",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: area ? area.rowId.toString() : "400000000",
          deptIdEnd: area ? area.rowIdEnd.toString() : "499999999",
          // date: this.carrentDate,
          //测试数据
          date: "2021-05-08",
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
          deptId: "400000000",
          deptIdEnd: "499999999",
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
    getWeight() {
      var chartDom = document.getElementById("leftbar");
      this.leftChart = echarts.init(chartDom);
      this.$http({
        method: "post",
        url: "api/v1/jky/DwWeightCarMonthWeight/deptMonthWeight",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          deptIdEnd: "499999999",
          weightMonth: this.carrentMounth,
          garbageType: this.garbageType,
        },
      })
        .then((res) => {
          if (res.data.result) {
            this.grabge.deptName = [];
            this.grabge.weight = [];
            this.grabge.lastYearMonthWeight = [];
            this.grabge.tong = [];
            res.data.result.forEach((item) => {
              if (item.deptName) {
                this.grabge.deptName.push(item.deptName);
                this.grabge.weight.push(item.weight);
                this.grabge.lastYearMonthWeight.push(item.lastYearMonthWeight);
                this.grabge.tong.push(item.tong);
              }
            });
            this.leftbar();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getEvaluation(url, data, type) {
      var chartDom = document.getElementById("rightline");
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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
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
              data: xData,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "每小时评价数",
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
            {
              type: "value",
              name: "当日累计评价数",
              position: "right",
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0],
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
              // yAxisIndex: 1,
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
            // containLabel: true,
            left: 90,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
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
                  color: colors[2],
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
            axisPointer: {
              type: "cross",
            },
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
                  color: colors[2],
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
              interval: 0,
              rotate: -30,
              color: "#fff",
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
                color: colors[0],
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
      this.leftChart.clear();
      option && this.leftChart.setOption(option);
    },
    map() {
      // 初始化图表
      let data = yls_json;
      echarts.registerMap("yls", data);
      var myChart = echarts.init(document.getElementById("main"));
      // 显示加载动画效果,可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      myChart.showLoading();

      // 引入JSON文件
      var linedata = [];
      console.log(yls_json.features);
      const map3Ddata = yls_json.features.map((item) => {
        if (item.properties.centroid) {
          linedata.push([...item.properties.centroid, 0]);
        }
        const geoAreaName = item.properties.name; // geo文件中的地理名称
        return {
          name: geoAreaName,
          // value: item.properties.centroid,
          itemStyle: {
            color: "#0b7ef5",
          },
        };
      });
      const option = {
        title: {
          text: "当前位置-嘉兴市",
          left: "35%",
          top: 160,
          textStyle: {
            color: "#fff",
          },
        },
        geo3D: {
          map: "yls",
          show: false,
          regionHeight: 6,
          zoom: 1,
          left: 0,
          label: {
            show: true,
            distance: 0,
            formatter(param) {
              const city = param.name;
              return `{sty1|${city}}`;
            },
            rich: {
              sty1: {
                color: "#8d0121",
                align: "center",
              },
            },
            textStyle: {
              fontSize: 12,
              color: "#f51c0b",
            },
          },
          viewControl: {
            distance: 110,
            zoomSensitivity: 1,
            panSensitivity: 1,
            rotateSensitivity: 1,
          },
          zlevel: -11,
        },
        series: [
          // {
          //   type: "scatter3D",
          //   name: "yls",
          //   coordinateSystem: "geo3D",
          //   // symbol:
          //   //   "path://M201.142857 58.514286v658.285714s131.657143-160.914286 336.457143-73.142857c80.457143 43.885714 153.6 109.714286 277.942857 109.714286 124.342857 0 204.8-73.142857 204.8-73.142858V43.885714s-182.857143 182.857143-409.6 29.257143C552.228571 29.257143 449.828571-14.628571 369.371429 7.314286 281.6 29.257143 201.142857 58.514286 201.142857 58.514286M54.857143 1024c-29.257143 0-51.2-21.942857-51.2-58.514286V51.2C3.657143 21.942857 25.6 0 54.857143 0s51.2 21.942857 51.2 51.2v914.285714c7.314286 36.571429-14.628571 58.514286-51.2 58.514286z",
          //   // // symbolSize: 20,
          //   // //http://47.99.127.192:9903/images/%E9%A6%96%E9%A1%B5/u31.svg
          //   // // symbol:
          //   // //   "image://http://47.99.127.192:9903/images/%E9%A6%96%E9%A1%B5/u31.svg",
          //   // symbolSize: 20,
          //   animation: true,
          //   zlevel: -8,
          //   itemStyle: {
          //     color: "#FF5722",
          //     opacity: 1,
          //   },
          //   label: {
          //     distance: 2,
          //   },
          //   data: linedata,
          // },
          {
            name: "yls",
            type: "map3D", // map3D / map
            map: "yls",
            zlevel: -9,
            // regionHeight: 5,
            label: {
              show: true,
              distance: 0,
              formatter(param) {
                const city = param.name;
                return `{sty1|${city}}`;
              },
              rich: {
                sty1: {
                  color: "#FFFFFF",
                  align: "center",
                  fontSize: 18,
                  fontWeight: 700,
                },
              },
            },
            emphasis: {
              // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
              label: {
                // label高亮时的配置
                show: true,
                textStyle: {
                  color: "#f73205", // 高亮时标签颜色变为 白色
                  fontSize: 18, // 高亮时标签字体 变大
                },
              },
              itemStyle: {
                color: "#0b7ef5",
                opacity: 0.5,
              },
            },
            groundPlane: {
              //工作台
              // show: true,
            },
            shading: "realistic",
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              // areaColor: "#000", // 地图板块的颜色
              opacity: 0.6, // 图形的不透明度 [ default: 1 ]
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#ffffff", // 图形描边的颜色。[ default: #333 ]
            },
            data: map3Ddata,
            viewControl: {
              distance: 130, // 地图视角 控制初始大小
              rotateSensitivity: 1, // 旋转
              zoomSensitivity: 1, // 缩放
            },
          },
        ],
      };
      myChart.hideLoading();
      myChart.setOption(option);
      myChart.on("click", (res) => {
        var deptId;
        var deptIdEnd;
        this.btnlist3.forEach((item) => {
          if (res.name.indexOf(item.deptName) != -1) {
            deptId = item.rowId;
            deptIdEnd = item.rowIdEnd;
          }
        });
        this.$router.push({
          name: "aboutDetail",
          query: {
            areaName: res.name,
            deptId,
            deptIdEnd,
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@keyframes fadenum {
  100% {
    transform: rotate(360deg);
  }
}
.rightbottom {
  border: solid 1px rgb(11, 100, 233);
  border-radius: 10px;
  z-index: 10;
  height: calc(100% - 100px);
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
    height: 40px;
    margin: 0;
    line-height: 40px;
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
h3 {
  margin: 0;
  display: inline-block;
  margin-top: 10px;
  width: 250px;
  height: 40px;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  line-height: 40px;
  background-image: url(../assets/images/u385.svg);
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
    div {
      position: relative;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        animation: fadenum 5s infinite;
      }
      img:first-child {
        z-index: 1;
      }
      img:last-child {
        z-index: 2;
      }
      .sanlvdate {
        position: absolute;
        top: 0;
        left: 0;
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
  .left {
    width: 30%;
    z-index: 2;
    .leftdiv {
      height: 50%;
      width: 100%;
      #leftbar {
        border: solid 1px #0167dd;
        width: 100%;
        height: calc(100% - 81px);
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
        border: solid 1px #0167dd;
        width: 100%;
        height: calc(100% - 81px);
      }
    }
  }
}
.leftbottom {
  border: solid 1px skyblue;
  height: 40vh;
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
.btnlist {
  margin: 5px auto;
  display: flex;
  justify-content: space-around;
  span {
    cursor: pointer;
    min-width: 40px;
    display: inline-block;
    color: #02a7f0;
    font-size: 14px;
    border: solid 1px #02a7f0;
    margin-right: 3px;
    padding: 0 2px;
    border-radius: 3px;
  }
}
.active {
  background: #02a7f0;
  color: #fff !important;
}
</style>
