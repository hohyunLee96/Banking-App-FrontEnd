<template>
  <section class="vh-100 gradient-custom">
    <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <div class="bank-icon">
                <embed class="icon" id="svgicon" src="logo-no-background.svg" type="image/svg+xml">
              </div>
              <h2 class="fw-bold mb-4 text-uppercase">Login</h2>
              <div class="form-outline form-white mb-4">
                <input id="inputemail" v-model="email" type="text" class="form-control" />
                <label class="form-label" for="inputemail">Email</label>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input type="password" v-model="password" class="m-1 form-control" id="inputPassword" />
                  <div class="input-group-append">
                  </div>
                  <button type="button" class="btn btn-secondary ml-3" @click="togglePassword()"
                    id="passwordToggleButton">
                    Show
                  </button>
                </div>
                <label for="inputPassword" class="form-control-label">Password</label>
              </div>

              <button class="btn btn-dark btn-lg px-5" name="loginButton" id="loginButton" @click="login"
                type="submit">Login</button>
            </div>

            <div>
              <p class="mb-0">Don't have an account?
                <button @click="register()" class="btn btn-primary text-dark-50 fw-bold">Sign Up</button>
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
        this.errorMessage = error.data.message;
      });
    },
    register() {
      this.$router.push('/register');
    },
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

<style scoped>
.gradient-custom {
  background-color: #003366;
  background-image: linear-gradient(315deg, #003366 0%, #006699 74%);
}

.card-body {
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.bank-icon {

  height: 100%;
  width: 100%;
}

.bank-icon img {
  width: 100px;
  height: 100px;
}

.form-control {
  background-color: #f3f3f3;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
}

.form-label {
  color: #000;
  font-size: 0.875rem;
}

.btn-dark {
  background-color: #424242;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

.btn-dark:hover {
  background-color: #303030;
}

.btn-primary {
  background-color: #5c6bc0;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
}

.btn-primary:hover {
  background-color: #44549e;
}

.alert-danger {
  background-color: #ffebee;
  color: #b71c1c;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.text-uppercase {
  text-transform: uppercase;
}

.text-dark-50 {
  color: rgba(0, 0, 0, 0.5);
}

.mb-0 {
  margin-bottom: 0;
}

.mt-md-4 {
  margin-top: 1.5rem;
}

.pb-5 {
  padding-bottom: 3rem;
}

.px-5 {
  padding-left: 3rem;
  padding-right: 3rem;
}
 
 #svgicon {
  width: 300px;
  height: 200px;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
</style>
