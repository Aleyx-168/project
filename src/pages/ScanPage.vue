<template>
  <div class="q-pa-md column items-center justify-center">
    <div class="scanner-box">
      <video ref="videoRef" class="video" autoplay playsinline></video>
      <div class="scan-line" />
    </div>
    <p class="q-mt-md text-h6 text-primary">{{ scannedText }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'

const videoRef = ref(null)
const scannedText = ref('')
let codeReader = null
let animationFrame = null

function playBeep() {
  const beep = new Audio('/sounds/beep.mp3')
  beep.play()
}

onMounted(async () => {
  codeReader = new BrowserMultiFormatReader()

  try {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices()
    if (devices.length === 0) {
      alert('找不到摄像头')
      return
    }

    await codeReader.decodeFromVideoDevice(devices[0].deviceId, videoRef.value, (result) => {
      if (result) {
        const text = result.getText()
        if (text !== scannedText.value) {
          scannedText.value = text
          playBeep()
        }
      }
    })
  } catch (e) {
    console.error('摄像头启动失败:', e)
    alert('摄像头无法打开，请检查权限或设备')
  }

  const line = document.querySelector('.scan-line')
  let pos = 0
  let dir = 2
  function moveLine() {
    pos += dir
    if (pos >= 200 || pos <= 0) dir *= -1
    if (line) line.style.top = `${pos}px`
    animationFrame = requestAnimationFrame(moveLine)
  }
  moveLine()
})

onUnmounted(() => {
  if (codeReader) codeReader.reset()
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.scanner-box {
  position: relative;
  width: 300px;
  height: 200px;
  border: 3px solid #1976d2;
  border-radius: 8px;
  overflow: hidden;
}
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: red;
  z-index: 10;
}
</style>
