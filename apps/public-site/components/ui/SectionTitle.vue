<template>
  <component :is="tag" :class="['section-title', `section-title--${align}`]">
    <span v-if="subtitle" class="section-title__subtitle">{{ subtitle }}</span>
    <span class="section-title__text">{{ title }}</span>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string;
  subtitle?: string;
  tag?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
}>(), {
  tag: 'h2',
  align: 'center',
});
</script>

<style lang="scss" scoped>
.section-title {
  margin-bottom: $spacing-xl;

  &--center {
    text-align: center;
  }

  &--left {
    text-align: left;
  }

  &__subtitle {
    display: block;
    font-size: $font-size-sm;
    color: $color-primary;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $spacing-xs;
  }

  &__text {
    display: block;
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text;

    @include respond-to(md) {
      font-size: $font-size-3xl;
    }
  }
}
</style>
