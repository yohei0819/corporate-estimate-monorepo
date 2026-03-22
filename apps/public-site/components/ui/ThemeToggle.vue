<template>
  <button
    v-if="mounted"
    type="button"
    class="theme-toggle"
    :aria-label="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
    :title="isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'"
    @click="toggle"
  >
    <!-- Sun icon (shows in dark mode = click to go light) -->
    <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <!-- Moon icon (shows in light mode = click to go dark) -->
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';

/** localStorage から保存済みテーマを読み出す。不正値はスキップ */
function loadStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

const theme = ref<Theme>('light');
const mounted = ref(false);
const isDark = computed(() => theme.value === 'dark');

onMounted(() => {
  const initial = loadStoredTheme() ?? getSystemTheme();
  theme.value = initial;
  applyTheme(initial);
  mounted.value = true;
});

function toggle() {
  const next: Theme = theme.value === 'light' ? 'dark' : 'light';
  theme.value = next;
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: $border-radius-full;
  background-color: transparent;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color $transition-base, color $transition-base;

  &:hover {
    background-color: var(--color-bg-light);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
</style>
