<template>
    <div class="container mt-5">
        <h1>ATM Interface</h1>
        <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
        <div class="card">
            <h4 v-for="account in accounts"> {{ account.accountType }} account balance: € {{ account.balance }}</h4>


        </div>
        <div class="row">
            <div class="col-md-6">
                <label for="accountSelect">Select Account:</label>
                <select id="accountSelect" class="form-select" v-model="selectedAccount">
                    <option v-for=" account in accounts" value="{{ account.IBAN }}"> ({{ account.accountType }}) {{
                        account.IBAN }}</option>
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
                <button class="btn btn-primary m-4" @click="sendTransaction('deposit')">Deposit</button>
                <button class="btn btn-primary m-4" @click="sendTransaction('withdraw')">Withdraw</button>
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
            type: 1,
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
                        this.errorMessage = error.response;
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
  
<style>
/* Custom styles can be added here */
</style>
  