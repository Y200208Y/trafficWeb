import request from "./request";
export default{
    postgo(info){
        return request.post('/traffic/station',info)
    }
}