<template>
    <div>
      <h2>Cart Items</h2>
      <div v-for="cartItem in cartItems" :key="cartItem.id" class="cart-item">
        <p>{{ cartItem.artwork.artworkName }}</p>
        <p>Quantity: {{ cartItem.quantity }}</p>
        <p>Price: {{ cartItem.artwork.price }}</p>
        <button class="btn btn-remove" @click="removeFromCart(cartItem.id)">Remove</button>
      </div>
      <p>Total Price: {{ calculateTotalPrice() }}</p>
      <button class="btn btn-clear" @click="clearCart">Clear Cart</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:'CartItems',
    data() {
      return {
        cartItems: [],
      };
    },
    mounted() {
      this.fetchCartItems();
    },
    methods: {
      removeFromCart(cartItemId) {
        axios
          .delete(`http://localhost:8082/cart/remove/${cartItemId}`)
          .then(response => {
            console.log(response);
            console.log('Item removed from cart successfully!');
            this.fetchCartItems(); 
          })
          .catch(error => {
            console.error('Failed to remove item from cart:', error);
          });
      },
      clearCart() {
        axios
          .delete(`http://localhost:8082/cart/clear`)
          .then(response => {
            console.log(response);
            console.log('Cart cleared successfully!');
            this.fetchCartItems();
          })
          .catch(error => {
            console.error('Failed to clear cart:', error);
          });
      },
      fetchCartItems() {
        axios
          .get(`http://localhost:8082/cart/items`)
          .then(response => {
            this.cartItems = response.data;
          })
          .catch(error => {
            console.error('Failed to fetch cart items:', error);
          });
      },
      calculateTotalPrice() {
        let totalPrice = 0;
        for (const cartItem of this.cartItems) {
          totalPrice += cartItem.artwork.price * cartItem.quantity;
        }
        return totalPrice;
      },
    },
  };
  </script>
  