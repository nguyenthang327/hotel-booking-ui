<script setup>
import { reactive } from 'vue'
import { login } from '@/services/auth'
import { SET_TOKEN, SET_USER } from '@/utils/common'
import { useRouter } from 'vue-router'

const router = useRouter()

const formState = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const { data } = await login(formState)

    SET_TOKEN(data.access_token)
    SET_USER(JSON.stringify(data.user))
    // console.log(data)
    if (data?.user?.role === 'admin') {
      router.push({
        name: 'admin-list-user'
      })
    } else if (data?.user?.role === 'user') {
      router.push({
        name: 'user-list-room'
      })
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <a-form
    class="login__form d-flex justify-content-center align-items-center"
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="handleLogin"
  >
    <div class="w-100">
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Vui lòng nhập email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Mật khẩu"
        name="password"
        :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
      >
        <a-input-password v-model:value="formState.password" autocomplete="off" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Đăng nhập</a-button>
      </a-form-item>

      <div class="ml-20">
        Hoặc
        <router-link to="/register">Đăng ký ngay!</router-link>
      </div>
    </div>
  </a-form>
</template>

<style scoped>
.login__form {
  height: 100vh;
}

.ml-20 {
  margin-left: 20%;
}
</style>
