<template>
  <div id="subview_traffic_container">
    <!-- 2.1左部信息框 -->
    <div class="center_side_container">
      <!-- 2.1.1左1 -->
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side_top">
          <div class="sub_title">
            <span>当前城市公交交通状况</span>
          </div>
          <!-- 搜索框 -->
          <div
            style="
              display: flex;
              align-items: start;
              height: 20px;
              margin-left: 20px;
              margin-top: 5px;
            "
          >
            <el-input
              v-model="router_input"
              placeholder="请输入公交线路(K4)"
              prefix-icon="el-icon-search"
              style="width: 180px; margin-right: 5px; height: 20px"
              clearable
              @keydown.enter.native="searchRoute"
            ></el-input>
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="searchRoute"
            >
              搜索
            </el-button>
          </div>
          <!-- 左上表格 -->
          <div id="state_table">
            <el-table
              size="mini"
              ref="state_table"
              :data="state_table_data"
              @row-click="changeStation"
              :header-cell-style="{
                backgroundColor: 'transparent',
                color: '#FFF',
                borderColor: '#556686',
              }"
              :cell-style="{
                backgroundColor: 'transparent',
                color: '#FFF',
                borderColor: '#21395d',
              }"
            >
              <el-table-column prop="" type="index" label="排名">
              </el-table-column>
              <el-table-column prop="station" label="站点名称">
              </el-table-column>
              <el-table-column prop="congestion" label="拥堵指数">
              </el-table-column>
              <el-table-column
                prop="speed"
                label="平均速度(km/h)"
                width="120px"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 2.1.2左2 -->
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side_bottom">
          <div class="sub_title">
            <!-- <i class="el-icon-user"></i> -->
            <span>{{ this.current_station }}车流量预测</span>
          </div>
          <div
            id="special_flowforecast"
            style="width: 100%; height: 100%"
          ></div>
        </div>
      </div>
    </div>
    <!-- 2.2中部地图 -->
    <div id="center_center_container">
      <Map ref="map"></Map>
    </div>
    <!-- 2.3右部信息框 -->
    <div class="center_side_container">
      <!-- 2.3.1右1 -->
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side_top">
          <div class="sub_title">
            <span>道路事件</span>
          </div>
          <!-- 右上表格 -->
          <div id="route_situation">
            <el-table
              size="mini"
              ref="route_table"
              @row-click="changeOption"
              :data="route_situation"
              :header-cell-style="{
                backgroundColor: 'transparent',
                color: '#FFF',
                borderColor: '#556686',
              }"
              :cell-style="{
                backgroundColor: 'transparent',
                color: '#FFF',
                borderColor: '#21395d',
              }"
              :row-class-name="tableRowClassName"
            >

              <el-table-column prop="area" label="道路名称" width="200px">
              </el-table-column>
              <el-table-column prop="dateTime" label="事件时间">
              </el-table-column>
              <el-table-column prop="type" label="事件类型" width="100px">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 2.3.2右2 -->
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side_bottom">
          <div class="sub_title">
            <!-- <i class="el-icon-user"></i> -->
            <span>道路流量预测图</span>
          </div>
          <div
            id="flowforecase_graph"
            style="left:100% width: 100%; height:100%"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import Map from '@/components/gaode_map.vue'
