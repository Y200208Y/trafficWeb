<template>
  <div id="subview_OD_container">
    <!-- 1.左部 -->
    <div class="OD_side_container">
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side">
          <div class="sub_title">
            <!-- <i class="el-icon-user"></i> -->
            <span>OD推荐</span>
          </div>
          <!-- 1.2.上部路线推荐-->
          <div id="OD_recommand" style="margin: 0.5rem; flex: 4">
            <div
              style="
                height: 40%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-around;
              "
            >
              <div
                class="block"
                style="
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: start;
                  padding: 0.4375rem;
                "
                v-for="(item, index) in this.list"
                :key="index"
                @click="changeRouter(index)"
              >
                <div
                  style="margin: 0.1875rem 0; color: aqua; font-size: 0.9375rem"
                >
                  {{ item.name1 }}------{{ item.name2 }}
                </div>
                <div
                  style="
                    width: 5rem;
                    border-radius: 0.625rem;
                    background-color: #ffd200;
                    height: 18%;
                    margin: 0.125rem 0;
                    color: #ffffff;
                  "
                >
                  {{ item.line }}号线
                </div>
                <div style="color: #fff; font-size: 0.625rem">
                  <span style="margin-right: 0.1875rem"
                    >{{ item.msg_sta }}站</span
                  >
                  <span style="margin-right: 0.1875rem"
                    >{{ item.msg_money }}元</span
                  >
                  <span style="margin-right: 0.1875rem">{{
                    item.msg_area
                  }}</span>
                  <span style="margin-right: 0.1875rem"
                    >{{ item.msg_enter }}口</span
                  >
                  <span style="margin-right: 0.1875rem">进站</span>
                </div>
                <div style="font-size: 0.75rem; color: white">
                  <span style="margin-right: 1.5625rem"
                    >{{ item.line }}号线</span
                  >
                  <span>即将进站</span>
                </div>
                <div style="height: 10%; color: white; font-size: 0.75rem">
                  <span style="margin-right: 0.3125rem"
                    >满载率{{ item.rate }}%</span
                  >
                  <span class="green" v-if="item.rate <= 40"
                    ><span
                      class="iconfont icon-chengcherenshu"
                      style="font-size: 1.0625rem; margin: 0"
                    ></span
                  ></span>
                  <span
                    class="lightyellow"
                    v-if="40 < item.rate && item.rate <= 60"
                    ><span
                      class="iconfont icon-chengcherenshu"
                      style="font-size: 1.0625rem; margin: 0"
                    ></span
                  ></span>
                  <span
                    class="lightred"
                    v-if="60 < item.rate && item.rate <= 80"
                    ><span
                      class="iconfont icon-chengcherenshu"
                      style="font-size: 1.0625rem; margin: 0"
                    ></span
                  ></span>
                  <span class="brown" v-if="80 < item.rate"
                    ><span
                      class="iconfont icon-chengcherenshu"
                      style="font-size: 1.0625rem; margin: 0"
                    ></span
                  ></span>
                </div>
              </div>
              <!-- 添加按钮-->
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                "
                class="block"
                v-if="list.length < 4"
                @click="dialogVisible = true"
              >
                <span
                  style="
                    font-size: 5rem;
                    flex: 1;
                    margin-top: 0.625rem;
                    color: white;
                  "
                  class="el-icon-circle-plus-outline"
                ></span>

                <el-button
                  type="text"
                  class="odbtn"
                  style="
                    color: white;
                    width: 3.125rem;
                    flex: 1;
                    font-size: 0.9375rem;
                  "
                  >添加</el-button
                >
              </div>
            </div>

            <!-- 添加路线对话框 -->
            <el-dialog center title="OD推荐" :visible.sync="dialogVisible">
              <el-form :model="form">
                <el-form-item label="路线站点:" label-width="6.25rem">
                  <el-col :span="6">
                    <el-input
                      placeholder="起点"
                      v-model="form.name1"
                      autocomplete="off"
                      style="margin-left: 1.875rem"
                    ></el-input>
                  </el-col>
                  <el-col :span="3">
                    <span style="margin-left: 3.125rem; margin-right: 3.125rem"
                      >到</span
                    >
                  </el-col>
                  <el-col :span="6">
                    <el-input
                      placeholder="终点"
                      v-model="form.name2"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="线路:" label-width="6.25rem">
                  <el-col :span="2">
                    <el-input
                      placeholder="几号线"
                      v-model="form.line"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <span style="margin-left: 1.875rem">站点:</span>
                  </el-col>
                  <el-col :span="2">
                    <el-input
                      placeholder="第几站"
                      v-model="form.msg_sta"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="详细信息:" label-width="6.25rem">
                  <el-col :span="3">
                    <span style="margin-left: 1.875rem">费用:</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="form.msg_money" autocomplete="off">
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <span style="margin-left: 1.875rem">站点位置:</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      placeholder="地理"
                      v-model="form.msg_area"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                  <el-col :span="3">
                    <span style="margin-left: 1.875rem">出站口:</span>
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      placeholder="序号"
                      v-model="form.msg_enter"
                      autocomplete="off"
                    ></el-input>
                  </el-col>
                  <el-col :span="3">
                    <span style="margin-left: 1.875rem">满载率:</span>
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      max="100"
                      maxlength="3"
                      v-model="form.rate"
                      autocomplete="off"
                      @input="numlimit(form.rate)"
                    >
                      <template slot="append">%</template>
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add(form)">确 定</el-button>
              </div>
            </el-dialog>

            <div
              style="
                flex: 7;
                background-color: #3d92fd;
                border-radius: 0.625rem;
                margin: 0.5rem;
                display: flex;
                flex-direction: column;
              "
            >
              <div
                style="
                  flex: 1;
                  margin: 0.625rem;
                  padding: 0.3125rem;
                  background-color: #ebebeb;
                  border-radius: 0.625rem;
                "
              >
                <!-- 按钮组-->
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
                </el-menu>

                <!-- 下部表格 -->
                <div
                  style="
                    height: 90%;
                    background-color: white;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                    border-radius: 1.875rem;
                  "
                  id="recommand_table"
                >
                  <div class="box">
                    <div class="table-content">
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
                                <span class="lightred"
                                  >{{ props.row.fee }}元</span
                                >
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
                              </el-form-item>
                              <el-form-item>
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
                                      width: 100%;
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
                                  v-if="
                                    40 < props.row.rate && props.row.rate <= 60
                                  "
                                  ><span
                                    class="iconfont icon-chengcherenshu"
                                    style="font-size: 1.0625rem; margin: 0"
                                  ></span
                                  >{{ props.row.rate }}%</span
                                >
                                <span
                                  class="lightred"
                                  v-if="
                                    60 < props.row.rate && props.row.rate <= 80
                                  "
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
      </div>
    </div>
    <!-- 2.中部 -->
    <div id="OD_center_container">
      <Map ref="map"></Map>
    </div>
    <!-- 3.右部 -->

    <div class="OD_side_container">
      <div class="border_win" style="flex: 4">
        <!-- 四个角的边框效果 -->
        <div class="border_corner border_corner_left_top"></div>
        <div class="border_corner border_corner_right_top"></div>
        <div class="border_corner border_corner_left_bottom"></div>
        <div class="border_corner border_corner_right_bottom"></div>
        <!-- 这里是内容 -->
        <div class="center_side">
          <div class="sub_title">
            <!-- <i class="el-icon-user"></i> -->

            <span>路线上特殊事件</span>
          </div>
          <div id="error_info">
            <div class="box">
              <div class="table-content">
                <el-table
                  :data="err_Data"
                  style="width: 100%"
                  :header-cell-style="{
                    background: 'transparent',
                    color: '#68d2f9',
                    borderImage: 'transparent',
                  }"
                  :cell-style="columnclass"
                >
                  <el-table-column prop="time" label="事件时间" width="80">
                  </el-table-column>
                  <el-table-column prop="router" label="事件地点" width="180">
                  </el-table-column>
                  <el-table-column prop="type" label="事件类型" width="100">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/gaode_map.vue'
