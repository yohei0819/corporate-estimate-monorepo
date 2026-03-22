<template>
  <Transition name="scroll-top">
    <button
      v-show="visible"
      class="scroll-to-top"
      type="button"
      aria-label="ページトップへ戻る"
      @click="scrollToTop"
    >
      <svg class="scroll-to-top__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 4L3 11l1.4 1.4L10 6.8l5.6 5.6L17 11z" fill="currentColor"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);

function handleScroll() {
  visible.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style lang="scss" scoped>
.scroll-to-top {
  position: fixed;
  bottom: $spacing-xl;
  right: $spacing-xl;
  width: 48px;
  height: 48px;
  border-radius: $border-radius-full;
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: background-color $transition-base, opacity $transition-base, transform $transition-base;
  z-index: 50;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
