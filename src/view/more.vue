<template>
  <div id="more_container">
    <!-- 1.顶部 -->
    <div id="header_container">
      <!-- 1.1标题 -->
      <div id="header_title">
        <div class="header_font" style="transform: translateX(5.9375rem)">
          <span v-if="this.$route.path=='/trafficForecast'">济南市</span>
          <span v-else>北京市</span>
        </div>
        <div id="header_center_title">
          <span>智慧城市交通预测平台验证系统</span>
        </div>
        <div class="header_font" style="transform: translateX(-5.625rem)">
          <span>{{ this.current_time }}</span>
        </div>
      </div>
      <!-- 1.2导航栏 -->
      <div id="header_menu">
        <el-menu
          :default-active="this.$route.path"
          mode="horizontal"
          router
          background-color="#072131"
          text-color="#008998"
          active-text-color="#00FEFE"
        >
          <el-menu-item :index="select_item[0].routerValue"
            ><span class="restore">{{
              select_item[0].Item_name
            }}</span></el-menu-item
          >
          <el-menu-item :index="select_item[1].routerValue"
            ><span class="restore">{{
              select_item[1].Item_name
            }}</span></el-menu-item
          >
          <el-menu-item :index="select_item[2].routerValue"
            ><span class="restore">{{
              select_item[2].Item_name
            }}</span></el-menu-item
          >
        </el-menu>
      </div>
    </div>
    <!-- 2.中部 -->
    <div id="center_container">
      <router-view></router-view>
    </div>
    <!-- 3.底部 -->
    <div id="footer_container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_time: '',
      select_item: [
        {
          routerValue: '/trafficForecast',
          Item_name: '城市道路交通预测',
        },
        {
          routerValue: '/flowForecast',
          Item_name: '公交乘客流预测与路线推荐',
        },
        {
          routerValue: '/odForecast',
          Item_name: '个体起点预测与出行推荐',
        }, //导航栏的值，以及路由到的子组件
      ],
    }
  },
  methods: {
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
  mounted() {},
  beforeDestroy() {
    if (this.current_time) {
      clearInterval(this.getTimesInterval); 
    }
  },
}
</script>

<style lang="less" scoped>
// 0.全局设置
#more_container {
  width: 100%;
  height: 100%;
  // background-color: aquamarine;
  background-image: url('@/assets/background4.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
// 1.顶部
#header_container {
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  flex: 15;
  #header_title {
    display: flex;
    width: 100%;
    flex: 65;
    background-image: url('@/assets/application-header.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    .header_font {
      width: 50%;
      height: 100%;
      font-size: 1.25rem;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      color: #ffffff;
      text-shadow: 0 -0.125rem 0.0625rem #00c6ff,
        /*上*/ 0.0625rem -0.0625rem 0.0625rem #00c6ff,
        /*右上*/ 0.125rem 0 0.0625rem #00c6ff,
        /*右*/ 0.0625rem 0.0625rem 0.0625rem #00c6ff,
        /*右下*/ 0 0.0625rem 0.0625rem #00c6ff,
        /*下*/ -0.0625rem 0.0625rem 0.0625rem #00c6ff,
        /*左下*/ -0.125rem 0 0.0625rem #00c6ff,
        /*左*/ -0.0625rem -0.0625rem 0.0625rem #00c6ff; /*左上*/
      //   background-color: white;
      span {
        margin-bottom: 11px;
      }
    }
    #header_center_title {
      width: 100%;
      height: 100%;
      font-size: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #c2f7fe;
      //   text-shadow: 0 0 .25rem #99E1EC;
      text-shadow: 0 -0.25rem 0.125rem #00c6ff,
        /*上*/ 0.125rem -0.125rem 0.125rem #00c6ff,
        /*右上*/ 0.25rem 0 0.125rem #00c6ff,
        /*右*/ 0.125rem 0.125rem 0.125rem #00c6ff,
        /*右下*/ 0 0.25rem 0.125rem #00c6ff,
        /*下*/ -0.125rem 0.125rem 0.125rem #00c6ff,
        /*左下*/ -0.25rem 0 0.125rem #00c6ff,
        /*左*/ -0.125rem -0.125rem 0.125rem #00c6ff; /*左上*/
      //   background-color: yellow;
    }
  }
  #header_menu {
    width: 100%;
    flex: 35;
    background-color: #00c6ff;
    display: flex;
    /deep/.el-menu {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /deep/.el-menu.el-menu--horizontal {
      margin: 0;
      padding: 0;
      border: none;
    }
    /deep/.el-menu--horizontal > .el-menu-item {
      height: 100%;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: skew(-30deg);
      border-left: 1px solid;
      border-right: 1px solid;
      border-top: none;
      border-bottom: none;
      border-image: linear-gradient(to top, #004c54, #00bbc1, #004c54) 1;
    }
    /deep/.el-menu-item {
      line-height: 100%;
    }
    /deep/.el-menu--horizontal > .el-menu-item.is-active {
      background: linear-gradient(#05214c, #003f48);
      border: 2px solid;
      border-image: linear-gradient(to right, #004c54, #00bbc1, #004c54) 2;
    }
    /deep/.restore {
      height: 20px;
      line-height: 20px;
      width: 100%;
      transform: skew(30deg) !important;
    }
  }
}
// 2.中部
#center_container {
  flex: 91;
  // background-color: red;
  display: flex;
  padding-right: 10px;
  padding-left: 10px;
}
// 3.底部
#footer_container {
  height: 20px;
  width: 100%;
  // background-color: antiquewhite;
}
</style>
