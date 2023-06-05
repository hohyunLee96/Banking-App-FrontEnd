import { defineStore } from "pinia";
import axios from "axios";

export const useUserSessionStore = defineStore("userSession", {
  state: () => ({
    jwt: "",
    email: "",
    id: null,
    isEmployee: false,
  }),
  getters: {
    isAuthenticated(state) {
      return state.jwt !== "";
    },
  },
  actions: {
    login(email, password) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8080/users/login", {
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response);
            this.jwt = response.data.jwt;
            this.email = response.data.email;
            this.id = response.data.id;

            // try {
            //   const response = this.checkEmployee(this.jwt, this.id);
            //   this.isEmployee = response.data.isEmployee;
            //   console.log("Admin status: " + response.data.isEmployee);
            // } catch (error) {
            //   console.error(error);
            // }

            localStorage.setItem("jwt", this.jwt);
            localStorage.setItem("email", this.email);
            localStorage.setItem("id", this.id);

            axios.defaults.headers.common["Authorization"] = "Bearer " + this.jwt;
            console.log(response);
            resolve();
          })
          .catch(error => {
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
    // checkEmployee(jwt, id) {
    //   return axios.post("http://localhost:8080/users/" + id, null, {
    //     headers: {
    //       Authorization: "Bearer " + jwt,
    //     },
    //   });
    // },
  },
});
