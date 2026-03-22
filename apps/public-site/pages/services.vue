<template>
  <div class="page-services">
    <UiBreadcrumb :crumbs="[{ label: 'サービス' }]" />
    <UiPageHero
      title="サービス"
      subtitle="Services"
      description="お客様のIT課題に合わせた4つのサービスをご提供しています。"
    />

    <section
      v-for="(service, index) in services"
      :key="service.id"
      :class="['page-services__detail', { 'page-services__detail--alt': index % 2 === 1 }]"
    >
      <div class="page-services__detail-inner">
        <div class="page-services__detail-content">
          <span class="page-services__detail-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h2 class="page-services__detail-title">{{ service.title }}</h2>
          <p class="page-services__detail-desc">{{ service.description }}</p>

          <div class="page-services__detail-target">
            <h3 class="page-services__detail-target-heading">対象となるお客様</h3>
            <p class="page-services__detail-target-text">{{ service.targetAudience }}</p>
          </div>
        </div>

        <div class="page-services__detail-features">
          <h3 class="page-services__detail-features-heading">サービスの特長</h3>
          <ul class="page-services__detail-features-list">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="page-services__detail-features-item"
            >
              {{ feature }}
            </li>
          </ul>
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
import { MOCK_SERVICE_DETAILS, MOCK_CTA } from '@corporate-estimate/shared';

useSeoMeta({
  title: 'サービス一覧 | Corporate Estimate',
  description: 'IT導入診断、コスト最適化、セキュリティ監査、ITコンサルティングの4つのサービスで法人のIT課題を解決します。',
  ogTitle: 'サービス一覧 | Corporate Estimate',
  ogDescription: 'お客様のIT課題に合わせた4つのサービスをご提供しています。',
});

const services = MOCK_SERVICE_DETAILS;
const cta = MOCK_CTA;

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: MOCK_SERVICE_DETAILS.map((svc, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Service',
            name: svc.title,
            description: svc.description,
          },
        })),
      }),
    },
  ],
});
</script>

<style lang="scss" scoped>
.page-services {
  &__detail {
    padding: $spacing-3xl 0;

    &--alt {
      background-color: var(--color-bg-light);
    }
  }

  &__detail-inner {
    @include container;
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;

    @include respond-to(md) {
      grid-template-columns: 1fr 1fr;
      gap: $spacing-3xl;
      align-items: start;
    }
  }

  &__detail-number {
    display: block;
    font-size: $font-size-3xl;
    font-weight: 800;
    color: var(--color-primary);
    opacity: 0.3;
    margin-bottom: $spacing-sm;
  }

  &__detail-title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: $spacing-md;
  }

  &__detail-desc {
    font-size: $font-size-base;
    color: var(--color-text-light);
    line-height: 1.8;
    margin-bottom: $spacing-lg;
  }

  &__detail-target {
    padding: $spacing-lg;
    background-color: var(--color-bg-light);
    border-radius: $border-radius-md;

    .page-services__detail--alt & {
      background-color: var(--color-white);
    }
  }

  &__detail-target-heading {
    font-size: $font-size-sm;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: $spacing-xs;
  }

  &__detail-target-text {
    font-size: $font-size-base;
    color: var(--color-text);
  }

  &__detail-features {
    padding: $spacing-xl;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: $border-radius-lg;

    .page-services__detail--alt & {
      background-color: var(--color-white);
    }
  }

  &__detail-features-heading {
    font-size: $font-size-lg;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: $spacing-lg;
  }

  &__detail-features-list {
    list-style: none;
  }

  &__detail-features-item {
    position: relative;
    padding-left: $spacing-lg;
    margin-bottom: $spacing-md;
    font-size: $font-size-base;
    color: var(--color-text);
    line-height: 1.6;

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
      width: 8px;
      height: 8px;
      border-radius: $border-radius-full;
      background-color: var(--color-primary);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
