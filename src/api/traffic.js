import request from "./request";
export default{
    // 获取某一站点的流量数据
    getStationFlow(type,StatonName,index){
        return request.get('/traffic/traffic?bus='+type+'&station='+StatonName+'&index='+index)
    },
    // 获取右上道路时间表格
    getErrorTable(){
        return request.get('/traffic/event')
    },
    // 获取道路事件的流量
    getRouterLow(RouterName){
        return request.get('/traffic/road?name='+RouterName)
    },
    // 获取左上线路站点表格数据
    getRouterStation(stationname){
        return request.get('/traffic/line?name='+stationname)
    }
}