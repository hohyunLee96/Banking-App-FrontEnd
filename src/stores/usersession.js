import { defineStore } from "pinia";
import axios from "../axios-auth.js";

export const useUserSessionStore = defineStore("userSession", {
  state: () => ({
    jwt: "",
    email: "",
    userId: null,
    isEmployee: false,
  }),
  getters: {
    isAuthenticated(state) {
      return state.jwt !== "";
    },
  },
  actions: {
    async localLogin() {
      if (localStorage.getItem("jwt")) {
        this.jwt = localStorage.getItem("jwt");
        this.email = localStorage.getItem("email");
        this.userId = localStorage.getItem("id");
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.jwt;
        // Call the checkAdmin method to determine the user's admin status
          // try {
          //   const response = await this.checkAdmin(this.jwt, this.userId);
          //   this.isAdmin = response.data.isAdmin;
          //   console.log("Admin status: " + response.data.isAdmin);
          // } catch (error) {
          //   console.error(error);
          // }
      }
    },
    login(email, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("auth/login", {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response);
            this.jwt = response.data.jwt;
            this.email = response.data.email;
            this.id = response.data.id;

            localStorage.setItem("jwt", this.jwt);
            localStorage.setItem("email", this.email);
            localStorage.setItem("id", this.id);

            axios.defaults.headers.common["Authorization"] = "Bearer " + this.jwt;
            console.log(response);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error.response);
          });
      });
    },

    logout() {
      this.jwt = "";
      this.email = "";
      this.id = "";
      localStorage.removeItem("jwt");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      delete axios.defaults.headers.common["Authorization"];
    },

    getLoggedInUserRole() {
      const jwt = this.jwt;
      const id = this.id;

      return axios
        .get('users/'+id, 
        { headers: { Authorization: `Bearer ${jwt}` } })
        .then((response) => {
          console.log(response.data);
          return response.data.userType;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },
  },
});
