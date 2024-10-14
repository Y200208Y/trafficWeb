<template>
  <div id="index_container">
    <!-- 1.顶部 -->
    <div id="header_container">
      <div class="header_font" style="transform:translateX(95px)">
        <span>深圳市</span>
      </div>
      <div id="header_title"><span>智慧城市交通预测平台验证系统</span></div>
      <div class="header_font" style="transform:translateX(-90px)">
        <span>{{this.current_time}}</span>
      </div>
    </div>
    <!-- 2.中部 -->
    <div id="center_container">
      <!-- 2.1 左部信息框（由上到下）-->
      <div id="center_left_container">
        <!-- 2.1.1 左1-->
        <div class="border_win">
          <!-- 四个角的边框效果 -->
          <div class="border_corner border_corner_left_top"> </div>
          <div class="border_corner border_corner_right_top"></div>
          <div class="border_corner border_corner_left_bottom"></div>
          <div class="border_corner border_corner_right_bottom"></div>
          <!-- 这里是内容 -->
          <div class="sub_left">
            <div class="sub_title">
              <i class="el-icon-cpu"></i>
              <span>设备接入</span>
            </div>
            <div class="sub_data">
              <div id="device">
                <div class="device_line">
                  <div class="device_one red">
                    <span class="device_title">交通摄像头</span>
                    <span class="device_data">4829个</span>
                  </div>
                  <div class="device_one yellow"
                    style="border-left:.125rem solid #085073; border-right:.125rem solid #085073;">
                    <span class="device_title">公共交通</span>
                    <span class="device_data">37379辆</span>
                  </div>
                  <div class="device_one blue">
                    <span class="device_title">移动终端</span>
                    <span class="device_data">756万个</span>
                  </div>
                </div>
                <div class="device_line" style="border-top:.125rem solid #085073">
                  <div class="device_one green">
                    <span class="device_title">交警</span>
                    <span class="device_data">2034人</span>
                  </div>
                  <div class="device_one lightblue"
                    style="border-left:.125rem solid #085073; border-right:.125rem solid #085073;">
                    <span class="device_title">气象</span>
                    <span class="device_data">3859个</span>
                  </div>
                  <div class="device_one">
                    <span class="device_title"></span>
                    <span class="device_data"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2.1.2 左2-->
        <div class="border_win">
          <!-- 四个角的边框效果 -->
          <div class="border_corner border_corner_left_top"></div>
          <div class="border_corner border_corner_right_top"></div>
          <div class="border_corner border_corner_left_bottom"></div>
          <div class="border_corner border_corner_right_bottom"></div>
          <!-- 这里是内容 -->
          <div class="sub_left">
            <div class="sub_title">
              <i class="el-icon-odometer"></i>
              <span>当前拥堵指数</span>
            </div>
            <div class="sub_data" id="congestion_index_2"></div>
          </div>
        </div>
        <!-- 2.1.3 左3-->
        <div class="border_win">
          <!-- 四个角的边框效果 -->
          <div class="border_corner border_corner_left_top"></div>
          <div class="border_corner border_corner_right_top"></div>
          <div class="border_corner border_corner_left_bottom"></div>
          <div class="border_corner border_corner_right_bottom"></div>
          <!-- 这里是内容 -->
          <div class="sub_left">
            <div class="sub_title">
              <i class="el-icon-truck"></i>
              <span>城市车流量预测</span>
            </div>
            <div class="sub_data" id="traffic_flow"></div>
          </div>
        </div>
      </div>
      <!-- 2.2 中部信息框-->
      <div id="center_center_container">
        <!-- 2.2.1 统计数据 -->
        <div id="center_data">
          <!-- 2.2.1.1 第一行 -->
          <div class="data_line">
            <div class="data_one">
              <span class="data_title">今日累计车流量</span>
              <div class="data lightyellow">
                <span class="data_num">123.13</span>
                <span class="data_unit">(万辆)</span>
              </div>
            </div>
            <div class="data_one">
              <span class="data_title">当前车流量</span>
              <div class="data lightgreen">
                <span class="data_num">8.12</span>
                <span class="data_unit">(万辆)</span>
              </div>
            </div>
          </div>
          <!-- 2.2.1.2 第二行 -->
          <div class="data_line">
            <div class="data_one">
              <span class="data_title">今日累计事件</span>
              <div class="data blue">
                <span class="data_num">32</span>
                <span class="data_unit">(起)</span>
              </div>
            </div>
            <div class="data_one">
              <span class="data_title">未解决事件</span>
              <div class="data lightred">
                <span class="data_num">17</span>
                <span class="data_unit">(起)</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 2.2.2 地图 -->
        <div id="Map_container">
          <Map ref="map"></Map>
        </div>
      </div>
      <!-- 2.3 右部信息框-->
      <div id="center_right_container">
        <!-- 2.3.1 右1 -->
        <div class="border_win" style="flex: 4">
          <!-- 四个角的边框效果 -->
          <div class="border_corner border_corner_left_top"></div>
          <div class="border_corner border_corner_right_top"></div>
          <div class="border_corner border_corner_left_bottom"></div>
          <div class="border_corner border_corner_right_bottom"></div>
          <!-- 这里是内容 -->
          <div id="right_top">
            <div class="sub_title">
              <i class="el-icon-user"></i>
              <span>公共交通乘客流预测</span>
            </div>
            <div id="flow_graph"></div>
          </div>
        </div>
        <!-- 2.3.2 右2 -->
        <div class="border_win" style="flex: 6">
          <!-- 四个角的边框效果 -->
          <div class="border_corner border_corner_left_top"></div>
          <div class="border_corner border_corner_right_top"></div>
          <div class="border_corner border_corner_left_bottom"></div>
          <div class="border_corner border_corner_right_bottom"></div>
          <!-- 这里是内容 -->
          <div id="right_bottom">
            <div class="sub_title">
              <i class="el-icon-s-data"></i>
              <span>TOP 10 POI访问量排行</span>
            </div>
            <div id="POI_table"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 3.底部 -->
    <div id="fonter_container">
      <el-button round plain @click="to_more()">查看更多>></el-button>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import Map from '@/components/gaode_map.vue'
