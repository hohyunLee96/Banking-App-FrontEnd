<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      <div class="card-body">
        <div class="float-start">
          <p>{{ "user ID " + account.user }}</p>
          <!-- <p>{{ account.user.firstName + " " + account.user.lastName}}</p> -->
          <p>
            {{ account.IBAN }}
          </p>
          <p>
            <small>{{ account.accountType }}</small>
          </p>
          <p>
            <small :class="{ 'text-success': account.isActive, 'text-danger': !account.isActive }">
              {{ "activation " + account.isActive }}
            </small>
          </p>
        </div>
        <span class="price float-end">{{ account.absoluteLimit }}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-danger" @click="deactivateAccount(account.accountId)">Deactivate</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "../../axios-auth";

export default {
  name: "AccountListItem",
  props: {
    account: Object,
  },
  methods: {
    deactivateAccount(id) {
            axios
        .put("accounts/" + id, { isActive: false })
        .then((result) => {
          console.log(result);
          this.account.isActive = false;
          this.$emit('update');
        })
        .catch((error) => console.log(error));
    },
  }
};
</script>
  
<style></style>