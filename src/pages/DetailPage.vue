<template>
  <q-page class="q-pa-md">
    <div class="text-h6 text-primary q-mb-md">扫码结果</div>
    <q-card>
      <q-card-section>
        <div><strong>条码：</strong>{{ code }}</div>
        <div><strong>模式：</strong>{{ modeLabel }}</div>
      </q-card-section>
    </q-card>

    <q-btn class="q-mt-xl" label="返回首页" color="primary" @click="goHome" />
  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const code = route.query.code || '无'
const mode = route.query.mode || 'single'

const modeLabel =
  {
    single: '单个入库',
    bulk: '大数量入库',
    out: '出库',
  }[mode] || '未知模式'

function goHome() {
  router.push('/')
}
</script>
