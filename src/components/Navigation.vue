<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid" v-if="store.isAuthenticated">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item" v-if="store.isAuthenticated">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li class="nav-item" v-if="isUserRoleEmployee()">
          <router-link to="/users" class="nav-link" active-class="active">
            <i class="fas fa-cogs"></i> Users
          </router-link>
        </li>
        <li class="nav-item" v-if="store.isAuthenticated">
          <router-link to="/transactions" class="nav-link" active-class="active">
            <i class="fas fa-exchange-alt"></i> Transactions
          </router-link>
        </li>
        <li class="nav-item" v-if="store.isAuthenticated">
          <router-link to="/myaccount" class="nav-link" active-class="active">
            <i class="fas fa-user"></i> My Account
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/atm"  v-if="!isUserRoleEmployee()" class="nav-link" active-class="active">
            <i class="fas fa-money-bill"></i> ATM
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item" v-if="!store.isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">
            <i class="fas fa-sign-in-alt"></i> Login
          </router-link>
        </li>
      </ul>

    </div>
    <button v-if="store.isAuthenticated" class="btn btn-dark btn-lg px-5" @click="logout()" type="button">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
  </nav>
</template>

<script>
import { useUserSessionStore } from "@/stores/usersession";
import jwtDecode from "jwt-decode";

export default {
  name: "Navigation",

  setup() {
    const store = useUserSessionStore();
    // const isEmployee = store.getUser.userType !== "ROLE_EMPLOYEE";
    const isEmployee = store.getUser.userType;

    return {
      store,
      isEmployee,
    };
  },

  methods: {
    isUserRoleEmployee() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.auth === "ROLE_EMPLOYEE";
      }
      return false;
    },
    logout() {
      this.store.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Styles remain the same */
</style>
