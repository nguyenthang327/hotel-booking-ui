<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { computed } from "vue";
import CommonLayout from '@/layouts/common/CommonLayout.vue'
import AdminLayout from '@/layouts/admin/AdminLayout.vue'
import UserLayout from '@/layouts/user/UserLayout.vue'

import { useRoute } from 'vue-router';

const route = useRoute();

const isRouteAdmin = computed(() => route?.meta?.isAdmin);
const isRouteUser = computed(() => route?.meta?.isUser);
const isRouteGuest = computed(() => route?.meta?.isGuest);

</script>

<template>
  <AdminLayout v-if="isRouteAdmin">
    <RouterView />
  </AdminLayout>
  <UserLayout v-else-if="isRouteUser">
    <RouterView />
  </UserLayout>
  <CommonLayout v-else>
    <RouterView />
  </CommonLayout>

  <!-- <RouterView /> -->
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
