<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top">
        <div class="container">
            <div class="navbar-translate">
                <a class="navbar-brand" >UNIAMS</a>
                <button class="navbar-toggler navbar-toggler-right navbar-burger" type="button" data-toggle="collapse" data-target="navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar"></span>
                    <span class="navbar-toggler-bar"></span>
                    <span class="navbar-toggler-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarToggler">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"><i class="nc-icon nc-bank"></i> Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'about' }" class="nav-link"><i class="nc-icon nc-paper"></i> About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'features' }" class="nav-link"><i class="nc-icon nc-paper"></i> Features</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'contact' }" class="nav-link"><i class="nc-icon nc-map-big"></i> Contact</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link"><i class="nc-icon nc-key-25"></i> SignIn</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'signup' }" class="nav-link"><i class="nc-icon nc-badge"></i> SignUp</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="tooltip" title="Follow us on Twitter" data-placement="bottom" href="https://twitter.com/uniams" target="_blank">
                            <i class="fa fa-twitter"></i>
                            <p class="d-lg-none">Twitter</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="tooltip" title="Like us on Facebook" data-placement="bottom" href="https://www.facebook.com/uniams" target="_blank">
                            <i class="fa fa-facebook-square"></i>
                            <p class="d-lg-none">Facebook</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" rel="tooltip" title="Follow us on Instagram" data-placement="bottom" href="https://www.instagram.com/uniams" target="_blank">
                            <i class="fa fa-instagram"></i>
                            <p class="d-lg-none">Instagram</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'TopNavbar'
}
</script>
