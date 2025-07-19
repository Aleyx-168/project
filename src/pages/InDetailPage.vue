<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md q-mb-md">
      <div class="text-h6">入库详情</div>
      <div>条码：{{ code }}</div>
    </q-card>

    <q-form @submit="handleSubmit">
      <q-input filled v-model="quantity" label="数量" type="number" class="q-mb-md" />
      <q-input filled v-model="price" label="价格" type="number" class="q-mb-md" />
      <q-input filled v-model="location" label="存放位置" class="q-mb-md" />
      <q-input filled v-model="image" label="图片链接" class="q-mb-md" />

      <q-btn type="submit" label="确认入库" color="primary" class="full-width" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const code = route.query.code || ''

const quantity = ref(1)
const price = ref('')
const location = ref('')
const image = ref('')

const handleSubmit = () => {
  const record = {
    code,
    quantity: quantity.value,
    price: price.value,
    location: location.value,
    image: image.value,
    type: 'in',
    timestamp: new Date().toISOString(),
  }

  console.log('入库记录：', record)
  alert('入库成功')
  router.push('/')
}
</script>
