<template>
  <div class="create-post">
    <div class="container">
      <post-preview
        v-if="showPostPreview"
        @closeModal="showPostPreview = false"
      >
        <img class="img-fluid" :src="blogPhoto" alt="" />
      </post-preview>

      <div class="blog-info row">
        <div class="title col-md-4">
          <input
            type="text"
            class="w-100 py-2 mt-3"
            placeholder="Enter blog title"
            v-model="blogTitle"
          />
        </div>

        <div
          class="
            upload-file
            col-md-6
            d-flex
            flex-wrap
            justify-content-between
            mt-3
          "
        >
          <label for="blog-photo" class="d-block mt-2"
            >Upload Cover Photo</label
          >
          <input
            type="file"
            id="blog-photo"
            ref="blogPhoto"
            accept=".png,.jpg,.jpeg"
            @change="selectFile"
       
          />
          <button
            class="preview"
            @click="preview"
            :class="{ inactive: !this.$store.state.blogPhotoFileUrl }"
            :disabled="!this.$store.state.blogPhotoFileUrl"
          >
            Previw Photo
          </button>
          <span class="file-choosen d-block my-3"
            >File Choosen: {{ this.$store.state.blogPhotoName }}</span
          >
        </div>
      </div>
      <div class="vue-editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHtml"
          useCustomImageHandler
          
        ></vue-editor>
      </div>
      <div class="blog-actions my-3">
        <button @click="uploadImg">Publish Blog</button>
        <router-link class="router-button ml-3" to="#"
          >Post preview</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase/app";
// import "firebase/auth";
// import axios from 'axios';
import Quill from "quill";
import PostPreview from "./PostPreview.vue";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").deafult;
Quill.register("imageResize", ImageResize);
export default {
  components: { PostPreview },
  name: "CreatePost",
  data() {
    return {
      imageUrl:'',
      image:null,
      error: null,
      errMsg: "",
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      blogTitle: "",
      blogHtml: "",
      selectedFile: "",
      showPostPreview: false,
    };
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogPhoto() {
      return this.$store.state.blogPhotoFileUrl;
    },
  },
  created() {
    this.blogHtml = this.$store.state.blogHtml;
    this.blogTitle = this.$store.state.blogTitle;
  },

  methods: {
    async uploadImg() {
     await this.$store.dispatch('postNewBlog',{title:this.blogTitle,html:this.blogHtml,img:this.image})
     this.$router.push('/home')
    },

    selectFile() {
      const fileReader=new FileReader();
      const files= this.$refs.blogPhoto.files;
      fileReader.onloadend=()=>{
        this.imageUrl=fileReader.result
      }
      fileReader.readAsDataURL(files[0])
      this.image=files[0]
      setTimeout(() => {
      const fileName = files[0].name;
      this.$store.commit("updateFileNameandUrl", {
        fileName: fileName,
        url:this.imageUrl,
      });

}, 1000);


      
    },

    preview() {
      this.showPostPreview = !this.showPostPreview;
    },

    // imageHandler(file, Editor, cursorLocation, resetUploader) {
    //   const storageRef = firebase.storage().ref();
    //   const docRef = storageRef.child(`documents/blogPostsPhotos/${file.name}`);

    //   docRef.put(file).on(
    //     "state_changed",
    //     (snapshot) => {
    //       console.log(snapshot);
    //     },
    //     (err) => {
    //       console.log(err);
    //     },
    //     async () => {
    //       const downloadUrl = await docRef.getDownloadURL();
    //       Editor.insertEmbed(cursorLocation,"image",downloadUrl)
    //       resetUploader();
    //     }
    //   );
    // },
  },
};
</script>

<style lang="scss" scoped>
.create-post {
  button,
  a {
    align-self: baseline;
    text-decoration: none;
    color: white;
    font-size: 16px;
    padding: 6px 18px;
    background: black;
    align-self: center;
    border-radius: 50px;
  }
  input {
    border: none;
    background: none;
    outline: none;
    border-bottom: 1px solid #000;
  }
  .upload-file {
    input {
      display: none;
    }

    button.inactive {
      background: #000;
      opacity: 0.2;
    }
    label {
      align-self: baseline;
      text-decoration: none;
      color: white;
      font-size: 16px;
      padding: 8px 18px;
      background: black;
      align-self: center;
      border-radius: 50px;
    }
  }
  .blog-actions {
    a.router-button {
      padding: 10px 18px;
    }
  }
  .vue-editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}
</style>