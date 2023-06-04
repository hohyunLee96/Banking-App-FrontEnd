<template>
    <section>
      <div class="admin-panel">
        <!-- Admin panel content -->
      </div>
  
      <div class="container">
        <div class="filter-bar mt-3">
          <label for="filter">Filter:</label>
          <select class="m-2" id="filter" v-model="filterParameter" @change="applyFilter">
            <option value="all">All</option>
            <option value="fromIban">From IBAN</option>
            <option value="toIban">To IBAN</option>
            <option value="amount">Amount</option>
            <option value="performingUser">Performing User</option>
          </select>
          <div v-if="filterParameter === 'fromIban' || filterParameter === 'toIban'">
            <input type="text" v-model="filterValue" placeholder="Enter IBAN" @input="applyFilter" />
          </div>
          <div v-else-if="filterParameter === 'amount'">
            <select class="m-2" v-model="amountFilterOption" @change="applyFilter">
              <option value="lessThan">Less Than</option>
              <option value="greaterThan">Greater Than</option>
              <option value="equalTo">Equal To</option>
            </select>
            <input type="number" v-model="filterValue" placeholder="Enter amount" @input="applyFilter" />
          </div>
          <div v-else-if="filterParameter === 'performingUser'">
            <select v-model="filterValue" @change="applyFilter">
              <option value="" disabled>Select User</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
            </select>
          </div>
        </div>
        <h2 class="mt-3 mt-lg-5">Transactions</h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createTransaction');">
          Create Transaction
        </button>
        <div class="mt-5" v-for="date in orderedTransactionDates" :key="date">
          <h3>{{ formatDate(date) }}</h3>
          <div class="row mt-3">
            <TransactionListItem
              v-for="transaction in filteredTransactions[date]"
              :key="transaction.transactionId"
              :transaction="transaction"
            />
          </div>
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
        filterParameter: "all",
        filterValue: "",
        amountFilterOption: "lessThan",
        users: [], // Holds the list of users
      };
    },
    mounted() {
      this.getAllTransactions();
      this.getAllUsers();
    },
    computed: {
      orderedTransactions() {
        const orderedTransactions = {};
        this.transactions.forEach((transaction) => {
          const date = new Date(transaction.timeStamp).toDateString();
          if (!orderedTransactions[date]) {
            orderedTransactions[date] = [];
          }
          orderedTransactions[date].push(transaction);
        });
        return orderedTransactions;
      },
      orderedTransactionDates() {
        return Object.keys(this.orderedTransactions).sort();
      },
      filteredTransactions() {
        if (this.filterParameter === "all") {
          return this.orderedTransactions;
        }
  
        const filtered = {};
        Object.keys(this.orderedTransactions).forEach((date) => {
          filtered[date] = this.orderedTransactions[date].filter((transaction) => {
            switch (this.filterParameter) {
              case "withoutAccount":
                return !transaction.toIban; // Example filter condition
              case "fromIban":
                return transaction.fromIban.includes(this.filterValue);
              case "toIban":
                return transaction.toIban.includes(this.filterValue);
              case "amount":
                return this.applyAmountFilter(transaction.amount);
              case "performingUser":
                return transaction.performingUserId === this.filterValue;
              default:
                return true;
            }
          });
        });
        return filtered;
      },
    },
    methods: {
      getAllTransactions() {
        const params = {};
        if (this.filterParameter !== "all") {
          params[this.filterParameter] = this.filterValue;
        }
  
        axios
          .get("transactions", { params })
          .then((result) => {
            console.log(result);
            this.transactions = result.data;
          })
          .catch((error) => console.log(error));
      },
      getAllUsers() {
        axios
          .get("users")
          .then((result) => {
            console.log(result);
            this.users = result.data;
          })
          .catch((error) => console.log(error));
      },
      formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
      applyFilter() {
        this.getAllTransactions();
      },
      applyAmountFilter(amount) {
        const filterValue = Number(this.filterValue);
        switch (this.amountFilterOption) {
          case "lessThan":
            return amount < filterValue;
          case "greaterThan":
            return amount > filterValue;
          case "equalTo":
            return amount === filterValue;
          default:
            return true;
        }
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
  