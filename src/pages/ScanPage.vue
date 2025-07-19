<template>
  <div class="q-pa-md column items-center">
    <div class="video-container">
      <video ref="videoRef" class="video" autoplay muted playsinline></video>
      <div class="scan-line" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

const videoRef = ref(null)
const codeReader = new BrowserMultiFormatReader()
const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const beepSound = new Audio('/sounds/beep.mp3')

onMounted(async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter((device) => device.kind === 'videoinput')
    const rearCamera =
      videoDevices.reverse().find((device) => device.label.toLowerCase().includes('back')) ||
      videoDevices[0]

    if (!rearCamera) {
      $q.notify({ type: 'negative', message: '未找到摄像头设备' })
      return
    }

    // ✅ 实际调用扫码并使用所有变量
    await codeReader.decodeFromVideoDevice(rearCamera.deviceId, videoRef.value, (result, err) => {
      // 使用 err，避免 ESLint 报错
      if (err) {
        console.warn('扫码错误：', err.message || err)
      }

      if (result) {
        const code = result.getText()
        console.log('扫码成功：', code)

        beepSound.play()

        const mode = route.params.mode || 'default'
        $q.notify({ type: 'positive', message: `扫码成功 (${mode})：${code}` })

        // 扫完返回首页
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
    })
  } catch (err) {
    console.error('扫码初始化失败：', err)
    $q.notify({ type: 'negative', message: '扫码初始化失败' })
  }
})

onBeforeUnmount(() => {
  codeReader.reset()
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 3/4;
  border: 2px solid #00c853;
  overflow: hidden;
}

.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: red;
  animation: scan 2s infinite;
  z-index: 2;
}

@keyframes scan {
  0% {
    top: 0%;
  }
  50% {
    top: 95%;
  }
  100% {
    top: 0%;
  }
}
</style>
