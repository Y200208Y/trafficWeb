<template>
  <div id="subview_flow_container">
    <!-- 1.左部 -->
    <div class="flow_side_container">
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side">
          <div class="sub_title">
            <span>公交路线推荐</span>
          </div>
          <div id="bus_routes_recommand">
            <!-- 1.1左上蓝色输入选择框-----------------TODO:没有写选择出行方式以及提交输入等事件 -->
            <div id="left_top">
              <div id="left_top_top">
                <el-menu
                  class="el-menu-demo"
                  mode="horizontal"
                  default-active="2"
                  @select="handleClick"
                >
                  <el-menu-item index="1"
                    ><span class="iconfont icon-car greyblue"></span
                  ></el-menu-item>
                  <el-menu-item index="2"
                    ><span class="iconfont icon-gongjiaoche greyblue"></span
                  ></el-menu-item>
                  <el-menu-item index="3"
                    ><span class="iconfont icon-walking greyblue"></span
                  ></el-menu-item>
                </el-menu>
              </div>
              <div id="left_top_center">
                <span class="iconfont icon-weibiaoti7 white"></span>
                <div id="input_container">
                  <el-input
                    placeholder="请输入起点"
                    v-model="input_start"
                    clearable
                    size="small"
                  >
                    <i
                      slot="prefix"
                      class="iconfont icon-qidian1 lightblue"
                    ></i>
                  </el-input>
                  <el-input
                    placeholder="请输入终点"
                    v-model="input_end"
                    clearable
                    size="small"
                  >
                    <i
                      slot="prefix"
                      class="iconfont icon-zhongdian1 lightyellow"
                    ></i>
                  </el-input>
                </div>
                <span></span>
              </div>
              <div id="left_top_bottom">
                <el-button size="small" id="clearall" @click="clear_input"
                  >清除路线</el-button
                >
                <el-button size="small" @click="getRouterCommend"
                  >出发</el-button
                >
              </div>
            </div>
            <!-- 1.2推荐路线 -->
            <div id="recommand_table">
              <!-- 1.2.1线路类型---------------------TODO：没写选择推荐路线类型的变量和函数 -->
              <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                default-active="1"
              >
                <el-menu-item index="1"><span>推荐</span></el-menu-item>
                <el-menu-item index="2"><span>换乘少</span></el-menu-item>
                <el-menu-item index="3"><span>时间短</span></el-menu-item>
                <el-menu-item index="4"><span>无地铁</span></el-menu-item>
                <el-submenu index="5" disabled>
                  <template slot="title">现在出发</template>
                  <el-menu-item index="5-1">开发中</el-menu-item>
                  <el-menu-item index="5-2">选项2</el-menu-item>
                  <el-menu-item index="5-3">选项3</el-menu-item>
                </el-submenu>
              </el-menu>
              <!-- 线路信息 -->
              <div class="box">
                <div class="table-content">
                  <!--1.2.2推荐路线表格 --------------------------------TODO: 调整表格数据--------------------------------------------------- -->
                  <el-table
                    :data="router_data"
                    style="width: 100%"
                    :show-header="false"
                    ref="isExpand"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form
                          label-position="left"
                          inline
                          class="demo-table-expand"
                        >
                          <el-form-item>
                            <span
                              >{{ props.row.time }}分钟 | 步行{{
                                props.row.walking_distance
                              }}m</span
                            >
                            |
                            <span class="lightred">{{ props.row.fee }}元</span>
                          </el-form-item>
                          <el-form-item>
                            <span
                              style="
                                background-color: #1b85ef;
                                color: #fff;
                                padding: 0.125rem 0.25rem;
                                border-radius: 0.25rem;
                              "
                              v-if="props.row.advantage != ''"
                              >{{ props.row.advantage }}</span
                            >
                            <span
                              style="
                                border: 0.125rem solid grey;
                                border-radius: 0.25rem;
                              "
                              ><span
                                style="
                                  background-color: grey;
                                  color: #fff;
                                  margin: 0;
                                  padding-right: 0.25rem;
                                "
                                >上车站</span
                              >
                              {{ props.row.station }}</span
                            >
                            <span class="green" v-if="props.row.rate <= 40"
                              ><span
                                class="iconfont icon-chengcherenshu"
                                style="font-size: 1.0625rem; margin: 0"
                              ></span
                              >{{ props.row.rate }}%</span
                            >
                            <span
                              class="lightyellow"
                              v-if="40 < props.row.rate && props.row.rate <= 60"
                              ><span
                                class="iconfont icon-chengcherenshu"
                                style="font-size: 1.0625rem; margin: 0"
                              ></span
                              >{{ props.row.rate }}%</span
                            >
                            <span
                              class="lightred"
                              v-if="60 < props.row.rate && props.row.rate <= 80"
                              ><span
                                class="iconfont icon-chengcherenshu"
                                style="font-size: 1.0625rem; margin: 0"
                              ></span
                              >{{ props.row.rate }}%</span
                            >
                            <span class="brown" v-if="80 < props.row.rate"
                              ><span
                                class="iconfont icon-chengcherenshu"
                                style="font-size: 1.0625rem; margin: 0"
                              ></span
                              >{{ props.row.rate }}%</span
                            >
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column label="路线概述">
                      <template slot-scope="scope">
                        <span
                          v-for="(rou, index) in router_data[scope.$index]
                            .router"
                          :key="index"
                          >{{ rou }}
                          <span
                            v-if="
                              index !=
                              router_data[scope.$index].router.length - 1
                            "
                          >
                            >
                          </span>
                        </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 2.中部 -->
    <div id="flow_center_container">
      <Map ref="map"></Map>
    </div>
    <!-- 3.右部 -->
    <div class="flow_side_container">
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side">
          <div class="sub_title">
            <i class="iconfont icon-gongjiao lightyellow"></i>
            <span>66路公交(车牌号：粤B10052)</span>
          </div>
          <div id="bus_info">
            <!-- 3.1仪表盘及当前站点 -->
            <div id="bus_info_top">
              <!-- 3.1.1仪表盘 -->
              <div id="bus_rate"></div>
              <!-- 3.1.2站点信息 -->
              <div id="bus_station_info">
                <span style="color: #68d2f9">已到站点</span>
                <span
                  class="lightred"
                  style="font-size: 1.4375rem; margin: 0.625rem"
                  >动物园站</span
                >
                <span style="color: #68d2f9">下一站点</span>
                <span
                  class="green"
                  style="font-size: 1.4375rem; margin: 0.625rem"
                  >丽岛</span
                >
              </div>
            </div>
            <!-- 3.2站点及其满载率 -->
            <div id="bus_info_bottom">
              <!-- 3.2.1满载率图片 -->
              <div id="rate_image">
                <span class="title" style="margin-right: 1.25rem">满载率</span>
                <span id="rate_view">
                  <span id="rate_bar">
                    <span class="green-b bar"></span>
                    <span class="lightyellow-b bar"></span>
                    <span class="lightred-b bar"></span>
                    <span class="brown-b bar"></span>
                  </span>
                  <span id="rate_num" class="white">
                    <span>40%</span>
                    <span>60%</span>
                    <span>80%</span>
                  </span>
                </span>
              </div>
              <!-- 3.2.2路线站点 -->
              <div id="bus_station">
                <!-- 3.2.2.1旁条 -->
                <span
                  class="white-b"
                  style="
                    width: 0.25rem;
                    height: 100%;
                    margin: 0 1.25rem;
                    position: relative;
                  "
                >
                  <span
                    class="iconfont icon-gongjiaozhandian blue"
                    style="
                      position: absolute;
                      transform: translateX(-50%) translateY(-50%);
                      background-color: #fff;
                      border-radius: 50%;
                      font-size: 1.875rem;
                      top: 50%;
                    "
                  ></span>
                </span>
                <!-- 3.2.2.2表格 -->
                <div class="box">
                  <div class="table-content">
                    <el-table
                      :data="bus_Station_Data"
                      style="width: 100%"
                      :header-cell-style="{
                        backgroundColor: 'transparent',
                        color: '#68d2f9',
                        borderImage: 'transparent',
                      }"
                      :cell-style="{
                        backgroundColor: 'transparent',
                        color: '#FFF',
                        borfer: 'none',
                        borderImage: 'transparent',
                        fontSize: '1.0625rem',
                        padding: '.625rem 0',
                      }"
                    >
                      <el-table-column prop="name" label="站点名称" width="180">
                      </el-table-column>
                      <el-table-column
                        prop="rate"
                        label="站点满载率"
                        width="180"
                      >
                        <template slot-scope="props">
                          <span v-if="props.row.rate <= 40" class="green"
                            >{{ props.row.rate }}%</span
                          >
                          <span
                            v-if="40 < props.row.rate && props.row.rate <= 60"
                            class="lightyellow"
                            >{{ props.row.rate }}%</span
                          >
                          <span
                            v-if="60 < props.row.rate && props.row.rate <= 80"
                            class="lightred"
                            >{{ props.row.rate }}%</span
                          >
                          <span v-if="80 < props.row.rate" class="brown"
                            >{{ props.row.rate }}%</span
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      activeName: 'second',
      input_start: '北邮海淀',
      input_end: '北邮沙河',
      tag: '推荐',
      router_data: [],
      bus_Station_Data: [
        { name: '动物园站', rate: 40 },
        { name: '动物园站', rate: 50 },
        { name: '动物园站', rate: 60 },
        { name: '动物园站', rate: 70 },
        { name: '动物园站', rate: 80 },
        { name: '动物园站', rate: 90 },
        { name: '动物园站', rate: 40 },
        { name: '动物园站', rate: 40 },
        { name: '动物园站', rate: 40 },
        { name: '动物园站', rate: 40 },
        { name: '动物园站', rate: 40 },
      ],
      OD_inf: {
        O: '二环北路公交车场',
        D: '分水岭南',
      },
    }
  },
  methods: {
    // 1.左上角的menu
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 2.左中部的menu
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
      switch (key) {
        case '1':
          this.tag = '推荐'
          break
        case '2':
          this.tag = '换乘少'
          break
        case '3':
          this.tag = '时间短'
          break
        case '4':
          this.tag = '无地铁'
          break
        default:
          this.tag = '推荐'
          break
      }
      this.getRouterCommend()
      // console.log(this.tag)
    },
    // 3.默认展开第一项列表详情
    openDetail() {
      this.$nextTick(() => {
        this.$refs.isExpand.toggleRowExpansion(this.router_data[0], true)
      })
    },
    // 4.初始化右上角仪表盘
    initCircle() {
      var myChart7 = echarts.init(document.getElementById('bus_rate'))
      var option7 = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '50%'],
            startAngle: 240,
            endAngle: -60,
            min: 0,
            max: 200,
            splitNumber: 10,
            radius: '87%',
            itemStyle: {
              color: '#00FFFF',
            },
            progress: {
              show: true,
              width: 15,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: [[1, '#336666']],
                width: 15,
              },
            },
            axisTick: {
              distance: -20,
              splitNumber: 10,
              lineStyle: {
                width: 0.5,
                color: '#00FFFF',
              },
            },
            splitLine: {
              distance: -25,
              length: 10,
              lineStyle: {
                width: 1,
                color: '#00FFFF',
              },
            },
            axisLabel: {
              distance: -7,
              color: '#999',
              fontSize: 0,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, -5],
              fontSize: 30,
              fontWeight: 'bolder',
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}\n{unit|km/h}'
              },
              color: '#FFFFFF',
              rich: {
                value: {
                  fontSize: 30,
                  fontWeight: 'bolder',
                  padding: [40, 0, 0, 0],
                },
                unit: {
                  fontSize: 10,
                  color: '#999',
                  padding: [20, 0, 0, 0],
                },
              },
            },
            data: [
              {
                value: 20,
              },
            ],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart7.setOption(option7)
      window.addEventListener('resize', function () {
        myChart7.resize()
      })
    },
    // 5.清除路线按钮
    clear_input() {
      this.input_start = ''
      this.input_end = ''
    },
    // 6.出发按钮
    getRouterCommend() {
      if (this.input_start != '' && this.input_end != '')
        this.$api.flow
          .postgo({
            index: 1,
            tag: this.tag,
            start: this.input_start,
            end: this.input_end,
          })
          .then(async (res) => {
            this.router_data = []
            for (let i = 0; i < res.data.data.length; i++) {
              let temp = {
                router: [],
                time: '',
                walking_distance: '',
                fee: '',
                advantage: '',
                station: '',
                rate: '',
              }
              temp.router = res.data.data[i].stations
              temp.time = res.data.data[i].spendTime
              temp.walking_distance = res.data.data[i].walkDistance
              temp.fee = res.data.data[i].money
              temp.advantage = res.data.data[i].tag
              temp.station = res.data.data[i].stations[0]
              temp.rate = res.data.data[i].congestion
              this.router_data.push(temp)
            }
          })
          .catch((e) => {
            this.$notify.error({
              duration: 1000,
              title: e,
            })
          })
      else {
        if (this.input_start == '') {
          this.$notify.error({
            position: 'top-left',
            duration: 1000,
            title: '提示',
            message: '起点不能为空',
          })
        }
        if (this.input_end == '') {
          this.$notify.error({
            position: 'top-left',
            duration: 1000,
            title: '提示',
            message: '终点不能为空',
          })
        }
      }
    },
  },
  created() {
    this.openDetail()
  },
  mounted() {
    bus.$emit('bus_OD_inf_send', this.OD_inf)
    this.openDetail()
    this.initCircle()
  },
}
</script>

