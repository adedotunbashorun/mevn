<template>
    <div class="main">
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
            this.Activate();
        },
        methods: {
            Activate(){
              this.show = true;
              axios.get('http://localhost:8000/api/activate/'+this.$route.params.id)
                .then(response => {
                    component.$swal({
                      title: 'Message',
                      text: response.data.msg,
                      type: 'info',
                      showConfirmButton: false,
                      timer: 5000
                    });
                    this.show = false;
                    component.$router.push('login');
                }).catch(error => {
                    //this.$router.push({name: 'index'});
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
