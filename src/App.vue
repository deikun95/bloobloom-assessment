<template>
  <HeaderView />
  <MainView />
</template>

<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
import MainView from './components/MainView.vue'
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
