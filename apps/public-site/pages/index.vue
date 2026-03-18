<template>
  <div class="page-index">
    <!-- Hero -->
    <section class="page-index__hero">
      <div class="page-index__hero-inner">
        <UiSectionTitle
          title="法人向けIT課題を解決する"
          subtitle="Corporate Estimate"
          tag="h1"
        />
        <p class="page-index__hero-lead">
          簡単な診断で御社に最適なITソリューションをご提案。<br>
          500社以上の導入実績をもとに、コスト最適化からセキュリティ強化まで対応します。
        </p>
        <div class="page-index__hero-actions">
          <UiBaseButton variant="primary" size="lg" :href="diagnosisUrl" external>
            無料で診断する
          </UiBaseButton>
          <UiBaseButton variant="outline" size="lg" href="/services">
            サービスを見る
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="page-index__services">
      <div class="page-index__services-inner">
        <UiSectionTitle title="サービス一覧" subtitle="Services" />
        <div class="page-index__services-grid">
          <UiBaseCard v-for="service in services" :key="service.id" hoverable>
            <h3 class="page-index__service-title">{{ service.title }}</h3>
            <p class="page-index__service-desc">{{ service.description }}</p>
          </UiBaseCard>
        </div>
        <div class="page-index__services-more">
          <UiBaseButton variant="outline" href="/services">
            サービス詳細を見る
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- Works -->
    <section class="page-index__works">
      <div class="page-index__works-inner">
        <UiSectionTitle title="導入実績" subtitle="Works" />
        <div class="page-index__works-grid">
          <UiBaseCard v-for="work in featuredWorks" :key="work.id" hoverable>
            <p class="page-index__work-meta">{{ work.industry }} ｜ {{ work.period }}</p>
            <h3 class="page-index__work-title">{{ work.title }}</h3>
            <p class="page-index__work-client">{{ work.clientName }}</p>
          </UiBaseCard>
        </div>
        <div class="page-index__works-more">
          <UiBaseButton variant="outline" href="/works">
            実績をすべて見る
          </UiBaseButton>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <UiCtaSection
      :title="cta.title"
      :description="cta.description"
      :button-label="cta.buttonLabel"
      :href="cta.href"
    />
  </div>
</template>

<script setup lang="ts">
import {
  MOCK_SERVICES,
  MOCK_CTA,
  MOCK_WORKS,
} from '@corporate-estimate/shared';

const config = useRuntimeConfig();

useSeoMeta({
  title: '法人向けIT課題を解決する | Corporate Estimate',
  description: '簡単な診断で御社に最適なITソリューションをご提案。500社以上の導入実績をもとに、コスト最適化からセキュリティ強化まで対応します。',
  ogTitle: '法人向けIT課題を解決する | Corporate Estimate',
  ogDescription: '簡単な診断で御社に最適なITソリューションをご提案。500社以上の導入実績をもとに対応します。',
  ogType: 'website',
});

const services = MOCK_SERVICES;
const cta = { ...MOCK_CTA, href: `${config.public.diagnosisAppOrigin}/diagnosis` };
const diagnosisUrl = `${config.public.diagnosisAppOrigin}/diagnosis`;
const featuredWorks = MOCK_WORKS.slice(0, 3);
</script>

<style lang="scss" scoped>
.page-index {
  &__hero {
    padding: $spacing-xl 0;
    text-align: center;
    background-color: $color-bg-light;

    @include respond-to(md) {
      padding: $spacing-3xl 0;
    }
  }

  &__hero-inner {
    @include container;
  }

  &__hero-lead {
    font-size: $font-size-lg;
    color: $color-text-light;
    margin-bottom: $spacing-xl;
    line-height: 1.8;
  }

  &__hero-actions {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    flex-wrap: wrap;
  }

  &__services {
    padding: $spacing-xl 0;

    @include respond-to(md) {
      padding: $spacing-3xl 0;
    }
  }

  &__services-inner {
    @include container;
  }

  &__services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-lg;
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__service-title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-sm;
  }

  &__service-desc {
    font-size: $font-size-base;
    color: $color-text-light;
    line-height: 1.7;
  }

  &__services-more {
    text-align: center;
    margin-top: $spacing-xl;
  }

  &__works {
    padding: $spacing-xl 0;
    background-color: $color-bg-light;

    @include respond-to(md) {
      padding: $spacing-3xl 0;
    }
  }

  &__works-inner {
    @include container;
  }

  &__works-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-lg;
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__work-meta {
    font-size: $font-size-xs;
    color: $color-text-light;
    margin-bottom: $spacing-sm;
  }

  &__work-title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  &__work-client {
    font-size: $font-size-sm;
    color: $color-secondary;
  }

  &__works-more {
    text-align: center;
    margin-top: $spacing-xl;
  }
}
</style>
