import { createApp } from 'vue'
import router from './router'
// bootstrap (ui)
import '@/assets/css/bootstrap-5.0.2/bootstrap.min.css'
import '@/assets/css/style.css'
// import '@/assets/js/bootstrap-5.0.2/bootstrap.bundle.min.js'
import { Modal } from '@/assets/js/bootstrap-5.0.2/bootstrap.esm.min.js'
// window.bootstrap = bootstrap
import App from './App.vue'


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