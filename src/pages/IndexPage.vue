<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md row items-start q-col-gutter-md">
      <q-btn label="单个入库" color="green" class="col-4" @click="goScan('in')" />
      <q-btn label="单个出库" color="red" class="col-4" @click="goScan('out')" />
      <q-btn label="查询记录" color="primary" class="col-4" to="/records" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goScan(mode) {
  router.push({ path: '/scan', query: { mode } })
}
</script>
