import { defineStore } from "pinia";
import axios from "axios";

export const useUserSessionStore = defineStore("userSession", {
  state: () => ({
    jwt: "",
    email: "",
    id: null,
    userType: "",
  }),
  // getters: {
  //   isAuthenticated(state) {
  //     return state.jwt !== "";
  //   },
  //   // Checks if the roles property includes the role "ROLE_EMPLOYEE"
  //   isEmployee(state) {
  //     return state.userType.includes("ROLE_EMPLOYEE");
  //   },
  // },
  actions: {
    // async localLogin() {
    //   if (localStorage.getItem("jwt")) {
    //     this.jwt = localStorage.getItem("jwt");
    //     this.email = localStorage.getItem("email");
    //     this.id = localStorage.getItem("id");
    //     axios.defaults.headers.common["Authorization"] = "Bearer " + this.jwt;
    //     // Call the checkEmployee method to determine the user's admin status
    //     try {
    //       const response = await this.checkEmployee(this.jwt, this.id);
    //       this.isEmployee = response.data.isEmployee;
    //       console.log("Admin status: " + response.data.isEmployee);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // },
    login(email, password) {
      console.log("Logging in..")
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8080/auth/login", {
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
            console.log("You have successfully logged in!")
            // Check if an item with key "jwt" exists in Local Storage
            if (localStorage.getItem("jwt")) {
              // Item exists
              console.log("Local Storage has a value for key 'jwt'");
            }
            else {
              // Item does not exist
              console.log("Local Storage does not have a value for key 'jwt'");
            }
            if (localStorage.getItem("email")) {
              console.log("Local Storage has a value for key 'email'");
            } else {
              // Item does not exist
              console.log("Local Storage does not have a value for key 'email'");
            }
            if (localStorage.getItem("id")) {
              console.log("Local Storage has a value for key 'id'");
            } else {
              // Item does not exist
              console.log("Local Storage does not have a value for key 'id'");
            }
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
    //   return axios.post("/users/checkAdmin/" + id, null, {
    //     headers: {
    //       Authorization: "Bearer " + jwt,
    //     },
    //   });
    // },
  },
});
