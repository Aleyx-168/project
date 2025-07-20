<template>
  <q-page class="q-pa-md column items-center">
    <div ref="scannerRef" class="scanner-box">
      <div class="scan-line" />
      <video ref="videoRef" class="video-element" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser'

const router = useRouter()
const route = useRoute()
const scannerRef = ref(null)
const videoRef = ref(null)
let codeReader

function playBeep() {
  const audio = new Audio('/sounds/beep.mp3')
  audio.play()
}

onMounted(async () => {
  codeReader = new BrowserMultiFormatReader()
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoInputDevices = devices.filter((device) => device.kind === 'videoinput')
  const rearCamera =
    videoInputDevices.find((device) => device.label.toLowerCase().includes('back')) ||
    videoInputDevices[0]

  if (rearCamera) {
    codeReader.decodeFromVideoDevice(rearCamera.deviceId, videoRef.value, (result) => {
      if (result) {
        playBeep()
        codeReader.reset()
        router.push({
          path: '/detail',
          query: {
            code: result.getText(),
            mode: route.query.mode,
          },
        })
      }
    })
  }
})

onBeforeUnmount(() => {
  codeReader?.reset()
})
</script>

<style scoped>
.video-element {
  width: 100%;
  max-width: 400px;
  border: 2px solid #2196f3;
}

.scanner-box {
  position: relative;
  width: 300px;
  height: 220px;
  overflow: hidden;
  border: 2px solid #ccc;
  margin-top: 30px;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: red;
  animation: scan 2s infinite;
}

@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: calc(100% - 2px);
  }
}
</style>
