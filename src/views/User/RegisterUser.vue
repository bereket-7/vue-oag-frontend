<template>
  <div class="auth-page">
    <!-- Left art panel -->
    <div class="auth-panel auth-panel--art" aria-hidden="true">
      <div class="art-overlay"></div>
      <div class="art-content">
        <div class="art-logo">
          <img src="@/assets/img/Kelem.png" alt="Kelem" />
        </div>
        <div class="art-tagline">
          <h2>Join Kelem</h2>
          <p>Discover, collect, and showcase extraordinary art from talented artists around the world.</p>
        </div>
        <div class="art-swatches">
          <span style="background:#815A8F"></span>
          <span style="background:#6730EC"></span>
          <span style="background:#9ED763"></span>
          <span style="background:#FBD400"></span>
          <span style="background:#FF9000"></span>
          <span style="background:#F73F52"></span>
        </div>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="auth-panel auth-panel--form">
      <div class="auth-form-wrap">
        <div class="auth-header">
          <h1 class="auth-title">Create account</h1>
          <p class="auth-subtitle">Start your art journey today</p>
        </div>

        <transition name="fade">
          <div v-if="errorMessage" class="auth-alert auth-alert--error">
            <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
          </div>
        </transition>

        <form @submit.prevent="submitForm" class="auth-form" novalidate>
          <!-- Row: First + Last name -->
          <div class="form-row">
            <div class="field" :class="{ 'field--error': errors.firstname }">
              <label class="field__label">First Name</label>
              <div class="field__input-wrap">
                <i class="fas fa-user field__icon"></i>
                <input v-model="firstname" type="text" class="field__input" placeholder="John" autocomplete="given-name" />
              </div>
              <span v-if="errors.firstname" class="field__error">{{ errors.firstname }}</span>
            </div>
            <div class="field" :class="{ 'field--error': errors.lastname }">
              <label class="field__label">Last Name</label>
              <div class="field__input-wrap">
                <i class="fas fa-user field__icon"></i>
                <input v-model="lastname" type="text" class="field__input" placeholder="Doe" autocomplete="family-name" />
              </div>
              <span v-if="errors.lastname" class="field__error">{{ errors.lastname }}</span>
            </div>
          </div>

          <!-- Email -->
          <div class="field" :class="{ 'field--error': errors.email }">
            <label class="field__label">Email</label>
            <div class="field__input-wrap">
              <i class="fas fa-envelope field__icon"></i>
              <input v-model="email" type="email" class="field__input" placeholder="you@example.com" autocomplete="email" />
            </div>
            <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
          </div>

          <!-- Row: Phone + Age -->
          <div class="form-row">
            <div class="field" :class="{ 'field--error': errors.phone }">
              <label class="field__label">Phone</label>
              <div class="field__input-wrap">
                <i class="fas fa-phone field__icon"></i>
                <input v-model="phone" type="tel" class="field__input" placeholder="09xxxxxxxx" autocomplete="tel" />
              </div>
              <span v-if="errors.phone" class="field__error">{{ errors.phone }}</span>
            </div>
            <div class="field" :class="{ 'field--error': errors.age }">
              <label class="field__label">Age</label>
              <div class="field__input-wrap">
                <i class="fas fa-calendar field__icon"></i>
                <input v-model="age" type="number" class="field__input" placeholder="25" min="18" />
              </div>
              <span v-if="errors.age" class="field__error">{{ errors.age }}</span>
            </div>
          </div>

          <!-- Address -->
          <div class="field" :class="{ 'field--error': errors.address }">
            <label class="field__label">Address</label>
            <div class="field__input-wrap">
              <i class="fas fa-map-marker-alt field__icon"></i>
              <input v-model="address" type="text" class="field__input" placeholder="Addis Ababa, Ethiopia" autocomplete="street-address" />
            </div>
            <span v-if="errors.address" class="field__error">{{ errors.address }}</span>
          </div>

          <!-- Row: Gender + Role -->
          <div class="form-row">
            <div class="field" :class="{ 'field--error': errors.sex }">
              <label class="field__label">Gender</label>
              <div class="radio-group">
                <label class="radio-option" :class="{ active: sex === 'female' }">
                  <input type="radio" v-model="sex" value="female" /> Female
                </label>
                <label class="radio-option" :class="{ active: sex === 'male' }">
                  <input type="radio" v-model="sex" value="male" /> Male
                </label>
              </div>
              <span v-if="errors.sex" class="field__error">{{ errors.sex }}</span>
            </div>
            <div class="field" :class="{ 'field--error': errors.role }">
              <label class="field__label">I am a</label>
              <div class="field__input-wrap">
                <i class="fas fa-id-badge field__icon"></i>
                <select v-model="role" class="field__input field__select">
                  <option value="" disabled>Select role</option>
                  <option value="CUSTOMER">Art Collector</option>
                  <option value="ARTIST">Artist</option>
                </select>
              </div>
              <span v-if="errors.role" class="field__error">{{ errors.role }}</span>
            </div>
          </div>

          <!-- Username -->
          <div class="field" :class="{ 'field--error': errors.username }">
            <label class="field__label">Username</label>
            <div class="field__input-wrap">
              <i class="fas fa-at field__icon"></i>
              <input v-model="username" type="text" class="field__input" placeholder="johndoe" autocomplete="username" />
            </div>
            <span v-if="errors.username" class="field__error">{{ errors.username }}</span>
          </div>

          <!-- Password -->
          <div class="field" :class="{ 'field--error': errors.password }">
            <label class="field__label">Password</label>
            <div class="field__input-wrap">
              <i class="fas fa-lock field__icon"></i>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" class="field__input" placeholder="Min. 6 characters" autocomplete="new-password" />
              <button type="button" class="field__toggle" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div v-if="password" class="password-strength">
              <div class="password-strength__bar">
                <div class="password-strength__fill" :style="{ width: strengthPercent + '%', background: strengthColor }"></div>
              </div>
              <span class="password-strength__label" :style="{ color: strengthColor }">{{ strengthLabel }}</span>
            </div>
            <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
          </div>

          <!-- Confirm Password -->
          <div class="field" :class="{ 'field--error': errors.confirmPassword || passwordError }">
            <label class="field__label">Confirm Password</label>
            <div class="field__input-wrap">
              <i class="fas fa-lock field__icon"></i>
              <input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'" class="field__input" placeholder="Repeat password" autocomplete="new-password" />
              <button type="button" class="field__toggle" @click="showConfirm = !showConfirm">
                <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="field__error">{{ errors.confirmPassword }}</span>
            <span v-if="passwordError" class="field__error">{{ passwordError }}</span>
          </div>

          <button type="submit" class="auth-btn" :disabled="loading">
            <span v-if="!loading">Create Account</span>
            <span v-else class="auth-btn__spinner"><i class="fas fa-circle-notch fa-spin"></i> Creating...</span>
          </button>
        </form>

        <p class="auth-switch">
          Already have an account?
          <router-link to="/userlogin" class="auth-link auth-link--bold">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterUser',
  components: {},
  data() {
    return {
      firstname: '', lastname: '', email: '', phone: '',
      address: '', sex: '', age: '', username: '',
      password: '', confirmPassword: '', role: '',
      errors: {}, passwordError: '', errorMessage: '',
      loading: false, showPassword: false, showConfirm: false,
    };
  },
  computed: {
    strengthScore() {
      const p = this.password;
      if (!p) return 0;
      let score = 0;
      if (p.length >= 6) score++;
      if (p.length >= 10) score++;
      if (/[A-Z]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      return score;
    },
    strengthPercent() { return (this.strengthScore / 5) * 100; },
    strengthColor() {
      const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
      return colors[Math.min(this.strengthScore - 1, 4)] || '#ef4444';
    },
    strengthLabel() {
      const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
      return labels[Math.min(this.strengthScore - 1, 4)] || 'Very Weak';
    },
  },
  methods: {
    async register() {
      this.loading = true;
      try {
        await axios.post('http://localhost:8082/api/v1/registration/register', {
          firstname: this.firstname, lastname: this.lastname,
          email: this.email, phone: this.phone,
          address: this.address, sex: this.sex,
          age: this.age, username: this.username,
          password: this.password, role: this.role,
        });
        this.$router.push('/signupSuccess');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    submitForm() {
      this.errors = {};
      this.passwordError = '';
      if (!this.validateForm()) return;
      this.register();
    },
    validateForm() {
      const e = this.errors;
      const ethiopiaCode = '+251';
      if (!this.firstname.trim()) e.firstname = 'First name is required.';
      if (!this.lastname.trim()) e.lastname = 'Last name is required.';
      if (!this.email.trim()) {
        e.email = 'Email is required.';
      } else if (!this.validEmail(this.email)) {
        e.email = 'Enter a valid email address.';
      }
      if (!this.phone) {
        e.phone = 'Phone number is required.';
      } else if (
        !(
          ((this.phone.startsWith('09') || this.phone.startsWith('07')) && this.phone.length === 10) ||
          ((this.phone.startsWith(ethiopiaCode + '9') || this.phone.startsWith(ethiopiaCode + '7')) && this.phone.length === 13)
        )
      ) {
        e.phone = 'Invalid phone number format.';
      }
      if (!this.address.trim()) e.address = 'Address is required.';
      if (!this.age) {
        e.age = 'Age is required.';
      } else if (this.age < 18) {
        e.age = 'Must be at least 18 years old.';
      }
      if (!this.sex) e.sex = 'Gender is required.';
      if (!this.role) e.role = 'Please select a role.';
      if (!this.username.trim()) e.username = 'Username is required.';
      if (!this.password) {
        e.password = 'Password is required.';
      } else if (this.password.length < 6) {
        e.password = 'Password must be at least 6 characters.';
      }
      if (!this.confirmPassword) {
        e.confirmPassword = 'Please confirm your password.';
      } else if (this.password !== this.confirmPassword) {
        this.passwordError = 'Passwords do not match.';
      }
      return Object.keys(e).length === 0 && !this.passwordError;
    },
    validEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
  },
};
</script>

<style scoped>
/* ── Layout ── */
.auth-page {
  display: flex;
  min-height: 100vh;
}

.auth-panel {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Art Panel ── */
.auth-panel--art {
  position: sticky;
  top: 0;
  height: 100vh;
  flex: 0 0 380px;
  background: url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=80') center/cover no-repeat;
}

.art-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(99,102,241,0.88) 0%, rgba(139,92,246,0.8) 40%, rgba(17,24,39,0.9) 100%);
}

.art-content {
  position: relative;
  z-index: 1;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  justify-content: center;
}

.art-logo img {
  height: 52px;
  filter: brightness(0) invert(1);
}

.art-tagline h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.75rem;
  letter-spacing: -0.5px;
}
.art-tagline p {
  font-size: 1rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
  margin: 0;
}

