<template>
 
      <li class="row justify-content-center align-items-center" :class="post.welcomeScreen?'bg-dark text-white':''">
        <div class="col-md-4 col-6 px-md-5 px-0 py-5 py-md-0" >

          <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
          <h2 v-else>{{ post.title }}</h2>
          <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
          <p v-else>{{ post.blogHtml }}</p>
          <router-link v-if="post.welcomeScreen" to="#" class="text-dark">Login/Register</router-link>
           <router-link v-else to="#" class="text-dark">Create Post</router-link>
        </div>
        <div class="col-md-8 ">
             <img 
          v-if="post.welcomeScreen"
          :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
          alt=""
        />
        <img 
          v-else
          :src="require(`../assets/blogPhotos/${post.photo}.jpg`)"
          alt=""
        />
        </div>
       
      </li>
    
</template>

<script>
export default {
  props: ["post"],
};
</script>

<style lang="scss" scoped>
     img{
         width: 100%;
  
     }

    
        li:nth-child(even) .col-md-4{
            order: 2;
            @media screen and (max-width:768px) {
              order: 0;
            }
            
        }

        
       
</style>
