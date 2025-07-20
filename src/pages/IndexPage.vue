<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md row items-center justify-center">
      <q-btn label="单个入库" @click="goScan('single')" color="primary" />
      <q-btn label="大数量入库" @click="goScan('batch')" color="secondary" />
      <q-btn label="出库" @click="goScan('out')" color="accent" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goScan(mode) {
  router.push({ name: 'scan', query: { mode } })
}
</script>
