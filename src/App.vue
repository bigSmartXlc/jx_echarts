<template>
  <div id="app">
    <div class="toptitle">
      <div class="xitong" @click="xitongclick(true)">
        <h4 style="color: #fff">系统管理</h4>
        <img src="./assets/images/xitong.png" alt="" />
        <img src="./assets/images/xitong.svg" alt="" />
      </div>
      <div class="center-title">
        <router-link to="/" class="topleft menu"
          ><span>规划管理</span></router-link
        >
        <router-link to="/scatter3D" class="topleft menu"
          ><span>分类投放</span></router-link
        >
        <router-link to="/line3d" class="topleft menu"
          ><span>过程监管</span></router-link
        >
        <div class="topcenter">
          <img src="./assets/images/u338.svg" alt="" srcset="" />
          <span>嘉兴市生活垃圾分类信息化监管平台</span>
          <!-- <span>测试</span> -->
        </div>
        <router-link to="/chuzhi" class="topright menu"
          ><span>处置利用</span></router-link
        >
        <router-link to="/about" class="topright menu"
          ><span>辅助决策</span></router-link
        >
        <router-link to="/gonggong" class="topright menu"
          ><span>公共服务</span></router-link
        >
      </div>
      <div class="yujing" @click="yujingClick">
        <h4 style="color: red">预警</h4>
        <img src="./assets/images/yujing.png" alt="" />
        <img src="./assets/images/yujing.svg" alt="" />
      </div>
    </div>
    <router-view style="margin: 0 10px" />
    <div v-show="xitongShow" class="xitongDialog">
      <div class="titleContainer">
        <div class="videoPoint">
          <span></span><span></span><span></span> <span></span><span></span
          ><span></span>
        </div>
        <div class="videoTitle">系统管理</div>
        <div>
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
        </div>
      </div>
      <div id="main"></div>
      <div class="xitongContent">
        <div class="mapcontent">
          <div class="row row0">
            <div class="content content2">
              <img src="./assets/images/center.svg" alt="" srcset="" />
              <p>省平台</p>
              <span>浙江省垃圾分类监管平台</span>
            </div>
          </div>
          <div class="row row1">
            <div class="content content1">
              <img src="./assets/images/l1.svg" alt="" srcset="" />
              <p>公安局</p>
              <span>公安系统</span>
            </div>
            <div class="content content3">
              <img src="./assets/images/l1.svg" alt="" srcset="" />
              <p>商务局</p>
              <span> 商务局系统</span>
            </div>
          </div>
          <div class="row row2">
            <div class="content content4">
              <img src="./assets/images/l2.svg" alt="" srcset="" />
              <p>执法局</p>
              <span>执法系统</span>
            </div>
            <div class="content content5">
              <img src="./assets/images/l2.svg" alt="" srcset="" />
              <p>绿盾公司</p>
              <span>绿盾公司系统</span>
            </div>
          </div>
          <div class="row row3">
            <div class="content content6">
              <img src="./assets/images/l3.svg" alt="" srcset="" />
              <p>生态环境局</p>
              <span>生态环境局系统</span>
            </div>
            <div class="content content7">
              <img src="./assets/images/l3.svg" alt="" srcset="" />
              <p>小微平台</p>
              <span>小微平台系统</span>
            </div>
          </div>
          <div class="arealist">
            <div v-for="item in btnlist3" :key="item.rowId">
              <div class="areaItem">
                <img src="./assets/images/xitongbg1.png" alt="" />
                <img src="./assets/images/xitongbg2.svg" alt="" />
                <img src="./assets/images/xitongbg3.svg" alt="" />
                <img src="./assets/images/xitongbg4.png" alt="" />
                <span class="areaName">{{ item.deptName }}</span>
              </div>
            </div>
          </div>
          <div class="videoOff" @click="xitongclick(false)">关闭</div>
        </div>
      </div>
    </div>
    <div v-show="yujingShow" class="yujingDialog">
      <div class="titleContainer">
        <div class="videoPoint">
          <span></span><span></span><span></span> <span></span><span></span
          ><span></span>
        </div>
        <div class="videoTitle">预警</div>
        <div>
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
        </div>
      </div>
      <ul>
        <li
          v-for="(item, index) in yujingList"
          :key="index"
          :class="{
            level1: item.level == 1,
            level2: item.level == 2,
            level3: item.level == 3,
          }"
          @click="yjitemClick(item)"
        >
          <img src="./assets/images/gth.svg" alt="" srcset="" width="20" />
          <span>{{ item.content }}</span>
        </li>
      </ul>
      <div class="videoOff" @click="yujingClick">关闭</div>
    </div>
    <div v-show="solutionShow" class="solution">
      <div class="titleContainer">
        <div class="videoPoint">
          <span></span><span></span><span></span> <span></span><span></span
          ><span></span>
        </div>
        <div class="videoTitle">解决方案</div>
        <div>
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
          <img src="./assets/images/yjt.svg" alt="" srcset="" />
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
import * as echarts from "echarts/lib/echarts.js";
import "echarts-gl";
import yls_json from "./views/ljpt_xz.json";
export default {
  data() {
    return {
      solution: "",
      solutionShow: false,
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
      yujingList: [
        {
          level: 1,
          content: "南湖区有十三个摄像头连续七天处于异常状态",
          solution: "已安排人逐个排查维修，限期完成",
        },
        { level: 1, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 1, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 2, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 2, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 2, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 3, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 3, content: "南湖区有十三个摄像头连续七天处于异常状态" },
        { level: 3, content: "南湖区有十三个摄像头连续七天处于异常状态" },
      ],
    };
  },
  computed: {
    yujingShow: {
      get() {
        return this.$store.state.yujingDialogShow;
      },
    },
    xitongShow: {
      get() {
        return this.$store.state.xitongDialogShow;
      },
    },
  },
  mounted() {
    this.getYuJing();
  },
  methods: {
    map() {
      // 初始化图表
      let data = yls_json;
      echarts.registerMap("yls", data);
      var myChart = echarts.init(document.getElementById("main"));
      myChart.showLoading();
      var linedata = [];
      const map3Ddata = yls_json.features.map((item) => {
        if (item.properties.centroid) {
          linedata.push([...item.properties.centroid, 0]);
        }
        const geoAreaName = item.properties.name; // geo文件中的地理名称
        return {
          name: geoAreaName,
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
            symbol:
              "path://M201.142857 58.514286v658.285714s131.657143-160.914286 336.457143-73.142857c80.457143 43.885714 153.6 109.714286 277.942857 109.714286 124.342857 0 204.8-73.142857 204.8-73.142858V43.885714s-182.857143 182.857143-409.6 29.257143C552.228571 29.257143 449.828571-14.628571 369.371429 7.314286 281.6 29.257143 201.142857 58.514286 201.142857 58.514286M54.857143 1024c-29.257143 0-51.2-21.942857-51.2-58.514286V51.2C3.657143 21.942857 25.6 0 54.857143 0s51.2 21.942857 51.2 51.2v914.285714c7.314286 36.571429-14.628571 58.514286-51.2 58.514286z",
            symbolSize: 30,
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
              opacity: 0.6, // 图形的不透明度 [ default: 1 ]
              borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#ffffff", // 图形描边的颜色。[ default: #333 ]
            },
            data: map3Ddata,
            viewControl: {
              distance: 150, // 地图视角 控制初始大小
              rotateSensitivity: 1, // 旋转
              zoomSensitivity: 1, // 缩放
            },
          },
        ],
      };
      myChart.hideLoading();
      myChart.setOption(option);
    },
    yjitemClick(item) {
      this.solution = item.solution;
      this.solutionShow = true;
    },
    getYuJing() {
      this.$http({
        method: "get",
        url: "api/v1/jky/getAiWarningPn",
        baseURL: "http://o792k95b.xiaomy.net/",
        params: {
          deptId: "400000000",
          deptIdEnd: "499999999",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    yujingClick() {
      this.$store.commit("TOGGLE_YUJING", !this.$store.state.yujingDialogShow);
    },
    xitongclick(val) {
      this.$store.commit("TOGGLE_XITONG", val);
      if (val) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.map();
          });
        }, 2000);
      }
    },
  },
};
</script>
<style lang="scss" scopd>
.solution {
  position: fixed;
  left: 200px;
  top: 100px;
  width: 70%;
  height: 70% !important;
  background: #697196;
  opacity: 0.9;
  z-index: 300;
  .solutionContent {
    height: 500px;
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
  background: #183bd8;
  display: flex;
  justify-content: space-between;
  z-index: 500;
  .videoTitle {
    height: 50px;
    min-width: 200px;
    font-weight: 700;
    color: aliceblue;
    line-height: 50px;
    background-image: url("./assets/images/videotitle.svg");
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
.videoOff {
  cursor: pointer;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  font-weight: 700;
  color: aliceblue;
  line-height: 50px;
  background-image: url("./assets/images/videoOff.svg");
  background-size: cover;
  z-index: 500;
}
.xitongDialog {
  position: fixed;
  left: 200px;
  top: 50px;
  z-index: 200;
  width: 70%;
  height: 700px;
  background: #4d5da3;
  #main {
    width: 100%;
    height: calc(100% - 100px);
    z-index: 250;
  }
  .xitongContent {
    position: absolute;
    top: 50px;
    width: 100%;
    .mapcontent {
      margin: 10px 100px;
      z-index: 300;
      .arealist {
        display: flex;
        justify-content: space-between;
        .areaItem {
          position: relative;
          width: 120px;
          height: 120px;
          .areaName {
            position: absolute;
            bottom: 0;
          }
          img {
            position: absolute;
            left: 0;
          }
          img:first-child {
            z-index: 4;
            width: 30px;
            height: 30px;
            margin: 45px 0 0 45px;
          }
          img:nth-child(2) {
            z-index: 3;
            width: 60px;
            height: 60px;
            margin: 30px 0 0 30px;
          }
          img:nth-child(3) {
            z-index: 2;
            width: 90px;
            height: 90px;
            margin: 15px 0 0 15px;
          }
          img:nth-child(4) {
            z-index: 1;
            width: 120px;
            height: 120px;
          }
        }
      }
      .row0 {
        display: block;
        height: 50px;
        span {
          top: 40px;
          color: #ffffff;
          left: 100px;
          width: 250px;
        }
        p {
          left: 100px;
          color: #00ece4;
        }
      }
      .row1,
      .row3,
      .row2 {
        height: 120px;
        display: flex;
        justify-content: space-between;
      }
      .row {
        width: 100%;
        .content3 {
          margin-right: 20px;
        }
        .content1 {
          margin-left: 20px;
        }
        .content3,
        .content5,
        .content7 {
          img {
            right: 0;
            transform: rotateY(180deg);
            -webkit-transform: rotateY(180deg); /* Safari and Chrome */
          }
          span {
            top: 40px;
            color: #ffffff;
            left: 150px;
            width: 250px;
          }
          p {
            left: 150px;
            color: #00ece4;
          }
        }
        .content1,
        .content4,
        .content6 {
          img {
            left: 0;
          }
          span {
            top: 40px;
            color: #ffffff;
            left: 0;
            width: 250px;
          }
          p {
            left: 20px;
            color: #00ece4;
          }
        }
        .content2 {
          margin: 0 auto !important;
          img {
            left: 50%;
            margin-left: -130px;
          }
        }
        .content {
          margin-top: 10px;
          position: relative;
          width: 35%;
          img {
            position: absolute;
            width: 300px;
            z-index: 300;
          }
          p,
          span {
            position: absolute;
            z-index: 310;
          }
        }
      }
    }
  }
}
.yujingDialog {
  position: fixed;
  left: 200px;
  top: 100px;
  z-index: 200;
  width: 70%;
  height: 70% !important;
  background: #4d5da3;
  ul {
    padding-right: 40px;
    height: 500px;
    overflow: auto;
    li {
      height: 50px;
      line-height: 50px;
      list-style: none;
      color: #ffffff;
      font-size: 25px;
      font-weight: 800;
      text-align: left;
      vertical-align: middle;
      box-sizing: border-box;
      margin-bottom: 5px;
      padding-left: 5px;
      cursor: pointer;
      img {
        margin-right: 5px;
      }
    }
    .level1 {
      background: rgba(103, 36, 44, 0.75);
    }
    .level2 {
      background: rgba(201, 161, 84, 0.8);
    }
    .level3 {
      background: rgba(29, 45, 64, 1);
    }
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
  background: url("./assets/images/u1.png");
  .toptitle {
    .xitong,
    .yujing {
      cursor: pointer;
      width: 5%;
      height: 90px;
      position: absolute;
      top: 0;
      img {
        width: 100%;
        top: 25px;
        left: 0;
        width: 90px;
        height: 90px;
        position: absolute;
      }
      img:first-child {
        z-index: 1;
      }
      img:last-child {
        z-index: 2;
      }
    }
    .xitong {
      left: 0;
    }
    .yujing {
      right: 0;
    }
  }
}

.center-title {
  margin: 0 auto;
  width: 90%;
  height: 90px;
  font-weight: normal;
  overflow: hidden;
  position: relative;
  z-index: 2;
  .menu {
    display: inline-block;
    min-width: 100px;
  }
  .topleft {
    margin-left: 20px;
  }
  .topright {
    margin-right: 20px;
  }
}
.center-title > a {
  background: transparent;
  margin-top: 21px;
  border: solid 1px #0c66a5;
  color: #ffffff;
  font-weight: 800;
  line-height: 40px;
  height: 40px;
  min-width: 120px;
  text-align: center;
}
.center-title > .topleft {
  transform: skewX(35deg);
}
.center-title > .topleft > span {
  display: inline-block;
  transform: skewX(-35deg);
}
.center-title > .topcenter {
  background: linear-gradient(0deg, #bff5ff 0%, #00ece4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  font-size: xx-large;
  border: none;
  height: 81px;
  padding-top: 10px;
  margin-top: 10px;
  background-size: contain;
  display: inline-block;
  width: 40%;
  min-width: 500px;
}
.center-title > .topcenter > img {
  position: absolute;
  left: 0;
  top: -10px;
  height: 100%;
  width: 100%;
}
.center-title > .topright {
  transform: skewX(-35deg);
}
.center-title > .topright > span {
  display: inline-block;
  transform: skewX(35deg);
}
</style>
