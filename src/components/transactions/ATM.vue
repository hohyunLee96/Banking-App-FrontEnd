<template>
    <div class="container mt-5">
      <h1 class="text-center">ATM Interface</h1>
      <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
      <div class="card p-4">
        <div v-for="account in accounts" :key="account.IBAN">
          <h4>{{ account.accountType }} Account Balance: € {{ account.balance }}</h4>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <label for="accountSelect">Select Account:</label>
          <select id="accountSelect" class="form-select" v-model="selectedAccount">
            <option v-for="account in accounts" :value="account.IBAN" :key="account.IBAN">
              ({{ account.accountType }}) {{ account.IBAN }}
            </option>
          </select>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <label for="amountInput">Amount:</label>
          <div class="input-group">
            <input type="number" class="form-control" id="amountInput" v-model="amount" step="0.01" min="0" required>
            <span class="input-group-text">€</span>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <button class="btn btn-primary m-4 btn-deposit" @click="deposit()">Deposit</button>
          <button class="btn btn-primary m-4 btn-withdraw" @click="withdraw()">Withdraw</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "../../axios-auth";
  import { useUserSessionStore } from "@/stores/usersession";
  
  export default {
    data() {
      return {
        selectedAccount: "",
        accounts: [],
        errorMessage: "",
        amount: 0,
      };
    },
    mounted() {
      this.getAccountDetails();
    },
    methods: {
      getAccountDetails() {
        axios
          .get("accounts")
          .then((response) => {
            this.accounts = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      deposit() {
        const requestBody = {
          toIban: this.selectedAccount,
          amount: this.amount,
        };
        this.sendTransaction("/transactions/deposit", requestBody);
      },
      withdraw() {
        const requestBody = {
          fromIban: this.selectedAccount,
          amount: this.amount,
        };
        this.sendTransaction("/transactions/withdraw", requestBody);
      },
      sendTransaction(url, requestBody) {
        axios
          .post(url, requestBody)
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
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .card {
    background-color: #f8f9fa;
    border: none;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border-color: #f5c6cb;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .btn-deposit {
    background-color: #198754;
    border-color: #198754;
  }
  
  .btn-deposit:hover {
    background-color: #157347;
    border-color: #157347;
  }
  
  .btn-withdraw {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-withdraw:hover {
    background-color: #b02a37;
    border-color: #b02a37;
  }
  
  input[type="number"] {
    border-radius: 0;
  }
  
  .input-group-text {
    border-radius: 0;
  }
  
  label {
    font-weight: bold;
  }
  
  h1 {
    color: #343a40;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  </style>
  