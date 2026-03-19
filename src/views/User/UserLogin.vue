<template>
  <div class="auth-page">
    <!-- Left panel: artwork showcase -->
    <div class="auth-panel auth-panel--art" aria-hidden="true">
      <div class="art-overlay"></div>
      <div class="art-content">
        <div class="art-logo">
          <div class="auth-brand">
            <span class="auth-brand__kelem">KELEM</span>
            <span class="auth-brand__sub">Online Art Gallery</span>
          </div>
        </div>
        <blockquote class="art-quote">
          <p>"Art enables us to find ourselves and lose ourselves at the same time."</p>
          <cite>— Thomas Merton</cite>
        </blockquote>
        <div class="art-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>

    <!-- Right panel: form -->
    <div class="auth-panel auth-panel--form">
      <div class="auth-form-wrap">
        <div class="auth-header">
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Sign in to your Kelem account</p>
        </div>

        <transition name="fade">
          <div v-if="errorMessage" class="auth-alert">
            <i class="fas fa-exclamation-circle"></i>
            {{ errorMessage }}
          </div>
        </transition>

        <form @submit.prevent="submitForm" class="auth-form" novalidate>
          <!-- Email -->
          <div class="field" :class="{ 'field--error': fieldErrors.email, 'field--filled': email }">
            <label for="login-email" class="field__label">Email or Username</label>
            <div class="field__input-wrap">
              <i class="fas fa-envelope field__icon"></i>
              <input
                id="login-email"
                v-model="email"
                type="text"
                class="field__input"
                placeholder="you@example.com"
                autocomplete="username"
                @blur="validateField('email')"
              />
            </div>
            <span v-if="fieldErrors.email" class="field__error">{{ fieldErrors.email }}</span>
          </div>

          <!-- Password -->
          <div class="field" :class="{ 'field--error': fieldErrors.password, 'field--filled': password }">
            <label for="login-password" class="field__label">Password</label>
            <div class="field__input-wrap">
              <i class="fas fa-lock field__icon"></i>
              <input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="field__input"
                placeholder="••••••••"
                autocomplete="current-password"
                @blur="validateField('password')"
              />
              <button type="button" class="field__toggle" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <span v-if="fieldErrors.password" class="field__error">{{ fieldErrors.password }}</span>
          </div>

          <div class="auth-form__row">
            <router-link to="/forgotPassword" class="auth-link">Forgot password?</router-link>
          </div>

          <button type="submit" class="auth-btn" :disabled="loading">
            <span v-if="!loading">Sign In</span>
            <span v-else class="auth-btn__spinner"><i class="fas fa-circle-notch fa-spin"></i> Signing in...</span>
          </button>
        </form>

        <p class="auth-switch">
          Don't have an account?
          <router-link to="/register" class="auth-link auth-link--bold">Create one</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { setAuthToken } from '@/utils/auth';
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

export default {
  name: 'UserLogin',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const loading = ref(false);
    const showPassword = ref(false);
    const fieldErrors = ref({ email: '', password: '' });

    function validateField(field) {
      if (field === 'email' && !email.value.trim()) {
        fieldErrors.value.email = 'Email or username is required.';
      } else {
        fieldErrors.value.email = '';
      }
      if (field === 'password' && !password.value) {
        fieldErrors.value.password = 'Password is required.';
      } else if (field === 'password') {
        fieldErrors.value.password = '';
      }
    }

    function validate() {
      validateField('email');
      validateField('password');
      return !fieldErrors.value.email && !fieldErrors.value.password;
    }

    const submitForm = async () => {
      errorMessage.value = '';
      if (!validate()) return;
      loading.value = true;
      try {
        const response = await axios.post('http://localhost:8082/api/auth/login', {
          username: email.value,
          password: password.value,
        });

        if (response.data.accessToken && response.data.role) {
          const jwtToken = response.data.accessToken;
          const role = response.data.role;
          setAuthToken(jwtToken);
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('role', role);

          const routes = {
            ADMIN: '/adminDashboard',
            CUSTOMER: '/customerDashboard',
            ARTIST: '/artistDashboard',
            MANAGER: '/managerDashboard',
            ORGANIZATION: '/managerDashboard',
          };
          router.push(routes[role] || '/');
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Incorrect username or password.';
      } finally {
        loading.value = false;
      }
    };

    return { email, password, errorMessage, loading, showPassword, fieldErrors, validateField, submitForm };
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Art Panel ── */
.auth-panel--art {
  position: relative;
  background: url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400&q=80') center/cover no-repeat;
  flex: 1.1;
}

.art-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99,102,241,0.82) 0%, rgba(139,92,246,0.75) 50%, rgba(17,24,39,0.85) 100%);
}

.art-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
  max-width: 480px;
}

.art-logo img {
  height: 56px;
  filter: brightness(0) invert(1);
}

.auth-brand {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.auth-brand__kelem {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #fff;
  line-height: 1;
}
.auth-brand__sub {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
}

.art-quote {
  margin: 0;
  border-left: 3px solid rgba(255,255,255,0.5);
  padding-left: 1.25rem;
}
.art-quote p {
  font-size: 1.25rem;
  font-style: italic;
  color: rgba(255,255,255,0.92);
  line-height: 1.7;
  margin: 0 0 0.75rem;
}
.art-quote cite {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  font-style: normal;
}

.art-dots {
  display: flex;
  gap: 8px;
}
.art-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
}
.art-dots span:first-child { background: #fff; width: 24px; border-radius: 4px; }

/* ── Form Panel ── */
.auth-panel--form {
  background: #fafafa;
  padding: 2rem;
}

.auth-form-wrap {
  width: 100%;
  max-width: 420px;
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
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.875rem;
}

/* ── Form ── */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

/* ── Field ── */
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field__label {
  font-size: 0.8rem;
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
  font-size: 0.9rem;
  pointer-events: none;
  transition: color 0.2s;
}

.field__input {
  width: 100%;
  padding: 0.75rem 2.75rem 0.75rem 2.5rem;
  font-size: 0.95rem;
  color: #111827;
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field__input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}
.field__input:focus ~ .field__icon,
.field__input-wrap:focus-within .field__icon {
  color: #6366f1;
}

.field--error .field__input {
  border-color: #ef4444;
}
.field--error .field__input:focus {
  box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
}

.field__toggle {
  position: absolute;
  right: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 0.9rem;
  padding: 0;
  transition: color 0.2s;
}
.field__toggle:hover { color: #6366f1; }

.field__error {
  font-size: 0.78rem;
  color: #ef4444;
}

/* ── Row ── */
.auth-form__row {
  display: flex;
  justify-content: flex-end;
}

/* ── Submit Button ── */
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
@media (max-width: 768px) {
  .auth-panel--art { display: none; }
  .auth-panel--form {
    background: #fff;
    padding: 2rem 1.5rem;
    min-height: 100vh;
    align-items: flex-start;
    padding-top: 5rem;
  }
  .auth-form-wrap { max-width: 100%; }
  .auth-title { font-size: 1.75rem; }
}
</style>
