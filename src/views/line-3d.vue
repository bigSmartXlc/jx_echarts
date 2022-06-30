<template>
  <div class="container1">
    <div class="left">
      <ul>
        <li
          @click="garbageType = 10"
          :class="{ typeActive1: garbageType == 10 }"
        >
          <div><img src="../assets/images/line/2.png" alt="" srcset="" /></div>
          <div>回收</div>
        </li>
        <li
          @click="garbageType = 20"
          :class="{ typeActive2: garbageType == 20 }"
        >
          <div><img src="../assets/images/line/5.png" alt="" srcset="" /></div>
          <div>有害</div>
        </li>
        <li
          @click="garbageType = 30"
          :class="{ typeActive3: garbageType == 30 }"
        >
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div>餐厨</div>
        </li>
        <li
          @click="garbageType = 31"
          :class="{ typeActive4: garbageType == 31 }"
        >
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div>厨余</div>
        </li>
        <li
          @click="garbageType = 32"
          :class="{ typeActive5: garbageType == 32 }"
        >
          <div><img src="../assets/images/line/4.png" alt="" srcset="" /></div>
          <div>生鲜</div>
        </li>
        <li
          @click="garbageType = 40"
          :class="{ typeActive6: garbageType == 40 }"
        >
          <div><img src="../assets/images/line/3.png" alt="" srcset="" /></div>
          <div>其他</div>
        </li>
        <li
          @click="garbageType = 70"
          :class="{ typeActive7: garbageType == 70 }"
        >
          <div><img src="../assets/images/line/1.png" alt="" srcset="" /></div>
          <div>大件</div>
        </li>
        <li
          @click="garbageType = 60"
          :class="{ typeActive8: garbageType == 60 }"
        >
          <div><img src="../assets/images/line/6.png" alt="" srcset="" /></div>
          <div>园林</div>
        </li>
        <li
          @click="garbageType = 80"
          :class="{ typeActive9: garbageType == 80 }"
        >
          <div><img src="../assets/images/line/7.png" alt="" srcset="" /></div>
          <div>装修</div>
        </li>
      </ul>
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
      <div class="topbtn">
        <span :class="[{ active: table == 1 }, 'sort']" @click="table = 1"
          >地磅称重</span
        ><span :class="[{ active: table == 2 }, 'sort']" @click="table = 2"
          >车辆载重</span
        >
      </div>
      <div class="right" :key="rightkey">
        <div v-show="table == 1" class="tableone">
          <ul class="thead">
            <span style="width: 40px">序号</span>
            <span style="width: 145px">中转站名称</span>
            <span style="width: 80px">车牌</span>
            <span style="width: 110px">来源/去向</span>
            <span style="width: 65px">重量</span>
            <span style="width: 105px">时间</span>
          </ul>

          <VueSeamlessScroll
            :data="leftBottom1"
            :class-option="seamlessScrollOption"
            key="top"
            style="
              max-height: 720px;
              overflow: hidden;
              color: white;
              font-size: 18px;
              text-align: center;
            "
          >
            <div v-show="table == 1" class="table">
              <div
                class="tbody"
                v-for="(item, index) in leftBottom1"
                :key="index"
              >
                <span style="width: 40px">{{ index + 1 }}</span>
                <span style="width: 145px">{{ item.siteName }}</span>
                <span style="width: 80px">{{ item.weighName }}</span>
                <span style="width: 110px">{{ item.garbageSource }}</span>
                <span style="width: 65px">{{ item.weight3 }}</span>
                <span style="width: 105px">{{ item.time }}</span>
              </div>
            </div>
          </VueSeamlessScroll>
        </div>
        <div v-show="table == 2" class="tabletwo">
          <ul class="thead">
            <span style="width: 40px">序号</span>
            <span style="width: 145px">组织机构</span>
            <span style="width: 80px">车牌</span>
            <span style="width: 110px">运输次数</span>
            <span style="width: 110px">运输总重量</span>
            <span style="width: 105px">次均装重量</span>
            <span style="width: 120px">次均满载率(%)</span>
          </ul>
          <VueSeamlessScroll
            :data="leftBottom2"
            :class-option="seamlessScrollOption"
            key="bottom"
            style="
              max-height: 720px;
              overflow: hidden;
              color: white;
              font-size: 18px;
              text-align: center;
            "
          >
            <div class="table">
              <div
                class="tbody"
                v-for="(item, index) in leftBottom2"
                :key="index"
              >
                <span style="width: 40px">{{ index + 1 }}</span>
                <span style="width: 145px">{{ item.deptName }}</span>
                <span style="width: 80px">{{ item.weighName }}</span>
                <span style="width: 110px">{{ item.count }}</span>
                <span style="width: 110px">{{ item.sumWeight }}</span>
                <span style="width: 105px">{{ item.avgWeight }}</span>
                <span style="width: 120px">{{ item.avgRatio }}</span>
              </div>
            </div>
          </VueSeamlessScroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
