<template>
  <div id="chart-box" style="height: 100%; width: 100%"></div>
</template>

<script>
import * as echarts from "echarts/lib/echarts.js";
import "echarts-gl";
import yls_json from "./jx.json";
export default {
  data() {
    return { echarts, data: {}, yls_json };
  },
  mounted() {
    // console.log(yls_json);
    let data = yls_json;
    echarts.registerMap("yls", data);
    const chart = echarts.init(document.getElementById("chart-box"));
    // const coord = data.features.map((val) => {
    //   return {
    //     name: val.properties.name,
    //     value: val.properties.center.concat(1),
    //     symbolSize: 8,
    //     itemStyle: {
    //       normal: {
    //         color: "#F58158",
    //       },
    //     },
    //   };
    // });
    let coord = [
      {
        name: "榆北曹家滩矿业",
        value: [120.862654, 30.607652, 1],
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#F58158",
          },
        },
      },
      {
        name: "榆北煤业",
        value: [120.611522, 30.602797, 1],
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#F58158",
          },
        },
      },
      {
        name: "陕西小保当矿业有限公司",
        value: [120.776508, 30.943419, 1],
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: "#F58158",
          },
        },
      },
    ];
    let lines_coord = [];
    coord.forEach((v, index) => {
      index > 0 &&
        lines_coord.push({
          coords: [v.value, coord[0].value],
        });
    });
    lines_coord = [
      {
        coords: [
          [120.862654, 30.607652],
          [120.776508, 30.943419],
        ],
      },
      {
        coords: [
          [120.611522, 30.602797],
          [120.776508, 30.943419],
        ],
      },
      {
        coords: [
          [120.776508, 30.943419],
          [120.862654, 30.607652],
        ],
      },
      {
        coords: [
          [120.776508, 30.943419],
          [120.611522, 30.602797],
        ],
      },
    ];
    //地市取简称
    // data.features.forEach(v => {
    //     v.properties.name = v.properties.name.indexOf('版纳')>-1 ?v.properties.name.substr(0,4) : v.properties.name.substr(0,2);
    // })

    const option = {
      title: {
        text: "嘉兴市",
      },
      geo: {
        map: "yls",
        zoom: 1,
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: "#43D0D6",
            },
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(255,209,163, .5)", //区域边框颜色
            areaColor: "rgba(73,86,166,.1)", //区域颜色
            borderWidth: 0.5, //区域边框宽度
            shadowBlur: 5,
            shadowColor: "rgba(107,91,237,.7)",
          },
          emphasis: {
            borderColor: "#FFD1A3",
            areaColor: "rgba(102,105,240,.3)",
            borderWidth: 1,
            shadowBlur: 5,
            shadowColor: "rgba(135,138,255,.5)",
          },
        },
      },
      series: [
        {
          name: "地点",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke",
          },
          label: {
            normal: {
              show: true,
              formatter: "{b}",
              position: "right",
              textStyle: {
                color: "#fff",
                fontSize: 9,
              },
            },
          },
          symbolSize: 8,
          showEffectOn: "render",
          itemStyle: {
            normal: {
              color: "#46bee9",
            },
          },
          data: coord.slice(0, 3),
        },
        // {
        //   type: "effectScatter",
        //   coordinateSystem: "geo",
        //   zlevel: 15,
        //   symbolSize: 12,
        //   rippleEffect: {
        //     period: 6,
        //     brushType: "stroke",
        //     scale: 8,
        //   },
        //   itemStyle: {
        //     color: "#FF5722",
        //     opacity: 1,
        //   },
        //   data: lines_coord.slice(0, 4),
        // },
        {
          type: "lines",
          coordinateSystem: "geo",
          zlevel: 15,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: "pin",
            symbolSize: 3,
            trailLength: 0,
          },
          lineStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#58B3CC",
                  },
                  {
                    offset: 1,
                    color: "#F58158",
                  },
                ],
                false
              ),
              width: 2,
              opacity: 0.4,
              curveness: 0.6,
            },
          },
          data: lines_coord.slice(0, 4),
        },
      ],
    };
    chart.setOption(option);
    // chart.on("click", function (params) {
    //   console.log(params);
    // });
  },
};
</script>

<style></style>
