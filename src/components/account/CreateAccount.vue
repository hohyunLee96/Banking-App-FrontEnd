<!-- <template>
    <section>
      <div class="container">
        <form ref="form">
          <h2 class="mt-3 mt-lg-5">Create an account</h2>
          <h5 class="mb-4"></h5>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <input type="text" class="form-control" v-model="product.name" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Account Type</span>
            <input type="number" class="form-control" v-model="account.type" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Absolute Limit</span>
            <input type="text" class="form-control" v-model="account.absoluteLimit" />
          </div>
  
          <div class="input-group mb-3">
            <span class="input-group-text">Category</span>
            <select class="form-select" v-model="account.userId">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
  
          <div class="input-group mt-4">
            <button type="button" class="btn btn-primary" @click="addProduct">
              Create product
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="this.$router.push('/products')"
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
          userId: "",
          IBAN: "",
          type: "",
          absoluteLimit: "",
          category_id: 0,
        },
        users: [],
      };
    },
    methods: {
      addAccount() {
        axios
          .post("http://localhost:8080/accounts", this.account)
          .then((res) => {
            console.log(res.data);
            this.$refs.form.reset();
            this.$router.push("/accounts");
          })
          .catch((error) => console.log(error));
      },
    },
    mounted() {
      axios
        .get("http://localhost:8080/users")
        .then((result) => {
          console.log(result);
          this.categories = result.data;
        })
        .catch((error) => console.log(error));
    },
  };
  </script>
  
  <style>
  </style> -->
  <template>
    <section>
      <div class="admin-panel">
        <AdminPanel />
      </div>
      <div class="container">
        <h2 class="mt-3 mt-lg-5">Users</h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createaccount');">
          Add Users
        </button>
        <div class="row mt-3">
          <kill
            v-for="user in users"
            :key="user.id"
            :user="user"
            @update="update"
          />
        </div>
      </div>
    </section>
  </template>
    
    <script>
    import axios from "axios";
    import AdminPanel from "./../AdminPanel.vue";
    import Kill from "./Kill.vue";
    
    export default {
      name: "CreateAccount",
      components: {
        AdminPanel,
        Kill,
      },
      data() {
        return {
          users: [],
        };
      },
      mounted() {
        this.update();
      },
      methods: {
        update() {
          axios
           .get("http://localhost:8080/users", { params: { hasAccount: false }})
            // .get("http://localhost:8080/users?hasAccount=false")
            .then((result) => {
              console.log(result);
              this.users = result.data;
            })
            .catch((error) => console.log(error));
        },
      },
    };
    </script>
    
    <style>
  .admin-panel {
    width: 200px;
    float: left;
    /* Add any additional styling for the admin panel here */
  }
  
  .container {
    margin-left: 200px; /* Adjust the value to match the admin panel width */
    /* Add any additional styling for the container here */
  }
  
  /* Clear the float to prevent container collapsing */
  .container::after {
    content: "";
    display: table;
    clear: both;
  }
  </style>
    