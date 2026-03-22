<template>
  <div class="page-terms">
    <UiBreadcrumb :crumbs="[{ label: '利用規約' }]" />
    <UiPageHero
      title="利用規約"
      subtitle="Terms of Service"
      description="サービスのご利用条件について"
    />

    <section class="page-terms__content">
      <div class="page-terms__inner">
        <p class="page-terms__text">
          利用規約の内容は準備中です。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '利用規約 | Corporate Estimate',
  description: 'サービスのご利用条件についてご説明します。',
  ogTitle: '利用規約 | Corporate Estimate',
  ogDescription: 'サービスのご利用条件についてご説明します。',
});
</script>

<style lang="scss" scoped>
.page-terms {
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
