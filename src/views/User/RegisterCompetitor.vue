<template>
  <div>
    <h2>Register Competitor</h2>
    <form @submit.prevent="registerCompetitor">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="competitor.firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="competitor.lastName" required />
      </div>
      <div>
        <label for="artDescription">Art Description:</label>
        <textarea id="artDescription" v-model="competitor.artDescription" required></textarea>
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="competitor.phone" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="competitor.email" required />
      </div>
      <div>
        <label for="category">Category:</label>
        <input type="text" id="category" v-model="competitor.category" required />
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" @change="onFileChange" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      competitor: {
        firstName: '',
        lastName: '',
        artDescription: '',
        phone: '',
        email: '',
        category: '',
        image: null,
      },
    };
  },
  methods: {
    registerCompetitor() {
      const formData = new FormData();
      formData.append('firstName', this.competitor.firstName);
      formData.append('lastName', this.competitor.lastName);
      formData.append('artDescription', this.competitor.artDescription);
      formData.append('phone', this.competitor.phone);
      formData.append('email', this.competitor.email);
      formData.append('category', this.competitor.category);
      formData.append('image', this.competitor.image);

      fetch('http://localhost:8081/competitors/registerCompetitor', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
        .then(data => {
          console.log(data); 
          this.$router.push('/signupSuccess');
        })
        .catch(error => {
          console.error(error);
          this.errorMessage = 'An error occurred while registering.';
        });
    },
    onFileChange(event) {
      this.competitor.image = event.target.files[0];
    },

    validateForm() {
      this.errors = {};
      const ethiopiaCode = '+251';
      if (!this.firstname) {
        this.errors.firstname = 'First name is required.';
      }
      if (!this.lastname) {
        this.errors.lastname = 'Last name is required.';
      }
      if (!this.email) {
        this.errors.email = 'Email is required.';
      }else if (!this.validEmail(this.email)) {
    this.errors.email = 'Please enter a valid email address.';
  }
      if (!this.phone) {
        this.errors.phone = 'Phone number is required.';
      }else if (
    !(
      (this.phone.startsWith(ethiopiaCode + '9') || this.phone.startsWith(ethiopiaCode + '7')) && this.phone.length === 10
      || this.phone.startsWith(ethiopiaCode + '9') && this.phone.length === 13
      || this.phone.startsWith(ethiopiaCode + '7') && this.phone.length === 13
    )
  ) {
    this.errors.phone = 'Invalid phone number format.';
  }
      return Object.keys(this.errors).length === 0;
    },
    validEmail(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}
  },
};
</script>


<style scoped>
  /* Style for the Register Competitor form */
  .register-form {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  /* Style for the form labels */
  .register-form label {
    display: inline-block;
    width: 120px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  /* Style for the form inputs */
  .register-form input[type="text"],
  .register-form input[type="email"],
  .register-form textarea {
    width: 200px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
  }

  /* Style for the file input */
  .register-form input[type="file"] {
    margin-bottom: 10px;
  }

  /* Style for the submit button */
  .register-form button[type="submit"] {
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Style for the heading */
  .register-form h2 {
    margin-top: 0;
  }

</style>