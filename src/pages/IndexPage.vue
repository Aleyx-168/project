<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-gutter-md justify-around">
      <q-btn
        v-for="(btn, i) in buttons"
        :key="i"
        :label="btn.label"
        color="primary"
        class="col-5"
        @click="goScan(btn.mode)"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const buttons = [
  { label: '出库', mode: 'out' },
  { label: '入库', mode: 'in' },
  { label: '大量出库', mode: 'batch_out' },
  { label: '大量入库', mode: 'batch_in' },
]

function goScan(mode) {
  router.push({ path: '/scan', query: { mode } })
}
</script>
