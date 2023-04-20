<template>
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Enable body scrolling</button>

<div class="offcanvas offcanvas-end  show text-bg-dark" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">User profile</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    
    <button class="btn btn-danger">remove</button><br><br>
    <button class="btn btn-info">wishlist</button><br><br>
    <button class="btn btn-success">sign out</button><br><br>
    <button class="btn btn-secondary">profile</button><br><br>
    <button class="btn btn-primary">update profile</button><br>
  </div>
</div>

</template>
<script>
export default {
  setup() {
    
  },
}
</script>
<style scoped>
</style>