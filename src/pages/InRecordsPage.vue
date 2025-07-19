<template>
  <q-page class="q-pa-md column items-center justify-center q-gutter-md">
    <q-btn label="单个入库" color="primary" @click="goToScan('single')" />
    <q-btn label="大数量入库" color="secondary" @click="goToScan('bulk')" />
    <q-btn label="出库" color="negative" @click="goToScan('out')" />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

// 用 router 来跳转页面
const router = useRouter()

// 点击按钮后跳转到扫码页面，并带上参数 mode
function goToScan(mode) {
  router.push({ name: 'scan', params: { mode } })
}
</script>
