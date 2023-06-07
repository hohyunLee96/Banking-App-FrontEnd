<!-- <template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Users</h2>
      <div class="filter-bar mt-3">
        <label for="filter">Filter:</label>
        <select id="filter" v-model="filterOption" @change="applyFilter">
          <option value="all">All Users</option>
          <option value="withoutAccount">Without Account</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createuser');">
        Add User
      </button>
      <div class="row mt-3">
        <user-list-item
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          @update="update"
        />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import AdminPanel from "./../AdminPanel.vue";
import UserListItem from "./UserListItem.vue";

export default {
  name: "UserList",
  components: {
    AdminPanel,
    UserListItem,
  },
  data() {
    return {
      users: [],
      filterOption: "all",
    };
  },
  mounted() {
    this.update();
    // Check the query parameter on initial load
    const hasAccountParam = this.$route.query.hasAccount;
    if (hasAccountParam === "false") {
      this.filterOption = "withoutAccount";
    }
  },
  computed: {
    filteredUsers() {
      if (this.filterOption === "all") {
        return this.users;
      } else if (this.filterOption === "withoutAccount") {
        return this.users.filter(user => !user.hasAccount);
      }
    },
  },
  methods: {
    update() {
      axios
        .get("users")
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },
    applyFilter() {
      if (this.filterOption === "all") {
        // Remove the query parameter from the URL
        this.$router.replace({ query: null });
      } else if (this.filterOption === "withoutAccount") {
        // Set the query parameter to filter users without an account
        this.$router.replace({ query: { hasAccount: false } });
      }
      // Call the update method to fetch the latest data from the server
      this.update();
    },
  },
};
</script>

<style>
</style> -->
<template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Users</h2>
      <div class="filter-bar mt-3">
        <label for="filter">Filter:</label>
        <select id="filter" v-model="filterOption" @change="applyFilter">
          <option value="all">All Users</option>
          <option value="withoutAccount">Without Account</option>
          <option value="withoutSavingsAccount">Without Savings Account</option>
          <option value="withoutCurrentAccount">Without Current Account</option>
        </select>
      </div>
      <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createuser');">
        Add User
      </button>
      <div class="row mt-3">
        <user-list-item
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          @update="update"
        />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import AdminPanel from "./../AdminPanel.vue";
import UserListItem from "./UserListItem.vue";

export default {
  name: "UserList",
  components: {
    AdminPanel,
    UserListItem,
  },
  data() {
    return {
      users: [],
      filterOption: "all",
      baseUrl: "/users",
    };
  },
  mounted() {
    this.update();
  },
  computed: {
    filteredUsers() {
      return this.users;
    },
  },
  methods: {
    update() {
      let url = this.baseUrl;

      if (this.filterOption === "withoutAccount") {
        url += "?hasAccount=false";
      } else if (this.filterOption === "withoutSavingsAccount") {
        url += "?excludedAccountType=SAVINGS";
      } else if (this.filterOption === "withoutCurrentAccount") {
        url += "?excludedAccountType=CURRENT";
      }

      axios
        .get(url)
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },
    applyFilter() {
      if (this.filterOption === "all") {
        this.$router.replace({ query: null });
      } else if (this.filterOption === "withoutAccount") {
        this.$router.replace({ query: { excludedAccountType: "withoutAccount" } });
      } else if (this.filterOption === "withoutSavingsAccount") {
        this.$router.replace({ query: { excludedAccountType: "SAVINGS" } });
      } else if (this.filterOption === "withoutCurrentAccount") {
        this.$router.replace({ query: { excludedAccountType: "CURRENT" } });
      }
      this.update();
    },
  },
};
</script>

