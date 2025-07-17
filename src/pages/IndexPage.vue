<template>
  <div class="q-pa-md">
    <h2>扫码管理</h2>

    <div class="q-gutter-md">
      <q-btn label="入库扫码" color="primary" @click="startScan('in')" />
      <q-btn label="出库扫码" color="negative" @click="startScan('out')" />
      <q-btn label="查询扫码" color="secondary" @click="startScan('query')" />
    </div>

    <div v-if="scanning" class="q-mt-md">
      <video ref="video" style="width: 100%; max-width: 400px" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/browser'

const video = ref(null)
const scanning = ref(false)
const codeReader = new BrowserMultiFormatReader()

function startScan(type) {
  scanning.value = true

  codeReader.decodeFromVideoDevice(null, video.value, (result) => {
    if (result) {
      scanning.value = false
      codeReader.reset()

      const code = result.getText()
      if (type === 'in') {
        alert('✅ 入库成功：' + code)
      } else if (type === 'out') {
        alert('📦 出库成功：' + code)
      } else {
        alert('🔍 查询结果：' + code)
      }
    }
  })
}

onBeforeUnmount(() => {
  codeReader.reset()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