export default {
  components: { Map },
  data() {
    return {
      current_time:''
    }
  },

  mounted() {
    
    var myChart1 = echarts.init(document.getElementById('congestion_index_2'));
    var option1 = {
      series: [
        {
          type: 'gauge',
          startAngle: 240,
          endAngle: 60,
          min: 0,
          max: 10,
          radius: '70%',
          center: ['21%', '55%'],
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [0.2, '#99cc00'],
                [0.4, '#99ff33'],
                [0.6, '#ffff00'],
                [0.8, '#ff6600'],
                [1, '#ff3300']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'inherit'
            }
          },
          axisTick: {
            distance: -5,
            length: 2,
            lineStyle: {
              color: 'inherit',
              width: 0
            }
          },
          splitLine: {
            distance: -5,
            length: 5,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          axisLabel: {
            color: 'inherit',
            distance: 10,
            fontSize: 10
          },
          detail: {
            valueAnimation: true,
            fontSize: 15,
            color: 'inherit'
          },
          data: [
            {
              value: 1,
            }
          ]
        },
        {
          type: 'gauge',
          startAngle: 240,
          endAngle: 300,
          min: 0,
          max: 10,
          center: ['50%', '50%'],
          radius: '90%',
          axisLine: {
            lineStyle: {
              width: 10,
              color: [
                [0.2, '#99cc00'],
                [0.4, '#99ff33'],
                [0.6, '#ffff00'],
                [0.8, '#ff6600'],
                [1, '#ff3300']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'inherit'
            }
          },
          axisTick: {
            distance: -10,
            length: 3,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          splitLine: {
            distance: -10,
            length: 10,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          axisLabel: {
            color: 'inherit',
            distance: 10,
            fontSize: 10
          },
          detail: {
            valueAnimation: true,
            fontSize: 20,
            color: 'inherit'
          },
          data: [
            {
              value: 7
            }
          ]
        },
        {
          type: 'gauge',
          startAngle: 120,
          endAngle: 320,
          min: 0,
          max: 10,
          radius: '70%',
          center: ['79%', '55%'],
          axisLine: {
            lineStyle: {
              width: 5,
              color: [
                [0.2, '#99cc00'],
                [0.4, '#99ff33'],
                [0.6, '#ffff00'],
                [0.8, '#ff6600'],
                [1, '#ff3300']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'inherit'
            }
          },
          axisTick: {
            distance: -5,
            length: 2,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          splitLine: {
            distance: -5,
            length: 5,
            lineStyle: {
              color: '#fff',
              width: 0
            }
          },
          axisLabel: {
            color: 'inherit',
            distance: 10,
            fontSize: 10
          },
          detail: {
            valueAnimation: true,
            fontSize: 15,
            color: 'inherit'
          },
          data: [
            {
              value: 9
            }
          ]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    window.addEventListener("resize", function () {
      myChart1.resize();
    });


    var myChart2 = echarts.init(document.getElementById('traffic_flow'));
    var option2 = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#dddc6b"
          }
        }
      },
      legend: {
        top: "0%",
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12"
        }
      },
      grid: {
        left: "10",
        top: "30",
        right: "10",
        bottom: "10",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: "#00FFFF"
            }
          },

          data: [
            "00:00",
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "02:30",
            "03:00",
            "03:30",
            "04:00",
            "04:30",
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",
          ]
        },
        {
          axisPointer: { show: false },
          axisLine: { show: false },
          position: "bottom",
          offset: 20
        }
      ],
      yAxis: [
        {
          type: "value",
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }
        }
      ],
      series: [
        {
          name: "车流量",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {

          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1, 132, 213, 0.4)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1, 132, 213, 0.1)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)"
            }
          },
          itemStyle: {
            normal: {
              color: "#0184d5",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12
            }
          },
          data: [
            100000,
            90000,
            85000,
            90000,
            95000,
            97000,
            100000,
            110000,
            115000,
            130000,
            140000,
            160000,
            190000,
            230000,
            270000,
            310000,
            400000,
            450000,
            490000,
            520000,
            530000,
            540000,
            530000,
            510000,
            500000,
            495000,
            490000,
            480000,
            485000,
            480000,
            460000,
            450000,
            430000,
            435000,
            450000,
            470000,
            500000,
            520000,
            550000,
            560000,
            555000,
            560000,
            570000,
            450000,
            330000,
            200000,
            150000,
            120000,
          ]
        },
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);
    window.addEventListener("resize", function () {
      myChart2.resize();
    });
    

    var myChart3 = echarts.init(document.getElementById('flow_graph'));
    var option3 = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#dddc6b"
          }
        }
      },
      legend: {
        top: "0%",
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12"
        }
      },
      grid: {
        left: "10",
        top: "30",
        right: "10",
        bottom: "10",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: "#00FFFF",
              fontSize: 12
            }
          },
          axisLine: {
            lineStyle: {
              color: "#00FFFF"
            }
          },

          data: [
            "00:00",
            "00:30",
            "01:00",
            "01:30",
            "02:00",
            "02:30",
            "03:00",
            "03:30",
            "04:00",
            "04:30",
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",
          ]
        },
        {
          axisPointer: { show: false },
          axisLine: { show: false },
          position: "bottom",
          offset: 20
        }
      ],
      yAxis: [
        {
          type: "value",
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)"
            }
          }

        }
      ],
      series: [
        {
          name: "乘客流量",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
          },
          itemStyle: {
            normal: {
              color: "#FFFF00",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12
            }
          },
          data: [
            100000,
            90000,
            85000,
            90000,
            95000,
            97000,
            100000,
            110000,
            115000,
            130000,
            140000,
            160000,
            190000,
            230000,
            270000,
            310000,
            400000,
            450000,
            490000,
            520000,
            530000,
            540000,
            530000,
            510000,
            500000,
            495000,
            490000,
            480000,
            485000,
            480000,
            460000,
            450000,
            430000,
            435000,
            450000,
            470000,
            500000,
            520000,
            550000,
            560000,
            555000,
            560000,
            570000,
            450000,
            330000,
            200000,
            150000,
            120000,
          ]
        },
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option3);
    window.addEventListener("resize", function () {
      myChart3.resize();
    });


    var myChart4 = echarts.init(document.getElementById('POI_table'));
    var option4 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        position: [10, 10],
      },
      legend: {
        top: "0%",
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12"
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '15%',
        containLabel: true,
        width: '100%',
        height: '75%',
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['5. 深圳宝安国际机场', '4. 深圳北站', '3. 深圳湾公园', '2. 深圳站', '1. 卓悦汇购物中心',],
        axisLabel: {//y轴文字的配置
          textStyle: {
            color: "#00c1de",
            margin: 15
          },
          // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
        },
      },
      series: [
        {
          name: '当下访问量',
          type: 'bar',
          data: [337, 368, 447, 644, 1759, 2176],
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: "#00c1de" // 0% 处的颜色
                }, {
                  offset: 1, color: 'blue' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              borderColor: "#00c1de",
              borderWidth: 1,
              barBorderRadius: 15,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
            }
          },
        },
        {
          name: '预期访问量',
          type: 'bar',
          data: [593, 643, 783, 803, 2403, 2610],
          itemStyle: {
            normal: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 1,
              borderType: 'dashed',
              barBorderRadius: 15
            }
          }
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart4.setOption(option4);
    window.addEventListener("resize", function () {
      myChart4.resize();
    });

  },
  methods:{
    to_more(){
      this.$router.push('./more')
    },
    getTimes() {
      setInterval(this.getTimesInterval, 1000)
    },
    getTimesInterval: function () {
      let _this = this
      let year = new Date().getFullYear() //获取当前时间的年份
      let month = new Date().getMonth() + 1 //获取当前时间的月份
      let day = new Date().getDate() //获取当前时间的天数
      let hours = new Date().getHours() //获取当前时间的小时
      let minutes = new Date().getMinutes() //获取当前时间的分数
      let seconds = new Date().getSeconds() //获取当前时间的秒数
      //当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      //拼接格式化当前时间
      _this.current_time =
        year +
        '年' +
        month +
        '月' +
        day +
        '日' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds
    },
  },
  created() {
    this.getTimes()
  },
  // mounted() {},
  beforeDestroy() {
    if (this.current_time) {
      clearInterval(this.getTimesInterval); 
    }
  },
}
</script>

