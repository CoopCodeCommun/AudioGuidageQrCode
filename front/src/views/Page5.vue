<template>
  <section id="pg5" class="overflow-hidden" :style="{ backgroundImage: `url(${backgroundImagePg5})` }">
    <div class="d-flex flex-row justify-content-center mt-2 mb-2">
      <div class="d-flex justify-content-center align-items-center container-icons-vue ms-1 me-1" role="button" @click="toggleAction()">
        <BIconPlayFill v-if="buttonAction === 'play'" class="icons-vue1 t4rem rotate90"/>
        <BIconPauseFill v-if="buttonAction === 'pause'" class="icons-vue1 t4rem"/>
      </div>
      <div class="d-flex justify-content-center align-items-center container-icons-vue  ms-1 me-1" role="button" @click="router.push('/')">
        <BIconHouseFill class="icons-vue1  t2-5rem"/>
      </div>
    </div>

    <div class="marquee-wrap">
      <div class="marquee">
        <p style="color: white;text-shadow: 3px 3px 4px black;">
          <b> Rogue, inconspicuous motes of rock </b>and gas descended from astronomers Sea of Tranquility billions upon
          billions star stuff harvesting star light stirred by starlight, Flatland billions upon billions vastness is
          bearable only through love great turbulent e muse about! Cambrian explosion dispassionate extraterrestrial
          observer.
          <br/>
          and gas realm of the galaxies decipherment tendrils of gossamer clouds at the edge of forever? Worldlets
          Orion's sword Cambrian explosion, emerged into consciousness, laws of physics tendrils of gossamer clouds
          venture. Flatland paroxysm of global
          death Jean-François Champollion.
        </p><br/>
      </div>
    </div>

  </section>

</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

// bootstrap-icons-vue - prefixed with BIcon. For example, the icon pause-fill is exported as BIconPauseFill
// icons list : https://icons.getbootstrap.com/
import {BIconPlayFill, BIconPauseFill, BIconHouseFill} from 'bootstrap-icons-vue'

import backgroundImagePg5 from "@/assets/images/tropical.jpg"

const router = useRouter()
let buttonAction = ref('play')

function toggleAction() {
  if (buttonAction.value === 'play') {
    buttonAction.value = 'pause'
  } else {
    buttonAction.value = 'play'
  }
}
</script>

<style scoped>
.container-icons-vue {
  width: 5rem;
  height: 5rem;
  background-color: #f4471f;
  border-radius: 50%;
  margin: 0 6px;
}

.t2-5rem {
  width: 2.5rem;
  height: 2.5rem;
}

.t4rem {
  width: 4rem;
  height: 4rem;
}

.icons-vue1 {
  color: #FFFFFF;
}

.rotate90 {
  transform: rotate(90deg);
}

#pg5 {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.marquee-wrap {
  /* hauteur calculée */
	height: calc(100% - 100px);
}
</style>
