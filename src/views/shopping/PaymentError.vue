<template>
    <div class="error-page">
      <h1>Error</h1>
      <p>Sorry, an error occurred during the payment process.</p>
      <p>Please try again later or contact customer support.</p>
    </div>
</template>
  
  <style>
  .error-page {
    text-align: center;
    margin-top: 50px;
  }
  
  .error-page h1 {
    font-size: 24px;
    color: #FF0000;
    margin-bottom: 20px;
  }
  
  .error-page p {
    font-size: 16px;
    color: #666666;
    margin-bottom: 10px;
  }
  @media (max-width: 768px) {
    .error-page {
      margin-top: 20px;
    }
  
    .error-page h1 {
      font-size: 20px;
    }
  
    .error-page p {
      font-size: 14px;
    }
  }
  </style>
  