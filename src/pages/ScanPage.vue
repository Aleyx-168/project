<template>
  <q-page class="column flex-center bg-grey-1">
    <div class="q-mt-md text-h6 text-primary">请将条码对准扫描区域</div>

    <div class="scanner-box q-mt-md">
      <video ref="videoRef" autoplay muted playsinline class="video-cam"></video>
      <div class="scan-line" />
    </div>

    <q-btn class="q-mt-lg" color="primary" label="返回首页" @click="goHome" />
  </q-page>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser'

const videoRef = ref(null)
const router = useRouter()
const route = useRoute()

const mode = route.query.mode || 'single'
const codeReader = new BrowserMultiFormatReader()
let selectedDeviceId = null

// 播放提示音
function playBeep() {
  const audio = new Audio('/sounds/beep.mp3')
  audio.play().catch(() => {})
}

// 返回首页
function goHome() {
  stopScan()
  router.push('/')
}

// 停止摄像头
function stopScan() {
  codeReader.reset()
}

onMounted(async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoInputDevices = devices.filter((device) => device.kind === 'videoinput')

    const rearCamera =
      videoInputDevices.find(
        (d) => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('rear'),
      ) || videoInputDevices[0]

    selectedDeviceId = rearCamera.deviceId

    await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.value, (result) => {
      if (result) {
        playBeep()
        stopScan()

        const scannedCode = result.getText()

        // 跳转到入库或出库页面，带上扫码结果
        router.push({
          path: '/detail',
          query: {
            code: scannedCode,
            mode,
          },
        })
      }
    })
  } catch {
    alert('无法启动摄像头')
  }
})

onBeforeUnmount(() => {
  stopScan()
})
</script>

<style scoped>
.scanner-box {
  position: relative;
  width: 300px;
  height: 220px;
  border: 2px solid #0d47a1;
  overflow: hidden;
  border-radius: 8px;
}
.video-cam {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: red;
  animation: scan-move 2s infinite;
}
@keyframes scan-move {
  0% {
    top: 0%;
  }
  50% {
    top: 90%;
  }
  100% {
    top: 0%;
  }
}
</style>
