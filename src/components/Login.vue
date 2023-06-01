<template>
  <section class="container mt-5 p-5 col-10 col-md-6 col-lg-4 col-xl-3">
    <div class="container">
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="input-group mb-3">
          <span class="input-group-text">Email</span>
          <input
              type="text"
              class="form-control"
              id="floatingInput"
              v-model="this.email"
              placeholder="Enter your email..."
          />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Password</span>
          <input
              type="password"
              class="form-control"
              id="floatingInput"
              v-model="this.password"
              placeholder="Enter your password.."
              autocomplete="off"
          />
        </div>
        <button type="button" @click="login()" class="btn btn-primary mt-3">
          Sign in
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { userSessionStore } from "@/stores/usersession";

export default {

  setup() {
    const store = userSessionStore();

    // Method for automatic login
    const localLogin = () => {
      store.localLogin();
    };

    // Call the automatic login method when the component is created
    localLogin();

    return {
      store,
    };
  },

  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      this.store.login(this.email, this.password)
          .then((result) => {
            console.log(result);
            this.$router.push("/products");
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error;
          });
    },
  }
};
</script>
