<template>
  <div :class="['base-card', { 'base-card--hoverable': hoverable }]">
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </div>
    <div class="base-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  hoverable?: boolean;
}>(), {
  hoverable: false,
});
</script>

<style lang="scss" scoped>
.base-card {
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: $border-radius-lg;
  overflow: hidden;
  transition: box-shadow $transition-base;

  &--hoverable:hover {
    box-shadow: $shadow-md;
  }

  &__header {
    padding: $spacing-lg $spacing-lg 0;
  }

  &__body {
    padding: $spacing-lg;
  }

  &__footer {
    padding: 0 $spacing-lg $spacing-lg;
    border-top: 1px solid $color-border;
    padding-top: $spacing-lg;
  }
}
</style>
