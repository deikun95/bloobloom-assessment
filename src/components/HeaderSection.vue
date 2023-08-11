<template>
  <header>
    <div class="navbar">
      <a
        class="menu"
        v-bind="isMobile() ? menuHandlers.mobile : menuHandlers.desktop"
        ><span>Menu</span></a
      >
      <div
        :class="['sidebar', isSidebarOpened ? 'open' : 'hidden']"
        @mouseenter="handleSidebar(true)"
        @mouseleave="handleSidebar(false)"
      >
        <ul class="list">
          <li
            v-if="!currentMenuItems.isMain"
            class="list-item"
            @click="setMenuItem(menuItems)"
          >
            <span class="list-item-icon-left">
              <LeftArrowIcon />
            </span>
            <span>GO BACK</span>
          </li>
          <li
            v-for="(item, index) in currentMenuItems.children"
            :key="index"
            class="list-item"
            @click="handleMenuItemClick(item)"
          >
            <span>{{ item.name }}</span>
            <span
              v-if="item.withArrow"
              class="list-item-icon-right"
            >
              <RightArrowIcon />
            </span>
          </li>
        </ul>
      </div>
      <LogoIcon />
      <div></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LogoIcon from '../assets/icons/LogoIcon.vue'
import RightArrowIcon from '../assets/icons/RightArrowIcon.vue'
import LeftArrowIcon from '../assets/icons/LeftArrowIcon.vue'
import { useApiStore } from '@/stores/api'
import { collections } from '@/stores/api'

const apiStore = useApiStore()

const isSidebarOpened = ref(false)

const isMobile = () => screen.width <= 768

const menuItems = {
  isMain: true,
  children: [
    {
      name: 'Woman',
      children: [
        {
          name: 'Spectacles',
          isChild: true,
          withArrow: true,
          action: () => apiStore.setCollection(collections.SPECTACLES_WOMAN)
        },
        {
          name: 'Sunglases',
          isChild: true,
          withArrow: true,
          action: () => apiStore.setCollection(collections.SUNGLASES_WOMAN)
        }
      ],
      withArrow: true
    },
    {
      name: 'Men',
      children: [
        {
          name: 'Spectacles',
          isChild: true,
          withArrow: true,
          action: () => apiStore.setCollection(collections.SPECTACLES_MEN)
        },
        {
          name: 'Sunglases',
          isChild: true,
          withArrow: true,
          action: () => apiStore.setCollection(collections.SUNGLASES_MEN)
        }
      ],
      withArrow: true
    },
    { name: 'Home try on' },
    { name: 'Pair for fair' }
  ]
}

const currentMenuItems = ref(menuItems)

const setMenuItem = (value: any) => {
  currentMenuItems.value = value
}

const handleMenuItemClick = (item: any) => {
  if (item.children) setMenuItem(item)
  if (item.action) {
    item.action()
    handleSidebar(false)
  }
}

const handleSidebar = (state: boolean) => {
  isSidebarOpened.value = state
}

const menuHandlers = {
  desktop: {
    onmouseenter: () => handleSidebar(true),
    onmouseleave: () => handleSidebar(false)
  },
  mobile: {
    onclick: () => handleSidebar(!isSidebarOpened.value),
    onmouseleave: () => handleSidebar(false)
  }
}
</script>

<style scoped>
header {
  position: fixed;
  background-color: white;
  width: 100%;
  top: 0;
  z-index: 3;
  border-bottom: 1px solid;
}

.navbar {
  position: relative;
  height: 50px;
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
    display: flex;
    justify-content: center;
    border-right: 1px solid;
    height: 100%;
    align-items: center;
    width: 160px;
    transition: ease-in 0.2s text-decoration;
    cursor: pointer;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 2px;

    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 494px) {
    .menu {
      font-size: 10px;
      line-height: 12px;
    }
  }
}

@media screen and (max-width: 768px) {
  .navbar {
    height: 40px;
  }
}

.sidebar {
  transition: ease-in 0.2s transform;
  transition-delay: 250ms;
  position: absolute;
  left: 0;
  top: 50px;
  width: 479px;
  background-color: white;
  border: 1px solid;
  height: 100vh;
  z-index: 1;

  @media screen and (max-width: 494px) {
    width: 100%;
  }

  &.open {
    transform: translateX(0%);
  }

  &.hidden {
    transform: translateX(-100%);
  }
  .list {
    margin: 0;
    padding: 0;

    .list-item {
      padding: 0 16px;
      height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid;
      cursor: pointer;
      color: black;
      font-size: 16px;

      @media screen and (max-width: 768px) {
        height: 50px;
      }

      @media screen and (max-width: 494px) {
        font-size: 15px;
        line-height: 18px;
      }

      .list-item-icon-right {
        margin-left: auto;
      }

      .list-item-icon-left {
        margin-right: auto;
      }

      &:hover {
        background-color: black;
        color: white;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    top: 40px;
  }
}
</style>
