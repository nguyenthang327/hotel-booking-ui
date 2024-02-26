<script setup>
import { defineEmits, reactive } from 'vue'
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import common from '@/utils/common'
import moment from 'moment'

const emits = defineEmits(['on-handle-find'])

const filters = reactive({
  key_search: '',
  date_range: '',
  start_date: '',
  end_date: '',
  type: '',

})

const handleFind = () => {
  if (filters.date_range) {
    const [startDate, endDate] = filters.date_range.map((date) => {
      return moment(date.$d).format('YYYY-MM-DD')
      //   return moment(date).format('YYYY-MM-DD')
    })
    filters.start_date = startDate
    filters.end_date = endDate
  } else {
    filters.start_date = ''
    filters.end_date = ''
  }

  emits('on-handle-find', filters)
}

// const handleReset = () => {
//   filters.code = ''
//   filters.name = ''
//   filters.start_date = ''
//   filters.end_date = ''
//   filters.type = ''
//   emits('on-handle-find', filters)
// }
</script>
<template>
  <div class="container-fluid">
    <a-row type="flex" class="my-4" :gutter="[16, 16]" align="top">
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-input
          style="width: 100%"
          v-model:value="filters.key_search"
          placeholder="Mã phòng/ Tên phòng"
        />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-select v-model:value="filters.type" style="width: 100%">
          <a-select-option value="">- Loại phòng -</a-select-option>
          <a-select-option
            v-for="(type, index) in common.TYPE_ROOM"
            :value="type.value"
            :key="index"
          >
            {{ type.name }}</a-select-option
          >
        </a-select>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-range-picker v-model:value="filters.date_range" />
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-button type="primary" @click="handleFind">
          <template #icon>
            <SearchOutlined style="transform: translate(0px, -3px)" />
          </template>
          Tìm kiếm
        </a-button>
        <!-- <a-button type="danger" class="ms-4" @click="handleReset">
        <template #icon>
          <CloseCircleOutlined style="transform: translate(0px, -3px)" />
        </template>
        Đặt lại
      </a-button> -->
      </a-col>
    </a-row>
  </div>
</template>
