<template>
  <BodySectionHeader />
  <BodySectionItemsList />
  <div
    v-if="apiStore.loading"
    class="preloader"
  >
    Loading...
  </div>
  <div
    v-else
    class="top-button"
  >
    Back to top
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/debounce'
import { useApiStore } from '@/stores/api'
import BodySectionHeader from './BodySectionHeader.vue'
import BodySectionItemsList from './BodySectionItemsList.vue'

const apiStore = useApiStore()

const handleScroll = () => {
  if (apiStore.totalCount === apiStore.items.length) return

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    apiStore.fetchMoreData(false, apiStore.currentCollection)
  }
}

const debouncedScroll = debounce(handleScroll, 1000)

onMounted(() => {
  apiStore.fetchMoreData(false, apiStore.currentCollection)
  window.addEventListener('scroll', debouncedScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScroll)
})
</script>

<style scoped>
.preloader {
  animation: fadeAnimation 1s ease infinite;
  text-align: center;
  margin-top: 100px;
  height: 100px;
  overflow-y: auto;
}

.top-button {
  margin: 100px auto;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  background: #fff;
  color: #000;
  border: 1px solid #000;
}

@keyframes fadeAnimation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
