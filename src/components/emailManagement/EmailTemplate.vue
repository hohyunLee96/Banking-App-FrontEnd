<template>
  <button id="backButton" @click="backToLogin">Back to Login</button>
  <div class="text-center">
    <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
    <div>
      <h1>Hi!</h1>
      <h3>Please enter your email so that we can send you your reset password link.</h3>
      <label for="email">Email:</label><br>
      <input type="text" placeholder="Enter your registered email" v-model="emailTo" required>
      <button id="send" @click="emailLinkSend" :disabled="isEmailEmpty" :class="{ 'disabled-button': isEmailEmpty }">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  name: "EmailTemplate",
  data() {
    return {
      emailTo: "",
      errorMessage: "",
    };
  },
  computed: {
    isEmailEmpty() {
      return this.emailTo.trim() === "";
    },
  },
  methods: {
    emailLinkSend() {
      console.log("Sending link to reset password...");

      if (this.emailTo.indexOf("@") === -1) {
        this.errorMessage = "Please enter a valid email address.";
        return;
      }

      // Send the email to the backend
      axios
          .post("forgot/sendEmail", {
            emailTo: this.emailTo,
          })
          .then((response) => {
            console.log(response);
            alert("Email sent!");
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log(error);
            this.errorMessage = error.response.data.message;
          });
    },


    backToLogin() {
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
h3 {
  color: darkolivegreen;
  margin-bottom: 5%;
}
label[for="email"] {
  font-size: 1.5em;
  font-style: italic;
}
input[type="text"] {
  border-radius: 3px;
  padding: 5px;
  width: 30%;
  margin: 10px;
}
input::placeholder {
  color: #666666;
}
#send {
  background-color: mediumseagreen;
  padding: 5px;
  width: 5%;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
#send.disabled-button {
  background-color: gray;
}
#backButton {
  background-color: black;
  padding: 5px;
  margin: 1%;
  width: 10%;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
}
</style>
