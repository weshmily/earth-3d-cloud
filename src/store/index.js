import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import user from './module/user'

Vue.use(Vuex)
console.log(mutations)
export default new Vuex.Store({
  state,
  mutations,
	actions,
	modules:{
		user
	}
})
