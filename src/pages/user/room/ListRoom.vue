<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { listPaginate } from '@/services/room'
import common from '@/utils/common'
import FilterRoom from '@/pages/user/room/components/FilterRoom.vue'
import ItemRoom from '@/pages/user/room/components/ItemRoom.vue'

const store = useStore()

const limit = ref(8);
const listRoom = ref([])
const filtersSet = ref({'limit': limit.value})

const pagination = reactive({
  total: null,
  current: null,
  pageSize: null
})

const handleGetListRoom = async (filters = {}) => {
  store.dispatch('setLoading', true)
  const { data } = await listPaginate(filters)
  listRoom.value = data.data.data.map((item) => ({
    ...item,
    key: item.id + Math.random()
  }))
  console.log(data.data);
  pagination.total = data.data.total
  pagination.pageSize = data.data.per_page
  pagination.current = data.data.current_page
  store.dispatch('setLoading', false)
}
const handleChangePage = (page) => {
  handleGetListRoom({ page: page , ...filtersSet.value })
}

const handleFind = (value) => {
  value.limit = limit.value;
  for (const property in value) {
    if (!value[property]) {
      delete value[property]
    }
  }
  filtersSet.value = value

  handleGetListRoom(filtersSet.value)
}

handleGetListRoom(filtersSet.value)
</script>

<template>
  <div class="container">
    <div class="row">
      <FilterRoom @on-handle-find="handleFind" />
    </div>
    <div class="row">
      <a-row>
        <a-col
          class="wrap-item-room mt-4"
          :span="6"
          v-for="(detail, index) in listRoom"
          :key="index"
          ><ItemRoom :detail="detail"
        /></a-col>
      </a-row>
    </div>
    <div class="row mt-3">
      <a-pagination v-model:current="pagination.current" :total="pagination.total" @change="handleChangePage" :pageSize="limit"/>
    </div>
  </div>
</template>
