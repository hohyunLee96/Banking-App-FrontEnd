import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import AccountList from '../components/account/AccountList.vue';
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
    { path: '/:notFound(.*)', component: Home},
    { path: '/products', component: ProductList },
    { path: '/accounts', component: AccountList },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true  },
    { path: '/adminpanel', component: AdminPanel},
    {path: '/transactions', component: TransactionList},
    {path: '/createtransaction', component: CreateTransaction}
   
  ]
})

export default router
