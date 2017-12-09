import Vue from 'vue';
import Vuex from 'vuex';

import * as modules from './modules/base.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: modules
});