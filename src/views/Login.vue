<template>
  <div id="login" class="row">
     <base-dialog
      :show="showError"
      @close="closeModal"
      title="Something went wrong"
    >
      <h4>{{ errMsg }}</h4>
    </base-dialog>
    <div class="col-md-5 justify-content-center d-flex align-items-center">
      <div class="d-flex flex-column">
        <p class="mx-auto">
          Don't Have an account?
          <router-link to="/register" class="text-dark">{{ "Register" }}</router-link>
        </p>

        <h1 class="my-4">Login to FireBlog</h1>

        <form>
          <div class="input-groups d-flex flex-column ">
            <div class="email">
              <input type="email" class="form-control my-2 " placeholder="Email" v-model="email" />
            <i class="far fa-envelope"></i>
            </div>
            <div class="password">
              <input type="password" class="form-control" placeholder="Password"  v-model="password"/>
              <i class="fas fa-lock"></i>
            </div>

          </div>
        </form>

        <router-link to="/reset-password" class="text-dark text-decoration-none mx-auto my-4"
          >Forgot your password?</router-link
        >
    <base-spinner v-if="showSpinner"></base-spinner>
        <button @click="login" class="mt-5">Sign in </button>
        
      </div>
    </div>
    <div class="col-7 d-none d-md-block">
        <!-- <img src="../assets/background.png" class="img-fluid" alt=""> -->
    </div>
  </div>
</template>

<script>

import BaseDialog from "../components/BaseDialog.vue";
import BaseSpinner from "../components/BaseSpinner.vue";
export default {
  components: { BaseDialog,BaseSpinner },
  data(){
      return{
          email:'',
          password:'',
          showSpinner:false,
          showError:false,
          errMsg:''
      }
  },
 
  methods:{
   async login(){
     if(
        this.email =="" || this.password =="" 
      ) {
      
        (this.showError = true), (this.errMsg = "Please fill all section");
        return;
      }

     else{
        this.showSpinner=true
      try {
       await this.$store.dispatch('login',{email:this.email,password:this.password})
       await this.$store.dispatch('getCurrentUser')
       await this.$store.commit('isLogged',true)
        this.$router.push('/home')
        
      } catch (error) {
        this.showSpinner=false,
        this.showError=true,
        this.errMsg=error
      }
     }
     
    },
    closeModal(){
      this.showError=false
    }
  },
  
};
</script>


<style lang="scss" scoped>
a{
 text-decoration:underline black;
}

#login {
  height: 100vh;
   button {
    text-decoration: none;
    color: white;
    font-size: 18px;
    padding: 6px 18px;
    background: black;
    align-self: center;
    border-radius: 50px;
    margin: 16px 0px;
  }
  input {
    // max-width: 65%;
    height: 50px;
    padding-left: 30px;
    &:focus{
        outline: transparent !important;
        outline-color: transparent !important;
    }
  }
  .email{
    position: relative;
    i{
      position: absolute;
      top: 40%;
      left: 10px;
    }
  }
  .password{
    position: relative;
    i{
      position: absolute;
      top: 35%;
      left: 10px;
    }
  }
  .col-5 {
    // padding: 150px 0px;
    h1 {
      font-size: 48px;
      font-weight: 900;
    }
    p {
      font-size: 18px;
      display: inline-block;
      a {
        text-decoration: underline;
      }
    }
  }

  .col-7{
      height: 100vh;
      background-image: url('../assets/background.png');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      clip-path: polygon(10% 0, 100% 0%, 100% 100%, 0% 100%);
  }
}
</style>