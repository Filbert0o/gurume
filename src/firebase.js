import firebase from 'firebase';
import { ref, onUnmounted } from 'vue';

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
  });
  onUnmounted(close);
  return users;
};
