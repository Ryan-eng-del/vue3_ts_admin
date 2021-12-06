import { createApp } from 'vue'
// It
import router from './route'
import { store, initStore } from './store'
import 'normalize.css'
import './assets/css/index.css'
// My
import registerGolbal from './global'
import App from './App.vue'

const app = createApp(App)
app.use(registerGolbal)
app.use(store)
initStore()
app.use(router)
app.mount('#app')