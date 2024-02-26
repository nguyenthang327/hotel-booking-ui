
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import Antd from 'ant-design-vue'
import VueMoment from 'vue-moment';

import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(router)
    .use(VueAxios, axios)
    .use(store)
    .use(Antd)
    .use('moment', VueMoment)
    .mount('#app')

