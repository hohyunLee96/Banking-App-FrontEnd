<template>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
      <div class="card product-card h-100">
        <div class="card-body">
          <div class="float-start">
            <p>{{ user.firstName }}</p>
            <!-- <p>{{ account.user.firstName + " " + account.user.lastName}}</p> -->
            <p>
              <small>{{ user.lastName }}</small>
            </p>
            <p>
              <small>{{ user.hasAccount }}</small>
            </p>
          </div>
        </div>
        <div class="card-footer">
          <!-- <button class="btn btn-warning" @click="editAccount(account.id)">Edit</button>&nbsp;&nbsp; -->
          <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Kill.vue",
    props: {
      user: Object,
    },
    methods: {
      deleteUser(id) {
        axios
          .put("http://localhost:8080/users" + id)
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