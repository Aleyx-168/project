<template>
  <div class="index-page">
    <h1>仓库管理系统</h1>
    <div class="button-group">
      <button class="action-btn" @click="goScan('in')">入库</button>
      <button class="action-btn" @click="goScan('out')">出库</button>
      <button class="action-btn" @click="goQuery">查询</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goScan(mode) {
  router.push({ path: '/scan', query: { mode } })
}

function goQuery() {
  router.push('/query')
}
</script>

<style scoped>
.index-page {
  text-align: center;
  padding-top: 80px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 250px;
  margin: 0 auto;
}

.action-btn {
  font-size: 18px;
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  background-color: #027be3;
  color: white;
  cursor: pointer;
  transition:
    transform 0.1s,
    box-shadow 0.1s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.action-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
