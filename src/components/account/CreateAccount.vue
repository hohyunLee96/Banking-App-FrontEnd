<!-- <template>
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
          <button type="button" class="btn btn-danger" @click="this.$router.push('/accounts')">
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
  
<style></style> -->
<template>
  <section>
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Create an account</h2>
        <h5 class="mb-4"></h5>
        <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="input-group mb-3">
          <span class="input-group-text">userID</span>
          <input type="number" class="form-control" v-model="users.id" readonly />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">user name</span>
          <textarea class="form-control" v-model="users.firstName" readonly></textarea>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Absolute Limit</span>
          <input type="text" class="form-control" v-model="account.absoluteLimit" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Account Type</span>
          <select class="form-select" v-model="account.accountType">
            <option value="SAVINGS" v-if="filterOption === 'withoutSavingsAccount' || !users.hasAccount">SAVINGS</option>
            <option value="CURRENT" v-if="filterOption === 'withoutCurrentAccount' || !users.hasAccount">CURRENT</option>
          </select>
        </div>

        <div class="input-group mt-4">
          <button type="button" class="btn btn-primary" @click="addAccount">
            Create Account
          </button>
          <button type="button" class="btn btn-danger" @click="this.$router.push('/')">
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
      users: {
      },
      filterOption: "",
      errorMessage: "",
    };
  },
  methods: {
    addAccount() {
      axios
        .post("accounts", this.account)
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$router.push("/");
        })
        .then(response => {
          alert("Account sent!")
          console.log(response)
          this.$router.push('/')
        })
        .catch((error) => {
          if (error) {
            this.errorMessage = error.response.data.message;
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 8000);
          console.log(error);
        });
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
      .catch((error) => {
          if (error) {
            this.errorMessage = error.response.data.message;
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 8000);
          console.log(error);
        });

    this.filterOption = this.$route.query.filterOption; // Get the filterOption from the query parameter
  },
};
</script>

<style></style>
