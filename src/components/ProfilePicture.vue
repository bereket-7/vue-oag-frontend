<template>
    <div class="profile-card">
      <div class="profile-photo" v-if="profilePhotoUrl">
        <img :src="profilePhotoUrl" alt="Profile Photo" />
      </div>
      <div class="placeholder" v-else>
        <i class="fas fa-user"></i>
      </div>
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="uploadProfilePhoto">Upload</button>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      profilePhotoUrl: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadProfilePhoto() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('http://localhost:8082/api/users/profile/upload', formData);
        if (response.status === 200) {
          this.selectedFile = null;
          this.getProfilePhoto();
        }
      } catch (error) {
        console.error('Error uploading profile photo:', error);
      }
    },
    async getProfilePhoto() {
      try {
        const response = await axios.get('http://localhost:8082/api/users/profile/photo', { responseType: 'arraybuffer' });
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.profilePhotoUrl = `data:image/jpeg;base64,${base64Image}`;
      } catch (error) {
        console.error('Error getting profile photo:', error);
      }
    },
  },
  mounted() {
    this.getProfilePhoto();
  },
};
</script>

<style scoped>
.profile-card {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  margin-left: 20px;
}

.profile-photo {
  width: 70px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 20px;
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #d8d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #bbb;
}

input[type="file"] {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}

@media screen and (max-width: 768px) {
  .profile-card {
    width: 60%;
    margin: 0 auto;
    margin-top: 90px;
  }
}
</style>