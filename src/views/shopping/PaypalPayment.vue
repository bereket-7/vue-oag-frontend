<template>
  <div class="payment">
    <form method="post" @submit.prevent="submitPayment">
      <div class="payment__card-container">
        <h2 class="payment__title">Payment Details</h2>
        <div class="payment__card-icons">
          <i class="fab fa-cc-visa"></i>
          <i class="fab fa-cc-mastercard"></i>
          <i class="fab fa-cc-discover"></i>
          <i class="fab fa-cc-amex"></i>
        </div>
        <div class="payment__card-details">
          <div class="payment__card-details-input">
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" v-model="paymentData.cardNumber" required>
          </div>
          <div class="payment__card-details-input">
            <label for="expiration">Expiration Date</label>
            <input type="text" id="expiration" v-model="paymentData.expiration" required>
          </div>
          <div class="payment__card-details-input">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="paymentData.cvv" required>
          </div>
        </div>
      </div>
      <div class="payment__amount-container">
        <h2 class="payment__title">Amount</h2>
        <div class="payment__amount-input">
          <label for="amount">Total Amount</label>
          <input type="text" id="amount" v-model="paymentData.amount" required>
        </div>
      </div>
      <div class="payment__buttons">
        <button type="submit" class="payment__submit-btn">Pay Now</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name:'PaypalPayment',
  data() {
    return {
      payment: {
        price: '10',
        currency: '',
        method: '',
        intent: 'sale',
        description: ''
      }
    }
  },
  methods: {
    submitPayment() {
      // Add your API call or other logic to handle the form submission
    }
  }
}
</script>


<style scoped>

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}

</style>