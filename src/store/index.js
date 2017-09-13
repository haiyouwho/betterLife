import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex);
const state = {
    refresh: 0, //记录列表滚动位置，详情返回设置为0，不获取数据，其他页面页面进入设置为-1，重新获取数据
    scrollLocation: false, //默认记录body的scrollTop值
    reLoadList: false, //重新获取列表数据，每次获取完后重置为false
    handRoomList: [], //重新获取列表数据，每次获取完后重置为false
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})