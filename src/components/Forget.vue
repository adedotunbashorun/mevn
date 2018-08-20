<template>
    <div class="main">
            <div class="section landing-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 ml-auto mr-auto">
                            <div class="card card-register">
                                <h3 class="title">Forget Password</h3>
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
                                        <div class="col-md-6 ml-auto mr-auto">
                                           <button type="submit" class="btn btn-danger btn-block btn-round" id="btnLogin"
                                            data-loading-text=""><i v-if="show ==true" class="fa fa-spinner fa-spin spin-small"></i>
                                             Send Reset Link
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
                    email: ''
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
              axios.get('http://localhost:8000/api/user')
                .then(response => {
                    this.$router.push({name: 'home'});
                }).catch(error => {
                    //this.$router.push({name: 'index'});
                });
            },
            login() {
                this.show = true;
                let authenticate = {
                    email: this.authenticate.email
                };
                let component = this;
                axios.post('/api/forget_password', authenticate)
                    .then(function (response) {
                        if (response.data.warning) {
                            component.show = false;
                            component.$swal({
                              title: 'warning',
                              text: response.data.warning,
                              type: 'warning',
                              showConfirmButton: false,
                              timer: 2000
                            });
                          component.authenticate.email  = ''
                        }
                        if (response.data.success) {
                            component.show = false;
                            component.$swal({
                              title: 'Success',
                              text: response.data.success,
                              type: 'success',
                              showConfirmButton: false,
                              timer: 2000
                            });
                          component.authenticate.email  = ''
                          //component.$router.push({name: 'index'});
                        }
                    }, function (response) {
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
