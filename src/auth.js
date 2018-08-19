import Vue from './app.js';
import { router } from './app.js';

export default {
    user: {
        authenticated: false,
        profile: null
    },
    check() {
        let token = localStorage.getItem('id_token')
        if (token !== null) {
            Vue.http.get(
                'api/user?token=' + token,
            ).then(response => {
                this.user.authenticated = true
                this.user.profile = response.data.data
            }, response => {
                this.error = true
                router.push({
                    name: 'home'
                })
            })
        }
    },
    register(context, name, email, password) {
        axios.post(
            'api/register', {
                name: name,
                email: email,
                purpose: purpose,
                password: password
            }
        ).then(response => {
            context.success = true
        }, response => {
            context.response = response.data
            context.error = true
        })
    },
    signin(context, email, password) {
        Vue.http.post(
            'api/signin', {
                email: email,
                password: password
            }
        ).then(response => {
            context.error = false
            localStorage.setItem('id_token', response.data.meta.token)
            Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

            this.user.authenticated = true
            this.user.profile = response.data.data

            router.push({
                name: 'dashboard'
            })
        }, response => {
            context.error = true
        })
    },
    signout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
        this.user.profile = null
        router.push({
            name: 'home'
        })
    }
}