<template>
  <div class="cart-items-container">
    <h2>Cart Items</h2>
    <table class="cart-table">
      <thead>
        <tr>
          <th>Artwork ID</th>
          <th>Artwork Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cartItem in cartItems" :key="cartItem.id">
          <td>{{ cartItem.id }}</td>
          <td>{{ cartItem.artworkName }}</td>
          <td>{{ cartItem.quantity }}</td>
          <td>{{ cartItem.price }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right"><strong>Total Price:</strong></td>
          <td>{{ totalPrice }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="checkout-buttons">
      <button class="btn" @click="checkout">Checkout</button>
      <button class="btn" @click="cashOnDelivery">Cash on Delivery</button>
    </div>
  </div>
</template>


<script>
import { isAuthenticated } from '@/utils/auth';
import api from '@/utils/api';
import router from '@/router';

export default {
  name: 'CartItems',
  data() {
    return {
      cartItems: [],
    };
  },
  mounted() {
    this.fetchCartItems();
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.price;
      }, 0);
    }
  },
  methods: {
    checkout() {
      api
      .post('payment/initialize')
        .then(response => {
          const checkoutUrl = response.data.checkOutUrl;
          window.location.href = checkoutUrl;
        })
        .catch(error => {
          console.error(error);
        });
    },
    removeFromCart(cartItemId) {
      if (!isAuthenticated()) {
        router.push('/userLogin');
        return;
      }

      api
        .delete(`/cart/remove/${cartItemId}`)
        .then((response) => {
          console.log(response);
          console.log('Item removed from cart successfully!');
          this.fetchCartItems();
        })
        .catch((error) => {
          console.error('Failed to remove item from cart:', error);
        });
    },
    clearCart() {
      if (!isAuthenticated()) {
        router.push('/userLogin');
        return;
      }

      api
        .delete(`/cart/clear`)
        .then((response) => {
          console.log(response);
          console.log('Cart cleared successfully!');
          this.fetchCartItems();
        })
        .catch((error) => {
          console.error('Failed to clear cart:', error);
        });
    },
    fetchCartItems() {
  api
    .get(`/cart`)
    .then((response) => {
      this.cartItems = response.data; 
    })
    .catch((error) => {
      console.error('Failed to fetch cart items:', error);
    });
},
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const cartItem of this.cartItems) {
        totalPrice += cartItem.price * cartItem.quantity;
      }
      return totalPrice;
   },
  },
};
</script>


  

  <style scoped>
  .cart-items-container {
    /* margin-top: 150px; */
    max-width: 900px; 
    margin: 0 auto;
    padding: 100px; 
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .cart-table th {
    background-color: #f2f2f2;
    padding: 10px;
    text-align: left;
  }
  
  .cart-table td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .total-price {
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .btn {
    background-color: #4caf50;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-remove {
    background-color: #f44336;
    margin-left: 10px;
  }
  
  .btn-clear {
    background-color: #f44336;
    margin-top: 20px;
  }
/* Responsive Styles */
@media (max-width: 767px) {
  .cart-items-container {
    padding: 10px;
  }
  
  .cart-table {
    font-size: 14px;
  }
  
  .cart-table th,
  .cart-table td {
    padding: 8px;
  }
  
  .total-price {
    margin-bottom: 5px;
  }
  
  .btn {
    padding: 6px 12px;
    font-size: 14px;
  }
}
  </style>