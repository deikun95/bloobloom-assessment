<template>
  <header>
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
  </header>
</template>

<script setup lang="ts">
import LogoIcon from '../assets/icons/LogoIcon.vue'
import RightArrowIcon from '../assets/icons/RightArrowIcon.vue'
</script>

<style scoped>
header {
  position: fixed;
  background-color: white;
  width: 100%;
  top: 0;
  z-index: 3;
}

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
    font-size: 16px;

    &:hover {
      background-color: black;
      color: white;
    }
  }
}


.wrapper {
  min-height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  border: 1px solid black;

  .cell {
    border-left: 1px solid black;
    height: 100%;
    border-right: 1px solid black;
  }

  .filter-buttons {
    display: flex;
    height: 100%;
    font-size: 15px;
    line-height: 18px;


    border-right: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    cursor: pointer;

    &:hover {
      text-decoration: underline;

    }
  }

  .filter {
    grid-column: 1 / span 3;
    box-shadow: 0px 0px 0px 0px black;
    height: 0;
    transition: box-shadow .3s ease-in, height .2s ease-in;

    &.expanded {
      height: 60px;
      box-shadow: 0px 0px 0px 1px black;
    }
  }

  .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    border: 1px solid;
    height: 60px;
    border-bottom: 0;
    border-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -2px;

  }
}

</style>