<template>
  <q-page class="q-pa-none column items-center justify-center">
    <div
      ref="videoContainer"
      class="q-mt-md"
      style="position: relative; width: 90%; max-width: 400px"
    >
      <video
        ref="videoRef"
        autoplay
        muted
        playsinline
        style="width: 100%; border-radius: 8px"
      ></video>
      <div v-if="scanning" class="scanner-line" :style="{ top: scanLineTop + 'px' }" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser' // ✅ 删掉 NotFoundException

const router = useRouter()
const route = useRoute()

const videoRef = ref(null)
const videoContainer = ref(null)
const codeReader = new BrowserMultiFormatReader()
const scanning = ref(true)
const scanLineTop = ref(0)
let animationFrame
let scanLineDirection = 1
let stopScan = false

// 动画控制
const animateLine = () => {
  if (!scanning.value) return
  const height = videoContainer.value?.offsetHeight || 200
  if (scanLineTop.value <= 0) scanLineDirection = 1
  if (scanLineTop.value >= height - 4) scanLineDirection = -1
  scanLineTop.value += scanLineDirection * 2
  animationFrame = requestAnimationFrame(animateLine)
}

// 播放提示音
const playBeep = () => {
  const audio = new Audio('/sounds/beep.mp3')
  audio.play()
}

// 初始化扫码
const initScan = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter((d) => d.kind === 'videoinput')
    const rearCamera =
      videoDevices.find((d) => d.label.toLowerCase().includes('back')) || videoDevices[0]

    if (!rearCamera) {
      alert('没有找到摄像头')
      return
    }

    codeReader.decodeFromVideoDevice(
      rearCamera.deviceId,
      videoRef.value,
      (result, error, controls) => {
        if (result && !stopScan) {
          stopScan = true
          scanning.value = false
          controls.stop()
          playBeep()

          // 跳转到详情页
          router.push({
            name: 'detail',
            query: {
              code: result.getText(),
              mode: route.query.mode,
            },
          })
        }
      },
    )
  } catch (e) {
    console.error('扫码失败', e)
  }
}

onMounted(() => {
  scanning.value = true
  scanLineTop.value = 0
  animateLine()
  initScan()
})

onBeforeUnmount(() => {
  scanning.value = false
  cancelAnimationFrame(animationFrame)
  codeReader.reset()
})
</script>

<style scoped>
.scanner-line {
  position: absolute;
  height: 4px;
  width: 100%;
  background-color: red;
  z-index: 10;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}
</style>
