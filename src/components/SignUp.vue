<template>
    <div class="main">
        <div class="section landing-section">
            <div class="filter-black"></div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12" style="margin-top:50px;">
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-umbrella"></i>
                            </div>
                            <div class="description">
                                <h3> We've got you covered </h3>
                                <p>Larger, yet dramatically thinner. More powerful, but remarkably power efficient. Everything you need in a single case.</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-map"></i>
                            </div>
                            <div class="description">
                                <h3> Clear Directions </h3>
                                <p>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-lock"></i>
                            </div>
                            <div class="description">
                                <h3> We value your privacy </h3>
                                <p>Completely synergize resource taxing relationships via premier niche markets.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                        <div class="card card-register">
                            <h3 class="title-logo">logo</h3>
                            <h4 class="title">Create free account</h4>
                            <div class="social-line text-center">
                                <a href="" class="btn btn-neutral btn-facebook btn-just-icon">
                                    <i class="fa fa-facebook-square"></i>
                                </a>
                                <a href="" class="btn btn-neutral btn-google btn-just-icon">
                                    <i class="fa fa-google-plus"></i>
                                </a>
                            </div>
                            <hr>
                            <form class="register-form" method="POST" action="#" @submit.prevent="register">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label class="pull-left">Name</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-single-02"></i>
                                            </span>
                                            <input id="name" type="text" class="form-control" name="name" placeholder="Full Name" required data-toggle="tooltip" data-placement="right" title="this field is required" autofocus
                                    v-model="user.name">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="pull-left">Phone Number</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-mobile"></i>
                                            </span>
                                            <input id="phone" type="tel" class="form-control" name="phone" data-toggle="tooltip" data-placement="right" title="this field is required" required
                                    v-model="user.phone">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="pull-left">Email</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-email-85"></i>
                                            </span>
                                            <input id="email" type="email" class="form-control" name="email" data-toggle="tooltip" data-placement="right" title="this field is required" required
                                    v-model="user.email">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="pull-left">Purpose</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-bulb-63"></i>
                                            </span>
                                            <select class="form-control" name="Purpose" data-toggle="tooltip" data-placement="right" title="this field is required" v-model="user.purpose" required>
                                                <option>--select--</option>
                                                <option class="" value="1">Cooperate</option>
                                                <option class="" value="2">Personal</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="pull-left">Password</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-key-25"></i>
                                            </span>
                                            <input type="password" class="form-control" placeholder="Password" v-model="user.password" name="password" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 ml-auto mr-auto">
                                    <button type="submit" class="btn btn-danger btn-block btn-round"><i v-if="load ==1" class="fa fa-spinner fa-spin spin-small"></i>Signup</button>
                                    </div>
                                </div>
                            </form>
                            <div class="forgot">
                                <br>
                                <p>By creating an account, you agree to AMP's <a href="#" class="nav-item">Terms of Service and Privacy Policy.</a></p>
                                <hr>
                                <span class="text">Already have an account? <router-link :to="{ name: 'login' }" class="nav-link"><i class="nc-icon nc-key-25"></i> SignIn</router-link> Here</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                load: 0,
                apiStatus: '',
                message: '',
                user: {
                    name: '',
                    email: '',
                    phone: '',
                    purpose:'',
                    password: ''
                }
            }
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
            register(){
                this.load= 1;
                let component = this;
                axios.post('http://localhost:8000/api/register', this.user)
                    .then(function (response) {
                        if (response.data.msg === "success" ) {
                            component.user.email = '';
                            component.user.password = '';
                            component.user.name = '';
                            component.user.phone = '';
                            component.user.purpose = '';
                            component.$swal({
                              title: 'Success',
                              text: response.data.success,
                              type: 'success',
                              showConfirmButton: false,
                              timer: 3000
                            });
                            component.$router.push('login');
                        }else{
                            component.$swal({
                              title: 'ERROR',
                              text: response.data.error,
                              type: 'error',
                              showConfirmButton: false,
                              timer: 3000
                            });

                        }component.load= 0;
                    }, function (response) {
                        component.$swal({
                          title: 'ERROR',
                          text: 'Ooops! An Error Occured!',
                          type: 'error',
                          showConfirmButton: false,
                          timer: 2000
                        });
                    });
            }
        }
    }
</script>
