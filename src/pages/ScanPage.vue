<template>
  <q-page class="q-pa-none column items-center justify-center">
    <div class="video-wrapper">
      <video ref="videoRef" autoplay muted playsinline></video>
      <div class="scan-line" />
    </div>
    <div class="text-h6 q-mt-md">当前模式：{{ modeLabel }}</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser'

const route = useRoute()
const mode = route.params.mode

const modeLabel =
  {
    single: '入库',
    bulk: '大量入库',
    out: '出库',
  }[mode] || '未知模式'

const videoRef = ref(null)
let codeReader = null

onMounted(() => {
  codeReader = new BrowserMultiFormatReader()

  codeReader.decodeFromVideoDevice(null, videoRef.value, (result) => {
    if (result) {
      const code = result.getText()
      console.log('扫码成功：', code)

      playBeep()
      // TODO: 可根据 mode 做入库/出库操作
    }
  })
})

onBeforeUnmount(() => {
  if (codeReader) {
    codeReader.reset()
  }
})

function playBeep() {
  const beep = new Audio('/sounds/beep.mp3')
  beep.play()
}
</script>

<style scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3 / 4;
  border: 2px solid #999;
  border-radius: 10px;
  overflow: hidden;
}

video {
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
  animation: scanMove 2s infinite linear;
}

@keyframes scanMove {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}
</style>
