<!-- src/pages/ScanPage.vue -->
<template>
  <q-page class="column items-center justify-center q-pa-md">
    <div class="video-container">
      <video ref="videoRef" autoplay muted playsinline style="width: 100%; max-width: 500px" />
      <div class="scanline"></div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { useRoute } from 'vue-router'

const videoRef = ref(null)
const codeReader = new BrowserMultiFormatReader()
const route = useRoute()
let selectedDeviceId = null

onMounted(async () => {
  try {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices()
    const rearCamera = devices.find((device) => /back|rear/i.test(device.label)) || devices[0]
    selectedDeviceId = rearCamera.deviceId

    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      videoRef.value,
      (result, error, controls) => {
        if (result) {
          const beep = new Audio('/sounds/beep.mp3')
          beep.play()
          alert(`扫码成功：${result.getText()}`)
          controls.stop()
        }
      },
    )
  } catch (e) {
    alert('摄像头无法启动：' + e.message)
  }
})

onBeforeUnmount(() => {
  codeReader.reset()
})
</script>

<style scoped>
.video-container {
  position: relative;
}
.scanline {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: red;
  animation: scan 2s infinite;
}
@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: 95%;
  }
  100% {
    top: 0;
  }
}
</style>
