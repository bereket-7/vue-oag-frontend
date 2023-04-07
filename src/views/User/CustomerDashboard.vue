<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img :src="require('../assets/img/face.jpg')" alt="User Profile Picture" class="rounded-circle" width="150">
                <div class="mt-3">
                  <h4>{{ userName }}</h4>
                  <button class="btn btn-primary">Edit Profile</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              Shopping Cart
            </div>
            <div class="card-body">
              <p>You have {{ cartItemCount }} items in your cart.</p>
              <button class="btn btn-primary">View Cart</button>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              Wishlist
            </div>
            <div class="card-body">
              <p>You have {{ wishlistItemCount }} items in your wishlist.</p>
              <button class="btn btn-primary">View Wishlist</button>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="card">
            <div class="card-header">
              Your Orders
            </div>
            <div class="card-body">
              <p>You have {{ orderCount }} orders.</p>
              <button class="btn btn-primary">View Orders</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
export default {
  name:'CustomerDashboard',
  data() {
    return {
      userName: 'John Doe',
      cartItemCount: 3,
      wishlistItemCount: 5,
      orderCount: 2
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 30px;
}

.card-body {
  text-align: center;
}

.card-header {
  font-weight: bold;
  text-transform: uppercase;
}

.btn {
  width: 100%;
  margin-top: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>

  