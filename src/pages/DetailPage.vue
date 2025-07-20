<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit">
      <q-input filled v-model="form.code" label="条码" readonly class="q-mb-md" />
      <q-input filled v-model="form.quantity" label="数量" type="number" class="q-mb-md" />
      <q-input filled v-model="form.price" label="价格" type="number" class="q-mb-md" />
      <q-input filled v-model="form.location" label="位置" class="q-mb-md" />
      <q-input filled v-model="form.image" label="图片链接" class="q-mb-md" />
      <q-btn label="确认提交" type="submit" color="primary" class="full-width" />
    </q-form>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const form = ref({
  code: '',
  quantity: '',
  price: '',
  location: '',
  image: '',
})

onMounted(() => {
  form.value.code = route.query.code || ''
})
const onSubmit = () => {
  console.log('提交内容：', form.value, '模式：', route.query.mode)
  alert('已提交成功')
}
</script>
