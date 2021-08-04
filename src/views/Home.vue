<template>
  <div class="home">
    <ul class="mb-0">
      <blog-post :post="welcomeScreen"></blog-post>
      <blog-post
        :post="post"
        v-for="(post, index) in samplePost"
        :key="index"
      ></blog-post>
    </ul>
    <div class="card-wrapper px-4">
      <h2 class="pt-md-3 pt-5">Wiew more recent blogs</h2>
      <div class="row justify-content-center mt-4">
        <blog-card
          class="col-md-3 mx-3 mt-4 mb-2"
          v-for="(card, index) in sampleCards"
          :key="index"
          :card="card"
        ></blog-card>
      </div>
    </div>
  
    <div
      class="update row justify-content-between px-5"
      v-if="!this.$store.state.user"
    >
      <h3 class="text-uppercase text-dark col-3">
        Never Miss a Post.Register for Your free account today !
      </h3>
      <router-link to="/register" class="text-uppercase">
        Register for Fire blogs <i class="fas fa-angle-double-right"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Home",
  components: {
    BlogPost,
    BlogCard,
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome",
        blogPost:
          "You can register or login/logout in this webpage.Also you can add new blog page.",
        welcomeScreen: true,
        photo: "coding",
      },
      samplePost: [
        {
          title: "This is a Filler Title!",
          blogHtml: "This is a filler blog post title",
          photo: "beautiful-stories",
        },
        {
          title: "This is a Filler Title!",
          blogHtml: "This is a filler blog post title",
          photo: "designed-for-everyone",
        },
      ],
    };
  },
  computed: {
    sampleCards() {
      return this.$store.getters.sampleCards;
    },
    currentUserId() {
      return firebase.auth().currentUser.uid;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  background: #f1f1f1;
  // padding: 100px 200px;
}

.update {
  padding: 150px 0px;

  a {
    color: #fff;
    text-decoration: none;
    background: black;
    display: inline-block;
    padding: 6px 24px;
    border-radius: 24px;
    align-self: baseline;
    margin-top: 32px;
  }
}
</style>
