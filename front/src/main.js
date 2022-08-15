import {createApp} from 'vue'
import router from './router'
import '@/assets/css/style.css'
import App from './App.vue'

// bootstrap (ui)
import '@/assets/css/bootstrap-5.0.2/bootstrap.min.css'
import '@/assets/js/bootstrap-5.0.2/bootstrap.bundle.min.js'


function initApp() {
  const app = createApp(App)
  app.use(router).mount('#app')
}

if(window.hasOwnProperty("cordova")) {
  //cordova
  console.log('Navigateur de mobile.')
  document.addEventListener('deviceready', () => {
    initApp()
  }, false);
} else {
  //browser
  document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Navigateur de bureau')
    initApp()
  })
}