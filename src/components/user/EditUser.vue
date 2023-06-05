<template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Edit User</h2>
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

        <!---<div class="input-group mb-3">
          <span class="input-group-text">Password</span>
          <input type="password" class="form-control" v-model="user.password" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Confirm Password</span>
          <input type="password" class="form-control" v-model="user.passwordConfirm" />
        </div>-->

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

        <div class="input-group mb-3">
          <span class="input-group-text">User Type</span>
          <input type="text" class="form-control" v-model="user.userType" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Has Account</span>
          <input type="checkbox" class="form-check-input" v-model="user.hasAccount" />
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
import axios from "axios";
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
        hasAccount: false,
      },
    };
  },
  methods: {
    updateUser() {
      axios
        .put("http://localhost:8080/users/" + this.id, this.user,{
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlbXBsb3llZUBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTY4NTk2MTE5MSwiZXhwIjoxNjg1OTY0NzkxfQ.Z8oeYJhMcJczFWPabImkyJbWgBF-5jzssqbNFMvCL8sVfp6HlXJnCMCjGQ3LPPVUXKSGEgOVoBx1biqaQZ3YOcIgXb7IqySoIEG016xXORvQm69OqQ5Wze_a5m5mfRD3piVfuJabBxdRVwyAmCYTSUky__gwJAprDeQJ4-IEepW50PGuwwj6dHDlW9bpcfBhyZ0fwDfqNYOI0ki0zxoRQfaTFY7Y-JIdAXqDWw51XVBQdM7BW39fj89vjYqurkKplVMcl0Ki3clXc_kRUvmNDeOi8nFYsJB5708CjVBik9Vw4urX0Ne3lxldjiOn45_KU6P-N9gcmgMnhLL41Atz7A"}`
          }
        })
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$router.push("/users");
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    axios
      .get("http://localhost:8080/users/" + this.id)
      .then((result) => {
        console.log(result);
        this.user = result.data;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>