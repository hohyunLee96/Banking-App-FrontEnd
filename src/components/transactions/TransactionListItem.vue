<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
        <div class="card product-card h-100">
            <div class="card-body">
                <h5 class="card-title">Transaction id: {{ transaction.transactionId }}</h5>
                <div class="float-start">
                    <h4>{{ transaction.transactionId }}</h4>
                    <p>Sender: {{ transaction.fromIban }}</p>
                    <p>Receipient: {{ transaction.toIban }}</p>
                    <p>
                        <small>{{ transaction.amount }}</small>
                    </p>
                </div>
            </div>
            <div class="card-footer">
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
      
   
    },
  };
  </script>
  
  <style>
  </style>