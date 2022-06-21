<template>
  <div class="fzjc">
    <div class="left">
      <div class="leftdiv">
        <h3>垃圾生产量</h3>
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
        <h3>项目建设</h3>
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
    <div class="mapcontainer">
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
            @click="areaValue = item.value"
            :class="{ active: item.value == areaValue }"
            v-for="(item, index) in btnlist3"
            :key="index"
            >{{ item.name }}</span
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
              :data="reddata"
              :class-option="seamlessScrollOption"
              key="bottom"
              class="scroll"
            >
              <div class="table">
                <div
                  class="tbody"
                  v-for="(item, index) in reddata"
                  :key="index"
                >
                  <span style="width: 50px">{{ item.index }}</span>
                  <span style="width: 145px">{{ item.name }}</span>
                  <span style="width: 70px">{{ item.charge }}</span>
                  <span style="width: 145px">{{ item.reason }}</span>
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
              :data="blackdata"
              :class-option="seamlessScrollOption"
              key="bottom"
              class="scroll"
            >
              <div class="table">
                <div
                  class="tbody"
                  v-for="(item, index) in blackdata"
                  :key="index"
                >
                  <span style="width: 50px">{{ item.index }}</span>
                  <span style="width: 145px">{{ item.name }}</span>
                  <span style="width: 70px">{{ item.charge }}</span>
                  <span style="width: 140px">{{ item.reason }}</span>
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
import * as echarts from "echarts/lib/echarts.js";
import "echarts-gl";
import yls_json from "./ljpt_xz.json";
import VueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      carrentDate: null,
      carrentMounth: null,
      sanlv: {},
      garbageType: "",
      evaluationType: 1,
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
        { name: "日评价叔分析", value: 1 },
        { name: "月评价数分析", value: 2 },
        { name: "焚烧率分析", value: 3 },
        { name: "回收利用分析", value: 4 },
        { name: "易腐垃圾占比", value: 5 },
      ],
      btnlist3: [
        { name: "南湖", value: 410000000 },
        { name: "秀洲", value: 420000000 },
        { name: "嘉善", value: 430000000 },
        { name: "平湖", value: 460000000 },
        { name: "海盐", value: 440000000 },
        { name: "海宁", value: 450000000 },
        { name: "桐乡", value: 470000000 },
        { name: "经开", value: 480000000 },
        { name: "港区", value: 490000000 },
      ],
      blackdata: [
        {
          index: 1,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 2,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 3,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 4,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 5,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 6,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
      ],
      reddata: [
        {
          index: 1,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 2,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 3,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 4,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 5,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
        {
          index: 6,
          name: "南湖区百度弄社区",
          charge: 94,
          reason: "投放点卫生保持整洁",
        },
      ],
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
  created() {
    this.dateSwitch();
  },
  mounted() {
    setInterval(() => {
      this.table = !this.table;
      this.rightkey += Math.random();
    }, 5000);
    this.map();
    this.rightline();
    this.getdata();
    this.getSanlv();
    this.getWeight();
  },
  computed: {
    seamlessScrollOption() {
      return {
        step: 1, // 数值越大速度滚动越快
        // limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
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
          this.sanlv.knowRate = knowRate * 100;
          this.sanlv.joinRate = joinRate * 100;
          this.sanlv.rightRate = rightRate * 100;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWeight() {
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
            res.data.result.forEach((item) => {
              this.grabge.deptName.push(item.deptName);
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
    getEvaluation() {
      this.$http({
        method: "post",
        url: "api/v1/jky/DwWeightCarMonthWeight/deptMonthWeight",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          deptIdEnd: "499999999",
          weightMonth: this.carrentMounth,
          type: this.garbageType,
        },
      })
        .then((res) => {
          if (res.data.result) {
            res.data.result.forEach((item) => {
              this.grabge.deptName.push(item.deptName);
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
    rightline() {
      var chartDom = document.getElementById("rightline");
      var myChart = echarts.init(chartDom);
      var option;

      const colors = ["#5470C6", "#91CC75", "#EE6666"];
      option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          right: "20%",
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
        legend: {
          data: ["每小时评价数", "当日累计评价数"],
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "去年同期产生量",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "Precipitation",
            position: "right",
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "温度",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: "{value} °C",
            },
          },
        ],
        series: [
          {
            name: "去年同期产生量",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "Precipitation",
            type: "bar",
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 2,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    leftbar() {
      var chartDom = document.getElementById("leftbar");
      var myChart = echarts.init(chartDom);
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
          },
        ],
        yAxis: [
          {
            type: "value",
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
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "去年同期产生量",
            type: "bar",
            data: this.grabge.lastYearMonthWeight,
            markPoint: {
              data: [
                { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    map() {
      // 初始化图表
      var myChart = echarts.init(document.getElementById("main"));

      // JSON文件(地图数据)路径

      // 显示加载动画效果,可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      myChart.showLoading();

      // 引入JSON文件
      var linedata = [];
      const data = yls_json.features.map((item) => {
        if (item.properties.centroid) {
          linedata.push([...item.properties.centroid, 0]);
        }
        const geoAreaName = item.properties.name; // geo文件中的地理名称
        return {
          name: geoAreaName,
          coord: item.properties.centroid,
          itemStyle: {
            color: "#0072cc",
            opacity: 0.5,
            borderColor: "#fff",
          },
        };
      });
      console.log(data, yls_json);
      // 注册地图名字(tongren)和数据(geoJson)
      echarts.registerMap("jx", yls_json);
      // 隐藏动画加载效果。
      myChart.hideLoading();

      // 图表配置项
      var option = {
        selectedMode: "multiple", // 选中效果固话
        title: {
          // 标题
          top: "5%",
          text: "当前位置-嘉兴",
          subtext: "",
          x: "center",
          textStyle: {
            color: "#ccc",
          },
        },

        tooltip: {
          // 提示框
          show: false,
          trigger: "item",
          formatter: function (params) {
            return params.name;
          },
        },
        geo3D: {
          map: "jx",
          show: false,
          label: {
            show: false,
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
          {
            type: "scatter3D",
            name: "jx",
            coordinateSystem: "geo3D",
            symbol: "triangle",
            symbolSize: 18,
            itemStyle: {
              color: "#FF5722",
              opacity: 1,
            },
            data: linedata,
          },
          {
            name: "jx", // 系列名称
            type: "map3D", // 系列类型
            map: "jx", // 地图类型。echarts-gl 中使用的地图类型同 geo 组件相同(ECharts 中提供了两种格式的地图数据，一种是可以直接 script 标签引入的 js 文件，引入后会自动注册地图名字和数据。还有一种是 JSON 文件，需要通过 AJAX 异步加载后手动注册。)
            // colorBy: "data",
            tooltip: {
              //提示框组件。
              alwaysShowContent: true,
              hoverAnimation: true,
              trigger: "item", //触发类型 散点图
              enterable: true, //鼠标是否可进入提示框
              transitionDuration: 1, //提示框移动动画过渡时间
              triggerOn: "click",
              formatter: function (params) {
                if (params.name) {
                  var str = `
                  <div class="map-tooltip">
                    <div class="city-name">${params.name}</div>
                  </div>
                  `;
                  return str;
                }
              },
              // backgroundColor: 'rgba(30, 54, 124,1)',
              // backgroundColor: '#01FEDD',
              borderWidth: "1px",
              borderRadius: "4",
              borderColor: "#00B2AC",
              textStyle: {
                color: "#00B2AC",
              },
              padding: [5, 10],
            },
            // 环境贴图，支持純颜色值，渐变色，全景贴图的 url。默认为 'auto'，在配置有 light.ambientCubemap.texture 的时候会使用该纹理作为环境贴图。否则则不显示环境贴图。
            label: {
              // 标签的相关设置
              show: false, // (地图上的城市名称)是否显示标签 [ default: false ]
              //distance: 50, // 标签距离图形的距离，在三维的散点图中这个距离是屏幕空间的像素值，其它图中这个距离是相对的三维距离
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
                // 标签的字体样式
                fontSize: 18, // 字体大小
                opacity: 1, // 字体透明度
              },
              emphasis: {
                show: true,
              },
            },

            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              color: "#570131", // 地图板块的颜色
              opacity: 1, // 图形的不透明度 [ default: 1 ]
              borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#000", // 图形描边的颜色。[ default: #333 ]
            },

            emphasis: {
              // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
              label: {
                // label高亮时的配置
                show: true,
                textStyle: {
                  color: "#fff", // 高亮时标签颜色变为 白色
                  fontSize: 15, // 高亮时标签字体 变大
                },
              },
              itemStyle: {
                // itemStyle高亮时的配置
                areaColor: "#5470c6", // 高亮时地图板块颜色改变
              },
            },

            groundPlane: {
              // 地面可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。
              show: false, // 是否显示地面。[ default: false ]
              color: "#aaa", // 地面颜色。[ default: '#aaa' ]
            },
            //shading: 'lambert', // 三维地理坐标系组件中三维图形的着色效果，echarts-gl 中支持下面三种着色方式:
            // 'color' 只显示颜色，不受光照等其它因素的影响。
            // 'lambert' 通过经典的 lambert 着色表现光照带来的明暗。
            // 'realistic' 真实感渲染，配合 light.ambientCubemap 和 postEffect 使用可以让展示的画面效果和质感有质的提升。ECharts GL 中使用了基于物理的渲染（PBR） 来表现真实感材质。
            // realisticMaterial: {} // 真实感材质相关的配置项，在 shading 为'realistic'时有效。
            // lambertMaterial: {} // lambert 材质相关的配置项，在 shading 为'lambert'时有效。
            // colorMaterial: {} // color 材质相关的配置项，在 shading 为'color'时有效。

            light: {
              // 光照相关的设置。在 shading 为 'color' 的时候无效。 光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
              main: {
                // 场景主光源的设置，在 globe 组件中就是太阳光。
                color: "#fff", //主光源的颜色。[ default: #fff ]
                intensity: 1.2, //主光源的强度。[ default: 1 ]
                shadow: false, //主光源是否投射阴影。默认关闭。 开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
                //shadowQuality: 'high', // 阴影的质量。可选'low', 'medium', 'high', 'ultra' [ default: 'medium' ]
                alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
                beta: 10, // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
              },
              ambient: {
                // 全局的环境光设置。
                color: "#fff", // 环境光的颜色。[ default: #fff ]
                intensity: 0.5, // 环境光的强度。[ default: 0.2 ]
              },
            },

            viewControl: {
              // 用于鼠标的旋转，缩放等视角控制。
              projection: "perspective", // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
              autoRotate: false, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
              autoRotateDirection: "cw", // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
              autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
              autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
              damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
              rotateSensitivity: 1, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。 rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
              zoomSensitivity: 1, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
              panSensitivity: 1, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
              panMouseButton: "left", // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
              rotateMouseButton: "left", // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

              distance: 150, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
              minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
              maxDistance: 400, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。

              alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
              beta: 15, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
              minAlpha: -360, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
              maxAlpha: 360, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
              minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
              maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

              center: [0, 0, 0], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。

              animation: true, // 是否开启动画。[ default: true ]
              animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
              animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
            },

            data: data,
          },
        ],
      };

      // 设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表。
      myChart.setOption(option);

      // 处理点击事件并且跳转到相应的百度搜索页面
      myChart.on("click", function (params) {
        var subSystem = params.name;
        var url = "https://www.baidu.com/s?ie=UTF-8&wd=";

        // 根据点击地图区域的名称,跳转到对应页面
        if (subSystem == "德江县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "思南县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "江口县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "沿河土家自治县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "万山区") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "碧江区") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "石阡县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "玉屏侗族自治县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "松桃苗族自治县") {
          window.open(url.concat(subSystem));
        } else if (subSystem == "印江土家族苗族自治县") {
          window.open(url.concat(subSystem));
        }
        /*alert(params.name); */
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
.mapcontainer {
  width: 40%;
  .sanlv {
    width: 100%;
    height: 200px;
    float: left;
    display: flex;
    margin-top: 100px;
    justify-content: space-around;
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
}
.rightbottom {
  border: solid 1px rgb(11, 100, 233);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  z-index: 10;
  height: calc(100% - 81px);
  overflow: hidden;
  .tableone {
    .thead {
      background: linear-gradient(red, black);
    }
  }
  .tabletwo {
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
      height: 70px;
      line-height: 70px;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
      background: rgba(255, 255, 255, 0.13);
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
  display: flex;
  height: calc(100% - 90px);
  .left {
    width: 30%;
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
  #main {
    width: 100%;
    height: 100%;
  }
  .right {
    width: 30%;
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
