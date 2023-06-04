import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import AccountList from '../components/account/AccountList.vue';

//USER IMPORTS/////////////////////////////////////////////////////////
import UserList from '../components/user/UserList.vue';
import EditUser from '../components/user/EditUser.vue';
import CreateUser from '../components/user/CreateUser.vue';

import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Login from '../components/Login.vue';
import AdminPanel from '../components/AdminPanel.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', component: Home },

    //USER ROUTES/////////////////////////////////////////////////////////
    { path: '/users', component: UserList },
    { path: '/register', component: CreateUser },
    { path: '/edituser/:id', component: EditUser, props: true  },

    { path: '/products', component: ProductList },
    { path: '/accounts', component: AccountList },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true  },
    { path: '/adminpanel', component: AdminPanel}
  ]
})

export default router
