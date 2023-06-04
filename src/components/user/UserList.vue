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
        .get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlbXBsb3llZUBlbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTY4NTkxMjc1NiwiZXhwIjoxNjg1OTE2MzU2fQ.CEeyFBcy9tYUfbiOnzu4kOeLsaOTfCcTC-ZpDE9rlKecsLtH1HJrIKvCsnGzEgj0nA4BYrHlpYRqp4Kad9xl0x68xcgx0x3EcDusCn_a03U-Rlqu-0tJTR0Yh42XxNDTlIC7d4py0cdjAJbthUEMrgeT0qhfuUnULEMYAspensMVibCbkUysISsmujU31nduHO2yaX0H7AsvC6dWyjf0NziO36JvrHKrc5vwMk34WtEfNXy24Mhz8tUIkoKm0tGezCJZJtFp7RCKOBVTALO0XKbDrDFdY_44bwZfHcRX3kteL64UXlmOrIuuJ5DrXlrfqVW0u3Y3veyAWxv2v_uUmA"}`
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