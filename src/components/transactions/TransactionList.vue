<template>
  <section>
    <div class="admin-panel">
      <!-- Admin panel content -->
    </div>

    <div class="container">
      <h3 class="filter-heading">Filter</h3>
      <div class="filter-bar mt-3">
        <div class="filter-group" v-for="param in filterParameters" :key="param">
          <label :for="param" class="filter-label">{{ getParamLabel(param) }}</label>
          <template v-if="param === 'fromIban' || param === 'toIban'">
            <input type="text" v-model="filterValues[param]" :placeholder="getParamPlaceholder(param)"
              @input="applyFilter" class="filter-input" />
          </template>
          <template v-else-if="param === 'amount'">
            <select class="filter-select" v-model="amountFilterOptions[param]" @change="updateAmountFilter">
              <option value="lessThanAmount">Less Than</option>
              <option value="greaterThanAmount">Greater Than</option>
              <option value="equalToAmount">Equal To</option>
            </select>
            <input type="number" v-model="filterValues[param]" :placeholder="getParamPlaceholder(param)"
              @input="applyFilter" class="filter-input" />
          </template>
          <template v-else-if="param === 'performingUser'">
            <select v-model="filterValues[param]" @change="applyFilter" class="filter-select">
              <option value="" disabled>Select User</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
            </select>
          </template>
          <template v-else-if="param === 'hasDateEqualTo' || param === 'hasDateLessThan' || param === 'hasDateGreaterThan'">
            <input type="datetime-local" v-model="filterValues[param]" :placeholder="getParamPlaceholder(param)"
              @input="applyFilter" class="filter-input" />
          </template>
        </div>
      </div>
      <h2 class="transaction-heading">Transactions</h2>
      <button type="button" class="btn btn-primary create-transaction-btn" @click="this.$router.push('/createTransaction');">
        Create Transaction
      </button>
      <div class="transaction-group" v-for="date in orderedTransactionDates" :key="date">
        <h3 class="transaction-date">{{ formatDate(date) }}</h3>
        <div class="row mt-3">
          <TransactionListItem v-for="transaction in filteredTransactions[date]" :key="transaction.transactionId"
            :transaction="transaction" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import TransactionListItem from "./TransactionListItem.vue";
import { useUserSessionStore } from '@/stores/usersession';

export default {
  name: "TransactionList",
  components: {
    TransactionListItem,
  },
  data() {
    return {
      transactions: [],
      filterParameter: "all",
      filterParameters: ["fromIban", "toIban", "amount", "performingUser", "hasDateEqualTo", "hasDateLessThan", "hasDateGreaterThan"],
      filterValues: {
        fromIban: "",
        toIban: "",
        amount: "",
        performingUser: "",
        hasDateEqualTo: "",
        hasDateLessThan: "",
        hasDateGreaterThan: "",
        transactionId: "",
        type: "",
      },
      amountFilterOptions: {
        amount: "lessThanAmount",
      },
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
          return this.filterParameters.every((param) => {
            switch (param) {
              case "fromIban":
                return transaction.fromIban.includes(this.filterValues[param]);
              case "toIban":
                return transaction.toIban.includes(this.filterValues[param]);
              case "amount":
                return this.applyAmountFilter(transaction.amount, this.filterValues[param]);
              case "performingUser":
                return transaction.performingUserId === this.filterValues[param];
              case "hasDateEqualTo":
                return this.hasDateEqualTo(transaction.timeStamp, this.filterValues[param]);
              case "hasDateLessThan":
                return this.hasDateLessThan(transaction.timeStamp, this.filterValues[param]);
              case "hasDateGreaterThan":
                return this.hasDateGreaterThan(transaction.timeStamp, this.filterValues[param]);
              default:
                return true;
            }
          });
        });
      });
      return filtered;
    },
  },
  methods: {
    getAllTransactions() {
      const params = {};
      Object.keys(this.filterValues).forEach((param) => {
        if (this.filterValues[param] !== "") {
          params[param] = this.filterValues[param];
        }
      });

      if (this.filterParameter !== "all") {
        params[this.filterParameter] = params.amount;
        delete params.amount;
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
    applyAmountFilter(amount, filterValue) {
      const numericFilterValue = Number(filterValue);
      switch (this.amountFilterOptions.amount) {
        case "lessThanAmount":
          return amount < numericFilterValue;
        case "greaterThanAmount":
          return amount > numericFilterValue;
        case "equalToAmount":
          return amount === numericFilterValue;
        default:
          return true;
      }
    },
    hasDateEqualTo(transactionDate, filterValue) {
      const filterDate = new Date(filterValue);
      const transactionDateObj = new Date(transactionDate);
      return transactionDateObj.getTime() === filterDate.getTime();
    },
    hasDateLessThan(transactionDate, filterValue) {
      const filterDate = new Date(filterValue);
      const transactionDateObj = new Date(transactionDate);
      return transactionDateObj.getTime() < filterDate.getTime();
    },
    hasDateGreaterThan(transactionDate, filterValue) {
      const filterDate = new Date(filterValue);
      const transactionDateObj = new Date(transactionDate);
      return transactionDateObj.getTime() > filterDate.getTime();
    },
    updateAmountFilter() {
      const selectedOption = this.amountFilterOptions.amount;
      switch (selectedOption) {
        case "lessThanAmount":
          this.filterParameter = "lessThanAmount";
          break;
        case "greaterThanAmount":
          this.filterParameter = "greaterThanAmount";
          break;
        case "equalToAmount":
          this.filterParameter = "equalToAmount";
          break;
        default:
          this.filterParameter = "all";
          break;
      }
      this.applyFilter();
    },
    getParamPlaceholder(param) {
      switch (param) {
        case "fromIban":
        case "toIban":
          return "Enter IBAN";
        case "amount":
          return "Enter amount";
        case "hasDateEqualTo":
        case "hasDateLessThan":
        case "hasDateGreaterThan":
          return "Select date";
        default:
          return "";
      }
    },
    getParamLabel(param) {
      switch (param) {
        case "fromIban":
          return "From IBAN:";
        case "toIban":
          return "To IBAN:";
        case "amount":
          return "Amount:";
        case "performingUser":
          return "Performing User:";
        case "hasDateEqualTo":
          return "Date Equal To:";
        case "hasDateLessThan":
          return "Date Less Than:";
        case "hasDateGreaterThan":
          return "Date Greater Than:";
        default:
          return "";
      }
    },
  },
};
</script>

<style>
/* Existing styles */

/* Styling for filter bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-input,
.filter-select {
  margin-right: 10px;
}

/* Styling for date filter input */
.filter-input[type="datetime-local"] {
  max-width: 200px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Styling for create transaction button */
.create-transaction-btn {
  margin-top: 20px;
}

/* Styling for transaction groups */
.transaction-group {
  margin-top: 30px;
}

.transaction-date {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.row {
  margin-left: -5px;
  margin-right: -5px;
}
</style>