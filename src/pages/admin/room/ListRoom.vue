<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { listPaginate, remove } from '@/services/room'
import { columns } from './configRoom'
import common from '@/utils/common'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import DetailRoom from '@/pages/admin/room/DetailRoom.vue'

const store = useStore()

const listRoom = ref([])
const pagination = reactive({
  total: null,
  current: null,
  pageSize: null
})

const detail = reactive({
  show: false,
  data: {},
  action: ''
})

const handleGetListRoom = async (filters = {}) => {
  store.dispatch('setLoading', true)
  const { data } = await listPaginate(filters)
  listRoom.value = data.data.data.map((item) => ({
    ...item,
    key: item.id + Math.random()
  }))
  pagination.total = data.data.total
  pagination.pageSize = data.data.per_page
  pagination.current = data.data.current_page
  store.dispatch('setLoading', false)
}
const handleChangePage = (page) => {
  handleGetListRoom({ page: page.current })
}

const roomTypeStyle = (value) => {
  if (!value) {
    return ''
  }
  const type = common.TYPE_ROOM.find((x) => x.value == value)
  return `<div style="${type.style}">${type.name}</div>`
}

const roomStatusStyle = (value) => {
  if (!value) {
    return ''
  }
  const type = common.STATUS_ROOM.find((x) => x.value == value)
  return `<div style="${type.style}">${type.name}</div>`
}

const handleDetail = (record, type) => {
  detail.data = record
  detail.action = type
  detail.show = true
}
const handleCloseDetail = (value) => {
  detail.data = {}
  detail.action = ''
  detail.show = false
  if (value == true) {
    handleGetListRoom()
  }
}

const handleRemove = async (id) => {
  store.dispatch('setLoading', true)
  await remove(id)
  message.success('Xóa phòng thành công !')
  store.dispatch('setLoading', false)
  handleGetListRoom()
}

handleGetListRoom()
</script>

<template>
  <div class="px-4">
    <div class="my-2 border-bottom px-4 py-2 fs-2 text-uppercase d-flex">Quản lý phòng</div>
    <a-button type="primary" class="my-3" @click="handleDetail(null, 'create')"
      >Thêm phòng mới</a-button
    >
    <a-table
      :dataSource="listRoom"
      bordered
      :pagination="pagination"
      @change="handleChangePage"
      :columns="columns"
      :scroll="{ x: 500 }"
      class="border"
    >
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'type'">
          <span class="text-center" v-html="roomTypeStyle(text)"></span>
        </template>
        <template v-if="column.key === 'status'">
          <span class="text-center" v-html="roomStatusStyle(text)"></span>
        </template>
        <template v-if="column.key === 'action'">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="handleDetail(record, 'update')">
              <EditOutlined style="transform: translate(0px, -3px)" />
            </button>
            <a-popconfirm
              title="Bạn có muốn xóa phòng này không ?"
              ok-text="Có"
              cancel-text="Không"
              @confirm="handleRemove(record.id)"
            >
              <button type="button" class="btn btn-danger">
                <DeleteOutlined style="transform: translate(0px, -3px)" />
              </button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <DetailRoom @on-close-detail="handleCloseDetail" :detail="detail" />
</template>
