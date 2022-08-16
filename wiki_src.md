# Projet Audio guidage par qrcode (de zéro):

## - Cordova
```
cordova create AudioGuidageQrCode re.tibillet.AudioGuidageQrCode AudioGuidageQrCode
cd projet-chris-haga
cordova platform add android
```
### Activer le choix d'autoriser ou non l'utilisation de la camera (indispenssable !)
Ajouter dans le fichier "platforms/android/app/src/main/AndroidManifest.xml" entre les balises "manifest":
```
<manifest .... >
    ....
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.FLASHLIGHT" />
    <uses-feature android:name="android.hardware.camera" android:required="true" />
</manifest>
```

## - Vue + vite (à la racine du projet)
```
npm create vite@latest front -- --template vue
cd front
npm install
npm install vue-router -S
npm install bootstrap-icons-vue -S
npm run dev
```

### Configuration du build dans le dossier www de cordova
Ajouter à vite.config.js :
```
export default defineConfig({
  ...
  build: {
    outDir: '../www'
  },
  ...
})
```

### Mise en corrélation du fichier index.html de vue avec celui de cordova

#### Lecteur de qrCode cross platform
https://github.com/mebjas/html5-qrcode   
```
npm i html5-qrcode
```

#### Remplacer le fichier index.html de vue par celui de cordova.

#### Supprimer
```
<script src="js/index.js"></script>
```

#### Ajouter
```
<div id="app"></div>
```

#### "main.js" de base
```
import {createApp} from 'vue'
import router from './router'
import './style.css'
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
```

## Etape 1 - Modifier le code dans vue(dossier "front")
- Coder   
- "Builder"
```
npm run build
```

## Etape 2 - Construiser votre application cordova(racine du projet)
```
cordova build android
cordova run android
```

## Debug sur navigateur - "chrome://inspect/#devices"
