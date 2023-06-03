<template>
    <section>
      <div class="admin-panel">
        <AdminPanel />
      </div>
      <div class="container">
        <h2 class="mt-3 mt-lg-5">Transasctions
        </h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createTransaction');">
          Create Transaction
        </button>
        <div class="row mt-3">
          <account-list-item
            v-for="transaction in transactions"
            :key="transaction.transactionId"
            :transaction="transaction"
          />
        </div>
      </div>
    </section>
  </template>
    
<script>
import axios from '../../axios-auth'

export default {
    name: "TransactionListItem",
    props: {
        transaction: Object,
    },
    mounted() {
      this.getAllTransactions();
    },
    methods: {
      getAllTransactions() {
        axios
          .get("http://localhost:8080/transactions")
          .then((result) => {
            console.log(result);
            this.transaction = result.data;
          })
          .catch((error) => console.log(error));
      },
    },
  };
  
</script>
  
<style></style>