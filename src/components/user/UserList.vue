<template>
  <section>
    <div class="admin-panel">
      <AdminPanel />
    </div>
    <div class="container">
      <h2 class="mt-3 mt-lg-5">Users</h2>
        <button type="button" class="btn btn-primary mt-3" @click="this.$router.push('/createuser');">
            Add User
          </button>
      <div class="row mt-3">
        <user-list-item
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
import UserListItem from "./UserListItem.vue";

export default {
  name: "UserList",
  components: {
    AdminPanel,
    UserListItem,
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
        .get("http://localhost:8080/users")
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
</style>