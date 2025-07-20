<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md justify-center">
      <q-btn label="入库" color="primary" class="col-5" @click="goScan('in')" />
      <q-btn label="出库" color="negative" class="col-5" @click="goScan('out')" />
      <q-btn label="大量入库" color="positive" class="col-5 q-mt-md" @click="goScan('in-bulk')" />
      <q-btn label="大量出库" color="warning" class="col-5 q-mt-md" @click="goScan('out-bulk')" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goScan = (mode) => {
  router.push({ name: 'scan', query: { mode } })
}
</script>
