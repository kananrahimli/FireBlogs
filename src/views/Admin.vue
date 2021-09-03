<template>
  <div id="admin" class="row align-items-center flex-column my-3 p-4">
    <base-dialog :show="showDialog" @close="closeModal" title="Add Admin">
      <h2>{{ msg }}</h2>
    </base-dialog>
    <h1>Adminstration</h1>
    <div
      class="
        adminData
        col-md-7
        d-flex
        align-items-center
        justify-content-between
        flex-column
        p-4
      "
    >
      <h2 class="d-block">Add Admin</h2>
      <div class="input-group">
        <input type="email" v-model="newAdmin" class="form-control w-100" />
      </div>
      <base-spinner v-if="showSpinner"></base-spinner>
      <button class="btn btn-secondary mt-4" @click="addNewAdmin">
        Add
      </button>
    </div>
  </div>
</template>

<script>
import BaseDialog from "../components/BaseDialog.vue";
import BaseSpinner from "../components/BaseSpinner.vue";
export default {
    components:{
        BaseDialog,BaseSpinner
    },
    data(){
        return{
            showSpinner:null,
            showDialog:false,
            msg:'Admin Dəyişdi',
            newAdmin:''
        }
    },
    methods:{
        closeModal(){
            this.showDialog=false
            this.newAdmin=''
            this.$router.push('/home')
        },
       async addNewAdmin(){
           this.showSpinner=true
           await this.$store.dispatch('changeAdmin',this.newAdmin),
           await this.$store.dispatch('getCurrentAdmin')
           this.showSpinner=false,
           this.showDialog=true
        }
    }
};
</script>

<style lang="scss" scoped>
.adminData {
  color: #000;
  background: #eaeaea;
  // width: 700px !important;
  // height: 100px;
  border-radius: 10px;
}
</style>