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
    showNavigation:null,

    user:null,
    profileEmail:null,
    profileLastName:null,
    profileFirstName:null,
    profileUserName:null,
    profilePassword:null,
    profileId:null,
    profileInitials:null
  },
  mutations: {
    setEditBlogs(state,payload){
      state.editBlog=payload
    },
   
    setUserInformations(state,payload){
      state.profileId=payload.id
      state.profileEmail=payload.data().email
      state.profileFirstName=payload.data().firstName,
      state.profileLastName=payload.data().lastName
      state.profileUserName=payload.data().userName
      state.profilePassword=payload.data().password
    },
    setUserInitials(state){
      state.profileInitials=state.profileFirstName.charAt(0).toUpperCase()+state.profileLastName.charAt(0).toUpperCase()
    },
     updateUser(state,payload){
      state.user=payload
    },
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
      },

     async resetPassword(_context,payload){
       console.log(payload);
       await firebase.auth().sendPasswordResetEmail(payload.email)
        .then(()=>{
         
          console.log('Gonderildi');
        })
        .catch((err)=>{
          console.log(err);
          if(err.code==='auth/invalid-email'){
            let error=new Error(  'Email formasını düzgün daxil edin');
          throw error;
          }else if(err.code==='auth/user-not-found'){
            console.log(payload);
            let error=new Error(  'Bu email ünvanına uyğun istifadəçi tapılmadı');
            throw error;
          }
        })
       
      },

      async getCurrentUser(context){
        const currentUser=await db.collection("users").doc(firebase.auth().currentUser.uid).get()
        context.commit('setUserInformations',currentUser);
        context.commit('setUserInitials')

      },

      updateUser(context,payload){
        context.commit('updateUser',payload)
      },

     async saveChanges(_context,payload){
      const firebaseAuth = await firebase.auth();
        
        await db
        .collection("users")
        .doc(firebaseAuth.currentUser.uid)
        .update({
          firstName: payload.firstName,
          lastName: payload.lastName,
          userName: payload.userName,
          email: payload.email,
          password:payload.password
        })
        await firebaseAuth.currentUser.updateEmail(payload.email)
        await firebaseAuth.currentUser.updatePassword(payload.password)
      }
    
  },
  getters:{
    sampleCards(state){
      return state.sampleCards
    },
    editBlog(state){
      return state.editBlog
    },
    
  },
  modules: {
  }
})
