import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import AccountList from '../components/account/AccountList.vue';
import CreateAccount from '../components/account/CreateAccount.vue';

//USER IMPORTS/////////////////////////////////////////////////////////
import UserList from '../components/user/UserList.vue';
import EditUser from '../components/user/EditUser.vue';
import RegistrationForm from '../components/user/RegistrationForm.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Login from '../components/Login.vue';
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
    {
      path: '/createaccount/:userId',
      name: 'CreateAccount',
      component: CreateAccount
    }, 
    { path: '/editAccount/:id', component: EditAccount, props: true  },

    { path: '/search', component: AccountIbanList },
    { path: '/test', component: AccountIbanList },
    //USER ROUTES/////////////////////////////////////////////////////////
    { path: '/register', component: RegistrationForm },
    { path: '/users', component: UserList },
    { path: '/me', component: EditUser },
    //{ path: '/users', component: CreateAccount },
    { path: '/edituser/:id', component: EditUser, props: true  },

    { path: '/:notFound(.*)', component: Home},
    { path: '/products', component: ProductList },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true  },
    { path: '/adminpanel', component: AdminPanel},
    {path: '/transactions', component: TransactionList},
    {path: '/atm', component: ATM},

    {path: '/createtransaction', component: CreateTransaction},
    {path: '/account', component: AccountList}
   
  ]
  
});


export default router;


