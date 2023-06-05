<template>
    <section>
      <div class="container">
        <form ref="form">
          <h2 class="mt-3 mt-lg-5">Create an account</h2>
          <h5 class="mb-4"></h5>

          <div class="input-group mb-3">
            <span class="input-group-text">userID</span>
            <input type="number" class="form-control" v-model="users.id" />
          </div> 

          <div class="input-group mb-3">
            <span class="input-group-text">user name</span>
            <textarea class="form-control" v-model="users.firstName"></textarea>
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Absolute Limit</span>
            <input type="text" class="form-control" v-model="account.absoluteLimit" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Account Type</span>
            <select class="form-select" v-model="account.accountType">
              <option value="SAVINGS">SAVINGS</option>
              <option value="CURRENT">CURRENT</option>
            </select>
          </div>

  
          <div class="input-group mt-4">
            <button type="button" class="btn btn-primary" @click="addAccount">
              Create Account
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="this.$router.push('/accounts')"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  </template>
  
  <script>
import axios from 'axios';
  
  export default {
    name: "CreateAccount",
    data() {
      return {
        account: {
        accountId: 0,
          IBAN: "",
          balance: "",
          absoluteLimit: "",
          accountType: "",
          userId: 0,
          // token :"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkYXZpZEBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTY4NTkxNjQ5MywiZXhwIjoxNjg1OTIwMDkzfQ.CWDJAVlXUMP5_Qg0UG2ZLK2jOhTGdc9tK3eN9695qMV41I49n34fUJpxutSYRK9jkpXLeg2eEslva-zIpwVJvg0maYL7lYyMzjlmv0dATTFudYfZeTI3ZlnzrVSDux3B1QzoR2Kq-_bc-wS8Tg9Tac_h2Nv_qHPpGy2tOVM6FVPEwCt0t78pvH9OqgZUoIepOdbAJC3jyznHA6pMYtYoZkl5VPJcgEZyM7GSfqlA6n5ZmbIpV9Uku7jZhO6mWW2tUo_hfG5uuu5ecFmVuKrTQGWEL0IDmocLh21mFBAS5H_y6DOzUgWNREwOs5MAHXXXSlv__QkzkUSqrJuoBEkcww"
        },
        users: [],
        accounts: [],
      };
    },
    methods: {
      addAccount() {
        const token = this.token;

            // Include the token in the request headers
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
       'Content-type': 'application/json',
                }
            };
  this.account.userId = this.users.id; // Assign the user ID to the account object

  axios
    .post("http://localhost:8080/accounts", this.account)
    .then((res) => {
      console.log(res.data);
      this.$refs.form.reset();
      this.$router.push("/accounts");
    }, config)
                .then(response => {
                    alert("Transaction sent!")
                    console.log(response)
                    this.$router.push('/accounts')
                })
    .catch((error) => console.log(error));
},

    },
    mounted() {
  axios
    .get("http://localhost:8080/users/" + this.$route.params.userId) // Use $route.params.userId to get the ID from the route
    .then((result) => {
      console.log(result);
      this.users = result.data;
    })
    .catch((error) => console.log(error));
    },
  };
  </script>
  
  <style>
  </style>