<template>
  <div class="page-legal">
    <UiBreadcrumb :crumbs="[{ label: '特定商取引法に基づく表記' }]" />
    <UiPageHero
      title="特定商取引法に基づく表記"
      subtitle="Legal Notice"
      description="特定商取引法に基づく表記について"
    />

    <section class="page-legal__content">
      <div class="page-legal__inner">
        <p class="page-legal__text">
          特定商取引法に基づく表記の内容は準備中です。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '特定商取引法に基づく表記 | Corporate Estimate',
  description: '特定商取引法に基づく表記についてご説明します。',
  ogTitle: '特定商取引法に基づく表記 | Corporate Estimate',
  ogDescription: '特定商取引法に基づく表記についてご説明します。',
});
</script>

<style lang="scss" scoped>
.page-legal {
  &__content {
    padding: $spacing-xl 0;

    @include respond-to(md) {
      padding: $spacing-3xl 0;
    }
  }

  &__inner {
    @include container;
    max-width: 800px;
  }

  &__text {
    font-size: $font-size-base;
    line-height: 1.8;
    color: var(--color-text);
  }
}
</style>
