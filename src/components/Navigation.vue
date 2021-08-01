<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link :to="{ name: 'Home' }">FireBlogs</router-link>
      </div>
      <div class="nav-links" v-if="!mobile">
        <ul>
          <router-link class="link" to="/home">Home</router-link>
          <router-link class="link" to="/blogs">Blogs</router-link>
          <router-link class="link" to="">CreatePost</router-link>
          <router-link class="link" to="/login">Login/Regsiter</router-link>
        </ul>
      </div>
    </nav>
    <menu-icon class="menuBar" @click="toggleNav" v-if="mobile"></menu-icon>
    <transition name="mobile-nav" v-if="mobileNav">
      <ul class="mobile-nav">
        <router-link class="link" to="/home">Home</router-link>
        <router-link class="link" to="/blogs">Blogs</router-link>
        <router-link class="link" to="">CreatePost</router-link>
        <router-link class="link" to="/login">Login/Regsiter</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
export default {
  components: {
    menuIcon,
  },
  data(){
    return{
      mobile:null,
      mobileNav:null,
      windowWidth:null
    }
  },
    created(){
      window.addEventListener('resize',this.checkscreen)
      this.checkscreen()
    },
    methods:{
    checkscreen(){
      this.windowWidth=window.innerWidth
      if(this.windowWidth<768){
        this.mobile=true
      }else{
        this.mobile=false
      }
    },

    toggleNav(){
      this.mobileNav=!this.mobileNav
    }
  }
};
</script>

<style lang="scss">
header {
  padding: 0 25px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    padding: 25px 0px;

    .branding {
      display: flex;
      align-items: center;

      a {
        text-decoration: none;
        font-weight: 600;
        color: black;
        font-size: 24px;
      }
    }

    .navlinks {
      position: relative;
      display: flex;
    }
  }

  .menuBar {
    position: absolute;
    top: 32px;
    right: 24px;
    height: 24px;
    width: auto;
    cursor: pointer;
  }

  .mobile-nav {
    position: fixed;
    display: flex;
    flex-direction: column;
    background: #383838;
    width: 70%;
    height: 100%;
    padding: 20px;
    max-width: 250px;
    
    top: 0;
    left: 0;
    .link {
      color: #fff;
      padding: 15px;

      &:hover {
        color: #1eb8b8;
      }
    }
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active{
  transition: all 0.5s linear;
}

.mobile-nav-enter{
  transform: translateX(-250px);
}
.mobile-nav-enter-to{
  transform: translateX(0px);
}
.mobile-nav-leave-to{
  transform: translateX(-250px);
}
</style>
