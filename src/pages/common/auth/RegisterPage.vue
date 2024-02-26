<script setup>
import { reactive } from 'vue'
import { register } from '@/services/auth'
import { SET_TOKEN, SET_USER } from '@/utils/common'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()

const formState = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleRegister = async () => {
  try {
    await register(formState)
    message.success('Đăng ký thành công !')
    router.push({
      name: 'login'
    })
  } catch (e) {
    console.log(e)
    message.error('Đăng ký thất bại !')
  }
}

const compareToPassword = (_, value) => {
  if (value && value !== formState.password) {
    return Promise.reject(new Error('Mật khẩu không khớp !'))
  } else {
    return Promise.resolve()
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
    @finish="handleRegister"
  >
    <div class="w-100">
      <a-form-item
        label="Tên"
        name="name"
        :rules="[{ required: true, message: 'Vui lòng nhập tên!' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[
          { required: true, message: 'Vui lòng nhập email!' },
          {
            type: 'email',
            message: 'Địa chỉ Email không hợp lệ!'
          }
        ]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Mật khẩu"
        name="password"
        :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="Nhập lại mật khẩu"
        name="password_confirmation"
        :rules="[
          { required: true, message: 'Vui lòng nhập lại mật khẩu !' },
          {
            validator: compareToPassword,
            message: 'Mật khẩu không khớp'
          }
        ]"
      >
        <a-input-password v-model:value="formState.password_confirmation" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Đăng ký</a-button>
      </a-form-item>
      <div class="ml-20">
        Bạn đã có tài khoản,
        <router-link to="/login">Đăng nhập!</router-link>
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
