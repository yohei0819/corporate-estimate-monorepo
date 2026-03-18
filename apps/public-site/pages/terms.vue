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
useHead({ title: '利用規約' });
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
