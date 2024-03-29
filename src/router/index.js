import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import AccountList from '../components/account/AccountList.vue';
import CreateAccount from '../components/account/CreateAccount.vue';
import UserList from '../components/user/UserList.vue';
import EditUser from '../components/user/EditUser.vue';
import RegistrationForm from '../components/user/RegistrationForm.vue';
import Login from '../components/Login.vue';

import EmailTemplate from "@/components/emailManagement/EmailTemplate.vue";
import EmailVerified from "@/components/emailManagement/EmailVerified.vue";
import PasswordReset from "@/components/emailManagement/PasswordReset.vue";

import AdminPanel from '../components/AdminPanel.vue';
import CreateTransaction from '../components/transactions/CreateTransaction.vue';
import TransactionList from '../components/transactions/TransactionList.vue';
import ATM from '../components/transactions/ATM.vue'
import AccountIbanList from '../components/account/AccountIbanList.vue';
import EditAccount from '../components/account/EditAccount.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: Home },
    { path: '/edituser/:id', component: EditUser, props: true  },
    { path: '/createaccount/:userId', name: 'CreateAccount', component: CreateAccount}, 
    { path: '/editAccount/:id', component: EditAccount, props: true  },
    { path: '/search', component: AccountIbanList },
    { path: '/test', component: AccountIbanList },
    { path: '/register', component: RegistrationForm },
    { path: '/users', component: UserList },
    { path: '/me', component: EditUser },
    { path: '/edituser/:id', component: EditUser, props: true  },
    { path: '/:notFound(.*)', component: Home},
    { path: '/login', component: Login },

    // Email Management
    { path: '/email-link', component: EmailTemplate },
    { path: '/resetPassword', component: PasswordReset },
    { path: '/confirmAccount', component: EmailVerified },

    { path: '/adminpanel', component: AdminPanel},
    { path: '/transactions', component: TransactionList},
    { path: '/atm', component: ATM},
    { path: '/createtransaction', component: CreateTransaction},
    { path: '/account', component: AccountList}
  ]
});


export default router;


