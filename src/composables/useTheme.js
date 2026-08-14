import { ref, readonly } from 'vue';

const isDark = ref(false);

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value);
  document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light';
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark.value ? '#030712' : '#6366f1');
  }
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
