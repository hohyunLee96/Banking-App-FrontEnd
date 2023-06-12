<template class="bg-light">
  
  <section style="width: 100%; height: 100%">
    <div style="width: 100%; height: 35vw; background-image: url('../../../home-page-background-image.jpg'); background-size: cover; background-position: 0px; background-repeat: no-repeat;">
      <div id="title-section" style="margin-left: 3vw;">
        <p style="color: white; font-weight:1500; font-size: 60px; letter-spacing: 4px;">Hi {{ user.firstName }}</p>
        <h5 style="color: white; ">Don't have an account yet?</h5>
        <button class="btn btn-outline-light" style="margin-top: 20px; font-size: large;" @click="this.$router.push({ path: '/login'})">Open Account</button>
      </div>
    </div>
  </section>
  
</template>

<script>
import axios from "../axios-auth";
import { useUserSessionStore } from "@/stores/usersession";

export default {
  name: "Home",

  setup() {
    const store = useUserSessionStore();

    return {
      store,
    };
  },

  data() {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        postalCode: "",
        address: "",
        city: "",
        phoneNumber: "",
        userType: "",
        hasAccount: "",
      },
    };
  },
  mounted() {
    axios
      .get("users/" + this.store.getUserId)
      .then((result) => {
        console.log(result);
        this.user = result.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {

  },
};
function redirectToRegister() {
        window.location.href = "/register";
    }
</script>

<style>
</style>