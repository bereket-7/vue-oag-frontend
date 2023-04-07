<template>
  <nav class="navbar navbar-expand-lg bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand light" href="#" style="color:white">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active light" aria-current="page" href="#" style="color:azure">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" style="color:azure">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:azure">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item" style="color:azure">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-4" type="search" style="color:white" placeholder="Search" 
        aria-label="Search">
        <button class="btn btn-outline-success btn-sm" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="" alt="User Profile Picture" 
                class="rounded-circle" width="150">
                <div class="mt-3">
                  <h4>{{ userName }}</h4>
                  <button class="btn btn-success">Edit Profile</button>
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
              <button class="btn btn-danger">View Cart</button>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              Wishlist
            </div>
            <div class="card-body">
              <p>You have {{ wishlistItemCount }} items in your wishlist.</p>
              <button class="btn btn-warning">View Wishlist</button>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card mb-3">
          <div class="card">
            <div class="card-header">
              Your Orders
            </div>
            <div class="card-body">
              <p>You have {{ orderCount }} orders.</p>
              <button class="btn btn-success">View Orders</button>
            </div>
          </div>
        </div>

        
        <div class="card mb-3">
          <div class="card">
          <div class="card">
            <div class="card-header">
              Your Orders
            </div>
            <div class="card-body">
              <p>You have {{ orderCount }} orders.</p>
              <button class="btn btn-success">View Orders</button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <img src="" class="img-fluid" alt="sample">

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

<style scoped>
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

.btn-success:hover {
  background-color: #d45100;
  border-color: #d45908;
}
</style>

  