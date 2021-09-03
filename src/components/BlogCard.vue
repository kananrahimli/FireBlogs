<template>
  <div id="blogCard" class="px-0 position-relative">
      <div class="icons" v-if="editBlog">
        <div class="edit">
          <i class="far fa-edit"></i>
        </div>

        <div class="delete">
         <i class="far fa-trash-alt"></i>
        </div>
      </div>
      <div class="img-container" :style="{ backgroundImage: `url(${card.photo})` }" >
        
      </div>
      
      <div class="info pb-5 ">
        <h4 class="pt-3 px-3">{{ card.title }}</h4>
        <h6 class="pb-4 px-3">{{ card.date }}</h6>
        <router-link to="/blogs" class="link px-3 text-decoration-none text-dark ">View Blog <i class="fas fa-angle-double-right"></i> </router-link>
        
      </div>
    
  </div>
</template>

<script>
export default {
  props: ["card"],
  computed:{
    editBlog(){
      return this.$store.getters.editBlog
    }
  }
};
</script>

<style lang="scss" scoped>
  #blogCard{
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: all .3s;
    &:hover{
      transform: rotateZ(-1deg) scale(1.01);
      box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .img-container{
      height: 250px;
      overflow: hidden;
      background-size: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-position: center;
    }

   

    .edit{
     position: absolute;
      right: 50px;
      top: 5px;
      width: 30px;
      height:30px;
      background: #fff;
      text-align: center;
      border-radius: 50%;
      padding-top: 4px;
      font-size: 14px;
      
    }
    .delete{
      position: absolute;
      right: 10px;
      top: 5px;
      width: 30px;
      height:30px;
      background: #fff;
      text-align: center;
      border-radius: 50%;
      padding-top: 4px;
      font-size: 14px;
    }
  }
</style>
