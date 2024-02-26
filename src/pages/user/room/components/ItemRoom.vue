<script setup>
import { reactive, watch, defineProps, computed } from 'vue'
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

// const formatTitle = computed(() => {return detail.name + ' - ' + '('+ detail.code + ')'})
const formattedTitle = (detail) => `${detail.name} - (${detail.code})`;

const roomTypeStyle = (value) => {
  if (!value) {
    return ''
  }
  const type = common.TYPE_ROOM.find((x) => x.value == value)
  return `Loại phòng: ${type.name}`
}

const roomStatusStyle = (value) => {
  if (!value) {
    return ''
  }
  const type = common.STATUS_ROOM.find((x) => x.value == value)
  return `Tình trạng: ${type.name}`
}
</script>
<template>
  <a-card hoverable style="width: 240px">
    <template #cover>
      <img alt="example" src="@/assets/images/no-image.jpg" />
    </template>
    <a-card-meta :title="formattedTitle(detail)">
      <template #description>{{ detail.desc }}</template>
    </a-card-meta>

    <div v-html="roomTypeStyle(detail.type)"></div>
    <div v-html="roomStatusStyle(detail.status)"></div>
  </a-card>
</template>
