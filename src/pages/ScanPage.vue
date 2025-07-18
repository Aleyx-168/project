<template>
  <div class="q-pa-md column items-center">
    <video ref="video" style="width: 100%; max-width: 400px" autoplay muted></video>
    <div class="scan-line" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'

// 视频 DOM 引用
const video = ref(null)

// 声音（放在 public/sounds/beep.mp3）
const beep = new Audio('/sounds/beep.mp3')

// 创建扫码器
const codeReader = new BrowserMultiFormatReader()

onMounted(async () => {
  const devices = await BrowserMultiFormatReader.listVideoInputDevices()

  // 优先使用后置摄像头（有些设备没有 label，要兜底）
  const backCam =
    devices.find(
      (device) =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('environment'),
    ) || devices[0]

  if (backCam) {
    codeReader.decodeFromVideoDevice(
      { deviceId: backCam.deviceId, facingMode: 'environment' },
      video.value,
      (result) => {
        if (result) {
          beep.play()
          alert('扫码成功：' + result.getText())
          codeReader.reset()
        }
      },
    )
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
