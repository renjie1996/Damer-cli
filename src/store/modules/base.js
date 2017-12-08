import * as types from '../mutation-types';

const state = {
    info: {},
    isAdmin: 0,
    areaidName: '',
}

// getters
const getters = {

}

// actions
const actions = {
    // rootState根节点的状态
    'init/baseinfo' ({ state, commit, rootState }, data) {
        commit(types.INIT_BASEINFO, data);
    }
}

// mutations
const mutations = {
    [types.INIT_BASEINFO](state, data) {
        state.info = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}