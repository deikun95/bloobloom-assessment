<script setup lang="ts">
import LogoIcon from '../assets/icons/LogoIcon.vue'
import RightArrowIcon from '../assets/icons/RightArrowIcon.vue'
</script>

<template>
  <div class="navbar">
    <a class="menu"><span>menu</span></a>
    <div class="sidebar">
      <ul class="list">
        <li class="list-item">spectacles
          <RightArrowIcon />
        </li>
        <li class="list-item">sunglases
          <RightArrowIcon />
        </li>
        <li class="list-item">home try on</li>
        <li class="list-item">pair for fair</li>
      </ul>
    </div>
    <LogoIcon />
    <div></div>
  </div>
  <div class="wrapper">
    <div></div>
    <div class="title">SPECTACLES WOMEN</div>
    <div class="filter">
      <div class="color">colour</div>
      <div class="shape">shape</div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: relative;
  height: 60px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  .menu {
    margin-right: auto;
    padding: 0 0 0 32px;
    height: 100%;
    display: flex;
    align-items: center;
    width: 60px;
    transition: ease-in .2 text-decoration;
    cursor: pointer;

    &:hover {
      text-decoration: underline;

      &+.sidebar {
        transform: translateX(0%);
      }
    }
  }
}

.sidebar {
  transition: ease-in .3s transform;
  transition-delay: 250ms;
  transform: translateX(-100%);
  position: absolute;
  left: 0;
  top: 60px;
  width: 300px;
  background-color: white;
  border: 1px solid;
  height: 100vh;
  z-index: 1;

  &:hover {
    transform: translateX(0%);
  }
}

.list {
  margin: 0;
  padding: 0;

  .list-item {
    padding: 0 0 0 16px;
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    cursor: pointer;
    color: black;

    &:hover {
      background-color: black;
      color: white;
    }
  }
}


.wrapper {
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 1px solid black;

  .cell {
    border-left: 1px solid black;
    height: 100%;
    border-right: 1px solid black;
  }

  .filter {
    display: flex;
    height: 100%;
    font-size: 15px;
    line-height: 18px;
  }

  .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    border: 1px solid;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -2px;
  }

  .color {
    border-right: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
  }

  .shape {
    border-right: 1px solid;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 25%;
  }
}

/* tr {
  height: 60px;
}

.filter>td {
  height: 60px;
}

.color {
  border: none;
}

.shape {
  border-top: none;
  border-bottom: none;
} */
</style>