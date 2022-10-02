import { createStore } from 'vuex';

import { useLoadUsers, deleteUser } from '@/firebase';

const getInitialState = () => ({
  isDataLoading: false,
  users: [],
  currentUser: null,
});

export default createStore({
  state: getInitialState,
  getters: {
    getIsDataLoading: (state) => state.isDataLoading,
    getUsers: (state) => state.users,
    getCurrentUser: (state) => state.currentUser,
  },
  mutations: {
    SET_INITIAL_STATE: (state) => {
      Object.assign(state, getInitialState());
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
    SET_CURRENT_USER: (state, currentUser) => {
      state.currentUser = currentUser;
    },
  },
  actions: {},
  modules: {},
});
