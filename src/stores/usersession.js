import { defineStore } from "pinia";
import axios from "../axios-auth.js";
import jwtDecode from "jwt-decode";

export const useUserSessionStore = defineStore("userSession", {
  state: () => ({
    jwt: "",
    email: "",
    id: null,
    isEmployee: false,
    userRole: "",
    loggedInUser: null,
  }),
  getters: {
    isAuthenticated(state) {
      return state.jwt !== "";
    },

    getUser(state) {
      return state.loggedInUser;
    },
    getUserId(state) {
      return state.id;
    },
    getIsUserRoleEmployee(state) {
      return state.isEmployee === true;
    },
  },
  actions: {
    async localLogin() {
      if (localStorage.getItem("jwt")) {
        this.jwt = localStorage.getItem("jwt");
        this.email = localStorage.getItem("email");
        this.id = localStorage.getItem("id");
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.jwt;
        this.isEmployee = this.isUserRoleEmployee();

        try {
          this.loggedInUser = await this.getLoggedInUser();
        } catch (error) {
          console.error(error.message);
        }
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
            this.loggedInUser=getLoggedInUser();

            localStorage.setItem("jwt", this.jwt);
            localStorage.setItem("email", this.email);
            localStorage.setItem("id", this.id);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + this.jwt;
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
      this.loggedInUser = null; // Clear the logged-in user
    },
    isUserRoleEmployee() {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.auth === "ROLE_EMPLOYEE";
      }
      return false;
    },
    getLoggedInUser() {
      const id = this.id;
      return axios
        .get("users/" + id)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    },
    computed: {
      isEmployee() {
        return this.$store.getIsEmployee;
      },
    },

  },
});
