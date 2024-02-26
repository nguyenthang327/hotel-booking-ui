<script setup>
import common from '@/utils/common'
</script>
<template>
  <div class="login-page">
    <div class="container gx-0">
      <div class="row gx-0">
        <div class="col-md-6 bg--main d-flex justify-content-center align-items-center">
          <img
            src="@/assets/logo.svg"
            alt="Branch logo"
            class="logo"
          />
          <h2>{{ common.TITLE }}</h2>
        </div>
        <div class="col-md-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .logo{
  max-height:180px;
 }


</style>