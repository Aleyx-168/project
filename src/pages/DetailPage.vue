<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="text-subtitle1 q-mb-sm">扫码结果：{{ code }}</div>
      <div class="text-subtitle2 q-mb-md">操作模式：{{ mode }}</div>

      <q-input filled v-model="quantity" type="number" label="数量" class="q-mb-md" />
      <q-input filled v-model="price" type="number" label="价格" class="q-mb-md" />
      <q-input filled v-model="location" label="位置" class="q-mb-md" />
      <q-input filled v-model="image" label="图片链接" class="q-mb-md" />

      <q-btn label="确认提交" color="primary" class="full-width" @click="submit" />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const code = route.query.code || '无'
const mode = route.query.mode || 'unknown'

const quantity = ref('')
const price = ref('')
const location = ref('')
const image = ref('')

function submit() {
  console.log('提交数据', {
    code,
    mode,
    quantity: quantity.value,
    price: price.value,
    location: location.value,
    image: image.value,
  })
  router.push('/')
}
</script>
