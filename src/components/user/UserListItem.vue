<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card user-card h-100">
      <div class="card-body">
        <div class="float-start">
          <p>{{ user.firstName }} {{ user.lastName }}</p>
          <p>
            <small>{{ user.email }}</small>
          </p>
        </div>
        <span class="float-end">{{ user.phoneNumber }}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-warning" @click="editUser(user.userId)">Edit</button>&nbsp;&nbsp;
        <button class="btn btn-danger" @click="deleteUser(user.userId)">Delete</button>
        <button v-if="!user.hasAccount" class="btn btn-primary" @click="createAccount(user.userId)">Create
          Account</button>
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
  },
  methods: {
    deleteUser(id) {
      axios
        .delete("users/" + id)
        .then((result) => {
          console.log(result);
          this.$emit("update");
        })
        .catch((error) => console.log(error));
    },
    editUser(id) {
      this.$router.push('/edituser/' + id);
    },
    createAccount(userId) {
      // Perform the necessary action to create an account for the user
      console.log("Create account for user:", userId);
      this.$router.push({ name: 'CreateAccount', params: { userId } });
    },
  },
};
</script>
  
<style></style>
  