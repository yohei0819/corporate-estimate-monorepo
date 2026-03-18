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
useHead({ title: '特定商取引法に基づく表記' });
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
    max-width: $content-max-width;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }

  &__text {
    font-size: $font-size-base;
    line-height: 1.8;
    color: $color-text;
  }
}
</style>
