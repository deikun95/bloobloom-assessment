<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
    <div class="item">
      <div class="title">title</div><img src="../assets/images/glasses1.jpg" alt="glasses view">
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;

  .item {
    width: 504px;
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

img {
  max-width: 100%;
  height: 100%;
}</style>