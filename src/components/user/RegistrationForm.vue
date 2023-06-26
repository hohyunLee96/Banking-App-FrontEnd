<template>
  <section>
    <div class="registration-page">
      <div class="registration-form">
        <div class="bank-icon">
          <img class="icon" src="logo-no-background.svg" alt="Bank Icon" />
        </div>

        <form ref="form">
          <h2 class="form-title" v-if="store.isAuthenticated">Create User</h2>
          <h2 class="form-title" v-if="!store.isAuthenticated">Register</h2>

          <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="user.firstName" />
            </div>

            <div class="form-group col-md-6">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="user.lastName" />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="user.email" />
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="user.password" />
            </div>

            <div class="form-group col-md-6">
              <label for="passwordConfirm">Confirm Password</label>
              <input type="password" class="form-control" id="passwordConfirm" v-model="user.passwordConfirm" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="birthDate">Birth Date</label>
              <input type="date" class="form-control" id="birthDate" v-model="user.birthDate" />
            </div>

            <div class="form-group col-md-6">
              <label for="postalCode">Postal Code</label>
              <input type="text" class="form-control" id="postalCode" v-model="user.postalCode" />
            </div>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" v-model="user.address" />
          </div>

          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="city">City</label>
              <input type="text" class="form-control" id="city" v-model="user.city" />
            </div>

            <div class="form-group col-md-6">
              <label for="phoneNumber">Phone Number</label>
              <input type="text" class="form-control" id="phoneNumber" v-model="user.phoneNumber" />
            </div>
          </div>

          <div class="form-group">
            <button type="button" v-if="!store.isAuthenticated" class="btn btn-primary btn-register" @click="addUser()">Register</button>
            <button type="button" v-if="store.isAuthenticated" class="btn btn-primary btn-register" @click="addUser()">Add user</button>
            <button type="button" v-if="!store.isAuthenticated" class="btn btn-danger" @click="$router.push('/login')">Cancel</button>
            <button type="button" v-if="store.isAuthenticated" class="btn btn-danger" @click="$router.push('/users')">Cancel</button>
          </div>

        </form>
      </div>
    </div>
  </section>
</template>


<script>
import axios from "../../axios-auth";
import { useUserSessionStore } from "@/stores/usersession";

export default {
  name: "CreateUser",
  setup() {
    const store = useUserSessionStore();
    return {
      store
    };
  },
  data() {
    return {
      errorMessage: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
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
  methods: {
    addUser() {
      this.user.hasAccount = false;
      this.user.userType = "ROLE_USER";

      // Call verificationLinkSentMsg method to send the verification link
      this.verificationLinkSentMsg()
          .then(() => {
            // Verification link sent successfully, now register the user
            axios
                .post("users", this.user)
                .then((res) => {
                  console.log(res.data);
                  this.$refs.form.reset();
                })
                .catch((error) => {
                  console.log(error.response.data);
                  this.errorMessage = error.response.data.message;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  console.log(error);
                });
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error.response.data.message;
          });
    },
    verificationLinkSentMsg() {
      return axios
          .post("users/register", this.user)
          .then((response) => {
            console.log(response);
            alert(`Verification email sent to ${this.user.email}!`);
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error.response.data.message;
          });
    },
  }
};
</script>

<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.registration-form {
  flex: 1;
  padding: 20px;
  margin-left: 400px;
  /* Add left margin */
  margin-right: 400px;
  /* Add right margin */
}

.bank-icon {
  text-align: center;
  margin-bottom: 20px;
}

.icon {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
}

.form-title {
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-register {
  margin-right: 20px;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.btn-primary:hover,
.btn-danger:hover {
  opacity: 0.9;
}
</style>