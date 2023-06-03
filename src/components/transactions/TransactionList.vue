<template>
    <section>
      <div class="admin-panel">
        <!-- Admin panel content -->
      </div>
      <div class="container">
        <h2 class="mt-3 mt-lg-5">Transactions</h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createTransaction');">
          Create Transaction
        </button>
        <div class="row mt-3">
          <TransactionListItem
            v-for="transaction in transactions"
            :key="transaction.transactionId"
            :transaction="transaction"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from '../../axios-auth';
  import TransactionListItem from "./TransactionListItem.vue";
  
  export default {
    name: "TransactionList",
    components: {
      TransactionListItem,
    },
    data() {
      return {
        transactions: [],
      };
    },
    mounted() {
      this.getAllTransactions();
    },
    methods: {
      getAllTransactions() {
        axios
          .get("transactions")
          .then((result) => {
            console.log(result);
            this.transactions = result.data;
          })
          .catch((error) => console.log(error));
      },
    },
  };
  </script>
  
  <style>
  .admin-panel {
    width: 200px;
    float: left;
  }
  
  .container {
    margin-left: 200px;
  }
  
  .container::after {
    content: "";
    display: table;
    clear: both;
  }
  </style>
  