import Vue from 'vue'
import login from './login'
import traffic from './traffic'
import od from './Od'
import flow from './flow'

const api={
    login,
    traffic,
    od,
    flow,
}

Vue.prototype.$api=api
export default api