<template>
  <section>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5 text-center " id="createaccountheader">Create an account</h2>
        <h5 class="mb-4"></h5>

        <div class="input-group mb-3">
          <span class="input-group-text">userID</span>
          <input type="number" class="form-control" v-model="users.id" />
        </div>

        <div class="input-group mb-3 text-center">
          <span class="input-group-text">user name</span>
          <input type="text" class="form-control" v-model="users.firstName" />
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
          <button type="button" id="createAccountButton" @click="addAccount">
            Create Account
          </button>
          <button type="button" id="cancelButton" @click="this.$router.push('/accounts')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
  
<script>
import axios from "../../axios-auth";

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
      },
      users: [],
      accounts: [],
    };
  },
  methods: {
    addAccount() {
      axios
        .post("accounts", this.account)
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$router.push("/accounts");
        })
        .then(response => {
          alert("Account sent!")
          console.log(response)
          this.$router.push('/accounts')
        })
        .catch((error) => console.log(error));
    },

  },
  mounted() {
    axios
      .get("users/" + this.$route.params.userId) // Use $route.params.userId to get the ID from the route
      .then((result) => {
        console.log(result);
        this.users = result.data;
        this.account.userId = result.data.id; // Update the userId property
      })
      .catch((error) => console.log(error));
  },
};
</script>
  
<style>
  #createaccountheader  {
    margin-bottom: 100px;
  }
  #createAccountButton {
    margin-right: 30px;
    margin-left: 40%;
    margin-top: 40px;
    background-color: darkblue;
    padding-left: 25px;
    padding-right: 25px;
    color: white;
    border: none;
    border-radius: 5px;

  }
  #cancelButton {
    background-color: red;
    margin-top: 40px;
    padding: 10px;
    color: white;
    border: none;
    border-radius: 5px;
  }


</style>