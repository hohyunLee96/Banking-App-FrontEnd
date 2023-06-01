import { defineStore } from 'pinia';
import axios from 'axios';

export const userSessionStore = defineStore('userSession', {
    state() {
        return {
            jwt: null,
            token_type: null,
            expires_at: null,
            email: null,
            roles: null,
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.jwt != null;
        },
        isEmployee(state) {
            return state.roles.includes("ROLE_EMPLOYEE")
        }
    },
    actions: {
        localLogin() {
            this.jwt = localStorage["jwt"];
            this.token_type = localStorage["token_type"];
            this.expires_at = localStorage["expires_at"];
            this.email = localStorage["email"];
            this.roles = localStorage["roles"];

            this.email = localStorage["email"];
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
            console.log("Logged in automatically");
        },

        login(email, password) {
            return new Promise((resolve, reject) => {
                axios.post('users/login', {
                    email: email,
                    password: password
                })
                    .then(response => {
                        this.jwt = response.data.token;
                        this.email = response.data.email;

                        //keeps logged in after refresh
                        localStorage["jwt"] = this.jwt;
                        localStorage.setItem('email', this.email);


                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
                        console.log(this.jwt);
                        resolve();
                    })
                    .catch(error => {
                        reject(error.response.data.errorMessage);
                        console.log(error); //shows Axios error
                    });
            });
        },
    }
});
