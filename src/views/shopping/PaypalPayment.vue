<template>
  <div class="row">
    <div class="col-75">
      <div class="container">
        <form @submit.prevent="makePayment">
          <div class="col-50">
            <h3>Payment</h3>
            <label>Accepted Cards</label>
            <div class="icon-container">
              <i class="fa-brands fa-cc-visa" style="color:navy;"></i>
              <i class="fa-brands fa-cc-mastercard" style="color:red;"></i>
              <i class="fa-brands fa-cc-discover" style="color:orange;"></i>
              <i class="fa-brands fa-cc-amex" style="color:blue;"></i>
            </div>
            <label for="price">Total</label>
            <input v-model="total" type="text" id="price" name="price" placeholder="Enter Total Amount">
            <label for="currency">Currency</label>
            <input v-model="currency" type="text" id="currency" name="currency" placeholder="Enter Currency">
            <label for="method">Payment Method</label>
            <input v-model="method" type="text" id="method" name="method" placeholder="Payment Method">
            <label for="intent">Intent</label>
            <input v-model="intent" type="text" id="intent" name="intent" placeholder="Payment Intent">
            <label for="description">Payment Description</label>
            <input v-model="description" type="text" id="description" name="description" placeholder="Payment Description">
          </div>
          <input type="submit" value="Continue to checkout" class="btn">
        </form>
      </div>
    </div>
    <div class="col-25">
      <div class="container">
        <h4>Cart <span class="price" style="color:black"><i class="fa fa-shopping-cart"></i> <b>4</b></span></h4>
        <p><a href="#">painting</a> <span class="price">10000</span></p>
        <p><a href="#">mixed art</a> <span class="price">5000</span></p>
        <p><a href="#">sculpture</a> <span class="price">3000</span></p>
        <p><a href="#">acrylic art</a> <span class="price">2000</span></p>
        <hr>
        <p>Total <span class="price" style="color:black"><b>{{ total }}</b></span></p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      total: '',
      currency: '',
      method: '',
      intent: '',
      description: ''
    };
  },
  methods: {
    makePayment() {
      axios
      .post('localhost:/8081/paypal/pay', {
        total: this.total,
        currency: this.currency,
        method: this.method,
        intent: this.intent,
        description: this.description
      })
      .then(response => {
        if (response.data.approvalUrl) {
          window.location.href = response.data.approvalUrl;
        }
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
    }
  }
};
</script>





<style scoped>
body {
  font-family: Arial;
  font-size: 17px;
  padding: 8px;
}

* {
  box-sizing: border-box;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  flex: 25%;
}

.col-50 {
  flex: 50%;
}

.col-75 {
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

input[type="text"] {
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

@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>
