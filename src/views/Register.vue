<template>
  <div id="register" class="row">
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
          Already have an account?
          <router-link to="/login" class="text-dark">{{ "Login" }}</router-link>
        </p>

        <h1 class="my-2 text-center">Create Your FireBlog Account</h1>

        <form>
          <div class="input-groups d-flex flex-column">
            <div class="firstName">
              <input
                type="text"
                class="form-control my-2"
                placeholder="First Name"
                v-model="firstName"
              />
              <i class="far fa-user"></i>
            </div>
            <div class="lastName">
              <input
                type="text"
                class="form-control my-2"
                placeholder="Last Name"
                v-model="lastName"
              />
              <i class="far fa-user"></i>
            </div>
            <div class="userName">
              <input
                type="text"
                class="form-control my-2"
                placeholder="Username"
                v-model="userName"
              />
              <i class="far fa-user"></i>
            </div>

            <div class="email">
              <input
                type="email"
                class="form-control my-2"
                placeholder="Email"
                v-model="email"
              />
              <i class="far fa-envelope"></i>
            </div>
            <div class="password">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
              <i class="fas fa-lock"></i>
            </div>
          </div>
        </form>

        <base-spinner v-if="showSpinner"></base-spinner>

        <button class="mt-5" @click="register">Sign up</button>
      </div>
    </div>
    <div class="col-7  d-none d-md-block">
      <!-- <img src="../assets/background.png" class="img-fluid" alt=""> -->
    </div>
  </div>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import BaseSpinner from "../components/BaseSpinner.vue";

export default {
  components: { BaseDialog, BaseSpinner },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      showError: false,
      showSpinner: null,
      errMsg: "",
    };
  },
  methods: {
   async register() {
      if (
        this.email == "" ||
        this.userName == "" ||
        this.password == "" ||
        this.firstName == "" ||
        this.lastName == ""
      ) {
        (this.showError = true), (this.errMsg = "Please fill all section");
        return;
      } else {
         this.showSpinner=true
        try {
        await this.$store.dispatch("register", {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
        });
        await this.$store.dispatch('getCurrentUser')
         this.$router.push('/home')
        } catch (error) {
          this.showSpinner=false,
          this.errMsg=error
          this.showError=true
        }
       
       

        return;
      }
    },
    closeModal() {
      this.showError = false;
    },
  },
  
};
</script>


<style lang="scss" scoped>
a{
 text-decoration:underline black;
}
#register {
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
    padding-left: 30px;
    height: 50px;
    &:focus {
      outline: transparent !important;
      outline-color: transparent !important;
    }
  }
  .email {
    position: relative;
    i {
      position: absolute;
      top: 40%;
      left: 10px;
    }
  }
  .password {
    position: relative;
    i {
      position: absolute;
      top: 35%;
      left: 10px;
    }
  }
  .firstName,
  .lastName,
  .userName {
    position: relative;
    i {
      position: absolute;
      top: 40%;
      left: 10px;
    }
  }
  .col-md-5 {
    padding: 0px 120px;

    @media screen and (max-width:768px) {
      padding: 0px 40px;
    }

    h1 {
      font-size: 48px;
      font-weight: 900;
    }
    p {
      font-size: 18px;
      display: inline-block;
      
    }
  }

  .col-7 {
    height: 100vh;
    background-image: url("../assets/background.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    clip-path: polygon(10% 0, 100% 0%, 100% 100%, 0% 100%);
  }
}

//  request.time < timestamp.date(2021, 6, 30)
</style>

