import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseinit";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleCards: [
      { title: "Blog Card #1", photo: "stock-1", date: "May 1,2021" },
      { title: "Blog Card #2", photo: "stock-2", date: "May 1,2021" },
      { title: "Blog Card #3", photo: "stock-3", date: "May 1,2021" },
      { title: "Blog Card #4", photo: "stock-4", date: "May 1,2021" },
    ],
    editBlog:null,
    showNavigation:null
  },
  mutations: {
    setEditBlogs(state,payload){
      state.editBlog=payload
      console.log(state.editBlog);
    }
  },
  actions: {
    setEditBlogs(context,payload){
      context.commit('setEditBlogs',payload)
    },
    async register(_context,payload){
   
        const firebaseAuth = await firebase.auth();
         await firebaseAuth.createUserWithEmailAndPassword(
          payload.email,
          payload.password
        ).then(()=>{
          console.log('ugurlu');
        })
        .catch((err)=>{
         if(err.code==='auth/email-already-in-use'){
          let error=new Error('Bu email adresi artıq qeydiyyatdan keçib');
          throw error;
         } else if(err.code==='auth/weak-password') {
          let error=new Error('Şifrə ən az 6 simvoldan ibarət olmalıdır');
          throw error;
         } else if(err.code==='auth/invalid-email') {
          let error=new Error('Email formasını düzgün daxil edin');
          throw error;
         }

         
        })
        
        await db
          .collection("users")
          .doc(firebaseAuth.currentUser.uid)
          .set({
            firstName: payload.firstName,
            lastName: payload.lastName,
            userName: payload.userName,
            email: payload.email,
            password: payload.password,
          })
        return;
      },

      async login(_context,payload){
        console.log(payload);
          const firebaseAuth= await firebase.auth()
          await firebaseAuth.signInWithEmailAndPassword(payload.email,payload.password)
          .then(()=>{
            console.log('ugurlu');
          }).catch((err)=>{
            console.log(err);
            if(err.code==='auth/invalid-email'){
              let error=new Error(  'Email formasını düzgün daxil edin');
            throw error;
            }else if(err.code==='auth/user-not-found'){
              let error=new Error(  'Bu email ünvanına uyğun istifadəçi tapılmadı');
              throw error;
            }else if(err.code==='auth/wrong-password'){
              let error=new Error(  'Düzgün şifrə daxil edin');
              throw error;
            }
            
          })
      }
    
  },
  getters:{
    sampleCards(state){
      return state.sampleCards
    },
    editBlog(state){
      return state.editBlog
    }
  },
  modules: {
  }
})
