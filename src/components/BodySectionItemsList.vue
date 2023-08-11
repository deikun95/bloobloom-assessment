<template>
  <div class="body-wrapper">
    <div
      v-for="(item, index) in apiStore.items"
      :key="index"
      class="item"
    >
      <div class="title">{{ item.glass_variants[0].frame_variant.name }}</div>
      <img
        :src="item.glass_variants[0].media[0].url"
        alt="glasses view"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApiStore } from '@/stores/api'

const apiStore = useApiStore()
</script>

<style scoped>
.body-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  font-size: 20px;
  transition: transform 0.2s ease-in;

  .item {
    width: 100%;
    box-shadow: 0 0 0 1px black;
    position: relative;

    .title {
      width: 100%;
      position: absolute;
      padding: 20px 0;
      text-align: center;
    }
  }
}

@media screen and (max-width: 1024px) {
  .body-wrapper {
    grid-template-columns: repeat(2, 1fr);
    font-size: 16px;
  }
}

@media screen and (max-width: 640px) {
  .body-wrapper {
    grid-template-columns: repeat(1, 1fr);
    font-size: 15px;
  }
}

img {
  max-width: 100%;
  height: 100%;
}
</style>
