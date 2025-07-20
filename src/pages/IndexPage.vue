<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md justify-center">
      <q-btn
        color="primary"
        label="单个入库"
        @click="goToScan('single')"
        class="col-4"
        unelevated
      />
      <q-btn color="orange" label="大数量入库" @click="goToScan('bulk')" class="col-4" unelevated />
      <q-btn color="red" label="出库" @click="goToScan('out')" class="col-4" unelevated />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToScan(mode) {
  router.push({ path: '/scan', query: { mode } })
}
</script>
