<template>
    <section>
      <div class="admin-panel">
        <AdminPanel />
      </div>
      <div class="container">
        <h2 class="mt-3 mt-lg-5">Accounts</h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push({ path: '/users', query: { hasAccount: false }});">
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
  name: "UserAccountList",
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
      // Retrieve the ID from localStorage
      var id = localStorage.getItem("id");

      // Make a GET request to fetch the account
      axios
        .get("http://localhost:8080/accounts", {
          params: {
            user: id,
          },
        })
        .then((response) => {
          console.log(response);
          this.accounts = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>


    
    