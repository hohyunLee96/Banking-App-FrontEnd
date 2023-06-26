<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card user-card h-100">
      <div class="card-header">
        <p class="user-role">Role: {{ getUserType(user.userType) }}</p>
      </div>
      <div class="card-body">
        <div class="user-info float-start">
          <p class="user-name">Name: {{ user.firstName }} {{ user.lastName }}</p>
          <p class="user-email">
            <small>Email: {{ user.email }}</small>
          </p>
        </div>
        <span class="user-phone float-end">{{ user.phoneNumber }}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-edit" @click="editUser(user.userId)">Edit</button>
        <button class="btn btn-delete" @click="deleteUser(user.userId)">Delete</button>
        <button v-if="shouldDisplayCreateAccountButton(user)" class="btn btn-create-account m-2"
          @click="createAccount(user.userId, filterOption)">
          Create Account
        </button>
      </div>
    </div>
  </div>
</template>

  
<script>
import axios from "../../axios-auth";

export default {
  name: "UserListItem",
  props: {
    user: Object,
    filterOption: String,
  },
  mounted() {
    
  },
  methods: {
    getUserType(userType) {
      if (userType === "ROLE_EMPLOYEE") {
        return "Employee";
      } else if (userType === "ROLE_CUSTOMER") {
        return "Customer";
      }
      else if (userType === "ROLE_USER") {
        return "User";
      }
      return "Unknown";
    },
    shouldDisplayCreateAccountButton(user) {
      if (this.filterOption === "withoutSavingsAccount" && !user.hasSavingsAccount) {
        return true;
      } else if (this.filterOption === "withoutCurrentAccount" && !user.hasCurrentAccount) {
        return true;
      }
      else if (!user.hasAccount) {
        return true;
      }
      return false;
    },
    deleteUser(id) {
      axios
        .delete("users/" + id)
        .then((result) => {
          console.log(result);
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.$emit('error-message', error.response.data.message);
          console.log(error);
        });
    },
    editUser(id) {
      this.$router.push('/edituser/' + id);
    },
    createAccount(userId, filterOption) {
      // Perform the necessary action to create an account for the user
      console.log("Create account for user:", userId);
      this.$router.push({ name: 'CreateAccount', params: { userId }, query: { filterOption } });
    },
  },
};
</script>
  
<style scoped>
.user-card {
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #e5e5e5;
  border-bottom: 1px solid #ccc;
  padding: 8px;
  font-weight: bold;
  font-size: 14px;
}

.user-role {
  margin: 0;
  color: #333;
}

.card-body {
  padding: 12px;
}

.user-info {
  margin-bottom: 12px;
}

.user-name {
  margin: 0;
  font-weight: bold;
}

.user-email {
  margin: 0;
  font-size: 12px;
}

.user-phone {
  font-weight: bold;
}

.card-footer {
  background-color: #f7f7f7;
  border-top: 1px solid #ccc;
  padding: 8px;
  text-align: right;
}

.btn {
  border-radius: 4px;
  font-size: 14px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #e5e5e5;
}

.btn-edit {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #ffffff;
  margin-right: 6px;
}

.btn-delete {
  background-color: #dc3545;
  border-color: #dc3545;
  color: #fff;
}

.btn-create-account {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

</style>

  