import yls_json from "./ljpt_xz.json";
import anime from "animejs";
import VueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      rightkey: "rightkey",
      echarts,
      data: {},
      yls_json,
      table: 1,
      color: [
        "#316fb8",
        "#be1a10",
        "#31923b",
        "#31923b",
        "#31923b",
        "#333333",
        "#d1730f",
        "#6c9336",
        "#81703d",
      ],
      garbageType: 40,
      chart: null,
      lines_coord: [],
      scatter_coords: [],
      scatter_coord: [],
      selectcity: null,
      leftBottom1: [],
      leftBottom2: [],
      carrentDate: null,
      yesterday: null,
    };
  },
  watch: {
    garbageType(val) {
      this.getFeixian(val);
    },
    table(val) {
      var target = val === 1 ? ".tableone" : ".tabletwo";
      anime({
        targets: target,
        rotateY: 360,
        duration: 2000,
      });
      setTimeout(() => {
        this.rightkey += Math.random();
      }, 1000);
    },
  },
  computed: {
    seamlessScrollOption() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 7, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  created() {
    this.dateSwitch();
    this.getYeasterDay();
  },
  mounted() {
    this.getWieght();
    this.drawFeixian();
  },
  methods: {
    dateSwitch() {
      var date = new Date();
      var y = date.getFullYear();
      var M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.carrentDate = y + "-" + M + "-" + d;
    },
    getYeasterDay() {
      var time = new Date().getTime() - 24 * 60 * 60 * 1000;
      var yesterday = new Date(time);
      var y = yesterday.getFullYear();
      var M = yesterday.getMonth() + 1;
      M = M < 10 ? "0" + M : M;
      var d = yesterday.getDate();
      d = d < 10 ? "0" + d : d;
      this.yesterday = y + "-" + M + "-" + d;
    },
    //地磅称重 // 车辆载重
    getWieght() {
      this.$http({
        method: "post",
        url: "api/v1/jky/siBusinessWeight/selectStationJob",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          garbageType: this.garbageType.toString(),
          start: this.yesterday,
          end: this.carrentDate,
          pageNum: 1,
          pageSize: 20,
        },
      }).then((res) => {
        if (res.data.result) {
          this.leftBottom1 = res.data.result.list;
        }
      });
      this.$http({
        method: "post",
        url: "api/v1/jky/vehicleLoadAnalysis/selectVehicleLoadAnalysis",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          garbageType: this.garbageType.toString(),
          deptIdEnd: "499999999",
          startTime: this.yesterday,
          pageNum: 1,
          pageSize: 20,
        },
      }).then((res) => {
        console.log(2, res);
        if (res.data.result) {
          this.leftBottom2 = res.data.result;
        }
      });
    },
    //飞线
    getFeixian(garbageType) {
      this.$http({
        method: "post",
        url: "api/v1/jky/pjProjectGarbage",
        baseURL: "http://o792k95b.xiaomy.net/",
        data: {
          deptId: "400000000",
          garbageType: garbageType.toString(),
          deptIdEnd: "499999999",
        },
      })
        .then((res) => {
          this.lines_coord = [];
          this.scatter_coord = [];
          this.scatter_coords = [];
          if (typeof res.data === "string") {
            var result = eval("(" + res.data + ")").result;
            if (result) {
              Object.values(result).forEach((item) => {
                item.forEach((num) => {
                  if (
                    Number(num.lng) &&
                    Number(num.lat) &&
                    Number(num.factoryLng) &&
                    Number(num.factoryLat)
                  ) {
                    var start = [Number(num.lng), Number(num.lat), 0];
                    var end = [
                      Number(num.factoryLng),
                      Number(num.factoryLat),
                      0,
                    ];
                    var coords = [start, end];
                    this.lines_coord.push({ coords, name: "测试" });
                    this.scatter_coords.push(start, end);
                  }
                });
              });
              let set = new Set(this.scatter_coords);
              //通过Array.from()方法将 set 转化为数组 并赋给新数组
              this.scatter_coord = Array.from(set);
              setTimeout(() => {
                this.drawFeixian();
              }, 300);
            }
          } else if (typeof res.data === "object") {
            this.drawFeixian();
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    drawFeixian() {
      let data = yls_json;
      echarts.registerMap("yls", data);
      if (this.chart != null && this.chart != "" && this.chart != undefined) {
        this.chart.dispose(); //销毁
      }
      this.chart = echarts.init(document.getElementById("chart-box"));
      this.chart.showLoading();
      // var bg = document.getElementById("bgimg");
      // var linedata = [];
      const map3Ddata = yls_json.features.map((item) => {
        // if (item.properties.centroid) {
        //   linedata.push([...item.properties.centroid, 1]);
        // }
        const geoAreaName = item.properties.name; // geo文件中的地理名称
        return {
          name: geoAreaName,
          itemStyle: {
            color: "#324ca4",
          },
        };
      });
      const option = {
        title: {
          text: "当前位置-嘉兴市",
          left: 200,
          top: 160,
        },
        geo3D: {
          map: "yls",
          show: false,
          regionHeight: 2.9,
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
          //   symbol: "triangle",
          //   symbolSize: 30,
          //   itemStyle: {
          //     color: "#FF5722",
          //     opacity: 1,
          //   },
          //   data: linedata,
          // },
          {
            name: "yls",
            type: "map3D", // map3D / map
            zoom: 0.7,
            map: "yls",
            // regionHeight: -3,
            label: {
              show: true,
              distance: 0,
              formatter(param) {
                const city = param.name;
                return `{sty1|${city}}`;
              },
              rich: {
                sty1: {
                  color: "#fff801",
                  align: "center",
                  fontSize: 14,
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
              color: "#740be8",
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              // areaColor: "#000", // 地图板块的颜色
              opacity: 0.5, // 图形的不透明度 [ default: 1 ]
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
          {
            type: "lines3D",
            coordinateSystem: "geo3D",
            zlevel: 100,
            effect: {
              show: true,
              // period: 6,
              constantSpeed: 1,
              trailColor: "#f7f70b",
              trailOpacity: 1,
              trailWidth: 4,
              trailLength: 0.1,
            },
            lineStyle: {
              color: "#ffd303",
              width: 4,
              opacity: 0.2,
              curveness: 0.2,
            },
            emphasis: {
              lineStyle: {
                disabled: false,
                color: "#cb7f26",
              },
            },
            data: this.lines_coord,
          },
          {
            type: "scatter3D",
            coordinateSystem: "geo3D",
            zlevel: 1,
            effect: "symbol",
            symbolSize: "7",
            rippleEffect: {
              period: 6,
              brushType: "stroke",
              scale: 8,
            },
            emphasis: {
              itemStyle: {
                color: "#ff1863",
              },
              label: {
                show: true,
              },
            },
            itemStyle: {
              color: "#FF5722",
              opacity: 1,
            },
            //"lat": "30.700509810427338",
            // "lng": "121.25209824179306",
            data: this.scatter_coord || [
              "121.25209824179306",
              "30.700509810427338",
              "0",
            ],
          },
        ],
      };
      this.chart.clear();
      this.chart.hideLoading();
      this.chart.setOption(option);
      this.chart.on("click", (res) => {
        this.$router.push({
          name: "line3d-area",
          query: {
            areaName: res.name,
            garbageType: this.garbageType,
          },
        });
        // this.$router.push({
        //   path: `/line3d-area/${res.name}`,
        // });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.typeActive1 {
  color: #316fb8;
}
.typeActive1:after,
.typeActive2:after,
.typeActive3:after,
.typeActive4:after,
.typeActive5:after,
.typeActive6:after,
.typeActive7:after,
.typeActive8:after,
.typeActive9:after {
  content: "";
  display: inline-block;
  border-bottom: solid 10px red;
  border-left: solid 10px transparent;
  border-right: solid 10px transparent;
  border-top: 0;
}
.typeActive2 {
  color: #be1a10;
}
.typeActive3 {
  color: #31923b;
}
.typeActive4 {
  color: #31923b;
}
.typeActive5 {
  color: #31923b;
}
.typeActive6 {
  color: #333333;
}
.typeActive7 {
  color: #d1730f;
}
.typeActive8 {
  color: #6c9336;
}
.typeActive9 {
  color: #81703d;
}
.container1 {
  height: calc(100% - 110px);
  font-weight: 700%;
  width: 100%;
  .left {
    z-index: 100;
    width: 70px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.13);
    position: absolute;
    left: 0;
    top: 100px;
    margin: 0 10px;
    height: calc(100% - 125px);
    border-radius: 5px;
    ul {
      height: 100%;
      padding: 0;
      margin: 0;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      li {
        cursor: pointer;
      }
    }
    img {
      width: 34px;
      height: 34px;
    }
  }
  #chart-box {
    display: inline-block;
    position: absolute;
    left: 0px;
    top: -60px;
    width: 80%;
    height: 100%;
  }
  .topbtn {
    margin-bottom: 5px;
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    line-height: 50px;
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
    height: 80%;
    .right {
      border: solid 1px rgb(11, 100, 233);
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      z-index: 10;
      height: 100%;
      overflow: hidden;
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
        color: #03a7f0;
      }
      .table {
        width: 100%;
        .tbody {
          width: 100%;
          height: 70px;
          line-height: 70px;
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
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
  }
}
</style>
