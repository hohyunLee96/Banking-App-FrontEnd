<template>
  <section>
   <div class="registration-page">
      <div class="registration-form">
        <div class="bank-icon">
          <img class="icon" src="logo-no-background.svg" alt="Bank Icon" />
        </div>

        <form ref="form">
          <h2 class="form-title">Register</h2>

        </form>
      </div>
    </section>
  </template>
  
  <script>
  import axios from "../../axios-auth";
  import { useUserSessionStore } from "@/stores/usersession";

  export default {
    name: "CreateUser",
    setup() {
      const store = useUserSessionStore();
      return {
        store
      };
    },
    data() {
      return {
        errorMessage: "",
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirm: "",
          birthDate: "",
          postalCode: "",
          address: "",
          city: "",
          phoneNumber: "",
          userType: "",
          hasAccount: "",
        },
      };
    },
    methods: {
      addUser() {
        this.user.hasAccount = false;
        this.user.userType = "ROLE_USER";
        
        axios
          .post("users", this.user)
          .then((res) => {
            console.log(res.data);
            this.$refs.form.reset();
            this.$router.push("/login");
          })
          .catch((error) => {
            console.log(error.response.data);
            this.errorMessage = error.response.data;
            
            setTimeout(() => {
                this.errorMessage = "";
            }, 8000);
            console.log(error);
          });
      },
    };
  },
  methods: {
    addUser() {
      this.user.hasAccount = false;
      this.user.userType = "ROLE_USER";
      axios
        .post("users", this.user)
        .then((res) => {
          console.log(res.data);
          this.$refs.form.reset();
          this.$router.push("/login");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.registration-form {
  flex: 1;
  padding: 20px;
  margin-left: 400px; /* Add left margin */
  margin-right: 400px; /* Add right margin */
}

.bank-icon {
  text-align: center;
  margin-bottom: 20px;
}

.icon {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
}
.form-title {
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-register {
  margin-right: 20px;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
}

.btn-primary:hover,
.btn-danger:hover {
  opacity: 0.9;
}
</style>