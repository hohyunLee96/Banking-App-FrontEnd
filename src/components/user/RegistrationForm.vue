<template>
    <section>
      <div style="display: flex; width: 100%; justify-content: center; margin-bottom: 30px;">
        <form ref="form" style="width: 80% !important">
          <h2 class="mt-3 mt-lg-5">Register</h2>
          <h5 class="mb-4"></h5>
  
          <div class="input-group mb-3">
            <span class="input-group-text">First Name</span>
            <input type="text" class="form-control" v-model="user.firstName" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Last Name</span>
            <input type="text" class="form-control" v-model="user.lastName" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Email</span>
            <input type="email" class="form-control" v-model="user.email" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Password</span>
            <input type="password" class="form-control" v-model="user.password" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Confirm Password</span>
            <input type="password" class="form-control" v-model="user.passwordConfirm" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Birth Date</span>
            <input type="date" class="form-control" v-model="user.birthDate" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Postal Code</span>
            <input type="text" class="form-control" v-model="user.postalCode" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Address</span>
            <input type="text" class="form-control" v-model="user.address" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">City</span>
            <input type="text" class="form-control" v-model="user.city" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Phone Number</span>
            <input type="text" class="form-control" v-model="user.phoneNumber" />
          </div>
  
            <button type="button" class="btn btn-primary" @click="addUser()" style="margin-right: 20px;">
              Register
            </button>

            <button
              type="button"
              class="btn btn-danger"
              @click="this.$router.push('/login')">
                Cancel
            </button>

        </form>
      </div>
    </section>
  </template>
  
  <script>
  import axios from "../../axios-auth";
  
  export default {
    name: "CreateUser",
    data() {
      return {
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
        this.user.userType = "ROLE_CUSTOMER";
        axios
          .post("users", this.user)
          .then((res) => {
            console.log(res.data);
            this.$refs.form.reset();
            this.$router.push("/login");
          })
          .catch((error) => console.log(error));
      },
    }
  };
  </script>
  
  <style>
  </style>