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
        <div class="input-group mb-3" style="width: 80%; margin-top: 20px;">
          <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
        </div>
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
        .get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlbXBsb3llZUBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTY4NTk2MTE5MSwiZXhwIjoxNjg1OTY0NzkxfQ.Z8oeYJhMcJczFWPabImkyJbWgBF-5jzssqbNFMvCL8sVfp6HlXJnCMCjGQ3LPPVUXKSGEgOVoBx1biqaQZ3YOcIgXb7IqySoIEG016xXORvQm69OqQ5Wze_a5m5mfRD3piVfuJabBxdRVwyAmCYTSUky__gwJAprDeQJ4-IEepW50PGuwwj6dHDlW9bpcfBhyZ0fwDfqNYOI0ki0zxoRQfaTFY7Y-JIdAXqDWw51XVBQdM7BW39fj89vjYqurkKplVMcl0Ki3clXc_kRUvmNDeOi8nFYsJB5708CjVBik9Vw4urX0Ne3lxldjiOn45_KU6P-N9gcmgMnhLL41Atz7A"}`
          }
          }).then((result) => {
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