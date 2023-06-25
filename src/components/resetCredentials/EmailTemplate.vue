<template>
  <button id="backButton" @click="backToLogin">Back to Login</button>
  <div class="text-center">
    <div>
      <h1>Hi!</h1>
      <h3>Please enter your email so that we can send you your reset password link.</h3>
      <h3>{{ connectionMessage }}</h3>
      <label for="email">Email:</label><br>
      <input type="text" placeholder="Enter your registered email" v-model="email" required>
      <button id="send" @click="emailLinkSend" :disabled="isEmailEmpty" :class="{ 'disabled-button': isEmailEmpty }">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EmailTemplate",
  mounted() {
    this.getConnectionMessage();
  },
  data() {
    return {
      email: "",
      connectionMessage: "",
    };
  },
  computed: {
    isEmailEmpty() {
      return this.email.trim() === "";
    },
  },
  methods: {
    getConnectionMessage() {
      axios
          .get("/forgot")
          .then((response) => {
            this.connectionMessage = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    emailLinkSend() {
      console.log("Sending link to reset password...");

      // Check if the email field is populated correctly
      console.log("Email:", this.email);

      axios
          .post("http://localhost:8080/forgot/sendEmail", {
            email: this.email,
          })
          .then((response) => {
            console.log(response);
            this.$router.push('/login');
          })
          .catch((error) => {
            console.log(error);
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
