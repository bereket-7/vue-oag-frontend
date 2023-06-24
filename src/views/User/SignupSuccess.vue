<template>
    <div class="success">
        <h1>successfully registered</h1><br /><br />
    <h2>Check you emails ,To activate your account</h2> 
    </div>
</template>

<script>
export default {
    name:'SignupSuccess',
    setup() {
        
    },
}
</script>

<style scoped>
.success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f1f1f1;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  text-align: center;
  line-height: 1.5;
}

@media (max-width: 768px) {
  h1 {
    font-size: 30px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>






