<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card bank-account-card h-100">
      <div class="alert alert-danger" v-if="errorMessage.length > 0">{{ errorMessage }}</div>
      <div class="card-body">
        <div class="account-details">
          <h4 class="account-title">{{ "Account Details" }}</h4>
          <p class="user-id">{{ "User ID: " + account.user }}</p>
          <p class="user-id">{{ "First Name: " + account.firstName }}</p>
          <p class="user-id">{{ "Last Name: " + account.lastName }}</p>
          <p class="iban">{{ account.IBAN }}</p>
          <p class="account-type">{{ account.accountType }}</p>
          <p class="account-status" :class="{ 'text-success': account.isActive, 'text-danger': !account.isActive }">
            {{ "Account Status: " + (account.isActive ? 'Active' : 'Inactive') }}
          </p>
          <hr class="divider">
          <div class="balance-section">
            <p class="balance-label">Balance:</p>
            <p class="balance-amount">€{{ account.balance.toFixed(2) }}</p>
          </div>
          <div class="limit-section">
            <p class="limit-label">Absolute Limit:</p>
            <p class="limit-amount">€{{ account.absoluteLimit.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer" v-if="isUserRoleEmployee">
        <button class="btn btn-edit" @click="editAccount(account.accountId)">Edit</button>
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
  data() {
    return {
      isModifyLimitDialogOpen: false,
      newLimit: null,
      errorMessage: ""
    };
  },
  computed: {
    isUserRoleEmployee() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.auth === "ROLE_EMPLOYEE";
      }
      return false;
    },
  },
  methods: {
    editAccount(id) {
      this.$router.push('/editAccount/' + id);
    },
  }
};
</script>

<style scoped>
.bank-account-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.account-details {
  padding: 20px;
}

.account-title {
  margin-top: 0;
}

.user-id {
  font-weight: bold;
  margin-bottom: 5px;
}

.iban {
  font-size: 14px;
  margin-bottom: 5px;
}

.account-type {
  font-size: 14px;
  margin-bottom: 5px;
}

.account-status {
  font-size: 14px;
}

.balance-section,
.limit-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.balance-label,
.limit-label {
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
}

.balance-amount,
.limit-amount {
  font-size: 16px;
  font-weight: bold;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.deactivate-btn {
  width: 40%;
}

.modify-limit-dialog {
  margin-top: 20px;
}

.modify-limit-dialog label {
  display: block;
  margin-bottom: 5px;
}

.modify-limit-dialog input {
  margin-bottom: 10px;
}

@media (max-width: 576px) {
  .bank-account-card {
    margin-bottom: 15px;
  }
}
</style>
