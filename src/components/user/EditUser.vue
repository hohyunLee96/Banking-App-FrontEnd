<template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Edit User</h2>
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

        <div class="input-group mb-3">
          <span class="input-group-text">User Type</span>
          <select v-model=user.userType class="form-select" aria-label="Default select example">
            <option value="ROLE_EMPLOYEE">Employee</option>
            <option value="ROLE_CUSTOMER">Customer</option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Has Account</span>
          <input type="checkbox" class="form-check-input" v-model="user.hasAccount" />
        </div>

        <h2 class="mt-3 mt-lg-5">Change Password</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">New Password</span>
          <input type="password" class="form-control" v-model="user.password" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Confirm Password</span>
          <input type="password" class="form-control" v-model="user.passwordConfirm" />
        </div>

        <div class="input-group mt-4">
          <button type="button" class="btn btn-primary" @click="updateUser">
            Save changes
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="this.$router.push('/users')">
              Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import AdminPanel from "./../AdminPanel.vue";

export default {
  name: "EditUser",
  components: {
    AdminPanel
  },
  props: {
    id: Number,
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
        hasAccount: "",
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
          this.$router.push("/users");
        })
        .catch((error) => {
            console.log(error.response.data);
            this.errorMessage = error.response.data;
            this.successMessage = "";
            setTimeout(() => {
                this.errorMessage = "";
            }, 8000);
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