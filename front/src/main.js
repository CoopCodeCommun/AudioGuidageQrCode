import {createApp} from 'vue'
import router from './router'
import '@/assets/css/style.css'
import App from './App.vue'

// bootstrap (ui)
import '@/assets/css/bootstrap-5.0.2/bootstrap.min.css'
import '@/assets/js/bootstrap-5.0.2/bootstrap.bundle.min.js'


window.useCordova = true

function initApp() {
  const app = createApp(App)
  app.use(router).mount('#app')
}

if (window.useCordova === true) {
  //cordova
  document.addEventListener('deviceready', () => {
    initApp()
  }, false);
} else {
  //browser
  document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Navigateur, window.useCordova =', window.useCordova)
    initApp()
  })
}