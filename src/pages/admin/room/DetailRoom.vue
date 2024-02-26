<script setup>
import { defineProps, defineEmits, computed, watch, reactive, ref } from 'vue'

import { update, create } from '@/services/room'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import common from '@/utils/common'

const store = useStore()

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['on-close-detail'])

const formState = reactive({})

const isLoading = computed(() => store.getters.isLoading)
const action = computed(() => {
  const action = {
    update: 1,
    create: 2
  }

  return action[props.detail.action] || null
})
const title = computed(() => {
  const title = {
    update: 'Cập nhật',
    create: 'Tạo mới'
  }

  return title[props.detail.action] || 'Chi tiết'
})

watch(
  () => props.detail.show,
  () => {
    if (props.detail.action == 'update') {
      Object.assign(formState, props.detail.data)
      formState.type = props.detail.data.type
    }

    if (props.detail.action == 'create') {
      for (const key in formState) {
        delete formState[key]
      }
    }
  },
  { deep: true }
)
const handleClose = (value = false) => {
  emits('on-close-detail', value)
}

const onFinish = async (values) => {
  const data = {}
  data.id = action.value == 1 ? formState.id : null
  data.code = formState.code
  data.name = formState.name
  data.type = formState.type
  data.price = formState.price
  data.status = formState.status

  store.dispatch('setLoading', true)
  try {
    if (props.detail.action == 'update') {
      await update(data, data.id)
    }
    if (props.detail.action == 'create') {
      await create(data)
    }

    message.success('Thành công')
  } catch (e) {
    console.log(e.response.data)
    message.error('Thất bại')
  }
  store.dispatch('setLoading', false)
  handleClose(true)
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-modal
    :visible="detail.show"
    :title="title + ' người dùng'"
    width="40%"
    style="top: 20px"
    @cancel="handleClose"
  >
    <div class="content">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Mã phòng"
          name="code"
          :rules="[{ required: true, message: 'Vui lòng nhập mã phòng !' }]"
        >
          <a-input v-model:value="formState.code" />
        </a-form-item>
        <a-form-item
          label="Tên phòng"
          name="name"
          :rules="[{ required: true, message: 'Vui lòng nhập tên phòng!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="Loại phòng"
          name="type"
          :rules="[
            {
              required: true,
              message: 'Vui lòng nhập loại phòng !'
            }
          ]"
        >
          <a-select v-model:value="formState.type" style="width: 100%">
            <a-select-option value="">- Loại phòng -</a-select-option>
            <a-select-option
              v-for="(type, index) in common.TYPE_ROOM"
              :value="type.value"
              :key="index"
            >
              {{ type.name }}</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item
          label="Giá"
          name="price"
          :min="0"
          :rules="[{ required: true, message: 'Vui lòng nhập tên phòng!' }]"
        >
          <a-input-number v-model:value="formState.price" style="width: 100%" />
        </a-form-item>

        <a-form-item
          label="Tình trạng"
          name="status"
          :rules="[
            {
              required: true,
              message: 'Vui lòng nhập tình trạng phòng!'
            }
          ]"
        >
          <a-select v-model:value="formState.status" style="width: 100%">
            <a-select-option value="">- Tình trạng phòng -</a-select-option>
            <a-select-option
              v-for="(status, index) in common.STATUS_ROOM"
              :value="status.value"
              :key="index"
            >
              {{ status.name }}</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item v-if="action" :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" :loading="isLoading">{{ title }}</a-button>
        </a-form-item>
      </a-form>
    </div>
    <template #footer>
      <a-button type="danger" @click="handleClose">Đóng</a-button>
    </template>
  </a-modal>
</template>
