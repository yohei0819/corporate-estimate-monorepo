<template>
  <div class="page-about">
    <UiBreadcrumb :crumbs="[{ label: '会社概要' }]" />
    <UiPageHero
      title="会社概要"
      subtitle="About Us"
      description="Corporate Estimateは、法人のお客様のIT課題解決のパートナーです。"
    />

    <!-- 会社紹介 -->
    <section class="page-about__intro">
      <div class="page-about__intro-inner">
        <h2 class="page-about__intro-heading">{{ company.name }}</h2>
        <p class="page-about__intro-text">{{ company.description }}</p>
      </div>
    </section>

    <!-- 強み -->
    <section class="page-about__strengths">
      <div class="page-about__strengths-inner">
        <UiSectionTitle title="私たちの強み" subtitle="Strengths" />
        <div class="page-about__strengths-grid">
          <UiBaseCard v-for="item in strengths" :key="item.id">
            <h3 class="page-about__strength-title">{{ item.title }}</h3>
            <p class="page-about__strength-desc">{{ item.description }}</p>
          </UiBaseCard>
        </div>
      </div>
    </section>

    <!-- 沿革 -->
    <section class="page-about__history">
      <div class="page-about__history-inner">
        <UiSectionTitle title="沿革" subtitle="History" />
        <dl class="page-about__history-list">
          <div v-for="item in history" :key="item.year" class="page-about__history-item">
            <dt class="page-about__history-year">{{ item.year }}</dt>
            <dd class="page-about__history-desc">{{ item.description }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- 会社情報テーブル -->
    <section class="page-about__info">
      <div class="page-about__info-inner">
        <UiSectionTitle title="会社情報" subtitle="Company Info" />
        <table class="page-about__info-table">
          <tbody>
            <tr>
              <th>会社名</th>
              <td>{{ company.name }}</td>
            </tr>
            <tr>
              <th>所在地</th>
              <td>{{ company.address }}</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>{{ company.phone }}</td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>{{ company.email }}</td>
            </tr>
          </tbody>
        </table>
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
import {
  MOCK_COMPANY_DETAIL,
  MOCK_COMPANY_HISTORY,
  MOCK_COMPANY_STRENGTHS,
  MOCK_CTA,
} from '@corporate-estimate/shared';

useSeoMeta({
  title: '会社概要 | Corporate Estimate',
  description: 'Corporate Estimateは、法人のお客様のIT課題解決をサポートするパートナーです。会社情報、強み、沿革をご紹介します。',
  ogTitle: '会社概要 | Corporate Estimate',
  ogDescription: 'Corporate Estimateの会社情報、強み、沿革をご紹介します。',
});

const company = MOCK_COMPANY_DETAIL;
const history = MOCK_COMPANY_HISTORY;
const strengths = MOCK_COMPANY_STRENGTHS;
const cta = MOCK_CTA;
</script>

<style lang="scss" scoped>
.page-about {
  // Intro
  &__intro {
    padding: $spacing-3xl 0;
  }

  &__intro-inner {
    @include container;
    max-width: 800px;
    text-align: center;
  }

  &__intro-heading {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-lg;
  }

  &__intro-text {
    font-size: $font-size-base;
    color: $color-text-light;
    line-height: 2;
  }

  // Strengths
  &__strengths {
    padding: $spacing-3xl 0;
    background-color: $color-bg-light;
  }

  &__strengths-inner {
    @include container;
  }

  &__strengths-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__strength-title {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-primary;
    margin-bottom: $spacing-sm;
  }

  &__strength-desc {
    font-size: $font-size-base;
    color: $color-text-light;
    line-height: 1.7;
  }

  // History
  &__history {
    padding: $spacing-3xl 0;
  }

  &__history-inner {
    @include container;
    max-width: 800px;
  }

  &__history-list {
    border-left: 3px solid $color-primary;
    padding-left: $spacing-lg;
  }

  &__history-item {
    display: flex;
    gap: $spacing-lg;
    padding-bottom: $spacing-lg;

    &:last-child {
      padding-bottom: 0;
    }
  }

  &__history-year {
    flex-shrink: 0;
    font-size: $font-size-sm;
    font-weight: 700;
    color: $color-primary;
    min-width: 60px;
  }

  &__history-desc {
    font-size: $font-size-base;
    color: $color-text;
    line-height: 1.6;
  }

  // Info table
  &__info {
    padding: $spacing-3xl 0;
    background-color: $color-bg-light;
  }

  &__info-inner {
    @include container;
    max-width: 800px;
  }

  &__info-table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: $spacing-md $spacing-lg;
      border-bottom: 1px solid $color-border;
      text-align: left;
      font-size: $font-size-base;
    }

    th {
      width: 160px;
      font-weight: 600;
      color: $color-text;
      background-color: $color-white;

      @include respond-to(md) {
        width: 200px;
      }
    }

    td {
      color: $color-text-light;
    }
  }
}
</style>
