// eslint-disable-next-line to ignore the next line.
/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Index from '@/components/Index'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Features from '@/components/Features'
import Forget from '@/components/Forget'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/documentation',
            name: 'features',
            component: Features
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        },
        {
            path: '/forget_password',
            name: 'forget',
            component: Forget
        },
        {
            path: '/dashboard',
            name: 'Home',
            component: Home
        }
    ]
})