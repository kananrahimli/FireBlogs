<template>
  <div id="footer " class="bg-dark text-light px-4 ">
    <div class="row ">
      <div class="col-md-2 d-flex flex-column  justify-content-center align-items-center">
        <h4 >FIRE BLOGS</h4>
        <div class="d-flex mt-3 ">
          <i class="fab fa-facebook-f fa-2x "></i>
          <i class="fab fa-linkedin-in fa-2x mx-3"></i>
          <i class="fab fa-github fa-2x mr-3"></i>
          <i class="fab fa-instagram fa-2x"></i>
        </div>
      </div>
      <div class="col-md-3 d-flex justify-content-center my-5 my-md-0">
          <ul class="list-unstyled ">
              <li>
                  <router-link to="/home">Home</router-link>
              </li>
              <li>
                  <router-link to="/blogs">Blogs</router-link>
              </li>
              <li>
                 <router-link to="/home">Cretae Post</router-link>
              </li>
          </ul>
      </div>
      <div class="col-md-7 d-flex justify-content-end mt-5 mt-md-0 align-items-end ">
          <h5 class="mb-4">Copyright 2021  All rights reserved</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
    .bg-dark{
        padding: 128px 0;

        @media screen and (max-width: 768px){
          padding: 40px 0 0;

        }

        i{
            cursor: pointer;
        }

        ul li a{
            font-size: 18px;
            color: white;
            text-decoration: none;
        }
    }
</style>
