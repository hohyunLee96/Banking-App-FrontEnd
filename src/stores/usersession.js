import { defineStore } from 'pinia';
import axios from 'axios';

export const userSessionStore = defineStore('userSession', {
    state: () => ({
        jwt: null,
        token_type: null,
        issued_at: null,
        expires_at: null,
        email: null,
        auth: null,
    }),
    getters: {
        // Checks if the jwt property is not null, indicating that the user is authenticated
        isAuthenticated(state) {
            return state.jwt != null;
        },
        // Checks if the roles property includes the role "ROLE_EMPLOYEE"
        isEmployee(state) {
            return state.auth.includes("ROLE_EMPLOYEE");
        },
        isCustomer(state) {
            return state.auth.includes("ROLE_CUSTOMER");
        },
        isUser(state) {
            return state.auth.includes("ROLE_USER");
        }
    },
    // modify the state of the store
    mutations: {
        authenticateUser(state, { jwt, token_type, issued_at, expires_at, email, auth }) {
            state.jwt = jwt;
            state.token_type = token_type;
            state.issued_at = issued_at;
            state.expires_at = expires_at;
            state.email = email;
            state.auth = auth;
        },
    },
    // Functions that perform asynchronous operations and can call mutations to modify the state
    actions: {
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => {
                // sending a login request to the server using Axios
                axios.post('http://localhost:8080/auth/login', {
                    email: parameters.email,
                    password: parameters.password,
                })
                    .then((result) => {
                        this.jwt = result.data.jwt;
                        this.email = result.data.email;

                        // Store the bearer token in the browser to stay logged in after refresh
                        localStorage.setItem('jwt', this.jwt);
                        localStorage.setItem('email', this.email);

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
                        // this mutation updates the state with the authenticated user information
                        commit('authenticateUser', {
                            jwt: result.data.jwt,
                            token_type: result.data.token_type,
                            expires_at: result.data.expires_at,
                            userID: result.data.userID,
                            auth: result.data.auth,
                        });

                        resolve();
                    })
                    .catch((error) => {
                        this.errorMessage = error.response.data.message;
                        reject(error);
                    });
            });
        },
        logout() {
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = '';
            this.jwt = null;
            this.email = null;
            this.token_type = null;
            this.issued_at = null;
            this.expires_at = null;
            this.auth = null;
        },
    },
});
