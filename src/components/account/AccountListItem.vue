<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      <div class="card-body">
        <div class="float-start">
          <p>{{ "user ID " + account.user }}</p>
          <!-- <p>{{ account.user.firstName + " " + account.user.lastName}}</p> -->
          <p>
            {{ account.IBAN }}
          </p>
          <p>
            <small>{{ account.accountType }}</small>
          </p>
          <p>
            <small :class="{ 'text-success': account.isActive, 'text-danger': !account.isActive }">
              {{ "activation " + account.isActive }}
            </small>
          </p>
        </div>
        <span class="price float-end">{{ account.absoluteLimit }}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-danger" @click="deactivateAccount(account.accountId)" v-if="isUserRoleEmployee">Deactivate</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import jwtDecode from "jwt-decode";

export default {
  name: "AccountListItem",
  props: {
    account: Object
  },
  computed: {
    userRole() {
      const token = localStorage.getItem('jwt'); // Retrieve the token from localStorage
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.auth; // Assuming the user role is stored as "auth" in the JWT payload
      }
      return null;
    },
    isUserRoleEmployee() {
      return this.userRole === "ROLE_EMPLOYEE" || this.userRole === "EMPLOYEE";
    }
  },
  methods: {
    deactivateAccount(id) {
      axios
        .put("accounts/" + id, { isActive: false })
        .then((result) => {
          console.log(result);
          this.account.isActive = false;
          this.$emit('update');
        })
        .catch((error) => console.log(error));
    },
  }
};
</script>
