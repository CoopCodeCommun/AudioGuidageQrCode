<template>
  <svg id="bt-scan" @click="checkPermissionCamera()" xmlns="http://www.w3.org/2000/svg" width="75" height="75"
       color="white" fill="currentColor" class="bi bi-qr-code-scan" viewBox="0 0 16 16">
    <path
        d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"/>
    <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"/>
    <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"/>
    <path
        d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"/>
    <path d="M12 9h2V8h-2v1Z"/>
  </svg>
  <!-- Modal -->
  <div class="modal fade" id="modal-qrcode" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column justify-content-center align-items-center">
          <div id="reader"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {Modal} from '@/assets/js/bootstrap-5.0.2/bootstrap.esm.min.js'
import {Html5Qrcode} from "html5-qrcode"

const props = defineProps({
  expected: Array,
  qrbox: {
    type: Number,
    default: 250
  },
  fps: {
    type: Number,
    default: 10
  }
})

const emits = defineEmits(['resultat'])
let html5QrCode

function stopScanQrCode() {
  html5QrCode.stop().then(ignore => {
    // QR Code scanning is stopped.
    console.log("QR Code scanning stopped.")
    const elementModal = document.querySelector('#modal-qrcode')
    Modal.getInstance(elementModal).hide()

  }).catch(err => {
    // Stop failed, handle it.
    console.log("Unable to stop scanning.")
  })
}

function onScanSuccess(qrCodeMessage, decodedResult) {
  console.log('-> fonc onScanSuccess, qrCodeMessage =', qrCodeMessage)
  // si valeur attendue bonne émettre
  if (props.expected.includes(qrCodeMessage) === true) {
    stopScanQrCode()
    // emettre au parent (accueil.vue)
    emits('resultat', qrCodeMessage)

  }
}

function scanQrCode() {
  console.log('-> lecteur qrCode lancé !')
  html5QrCode = new Html5Qrcode("reader")
  const config = {fps: 10, qrbox: {width: 250, height: 250}};

  // caméra arrière = "environment"
  html5QrCode.start({facingMode: "environment"}, config, onScanSuccess)
  const elementModal = document.querySelector('#modal-qrcode')
  Modal.getOrCreateInstance(elementModal).show()
}

function requestPermissionError() {
  console.warn('Camera permission is not turned on');
}

function requestPermissionSuccess(status) {
  if (!status.hasPermission) {
    requestPermissionError()
  } else {
    scanQrCode()
  }
}

function checkPermissionCamera() {
  const permissions = cordova.plugins.permissions
  permissions.checkPermission(permissions.CAMERA, function (status) {
    // console.log('status.hasPermission =', status.hasPermission)
    if (status.hasPermission === true) {
      scanQrCode()
    } else {
      permissions.requestPermission(permissions.CAMERA, requestPermissionSuccess, requestPermissionError)
    }
  })
}
</script>

<style>
</style>
