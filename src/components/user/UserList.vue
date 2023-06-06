<template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Users</h2>
      <div class="input-group mb-3" style="width: 80%; margin-top: 20px;">
        <input id="search" type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon2" @input="applyFilter">
      </div>
      <div class="input-group mb-3" style="width: 80%; margin-top: 20px;">
        <input id="date-search" type="date" class="form-control" placeholder="" aria-describedby="basic-addon2" @input="applyFilter" ref="dateInput">
      </div>
      <div class="filter-bar mt-3">
        <label for="filter">Filter: &nbsp;</label>
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
import axios from "axios";
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
      searchKeyword: "",
      birthDate: "",
    };
  },
  mounted() {
    this.update();
    
    const hasAccountParam = this.$route.query.hasAccount;
    if (hasAccountParam === "false") {
      this.filterOption = "withoutAccount";
    }

    const dateInput = this.$refs.dateInput;
    dateInput.addEventListener('input', this.handleDateInput);
  },
  computed: {
    filteredUsers() {
      if (this.filterOption === "all") {
        return this.users;
      } 
      else if (this.filterOption === "withoutAccount") {
        return this.users.filter(user => !user.hasAccount);
      }
    },
  },
  methods: {

    handleDateInput(event) {
    if (!event.target.value) {
      if (this.filterOption === "all") {
        this.$router.replace({ query: { keyword: this.searchKeyword} });
      }
      else if (this.filterOption === "withoutAccount") {
        this.$router.replace({ query: { keyword: this.searchKeyword, hasAccount: false } });
      }
      this.update();
    }},

    update() {
      axios
        .get("http://localhost:8080/users")
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },

    applyFilter() {
      this.searchKeyword = document.getElementById('search').value;
      this.birthDate = document.getElementById('date-search').value;

      if (this.filterOption === "all") {
        this.$router.replace({ query: { keyword: this.searchKeyword, birthDate: this.birthDate } });
      }
      else if (this.filterOption === "withoutAccount") {
        this.$router.replace({ query: { keyword: this.searchKeyword, birthDate: this.birthDate, hasAccount: false } });
      }
      this.update();
    },
  },
};

</script>

<style>
</style>
