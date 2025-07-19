<template>
  <q-page class="q-pa-none flex flex-center column">
    <video ref="videoRef" style="width: 100%; height: auto" />
    <div class="scan-line" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser'

const videoRef = ref(null)
const router = useRouter()
const route = useRoute()

let codeReader = null

// 播放扫码成功提示音
function playBeep() {
  const audio = new Audio('/sounds/beep.mp3')
  audio.play().catch((e) => console.error('音效播放失败：', e))
}

// 启动扫码
onMounted(async () => {
  codeReader = new BrowserMultiFormatReader()

  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter((d) => d.kind === 'videoinput')
    const rearCamera = videoDevices[videoDevices.length - 1]

    if (!rearCamera) {
      alert('找不到摄像头设备')
      return
    }

    codeReader.decodeFromVideoDevice(rearCamera.deviceId, videoRef.value, (result, error) => {
      if (result) {
        playBeep()
        const code = result.getText()
        const mode = route.query.mode

        if (mode === 'in') {
          router.push({ name: 'InDetailPage', query: { code } })
        } else if (mode === 'out') {
          router.push({ name: 'OutDetailPage', query: { code } })
        }

        codeReader.reset()
      }

      // 不再使用 error 变量，避免 ESLint 报错
    })
  } catch (err) {
    console.error('摄像头初始化失败', err)
  }
})

// 页面卸载时停止扫码
onUnmounted(() => {
  if (codeReader) {
    codeReader.reset()
  }
})
</script>

<style>
.scan-line {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 2px;
  background: red;
  animation: scan 2s infinite;
}

@keyframes scan {
  0% {
    top: 20%;
  }
  100% {
    top: 80%;
  }
}
</style>
