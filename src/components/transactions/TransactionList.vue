<template>
  <section>
    <div class="admin-panel">
      <!-- Admin panel content -->
    </div>

    <div class="container">
      <h3>Filter</h3>
      <div class="filter-bar mt-3">
        <div class="filter-group" v-for="param in filterParameters" :key="param">
          <label :for="param">{{ getParamLabel(param) }}</label>
          <template v-if="param === 'fromIban' || param === 'toIban'">
            <input type="text" v-model="filterValues[param]" :placeholder="getParamPlaceholder(param)"
              @input="applyFilter" />
          </template>
          <template v-else-if="param === 'amount'">
            <select class="m-2" v-model="amountFilterOptions[param]" @change="updateAmountFilter">
              <option value="lessThanAmount">Less Than</option>
              <option value="greaterThanAmount">Greater Than</option>
              <option value="equalToAmount">Equal To</option>
            </select>
            <input type="number" v-model="filterValues[param]" :placeholder="getParamPlaceholder(param)"
              @input="applyFilter" />
          </template>
          <template v-else-if="param === 'performingUser'">
            <select v-model="filterValues[param]" @change="applyFilter">
              <option value="" disabled>Select User</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}
              </option>
            </select>
          </template>
        </div>
      </div>
      <h2 class="mt-3 mt-lg-5">Transactions</h2>
      <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createTransaction');">
        Create Transaction
      </button>
      <div class="mt-5" v-for="date in orderedTransactionDates" :key="date">
        <h3>{{ formatDate(date) }}</h3>
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

export default {
  name: "TransactionList",
  components: {
    TransactionListItem,
  },
  data() {
    return {
      transactions: [],
      filterParameter: "all",
      filterParameters: ["fromIban", "toIban", "amount", "performingUser"],
      filterValues: {
        fromIban: "",
        toIban: "",
        amount: "",
        performingUser: "",
        transactionId: "",
        type: "",
      },
      amountFilterOptions: {
        amount: "lessThanAmount",
        amount: "greaterThanAmount",
        amount: "equalToAmount",
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
              case "lessThanAmount":
                return transaction.amount < this.filterValues[param];
              case "greaterThanAmount":
                return transaction.amount > this.filterValues[param];
              case "equalToAmount":
                return transaction.amount === this.filterValues[param];
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
        default:
          return "";
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

.filter-bar {
  display: flex;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.filter-group label {
  margin-right: 5px;
}

.filter-group input,
.filter-group select {
  margin-right: 5px;
}
</style>
