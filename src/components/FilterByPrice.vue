<template>
    <div class="card">
      <h4>Price Range Slider</h4>

      <div class="price-content">
        <div>
          <label>Min</label>
          <p id="min-value">$50</p>
        </div>

        <div>
          <label>Max</label>
          <p id="max-value">$500</p>
        </div>
      </div>

        <div class="range-slider">
          <input type="range" class="min-price" value="100" min="10" max="500" step="10">
          <input type="range" class="max-price" value="250" min="10" max="500" step="10">
        </div>
    </div>
</template>

<script>
let minValue = document.getElementById("min-value");
let maxValue = document.getElementById("max-value");

function validateRange(minPrice, maxPrice) {
  if (minPrice > maxPrice) {

    // Swap to Values
    let tempValue = maxPrice;
    maxPrice = minPrice;
    minPrice = tempValue;
  }

  minValue.innerHTML = "$" + minPrice;
  maxValue.innerHTML = "$" + maxPrice;
}

const inputElements = document.querySelectorAll("input");

inputElements.forEach((element) => {
  element.addEventListener("change", () => {
    let minPrice = parseInt(inputElements[0].value);
    let maxPrice = parseInt(inputElements[1].value);

    validateRange(minPrice, maxPrice);
  });
});

validateRange(inputElements[0].value, inputElements[1].value);
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

body {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #36b37e;
}

.card {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
}

h4 {
  color: #000;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.price-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;
}

label {
  font-size: 12px;
  font-weight: 500;
}

p {
  font-size: 16px;
  font-weight: 600;
}

.range-slider {
  width: 400px;
  position: relative;
  margin: 15px 0 30px 0;
}

input[type=range] {
  
  width: 100%;
  background: transparent; 
  position: absolute;
  left: 0;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background: #36b37e;
  cursor: pointer;
  margin-top: -5px;
  position: relative;
  z-index: 1;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background: #e8e8e8;
  border-radius: 3px;
  border: none;
}
</style>