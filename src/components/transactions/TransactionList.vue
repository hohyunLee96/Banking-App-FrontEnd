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
            <div class="mt-5" v-for="date in orderedTransactionDates" :key="date">
                <h3>{{ formatDate(date) }}</h3>
                <div class="row mt-3">
                    <TransactionListItem v-for="transaction in orderedTransactions[date]" :key="transaction.transactionId"
                        :transaction="transaction" />
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
        };
    },
    mounted() {
        this.getAllTransactions();
    },
    computed: {
        orderedTransactions() {
            const orderedTransactions = {};
            this.transactions.forEach(transaction => {
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
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
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
  