import bus from '@/eventBus/bus'
export default {
  components: { Map },
  data() {
    return {
      // 左上表格数据(默认加载K4路的站点数据)
      state_table_data: [],
      // 右上表格数据
      route_situation: [],
      // 左下角图表横坐标
      left_x_value: [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
      ],
      // 左下角图标数据
      left_value: [],
      // 右下图表横坐标
      right_x_value: [
        '0',
        '5',
        '10',
        '15',
        '20',
        '25',
        '30',
        '35',
        '40',
        '45',
        '50',
      ],
      // 右下图表数据:
      right_value: [
        {
          name: '路线1',
          type: 'line',
          stack: 'Total',
          data: [],
        },
        {
          name: '路线2',
          type: 'line',
          stack: 'Total',
          data: [],
        },
      ],
      Amap: 'HELLO',
      // 当前左下表的站点
      current_station: '',
      // 当前时间片的标号，是时间而变化实现动态效果
      index: 0,
      // 搜索框的内容
      router_input: '',
      // 当前搜索的公交路线(默认为K4)
      current_router: 'K4路',
      // 当前右下表道路
      current_route: '',
      // 左下图表
      leftEcharts: null,
      // 右下图表
      rightEcharts: null,
      linesearch: null,
      bus_inf: {
        bus_No: 'k4',
        bus_station_traffic: [
          63.71, 27.53, 34.55, 85.14, 38.08, 22.95, 88.54, 89.84, 85.58, 60.4,
          40.23, 14.98, 42.19, 67.99, 22.41, 89.08, 94.16, 12.58, 54.41, 43.29,
          48.22, 13.25, 9.59, 96.18, 75.16, 82.23, 87.67, 93.67, 14.33, 64.64,
          89.21, 61.13,
        ],
      },
    }
  },
  methods: {
    // 1.js控制表格css
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'lighting-row'
      }
      return ''
    },
    // 2.初始化左下角图表
    initStation() {
      if (
        this.leftEcharts != null &&
        this.leftEcharts != '' &&
        this.leftEcharts != undefined
      ) {
        this.leftEcharts.dispose() //销毁
      }
      this.leftEcharts = echarts.init(
        document.getElementById('special_flowforecast')
      )
      var option5 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#dddc6b',
            },
          },
        },
        legend: {
          top: '0%',
          left: '70%',
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '12',
          },
        },
        grid: {
          left: '10',
          top: '30',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: '#00FFFF',
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: '#00FFFF',
              },
            },

            data: this.left_x_value,
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 12,
              },
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
          },
        ],
        series: [
          {
            name: '数据趋势',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {},
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
                      color: 'rgba(1, 132, 213, 0.4)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(1, 132, 213, 0.1)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            itemStyle: {
              normal: {
                color: '#0184d5',
                borderColor: 'rgba(221, 220, 107, .1)',
                borderWidth: 12,
              },
            },
            data: this.left_value,
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      this.leftEcharts.setOption(option5)
      window.addEventListener('resize', function () {
        if (this.leftEcharts) this.leftEcharts.resize()
      })
    },
    // 3.初始化右下图表
    initRoute() {
      if (
        this.rightEcharts != null &&
        this.rightEcharts != '' &&
        this.rightEcharts != undefined
      ) {
        this.rightEcharts.dispose() //销毁
      }
      this.rightEcharts = echarts.init(
        document.getElementById('flowforecase_graph')
      )
      var option6 = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: '0%',
          left: '50%',
          data: ['路线1', '路线2'],
          textStyle: {
            color: '#FFFFFF',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          name: '预测时间(分钟)',
          type: 'category',
          boundaryGap: false,
          data: this.right_x_value,
          nameTextStyle: {
            color: '#FFFFFF',
          },
        },
        yAxis: {
          name: '交通流量（辆/5分钟）',
          type: 'value',
          nameTextStyle: {
            color: '#FFFFFF',
            padding: [0, 0, 0, 50],
          },
        },
        series: this.right_value,
      }
      // 使用刚指定的配置项和数据显示图表。
      this.rightEcharts.setOption(option6)
      window.addEventListener('resize', function () {
        if (this.rightEcharts) this.rightEcharts.resize()
      })
    },
    // 获取某一站点流量数据
    getOneSation(bus, station, index) {
      this.$api.traffic
        .getStationFlow(bus, station, index)
        .then((res) => {
          this.left_value = res.data.data
          for (let i = 0; i < this.left_value.length; i++) {
            this.left_value[i] = parseInt(this.left_value[i])
          }
          // 加载图表
          if (!this.left_value) {
            this.$notify.warning({
              position: 'top-left',
              duration: 1000,
              title: '提示',
              message: '没有该站点流量数据',
            })
          }
          this.initStation()
        })
        .catch((e) => {
          this.$notify.error({
            duration: 1000,
            title: e,
          })
        })
    },
    // 4.初始化获取左上图表数据
    async getLeftTable() {
      // 获取表格数据
      await this.$api.traffic
        .getRouterStation(this.current_router)
        .then((res) => {
          this.state_table_data = res.data.data
        })
        .catch((e) => {
          this.$notify.error({
            duration: 1000,
            title: e,
          })
        })
      // 获取图表数据
      this.current_station = this.state_table_data[0].station
      console.log(this.current_station)
      this.getOneSation(this.current_router, this.current_station, this.index)
      this.bus_inf.bus_station_traffic = []
      for (let i = 0; i < this.state_table_data.length - 1; i++) {
        this.bus_inf.bus_station_traffic.push(
          this.state_table_data[i].congestion
        )
      }
      bus.$emit('bus_inf_send', this.bus_inf)
    },
    // 5.依据搜索框获取左上、左下图表数据
    async searchRoute() {
      await Promise.resolve((this.current_router = this.router_input))
      await Promise.resolve((this.bus_inf.bus_No = this.router_input))
      // 获取表格数据
      this.getLeftTable()
      // 获取图表数据
      this.current_station = this.state_table_data[0].station
      this.getOneSation(this.current_router, this.current_station, this.index)
    },
    // 6.点击左上表格展示对应的站点流量
    changeStation(row, event, column) {
      this.current_station = row.station
      console.log(this.current_station)
      // 获取图表数据
      this.$api.traffic
        .getStationFlow(this.current_router, this.current_station, this.index)
        .then((res) => {
          this.left_value = res.data.data
          console.log(res.data.data)
          // 加载图表
          if (!this.left_value) {
            this.$notify.warning({
              position: 'top-left',
              duration: 1000,
              title: '提示',
              message: '没有该站点流量数据',
            })
          }
          this.initStation()
        })
        .catch((e) => {
          this.$notify.error({
            duration: 1000,
            title: e,
          })
        })
    },
    // 7.初始化获取右上表格数据
    async getRightTable() {
      // 获取表格数据
      await this.$api.traffic
        .getErrorTable()
        .then((res) => {
          this.route_situation = res.data.data
          // 获取图表数据
          this.current_route = this.route_situation[0].area
        })
        .catch((e) => {
          this.$notify.error({
            duration: 1000,
            title: e,
          })
        })
      this.getRight_Bottom(this.current_route)
    },
    // 8.点击右上表格某行获取数据更新右下图表
    async changeOption(row, event, column) {
      // 获取图表数据
      await Promise.resolve((this.current_route = row.area))
      this.getRight_Bottom(this.current_route)
    },
    // 9.获取右下角图表数据
    getRight_Bottom(current_route) {
      this.$api.traffic
        .getRouterLow(current_route)
        .then((res) => {
          this.right_value[0].data = res.data.data.line1
          this.right_value[1].data = res.data.data.line2
          if (!this.right_value) {
            this.$notify.info({
              duration: 1000,
              title: '提示',
              message: '没有该站点流量数据',
            })
          }
          // 加载图表
          this.initRoute()
        })
        .catch((e) => {
          this.$notify.error({
            duration: 1000,
            title: e,
          })
        })
    },
  },
  created() {
    clearInterval()
  },
  mounted() {
    // 1.获取两表格数据，并将对应表格第一项的流量数据get并初始化对应图表
    this.getLeftTable()
    this.getRightTable()
    var j = 0
    const timer = setInterval(() => {
      if (j == this.state_table_data.length - 1) {
        j = 0
      } else {
        this.current_station = this.state_table_data[j].station
        console.log(this.current_station)
        // 获取图表数据
        this.$api.traffic
          .getStationFlow(this.current_router, this.current_station, this.index)
          .then((res) => {
            this.left_value = res.data.data
            // console.log(res.data.data)
            // 加载图表
            if (!this.left_value) {
              this.$notify.warning({
                position: 'top-left',
                duration: 1000,
                title: '提示',
                message: '没有该站点流量数据',
              })
            }
            this.initStation()
          })
          .catch((e) => {
            this.$notify.error({
              duration: 1000,
              title: e,
            })
          })
        // 获取表格数据
        this.$api.traffic
          .getErrorTable()
          .then((res) => {
            this.route_situation = res.data.data
            // 获取图表数据
            this.current_route = this.route_situation[j].area
            this.getRight_Bottom(this.current_route)
          })
          .catch((e) => {
            this.$notify.error({
              duration: 1000,
              title: e,
            })
          })
      }
      j++
    }, 10000)
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
    })
  },
}
</script>

