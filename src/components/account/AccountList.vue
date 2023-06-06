<!-- <template>
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
import axios from "../../axios-auth";
  import AdminPanel from "./../AdminPanel.vue";
  import AccountListItem from "./AccountListItem.vue";
  
  export default {
    name: "AccountList",
    components: {
      AdminPanel,
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
          .get("accounts")
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
.admin-panel {
  margin-top: 0px; /* Adjust the value to remove the row gap */
  width: 200px;
  float: left;
  /* Add any additional styling for the admin panel here */
}

.container {
  margin-left: 200px; /* Adjust the value to match the admin panel width */
  /* Add any additional styling for the container here */
}

/* Clear the float to prevent container collapsing */
.container::after {
  content: "";
  display: table;
  clear: both;
}

</style>
   -->

<!-- // nicely working code -->
   <!-- <template>
    <section>
      <div class="admin-panel">
        <AdminPanel />
      </div>
      <div class="container">
        <h2 class="mt-3 mt-lg-5">Accounts</h2>
        <div class="filters">
          <label>First Name:</label>
          <input type="text" v-model="filters.firstName" />
          <label>Last Name:</label>
          <input type="text" v-model="filters.lastName" />
          <label>Account Type:</label>
          <select v-model="filters.accountType">
            <option value="">All</option>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>
          <button type="button" class="btn btn-primary" @click="applyFilters">
            Apply Filters
          </button>
          <button type="button" class="btn btn-secondary" @click="resetFilters">
            Reset Filters
          </button>
        </div>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push({ path: '/users', query: { hasAccount: false }});">
          Add Accounts
        </button>
        <div class="row mt-3">
          <account-list-item
            v-for="account in filteredAccounts"
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
  import AdminPanel from "./../AdminPanel.vue";
  import AccountListItem from "./AccountListItem.vue";
  
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
        },
      };
    },
    computed: {
      filteredAccounts() {
        const { firstName, lastName, accountType } = this.filters;
  
        return this.accounts.filter((account) => {
          // Apply filters based on the selected criteria
          return (
            (firstName === "" || account.user.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
            (lastName === "" || account.user.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
            (accountType === "" || account.accountType === accountType)
          );
        });
      },
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
      applyFilters() {
        // Perform API request with filters
        axios
          .get("http://localhost:8080/accounts", {
            params: {
              firstName: this.filters.firstName,
              lastName: this.filters.lastName,
              accountType: this.filters.accountType,
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
        this.update();
      },
    },
  };
  </script>
  
  <style>
.admin-panel {
  margin-top: 0px; /* Adjust the value to remove the row gap */
  width: 200px;
  float: left;
  /* Add any additional styling for the admin panel here */
}

.container {
  margin-left: 200px; /* Adjust the value to match the admin panel width */
  /* Add any additional styling for the container here */
}

/* Clear the float to prevent container collapsing */
.container::after {
  content: "";
  display: table;
  clear: both;
}

</style> -->

<template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Accounts</h2>
      <div class="filters">
        <label>First Name:</label>
        <input type="text" v-model="filters.firstName" />
        <label>Last Name:</label>
        <input type="text" v-model="filters.lastName" />
        <label>Account Type:</label>
        <select v-model="filters.accountType">
          <option value="">All</option>
          <option value="SAVINGS">Saving</option>
          <option value="CURRENT">Current</option>
        </select>
        <label>User ID:</label>
        <input type="number" v-model="filters.user" />
        <button type="button" class="btn btn-primary" @click="applyFilters">
          Apply Filters
        </button>
        <button type="button" class="btn btn-secondary" @click="resetFilters">
          Reset Filters
        </button>
      </div>
      <button type="button" class="btn btn-primary mt-3"
        @click="this.$router.push({ path: '/users', query: { hasAccount: false } });">
        Add Accounts
      </button>
      <div class="row mt-3">
        <account-list-item v-for="account in filteredAccounts" :key="account.accountId" :account="account"
          @update="update" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import AdminPanel from "./../AdminPanel.vue";
import AccountListItem from "./AccountListItem.vue";

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
    applyFilters() {
      // Perform API request with filters
      axios
        .get("http://localhost:8080/accounts", {
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
