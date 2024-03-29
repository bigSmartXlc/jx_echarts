<template>
  <div class="chart" id="chart" style="width: 1200px; height: 900px"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";
export default {
  data() {
    return {
      chart: null,
      options: {},
      bg: "",
      mapData: {
        geoCoordMap: {
          广东省: [113.429919, 23.334643, 50],
          云南省: [101.485106, 25.008643, 50],
          辽宁省: [122.604994, 41.299712, 50],
        },
        projectData: [
          {
            name: "广东省",
            value: (Math.random() * 300).toFixed(2),
            projectName: "OA系统",
          },
          {
            name: "云南省",
            value: (Math.random() * 300).toFixed(2),
            projectName: "项目管理系统",
          },
          {
            name: "辽宁省",
            value: (Math.random() * 300).toFixed(2),
            projectName: "人工智能园区",
          },
        ],
        setting: {
          top: "0%",
          right: "0%",
          bottom: "-20%",
          distance: 90,
          alpha: 50,
          beta: 5,
          regionHeight: 6,
        },
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 适配不同尺寸浏览器，避免地图上的字号过小或过大
    getSize(res) {
      const clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      if (!clientWidth) return;
      const fontSize = 100 * (clientWidth / 1920);
      return res * fontSize;
    },
    // 转化已有数据到地图上显示的配置数据
    convertData(data) {
      const res = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        const geoCoord = this.mapData.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
            projectName: data[i].projectName,
            label: {
              show: true,
              position: "top",
              distance: -5,
              formatter(param) {
                return `{sty1|${param.data.projectName}}`;
              },
              rich: {
                sty1: {
                  padding: this.getSize(0.07),
                  backgroundColor: "rgba(7, 28, 38, 0.7)",
                  borderWidth: 1,
                  borderColor: "#FF771A",
                  borderRadius: 2,
                  fontSize: this.getSize(0.14),
                },
              },
              textStyle: {
                color: "#ffffff",
              },
            },
            emphasis: {
              label: {
                show: true,
                position: "top",
                distance: 0,
                formatter(param) {
                  return `{sty1|${param.data.projectName}}`;
                },
                rich: {
                  sty1: {
                    padding: 7,
                    backgroundColor: "rgba(7, 28, 38, 0.7)",
                    borderWidth: 1,
                    borderColor: "#FF771A",
                    borderRadius: 2,
                    fontSize: this.getSize(0.14),
                  },
                },
                textStyle: {
                  color: "#ffffff",
                },
              },
            },
          });
        }
      }
      return res;
    },
    // 获取图表配置
    getOptions() {
      const options = {
        tooltip: {
          show: false,
          trigger: "item",
        },
        textStyle: {
          color: "#ffffff", // 高亮时标签颜色变为 白色
          fontSize: 6, // 高亮时标签字体 变大
        },
        // 地图主要配置
        geo3D: {
          show: true,
          map: "map",
          boxHeight: 10,
          shading: "realistic",
          label: {
            // 标签的相关设置
            show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
            distance: 20,
            formatter(param) {
              const city = param.name.substr(0, 2);
              return `{sty1|${city}}`;
            },
            rich: {
              sty1: {
                color: "#ffffff",
                fontSize: this.getSize(0.14),
                align: "center",
              },
            },
            textStyle: {
              // 标签的字体样式
              color: "#ffffff", // 地图初始化区域字体颜色
              opacity: 1, // 字体透明度
            },
          },
          itemStyle: {
            // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
            color: "#FE9D0B", // 地图板块的颜色
            // color: '#00F6FF',
            opacity: 1, // 图形的不透明度 [ default: 1 ]
            borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
            borderColor: "#A74A11", // 图形描边的颜色。[ default: #333 ]
          },
          emphasis: {
            // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
            label: {
              // label高亮时的配置
              show: true,
              textStyle: {
                color: "#fff", // 高亮时标签颜色变为 白色
                fontSize: this.getSize(0.15), // 高亮时标签字体 变大
              },
            },
          },
          light: {
            // 光照相关的设置。在 shading 为 'color' 的时候无效。
            // 光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
            main: {
              // 场景主光源的设置，在 globe 组件中就是太阳光。
              color: "#ffeeee", // 主光源的颜色。[ default: #fff ]
              intensity: 1.1, // 主光源的强度。[ default: 1 ]
              shadow: true, // 主光源是否投射阴影。默认关闭。 开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
              alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
              beta: 10, // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
            },
            ambient: {
              // 全局的环境光设置。
              color: "#fff", // 环境光的颜色。[ default: #fff ]
              intensity: 0.1, // 环境光的强度。[ default: 0.2 ]
            },
          },
          viewControl: {
            projection: "perspective",
          },
        },
        series: [
          // 叠加地图上需要显示的数据，插牌
          {
            type: "scatter3D",
            name: "scatter3D",
            coordinateSystem: "geo3D",
            symbol:
              "path://M262.775253 0m64 0l0 0q64 0 64 64l0 896q0 64-64 64l0 0q-64 0-64-64l0-896q0-64 64-64Z",
            symbolSize: [4, 28],
            itemStyle: {
              color: "#FF771A",
              opacity: 1,
            },
            data: this.convertData(this.mapData.projectData),
          },
          // 使用和geo3d的配置数据，叠加一层暗沉的厚度
          {
            name: "map3D", // series名称
            type: "map3D", // series图表类型
            map: "map",
            label: {
              // 标签的相关设置
              show: false, // (地图上的城市名称)是否显示标签 [ default: false ]
            },
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              color: "#95830A", // 地图板块的颜色
              opacity: 1, // 图形的不透明度 [ default: 1 ]
              borderWidth: 0, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以清晰的区分每个区域
              borderColor: "#A74A11", // 图形描边的颜色。[ default: #333 ]
            },
            emphasis: {
              // 鼠标hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
              label: {
                // label高亮时的配置
                show: false,
              },
            },
            viewControl: {
              projection: "perspective",
            },
          },
        ],
      };
      return options;
    },
    // 初始化图标
    init() {
      const that = this;
      if (this.chart) {
        this.chart.clear();
      }
      // 加载贴图材质图片
      // 初始化
      this.chart = echarts.init(document.getElementById("chart"));
      this.chart.showLoading({
        maskColor: "rgba(0, 0, 0, 0.2)",
      });
      // 获取地图数据
      this.$http.get("china.json").then((json) => {
        echarts.registerMap("map", json.data);
        this.chart.hideLoading();
        this.options = this.getOptions();
        this.chart.setOption(this.options);
        setTimeout(() => {
          window.addEventListener("resize", () => {
            that.chart.resize();
            that.init();
          });
        }, 200);
      });
    },
  },
};
</script>

<style></style>
