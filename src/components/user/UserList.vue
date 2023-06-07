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
        <user-list-item v-for="user in filteredUsers" :key="user.id" :user="user" @update="update" />
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
      axios
        .get("users")
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },
    applyFilter() {
      const params = {
        hasAccount: this.filterOption === "withoutAccount" ? false : undefined,
        excludedAccountType:
          this.filterOption === "withoutSavingsAccount" ? "SAVINGS" :
            this.filterOption === "withoutCurrentAccount" ? "CURRENT" : undefined,
      };
      axios
        .get("users", { params })
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

