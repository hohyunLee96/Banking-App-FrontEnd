<template>
  <div class="text-center">
    <div>
      <h1>Password Reset</h1>
      <p>Please enter your new password below:</p>
      <label for="password">New Password:</label><br>
      <input type="password" v-model="password" required>
    <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
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
  name: "PasswordReset",
  mounted() {
      if (this.$route.query.email) {
        console.log("Email: " + this.$route.query.email);

        // Get the email from the URL
        this.emailTo = this.$route.query.email;
      } else {
        this.$router.push("/login");
      }
  },
  data() {
    return {
      emailTo: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    resetPassword() {

      if (this.password.trim().length < 8) {
        return this.errorMessage = "Password must be at least 8 characters long.";

      } else if (!/\d/.test(this.password)) {
        return this.errorMessage = "Password must contain at least one number.";

      } else if (!/[!@#$%^&*]/.test(this.password)) {
        return this.errorMessage = "Password must contain at least one special character.";

      } else {
        this.errorMessage = "";

        axios
            .post("/forgot/resetPassword", {
              // Send the email and password to the backend
              emailTo: this.emailTo,
              password: this.password,
            })
            .then((response) => {
              console.log(response);
              alert("Password reset successful!");
              this.$router.push("/login");
            })
            .catch((error) => {
              console.log(error);
              this.errorMessage = error.response.data.message;
            });
      }
    },
    cancelReset() {
      // Redirect the user back to the login page
      this.$router.push("/login");
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