<style lang="less" scoped>
// 以下CSS切勿随意更改
// 0.全局设置
#index_container {
  height: 100%;
  width: 100%;
  // background-color: #061d45;
  background-image: url('@/assets/index_background3.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
// 1.顶部
#header_container {
  // height: 4.375rem;
  width: 100%;
  //   background-color: black;
  display: flex;
  flex: 10;
}

.header_font {
  width: 50%;
  height: 100%;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #FFFFFF;
  text-shadow:
    0 -0.125rem .0625rem #00C6FF,
    /*上*/
    .0625rem -0.0625rem .0625rem #00C6FF,
    /*右上*/
    .125rem 0 .0625rem #00C6FF,
    /*右*/
    .0625rem .0625rem .0625rem #00C6FF,
    /*右下*/
    0 .0625rem .0625rem #00C6FF,
    /*下*/
    -0.0625rem .0625rem .0625rem #00C6FF,
    /*左下*/
    -0.125rem 0 .0625rem #00C6FF,
    /*左*/
    -0.0625rem -0.0625rem .0625rem #00C6FF;

  /*左上*/
  //   background-color: white;
  span {
    margin-bottom: 11px;
  }
}

#header_title {
  width: 100%;
  height: 100%;
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #C2F7FE;
  //   text-shadow: 0 0 .25rem #99E1EC;
  text-shadow:
    0 -0.25rem .125rem #00C6FF,
    /*上*/
    .125rem -0.125rem .125rem #00C6FF,
    /*右上*/
    .25rem 0 .125rem #00C6FF,
    /*右*/
    .125rem .125rem .125rem #00C6FF,
    /*右下*/
    0 .25rem .125rem #00C6FF,
    /*下*/
    -0.125rem .125rem .125rem #00C6FF,
    /*左下*/
    -0.25rem 0 .125rem #00C6FF,
    /*左*/
    -0.125rem -0.125rem .125rem #00C6FF;
  /*左上*/
  //   background-color: yellow;
}

