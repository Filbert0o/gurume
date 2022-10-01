import { createLogger, createStore } from 'vuex';
import authModule from './modules/auth.js';
import popupsModule from './modules/popups.js';
import currentUserModule from './modules/currentUser.js';
import ministriesModule from './modules/ministries.js';
import collegesModule from './modules/colleges';
import staffsModule from './modules/staffs.js';
import paginationModule from './modules/pagination.js';
import toastModule from './modules/toast.js';
import studentsModule from './modules/students.js';
import dioceseModule from './modules/diocese.js';
import newsModule from './modules/news.js';
import groupsModule from './modules/groups.js';
import peopleModule from './modules/people.js';

import http from '@/api';

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()];

const getInitialState = () => ({
  isDataLoading: false,
});

export default createStore({
  plugins,
  strict: true,
  state: getInitialState,
  getters: {
    getIsDataLoading: (state) => state.isDataLoading,
  },
  mutations: {
    SET_INITIAL_STATE: (state) => {
      Object.assign(state, getInitialState());
    },
  },
  actions: {},
  modules: {},
});
