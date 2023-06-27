<template>
    <section>
        <div class="container">
            <form ref="form">
                <h2 class="mt-3 mt-lg-5">Edit Account</h2>
                <h5 class="mb-4"></h5>
                <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
                <div class="input-group mb-3">
                    <span class="input-group-text">First Name</span>
                    <input type="text" class="form-control" v-model="account.firstName" readonly/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Last Name</span>
                    <input type="text" class="form-control" v-model="account.lastName" readonly/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">IBAN</span>
                    <input type="text" class="form-control" v-model="account.IBAN" readonly/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Account Type</span>
                    <input type="text" class="form-control" v-model="account.accountType" readonly/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">New Absolute Limit</span>
                    <input type="text" class="form-control" v-model="account.absoluteLimit" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">New Account Status</span>
                    <select class="form-select" v-model="account.isActive">
                        <option value="">Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <div class="input-group mt-4">
                    <button type="button" class="btn btn-primary" @click="editAccount(this.id)">
                        Save changes
                    </button>
                    <button type="button" class="btn btn-danger" @click="this.$router.push('/')">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
    
<script>
import axios from "../../axios-auth";

export default {
    name: "EditAccount",
    props: {
        id: Number,
    },
    data() {
        return {
            account: {
                absoluteLimit: 0,
                isActive: false,
                IBAN: "",
                firstName: "",
                lastName: "",
                accountType: "",
            },
            errorMessage: "",
        };
    }, mounted() {
        axios.get("accounts/" + this.id)
            .then((response) => {
                console.log(response);
                this.account = response.data;
            });
    },
    methods: {
        editAccount(id) {
            // use axios to delete the product
            axios.put("accounts/" + this.id, this.account)
                .then(response => {
                    this.$router.push("/account");
                }).catch((error) => {
                    if (error) {
                        this.errorMessage = error.response.data.message;
                    }
                    setTimeout(() => {
                        this.errorMessage = "";
                    }, 8000);
                    console.log(error);
                });
        }
    },
}
</script>
    
<style></style>