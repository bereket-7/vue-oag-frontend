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
        <tr
          v-for="cartItem in cartItems"
          :key="cartItem.id"
        >
          <td>{{ cartItem.id }}</td>
          <td>{{ cartItem.artworkName }}</td>
          <td>{{ cartItem.quantity }}</td>
          <td>{{ cartItem.price }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td
            colspan="3"
            class="text-right"
          >
            <strong>Total Price:</strong>
          </td>
          <td>{{ totalPrice }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="checkout-buttons">
      <button
        class="btn"
        @click="checkout"
      >
        Checkout
      </button>
      <button
        class="btn"
        @click="cashOnDelivery"
      >
        Cash on Delivery
      </button>
    </div>
  </div>
</template>


<script>
import { cartService } from '@/services/cartService';
import { checkoutService } from '@/services/checkoutService';
import { isSafeExternalUrl } from '@/utils/security';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'CartItems',
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.price;
      }, 0);
    }
  },
  mounted() {
    this.fetchCartItems();
  },
  methods: {
    checkout() {
      checkoutService.initiate({
        firstname: 'Guest',
        lastname: 'Buyer',
        email: 'buyer@example.com',
        phone: '0911223344',
        address: { street: '', city: '', state: '', country: 'ET', postalCode: '' }
      }).then((response) => {
        const url = response?.checkOutUrl;
        if (url && isSafeExternalUrl(url)) {
          window.location.href = url;
        } else {
          router.push('/checkout');
        }
      }).catch((error) => {
        console.error(error);
        router.push('/checkout');
      });
    },
    removeFromCart(cartItemId) {
      if (!useAuthStore().isAuthenticated) {
        router.push('/userLogin');
        return;
      }
      cartService.remove(cartItemId)
        .then((items) => {
          this.cartItems = Array.isArray(items) ? items : this.cartItems.filter((i) => i.id !== cartItemId);
        })
        .catch((error) => {
          console.error('Failed to remove item from cart:', error);
        });
    },
    clearCart() {
      if (!useAuthStore().isAuthenticated) {
        router.push('/userLogin');
        return;
      }
      cartService.clear()
        .then(() => {
          this.cartItems = [];
        })
        .catch((error) => {
          console.error('Failed to clear cart:', error);
        });
    },
    fetchCartItems() {
      cartService.getAll()
        .then((items) => {
          this.cartItems = items || [];
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
    }
  }
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