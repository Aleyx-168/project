<template>
  <q-page class="q-pa-md column q-gutter-md">
    <q-btn label="单个入库" color="primary" @click="goScan('in')" />
    <q-btn label="大数量入库" color="secondary" @click="goScan('in')" />
    <q-btn label="出库" color="negative" @click="goScan('out')" />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goScan(mode) {
  router.push({ name: 'ScanPage', query: { mode } })
}
</script>
