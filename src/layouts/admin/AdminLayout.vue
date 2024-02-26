<template>
  <div class="position-relative h-100">
    <a-layout class="custom-height-100vh">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
          <a-menu-item key="list-user" @click="handleClickItem(true, 'list-user')">
            <user-outlined />
            <span>Danh sách người dùng</span>
          </a-menu-item>
          <a-menu-item key="list-room" @click="handleClickItem(true, 'list-room')">
            <video-camera-outlined />
            <span>Danh sách phòng</span>
          </a-menu-item>

          <a-menu-item @click="handleSignOut()">
            <LogoutOutlined />
            <span>Đăng xuất</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import common from '@/utils/common'

const router = useRouter()
const route = useRoute()

const selectedKeys = ref(['list-user'])
const collapsed = ref(false)

const handleClickItem = (inList = false, path) => {
  if (inList) {
    return router.push(path)
  }
}

const handleSignOut = () => {
  common.SIGNOUT();
  router.push("/");
};

</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.custom-height-100vh {
  min-height: 100vh !important;
}
</style>
