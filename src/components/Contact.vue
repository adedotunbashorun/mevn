<template>
    <div>
        <div class="other-page-header" style="background-image: url('assets/img/daniel-olahh.jpg');">
            <div class="filter"></div>
            <div class="container">
                <div class="motto text-left">
                    <h1>CONTACT</h1>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="section landing-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212437.05001921975!2d7.254267752411617!3d9.054646210923504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f4cd62fd9%3A0x53bd17b4a20ea12b!2sAbuja!5e1!3m2!1sen!2sng!4v1510994089771" width="100%" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>
                        </div>
                        <div class="col-md-8">
                            <h2 class="text-center">Keep in touch with Us?</h2>
                            <form class="contact-form">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="pull-left">Name</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-single-02"></i>
                                            </span>
                                            <input type="text" class="form-control" placeholder="Name" v-model="authenticate.name">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="pull-left">Email</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-email-85"></i>
                                            </span>
                                            <input type="text" class="form-control" placeholder="Email" v-model="authenticate.email">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label class="pull-left">Subject</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="nc-icon nc-alert-circle-i"></i>
                                            </span>
                                            <input type="text" class="form-control" placeholder="Subject" v-model="authenticate.subject">
                                        </div>
                                    </div>
                                </div>
                                <label class="pull-left">Message</label>
                                <textarea class="form-control" rows="4" placeholder="What could be bothering you? lay it on us...." v-model="authenticate.message"></textarea>
                                <div class="row">
                                    <div class="col-md-4 ml-auto mr-auto">
                                        <button class="btn btn-danger btn-lg btn-fill" type="button" @click="Contact">Send <i class="nc-icon nc-send"></i></button>
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
    import axios from 'axios'
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
                    name: '',
                    email: '',
                    subject:'',
                    message:''
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
            Contact() {
                this.show = true;
                let authenticate = {
                    name: this.authenticate.name,
                    email: this.authenticate.email,
                    subject: this.authenticate.subject,
                    message: this.authenticate.message,
                };
                let component = this;
                axios.post('http://localhost:8000/api/contact', authenticate)
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
                          authenticate = ''
                          //component.$router.push({name: 'index'});
                        }
                    }, function (response) {
                        component.show = false;
                        component.$swal({
                              title: 'Eror',
                              text: 'an error occured! Please enter a valid email address',
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
