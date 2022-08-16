<template>

  <svg id="bt-scan" @click="scanQrCode()" xmlns="http://www.w3.org/2000/svg" width="75" height="75" color="white"
       fill="currentColor" class="bi bi-qr-code-scan" viewBox="0 0 16 16">
    <path
        d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"/>
    <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"/>
    <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"/>
    <path
        d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"/>
    <path d="M12 9h2V8h-2v1Z"/>
  </svg>
  <div id="reader"></div>

  <!-- Modal -->
  <div class="modal fade" id="modal-camera-message" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Attention</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Pour Utiliser le lecteur de qr-code, il faut autoriser l'utilisation de l'appareil photo:
          <ul>
            <li>
              <div>Menu Application / nom de l'application /</div>
              <div>autorisations / appareil photo.</div>
            </li>
            <li>Redémarrer l'application.</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Html5Qrcode} from "html5-qrcode"

const props = defineProps({
  expected: Array,
  qrbox: {
    type: Number,
    default: 200
  },
  fps: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['resultat'])
let html5QrCode

function scanQrCode() {
  console.log('-> lecteur qrCode lancé !')
  document.querySelector('#bt-scan').style.display = 'none'

  // This method will trigger user permissions
  Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
      var cameraId = devices[0].id;
      console.log('-> Caméra ok !')
      html5QrCode = new Html5Qrcode("reader")
      const config = {fps: props.fps, qrbox: {width: props.qrbox, height: props.qrbox}};
      let cameraLocation = {facingMode: "environment"}
      if (window.usingCordova === false) {
        cameraLocation = {facingMode: "user"}
      }
      html5QrCode.start(cameraLocation, config, onScanSuccess)
    }
  }).catch(err => {
    console.log('Caméar, ' + err)
    const elementModal = document.querySelector('#modal-camera-message')
    const modal = new bootstrap.Modal(elementModal) // Returns a Bootstrap modal instance
    modal.show()

  })

  /*
  let constraints = {audio: false, video: {width: 600, height: 600, facingMode: {exact: "environment"}}}
  if (window.usingCordova === false) {
    constraints = {audio: false, video: {width: 600, height: 600}}
  }

  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    console.log('-> Caméra ok !')
    html5QrCode = new Html5Qrcode("reader")
    const config = {fps: props.fps, qrbox: {width: props.qrbox, height: props.qrbox}};
    let cameraLocation = {facingMode: "environment"}
    if (window.usingCordova === false) {
      cameraLocation = {facingMode: "user"}
    }
    html5QrCode.start(cameraLocation, config, onScanSuccess)
  }).catch(function (err) {
    console.log('Caméar, ' + err.name + ": " + err.message);
    const elementModal = document.querySelector('#modal-camera-message')
    const modal = new bootstrap.Modal(elementModal) // Returns a Bootstrap modal instance
    modal.show()
  })
   */
}

function stopScanQrCode() {
  html5QrCode.stop().then(ignore => {
    // QR Code scanning is stopped.
    console.log("QR Code scanning stopped.")
  }).catch(err => {
    // Stop failed, handle it.
    console.log("Unable to stop scanning.")
  })
}

function onScanSuccess(decodedText, decodedResult) {
  console.log('-> fonc onScanSuccess:')
// si valeur attendue bonne émettre
  if (props.expected.includes(decodedText) === true) {
    stopScanQrCode()
    emit('resultat', decodedText, decodedResult)
  }
}
</script>

<style>
</style>
