<template>
  <div>
    <button id="backButton" @click="backToLogin">Back to Login</button>
    <div class="text-center">
      <div class="alert alert-danger" v-if="errorMessage" id="error-message">{{ errorMessage }}</div>
      <h1>Congratulations!</h1>
      <h3>Your email address has been verified. </h3>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";

export default {
  name: "EmailVerified",
  mounted() {
    if (!this.$route.query.token) {
      this.$router.push("/register");
    } else {
      this.token = this.$route.query.token;
      this.emailVerified();
    }
  },
  data() {
    return {
      token: "",
      errorMessage: "",
    };
  },
  methods: {
    emailVerified() {
      console.log("Verifying email...");
      console.log(this.token);


      // Send the email to the backend
      axios
          .get("/users/confirmAccount?token=" + this.token)

          .then((response) => {
            this.errorMessage = response.data;
            console.log(this.errorMessage);
            console.log(response);
            alert("Email verified!");
            this.$router.push("/register");
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
