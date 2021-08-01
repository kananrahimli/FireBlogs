<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="showNavigation"></Navigation>
      <router-view />
      <Footer v-if="showNavigation"></Footer>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Navigation,
    Footer,
  },
  data() {
    return {
      showNavigation: true,
    };
  },
  updated() {
    console.log(this.$router.currentRoute.fullPath);
    if (
      this.$router.currentRoute.fullPath == "/login" ||
      this.$router.currentRoute.fullPath == "/register" ||
      this.$router.currentRoute.fullPath == "/reset-password"
    ) {
      this.showNavigation=false
    }else{
      this.showNavigation=true
    }
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
.app {
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