.art-swatches {
  display: flex;
  gap: 10px;
}
.art-swatches span {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
  display: block;
}

/* ── Form Panel ── */
.auth-panel--form {
  flex: 1;
  background: #f9fafb;
  padding: 2rem;
  align-items: flex-start;
  overflow-y: auto;
}

.auth-form-wrap {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth-header { text-align: left; }

.auth-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.35rem;
  letter-spacing: -0.5px;
}
.auth-subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
}

/* ── Alert ── */
.auth-alert {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-size: 0.875rem;
}
.auth-alert--error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
}

/* ── Form ── */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* ── Field ── */
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field__label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.field__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.field__icon {
  position: absolute;
  left: 0.9rem;
  color: #9ca3af;
  font-size: 0.85rem;
  pointer-events: none;
  transition: color 0.2s;
}

.field__input {
  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 2.4rem;
  font-size: 0.9rem;
  color: #111827;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
}
.field__input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}
.field__input-wrap:focus-within .field__icon { color: #6366f1; }

.field--error .field__input {
  border-color: #ef4444;
}
.field--error .field__input:focus {
  box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
}

.field__select {
  padding-right: 1rem;
  cursor: pointer;
}

.field__toggle {
  position: absolute;
  right: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 0.85rem;
  padding: 0;
  transition: color 0.2s;
}
.field__toggle:hover { color: #6366f1; }

.field__error {
  font-size: 0.78rem;
  color: #ef4444;
}

/* ── Radio Group ── */
.radio-group {
  display: flex;
  gap: 0.5rem;
}

.radio-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.65rem 0.5rem;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}
.radio-option input[type="radio"] { display: none; }
.radio-option.active {
  border-color: #6366f1;
  background: rgba(99,102,241,0.07);
  color: #6366f1;
  font-weight: 600;
}

/* ── Password Strength ── */
.password-strength {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
}
.password-strength__bar {
  flex: 1;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}
.password-strength__fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease, background 0.3s ease;
}
.password-strength__label {
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ── Submit ── */
.auth-btn {
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99,102,241,0.4);
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  margin-top: 0.5rem;
}
.auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99,102,241,0.5);
}
.auth-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.auth-btn__spinner { display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

/* ── Links ── */
.auth-link {
  font-size: 0.875rem;
  color: #6366f1;
  text-decoration: none;
  transition: color 0.2s;
}
.auth-link:hover { color: #4f46e5; text-decoration: underline; }
.auth-link--bold { font-weight: 700; }

.auth-switch {
  text-align: center;
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* ── Transition ── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .auth-panel--art { display: none; }
}

@media (max-width: 768px) {
  .auth-panel--form {
    background: #fff;
    padding: 1.5rem;
    padding-top: 5rem;
  }
  .form-row { grid-template-columns: 1fr; }
  .auth-title { font-size: 1.75rem; }
}
</style>
