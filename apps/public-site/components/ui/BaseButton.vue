<template>
  <a
    v-if="href && isExternalUrl"
    :href="href"
    :class="classes"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
  <a
    v-else-if="href && external"
    :href="href"
    :class="classes"
  >
    <slot />
  </a>
  <NuxtLink
    v-else-if="href"
    :to="href"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  /** @deprecated Use href prop instead – tag is kept for backward compatibility */
  tag?: 'button' | 'a';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  /** Nuxt ルーター外への遷移（クライアントサイドルーティングをスキップ） */
  external?: boolean;
}>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  type: 'button',
  disabled: false,
  external: false,
});

const isExternalUrl = computed(() =>
  props.href?.startsWith('http://') || props.href?.startsWith('https://'),
);

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  props.disabled ? 'base-button--disabled' : '',
].filter(Boolean));
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-family-base;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: $border-radius-md;
  cursor: pointer;
  text-decoration: none;
  transition: background-color $transition-base, color $transition-base, border-color $transition-base;

  // Sizes
  &--sm {
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-sm;
  }

  &--md {
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-base;
  }

  &--lg {
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-lg;
  }

  // Variants
  &--primary {
    background-color: var(--color-primary);
    color: #ffffff;

    &:hover {
      background-color: var(--color-primary-dark);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    color: #ffffff;

    &:hover {
      opacity: 0.9;
    }
  }

  &--outline {
    background-color: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);

    &:hover {
      background-color: var(--color-primary);
      color: #ffffff;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:disabled,
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