// 2.中部
#center_container {
  // height: 100%;
  flex: 91;
  //   background-color: rgb(45, 172, 172);
  display: flex;
  padding-right: 3.125rem;
  padding-left: 3.125rem;
}

#center_left_container {
  height: 100%;
  flex: 1;
  // background-color: antiquewhite;
  display: flex;
  flex-direction: column;

  .sub_left {
    flex: 1;
    // background-color: greenyellow;
    display: flex;
    flex-direction: column;
    margin: .125rem;
    border: .0625rem solid #16649d;

    .sub_data {
      flex: 1;
      width: 100%;
      display: flex;
      //   background-color: orange;
    }

    #device {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: .3125rem;

      .device_line {
        flex: 1;
        display: flex;
        flex-direction: row;
        position: relative;

        .device_one {
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .device_title {
            font-size: 1rem;
            text-align: start;
            margin-left: .625rem;
          }

          .device_data {
            text-align: start;
            font-size: 1.25rem;
            margin-left: .625rem;
          }
        }
      }
    }
  }
}

.sub_title {
  height: 2.1875rem;
  width: 100%;
  color: #68D2F9;
  background-color: #0d2b59;
  display: flex;
  font-size: 1rem;
  justify-content: flex-start;
  align-items: center;

  i {
    margin-left: .625rem;
    margin-right: .1875rem;
    font-size: 1.25rem;
    color: #00E8BC;
  }
}

