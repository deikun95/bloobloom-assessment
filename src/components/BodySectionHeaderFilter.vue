<template>
  <div :class="['filter', { expanded: showFilters }]">
    <div class="filter-items">
      <div class="filter-item">
        <div class="filter-title">Colour</div>
        <div
          class="filter-body"
          @click="
            (event) =>
              handleFilterClick(
                event,
                'glass_variant_frame_variant_colour_tag_configuration_names',
                (event.target as HTMLDivElement).innerText
              )
          "
        >
          <span>Black</span>
          <span>Tortoise</span>
          <span>Coloured</span>
          <span>Crystal</span>
          <span>Dark</span>
          <span>Bright</span>
        </div>
      </div>
      <div class="filter-item">
        <div class="filter-title">Shape</div>
        <div
          class="filter-body"
          @click="
            (event) =>
              handleFilterClick(
                event,
                'glass_variant_frame_variant_frame_tag_configuration_names',
                (event.target as HTMLDivElement).innerText
              )
          "
        >
          <span>Square</span>
          <span>Rectangle</span>
          <span>Round</span>
          <span>Cat-eye</span>
        </div>
      </div>
    </div>
    <div class="filter-result">
      <div class="chosen-filters">
        <span
          v-for="(item, index) in Object.values(filters).flatMap((set) => [
            ...set
          ])"
          :key="index"
          class="chosen-item"
          >{{ item }}</span
        >
      </div>
      <span>{{ apiStore.items.length }} RESULTS FOUND</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { debounce } from '@/utils/debounce'
import { useApiStore } from '@/stores/api'

defineProps({
  showFilters: Boolean
})

const apiStore = useApiStore()

const filters = reactive<Record<string, Set<string>>>({
  glass_variant_frame_variant_frame_tag_configuration_names: new Set(),
  glass_variant_frame_variant_colour_tag_configuration_names: new Set()
})

const debounceFetchData = debounce(
  () => apiStore.fetchMoreData(true, apiStore.currentCollection),
  500
)

const setFilter = (key: string, value: string) => {
  if (!filters[key].has(value)) {
    filters[key].add(value)
  } else {
    filters[key].delete(value)
  }

  if (
    apiStore.queryFilterString.includes(
      `&filters[${key}][]=${value.toLowerCase()}`
    )
  ) {
    apiStore.queryFilterString = apiStore.queryFilterString.replace(
      `&filters[${key}][]=${value.toLowerCase()}`,
      ''
    )
  } else {
    apiStore.queryFilterString += `&filters[${key}][]=${value.toLowerCase()}`
  }

  debounceFetchData()
}

const handleFilterClick = (event: MouseEvent, key: string, value: string) => {
  const nodes: (Element | null)[] = [
    ...document.getElementsByClassName('filter-body')
  ]

  if (nodes.includes(event.target as Element)) return
  console.log(key, value)
  setFilter(key, value)
}
</script>

<style scoped>
.filter {
  overflow: hidden;
  grid-column: 1 / span 3;
  border-bottom: 1px solid;
  max-height: 0;
  transition:
    box-shadow 0.3s ease-in,
    max-height 0.3s ease-in;
  position: relative;
  margin-bottom: -1px;

  .chosen-filters {
    width: 500px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-left: 22px;
    row-gap: 22px;
    padding-top: 22px;
    padding-bottom: 22px;

    .chosen-item {
      font-weight: 300;
      font-size: 13px;
      line-height: 16px;
    }

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      width: 40%;
      padding-top: 22px;
      padding-bottom: 22px;
      .chosen-item {
        text-transform: lowercase;
      }
    }

    @media screen and (max-width: 640px) {
      grid-template-columns: repeat(5, 1fr);
      width: 100%;
    }
  }

  .filter-items {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1024px) {
    .filter-items {
      display: flex;
      flex-direction: column;
    }
  }

  .filter-result {
    border-top: 1px solid;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    min-height: 60px;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;

    & > span {
      margin-left: -74px;
    }

    @media screen and (max-width: 1024px) {
      display: flex;
      & > span {
        margin: 0;
        position: absolute;
        width: 100%;
        text-align: center;
      }
    }

    @media screen and (max-width: 640px) {
      & > span {
        display: none;
      }
    }
  }

  &.expanded {
    max-height: 300px;
    margin-bottom: 0px;

    @media screen and (max-width: 1024px) {
      max-height: 500px;
    }
  }

  .filter-item {
    .filter-title {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid;
      font-weight: 700;
    }

    .filter-body {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      padding: 22px;
      font-size: 15px;
      line-height: 18px;
      font-weight: 300;
      text-transform: lowercase;
      justify-items: flex-start;

      & > span:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    @media screen and (max-width: 1024px) {
      .filter-title {
        font-size: 15px;
        border-bottom: none;
        justify-content: flex-start;
        padding-left: 22px;
      }

      .filter-body {
        grid-template-columns: repeat(6, 1fr);
        padding: 0 22px;
        height: 50px;
      }
    }

    @media screen and (min-width: 640px) and (max-width: 1024px) {
      .filter-title {
        font-size: 15px;
        border-bottom: none;
        justify-content: flex-start;
        padding-left: 22px;
      }

      .filter-body {
        grid-template-columns: repeat(6, 1fr);
        padding: 0 22px;
        height: 50px;
      }
    }
  }

  .filter-item:first-child {
    .filter-title {
      border-right: 1px solid;
    }

    .filter-body {
      border-right: 1px solid;
    }

    @media screen and (max-width: 1024px) {
      border-bottom: 1px solid;
      border-right: none;

      .filter-title {
        border-right: none;
      }

      .filter-body {
        border-right: none;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    border-left: 1px solid;
    border-right: 1px solid;
  }
}
</style>
