import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import AccountList from '../components/account/AccountList.vue';
import CreateAccount from '../components/account/CreateAccount.vue';
import UserAccountList from '../components/account/UserAccountList.vue';


//USER IMPORTS/////////////////////////////////////////////////////////
import UserList from '../components/user/UserList.vue';
import EditUser from '../components/user/EditUser.vue';
import CreateUser from '../components/user/CreateUser.vue';

import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Login from '../components/Login.vue';
import AdminPanel from '../components/AdminPanel.vue';
import CreateTransaction from '../components/transactions/CreateTransaction.vue';
import TransactionList from '../components/transactions/TransactionList.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: Home },
    { path: '/users', component: UserList },
    { path: '/edituser/:id', component: EditUser, props: true  },
    {
      path: '/createaccount/:userId',
      name: 'CreateAccount',
      component: CreateAccount
    }, 
    { path: '/useraccounts', component: UserAccountList },   
    { path: '/users', component: CreateAccount },
    //USER ROUTES/////////////////////////////////////////////////////////
    { path: '/register', component: CreateUser },
    { path: '/edituser/:id', component: EditUser, props: true  },

    { path: '/:notFound(.*)', component: Home},
    { path: '/products', component: ProductList },
    { path: '/accounts', component: AccountList },
    { path: '/auth/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true  },
    { path: '/adminpanel', component: AdminPanel},
    {path: '/transactions', component: TransactionList},
    {path: '/createtransaction', component: CreateTransaction}
   
  ]
});

export default router;


