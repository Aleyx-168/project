<template>
  <div class="q-pa-md">
    <h2>仓库管理系统</h2>

    <div class="q-gutter-md q-mb-md">
      <q-btn label="入库" color="primary" @click="handleScan('入库')" />
      <q-btn label="出库" color="red" @click="handleScan('出库')" />
      <q-btn label="查询" color="green" @click="handleScan('查询')" />
    </div>

    <video
      id="video"
      width="300"
      height="200"
      autoplay
      muted
      playsinline
      style="border: 1px solid #ccc"
    ></video>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/browser'

const codeReader = new BrowserMultiFormatReader()

// 当前操作类型：入库 / 出库 / 查询
const currentAction = ref('')

function handleScan(action) {
  currentAction.value = action
  console.log(`开始 ${action} 扫码`)

  codeReader.decodeFromVideoDevice(null, 'video', (result, err) => {
    if (result) {
      const text = result.getText()
      console.log(`${action} 扫码结果：`, text)
      alert(`${action} 扫码成功：\n${text}`)
      codeReader.reset() // 停止摄像头
    }
    if (err && !(err instanceof NotFoundException)) {
      console.error('扫码出错:', err)
    }
  })
}
</script>
