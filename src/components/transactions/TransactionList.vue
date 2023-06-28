<template>
  <section>
    <div class="admin-panel">
      <!-- Admin panel content -->
    </div>
 
    <div class="container">
      <h2>Filter</h2>
      <div class="filter-bar mt-2">
        <div class="filter-group" v-for="param in filterParameters" :key="param">
          <label :for="param">
            <i class="fas" :class="getParamIcon(param)"></i> {{ getParamLabel(param) }}
          </label>
          <div class="filter-input">
            <template v-if="param === 'fromIban' || param === 'toIban'">
              <input
                type="text"
                v-model="filterValues[param]"
                :placeholder="getParamPlaceholder(param)"
                @input="getAllTransactions"
              />
            </template>
            <template v-else-if="param === 'amount'">
              <select class="m-2" v-model="amountFilterOptions.amount" @change="getAllTransactions">
                <option value="">All</option>
                <option value="lessThanAmount">Less than</option>
                <option value="greaterThanAmount">Greater than</option>
                <option value="equalToAmount">Equal to</option>
              </select>
              <input
                type="number"
                v-model="filterValues[param]"
                :placeholder="getParamPlaceholder(param)"
                @input="getAllTransactions"
              />
            </template>
            <template v-else-if="param === 'fromDate' || param === 'toDate'">
              <input type="datetime-local" v-model="filterValues[param]" @change="getAllTransactions" />
            </template>
          </div>
        </div>
      </div>
      </div>
      <h2 class="mt-3 mt-lg-5">Transactions</h2>
      <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createTransaction');">
        <i class="fas fa-plus"></i> Create Transaction
      </button>
      <div class="mt-5">
        <table class="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction ID</th>
              <th>From IBAN</th>
              <th>To IBAN</th>
              <th>Amount</th>
              <th v-if="isUserRoleEmployee">Performing User</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="date in orderedTransactionDates" :key="date">
              <tr v-for="transaction in orderedTransactions[date]" :key="transaction.transactionId">
                <td>{{ formatDate(transaction.timeStamp) }}</td>
                <td>{{ transaction.transactionId }}</td>
                <td>{{ transaction.fromIban }}</td>
                <td>{{ transaction.toIban }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ getPerformingUser(transaction.performingUser) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
    </div>
  </section>
</template>

<script>
import axios from "../../axios-auth";
import { useUserSessionStore } from "@/stores/usersession";

export default {
  name: "TransactionList",
  data() {
    return { 
      isUserRoleEmployee: useUserSessionStore.getIsUserRoleEmployee,
      transactions: [],
      filterParameters: ["fromIban", "toIban", "amount", "performingUser", "fromDate", "toDate"],
      filterValues: {
        fromIban: "",
        toIban: "",
        amount: "",
        performingUser: "",
        transactionId: "",
        toDate: "",
        fromDate: "",
        type: "",
      },
      amountFilterOptions: {
        amount: "",
        lessThanAmount: "lessThanAmount",
        greaterThanAmount: "greaterThanAmount",
        equalToAmount: "equalToAmount",
      },
      users: [],
    };
  },
  computed: {
    orderedTransactions() {
      const ordered = {};
      this.transactions.forEach((transaction) => {
        const date = transaction.timeStamp.split("T")[0];
        if (!ordered[date]) {
          ordered[date] = [];
        }
        ordered[date].push(transaction);
      });
      return ordered;
    },
    orderedTransactionDates() {
      return Object.keys(this.orderedTransactions).sort().reverse();
    },
    filteredTransactions() {
      const fromIban = this.filterValues.fromIban.toLowerCase();
      return this.transactions.filter((transaction) =>
        transaction.fromIban.toLowerCase().includes(fromIban)
      );
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    getPerformingUser(userId) {
      const user = this.users.find((u) => u.id === userId);
      return user ? `${user.firstName} ${user.lastName}` : "";
    },
    getParamLabel(param) {
      switch (param) {
        case "fromIban":
          return "From IBAN";
        case "toIban":
          return "To IBAN";
        case "amount":
          return "Amount";
        case "fromDate":
          return "From Date";
        case "toDate":
          return "To Date";
        default:
          return "";
      }
    },
    getParamPlaceholder(param) {
      switch (param) {
        case "fromIban":
          return "Enter from IBAN";
        case "toIban":
          return "Enter to IBAN";
        case "amount":
          return "Enter amount";
        default:
          return "";
      }
    },
    getParamIcon(param) {
      switch (param) {
        case "fromIban":
          return "fa-university";
        case "toIban":
          return "fa-university";
        case "amount":
          return "fa-money-bill";
        case "fromDate":
          return "fa-calendar-alt";
        case "toDate":
          return "fa-calendar-alt";
        default:
          return "";
      }
    },
    getAllTransactions() {
      const queryParams = {};
      if (this.filterValues.fromIban) {
        queryParams.fromIban = this.filterValues.fromIban;
      }
      if (this.filterValues.toIban) {
        queryParams.toIban = this.filterValues.toIban;
      }
      if (this.filterValues.amount) {
        switch (this.amountFilterOptions.amount) {
          case "lessThanAmount":
            queryParams.lessThanAmount = this.filterValues.amount;
            break;
          case "greaterThanAmount":
            queryParams.greaterThanAmount = this.filterValues.amount;
            break;
          case "equalToAmount":
            queryParams.equalToAmount = this.filterValues.amount;
            break;
        }
      }
      if (this.filterValues.fromDate) {
        queryParams.fromDate = this.filterValues.fromDate;
      }
      if (this.filterValues.toDate) {
        queryParams.toDate = this.filterValues.toDate;
      }

      axios
        .get("/transactions", { params: queryParams })
        .then((response) => {
          this.transactions = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllUsers() {
      axios
        .get("/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const store = useUserSessionStore();
    this.isUserRoleEmployee= store.isUserRoleEmployee();
  },
  created() {
    this.getAllTransactions();
    this.getAllUsers();
  },
};
</script>

<style scoped>
/* Transaction table styles */
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 20px;
}

.transaction-table th,
.transaction-table td {
  padding: 10px;
}

.transaction-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  text-transform: uppercase;
}

.transaction-table td {
  border-bottom: 1px solid #ddd;
}

.transaction-table .date-row {
  background-color: #f2f2f2;
}

/* Filter styles */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filter-group {
  margin-right: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-group label {
  margin-right: 10px;
}

.filter-group select,
.filter-group input[type="text"],
.filter-group input[type="number"] {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.filter-group select {
  margin-right: 10px;
}

.filter-group input[type="number"] {
  width: 80px;
}

.btn-primary {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.mt-3 {
  margin-top: 20px;
}

.mt-5 {
  margin-top: 50px;
}

.admin-panel {
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

/* Font Awesome icons */
.fa {
  font-family: "Font Awesome 5 Free";
}

.icon-fromIban:before {
  content: "\f19c";
}

.icon-toIban:before {
  content: "\f19c";
}

.icon-amount:before {
  content: "\f0d6";
}

.icon-fromDate:before {
  content: "\f073";
}

.icon-toDate:before {
  content: "\f073";
}
</style>