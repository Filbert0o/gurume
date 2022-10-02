import { createStore } from 'vuex';

import { useLoadUsers, deleteUser } from '@/firebase';

const getInitialState = () => ({
  isDataLoading: false,
  users: [],
});

export default createStore({
  state: getInitialState,
  getters: {
    getIsDataLoading: (state) => state.isDataLoading,
    getUsers: (state) => state.users,
  },
  mutations: {
    SET_INITIAL_STATE: (state) => {
      Object.assign(state, getInitialState());
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
  },
  actions: {},
  modules: {},
});
