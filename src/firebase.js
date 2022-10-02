import firebase from 'firebase';
import { ref, onUnmounted } from 'vue';
import store from './store';

const config = {
  apiKey: 'AIzaSyCRGCT3rHYxWxMRmf09htaoxXw-nL73qYI',
  authDomain: 'gurume-30ffd.firebaseapp.com',
  projectId: 'gurume-30ffd',
  storageBucket: 'gurume-30ffd.appspot.com',
  messagingSenderId: '913721293251',
  appId: '1:913721293251:web:f476d5a4719fc0e90a6576',
  measurementId: 'G-XM5H1YX2B4',
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

/*
  user: {
    everything from auth0,
    achievements: [{id: 0, title: '', progress: '', unit: 'amount'}],
    roles: [],
  }
*/

const usersCollection = db.collection('users');

export const createUser = (user) => {
  return usersCollection.add(user);
};

export const getUser = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};

export const useLoadUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    store.commit('SET_USERS', users.value);
  });
  onUnmounted(close);
  return users;
};

const helpRequestListCollection = db.collection('helpList');

export const createHelpRequest = (helpRequest) => {
  console.log(helpRequest);
  return helpRequestListCollection.add(helpRequest);
};

export const getHelpRequest = async (id) => {
  const helpRequest = await helpRequestListCollection.doc(id).get();
  return helpRequest.exists ? helpRequest.data() : null;
};

export const updateHelpRequest = (id, helpRequest) => {
  return helpRequestListCollection.doc(id).update(helpRequest);
};

export const deleteHelpRequest = (id) => {
  return helpRequestListCollection.doc(id).delete();
};

export const useLoadHelpRequest = () => {
  const helpRequests = ref([]);
  const close = helpRequestListCollection.onSnapshot((snapshot) => {
    helpRequests.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(helpRequests.value);
  });
  onUnmounted(close);
  return helpRequests;
};

/*
  currentHelpList: {
    rolesNeeded: [],
    question: '',
    userWhoMadeId: '',
    userWhoMadeName: '',
    status: '' (pending),
  }
*/

// const achievements = db.collection('users');

// export const createUser = (user) => {
//   return usersCollection.add(user);
// };

// export const getUser = async (id) => {
//   const user = await usersCollection.doc(id).get();
//   return user.exists ? user.data() : null;
// };

// export const updateUser = (id, user) => {
//   return usersCollection.doc(id).update(user);
// };

// export const deleteUser = (id) => {
//   return usersCollection.doc(id).delete();
// };

// export const useLoadUsers = () => {
//   const users = ref([]);
//   const close = usersCollection.onSnapshot((snapshot) => {
//     users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     store.commit('SET_USERS', users.value);
//   });
//   onUnmounted(close);
//   return users;
// };
