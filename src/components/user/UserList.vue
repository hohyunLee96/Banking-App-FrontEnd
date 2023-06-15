<template>
  <section>
    <div class="admin-panel">
      <div class="users-view">
        <h2 class="section-title">Users</h2>
        <button type="button" class="btn btn-add-user m-3" @click="this.$router.push('/register');" style="margin-left: 0px !important;">
          <i class="fas fa-plus"></i>
          Add User
        </button>
        
        <div class="card" style="margin-bottom: 30px;">
          <div>
            <div class="card-header" style="background-color: #e5e5e5;">
              <p style="margin-bottom: 0px !important; font-weight: bold; font-size: 14px;">Filters</p>
            </div>
          </div>
          <div class="card-body" style="display: flex; flex-direction: row; background-color: #f7f7f7 !important;">
            <div class="row filter-bar" style="flex-grow: .7;">
              <div class="col">
                <input id="search" type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon2"
                  v-model="filterValues.keyword" @input="applyFilter">
              </div>
            </div>
            <div class="col" style="flex-grow: 1;">
              <label class="m-3" for="filter">Account Filter:</label>
              <select id="filter" v-model="filterOption" @change="applyFilter">
                <option value="all">All</option>
                <option value="withoutAccount">Without Account</option>
                <option value="withoutSavingsAccount">Without Savings Account</option>
                <option value="withoutCurrentAccount">Without Current Account</option>
              </select>
            </div>
            <div class="col" style="flex-grow: 1;">
              <label class="m-3" for="filter">User Type:</label>
              <select id="filter" v-model="userType" @change="applyFilter">
                <option value="">All</option>
                <option value="ROLE_CUSTOMER">Customers</option>
                <option value="ROLE_EMPLOYEE">Employees</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="users-list">
          <user-list-item v-for="user in filteredUsers" :key="user.id" :user="user" :filter-option="filterOption"
            @update="update" @error-message="setErrorMessage" />
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import axios from "../../axios-auth";
import { useUserSessionStore } from "@/stores/usersession";
import AdminPanel from "./../AdminPanel.vue";
import UserListItem from "./UserListItem.vue";

export default {
  name: "UserList",
  components: {
    AdminPanel,
    UserListItem,
  },
  data() {
    return {
      errorMessage: "",
      users: [],
      userType: "",
      filterOption: "all",
      filterValues: {
        keyword: "",
        birthDate: "",
      },
    };
  },
  setup() {
    const store = useUserSessionStore();

    return {
      store,
    };
  },
  mounted() {
    if(!this.store.isUserRoleEmployee){
      this.$router.push("/home");
    }
    if(!this.store.isAuthenticated){
      this.$router.push("/login");
    }
    this.update();
  },
  computed: {
    filteredUsers() {
      return this.users;
    },
  },
  methods: {
    setErrorMessage(message) {
      this.errorMessage = message;

      setTimeout(() => {
        this.errorMessage = "";
      }, 8000);
    },
    formatDate(dateString) {
      const format = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    update() {
      const params = {};
      Object.keys(this.filterValues).forEach((param) => {
        if (this.filterValues[param] !== "") {
          if (param === "birthDate") {
            const date = new Date(this.filterValues[param]);
            const formattedDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
            params[param] = formattedDate;
          } else {
            params[param] = this.filterValues[param];
          }
        }
      });

      if (this.filterOption === "withoutAccount") {
        params.hasAccount = false;
        params.userType = "ROLE_USER";
      } else if (this.filterOption === "withoutSavingsAccount") {
        params.excludedAccountType = "SAVINGS";
      } else if (this.filterOption === "withoutCurrentAccount") {
        params.excludedAccountType = "CURRENT";
      }

      if (this.userType === "ROLE_CUSTOMER") {
        params.userType = "ROLE_CUSTOMER";
      } else if (this.userType === "ROLE_EMPLOYEE") {
        params.userType = "ROLE_EMPLOYEE";
      }

      axios
        .get("users", { params })
        .then((result) => {
          console.log(result);
          this.users = result.data;
        })
        .catch((error) => console.log(error));
    },
    handleDateInput() {
      this.filterValues.birthDate = this.$refs.dateInput.value;
      this.update();
    },
    applyFilter() {
      this.update();
    },
  },
};
</script>
<style scoped>
.admin-panel {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 10px;
}

.users-view {
  max-width: 100vw;
  width: 80vw;
}

.section-title {
  font-size: 28px;
  margin-bottom: 24px;
  color: #333;
}

.filter-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
  margin-bottom: 24px;
}

.input-group {
  flex-grow: 1;
}

#search {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
}

.filter-bar {
  display: flex;
  align-items: center;
}

label {
  margin-right: 12px;
  font-size: 14px;
  color: #666;
}

#filter {
  width: 150px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
}

.btn {
  border-radius: 4px;
  font-size: 14px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-add-user {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.alert {
  margin-bottom: 24px;
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.users-list {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  /* Add negative margin to offset the default padding of user-list-item */
}

</style>

