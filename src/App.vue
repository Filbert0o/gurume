<script>
import { useAuth0 } from '@auth0/auth0-vue';
import { useStore } from 'vuex';
import { watch, computed } from 'vue';
import axios from 'axios';
import { createUser } from '@/firebase';

export default {
  setup() {
    const store = useStore();
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

    const userFromStore = computed(() => store.getters['getUsers']);

    watch(user, async () => {
      if (user.value?.email && !userFromStore.value?.find((x) => x.id === user.value)) {
        await createUser({ ...user.value, achievements: {}, roles: [] });
      }
      if (userFromStore.value?.find((x) => x.id === user.value)) {
        store.commit(
          'SET_CURRENT_USER',
          userFromStore.value?.find((x) => x.id === user.value)
        );
      } else {
        store.commit('SET_CURRENT_USER', {
          ...user.value,
          achievements: {},
          roles: ['web-developer'],
        });
      }
    });

    return {
      login: async () => {
        await loginWithRedirect();
        const { data } = await axios.get('http://localhost:3000/getTwilioToken');
        console.log(data);
        localStorage.setItem('twilioJWT', data);
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
      user,
      isAuthenticated,
      userFromStore,
      createUser,
    };
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg self-nav">
      <div class="container-fluid self-container">
        <div>
          <router-link class="nav-link self-link" :to="`/`">
            <h1 class="header" style="color: white">
              <span><font-awesome-icon icon="fa-solid fa-user-graduate" /></span> Gurume
            </h1>
          </router-link>
        </div>
        <div class="collapse navbar-collapse self-navbar" id="navbarSupportedContent">
          <ul class="col-8 navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link self-link" aria-current="page" href="#">Courses</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link self-link" :to="`/achievements`">
                <a class="nav-link self-link">Achievements</a>
              </router-link>
              <!-- <a class="nav-link self-link" router>Achievements</a> -->
            </li>
            <li class="nav-item">
              <a class="nav-link self-link" aria-current="page" href="#">Career</a>
            </li>
            <li class="nav-item">
              <a class="nav-link self-link" href="#">About Us</a>
            </li>
            <li v-if="!isAuthenticated" class="login">
              <a class="btn nav-link self-link" @click="login">LOG IN</a>
            </li>
            <li v-else class="login">
              <a class="btn nav-link self-link" @click="logout">LOG OUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,700,900');

.navbar-nav {
  margin-left: 410px;
  display: flex;
  align-items: center;
  justify-content: right;
  position: absolute;
  left: 3%;
}
.header {
  margin-left: 70px;
}

.self-nav {
  margin-left: 20px;
  height: 100px;
  font-size: 18px;
}
.self-link {
  color: white;
  margin: 0px;
}
.nav-item {
  margin: 30px;
}
.login {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 100px;
  margin-top: 30px;
  margin-bottom: 40px;
  background: none;
  color: green;
  text-decoration-color: white;
  border: 2px solid;
  padding: 2px 2px;
  font-size: 1em;
  border-radius: 0.5rem;
}
button:hover {
  border-color: #f1ff5c;
  color: white;
  background-color: green;
  box-shadow: 0 0.5em 0.5em -0.4em #f1ff5c;
  transform: translateY(-0.25em);
  cursor: pointer;
}
</style>
