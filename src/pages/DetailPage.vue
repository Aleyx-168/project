<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">扫码详情</div>
        <div>扫码结果：{{ code }}</div>
        <div>操作模式：{{ mode }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const code = route.query.code || '无'
const mode = route.query.mode || '未指定'
</script>
