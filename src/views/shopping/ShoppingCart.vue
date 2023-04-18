<template>
    <div class="container">
      <h1 class="my-5">Shopping Cart</h1>
  
      <div v-if="items.length === 0">
        <p>Your cart is empty.</p>
      </div>
  
      <div v-else>
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ formatPrice(item.price) }}</td>
              <td>
                <button class="btn btn-sm btn-primary" @click="decrement(item)">-</button>
                {{ item.quantity }}
                <button class="btn btn-sm btn-primary" @click="increment(item)">+</button>
              </td>
              <td>{{ formatPrice(item.price * item.quantity) }}</td>
              <td><button class="btn btn-sm btn-danger" @click="removeItem(index)">Remove</button></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Total: {{ formatPrice(total) }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
  
        <div class="text-end">
          <button class="btn btn-primary" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { name: 'Product 1', price: 10, quantity: 2 },
          { name: 'Product 2', price: 20, quantity: 1 },
          { name: 'Product 3', price: 30, quantity: 3 },
        ]
      }
    },
    computed: {
      total() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    },
    methods: {
      formatPrice(price) {
        return `$${price.toFixed(2)}`
      },
      increment(item) {
        item.quantity++
      },
      decrement(item) {
        if (item.quantity > 1) {
          item.quantity--
        }
      },
      removeItem(index) {
        this.items.splice(index, 1)
      },
      checkout() {
        // Add your checkout logic here
        alert('Checkout not implemented yet.')
      }
    }
  }
  </script>
  