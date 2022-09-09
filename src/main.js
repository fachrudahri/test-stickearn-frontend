import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes'
import { store } from './stores'

import './assets/main.css'

createApp(App)
    .use(Router)
    .use(store)
    .mount('#app')

import "bootstrap/dist/js/bootstrap.js"
