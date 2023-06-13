<template>
  <form ref="form">
    <section class="h-100 bg-light">
      <div class="container py-5 h-100">
        <h1 class="text-center mb-5">Send Transfer</h1>
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-lg-6">
            <div class="card card-registration my-5 shadow">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-uppercase text-center">New Transaction</h3>
                <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
                <div class="mb-4">
                  <label for="accountSelect" class="form-label">Select Account:</label>
                  <select id="accountSelect" class="form-select" v-model="fromIban">
                    <option v-for="account in accounts" :value="account.IBAN" :key="account.IBAN">
                      ({{ account.accountType }}) {{ account.IBAN }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="toIban" class="form-label">Recipient:</label>
                  <input type="text" id="toIban" v-model="toIban" class="form-control form-control-lg" name="toIban"
                    required placeholder="Enter recipient IBAN" />
                </div>
                <div class="mb-4">
                  <label for="amount" class="form-label">Amount:</label>
                  <input type="number" id="amount" v-model="amount" class="form-control form-control-lg" name="amount"
                    required placeholder="Enter amount" />
                </div>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-light btn-lg me-2" @click="goBack()">Cancel</button>
                  <button name="registerBtn" type="submit" class="btn btn-warning btn-lg"
                    @click="sendTransaction()">Send</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div v-if="hasSavingsAccount || hasCurrentAccount" class="card card-summary mb-3 shadow">
              <div class="card-body p-md-4">
                <h4 class="mb-4">Account Summary</h4>
                <div v-for="account in accounts" :key="account.IBAN">
                  <p><strong>{{ account.accountType }} Account Balance: € {{ account.balance }}</strong> </p>
                </div>
                <p><strong>Transaction Limit:</strong>€  {{ this.store.getUser.transactionLimit }}</p>
                <p><strong>Daily Limit:</strong> € {{ this.store.getUser.dailyLimit }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<script>
import axios from "../../axios-auth";
import { useUserSessionStore } from '@/stores/usersession';

export default {
  name: "NewTransaction",
  data() {
    return {
      fromIban: "",
      toIban: "",
      type: 0,
      amount: "",
      user: null,
      errorMessage: "",
      loggedInUserId: useUserSessionStore().getUserId,
      accounts: [],
      hasSavingsAccount: false,
      hasCurrentAccount: false,
      savingsAccountBalance: 0,
      currentAccountBalance: 0,
      transactionLimit: 0,
      dailyLimit: 0,
    };
  },
  setup() {
    const store = useUserSessionStore();
    return { store };
  },
  methods: {
    sendTransaction() {
      axios
        .post("transactions", {
          transactionId: this.transactionId,
          fromIban: this.fromIban,
          toIban: this.toIban,
          type: this.type,
          amount: this.amount,
        })
        .then((response) => {
          alert("Transaction sent!");
          console.log(response);
          this.$router.push("/transactions");
        })
        .catch((error) => {
          if (error) {
            this.errorMessage = error.response.data.message;
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 8000);
          console.log(error);
        });
    },
    getUserAccounts() {
      axios
        .get("accounts?accounttype=SAVINGS")
        .then((response) => {
          this.accounts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.push("/transactions");
    },
    getAccountDetails() {
      axios
        .get("http://localhost:8080/accounts?user=" + this.loggedInUserId)
        .then((response) => {
          this.accounts = response.data;
          this.calculateSummary();
          console.log(response.data);
         
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calculateSummary() {
      let hasSavingsAccount = false;
      let hasCurrentAccount = false;

      for (const account of this.accounts) {
        if (account.accountType === "SAVINGS") {
          hasSavingsAccount = true;
        } else if (account.accountType === "CURRENT") {
          hasCurrentAccount = true;
        }
      }

      this.hasSavingsAccount = hasSavingsAccount;
      this.hasCurrentAccount = hasCurrentAccount;

      this.totalBalance = this.accounts.reduce(
        (total, account) => total + account.balance,
        0
      );
      this.transactionLimit = this.accounts[0].user.transactionLimit;
      this.dailyLimit = this.accounts[0].user.dailyLimit;
    },
  },
    mounted() {
    this.getAccountDetails();
  },
};
</script>

<style scoped>
h1,
h3,
h4 {
  font-weight: 600;
}

.card-registration {
  border: none;
  border-radius: 10px;
}

.card-summary {
  border: none;
  border-radius: 10px;
  background-color: #f8f9fa;
}

.alert-danger {
  border-radius: 10px;
}

.btn-light {
  background-color: #f8f9fa;
  color: #6c757d;
  border-color: #6c757d;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
  border-color: #ffc107;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #6c757d;
  border-color: #6c757d;
}

.btn-warning:hover {
  background-color: #e0a800;
  color: #212529;
  border-color: #e0a800;
}

@media (max-width: 768px) {
  .card-registration {
    margin-top: 20px;
  }
}</style>
