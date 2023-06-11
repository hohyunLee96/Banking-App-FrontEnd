<template>
  <section>
    <div style="width: 100%; display: flex;" id="admin-panel">
      <div class="admin-panel" style="flex-grow: 0; margin-top: 26px;">
        <AdminPanel />
      </div>
      <div style="flex-grow: 1;" id="users-view">
        <h2 class="">Users</h2>
        <div style="display: flex; flex-direction: row; background-color: lightgrey; width: 100%;" id="filter-menu">
          <div class="input-group mb-3" style="width: 100%; margin-top: 20px; margin-left: 20px; margin-right: 20px;">
            <input id="search" type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon2"
              v-model="filterValues.keyword" @input="applyFilter">
          </div>
          <div class="input-group mb-3" style="width: 100%; margin-top: 20px;">
            <input id="date-search" type="date" class="form-control" placeholder="" aria-describedby="basic-addon2"
              v-model="filterValues.birthDate" @input="applyFilter" ref="dateInput">
          </div>
          <div class="filter-bar mt-3" style="margin-right: 20px;">
            <label for="filter">Filter: &nbsp;</label>
            <select id="filter" v-model="filterOption" @change="applyFilter">
              <option value="all">All Users</option>
              <option value="withoutAccount">Without Account</option>
              <option value="withoutSavingsAccount">Without Savings Account</option>
              <option value="withoutCurrentAccount">Without Current Account</option>
            </select>
          </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createuser');">
          Add User
        </button>
        <div class="row mt-3" id="users-list" style="margin-left: 10px; margin-right: 10px;">
          <user-list-item v-for="user in filteredUsers" :key="user.id" :user="user" :filter-option="filterOption"
            @update="update" />
        </div>
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
      filterValues: {
        keyword: "",
        birthDate: "",
      },
    };
  },
  mounted() {
    this.update();
    const dateInput = this.$refs.dateInput;
    dateInput.addEventListener('input', this.handleDateInput);
  },
  computed: {
    filteredUsers() {
      return this.users;
    },
  },
  methods: {
    formatDate(dateString) {
      const format = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    update() {
      const params = {};
      Object.keys(this.filterValues).forEach((param) => {
        if (this.filterValues[param] !== "") {
          if (param === "birthDate") {
            const date = new Date(this.filterValues[param]);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            params[param] = formattedDate;
          } else {
            params[param] = this.filterValues[param];
          }
        }
      });

      if (this.filterOption === "withoutAccount") {
        params.hasAccount = false;
        params.userType = "ROLE_USER";
      } else if (this.filterOption === "withoutSavingsAccount") {
        params.excludedAccountType = "SAVINGS";
        params.userType = "ROLE_CUSTOMER";
      } else if (this.filterOption === "withoutCurrentAccount") {
        params.excludedAccountType = "CURRENT";
        params.userType = "ROLE_CUSTOMER";
      }

      axios
        .get("users", { params })
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },
    handleDateInput() {
      this.filterValues.birthDate = this.$refs.dateInput.value;
      this.update();
    },
    applyFilter() {
      this.update();
    },
  },
};
</script>


