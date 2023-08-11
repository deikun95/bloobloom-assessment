import { defineStore } from 'pinia'
import { ref } from 'vue'

export const collections = {
  SPECTACLES_WOMAN: 'spectacles-women',
  SPECTACLES_MEN: 'spectacles-men',
  SUNGLASES_WOMAN: 'sunglasses-women',
  SUNGLASES_MEN: 'sunglasses-men'
}

export const useApiStore = defineStore('api', () => {
  const loading = ref(false)
  const limit = ref(12)
  const page = ref(0)
  const totalCount = ref(0)
  const items = ref<any[]>([])
  const queryFilterString = ref('')
  const currentCollection = ref(collections.SPECTACLES_WOMAN)

  const fetchMoreData = async (
    fromFilter = false,
    collection = collections.SPECTACLES_WOMAN
  ) => {
    const apiURL = `https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/${collection}/glasses`

    loading.value = true

    if (!fromFilter) {
      page.value += 1
    } else {
      page.value = 1
    }

    const jsonResponse = await fetch(
      `${apiURL}?page[limit]=${limit.value}&page[number]=${page.value}${queryFilterString.value}`
    )
    const data = await jsonResponse.json()

    totalCount.value = data.meta.total_count

    if (fromFilter) {
      items.value = [...data.glasses]
    } else {
      data.glasses.forEach((item) => {
        const hasItem = items.value.find((i) => i.id === item.id)

        if (!hasItem) items.value.push(item)
      })
    }

    console.log(items.value)
    loading.value = false
  }

  const setCollection = (collection: string) => {
    currentCollection.value = collection
    fetchMoreData(true, collection)
  }

  return {
    fetchMoreData,
    loading,
    limit,
    page,
    totalCount,
    items,
    queryFilterString,
    setCollection,
    currentCollection
  }
})