<style lang="less" scoped>
//0.全局设置
/* 滚动条宽度 */
div::-webkit-scrollbar {
  width: 0rem;
}

#subview_traffic_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

//2.1 2.3
.center_side_container {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sub_title {
  height: 35px;
  width: 100%;
  color: #68d2f9;
  background-color: #0d2b59;
  display: flex;
  font-size: 16px;
  justify-content: flex-start;
  align-items: center;

  i {
    margin-left: 10px;
    margin-right: 3px;
    font-size: 20px;
    color: #00e8bc;
  }

  span {
    margin-left: 0.625rem;
  }
}

.center_side_bottom {
  flex: 4;
  display: flex;
  flex-direction: column;
  margin: 2px;
  border: 1px solid #16649d;
}

.center_side_top {
  flex: 6;
  display: flex;
  flex-direction: column;
  margin: 2px;
  border: 1px solid #16649d;
  overflow-y: scroll;
  overflow-x: hidden;
}

#state_table {
  overflow-x: hidden;
  margin: 1.25rem;
  max-height: 18.75rem;
}

/deep/ .el-table,
// 设置的是单元格的样式
/deep/.el-table__expanded-cell {
  padding: 0rem 0rem 0rem 0rem;
  background-color: transparent;
  color: #fff;

  th {
    padding: 0;
    background-color: transparent;
    border-color: #556686;
  }

  td {
    padding: 0;
    background-color: transparent;
    border-color: #556686;
  }

  tr {
    padding: 0;
    background-color: transparent;
    border-color: #556686;
  }
}

/deep/.el-table::before {
  background-color: #21395d;
}

#route_situation {
  overflow-x: hidden;
  margin: 1.25rem;
  max-height: 18.75rem;
}

/deep/.el-table .lighting-row {
  background: #0d295c;
}

//2.2
#center_center_container {
  flex: 2;
  border: 0.1875rem solid #00cfe0;
  margin: 0.3125rem;
}

/deep/input.el-input__inner {
  height: 1.25rem;
  line-height: 1.25rem;
  padding-right: 0.3125rem;
  background: transparent;
  color: #fff;
}

/deep/i.el-input__icon {
  height: 1.25rem;
  line-height: 1.25rem;
}

/deep/.el-button--primary {
  height: 1.25rem;
  padding: 0.125rem;
  font-size: 0.875rem;
}
/deep/.el-button {
  border: 0.0625rem solid #00eefb;
  background-color: rgba(0, 0, 0, 0.121);
  color: #00eefb;
}
/deep/.el-button:hover {
  background-color: #00eefb;
  color: black;
}
</style>
