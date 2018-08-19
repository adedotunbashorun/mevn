<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <link href="./assets/css/paper-kit.css?v=2.1.0" rel="stylesheet"/>
    <link href="./assets/css/demo.css" rel="stylesheet" />
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="./assets/css/nucleo-icons.css" rel="stylesheet">
    <top-navbar></top-navbar>
    <router-view/>
    <footer class="footer section-dark">
        <div class="container">
            <div class="row">
                <nav class="footer-nav">
                    <ul>
                        <li><a href="http://codemansion.org">&copy;Codemansion 2017, All Rights Reserved</a></li>
                    </ul>
                </nav>
                <!--div class="credits ml-auto">
                    <span class="copyright">
                        <i class="fa fa-heart heart"></i>Theme: Creative Tim
                    </span>
                </div-->
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import TopNavbar from './components/Layout/TopNavbar.vue'
import Footer from './components/Layout/Footer'
export default {
  name: 'App',
  components: {
    TopNavbar,
    Footer
  }
}
</script>

<style>
@import url('assets/css/bootstrap.min.css');
@import url('assets/css/demo.css');
@import url('assets/css/nucleo-icons.css');
@import url('assets/css/paper-kit.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