#Map_container {
  flex: 1;
  width: 100%;
  margin-top: .5rem;
  // background-color: #00d8e5;
  border: .1875rem solid #00CFE0;
}

#center_center_container {
  flex: 2;
  //   background-color: red;
  margin: .625rem;
  display: flex;
  flex-direction: column;

  #center_data {
    height: 11.875rem;
    width: 100%;
    // background-color: greenyellow;
    display: flex;
    flex-direction: column;

    .data_line {
      flex: 1;
      display: flex;
      // background-color: cadetblue;
      margin: .3125rem;
      justify-content: center;

      .data_one {
        height: 100%;
        width: 18.75rem;
        background: linear-gradient(#002C52, #061C44);
        margin-left: 1.25rem;
        margin-right: 1.25rem;
        display: flex;
        flex-direction: column;
        box-shadow: 0rem 0rem .1875rem #54759e;
        border-radius: .3125rem;

        .data_title {
          height: 2.5rem;
          width: 100%;
          color: #FFFFFF;
          font-size: 1rem;
          line-height: 2.5rem;
          // text-align: start;
          // background-color: red;
        }

        .data {
          width: 100%;
          flex: 1;
        }

        .data_num {
          flex: 1;
          width: 100%;
          font-size: 1.875rem;
          // background-color: aquamarine;
        }
        .data_unit{
          font-size: 0.5625rem;
        }
      }
    }
  }
}

#center_right_container {
  flex: 1;
  //   background-color: antiquewhite;
  display: flex;
  flex-direction: column;

  #right_top {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: .125rem;
    border: .0625rem solid #16649d;

    #flow_graph {
      width: 100%;
      flex: 1;
      //   background-color: rgb(226, 146, 43);
    }
  }

  #right_bottom {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: .125rem;
    border: .0625rem solid #16649d;

    #POI_table {
      width: 100%;
      flex: 1;
      //   background-color: rgb(226, 146, 43);
    }
  }
}

// 3.底部
#fonter_container {
  height: 3.125rem;
  width: 100%;
  /deep/.el-button{
    border: 2px solid #00EEFB;
    background-color: rgba(0, 0, 0, 0.121);
    color: #00EEFB;
    font-size: 20px;
    font-weight :600;
    // margin-bottom: 4px;
  }
  /deep/.el-button:hover{
    // border: 2px solid #00EEFB;
    background-color: #00EEFB;
    color: black;
    font-size: 20px;
  }
}
</style>
