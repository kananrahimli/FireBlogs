<template>
    <div id="app" v-if="showApp">
      <Navigation v-if="showNavigation"/>
      <router-view  ></router-view>
      <Footer v-if="showNavigation"/>
    </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name:'app',
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      showNavigation: true,
      showApp:false
    };
  },
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  methods:{
    checkRoute(){
       if (
      this.$route.fullPath ==="/login" ||
      this.$route.fullPath ==="/register" ||
      this.$route.fullPath === "/reset-password"
    ) {
      this.showNavigation=false
    }else{
      this.showNavigation=true
    }
    },

    checkApp(){
     setTimeout(() => {
          this.showApp=true
        }, 1500);
    }
  },
   created(){
      this.$store.dispatch('getCurrentBlogs')
      console.log(this.$store.getters.sampleCards);
   this.checkRoute()
    firebase.auth().onAuthStateChanged((user)=>{
     
       this.$store.dispatch('updateUser',user)
      if(user){
        this.$store.dispatch('getCurrentUser')
        this.$store.dispatch('getCurrentAdmin')
      }
    }) 
    this.checkApp()
    
   
  
    // if(window.location){
    //   this.showApp=false
    // }

   
    
  },
  updated() {

  this.checkRoute()
    firebase.auth().onAuthStateChanged((user)=>{
      this.$store.dispatch('updateUser',user)
      if(user){
        this.$store.dispatch('getCurrentUser')
        this.$store.dispatch('getCurrentAdmin')
         this.$store.commit('isLogged',true)
      }
    })
    this.checkApp()
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}
// .container {
//   max-width: 1440px;
//   margin: 0 auto;
// }
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}

.error{
  color: red;
}

@media screen and (max-width: 768px) {
  // .app{
  //    overflow-x:hidden;
  // }
}
</style>
