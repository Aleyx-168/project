<template>
  <q-page class="q-pa-md column items-center justify-center">
    <div class="relative">
      <video
        id="video"
        ref="videoRef"
        class="q-mb-md"
        style="width: 300px; height: 220px; object-fit: cover"
      ></video>
      <div class="scan-line" />
    </div>
    <q-btn label="返回首页" color="primary" @click="goHome" class="q-mt-md" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { QBtn, QPage } from 'quasar'

// DOM引用
const videoRef = ref(null)

// 路由
const router = useRouter()
const route = useRoute()

// 提示音效
const beepSound = new Audio('/sounds/beep.mp3')

// ZXing扫码器
const codeReader = new BrowserMultiFormatReader()
let controls = null

// 页面挂载时启动摄像头并扫码
onMounted(async () => {
  const videoInputDevices = await navigator.mediaDevices.enumerateDevices()
  const rearCamera =
    videoInputDevices.find(
      (device) => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'),
    ) || videoInputDevices[0] // 如果找不到后摄，选第一个

  try {
    controls = await codeReader.decodeFromVideoDevice(
      rearCamera.deviceId,
      videoRef.value,
      (result) => {
        if (result) {
          beepSound.play()
          stopScan()
          router.push({
            name: 'detail',
            query: { code: result.getText(), mode: route.query.mode || '' },
          })
        }
      },
    )
  } catch (e) {
    console.error('扫码失败:', e.message)
  }
})

// 页面卸载时释放摄像头
onBeforeUnmount(() => {
  stopScan()
})

function stopScan() {
  if (controls) {
    controls.stop()
    controls = null
  }
}

function goHome() {
  stopScan()
  router.push('/')
}
</script>

<style scoped>
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: red;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}
</style>
