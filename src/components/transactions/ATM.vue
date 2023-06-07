<template>
    <div class="container mt-5">
        <h1>ATM Interface</h1>
        <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
        <div class="card">
            <h4 v-for="account in accounts"> {{ account.accountType }} account balance: € {{account.balance }}</h4>
             

            </div>
        <div class="row">
            <div class="col-md-6">
                <label for="accountSelect">Select Account:</label>
                <select id="accountSelect" class="form-select" v-model="selectedAccount">
                 <option v-for=" account in accounts" value="{{ account.IBAN }}"> ({{ account.accountType }}) {{ account.IBAN }}</option>
                </select>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-6">
                <label for="amountInput">Amount:</label>
                <div class="input-group">
                    <input type="number" class="form-control" id="amountInput" v-model="amount" step="0.01" min="0"
                        required>
                    <span class="input-group-text">€</span>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-6">
                <button class="btn btn-primary m-4" @click="deposit">Deposit</button>
                <button class="btn btn-primary m-4" @click="withdraw">Withdraw</button>
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
            amount: 0,
            accounts: [],
            loggedInUserId: useUserSessionStore().getUserId,
            errorMessage: "",
            //tra
            fromIban: "",
            toIban: "",
            type: 0,
            amount: "",
            performingUser: useUserSessionStore().getUserId,
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
            // Logic for deposit functionality
        },
        withdraw() {
            // Logic for withdrawal functionality
        },
        sendTransaction(type) {
            axios
                .post("http://localhost:8080/transactions", {
                    fromIban: this.fromIban,
                    toIban: this.toIban,
                    type: type,
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

        }
    },
};
</script>
  
<style>
/* Custom styles can be added here */
</style>
  