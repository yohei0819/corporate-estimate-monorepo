<template>
  <div class="page-works">
    <UiBreadcrumb :crumbs="[{ label: '導入実績' }]" />
    <UiPageHero
      title="導入実績"
      subtitle="Works"
      description="さまざまな業界のお客様にサービスをご利用いただいています。"
    />

    <section class="page-works__list">
      <div class="page-works__list-inner">
        <div class="page-works__grid">
          <UiBaseCard v-for="work in works" :key="work.id" hoverable>
            <div class="page-works__card-meta">
              <span class="page-works__card-category">{{ categoryLabel(work.category) }}</span>
              <span class="page-works__card-industry">{{ work.industry }}</span>
            </div>
            <h3 class="page-works__card-title">{{ work.title }}</h3>
            <p class="page-works__card-desc">{{ work.description }}</p>
            <div class="page-works__card-footer">
              <span class="page-works__card-client">{{ work.clientName }}</span>
              <span class="page-works__card-period">{{ work.period }}</span>
            </div>
          </UiBaseCard>
        </div>
      </div>
    </section>

    <UiCtaSection
      :title="cta.title"
      :description="cta.description"
      :button-label="cta.buttonLabel"
      :href="cta.href"
    />
  </div>
</template>

<script setup lang="ts">
import { MOCK_WORKS, MOCK_CTA } from '@corporate-estimate/shared';
import type { WorkCategory } from '@corporate-estimate/shared';

useSeoMeta({
  title: '導入実績 | Corporate Estimate',
  description: 'さまざまな業界のお客様にサービスをご利用いただいています。IT導入、セキュリティ、コスト最適化の導入事例をご紹介します。',
  ogTitle: '導入実績 | Corporate Estimate',
  ogDescription: 'さまざまな業界のお客様の導入事例をご紹介します。',
});

const works = MOCK_WORKS;
const cta = MOCK_CTA;

const CATEGORY_LABELS: Record<WorkCategory, string> = {
  it: 'IT導入',
  security: 'セキュリティ',
  cost: 'コスト最適化',
  consulting: 'コンサルティング',
};

function categoryLabel(category: WorkCategory): string {
  return CATEGORY_LABELS[category];
}
</script>

<style lang="scss" scoped>
.page-works {
  &__list {
    padding: $spacing-3xl 0;
  }

  &__list-inner {
    @include container;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card-meta {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__card-category {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-white;
    background-color: $color-primary;
    border-radius: $border-radius-sm;
  }

  &__card-industry {
    font-size: $font-size-xs;
    color: $color-text-light;
  }

  &__card-title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-sm;
  }

  &__card-desc {
    font-size: $font-size-sm;
    color: $color-text-light;
    line-height: 1.7;
    margin-bottom: $spacing-lg;
  }

  &__card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $spacing-md;
    border-top: 1px solid $color-border;
  }

  &__card-client {
    font-size: $font-size-sm;
    font-weight: 600;
    color: $color-text;
  }

  &__card-period {
    font-size: $font-size-xs;
    color: $color-text-light;
  }
}
</style>
