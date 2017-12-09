import * as Api from 'src/api';

const state = {
    info: {}
}

// getters
const getters = {

}

// actions
const actions = {
    getBaseinfo({ state, commit }, params) {
        return new Promise((resolve, reject) => {
            Api.getBaseInfo().then(data => {
                commit("INIT_BASEINFO", data.list);
                resolve(data);
            }, error => {
                reject(error);
            });
        })
    }
}

// mutations
const mutations = {
    INIT_BASEINFO(state, data) {
        state.info = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}