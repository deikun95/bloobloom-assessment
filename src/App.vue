<template>
  <HeaderSection />
  <BodySection />
</template>

<script setup lang="ts">
import HeaderSection from './components/HeaderSection.vue'
import BodySection from './components/BodySection.vue'
</script>

<style>
html,
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-family: 'Acumin Pro', sans-serif;
}
</style>
