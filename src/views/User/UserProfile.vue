
<template>
  <div class="page-holder bg-gray-100">
     <header class="header bg-white shadow align-self-end py-3 px-xl-5 w-100">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 text-center text-md-start fw-bold">
                <p class="mb-2 mb-md-0 fw-bold">Kelem online Art Gallery</p>
              </div>
              <div class="col-md-6 text-center text-md-end text-gray-400">
                <p class="mb-0">Bereket</p>
              </div>
            </div>
          </div>
        </header>
        <div class="container-fluid px-lg-4 px-xl-5 contentDiv">
              <!-- Page Header-->
              <div class="page-header mb-4">
                <h1 class="page-heading">Profile</h1>
              </div>
          <section>
            <div class="row">
              <div class="col-lg-4">
                <div class="card card-profile mb-4">
                  <div class="card-header" src="require('@/assets/img/three.jpg')"></div>
                  <div class="card-body text-center"><img :src="require('@/assets/img/miki.jpg')" class="card-profile-img" alt="avatar">
                    <h3 class="mb-3">Bereket Getachew</h3>
                    <p class="mb-4">Customer</p>
                  </div>
                </div>

                <form class="card mb-4">
                  <div class="card-header">
                    <h4 class="card-heading">My Profile</h4>
                  </div>
                  <div class="card-body">
                    <div class="row mb-3">
                      <div class="col-auto d-flex align-items-center"><img :src="require('@/assets/img/two.jpg')" class="avatar avatar-lg p-1" alt="avatar"></div>
                      <div class="col">
                        <input class="form-control" placeholder="Customer Name">
                      </div>
                    </div>
                    <div class="mb-3"> 
                      <input class="form-control" placeholder="Email Address">
                    </div>
                    <input class="form-control" placeholder="Password" type="password" value="password">
                  </div>
                  <div class="card-footer text-end">
                    <button class="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
              <div class="col-lg-6">
                <form class="card mb-4">
                  <div class="card-header">
                    <h2 class="card-heading">Edit Profile</h2>
                  </div>
                  <div class="card-body">
                    <div class="col">
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <input class="form-control" type="text" placeholder="Username" value="">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <input class="form-control" type="email" placeholder="Email">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <input class="form-control" type="text" placeholder="First name">
                        </div>
                      </div>
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <input class="form-control" type="text" placeholder="Last Name">
                        </div>
                      </div>
    
                      <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                          <input class="form-control" type="text" placeholder="Address">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-end">
                    <button class="btn btn-primary" type="submit">Update Profile</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>

    








  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">user</button>
<div class="offcanvas offcanvas-end  show text-bg-dark" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">User profile</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <button class="btn btn-danger">remove</button><br><br>
    <button class="btn btn-info">wishlist</button><br><br>
    <button class="btn btn-success">sign out</button><br><br>
    <button class="btn btn-secondary">change password</button><br><br>
    <button class="btn btn-primary">update profile</button><br>
  </div>
</div>
<footer-view/>
</template>
<script>
import FooterView from '@/components/FooterView.vue'
export default {
  components: { FooterView },
  setup() {
    
  },
}
</script>
<style scoped>

.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
}
.card-header {
  position: relative;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body{
  font-family: 'Poppins'!important;
}
.text-primary {
  color: #4650dd !important;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
 
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

.lead {
  font-size: 1.125rem;
  font-weight: 300;
}
.text-sm {
  font-size: .7875rem !important;
}
h3, .h3 {
  font-size: 1.575rem;
}
.page-holder {
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: calc(100vh - 72px);
 
  flex-wrap: wrap;
}
a {
  color: #4650dd!important;
  text-decoration: underline!important;
  cursor: pointer;
}
.card-profile-img {
  position: relative;
  max-width: 8rem;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: 3px solid #fff;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img, svg {
  vertical-align: middle;
}
.avatar.avatar-lg {
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
}
.avatar {
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
  text-align: center;
  border: #dee2e6;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  line-height: 3rem;
}
.form-control
{
  color: #343a40;
}
.page-heading {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 300;
}
.contentDiv
{
  padding-top: 4rem;
}
.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}

</style>

