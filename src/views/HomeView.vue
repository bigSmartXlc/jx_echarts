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
              <div class="scroll-content" v-show="tabContent === 0">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 0,
                  }"
                  v-for="(item, index) in dataList1"
                  :key="index"
                >
                  <span class="name"> {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 1">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 1,
                  }"
                  v-for="(item, index) in dataList2"
                  :key="index"
                >
                  <span class="name"> {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 2">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 2,
                  }"
                  v-for="(item, index) in dataList3"
                  :key="index"
                >
                  <span class="name"> {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
                </div>
              </div>
              <div class="scroll-content" v-show="tabContent === 3">
                <div
                  class="scroll-item animate__animated animate__flipInY"
                  @click="right_item_click(index, item)"
                  :class="{
                    active_right_item:
                      active_right_item == index && tabContent === 3,
                  }"
                  v-for="(item, index) in dataList4"
                  :key="index"
                >
                  <span class="name"> {{ item.name }}</span
                  ><span class="num">{{ item.num }}</span>
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
          <p>{{ solution }}</p>
        </div>
      </div>
      <div class="videoOff" @click="solutionShow = false">关闭</div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import VueSeamlessScroll from "vue-seamless-scroll";
import yls_json from "./ljpt_xz.json";
import "echarts-gl";
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
      myChart: null,
      tabContent: 0,
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
      bs: null,
      active_right_item: null,
    };
  },
  mounted() {
    this.map();
  },
  methods: {
    right_item_click(index, item) {
      this.active_right_item = index;
    },
    tabContentToggle(val) {
      this.tabContent = val;
      this.active_right_item = null;
    },
    yjitemClick(item) {
      this.solution = item.solution;
      this.solution_title = item.name;
      this.solutionShow = true;
    },
    map() {
      // 初始化图表
      let data = yls_json;
      echarts.registerMap("yls", data);
      var myChart = echarts.init(document.getElementById("chart-city"));

      // JSON文件(地图数据)路径

      // 显示加载动画效果,可以在加载数据前手动调用该接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      myChart.showLoading();

      // 引入JSON文件
      var linedata = [];
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
          {
            type: "scatter3D",
            name: "yls",
            coordinateSystem: "geo3D",
            symbol: "pin",
            symbolSize: 20,
            animation: true,
            zlevel: -8,
            itemStyle: {
              color: "#FF5722",
              opacity: 1,
            },
            label: {
              distance: 20,
            },
            data: linedata,
          },
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
                  color: "#02a7f0",
                  align: "center",
                  fontSize: 18,
                  fontWeight: 700,
                },
              },
              // textStyle:{
              //     color:'#f73205'
              // }
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
            // shading: "color",
            // realisticMaterial: {
            //   detailTexture: bg, // 纹理贴图
            //   textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            // },
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              // areaColor: "#000", // 地图板块的颜色
              opacity: 0.6, // 图形的不透明度 [ default: 1 ]
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#ffffff", // 图形描边的颜色。[ default: #333 ]
            },
            data: map3Ddata,
            viewControl: {
              distance: 110, // 地图视角 控制初始大小
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
          name: "homeDetail",
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
<style lang="scss" scoped>
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
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
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
      overflow: hid den;
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
