<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'
import Home from "@/components/Home.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Home
  }
};
</script>

<style>
</style>
