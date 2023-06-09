<template>
  <section class="account-list">
    <div class="admin-panel" v-if="isUserRoleEmployee">
      <AdminPanel />
    </div>
    <div v-if="isUserRoleCustomer">
      total Balance: {{ totalBalance }}
    </div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5"><i class="fas fa-list"></i> Accounts</h2>
      <div class="filters" v-if="isUserRoleEmployee">
        <label><i class="fas fa-user"></i> First Name:</label>
        <input type="text" v-model="filters.firstName" />
        <label><i class="fas fa-user"></i> Last Name:</label>
        <input type="text" v-model="filters.lastName" />
        <label><i class="fas fa-university"></i> Account Type:</label>
        <select v-model="filters.accountType">
          <option value="">All</option>
          <option value="SAVINGS">Saving</option>
          <option value="CURRENT">Current</option>
        </select>
        <label><i class="fas fa-id-card"></i> User ID:</label>
        <input type="number" v-model="filters.user" />
        <button type="button" class="btn btn-primary" @click="applyFilters">
          <i class="fas fa-filter"></i> Apply Filters
        </button>
        <button type="button" class="btn btn-secondary" @click="resetFilters">
          <i class="fas fa-undo"></i> Reset Filters
        </button>
      </div>
      <button type="button" class="btn btn-primary mt-3" v-if="isUserRoleEmployee"
        @click="this.$router.push({ path: '/users'});">
        <i class="fas fa-plus"></i> Add Accounts
      </button>
      <div class="row mt-3">
        <account-list-item v-for="account in filteredAccounts" :key="account.accountId" :account="account"
          @update="update" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import AdminPanel from "./../AdminPanel.vue";
import AccountListItem from "./AccountListItem.vue";
import jwtDecode from "jwt-decode";

export default {
  name: "AccountList",
  components: {
    AdminPanel,
    AccountListItem,
  },
  data() {
    return {
      accounts: [],
      filters: {
        firstName: "",
        lastName: "",
        accountType: "",
        user: null,
      },
      totalBalance: 0,
    };
  },
  computed: {
    filteredAccounts() {
      const { firstName, lastName, accountType, user } = this.filters;

      return this.accounts.filter((account) => {
        // Apply filters based on the selected criteria
        return (
          (firstName === "" || account.user.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
          (lastName === "" || account.user.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
          (accountType === "" || account.accountType === accountType) &&
          (user === null || account.user === user)
        );
      });
    },
    isUserRoleEmployee() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.auth === "ROLE_EMPLOYEE";
      }
      return false;
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
    this.calculateTotalBalance();
  },
  methods: {
    calculateTotalBalance() {
      if (this.isUserRoleCustomer) {
        this.totalBalance = this.accounts.reduce(
          (sum, account) => sum + account.balance,
          0
        );
      }
    },
    update() {
      axios
        .get("accounts")
        .then((result) => {
          console.log(result);
          this.accounts = result.data;
          this.calculateTotalBalance();
        })
        .catch((error) => console.log(error));
    },
    applyFilters() {
      // Perform API request with filters
      axios
        .get("accounts", {
          params: {
            firstName: this.filters.firstName,
            lastName: this.filters.lastName,
            accountType: this.filters.accountType,
            user: this.filters.user,
          },
        })
        .then((result) => {
          console.log(result);
          this.accounts = result.data;
        })
        .catch((error) => console.log(error));
    },
    resetFilters() {
      // Clear filters and retrieve all accounts
      this.filters.firstName = "";
      this.filters.lastName = "";
      this.filters.accountType = "";
      this.filters.user = null;
      this.update();
    },
  },
};
</script>
<style>
.admin-panel {
  margin-top: 0px;
  /* Adjust the value to remove the row gap */
  width: 200px;
  float: left;
  /* Add any additional styling for the admin panel here */
}

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
