<template>
  <div class="header-wrapper">
    <div class="header-main">
      <div></div>
      <div class="title">SPECTACLES WOMEN</div>
      <div class="filter-buttons" @click="setShowFilters">
        <span>filters</span>
      </div>
    </div>
    <div :class="['filter', { expanded: showFilters }]">
      <div class="filter-items">
        <div class="filter-item">
          <div class="filter-title">Colour</div>
          <div class="filter-body" @click="(event) => handleFilterClick(event, 'glass_variant_frame_variant_colour_tag_configuration_names', event.target?.innerText)
            ">
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
          <div class="filter-body"
            @click="(event) => handleFilterClick(event, 'glass_variant_frame_variant_frame_tag_configuration_names', event.target?.innerText)">
            <span>Square</span>
            <span>Rectangle</span>
            <span>Round</span>
            <span>Cat-eye</span>
          </div>
        </div>
      </div>
      <div class="filter-result">
        <div class="chosen-filters"><span class="chosen-item"
            v-for="(item, index) in Object.values(filters).flatMap(set => [...set])" :key="index">{{ item }}</span></div>
        <span>{{ items.length }} RESULTS FOUND</span>
      </div>
    </div>
  </div>
  <div class='body-wrapper'>
    <div class="item" v-for="( item, index ) in  items " :key="index">
      <div class="title">{{ item.glass_variants[0].frame_variant.name }}</div>
      <img :src="item.glass_variants[0].media[0].url" alt="glasses view">
    </div>
  </div>
  <div class="preloader">
    Loading...
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { debounce } from '../utils/debounce.ts'

const showFilters = ref(false)
const setShowFilters = () => showFilters.value = !showFilters.value

const items = ref<any[]>([]);
const loading = ref(false);
const limit = ref(12)
const page = ref(0)
const queryFilterString = ref("")
const filters = reactive<Record<string, Set<string>>>({ glass_variant_frame_variant_frame_tag_configuration_names: new Set(), glass_variant_frame_variant_colour_tag_configuration_names: new Set() })

const debounceFetchData = debounce(() => fetchMoreData(true))

const fetchMoreData = async (fromFilter = false) => {
  loading.value = true;

  if (!fromFilter) {
    page.value += 1
  }

  const jsonResponse = await fetch(`https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/spectacles-women/glasses?page[limit]=${limit.value}&page[number]=${page.value}${queryFilterString.value}`)
  const data = await jsonResponse.json()

  if (fromFilter) {
    items.value = [...data.glasses]
  } else {
    data.glasses.forEach(item => {
      const hasItem = items.value.find(i => i.id === item.id)

      if (!hasItem) items.value.push(item)
    });
  }

  console.log(items.value)
  loading.value = false;

};

const setFilter = (key: string, value: string) => {
  if (!filters[key].has(value)) {
    filters[key].add(value)
  } else {
    filters[key].delete(value)
  }

  if (queryFilterString.value.includes(`&filters[${key}][]=${value.toLowerCase()}`)) {
    queryFilterString.value = queryFilterString.value.replace(`&filters[${key}][]=${value.toLowerCase()}`, "")
  } else {
    queryFilterString.value += `&filters[${key}][]=${value.toLowerCase()}`
  }

  debounceFetchData()
}

const handleFilterClick = (event: MouseEvent, key: string, value: string) => {
  const nodes: (Element | null)[] = [...document.getElementsByClassName('filter-body')]

  if (nodes.includes(event.target as Element)) return;
  console.log(key, value)
  setFilter(key, value)
}

const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    fetchMoreData();
  }
};

const debouncedScroll = debounce(handleScroll)

onMounted(() => {
  fetchMoreData();
  window.addEventListener('scroll', debouncedScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScroll);
})


</script>

<style scoped>
.body-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  transition: transform .2s ease-in;

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

.header-wrapper {
  margin-top: 60px;
  min-height: 60px;
  overflow: hidden;

  .header-main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    border: 1px solid black;
    position: relative;
    z-index: 2;
    background: white;
  }

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
    overflow: hidden;
    grid-column: 1 / span 3;
    border-bottom: 1px solid;
    height: 0;
    transition: box-shadow .3s ease-in, height .2s ease-in;
    position: relative;
    margin-bottom: -1px;

    .chosen-filters {
      width: 500px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding-left: 22px;
      gap: 8px;

      .chosen-item {
        font-weight: 300;
        font-size: 13px;
        line-height: 16px;
      }
    }


    .filter-items {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
    }

    .filter-result {
      border-top: 1px solid;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      height: 60px;
      font-weight: 600;
      font-size: 15px;
      line-height: 18px;

      &>span {
        margin-left: -74px;
      }
    }

    &.expanded {
      height: 184px;
      margin-bottom: 0px;
    }

    .filter-item {

      .filter-title {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid;

      }

      .filter-body {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        padding: 22px;

        &>span:hover {
          cursor: pointer;
          text-decoration: underline;
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

img {
  max-width: 100%;
  height: 100%;
}

.preloader {
  animation: fadeAnimation 1s ease-in-out infinite;
  text-align: center;
  margin-top: 100px;
  height: 100px;
  overflow-y: auto;
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