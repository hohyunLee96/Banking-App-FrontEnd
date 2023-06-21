<template>
  <section class="account-list">
    <div class="container">
      <h2 class="mt-3 mt-lg-5"><i class="fas fa-list"></i> Accounts</h2>
      <div class="filters">
        <label><i class="fas fa-user"></i> First Name:</label>
        <input type="text" v-model="filters.firstName" />
        <label><i class="fas fa-user"></i> Last Name:</label>
        <input type="text" v-model="filters.lastName" />
      </div>
      <div class="row mt-3">
        <account-iban-list-item v-for="account in filteredAccounts" :key="account.accountId" :account="account"
          @update="update" />
      </div>
    </div>
  </section>
</template>
  
<script>
import axios from "../../axios-auth";
import AccountIbanListItem from "./AccounIbanListItem.vue";
import jwtDecode from "jwt-decode";

export default {
  name: "AccountList",
  components: {
    AccountIbanListItem,
  },
  data() {
    return {
      accounts: [],
      filters: {
        firstName: "",
        lastName: "",
        userId: 0,
      },
    };
  },
  computed: {
    filteredAccounts() {
      const { firstName, lastName } = this.filters;

      // Check if filters are empty
      if (firstName === "" && lastName === "") {
        return [];
      }

      return this.accounts.filter((account) => {
        // Apply filters based on the selected criteria
        return (
          (firstName === "" || account.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
          (lastName === "" || account.lastName.toLowerCase().includes(lastName.toLowerCase()))
        );
      });
    },
    isUserRoleCustomer() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.auth === "ROLE_CUSTOMER";
      }
      return false;
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      axios
        .get("accounts/search")
        .then((result) => {
          // console.log(result);
          this.accounts = result.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
.container {
  margin-left: 200px;
  /* Adjust the value to match the admin panel width */
  /* Add any additional styling for the container here */
}

/* Clear the float to prevent container collapsing */
.container::after {
  content: "";
  display: table;
  clear: both;
}
</style>
  