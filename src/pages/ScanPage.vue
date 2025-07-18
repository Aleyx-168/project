<template>
  <div class="q-pa-md">
    <div style="position: relative; width: 100%; max-width: 400px; margin: auto">
      <video ref="videoRef" style="width: 100%; border: 2px solid #ccc"></video>

      <!-- 扫描线 -->
      <div
        style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: red;
          animation: scan 2s infinite;
        "
      ></div>
    </div>

    <div class="q-mt-md text-center">
      当前模式：{{ scanMode === 'in' ? '入库' : scanMode === 'out' ? '出库' : '未知' }}
    </div>

    <q-btn label="返回首页" color="primary" class="q-mt-md" to="/" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { BrowserMultiFormatReader } from '@zxing/browser'

const route = useRoute()
const scanMode = route.query.mode || 'unknown'

const codeReader = new BrowserMultiFormatReader()
const videoRef = ref(null)
let selectedDeviceId = null

onMounted(async () => {
  try {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices()

    for (const device of devices) {
      const label = device.label.toLowerCase()
      if (label.includes('back') || label.includes('environment')) {
        selectedDeviceId = device.deviceId
        break
      }
    }

    if (!selectedDeviceId && devices.length > 0) {
      selectedDeviceId = devices[0].deviceId
    }

    await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.value, (result) => {
      if (result) {
        playBeep()
        const code = result.getText()
        alert(`扫码成功：${code}\n操作类型：${scanMode === 'in' ? '入库' : '出库'}`)
      }
    })
  } catch (err) {
    console.error('扫码失败:', err)
  }
})

onUnmounted(() => {
  codeReader.reset()
})

function playBeep() {
  const audio = new Audio('/sounds/beep.mp3')
  audio.play().catch(() => {})
}
</script>

<style>
@keyframes scan {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}
</style>
