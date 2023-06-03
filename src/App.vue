<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Login,
    Home
  }
};
</script>

<style>
</style>