<style lang="less" scoped>
/* 滚动条宽度 */
div::-webkit-scrollbar {
  width: 0rem;
}
// 0.全局设置
#subview_flow_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.flow_side_container {
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
  justify-content: center;
  align-items: center;

  i {
    margin-left: 10px;
    margin-right: 3px;
    font-size: 25px;
    // color: #00e8bc;
  }

  span {
    margin-left: 0.625rem;
  }
}

.center_side {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2px;
  border: 1px solid #16649d;
}

#bus_routes_recommand {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.3125rem;

  // position: relative;
  #left_top {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #3d92fd;

    #left_top_top {
      flex: 1;
      display: flex;
      align-items: center;
      justify-self: center;
      margin: 0 3.75rem 0 3.75rem;

      span {
        flex: 1;
        font-size: 1.25rem;
        background-color: transparent;
        border: none;
      }

      /deep/.el-menu {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
      }

      /deep/.el-menu.el-menu--horizontal {
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
      }

      /deep/.el-menu--horizontal > .el-menu-item {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: none;
        border-bottom: none;
        background: transparent;
      }

      /deep/.el-menu-item {
        line-height: 100%;
      }

      /deep/.el-menu--horizontal > .el-menu-item.is-active {
        span {
          color: #fff;
        }
      }
    }

    #left_top_center {
      flex: 2;
      width: 100%;
      display: flex;
      align-items: center;
      justify-self: center;

      // background: #0d2b59;
      span {
        width: 1.875rem;
        margin: 0.3125rem;
      }

      #input_container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      /deep/.el-input {
        flex: 1;
        margin: 0.3125rem;
        height: 2.5rem;

        i {
          font-size: 1.5625rem;
        }
      }

      /deep/.el-input__prefix {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.1875rem 0 0.1875rem;
      }

      /deep/.el-input__inner {
        background-color: #3688eb;
        border: 0.0625rem solid #3688eb;
        color: #fff;
        margin: 0 0.375rem 0 0.375rem;
      }

      // 改变input里的字体颜色
      /deep/input::-webkit-input-placeholder {
        color: #fff;
        font-size: 0.875rem;
      }
    }

    #left_top_bottom {
      flex: 1;
      display: flex;
      align-items: center;
      justify-self: center;

      /deep/.el-button {
        flex: 1;
        margin: 0 2.5rem 0.3125rem 2.5rem;
      }

      /deep/.el-button--small {
        background-color: #569ffb;
        color: #fff;
        border: none;
        box-shadow: 0 0 0.125rem #347edb;
      }

      /deep/.el-button--small:hover {
        background-color: #fff;
        color: #569ffb;
        border: none;
        box-shadow: 0 0 0.125rem #347edb;
      }

      /deep/.el-button--small:active {
        background-color: #569ffb;
        color: #fff;
        border: none;
        box-shadow: 0 0 0.125rem #347edb;
      }

      /deep/#clearall {
        background: transparent;
        border: none;
        color: #fff;
        box-shadow: none;
      }
    }
  }

  #recommand_table {
    flex: 7;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    .box {
      flex: 1;
      position: relative;
    }

    .table-content {
      height: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      position: absolute;
      width: 100%;
    }

    /deep/.el-menu {
      height: 1.25rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }

    /deep/.el-menu.el-menu--horizontal {
      padding: 0;
      border: none;
      // flex:1;
      height: none;
      background: transparent;
    }

    /deep/.el-menu--horizontal > .el-menu-item {
      // height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: none;
      border-bottom: none;
      background: transparent;
      height: none !important;
    }

    /deep/.el-menu-item {
      width: 0.9375rem;
      // line-height: 100%;
    }

    /deep/.el-menu--horizontal > .el-menu-item.is-active {
      span {
        color: #347edb;
      }
    }

    /deep/.el-menu--horizontal > .el-submenu /deep/.el-submenu__title {
      height: 0.625rem !important;
      line-height: 0.625rem !important;
    }

    /deep/.el-submenu,
    /deep/.el-menu-item {
      height: 0.625rem !important;
    }

    /deep/.el-menu--horizontal > .el-submenu,
    /deep/.el-submenu__title {
      height: 0.625rem !important;
      line-height: 0.625rem !important;
    }

    /deep/.el-menu-item,
    /deep/.el-submenu__title {
      height: 0.625rem !important;
      line-height: 0.625rem !important;
    }

    /deep/.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
      border: 0rem solid !important;
      color: #3d92fd;
    }

    /deep/.el-table {
      flex: 1;
    }

    /deep/.el-form-item {
      margin: 0 0.3125rem 0 0.3125rem;

      span {
        margin: 0 0.3125rem;
      }
    }

    /deep/.el-table__cell {
      padding: 0;
    }
  }
}

