<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
      <div class="card product-card h-100">
        <div class="card-body">
          <div class="float-start">
            <p>{{ "user ID " + account.userId }}</p>
            <!-- <p>{{ account.user.firstName + " " + account.user.lastName}}</p> -->
            <p>
              {{ account.IBAN }}
            </p>
            <p>
              <small>{{ account.accountType }}</small>
            </p>
            <p>
            <small :class="{'text-success': account.isActive, 'text-danger': !account.isActive}">
              {{ "activation  " + account.isActive }}
            </small>
          </p>
          </div>
          <span class="price float-end">{{ account.absoluteLimit }}</span>
        </div>
        <div class="card-footer">
          <!-- <button class="btn btn-warning" @click="editAccount(account.id)">Edit</button>&nbsp;&nbsp; -->
          <button class="btn btn-danger" @click="deleteAccount(account.accountId)">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AccountListItem",
    props: {
      account: Object,
    },
    methods: {
      deleteAccount(id) {
        axios
          .put("http://localhost:8080/accounts" + id)
          .then((result) => {
            console.log(result);
            this.$emit('update')
          })
          .catch((error) => console.log(error));
      },
    //   editAccount(id) {
    //     this.$router.push('/editaccount/' + id);
    //   }
    },
  };
  </script>
  
  <style>
  </style>