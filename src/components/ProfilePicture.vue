<template>
  <div class="profile-card">
    <div
      v-if="profilePhotoUrl"
      class="profile-photo"
    >
      <img
        :src="profilePhotoUrl"
        alt="Profile Photo"
      >
    </div>
    <div
      v-else
      class="placeholder"
    >
      <i class="fas fa-user" />
    </div>
    <input
      ref="fileInput"
      type="file"
      @change="handleFileChange"
    >
    <button @click="uploadProfilePhoto">
      Upload
    </button>
  </div>
</template>

<script>
import { userService } from '@/services/userService';
import { resolveMediaUrl } from '@/utils/unwrap';

export default {
  data() {
    return {
      selectedFile: null,
      profilePhotoUrl: null,
    };
  },
  mounted() {
    this.getProfilePhoto();
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadProfilePhoto() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      try {
        const profile = await userService.uploadPhoto(formData);
        this.selectedFile = null;
        this.profilePhotoUrl = resolveMediaUrl(profile?.avatar || profile?.avatarUrl);
      } catch (error) {
        console.error('Error uploading profile photo:', error);
      }
    },
    async getProfilePhoto() {
      try {
        const profile = await userService.getProfile();
        this.profilePhotoUrl = resolveMediaUrl(profile?.avatar || profile?.avatarUrl);
      } catch (error) {
        console.error('Error getting profile photo:', error);
      }
    },
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
  object-cover: cover;
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
</style>
