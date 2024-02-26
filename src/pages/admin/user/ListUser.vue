<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { listPaginate, remove } from '@/services/user'
import { columns } from './configUser'
import DetailUser from '@/pages/admin/user/DetailUser.vue'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const store = useStore()

const listUser = ref([])
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

const expandRow = ref([])

const handleGetListUser = async (filters = {}) => {
  store.dispatch('setLoading', true)
  const { data } = await listPaginate(filters)
  listUser.value = data.data.data.map((item) => ({
    ...item,
    key: item.id + Math.random()
  }))
  pagination.total = data.data.total
  pagination.pageSize = data.data.per_page
  pagination.current = data.data.current_page
  store.dispatch('setLoading', false)
}
const handleChangePage = (page) => {
  handleGetListUser({ page: page.current})
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
    handleGetListUser()
  }
}

const handleRemove = async (id) => {
  store.dispatch('setLoading', true)
  await remove(id)
  message.success('Xóa người dùng thành công !')
  store.dispatch('setLoading', false)
  handleGetListUser()
}

handleGetListUser()
</script>

<template>
  <div class="px-4">
    <div class="my-2 border-bottom px-4 py-2 fs-2 text-uppercase">Quản lý người dùng</div>
    <a-table
      :dataSource="listUser"
      bordered
      :pagination="pagination"
      @change="handleChangePage"
      :columns="columns"
      :scroll="{ x: 500 }"
      class="border"
    >
      <template #bodyCell="{ column, record, text }">
        <template v-if="column.key === 'action'">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="handleDetail(record, 'update')">
              <EditOutlined style="transform: translate(0px, -3px)" />
            </button>
            <a-popconfirm
              title="Bạn có muốn xóa người dùng này không ?"
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
  <DetailUser @on-close-detail="handleCloseDetail" :detail="detail" />
</template>
