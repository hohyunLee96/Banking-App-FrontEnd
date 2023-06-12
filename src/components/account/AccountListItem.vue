<!-- <template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card bank-account-card h-100">
      <div class="card-body">
        <div class="account-details">
          <h4 class="account-title">{{ "Account Details" }}</h4>
          <p class="user-id">{{ "User ID: " + account.user }}</p>
          <p class="iban">{{ account.IBAN }}</p>
          <p class="account-type">{{ account.accountType }}</p>
          <p class="account-status" :class="{ 'text-success': account.isActive, 'text-danger': !account.isActive }">
            {{ "Account Status: " + (account.isActive ? 'Active' : 'Inactive') }}
          </p>
          <hr class="divider">
          <div class="balance-section">
            <p class="balance-label">Balance:</p>
            <p class="balance-amount">{{ account.balance }}</p>
          </div>
          <div class="limit-section">
            <p class="limit-label">Absolute Limit:</p>
            <p class="limit-amount">{{ account.absoluteLimit }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer" v-if="isUserRoleEmployee">
        <button class="btn btn-danger deactivate-btn" @click="deactivateAccount(account.accountId)"
          v-if="account.isActive">Deactivate</button>
        <button class="btn btn-success activate-btn" v-else-if="isUserRoleEmployee"
          @click="activateAccount(account.accountId)">Activate</button>
        <button class="btn btn-primary modify-limit-btn" v-if="isUserRoleEmployee" @click="openModifyLimitDialog">Modify
          Limit</button>
      </div>
      <div class="modify-limit-dialog" v-if="isModifyLimitDialogOpen">
      <label for="new-limit-input">New Limit:</label>
      <input type="number" id="new-limit-input" v-model="newLimit">
      <div>
        <button class="btn btn-primary" @click="modifyLimit">Save</button>
        <button class="btn btn-secondary" @click="cancelModifyLimit">Cancel</button>
      </div>
    </div>
    </div>
  </div>
</template> -->
<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card bank-account-card h-100">
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
        <button class="btn btn-danger deactivate-btn" @click="deactivateAccount(account.accountId)"
          v-if="account.isActive">Deactivate</button>
        <button class="btn btn-success activate-btn" v-else-if="isUserRoleEmployee"
          @click="activateAccount(account.accountId)">Activate</button>
        <button class="btn btn-primary modify-limit-btn" v-if="isUserRoleEmployee" @click="openModifyLimitDialog">Modify
          Limit</button>
      </div>
      <div class="modify-limit-dialog" v-if="isModifyLimitDialogOpen">
        <label for="new-limit-input">New Limit:</label>
        <input type="number" id="new-limit-input" v-model="newLimit">
        <div>
          <button class="btn btn-primary" @click="modifyLimit">Save</button>
          <button class="btn btn-secondary" @click="cancelModifyLimit">Cancel</button>
        </div>
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
    deactivateAccount(id) {
      const requestData = { isActive: false, absoluteLimit: this.account.absoluteLimit };

      axios
        .put("accounts/" + id, requestData)
        .then((result) => {
          console.log(result);
          this.account.isActive = false;
          this.$emit('update');
        })
        .catch((error) => console.log(error));
    },
    activateAccount(id) {
      const requestData = { isActive: true, absoluteLimit: this.account.absoluteLimit };

      axios
        .put("accounts/" + id, requestData)
        .then((result) => {
          console.log(result);
          this.account.isActive = true;
          this.$emit('update');
        })
        .catch((error) => console.log(error));
    },
    openModifyLimitDialog() {
      // Reset the new limit value
      this.newLimit = null;
      // Open the dialog
      this.isModifyLimitDialogOpen = true;
    },
    modifyLimit() {
      const { accountId } = this.account;
      const requestData = { absoluteLimit: this.newLimit };
      axios
        .put(`accounts/${accountId}`, requestData)
        .then((result) => {
          console.log(result);
          // Update the account's absoluteLimit
          this.account.absoluteLimit = this.newLimit;
          // Close the dialog
          this.isModifyLimitDialogOpen = false;
        })
        .catch((error) => console.log(error));
    },
    cancelModifyLimit() {
      // Close the dialog without modifying the limit
      this.isModifyLimitDialogOpen = false;
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
