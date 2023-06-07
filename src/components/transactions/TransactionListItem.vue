<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
      <div class="card product-card h-100">
        <div class="card-body">
          <h5 class="card-title">Transaction {{ transaction.transactionId }}</h5>
          <div class="float-start">
            <h4>&#8364; {{ transaction.amount }}</h4>
            <p><strong>Sender: </strong>{{ transaction.fromIban }}</p>
            <p><strong>Recipient: </strong>{{ transaction.toIban }}</p>
            <p><strong>Type: </strong>{{ transaction.type }}</p>
            <p><strong>Time: </strong>{{ formatDate(transaction.timeStamp) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "TransactionListItem",
    props: {
      transaction: Object,
    },
    methods: {
      formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
    },
  };
  </script>
  
  <style>
  </style>
  