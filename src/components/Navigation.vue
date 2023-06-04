<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item" v-if="this.store.isAuthenticated">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>      
        <li class="nav-item" v-if="this.store.isAuthenticated">
          <router-link to="/products" class="nav-link" active-class="active"
            >Products</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link" active-class="active"
            >Register</router-link
          >
        </li>
        <li class="nav-item" v-if="this.store.isAuthenticated">
          <router-link to="/adminPanel" class="nav-link" active-class="active"
            >Admin Panel</router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </div>
    <button class="btn btn-dark btn-lg px-5" @click="logout" type="button">Logout</button>
  </nav>
</template>

<script>

import { useUserSessionStore } from '@/stores/usersession';
export default {
  name: "Navigation",
  setup() {
    return {
      store: useUserSessionStore()
    }
  },
  methods: {
    logout() {
      this.store.logout()
          .then(() => {
            this.$router.push("http://localhost:8080/auth/login");
          })
          .catch((error) => {
            console.log(error);
          });
    },
  }
};
</script>

<style>
</style>