<template>
  <div class="row justify-content-between my-5 blog-container">
     <div class="img-blog col-md-6 px-5" >
         <img class="img-fluid" :src="currentBlog.photo" alt="">
     </div>
     <div class="info-blog col-md-6 mt-md-0 mt-4 px-5 d-flex flex-column justify-content-around">
         <h1> <strong>Title:</strong> {{currentBlog.title}}</h1>
         <h1> <strong>Text:</strong>{{currentBlog.html}}</h1>
         <h1> <strong>Date:</strong>{{currentBlog.date}}</h1>
     </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data(){
      return{
          currentBlog:null
      }
  },

  created() {
    const blogs=this.$store.getters.sampleCards
    console.log(blogs);
    this.currentBlog=blogs.find((blog)=>{
      return blog.id==this.id;
   });
  },
};
</script>

<style scoped lang="scss">
    .blog-container{

        img{
            border-radius: 10px;
            width: 100%;
            height: 100%;
        }
    }
</style>