<template>
    <div>
        <div class="other-page-header" style="background-image: url('assets/img/daniel-olahh.jpg');">
            <div class="filter"></div>
            <div class="container">
                <div class="motto text-left">
                    <h1>ABOUT</h1>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="section landing-section">
                <div class="container">
                    <h1 class="text-center title-uppercase">About UNIAMS.</h1>
                        <p>UNIAMS is a platform that gives any user the power to replace outdated and achaic process of record keeping and presence validation at any event, meeting, function, or daily office checkins. UNIAMS is web based but very mobile responsive works very well on tablets and smartphones, helping companies, organizations and event managers collect information across their organization, share graphical and data focused reports for instant insight and guide on decision making with regards to business operations.</p>

                        <p>Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions. </p>

                        <h3 class="title-uppercase">We <i class="fa fa-heart icon-danger"></i> &nbsp; what we do.</h3>
                        <p>Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
                        <h2 class="text-center creators">Creators</h2>
                        <div class="row">
                            <div class="col-md-4 col-sm-4">
                                <div class="card card-user card-plain">
                                    <div class="image image-plain"></div>
                                    <div class="content">
                                        <a href="#">
                                            <div class="author">
                                                <img class="avatar border-gray" src="assets/img/cristina.jpg" alt="..."/>

                                                <h4 class="title">Cristina Conacel<br />
                                                    <small>Web Designer</small>
                                                </h4>
                                            </div>
                                        </a>
                                        <p class="description text-center">
                                        This is one of our team members. She's dedicated, talented and creative. Her work is extremely useful inside the team. You can see more if you check her stuff. <a href="#" class="link-danger">@conacelelena</a>
                                        </p>
                                    </div>
                                </div> <!-- end card -->
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="card card-user card-plain">
                                    <div class="image image-plain"></div>
                                    <div class="content">
                                        <a href="#">
                                            <div class="author">
                                                <img class="avatar border-gray" src="assets/img/banks.jpg" alt="..."/>

                                                <h4 class="title">Tyra Banks<br />
                                                    <small>Singer/Songwritter</small>
                                                </h4>
                                            </div>
                                        </a>
                                        <p class="description text-center">
                                        This is one of our team members. She's dedicated, talented and creative. Her work is extremely useful inside the team. You can see more if you check her stuff. <a href="#" class="link-danger">@banks</a>
                                        </p>
                                    </div>
                                </div> <!-- end card -->
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <div class="card card-user card-plain">
                                    <div class="image image-plain"></div>
                                    <div class="content">
                                        <a href="#">
                                            <div class="author">
                                                <img class="avatar border-gray" src="assets/img/chet_faker_2.jpg" alt="..."/>

                                                <h4 class="title">Chet Faker <br />
                                                    <small>Artist and Music Composer</small>
                                                </h4>
                                            </div>
                                        </a>
                                        <p class="description text-center">
                                        Chet Faker is one of the co-founders and drives the technical strategy of the platform, customer support and brand. He is level-headed, smart and with a taste for simple, aesthetic design. <a href="#" class="link-danger">@chetfaker</a>
                                        </p>
                                    </div>
                                </div> <!-- end card -->
                            </div>
                        </div>
                        <h3 class="more-info">Need more information?</h3>
                        <div class="row">
                            <div class="col-md-4 col-sm-6">
                                <a href="#">
                                    <div class="card">
                                        <div class="content text-center">
                                            <h4 class="title text-center">Press Information</h4>
                                            <p class="description">Download news about us, company info and press communication.</p>
                                        </div>
                                    </div> <!-- end card -->
                                </a>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <a href="#">
                                    <div class="card">
                                        <div class="content text-center">
                                            <h4 class="title text-center"> Logos & Resources</h4>
                                            <p class="description">Official graphical resources including printed material and logo.</p>
                                        </div>
                                    </div> <!-- end card -->
                                </a>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <a href="#">
                                    <div class="card">
                                        <div class="content text-center">
                                            <h4 class="title text-center">Contact Us</h4>
                                            <p class="description">If you want to find out more about what we do, send us an email.</p>
                                        </div>
                                    </div> <!-- end card -->
                                </a>
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
        mounted() {
            console.log('Component mounted.');
            // this.User();
        },
        methods: {
          User(){
            axios.get('api/users')
              .then(response => {
                  this.$router.push({name: 'home'});
              }).catch(error => {
                  //this.$router.push({name: 'index'});
              });
          },
        }
    }
</script>
