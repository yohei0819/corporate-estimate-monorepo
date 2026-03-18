<template>
  <div class="error-page">
    <div class="error-page__inner">
      <p class="error-page__code">{{ error?.statusCode || 404 }}</p>
      <h1 class="error-page__title">
        {{ error?.statusCode === 500 ? 'サーバーエラーが発生しました' : 'ページが見つかりません' }}
      </h1>
      <p class="error-page__message">
        {{ error?.statusCode === 500
          ? '一時的な問題が発生しています。時間をおいて再度お試しください。'
          : 'お探しのページは存在しないか、移動された可能性があります。' }}
      </p>
      <div class="error-page__actions">
        <UiBaseButton variant="primary" href="/">ホームに戻る</UiBaseButton>
        <UiBaseButton variant="outline" href="/contact">お問い合わせ</UiBaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

useSeoMeta({
  title: `${props.error?.statusCode || 404} - ページが見つかりません | Corporate Estimate`,
});
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: $spacing-xl;
  text-align: center;

  &__inner {
    max-width: 480px;
  }

  &__code {
    font-size: 5rem;
    font-weight: 800;
    color: $color-primary;
    opacity: 0.3;
    line-height: 1;
    margin-bottom: $spacing-md;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-md;
  }

  &__message {
    font-size: $font-size-base;
    color: $color-text-light;
    line-height: 1.7;
    margin-bottom: $spacing-xl;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    flex-wrap: wrap;
  }
}
</style>
