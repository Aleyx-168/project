<template>
  <div class="q-pa-md">
    <div class="text-h5 q-mb-md">仓库管理系统</div>

    <q-btn label="单个入库" color="primary" class="q-mb-sm full-width" @click="goScan('single')" />
    <q-btn
      label="大数量入库"
      color="secondary"
      class="q-mb-sm full-width"
      @click="goScan('batch')"
    />
    <q-btn label="出库" color="negative" class="q-mb-sm full-width" @click="goScan('out')" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goScan(mode) {
  router.push({ name: 'scan', query: { mode } })
}
</script>
