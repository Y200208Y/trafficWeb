import request from "./request";
export default {
    login(user){
        return request.post('/user/login',user)
    },
    register(user){
        return request.post('/user/register',user)
    }
}