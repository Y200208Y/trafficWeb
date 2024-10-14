<template>
  <!-- 高德地图(大创优先使用)-->
  <!-- 2.右侧地图相关展示 -->
  <div class="map_container">
    <div id="container"></div>
    <div id="routeInfo"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import bus from '@/eventBus/bus'

//引入高德安全密钥
window._AMapSecurityConfig = {
  securityJsCode: '910342263ee60f263779fcf0eef7d2bc',
}

export default {
  data() {
    return {
      //高德地图数据
      Amap: null,
      map: null, //初始化map对象 ，向main输出
      //起点-终点搜索
      autoOptions_start: {
        input: '',
      },
      autoOptions_end: {
        input: '',
      },
      auto_start: null,
      auto_end: null,
      placeSearch: null,
      searchPlaceInput: '',
      info: null,
      start_position: {
        //起始点的位置
        start_position_lat: 0,
        start_position_lng: 0,
      },
      end_position: {
        //终点的位置
        end_position_lat: 0,
        end_position_lng: 0,
      },

      bus_No: '',
      linesearch: null,
      bus_station_traffic: [],
      traffic_color: ['#00FF00', '#99FF00', '#FFFF00', '#FF0000'],
      OD_inf: null,
      OD_linesearch1: null,
      OD_linesearch2: null,
      OD_linesearch3: null,

    }
  },
  methods: {
    //初始化高德
    initMap() {
      AMapLoader.load({
        key: '2819f1e967f76e97ec1ce04755347f06',
        version: '2.0',
        plugins: [
          'AMap.Scale', //比例尺
          'AMap.ToolBar', //工具条
          'AMap.MapType', //常用地图图层
          'AMap.HawkEye', //鹰眼缩略图
          'AMap.PlaceSearch', //地点搜索服务
          'AMap.Geolocation', //定位，提供了获取用户当前准确位置、所在城市的方法~
          'AMap.AutoComplete', //搜索联想
          'AMap.LineSearch', //公交线路搜索
          'AMap.Transfer',//公交线路规划
          'AMap.Geocoder',

        ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          this.Amap = AMap
          this.map = new AMap.Map('container', {
            zoom: 15,
            center: [116.39, 39.9],
          })

          this.OD_drawRoute()
          //添加组件到地图
          this.map.addControl(
            new AMap.Scale({
              position: 'LT',
              offset: [0, 0],
            })
          )
          this.map.addControl(
            new AMap.ToolBar({
              position: 'RB',
              offset: [10, 200],
            })
          )
          this.map.addControl(
            new AMap.MapType({
              position: 'LB',
              offset: [100, 150],
            })
          )
          this.map.addControl(
            new AMap.HawkEye({
              position: 'RB',
              offset: [0, 0],
            })
          )
          this.map.addControl(
            new AMap.Geolocation({
              position: 'RT',
              offset: [10, 10],
            })
          )

          //获取点击处的坐标
          // this.map.on('PlaceSearch', function (e) {
          //   var val = e.lnglat.getLng() + ',' + e.lnglat.getLat()
          //   console.log(val)
          // })

          this.auto_start = new AMap.AutoComplete(this.autoOptions_start)
          this.auto_end = new AMap.AutoComplete(this.autoOptions_end)

          this.placeSearch = new AMap.PlaceSearch({
            map: this.map,
          }) //构造地点查询类

          // AMap.event.addListener(auto_start, 'select', this.select) //注册监听，当选中某条记录时会触发
          // function select(e) {
          //   placeSearch.setCity(e.poi.adcode)
          //   placeSearch.search(e.poi.name) //关键字查询查询
          // }
          this.auto_start.on('select', this.select_start)
          this.auto_end.on('select', this.select_end)

          //根据公交线路号搜索绘制公交线路
          if (this.bus_No != null) {
            this.id_drawRoute()
          }

          //根据OD搜索绘制公交线路
          if (this.OD_inf != null) {
            this.OD_drawRoute()
          }
          this.$notify.success({
            duration: 1000,
            title: '高德地图加载成功',
          })
        })
        .catch((e) => {
          this.$notify.error({
            duration: 1000,
            title: '高德地图加载出错',
          })
        })
      // this.OD_drawRoute()
    },
    //释放高德地图
    MapDestory() {
      this.map && this.map.destroy()
      this.$message({
        message: '高德地图资源释放成功',
        type: 'success',
      })
    },

    //关键词搜索
    select_start(e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) //关键字查询查询
      console.log(e.poi) ////////////////////////////////////////////////////////////该处会返回搜索到的位置的坐标e.poi.location.lat\e.poi.location.lng
      this.start_position.start_position_lat = e.poi.location.lat
      this.start_position.start_position_lng = e.poi.location.lng
      console.log(
        'start',
        this.start_position.start_position_lat,
        this.start_position.start_position_lng
      )
    },
    select_end(e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) //关键字查询查询
      console.log(e.poi)
      this.end_position.end_position_lat = e.poi.location.lat
      this.end_position.end_position_lng = e.poi.location.lng
      console.log(
        'end',
        this.end_position.end_position_lat,
        this.end_position.end_position_lng
      )
    },

    //传递查找到的坐标到flow子组件
    send_start_position() {
      bus.$emit('start_position', this.start_position)
    },
    send_end_position() {
      bus.$emit('end_position', this.end_position)
    },


    //搜索公交线路号并绘制公交线路
    id_drawRoute() {
      this.id_linesearch = new this.Amap.LineSearch({
        pageIndex: 1,
        city: '济南',
        pageSize: 1,
        extensions: 'all',
      })

      let _this = this
      //搜索“536”相关公交线路
      this.id_linesearch.search(this.bus_No, function (status, result) {
        _this.map.clearMap()
        if (status === 'complete' && result.info === 'OK') {
          console.log(result)
          _this.lineSearch_Callback(result)
        } else {
          //alert(result)
        }
      })
    },

    lineSearch_Callback(data) {
      var lineArr = data.lineInfo
      var lineNum = data.lineInfo.length
      var busStation = data.lineInfo[0].via_stops
      if (lineNum == 0) {
      } else {
        for (var i = 0; i < lineNum; i++) {
          var pathArr = lineArr[i].path
          var stops = lineArr[i].via_stops
          var startPot = stops[0].location
          var endPot = stops[stops.length - 1].location
          if (i == 0)
            //作为示例，只绘制一条线路
            this.drawbusLine(startPot, endPot, pathArr, busStation)
        }
      }
    },

    drawbusLine(startPot, endPot, BusArr, busStation) {
      //绘制起点，终点
      var startMarker = new this.Amap.Marker({
        map: this.map,
        position: startPot, //基点位置
        icon: new this.Amap.Icon({
          size: new this.Amap.Size(19, 31),
          imageSize: new this.Amap.Size(19, 31),
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          imageOffset: new this.Amap.Pixel(0, 0),
        }),
        //icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
        zIndex: 10,
        anchor: 'bottom-center',
        imageOffset: new this.Amap.Pixel(0, 0),
      })
      var endMarker = new this.Amap.Marker({
        map: this.map,
        position: endPot, //基点位置
        icon: new this.Amap.Icon({
          size: new this.Amap.Size(19, 31),
          imageSize: new this.Amap.Size(19, 31),
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          imageOffset: new this.Amap.Pixel(0, 0),
        }),
        //icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
        zIndex: 10,
        anchor: 'bottom-center',
      })

      //将乘车的线路按照公交车站分为多个段
      var point_num = BusArr.length
      var station_lines = [] //表示多个站点之间经纬点的二维数组
      var single_station_line = [] //表示两个站点之间经纬点一位数组
      var n = 0 //第n个段
      for (var i = 0; i < point_num; i++) {
        if (
          BusArr[i].lng != busStation[n].location.lng ||
          BusArr[i].lat != busStation[n].location.lat
        ) {
          single_station_line.push(BusArr[i])
        } else {
          single_station_line.push(BusArr[i])
          n = n + 1
          if (n != 1) station_lines.push(single_station_line)
          single_station_line = []
          single_station_line.push(BusArr[i])
        }
      }
      // console.log(station_lines)
      // console.log(startPot)
      // console.log(station_lines)
      // console.log(station_lines[0][0])
      var bus_points
      for (var j = 0; j < station_lines.length; j++) {
        //根据不同路段的不同的拥挤度绘制不同的颜色
        if (this.bus_station_traffic[j] <= 25) {
          var color_id = 0
        } else if (
          this.bus_station_traffic[j] <= 50 &&
          this.bus_station_traffic[j] > 25
        ) {
          var color_id = 1
        } else if (
          this.bus_station_traffic[j] <= 75 &&
          this.bus_station_traffic[j] > 50
        ) {
          var color_id = 2
        } else {
          var color_id = 3
        }
        var busPolyline = new this.Amap.Polyline({
          map: this.map,
          path: station_lines[j],
          strokeColor: this.traffic_color[color_id], //线颜色
          strokeOpacity: 0.8, //线透明度
          isOutline: true,
          outlineColor: 'white',
          strokeWeight: 6, //线宽
        })

        let img = require('../assets/buspoint' + (color_id + 1) + '.png')
        if (j != 0)
          bus_points = new this.Amap.Marker({
            map: this.map,
            position: station_lines[j][0], //基点位置
            icon: new this.Amap.Icon({
              size: new this.Amap.Size(10, 10),
              imageSize: new this.Amap.Size(10, 10),
              image: img,
              imageOffset: new this.Amap.Pixel(0, 0),
            }),
            //icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
            zIndex: 10,
            anchor: 'bottom-center',
          })
      }
      // 将以上所绘制的多个段所组成的路线显示在地图中心并自动缩放地图到合适级别。
      // true表示需要动画过程，[60,200,60,60]表示上下左右避让像素
      var center = new this.Amap.Polyline({
        map: this.map,
        path: BusArr,
        strokeColor: 0, //线颜色
        strokeOpacity: 0, //线透明度，要求完全透明，不影响以上所绘制的多个段所组成的路线
        isOutline: true,
        outlineColor: 'white',
        strokeWeight: 6, //线宽
      })
      this.map.setFitView(center, true, [60, 200, 60, 60])
    },
    OD_drawRoute() {
      var drivingOption = {
        map: this.map,
        city: '北京市',
        policy: this.Amap.TransferPolicy.LEAST_TIME,
      }
      var transfer = new this.Amap.Transfer(drivingOption) //构造驾车导航类
      // var Geolocation= new this.Amap.Geolocation()//将地理位置->地理坐标
      var geocoder = new this.Amap.Geocoder({
        city: '010', //城市设为北京，默认：“全国”
      })
      var start=[]
      var end=[]
      geocoder.getLocation(
        '北京邮电大学海淀校区',
        async function (status, result) {
          if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            console.log(lnglat)
            start.push(lnglat.lng)
            start.push(lnglat.lat)
          } else {
            log.error('根据地址查询位置失败')
          }
        }
      )
      geocoder.getLocation(
        '北京航空航天大学海淀校区',
        async function (status, result) {
          if (status === 'complete' && result.geocodes.length) {
            var lnglat = result.geocodes[0].location
            console.log(lnglat)
            end.push(lnglat.lng)
            end.push(lnglat.lat)
          } else {
            log.error('根据地址查询位置失败')
          }
        }
      )

      //根据起终点坐标规划驾车路线
      transfer.search(
        // [
        //   { keyword: '北京邮电大学海淀校区', city: '010' },
        //   { keyword: '北京航空航天大学海淀校区', city: '010' },
        // ],
        [116.379028, 39.865042],
        [116.427281, 39.903719],
        function (status, result) {
          // console.log(status,result)
        }
      )
    //根据OD绘制三条公交线路
    OD_drawRoute() {
      this.OD_linesearch1 = new this.Amap.Transfer({
        city: '北京',
        nightflag: true,
        policy: 0,
      })
      //console.log(this.OD_linesearch)
      this.OD_linesearch2 = new this.Amap.Transfer({
        city: '北京',
        nightflag: true,
        policy: 2,
      })
      this.OD_linesearch3 = new this.Amap.Transfer({
        city: '北京',
        nightflag: true,
        policy: 5,
      })
      this.search_busline(this.OD_inf.O, this.OD_inf.D)
    },

    search_busline(O, D) {
      //根据起点终点搜寻公交车线路
      var location = { keyword: '北京邮电大学(沙河校区)'}
      var des = { keyword: '北京工人体育场' }
      let _this = this
      this.OD_linesearch1.search([location, des], function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          console.log('result', result)
          //按照途经点绘制不同颜色的线路
          _this.draw(result, 1)
        } else {
          alert(result)
        }
      })
      this.OD_linesearch2.search([location, des], function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          console.log('result', result)
          //按照途经点绘制不同颜色的线路
          _this.draw(result, 2)
        } else {
          alert(result)
        }
      })
      this.OD_linesearch3.search([location, des], function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          console.log('result', result)
          //按照途经点绘制不同颜色的线路
          _this.draw(result, 3)
        } else {
          alert(result)
        }
      })
    },

    draw(result, color_id) {
      var route = result.plans[0]
      //标记起点
      var startMarker = new this.Amap.Marker({
        map: this.map,
        position: route.segments[0].transit.origin, //基点位置
        icon: new this.Amap.Icon({
          size: new this.Amap.Size(19, 31),
          imageSize: new this.Amap.Size(19, 31),
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          imageOffset: new this.Amap.Pixel(0, 0),
        }),
        zIndex: 10,
        anchor: 'bottom-center',
      })
      //标记终点
      var endMarker = new this.Amap.Marker({
        map: this.map,
        position: route.segments[route.segments.length - 1].transit.destination, //基点位置
        icon: new this.Amap.Icon({
          size: new this.Amap.Size(19, 31),
          imageSize: new this.Amap.Size(19, 31),
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          imageOffset: new this.Amap.Pixel(0, 0),
        }),
        zIndex: 10,
        anchor: 'bottom-center',
      })
      var routeLines = []
      for (var i = 0, l = route.segments.length; i < l; i++) {
        var segment = route.segments[i]
        var line = null
        var color = null
        // 绘制步行路线
        if (segment.transit_mode == 'WALK') {
          line = new AMap.Polyline({
            path: segment.transit.path,
            isOutline: true,
            outlineColor: '#ffeeee',
            borderWeight: 2,
            strokeWeight: 5,
            strokeColor: 'grey',
            lineJoin: 'round',
            strokeStyle: 'dashed',
          })
          line.setMap(this.map)
          routeLines.push(line)
        } else if (
          segment.transit_mode == 'SUBWAY' ||
          segment.transit_mode === 'BUS'
        ) {
          if (color_id == 1) {
            color='6699FF'
          }else if(color_id == 2){
            color='FFFF00'
          }else if(color_id == 3){
            color='FF0000'
          }
          line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: color,
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: color,
              lineJoin: 'round',
              strokeStyle: 'solid',
            })
            line.setMap(this.map)
            routeLines.push(line)
        } else {
          // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
        }
      }
      // 调整视野达到最佳显示区域
      this.map.setFitView(routeLines)
    },
  },
  created() {
    // this.initMap()
    this.current_input = ''
    bus.$on('share_startInput', (val) => {
      this.autoOptions_start.input = val.search_id
      this.searchPlaceInput = val.userInput
      // console.log('map',this.autoOptions,bus)
    })
    bus.$on('share_endInput', (val) => {
      this.autoOptions_end.input = val.search_id
      this.searchPlaceInput = val.userInput
      // console.log('map',this.autoOptions,bus)
    })
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    bus.$on('bus_id_inf_send', (val) => {
      this.bus_No = val.bus_No
      this.bus_station_traffic = val.bus_station_traffic
      // console.log(this.bus_No)
      // console.log(this.bus_station_traffic)
    })
    bus.$on('bus_OD_inf_send', (val) => {
      this.OD_inf = val
      console.log(this.OD_inf)
    })
    this.initMap()
    // this.OD_drawRoute()
    this.send_start_position()
    this.send_end_position()
  },
  beforeDestroy() {
    this.map && this.map.destroy()
    this.$message({
      message: '高德地图资源释放成功',
      type: 'success',
    })
  },
  watch: {
    searchPlaceInput(newValue) {
      if (newValue != null) {
        this.placeSearch.search(newValue)
      }
    },
    bus_No(newValue) {
      if (
        newValue != null &&
        this.bus_station_traffic != null &&
        this.linesearch != null
      ) {
        this.drawRoute()
      }
    },
    bus_station_traffic(newValue) {
      if (newValue != null && this.bus_No != null && this.linesearch != null) {
        this.drawRoute()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.map_container {
  width: 100%;
  height: 100% !important;

  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
