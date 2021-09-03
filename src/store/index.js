import Vue from "vue";
import Vuex from "vuex";
// import axios from 'axios';
import firebase from "firebase/app";
import "firebase/auth";
import { db, database, storage } from "../firebase/firebaseinit";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sampleCards: [
      { title: "Blog Card #1", photo: "stock-1", date: "May 1,2021", html: "" },
      { title: "Blog Card #2", photo: "stock-2", date: "May 1,2021", html: "" },
      { title: "Blog Card #3", photo: "stock-3", date: "May 1,2021", html: "" },
      { title: "Blog Card #4", photo: "stock-4", date: "May 1,2021", html: "" }
    ],

    blogHtml: "Write your blog title here ....",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileUrl: null,
    blogPhotoPreview: null,
    editBlog: null,
    showNavigation: null,

    user: null,
    profileEmail: null,
    profileLastName: null,
    profileFirstName: null,
    profileUserName: null,
    profilePassword: null,
    profileId: null,
    profileInitials: null,
    isLogin: false,
    currentAdmin: null
  },
  mutations: {
    setEditBlogs(state, payload) {
      state.editBlog = payload;
    },

    isLogged(state, payload) {
      state.isLogin = payload;
    },

    setUserInformations(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.data().email;
      (state.profileFirstName = payload.data().firstName),
        (state.profileLastName = payload.data().lastName);
      state.profileUserName = payload.data().userName;
      state.profilePassword = payload.data().password;
    },
    setUserInitials(state) {
      state.profileInitials =
        state.profileFirstName.charAt(0).toUpperCase() +
        state.profileLastName.charAt(0).toUpperCase();
    },
    updateTitleHtml(state, payload) {
      (state.blogHtml = payload.blogHtml), (state.blogTitle = payload.blogHtml);
    },
    updateFileNameandUrl(state, payload) {
      state.blogPhotoName = payload.fileName;
      state.blogPhotoFileUrl = payload.url;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setAdmin(state, payload) {
      state.currentAdmin = payload.data().admin;
    },

    loadBlogs(state, payload) {
      state.sampleCards = payload;
    }
  },
  actions: {
    setEditBlogs(context, payload) {
      context.commit("setEditBlogs", payload);
    },
    async register(_context, payload) {
      const firebaseAuth = await firebase.auth();
      await firebaseAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          console.log("ugurlu");
        })
        .catch(err => {
          if (err.code === "auth/email-already-in-use") {
            let error = new Error("Bu email adresi artıq qeydiyyatdan keçib");
            throw error;
          } else if (err.code === "auth/weak-password") {
            let error = new Error("Şifrə ən az 6 simvoldan ibarət olmalıdır");
            throw error;
          } else if (err.code === "auth/invalid-email") {
            let error = new Error("Email formasını düzgün daxil edin");
            throw error;
          }
        });

      await db
        .collection("users")
        .doc(firebaseAuth.currentUser.uid)
        .set({
          firstName: payload.firstName,
          lastName: payload.lastName,
          userName: payload.userName,
          email: payload.email,
          password: payload.password
        });
      return;
    },

    async login(_context, payload) {
      const firebaseAuth = await firebase.auth();
      await firebaseAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          console.log("ugurlu");
        })
        .catch(err => {
          console.log(err);
          if (err.code === "auth/invalid-email") {
            let error = new Error("Email formasını düzgün daxil edin");
            throw error;
          } else if (err.code === "auth/user-not-found") {
            let error = new Error(
              "Bu email ünvanına uyğun istifadəçi tapılmadı"
            );
            throw error;
          } else if (err.code === "auth/wrong-password") {
            let error = new Error("Düzgün şifrə daxil edin");
            throw error;
          }
        });
    },

    async resetPassword(_context, payload) {
      console.log(payload);
      await firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(() => {
          console.log("Gonderildi");
        })
        .catch(err => {
          console.log(err);
          if (err.code === "auth/invalid-email") {
            let error = new Error("Email formasını düzgün daxil edin");
            throw error;
          } else if (err.code === "auth/user-not-found") {
            console.log(payload);
            let error = new Error(
              "Bu email ünvanına uyğun istifadəçi tapılmadı"
            );
            throw error;
          }
        });
    },

    async getCurrentUser(context) {
      const currentUser = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      context.commit("setUserInformations", currentUser);
      context.commit("setUserInitials");
    },

    updateUser(context, payload) {
      context.commit("updateUser", payload);
    },

    async saveChanges(_context, payload) {
      const firebaseAuth = await firebase.auth();

      await db
        .collection("users")
        .doc(firebaseAuth.currentUser.uid)
        .update({
          firstName: payload.firstName,
          lastName: payload.lastName,
          userName: payload.userName,
          email: payload.email,
          password: payload.password
        });
      await firebaseAuth.currentUser.updateEmail(payload.email);
      await firebaseAuth.currentUser.updatePassword(payload.password);
    },

    async getCurrentAdmin(context) {
      const currentAdmin = await db
        .collection("Admin")
        .doc("currentAdmin")
        .get();
      context.commit("setAdmin", currentAdmin);
    },

    async changeAdmin(_context, payload) {
      await db
        .collection("Admin")
        .doc("currentAdmin")
        .update({
          admin: payload
        });
    },

    async postNewBlog(_context, payload) {
      let blog = {
        title: payload.title,
        html: payload.html,
        date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
      };
      let key;
      var imgurl;
      await database
        .ref("blogs")
        .push(blog)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const fileName = payload.img.name;
          const ext = fileName.slice(fileName.lastIndexOf("."));
          const upload = storage.ref("blogs/" + key + ext);
          upload
            .put(payload.img)
            .then(() => {
              upload.getDownloadURL().then(snapshot => {
                imgurl = snapshot;
                database
                .ref("blogs")
                .child(key)
                .update({ imageUrl: imgurl });
              });
            })
           
        })
    },

    async getCurrentBlogs(context) {
      const response = await fetch(
        "https://fireblogs-16278-default-rtdb.firebaseio.com/blogs.json"
      );
      const responseData = await response.json();

      const blogs = [];
      for (const key in responseData) {
        let blog = {
          id: responseData[key].id,
          title: responseData[key].title,
          photo:responseData[key].imageUrl,
          date: responseData[key].date,
          html: responseData[key].hmtl
        };

        blogs.push(blog);
      }
      context.commit("loadBlogs", blogs);
    }
  },
  getters: {
    sampleCards(state) {
      return state.sampleCards;
    },
    editBlog(state) {
      return state.editBlog;
    }
  },
  modules: {}
});
