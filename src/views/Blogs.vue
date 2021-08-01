<template>
  <div class="blog-wrapper p-5">
    <div class="toggle-edit">
      <label for="edit" class="font-weight-bolder mr-4">Edit blogs</label>
      <input type="checkbox" name="edit" id="edit" v-model="editBlog" @change="setEditBlogs" />
    </div>
    <div class="row justify-content-center mt-4">
      <blog-card
        class="col-md-3 mx-3 mt-4"
        v-for="(card, index) in sampleCards"
        :key="index"
        :card="card"
      ></blog-card>
      
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard";
export default {
  components: {
    BlogCard
  },
  computed: {
    sampleCards() {
      return this.$store.getters.sampleCards;
    }
  },
  data() {
    return {
      editBlog:null
    };
  },

  methods:{
    setEditBlogs(){
      this.$store.dispatch('setEditBlogs',this.editBlog)
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  position: relative;
  background: #eaeaea;
  .toggle-edit {
    position: absolute;
    top: 30px;
    right: 20px;

    label {
      font-size: 20px;
      cursor: pointer;
    }

    input[type="checkbox"] {
      cursor: pointer;
      position: relative;
      border: none;
      outline: none;
      -webkit-appearance: none;
      background: #fff;
      width: 80px;
      vertical-align: middle;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
        0px 2px 4px -1px rgba(0, 0, 0, 0.06);

      &::before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: #303030;
        transform: scale(1.1);
        transition: 700ms all;
        box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
          0px 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      &:checked::before {
        left: 52px;
        background: #fff;
      }
    }
  }
}
</style>
