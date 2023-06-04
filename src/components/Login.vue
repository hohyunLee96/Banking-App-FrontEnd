<template>
  <section class="vh-100 gradient-custom">
    <div class="alert alert-danger" v-if="this.errorMessage">{{ errorMessage }}</div>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <br>
                <div class="form-outline form-white mb-4">
                  <input id="inputemail" v-model="email" type="text" class="form-control" />
                  <label class="form-label" for="email">Email</label>
                </div>


                <div class="form-group">
                  <div class="input-group">
                    <input type="password" v-model="password" class="form-control" id="inputPassword" />
                    <div class="input-group-append">
                      <button type="button" class="btn btn-secondary ml-2" @click="togglePassword()"
                        id="passwordToggleButton">
                        Show password
                      </button>
                    </div>
                  </div>
                  <label for="password" class="form-control-label">Password</label>
                </div>

                <button class="btn btn-dark btn-lg px-5" name="loginButton" id="loginButton" @click="login"
                  type="submit">Login</button>
              </div>
              <div>
                <p class="mb-0">Don't have an account?
                  <a @click="register()" class="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>


import { useUserSessionStore } from '@/stores/usersession';
export default {
  name: "Login",
  setup() {
    return {
      store: useUserSessionStore()
    }
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    login() {
      console.log("logging in!")
      this.store.login(this.email, this.password).then(() => {
        if (this.store.isAuthenticated) {
          this.$router.push('/');
        } else {
          this.errorMessage = "Login failed";
        }
      }).catch((error) => {
        this.errorMessage = error;
      });
    },
    // register() {
    //   this.$router.push('/register');
    // },
    togglePassword() {
      var x = document.getElementById("inputPassword");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    }
  },
};
</script>

<style>

</style>