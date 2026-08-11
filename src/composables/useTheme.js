import { ref, readonly } from 'vue';

const isDark = ref(false);

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value);
}

export function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    isDark.value = true;
  } else if (saved === 'light') {
    isDark.value = false;
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();
}

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    applyTheme();
  };

  return { isDark: readonly(isDark), toggleTheme };
}
