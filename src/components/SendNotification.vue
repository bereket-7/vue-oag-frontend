<template>
    <div class="container-fluid rounded bg-white mt-0">
      <h1 class="Heading">Send Notification</h1>
        <div class="row">
          <div class="col-md-8 border-right">
              <div class="p-3 py-5">
                <form class="form-container">
    <label for="Email">Email</label>
    <input type="text" id="Email" name="firstname" placeholder="Your Email">

    <label for="message">Message</label>
    <textarea id="message" name="subject" placeholder="Write something.." style="height:200px"></textarea>

    <input type="submit" value="Send">

  </form>          
    </div>
    </div>
    </div>
    </div>
</template>

<script>

</script>


<style scoped>
input[type=text],textarea {
  width: 100%; 
  padding: 12px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  box-sizing: border-box; 
  margin-top: 6px; 
  margin-bottom: 16px; 
  resize: vertical
}
.form-container{
  margin-left: 150px;
}
input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.Heading{
  margin-left: 150px;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: #45a049;
}
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.form-control:focus {
      box-shadow: none;
      border-color: black
  }
  .back:hover {
      color: #682773;
      cursor: pointer
  }
  
  .labels {
      font-size: 11px
  }
  
  .add-experience:hover {
      background: #BA68C8;
      color: #fff;
      cursor: pointer;
      border: solid 1px #BA68C8
  }
  
</style>