#bus_info {
  display: flex;
  flex-direction: column;
  height: 100%;
  // background-color: #00cfe0;
  margin: 0.3125rem;

  #bus_info_top {
    flex: 3;
    // background-color: #0d2b59;
    border-bottom: 0.125rem solid rgb(154, 151, 151);
    display: flex;

    #bus_rate {
      flex: 5;
      margin: 0.3125rem;
      width: 100%;
      background-image: url('../assets/bus_rate.png');
      background-repeat: no-repeat;
      background-size: 96.5%;
      background-position: 51% 50%;
    }

    #bus_station_info {
      flex: 5;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  #bus_info_bottom {
    width: 100%;
    flex: 7;
    display: flex;
    flex-direction: column;

    #rate_image {
      width: 100%;
      height: 3.125rem;
      display: flex;
      align-items: center;
      justify-content: center;

      #rate_view {
        display: flex;
        flex-direction: column;
        align-items: center;

        #rate_bar {
          display: flex;

          .bar {
            height: 0.4375rem;
            width: 2.5rem;
            margin: 0.1875rem;
          }
        }

        #rate_num {
          span {
            margin: 0 0.625rem;
          }
        }
      }
    }

    #bus_station {
      // background-color: rgb(5, 5, 5);
      flex: 1;
      display: flex;

      .box {
        flex: 1;
        position: relative;
      }

      .table-content {
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        position: absolute;
        width: 100%;
      }

      /deep/ .el-table,
      /deep/.el-table__expanded-cell {
        padding: 0rem 0rem 0rem 0rem;
        background-color: transparent;
        overflow-x: hidden;

        th {
          padding: 0;
          background-color: transparent;
          border-color: #556686;
          border-style: none;
        }

        td {
          padding: 0;
          background-color: transparent;
          border-style: none;
          // border-color: #556686;
        }

        tr {
          padding: 0;
          background-color: transparent;
          border-style: none;
          // border-color: #556686;
        }
      }

      /deep/.el-table::before {
        border-style: none;
        background: transparent;
      }
    }
  }
}

//2
#flow_center_container {
  flex: 2;
  border: 0.1875rem solid #00cfe0;
  margin: 0.3125rem;
}
</style>
