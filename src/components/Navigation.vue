<template>
  <div>
    <header>
      <nav class="pb-md-0 pt-md-3 py-4">
        <div class="branding">
          <router-link :to="{ name: 'Home' }"
            ><span @click="(mobileNav = false), (showContainer = false)"
              >FireBlogs</span
            ></router-link
          >
        </div>
        <div v-if="!mobile">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }"
              ><span @click="(mobileNav = false), (showContainer = false)"
                >Home</span
              ></router-link
            >
            <router-link class="link" :to="{ name: 'Blogs' }"
              ><span @click="(mobileNav = false), (showContainer = false)"
                >Blogs</span
              ></router-link
            >
            <router-link class="link" v-if="admin===newAdmin && isLogin" :to="{name:'CreatePost'}"
              ><span @click="(mobileNav = false), (showContainer = false)"
                >CreatePost</span
              ></router-link
            >
            <span
              @click="showContainer = !showContainer"
              v-if="currentUser"
              class="account"
              >{{ this.$store.state.profileInitials }}</span
            >
            <router-link class="link" v-else :to="{ name: 'Login' }"
              ><span @click="(mobileNav = false), (showContainer = false)"
                >Login/Regsiter</span
              ></router-link
            >
          </ul>
        </div>
      </nav>

      <menu-icon class="menuBar" @click="toggleNav" v-if="mobile"></menu-icon>
      <transition name="mobile-nav" v-if="mobileNav">
        <ul class="mobile-nav">
          <router-link class="link" to="/home"
            ><span @click="(mobileNav = false), (showContainer = false)"
              >Home</span
            >
          </router-link>
          <router-link class="link" to="/blogs"
            ><span @click="(mobileNav = false), (showContainer = false)"
              >Blogs</span
            ></router-link
          >
          <router-link class="link" :to="{name:'CreatePost'}" v-if="admin===newAdmin && isLogin"
            ><span @click="(mobileNav = false), (showContainer = false)"
              >CreatePost</span
            ></router-link
          >

          <span
            @click="showContainer = !showContainer"
            class="account ml-2"
            v-if="currentUser"
            >{{ this.$store.state.profileInitials }}</span
          >
          <router-link class="link" v-else to="/login"
            ><span @click="(mobileNav = false), (showContainer = false)"
              >Login/Regsiter</span
            ></router-link
          >
        </ul>
      </transition>
    </header>
    <div class="altMenu" v-if="showContainer">
      <div class="d-flex justify-content-between">
        <span class="account ml-2 d-inline-block">{{
          this.$store.state.profileInitials
        }}</span>
        <div class="d-flex flex-column nameSection">
          <p class="d-inline-block">{{ fullName }}</p>
          <p class="d-inline-block">@{{ this.$store.state.profileUserName }}</p>
          <p class="d-inline-block">{{ this.$store.state.profileEmail }}</p>
        </div>
      </div>

      <div class="linkSection">
        <router-link
          to="/profile"
          class="text-white d-block mb-2 text-decoration-none"
          ><i class="far fa-user-circle"></i>
          <span @click="(showContainer = false), (mobileNav = false)">
            Profile</span
          ></router-link
        >
        <router-link
          to="/admin"
          class="text-white d-block mb-2 text-decoration-none"
          v-if="admin===newAdmin"
          ><i class="fas fa-user-cog"></i>
          <span @click="(showContainer = false), (mobileNav = false)">
            Admin</span
          ></router-link
        >
        <router-link to="/" class="text-white text-decoration-none"
          ><i class="fas fa-sign-out-alt"></i
          ><span @click="logOut"> Log-out</span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  components: {
    menuIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      showContainer: false,
    };
  },
  computed: {
    fullName() {
      return (
        this.$store.state.profileFirstName[0].toUpperCase() +
        this.$store.state.profileFirstName.slice(1).toLowerCase() +
        " " +
        this.$store.state.profileLastName[0].toUpperCase() +
        this.$store.state.profileLastName.slice(1).toLowerCase()
      );
    },
    currentUser() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileEmail;
    },

    newAdmin(){
     return  this.$store.state.currentAdmin
    },
    isLogin(){
      return this.$store.state.isLogin
    }

  },
  created() {
    this.checkscreen();
    window.addEventListener("resize", this.checkscreen);
  },
  methods: {
    checkscreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 768) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },

    async logOut() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
        
           
        });
  
     await this.$store.commit('isLogged',false)
      this.showContainer = false;
      this.mobileNav = false;
    },

    toggleNav() {
      this.mobileNav = !this.mobileNav;
      this.showContainer = false;
    },
  },
};
</script>

<style lang="scss">
.altMenu {
  position: absolute;
  right: 20px;
  z-index: 110;
  width: 300px;
  top: 70px;
  background: #000;
  color: #fff;
  padding: 20px;

  @media screen and (max-width: 768px) {
    top: 185px;
    width: 240px;
    left: 80px;
    padding: 10px;
  }

  span:first-child {
    display: inline-block;
    background: #fff;
    width: 40px;
    height: 40px;
    color: #000;
    border-radius: 50%;
    text-align: center;
    padding-top: 6px;
    cursor: pointer;
  }

  p {
    font-size: 12px;
  }
  a {
    cursor: pointer;
  }
  .nameSection {
    position: relative;
    width: 150px;
    &::after {
      content: "";
      position: absolute;
      bottom: 10px;
      left: -123px;
      background: #fff;
      height: 1px;
      width: 190%;

      @media screen and (max-width: 768px) {
        width: 150%;
        left: -70px;
      }
    }
  }
}
header {
  padding: 0 25px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 200;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s ease;

    &:hover {
      color: #1eb8b8;
    }
  }

  span.account {
    display: inline-block;
    background: #000;
    width: 40px;
    height: 40px;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    padding-top: 6px;
    cursor: pointer;
  }

  nav {
    display: flex;
    justify-content: space-between;
    // padding: 25px 0px;

    .branding {
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
    z-index: 100;
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
.mobile-nav-leave-active {
  transition: all 0.5s linear;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0px);
}
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
