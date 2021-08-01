<template>
  <div id="reset" class="row">
    
    <base-dialog :show="showModal" @close="closeModal" title="Reset Password">
      <h4>If your account exits, you will recieve a email!!</h4>
    </base-dialog>
    <div class="col-md-5 px-5 px-md-0 justify-content-center d-flex align-items-center">
      <div class="d-flex flex-column">
        <h1 class="my-4 mx-auto">Reset Password</h1>
        <p class="mx-auto">
          Forgot your passowrd? Enter your email to reset it
        </p>
        <base-spinner v-if="showSpinner"></base-spinner>
        <form>
          <div class="input-groups d-flex flex-column align-items-center">
            <input
              type="text"
              class="form-control my-2"
              placeholder="Email"
              v-model="email"
            />
          </div>
        </form>

        <button @click="showModalItem" class="mt-5">Reset</button>
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
  data() {
    return {
      email: null,
      showModal: false,
      showSpinner:false
    };
  },
  methods: {
    showModalItem() {
      this.showSpinner=true,
      setTimeout(() => {
        this.showSpinner=false
        this.showModal = true;
      }, 2000);
      
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>


<style lang="scss" scoped>
#reset {
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
    &:focus {
      outline: transparent !important;
      border: transparent !important;
      outline-color: transparent !important;
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

  .col-7 {
    height: 100vh;
    background: red;
    background-image: url("../assets/background.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    clip-path: polygon(10% 0, 100% 0%, 100% 100%, 0% 100%);
  }
}
</style>