<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="firstname" class="form-label">First Name</label>
        <input type="text" class="form-control" id="firstname" v-model="user.firstname" required>
        <div class="invalid-feedback">Please provide a valid first name.</div>
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="lastname" v-model="user.lastname" required>
        <div class="invalid-feedback">Please provide a valid last name.</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="user.email" required>
        <div class="invalid-feedback">Please provide a valid email address.</div>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input type="tel" class="form-control" id="phone" v-model="user.phone" required>
        <div class="invalid-feedback">Please provide a valid phone number.</div>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input type="text" class="form-control" id="address" v-model="user.address" required>
        <div class="invalid-feedback">Please provide a valid address.</div>
      </div>
      <div class="mb-3">
        <label for="age" class="form-label">Age</label>
        <input type="number" class="form-control" id="age" v-model="user.age" required>
        <div class="invalid-feedback">Please provide a valid age.</div>
      </div>
      <div class="mb-3">
        <label for="sex" class="form-label">Sex</label>
        <select class="form-control" id="sex" v-model="user.sex" required>
          <option value="">Select one</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <div class="invalid-feedback">Please select a valid sex.</div>
      </div>
      <div class="mb-3">
        <label for="photo" class="form-label">Photo</label>
        <input type="file" class="form-control" id="photo" v-on:change="handleFileUpload" required>
        <div class="invalid-feedback">Please provide a photo.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="user.password" required>
        <div class="invalid-feedback">Please provide a valid password.</div>
      </div>
      <button class="btn btn-success" type="submit">submit</button>
      </form>
      </div>
    </template>