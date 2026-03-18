<template>
  <section class="cta-section">
    <div class="cta-section__inner">
      <h2 class="cta-section__title">{{ title }}</h2>
      <p class="cta-section__description">{{ description }}</p>
      <UiBaseButton
        variant="primary"
        size="lg"
        :href="resolvedHref"
        :external="isDiagnosisLink"
      >
        {{ buttonLabel }}
      </UiBaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}>();

const config = useRuntimeConfig();
const isDiagnosisLink = computed(() => props.href === '/diagnosis');
const resolvedHref = computed(() =>
  isDiagnosisLink.value
    ? `${config.public.diagnosisAppOrigin}/diagnosis`
    : props.href,
);
</script>

<style lang="scss" scoped>
.cta-section {
  background-color: $color-primary;
  padding: $spacing-3xl 0;

  &__inner {
    @include container;
    text-align: center;
  }

  &__title {
    font-size: $font-size-2xl;
    color: $color-white;
    margin-bottom: $spacing-md;

    @include respond-to(md) {
      font-size: $font-size-3xl;
    }
  }

  &__description {
    font-size: $font-size-lg;
    color: rgba($color-white, 0.9);
    margin-bottom: $spacing-xl;
    max-width: 600px;
    margin-inline: auto;
  }

  // CTA 背景が $color-primary のため、ボタンを白背景に反転
  :deep(.base-button) {
    background-color: $color-white;
    color: $color-primary;
    border-color: $color-white;

    &:hover {
      background-color: rgba($color-white, 0.9);
    }
  }
}
</style>
