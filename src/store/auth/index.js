import * as MutationTypes from './MutationTypes';
import Cookies from "js-cookie";
import axios from "axios";

const state = {
    user: {
        name: '',
        email:'',
        purpose:'',
        image:'',
        upload:'',
        created_at:''
    },
    token: Cookies.get('auth_token')
};

const mutations = {
    [MutationTypes.SAVE_USER](state, response) {
        Cookies.set('auth_token', response.data.data.token);
        state.token = response.data.data.token;
        state.user.name = response.data.data.user.name;
        state.user.upload =response.data.data.user.name;
    },
    [MutationTypes.LOGOUT](state) {
        state.token = '';
        state.user.name = '';
        state.user.email = '';
        state.user.purpose = '';
        state.user.image = '';
        state.user.created_at = '';
        Cookies.remove('auth_token')
    },
    [MutationTypes.FETCH_USER_SUCCESS](state, user) {
        state.user.name = user.name;
        state.user.email = user.email;
        state.user.purpose = user.purpose;
        state.user.image = user.image;
        state.user.created_at = user.created_at;
        state.user.upload = "images/profile/"+user.image;
    },
    [MutationTypes.FETCH_USER_FAILURE](state) {
        state.user.name = '';
        state.user.email = '';
        state.user.purpose = '';
        state.user.image = '';
        state.user.created_at = '';
        state.token = '';
    },
    [MutationTypes.UPDATE_USER](state, user) {
        state.user.name = user.name;
        state.user.email = user.email;
        state.user.purpose = user.purpose;
        state.user.image = user.image;
        state.user.upload = "images/profile/"+user.image;
        state.user.created_at = user.created_at;
    }
};
const actions = {
    [MutationTypes.SAVE_USER]({commit}, response) {
        commit(MutationTypes.SAVE_USER, response);
    },
    [MutationTypes.LOGOUT]({commit}) {
        commit(MutationTypes.LOGOUT);
    },
    [MutationTypes.FETCH_USER_SUCCESS]({commit}, user) {
        commit(MutationTypes.FETCH_USER_SUCCESS, user);
    },
    [MutationTypes.FETCH_USER_FAILURE]({commit}) {
        commit(MutationTypes.FETCH_USER_FAILURE);
    },
    [MutationTypes.FETCH_USER]({commit}) {
        axios.get('/api/user')
            .then((response) => {
                console.log(response);
                if (response.data.meta.status==='ok'){
                    commit(MutationTypes.FETCH_USER_SUCCESS, response.data.data.user);
                }else {
                    commit(MutationTypes.LOGOUT)
                }
            });
    }
};
const getters = {
    authUser: state => state.user,
    authToken: state => state.token,
    isLoggedIn: state => state.token !== undefined
};
export default {
    state,
    mutations,
    actions,
    getters,
    
}