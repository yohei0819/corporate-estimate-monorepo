<template>
  <section class="page-hero">
    <div class="page-hero__inner">
      <UiSectionTitle :title="title" :subtitle="subtitle" tag="h1" />
      <p v-if="description" class="page-hero__description">{{ description }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  description?: string;
}>();
</script>

<style lang="scss" scoped>
.page-hero {
  padding: $spacing-3xl 0;
  background-color: $color-bg-light;
  text-align: center;

  &__inner {
    @include container;
  }

  &__description {
    font-size: $font-size-lg;
    color: $color-text-light;
    max-width: 640px;
    margin-inline: auto;
  }
}
</style>
