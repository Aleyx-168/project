<template>
  <div class="q-pa-md column items-center">
    <video ref="video" style="width: 100%; max-width: 400px" autoplay muted playsinline></video>
    <div class="scan-line" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'

const video = ref(null)
const codeReader = new BrowserMultiFormatReader()
const beep = new Audio('/sounds/beep.mp3') // 确保你放在 public/sounds/beep.mp3

onMounted(async () => {
  try {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices()

    const backCam =
      devices.find(
        (device) =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('environment'),
      ) || devices[0]

    if (!backCam) {
      alert('未找到摄像头设备')
      return
    }

    await codeReader.decodeFromVideoDevice(
      { deviceId: backCam.deviceId },
      video.value,
      (result) => {
        if (result) {
          beep.play()
          alert('扫码成功：' + result.getText())
          codeReader.reset()
        }
      },
    )
  } catch (e) {
    alert('摄像头打开失败，请检查权限或使用 HTTPS')
    console.error(e)
  }
})

onBeforeUnmount(() => {
  codeReader.reset()
})
</script>

<style scoped>
.scan-line {
  width: 100%;
  height: 2px;
  background-color: red;
  animation: moveLine 2s infinite;
  position: relative;
  top: -200px;
}

@keyframes moveLine {
  0% {
    top: 0;
  }
  100% {
    top: 200px;
  }
}
</style>
