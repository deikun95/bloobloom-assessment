<template>
  <div class="header-wrapper">
    <div class="header-main">
      <div></div>
      <div class="title">
        {{ apiStore.currentCollection.replace('-', ' ') }}
      </div>
      <div
        class="filter-buttons"
        @click="setShowFilters"
      >
        <span>Filters</span>
        <div class="filter-icon">
          <FilterIcon />
          <div :class="['icon-knobs', { active: showFilters }]">
            <div class="first-knob">
              <div></div>
            </div>
            <div class="second-knob">
              <div></div>
            </div>
            <div class="third-knob">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BodySectionHeaderFilter :show-filters="showFilters" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApiStore } from '@/stores/api'
import FilterIcon from '../assets/icons/FilterIcon.vue'
import BodySectionHeaderFilter from './BodySectionHeaderFilter.vue'

const apiStore = useApiStore()

const showFilters = ref(false)
const setShowFilters = () => (showFilters.value = !showFilters.value)
</script>

<style scoped>
.header-wrapper {
  margin-top: 50px;
  min-height: 60px;
  overflow: hidden;

  .header-main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    border: 1px solid black;
    position: relative;
    z-index: 2;
    height: 60px;
    background: white;
  }

  @media screen and (max-width: 768px) {
    .header-main {
      grid-template-columns: 1fr 2fr 1fr;
    }
  }

  .cell {
    border-left: 1px solid black;
    height: 100%;
    border-right: 1px solid black;
  }

  .filter-buttons {
    display: flex;
    height: 100%;
    font-weight: 700;
    font-size: 15px;
    line-height: 24px;

    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: auto;
    margin-right: 30px;

    &:hover {
      text-decoration: underline;
    }
  }

  .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    border: 1px solid;
    height: 100%;
    border-bottom: 0;
    border-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -2px;
  }

  @media screen and (max-width: 1024px) {
    .title {
      font-size: 20px;
    }

    .filter-buttons {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 640px) {
    .title {
      font-size: 18px;
    }

    .filter-buttons {
      font-size: 13px;
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 494px) {
    .title {
      font-size: 14px;
    }

    .filter-buttons {
      font-size: 12px;
      margin-right: 12px;
    }
  }
}

@media screen and (max-width: 768px) {
  .header-wrapper {
    margin-top: 40px;
    min-height: 50px;
    .header-main {
      height: 50px;
    }
  }
}

.filter-icon {
  position: relative;
  width: 22px;
  height: 22px;
  margin-left: 5px;
  .icon-knobs {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;

    &.active {
      .first-knob,
      .third-knob {
        transform: translateY(-7px);
      }

      .second-knob {
        transform: translateY(7px);
      }
    }

    .first-knob,
    .second-knob,
    .third-knob {
      transition: all 0.2s ease;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      width: 6px;
      height: 6px;
      & > div {
        width: 100%;
        height: 2px;
        background: #000;
      }
    }

    .first-knob {
      left: 1px;
      top: 11px;
    }

    .second-knob {
      left: 8px;
      top: 4px;
    }

    .third-knob {
      left: 15px;
      top: 11px;
    }
  }
}
</style>
