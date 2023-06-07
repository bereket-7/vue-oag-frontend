<template>
    <div class="container my-5">
      <form>
        <h2>Checkout</h2>
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="firstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model="firstName">
          </div>
          <div class="col-md-6">
            <label for="lastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastName" v-model="lastName">
          </div>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" v-model="address">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email">
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Phone</label>
          <input type="text" class="form-control" id="phone" v-model="phone">
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="city" class="form-label">City</label>
            <input type="text" class="form-control" id="city" v-model="city">
          </div>
          <div class="col-md-4">
            <label for="state" class="form-label">State</label>
            <select id="state" class="form-select" v-model="state">
              <option value="AL">Ethiopia</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="zip" class="form-label">Zip</label>
            <input type="text" placeholder="1000" class="form-control" id="zip" v-model="zip">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        zip: ''
      }
    }
  }
  </script>
  