export default {
  components: { Map },
  data() {
    return {
      router_data: [],
      list: [
        {
          name1: '北邮海淀',
          name2: '北邮沙河',
          line: 8,
          msg_sta: 10,
          msg_money: 6,
          msg_area: '西丽',
          msg_enter: 'B1',
          rate: 80,
        },
        {
          name1: '北邮海淀',
          name2: '北航海淀',
          line: 14,
          msg_sta: 7,
          msg_money: 4,
          msg_area: '西丽',
          msg_enter: 'B2',
          rate: 60,
        },
      ],
      index: 0,
      dialogVisible: false,
      form: {
        name1: '',
        name2: '',
        line: 7,
        msg_sta: 6,
        msg_money: 6,
        msg_area: '西直门',
        msg_enter: 'C2',
        rate: 70,
      },
      err_Data: [
        {
          time: '16:30',
          router: '南山区沙河西路丽康路口',
          type: '商场促销',
        },
      ],
      tag:'推荐',
    }
  },
  methods: {
    // 1.左中menu
    handleSelect(key, keyPath) {
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
      this.getRouter(this.list[this.index].name1,this.list[this.index].name2)
    },
    // 2.默认展开第一项列表详情
    openDetail() {
      this.$nextTick(() => {
        this.$refs.isExpand.toggleRowExpansion(this.router_data[0], true)
      })
    },
    // 3.添加新的OD
    add(form) {
      if (
        form.name1 != '' &&
        form.name2 != '' &&
        form.line != '' &&
        form.msg_area != '' &&
        form.msg_money != '' &&
        form.msg_sta != '' &&
        form.msg_enter != '' &&
        form.rate != ''
      ) {
        this.list.push({
          name1: form.name1,
          name2: form.name2,
          line: form.line,
          msg_sta: form.msg_sta,
          msg_money: form.msg_money,
          msg_area: form.msg_area,
          msg_enter: form.msg_enter,
          rate: form.rate,
        })
        this.dialogVisible = false
        this.form = {
          name1: '',
          name2: '',
          line: '',
          msg_sta: '',
          msg_money: '',
          msg_area: '',
          msg_enter: '',
          rate: '',
        }
      } else {
        this.$notify.error({
          duration: 1000,
          title: '提示',
          message: '请输入完整信息',
        })
      }
    },
    numlimit(val) {
      if (val > 100) {
        this.form.rate = 100
      }
      if (val < 0) this.form.rate = 0
    },
    // 5.js控制css
    columnclass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 1) {
        return 'color: #68d2f9;border-left: .0625rem solid #546581 !important; border-right: .0625rem solid #546581 !important;'
      } else {
        return 'background: transparent;color: #68d2f9;border: none,;borderImage: transparent;fontSize: .8125rem;padding: .625rem 0;'
      }
    },
    // 点击不同的路线显示
    changeRouter(index) {
      console.log(index)
      this.index=index
      this.getRouter(this.list[this.index].name1,this.list[this.index].name2)
    },
    // 获取第一个OD的推荐
    getRouter(name1,name2) {
      if (name1 != '' && name2 != '')
        this.$api.flow
          .postgo({
            index: 1,
            tag: this.tag,
            start: name1,
            end: name2,
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
        if (name1 == '') {
          this.$notify.error({
            position: 'top-left',
            duration: 1000,
            title: '提示',
            message: '起点不能为空',
          })
        }
        if (name2 == '') {
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
    this.openDetail()
    this.getRouter(this.list[this.index].name1,this.list[this.index].name2)
  },
}
</script>

<style lang="less" scoped>
// 0.全局设置
/* 滚动条宽度 */
div::-webkit-scrollbar {
  width: 0rem;
}
#subview_OD_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  // background-color: grey;
}

.OD_side_container {
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
    font-size: 20px;
    color: #00e8bc;
  }
  span {
    margin-left: 0.625rem;
  }
}
.center_side {
  flex: 1;
  display: flex;
  flex-direction: column;
  // background-color: white;
  margin: 2px;
  border: 1px solid #16649d;
}
//2
#OD_center_container {
  flex: 2;
  border: 0.1875rem solid #00cfe0;
  margin: 0.3125rem;
}

