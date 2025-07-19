<template>
  <q-page class="q-pa-md column items-center justify-center q-gutter-md">
    <q-btn label="入库" color="primary" @click="goToScan('single')" />
    <q-btn label="大量入库" color="secondary" @click="goToScan('bulk')" />
    <q-btn label="出库" color="negative" @click="goToScan('out')" />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToScan(mode) {
  // 跳转到 /scan/xxx 页面，比如 /scan/single
  router.push(`/scan/${mode}`)
}
</script>
