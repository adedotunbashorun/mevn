<template>
    <div>
        <div class="page-header" data-parallax="true" style="background-image: url('assets/img/daniel-olahh.jpg');">
            <div class="filter"></div>
            <div class="container">
                <div class="motto text-center">
                    <h1>UNIAMS</h1>
                    <h3>let UNIAMS handle the heavy lifting with your attendance hassles and stress for you, generating easily searchable and detailed report sheet for record keeping</h3>
                    <br />
                    <router-link to="about" class="btn btn-outline-neutral btn-round"><i class="nc-icon nc-single-copy-04"></i> Know More</router-link>
                    <router-link to="signup" class="btn btn-outline-neutral btn-round"><i class="nc-icon nc-badge"></i> SignUp</router-link>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="section text-center">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <h2 class="title">Let's talk UNIAMS</h2>
                            <h5 class="description">UNIAMS is an abbreviation of Universal Attendance management System that is aimed at streamlining paper work and achaic data collection process when it comes to attendance taking at events, meetings, and functions, for individuals, companies, organizations, and Government parastatals to take and keep record for sleek and on the go decision making and the demand for fresh data</h5>
                            <br>
                            <router-link to="features" class="btn btn-danger btn-round">See Details</router-link>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="row">
                        <div class="col-md-3" style="margin-bottom:1.2em;">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="nc-icon nc-vector"></i>
                                </div>
                                <div class="description">
                                    <h4 class="info-title">Beauty & Flexibilty</h4>
                                    <p class="description text-justify">Flexibilty at its peak, create your own forms, define the data you want to collect and save, capture attendee images, manage event, receive reports at the end of the day/event,schedule events, and schedule sms and email broadcasts, all without the need for technical know-how, <strong>flexible is the new beauty</strong></p>
                                    <router-link to="features" class="btn btn-danger btn-round">See More</router-link>
                                </div>
                            </div>
                        </div><br/>
                        <div class="col-md-3" style="margin-bottom:1.2em;">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="nc-icon nc-planet"></i>
                                </div>
                                <div class="description">
                                    <h4 class="info-title">Ideas for millenials</h4>
                                    <p class="description text-justify">Spend your time generating income and taking the big bold decisions. You don't have to worry of how to track attendance for a function, meeting or event, UNIAMS will take care of that and keep the record neat, simple and readable.</p>
                                    <router-link to="features" class="btn btn-danger btn-round">See More</router-link>
                                </div>
                            </div>
                        </div><br/>
                        <div class="col-md-3" style="margin-bottom:1.2em;">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="nc-icon nc-chart-bar-32"></i>
                                </div>
                                <div class="description">
                                    <h4 class="info-title">Statistics & Records</h4>
                                    <p class="description text-justify">Receive reports and statistics of your events in the most easily readable format (PDF / Excel Spreadsheet) at the end of every active event day or at the end of the event, translation and brief ups can't be any easier, can they?</p>
                                    <router-link to="features" class="btn btn-danger btn-round">See More</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3" style="margin-bottom:1.2em;">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="nc-icon nc-layout-11"></i>
                                </div>
                                <div class="description">
                                    <h4 class="info-title">Sleek design</h4>
                                    <p class="description text-justify">the kind of design and workflow that keeps you engolfed into what you're doing, on smartphone, tablet or PC, reponsive design makes UNIAMS fit into any screen size, plus a mobile App that gives you a native mobile App feel and eliminates the barrier to time and place limitation.</p>
                                    <router-link to="documentation" class="btn btn-danger btn-round">See More</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section section-dark text-center">
            <div class="container">
                <div class="col-md-8 offset-md-2 text-center">
                    <h2 class="title">Want more details?</h2>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card  card-plain">
                            <div class="card-body">
                                <p class="card-description text-center">
                                Teamwork is so important that it is virtually impossible for you to reach the heights of your capabilities or make the money that you want without becoming very good at it.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card  card-plain">
                            <div class="card-body">
                                <p class="card-description text-center">
                                A group becomes a team when each member is sure enough of himself and his contribution to praise the skill of the others. No one can whistle a symphony. It takes an orchestra to play it.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card  card-plain">
                            <div class="card-body">
                                <p class="card-description text-center">
                                The strength of the team is each individual member. The strength of each member is the team. If you can laugh together, you can work together, silence isn’t golden, it’s deadly.
                                </p>
                            </div>
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
        mounted() {
            this.User();
            console.log('Component mounted.');
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
        }
    }
</script>