#OD_recommand {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.3125rem;
}
.block {
  height: 45%;
  width: 45%;
  background-color: #3d92fd;
  //margin: .3125rem;
  border-radius: 0.625rem;
}
#OD_center_container {
  flex: 2;
  border: 0.1875rem solid #00cfe0;
  margin: 0.3125rem;
}
.odbtn {
  margin-left: 0.625rem;
  margin-right: 0.625rem;
  color: black;
  font-size: 1.375rem;
}
.odbtn_blue {
  font-size: 1.5rem;
  color: blue;
}
.table-content {
  height: 100%;
  overflow-x: hidden;
  position: absolute;
  width: 100%;
}
.box {
  flex: 1;
  position: relative;
  overflow-x: hidden;
}
#error_info {
  flex: 1;
  width: 100%;
  display: flex;
  margin: 0.3125rem;
  overflow-x: hidden;
  /deep/ .el-table,
  /deep/.el-table__expanded-cell {
    overflow-x: hidden;

    padding: 0rem 0rem 0rem 0rem;
    background-color: transparent;
    th {
      padding: 0;
      background-color: transparent;
      // border-color: #556686;
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
div::-webkit-scrollbar {
  width: 0rem;
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
    width: 100%;
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
/deep/.el-menu {
  height: 1.25rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  span {
    border: none;
  }
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
  color: #000;
}

/deep/.el-menu-item {
  width: 0.9375rem;
  // line-height: 100%;
}

/deep/.el-menu--horizontal > .el-menu-item.is-active {
  background: transparent;
  border: none;
  span {
    color: #347edb;
    background: transparent;
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
</style>
