import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { createAuth0 } from '@auth0/auth0-vue';

/ import font awesome icon component /;
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import './assets/main.css';
import { domain, clientId as client_id } from '../auth_config.json';

library.add(faUserGraduate);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(store);
app.use(
  createAuth0({
    domain,
    client_id,
    redirect_uri: window.location.origin,
  })
);

app.mount('#app');
