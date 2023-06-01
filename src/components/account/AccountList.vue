<template>
    <section>
      <div class="container">
        <h2 class="mt-3 mt-lg-5">Accounts</h2>
          <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createaccount');">
              Add Accounts
            </button>
        <div class="row mt-3">
          <account-list-item
            v-for="account in accounts"
            :key="account.accountId"
            :account="account"
            @update="update"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from "axios";
  
  import AccountListItem from "./AccountListItem.vue";
  
  export default {
    name: "AccountList",
    components: {
      AccountListItem,
    },
    data() {
      return {
        accounts: [],
      };
    },
    mounted() {
      this.update();
    },
    methods: {
      update() {
        axios
          .get("http://localhost:8080/accounts")
          .then((result) => {
            console.log(result);
            this.accounts = result.data;
          })
          .catch((error) => console.log(error));
      },
    },
  };
  </script>
  
  <style>
  </style>
  