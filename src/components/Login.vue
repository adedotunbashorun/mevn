<template>
    <div class="main">
            <div class="section section-login landing-section" style="background-image: url('assets/img/login-image.jpg');">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 ml-auto mr-auto">
                            <div class="card card-register">
                                <h3 class="title">Sign In</h3>
                                <div class="social-line text-center">
                                    <a href="#" class="btn btn-neutral btn-facebook btn-just-icon">
                                        <i class="fa fa-facebook-square"></i>
                                    </a>
                                    <a href="#" class="btn btn-neutral btn-google btn-just-icon">
                                        <i class="fa fa-google-plus"></i>
                                    </a>
                                    <a href="#" class="btn btn-neutral btn-twitter btn-just-icon">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                </div>
                                <form class="register-form" method="POST" action="#" @submit.prevent="login">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Email</label>
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="nc-icon nc-email-85"></i>
                                                </span>
                                                <input id="email" type="email" class="form-control" name="email" required autofocus
                                       v-model="authenticate.email">
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label>Password</label>
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="nc-icon nc-key-25"></i>
                                                </span>
                                                <input id="password" type="password" class="form-control" name="password" required
                                       v-model="authenticate.password">
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-md-offset-4">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember"> Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 ml-auto mr-auto">
                                           <button type="submit" class="btn btn-danger btn-block btn-round" id="btnLogin"
                                            data-loading-text=""><i v-if="show ==true" class="fa fa-spinner fa-spin spin-small"></i>
                                             Sign In
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <div class="forgot">
                                    <router-link class="btn btn-link btn-danger" :to="{ name: 'forget' }"><i class="icon-padlock"></i> Forgot password?</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <loading
            :show="show"
            :label="label"
            :overlay="overlay">
        </loading>
        </div>
</template>
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
<script>
    import axios from 'axios';
    import * as MutationTypes from '../store/auth/MutationTypes';
    import loading from 'vue-full-loading'
    export default {
        data() {
            return {
                show: false,
                label: 'Loading...',
                overlay: true,
                apiStatus: '',
                message: '',
                authenticate: {
                    email: '',
                    password: ''
                }
            }
        },
        components: {
            loading
        },
        mounted() {
            this.User();
        },
        methods: {
            User(){
              axios.get('http://localhost:8080/api/user')
                .then(response => {
                    this.$router.push({name: 'home'});
                }).catch(error => {
                    //this.$router.push({name: 'index'});
                });
            },
            login() {
                this.show = true;
                let authenticate = {
                    email: this.authenticate.email,
                    password: this.authenticate.password
                };
                let component = this;
                axios.post('http://localhost:8080/api/login', authenticate)
                    .then(function (response) {
                        if (response.data.meta.status === "ok") {
                            component.$store.dispatch(MutationTypes.SAVE_USER, response);
                            component.$swal({
                              title: 'Success',
                              text: response.data.meta.message,
                              type: 'success',
                              showConfirmButton: false,
                              timer: 2000
                            });
                            component.show = false;
                            component.$router.push({name: 'home'});

                        } else {
                            component.$swal({
                              title: 'ERROR',
                              text: response.data.meta.message,
                              type: 'error',
                              showConfirmButton: false,
                              timer: 3000
                            });
                            component.show = false;
                            component.$notify({
                                type:'warn',
                                group: 'auth',
                                title: 'Important message',
                                text: response.data.meta.message,
                                duration: 3000,
                                speed: 300
                              });
                        }
                    }, function (response) {
                        component.show = false;
                        component.$swal({
                          title: 'Eror',
                          text: 'an error occured!',
                          type: 'error',
                          showConfirmButton: false,
                          timer: 2000
                        });
                        console.log(response);
                    });
            }
        }
    }
</script>
<style>
    .spin-small {
        font-size: 20px;
        height: 20px;
        width: 20px;
    }
    .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  font-size: 12px;
  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
}
</style>
