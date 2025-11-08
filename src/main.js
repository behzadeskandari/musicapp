import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import './assets/css/main.css'
import validationPlugin from './includes/validation.js'
const app = createApp(App)
app.use(createPinia())
app.use(validationPlugin,{
  classes: true
})
app.use(router)

app.mount('#app')
