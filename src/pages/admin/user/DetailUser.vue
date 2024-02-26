<script setup>
import { defineProps, defineEmits, computed, watch, reactive, ref } from 'vue'

import { update } from '@/services/user'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

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
  data.email = formState.email
  data.name = formState.name

  store.dispatch('setLoading', true)
  try {
    if (props.detail.action == 'update') {
      await update(data, data.id)
    }
    if (props.detail.action == 'create') {
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
          label="Email"
          name="email"
          :rules="[{ required: true, message: 'Vui lòng nhập email !' }]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item
          label="Tên"
          name="name"
          :rules="[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          v-if="detail.action == 'create'"
          label="Mật khẩu"
          name="password"
          :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]"
        >
          <a-input-password v-model:value="formState.password" />
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
