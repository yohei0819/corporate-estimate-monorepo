<template>
  <details class="faq-item">
    <summary class="faq-item__question">
      <span class="faq-item__question-text">{{ question }}</span>
      <span class="faq-item__icon" aria-hidden="true" />
    </summary>
    <div class="faq-item__answer">
      <p>{{ answer }}</p>
    </div>
  </details>
</template>

<script setup lang="ts">
defineProps<{
  question: string;
  answer: string;
}>();
</script>

<style lang="scss" scoped>
.faq-item {
  border: 1px solid $color-border;
  border-radius: $border-radius-md;
  overflow: hidden;

  & + & {
    margin-top: $spacing-md;
  }

  &__question {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $spacing-md;
    padding: $spacing-lg;
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-text;
    cursor: pointer;
    list-style: none;
    transition: background-color $transition-base;

    &:hover {
      background-color: $color-bg-light;
    }

    &::-webkit-details-marker {
      display: none;
    }
  }

  &__question-text {
    flex: 1;
  }

  &__icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: $color-secondary;
      transition: transform $transition-base;
    }

    &::before {
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      transform: translateY(-50%);
    }

    &::after {
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      transform: translateX(-50%);
    }
  }

  &[open] &__icon::after {
    transform: translateX(-50%) rotate(90deg);
  }

  &__answer {
    padding: 0 $spacing-lg $spacing-lg;
    font-size: $font-size-base;
    color: $color-text-light;
    line-height: 1.8;
  }
}
</style>
