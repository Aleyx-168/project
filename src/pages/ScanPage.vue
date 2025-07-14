<template>
  <q-page class="q-pa-md">
    <div
      ref="scannerRef"
      style="width: 100%; max-width: 400px; margin: auto; border: 1px solid #ccc"
    />
    <div v-if="result" class="q-mt-md">
      <q-banner class="bg-green text-white"> 扫码结果：{{ result }} </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'

const scannerRef = ref(null)
const result = ref('')

onMounted(async () => {
  const codeReader = new BrowserMultiFormatReader()
  try {
    const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices()
    if (videoInputDevices.length === 0) {
      throw new Error('找不到摄像头')
    }

    const selectedDeviceId = videoInputDevices[0].deviceId

    await codeReader.decodeFromVideoDevice(selectedDeviceId, scannerRef.value, (res) => {
      if (res) {
        result.value = res.getText()
        console.log('扫码成功：', result.value)
        // 可选：扫码成功后停止扫描
        codeReader.reset()
      }
    })
  } catch (e) {
    console.error('扫码失败：', e)
  }
})
</script>
