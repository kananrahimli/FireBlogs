<template>
  <div id="profile" class="row align-items-center flex-column my-3 p-4">
    <base-dialog :show="showDialog" @close="closeModal" title="Saved Changes">
     <h2>{{ msg }}</h2> 
    </base-dialog>
    <h1>Account Settings</h1>
    <div
      class="
        personal-data
        col-md-7
        d-flex
        align-items-center
        justify-content-between
        flex-column
        p-4
      "
    >
      <span @click="showContainer = !showContainer" class="account my-3">{{
        this.$store.state.profileInitials
      }}</span>
      <h2 class="d-block">{{ fullName }}</h2>
      <div class="input-group d-flex flex-column">
        <label for="" class="d-block">Email:</label>
        <input type="email" v-model="email" class="form-control w-100" />
      </div>
      <div class="input-group d-flex flex-column">
        <label for="" class="d-block">Password:</label>
        <input type="text" v-model="password" class="form-control w-100" />
      </div>
      <div class="input-group d-flex flex-column my-4">
        <label for="" class="d-block">First Name:</label>
        <input type="text" v-model="firstName" class="form-control w-100" />
      </div>
      <div class="input-group d-flex flex-column mb-4">
        <label for="" class="d-block">Last Name:</label>
        <input type="text" v-model="lastName" class="form-control w-100" />
      </div>
      <div class="input-group d-flex flex-column">
        <label for="" class="d-block">User Name:</label>
        <input type="text" v-model="userName" class="form-control w-100" />
      </div>
      <base-spinner v-if="showSpinner"></base-spinner>
      <button class="btn btn-secondary mt-4" @click="saveChanges">
        Save changes
      </button>
    </div>
  </div>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import BaseSpinner from "../components/BaseSpinner.vue";
export default {
  components: {
    BaseDialog,
    BaseSpinner,
  },
  data() {
    return {
      showDialog: false,
      showSpinner: false,
      msg:'',
      email: "",
      firstName: "",
      userName: "",
      lastName: "",
      password: "",
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
  },
  created() {
    this.email = this.$store.state.profileEmail;
    this.lastName = this.$store.state.profileLastName;
    this.firstName = this.$store.state.profileFirstName;
    this.userName = this.$store.state.profileUserName;
    this.password = this.$store.state.profilePassword;
  },

  methods: {
    async saveChanges() {
      this.showSpinner=true;
      this.msg="Dəyişikliklər saxlanıldı"
      await this.$store.dispatch("saveChanges", {
        email: this.email,
        password: this.password,
        userName: this.userName,
        lastName: this.lastName,
        firstName: this.firstName,
      });
       this.showDialog=true;
       this.showSpinner=false;
       await this.$store.dispatch('getCurrentUser')
      // if(this.password!=this.password && this.email!=this.email){
      //     this.$router.push("/login");
      // }
    },

    closeModal(){
      this.showDialog=false
    }
  },
};
</script>

<style lang="scss" scoped>
#profile {
  .personal-data {
    color: #000;
    background: #eaeaea;
    // width: 700px !important;
    // height: 100px;
    border-radius: 10px;
    .input-group {
    }
  }
  span.account {
    display: block;
    background: #000;
    width: 80px;
    height: 80px;
    color: #fff;
    font-size: 32px;
    border-radius: 50%;
    text-align: center;
    padding-top: 12px;
    cursor: pointer;
  }
}
</style>