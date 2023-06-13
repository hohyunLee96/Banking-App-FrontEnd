<template lang="">
    <form ref="form">
      <section class="h-100 bg-light">
        <div class="container py-5 h-100">
          <h1>Send transfer</h1>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card card-registration my-5">
                <div class="row g-0">
                  <div class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      <h3 class="mb-5 text-uppercase">New Transaction</h3>
                      <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
                      <div class="row">
                        <div class="form-outline mb-4">
                          <div class="form-outline">
                            <input type="text" id="firstnameInput" v-model="fromIban" class="form-control form-control-lg" name="toIban" required placeholder="Enter sender IBAN" />
                            <label class="form-label" for="firstnameInput"> Sender </label>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-outline mb-4">
                            <div class="form-outline">
                              <input type="text" id="toIban" v-model="toIban" class="form-control form-control-lg" name="toIban" required placeholder="Enter recipient IBAN" />
                              <label class="form-label" for="lastNameInput">Recipient </label>
                            </div>
                          </div>
                        </div>
                        <div class="form-outline mb-4">
                          <input type="number" id="amount" v-model="amount" class="form-control form-control-lg" name="amount" required placeholder="Enter amount" />
                          <label class="form-label" for="postcodeInput">Amount</label>
                        </div>
                      </div>
  
                      <div class="d-flex justify-content-end pt-3">
                        <a type="button" class="btn btn-light btn-lg" @click="goBack()">Cancel</a>
                        <a name="registerBtn" type="submit" class="btn btn-warning btn-lg ms-2" @click="sendTransaction()">Send</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div v-if="hasSavingsAccount">
                <h2>Savings account balance: {{ savingsAccountBalance }}</h2>
              </div>
              <div v-if="hasCurrentAccount">
                <h2>Current account balance: {{ currentAccountBalance }}</h2>
              </div>
              <h3>Transaction Limit: {{ transactionLimit }}</h3>
              <h3>Daily Limit: {{ dailyLimit }}</h3>
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
    methods: {
      sendTransaction() {
        axios
          .post("http://localhost:8080/transactions", {
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
      goBack() {
        this.$router.push("/transactions");
      },
      getAccountDetails() {
        axios
          .get("http://localhost:8080/accounts?user=" + this.loggedInUserId)
          .then((response) => {
            this.accounts = response.data;
            this.calculateSummary();
            console.log(response.data.dailyLimit);
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
  },
};
</script>
  
<style lang=""></style>
  