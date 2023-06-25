<template>
  <div class="text-center">
    <div>
      <h1>Password Reset</h1>
      <p>Please enter your new password below:</p>
      <label for="password">New Password:</label><br>
      <input type="password" v-model="newPassword" required>
      <div class="button-group">
        <button @click="resetPassword" id="resetButton">Reset Password</button>
        <button @click="cancelReset" id="cancelButton">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";

export default {
  data() {
    return {
      newPassword: '',
      resetStatus: '',
    };
  },
  methods: {
    resetPassword() {
      const token = this.$route.query.token; // Extract the token from the URL query parameter
      axios.post('/forgot/resetPassword', {
        token: token,
        newPassword: this.newPassword,
      })
          .then(response => {
            this.resetStatus = response.data;
          })
          .catch(error => {
            this.resetStatus = error.response.data;
          });
    },
    cancelReset() {
      // Redirect the user back to the login page
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 5%;
  color: darkslateblue;
}
label[for="password"] {
  font-size: 1.5em;
  font-style: italic;
}
input[type="password"] {
  border-radius: 3px;
  padding: 5px;
  width: 30%;
  margin: 10px;
}
.button-group {
  margin-top: 20px;
}
#resetButton {
  background-color: mediumseagreen;
  padding: 5px;
  width: 10%;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  margin-right: 10px;
}
#cancelButton {
  background-color: black;
  padding: 5px;
  width: 6%;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
