<template>
  <section id="intro" :style="{ backgroundImage: `url(${backgroundImage})` }">
  <!-- dev -->
    <div class="d-flex flex-row justify-content-center">
      <div>{{ resultat }}</div>
      <button @click="testGoPage(1)">test page 1</button>
      <button @click="testGoPage(5)">test page 5</button>
    </div>
    <div>
      <header>
        <h2 style="color:white;">Jardin App.</h2>
      </header>
      <p style="color:white;">
        Bienvenue à
        <strong>App name ou Autre!</strong> Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
        Fusce blandit ultrices sapien, in accumsan orci rhoncus eu!
      </p>
      <br />
      <br />

      <ScanQrcode :expected="expected" :qrbox="250" :fps="10" style="width: 400px;height: 400px;" @resultat="onScan" />
      <br/><br/><br/><br/><br/><br/>
      
      <footer>
        <a href="#one">
          <button type="button" class="btn bg-transparent" style='font-size: 25px; border-color:white; color:white;'>&dArr;</button>
        </a>
      </footer>
    </div>
  </section>

  <section id="one" class="main style2 right dark fullscreen" :style="{ backgroundImage: `url(${backgroundImageOne})` }">

    <div class="content-style2">
      <div class="slide-right">
        <header>
          <h2>Les compositions</h2>
        </header>
      </div>

      <div class="line fade-in"></div>

      <div class="slide-left">
        <p>
          Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
          Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu,
          id varius justo euismod in. Curabitur egestas consectetur magna.
          <br />ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.
          Fusce blandit ultrices sapien, Sed sodales venenatis arcu,
          id varius justo euismod in. Curabitur egestas consectetur magna.
          <br />
        </p>
      </div>
    </div>

  </section>
</template>

<script setup>
import ScanQrcode from '@/components/ScanQrcode.vue'
import { ref } from 'vue'

// routes
import { useRouter } from 'vue-router'

// medias: images en background
import backgroundImage from "@/assets/images/first.jpg"
import backgroundImageOne from "@/assets/images/one.jpg"

const router = useRouter()

const routesQrCode = [
  { code: "https://m.tibillet.re/q474d", route: "/Page5" },
  { code: "https://m.tibillet.re/sd4df", route: "/Page4" },
  { code: "https://m.tibillet.re/q47f7", route: "/Page3" },
  { code: "https://m.tibillet.re/q47s4", route: "/Page2" },
  { code: "https://m.tibillet.re/q474s", route: "/Page1" }
]
 // https://raffinerie.tibillet.re/qr/07510c96-6eda-48a9-b31e-149042068112


// résultats qrcodes attendu
let expected = []
for (let i = 0; i < routesQrCode.length; i++) {
  expected.push(routesQrCode[i].code)
}


let resultat = ref('')

// dev test
function testGoPage(numPage) {
  router.push('/Page'+numPage)
}

function onScan(decodedText, decodedResult) {
  console.log('-> fonc onScan !')
  console.log('decodedText =', decodedText)
  console.log('decodedResult =', decodedResult)
  resultat.value = decodedText


  const test = routesQrCode.find(obj => obj.code === decodedText)
  if (test !== undefined) {
    // Stoper le  lecteur de qrcode
    // Aller à la page
    console.log('-> route =', test.route)
    router.push(test.route)
  } else {
    console.log('Qrcode non géré, inconnu !')
  }
  console.log('test =', test)
}

</script>

<style>
#intro {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/*    2iem page accueil! */

#one {
  background-size: cover;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed, fixed;
  background-position: top left, center center;
}

.content-style2 {
  margin: auto;
  width: 60%;
  background: #fff;
  padding: 10%;
  overflow: hidden;
  box-shadow: 0 0 25px #000;
  border: 1px solid #444;  
  text-align: center;
}

p{
  font-size: 20px;
  color: #444;
}

.slide-right, .slide-left {
  width: 100%;
}

.slide-right {
  animation: 3s slide-right;
}
@keyframes slide-right {
  from {
    margin-left: -100%;
  }
  to {
    margin-left: 0%;
  }
}

/***** Slide Left *****/
.slide-left {
  animation: 3s slide-left;
}
@keyframes slide-left {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}

.line {
  border-bottom: 3px solid red;
  width: 200px;
  margin: auto;
}
.fade-in {
  animation: fadeIn ease 3s;
}
@keyframes fadeIn{
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}

</style>
