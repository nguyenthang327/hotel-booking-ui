<script setup>
import common from '@/utils/common'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive(common.USER())

const handleSignOut = () => {
  common.SIGNOUT();
  router.push("/");
};

</script>
<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="d-flex justify-content-around">
          <h2 style="color: #fff">{{ common.TITLE }}</h2>
          <div class="info">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                <span style="padding: 8px;">{{ user.name }}</span>
                <img src="@/assets/images/no-image.jpg" class="avatar-icon" />
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <span  @click="handleSignOut()">Đăng xuất</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            
          </div>
        </div>
      </a-layout-header>
      <a-layout-content><slot /></a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
.avatar-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
