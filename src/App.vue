<template>
  <navigation />
  <router-view />
</template>

<script>
import Navigation from './components/Navigation.vue'
import Home from "@/components/Home.vue";
import { useUserSessionStore } from './stores/usersession';

export default {
  name: "App",
  components: {
    Navigation,
    Home
  },
  setup() {
    const store = useUserSessionStore();
    store.localLogin();
    return {
      store: useUserSessionStore()
    };
  },mounted() {
    this.store.localLogin();
  }
};
</script>

<style>
html, body, #app{
    height: 100vh;
}
</style>
