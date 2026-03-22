<template>
  <div class="page-privacy">
    <UiBreadcrumb :crumbs="[{ label: 'プライバシーポリシー' }]" />
    <UiPageHero
      title="プライバシーポリシー"
      subtitle="Privacy Policy"
      description="個人情報の取り扱いについて"
    />

    <section class="page-privacy__content">
      <div class="page-privacy__inner">
        <p class="page-privacy__text">
          プライバシーポリシーの内容は準備中です。
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'プライバシーポリシー | Corporate Estimate',
  description: '個人情報の取り扱いについてご説明します。',
  ogTitle: 'プライバシーポリシー | Corporate Estimate',
  ogDescription: '個人情報の取り扱いについてご説明します。',
});
</script>

<style lang="scss" scoped>
.page-privacy {
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
