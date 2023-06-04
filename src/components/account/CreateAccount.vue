<template>
    <section>
      <div class="container">
        <form ref="form">
          <h2 class="mt-3 mt-lg-5">Create an account</h2>
          <h5 class="mb-4"></h5>

          <div class="input-group mb-3">
            <span class="input-group-text">userID</span>
            <input type="number" class="form-control" v-model="users.id" />
          </div> 

          <div class="input-group mb-3">
            <span class="input-group-text">user name</span>
            <textarea class="form-control" v-model="users.firstName"></textarea>
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Absolute Limit</span>
            <input type="text" class="form-control" v-model="account.absoluteLimit" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Account Type</span>
            <select class="form-select" v-model="account.accountType">
              <option value="SAVINGS">SAVINGS</option>
              <option value="CURRENT">CURRENT</option>
            </select>
          </div>

  
          <div class="input-group mt-4">
            <button type="button" class="btn btn-primary" @click="addAccount">
              Create Account
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="this.$router.push('/accounts')"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script>
import axios from 'axios';
  
  export default {
    name: "CreateAccount",
    data() {
      return {
        account: {
        accountId: 0,
          IBAN: "",
          balance: "",
          absoluteLimit: "",
          accountType: "",
          userId: 0,
        },
        users: [],
        accounts: [],
      };
    },
    methods: {
      addAccount() {
  this.account.userId = this.users.id; // Assign the user ID to the account object

  axios
    .post("http://localhost:8080/accounts", this.account)
    .then((res) => {
      console.log(res.data);
      this.$refs.form.reset();
      this.$router.push("/accounts");
    })
    .catch((error) => console.log(error));
},

    },
    mounted() {
  axios
    .get("http://localhost:8080/users/" + this.$route.params.userId) // Use $route.params.userId to get the ID from the route
    .then((result) => {
      console.log(result);
      this.users = result.data;
    })
    .catch((error) => console.log(error));
    },
  };
  </script>
  
  <style>
  </style>