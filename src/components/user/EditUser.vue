<template>
  <section style="width: 100%; display: flex; justify-items: center; justify-content: center;">
    <div style="width: 80%;">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5" v-if="user.userType === 'ROLE_EMPLOYEE'">Edit User</h2>
        <h2 class="mt-3 mt-lg-5" v-if="user.userType === 'ROLE_CUSTOMER'">My Details</h2>
        <h5 class="mb-4"></h5>
        <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
        <div class="success alert-success" v-if="successMessage" id="success-message">{{ successMessage }}</div>
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
          <span class="input-group-text">Date of Birth</span>
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

        <div v-if="user.userType === 'ROLE_EMPLOYEE'" class="input-group mb-3">
          <span class="input-group-text">User Type</span>
          <select v-model=user.userType class="form-select" aria-label="Default select example">
            <option value="ROLE_EMPLOYEE">Employee</option>
            <option value="ROLE_CUSTOMER">Customer</option>
          </select>
        </div>

        <div v-if="user.userType === 'ROLE_CUSTOMER'">
          <h2 class="mt-3 mt-lg-5">Change Password</h2>
          <h5 class="mb-4"></h5>
          
          <small id="password-help" class="form-text text-muted">A password must be at least 8 characters long, contain one special character and one number.</small>
          <div class="input-group mb-3">
            <span class="input-group-text">New Password</span>
            <input id="new-password" type="password" aria-describedby="password-help" class="form-control" v-model="user.password" />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Confirm Password</span>
            <input type="password" class="form-control" v-model="user.passwordConfirm" />
          </div>
        </div>
        <div v-if="user.userType === 'ROLE_EMPLOYEE'">
          <h2 class="mt-3 mt-lg-5">Transaction Limits</h2>
          <h5 class="mb-4"></h5>

          <div class="input-group mb-3">
            <span class="input-group-text">Daily Limit</span>
            <input type="number" class="form-control" v-model="user.dailyLimit" />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Transaction Limit</span>
            <input type="number" class="form-control" v-model="user.transactionLimit" />
          </div>
        </div>
        <div class="input-group mt-4">
          <button type="button" class="btn btn-primary" @click="updateUser">Save changes</button>
          <button type="button" v-if="!this.store.isUserRoleEmployee" class="btn btn-danger" @click="this.$router.push('/users')">Cancel</button>
          <button type="button" v-if="this.store.isUserRoleEmployee" class="btn btn-danger" @click="this.$router.push('/home')">Cancel</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import AdminPanel from "./../AdminPanel.vue";
import { useUserSessionStore } from "@/stores/usersession";


export default {
  name: "EditUser",
  components: {
    AdminPanel
  },
  props: {
    id: Number,
  },
  setup() {
    const store = useUserSessionStore();
    return {
      store
    };
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      user: {
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        postalCode: "",
        address: "",
        city: "",
        phoneNumber: "",
        userType: "",
        dailyLimit: "",
        transactionLimit: "",
      },
      userTypes: ["Employee", "Customer"],
    };
  },
  methods: {
    updateUser() {
      axios
        .put("users/" + this.id, this.user)
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.errorMessage = "";
          this.successMessage = "User updated successfully!";
          if(!this.store.isUserRoleEmployee)
            this.$router.push("/users");
          else
            this.$router.push("/home");
        })
        .catch((error) => {
            console.log(error.response.data);
            this.errorMessage = error.response.data.message;
            this.successMessage = "";
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log(error);
          });
    },
  },
  mounted() {
    axios
      .get("users/" + this.id)
      .then((result) =>{
        console.log(result);
        this.user = result.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>
<style>
</style>