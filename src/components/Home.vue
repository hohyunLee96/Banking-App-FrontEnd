<template class="bg-light">
  
  <section style="width: 100%; height: 100%">
    <div style="width: 100%; height: 30vw; background-image: url('../../../home-page-background-image.jpg'); background-size: cover; background-position: 0px; background-repeat: no-repeat;">
      <div id="title-section" style="margin-left: 3vw;">
        <p style="color: white; font-weight:1500; font-size: 60px; letter-spacing: 4px;">Hi {{ user.firstName }}</p>
        <h5 style="color: white; ">Don't have an account yet?</h5>
        <button class="btn btn-outline-light" style="margin-top: 20px; font-size: large;" @click="this.$router.push({ path: '/createaccount/' + this.store.getUserId})">Open Account</button>
      </div>
    </div>
    <div style="margin-top: 3vw; height: 20vw; display: flex; flex-direction: row; justify-items: auto; justify-content: space-evenly;">
      
      <a :href="`/editUser/${this.store.id}`" style="text-decoration: none;">
        <div class="floating-box ">
          My Details
        </div>
      </a>
      <a href="/myaccount" style="text-decoration: none;">
        <div class="floating-box">
          My Accounts
        </div>
      </a>
      <a href="/transactions" style="text-decoration: none;">
        <div class="floating-box">
          Transfer Money
        </div>
      </a>
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
    if(!this.store.isAuthenticated){
      this.$router.push({ path: "/login" });
    }
    if(!this.store.isAuthenticated){
      this.$router.push({ path: "/login" });
    }
    axios
      .get("users/" + this.store.getUserId)
      .then((result) => {
        console.log(result);
        this.user = result.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data == "Invalid JWT token") {
          this.store.logout();
          this.$router.push({ path: "/login" });
        }
      });
  },
  methods: {

  },
};
function redirectToRegister() {
  window.location.href = "/register";
}
</script>

<style>
.floating-box {
  width: 30vw;
  height: 7vw;
  color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.39);
  background-color: rgb(52, 58, 64);
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  line-height: 7vw;
}
</style>