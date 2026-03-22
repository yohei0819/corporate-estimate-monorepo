<template>
  <div class="page-faq">
    <UiBreadcrumb :crumbs="[{ label: 'よくあるご質問' }]" />
    <UiPageHero
      title="よくあるご質問"
      subtitle="FAQ"
      description="お客様からよくいただくご質問をまとめました。"
    />

    <section class="page-faq__list">
      <div class="page-faq__list-inner">
        <div v-for="group in groupedFaq" :key="group.label" class="page-faq__group">
          <h2 class="page-faq__group-heading">{{ group.label }}</h2>
          <div class="page-faq__group-items">
            <UiFaqItem
              v-for="item in group.items"
              :key="item.id"
              :question="item.question"
              :answer="item.answer"
            />
          </div>
        </div>
      </div>
    </section>

    <UiCtaSection
      title="ご質問が見つかりませんか？"
      description="お気軽にお問い合わせください。担当者が丁寧にお答えします。"
      button-label="お問い合わせへ"
      href="/contact"
    />
  </div>
</template>

<script setup lang="ts">
import { MOCK_FAQ_ITEMS, FAQ_CATEGORY_LABELS, FAQ_CATEGORY_ORDER } from '@corporate-estimate/shared';
import type { FaqItem } from '@corporate-estimate/shared';

useSeoMeta({
  title: 'よくあるご質問 | Corporate Estimate',
  description: 'Corporate Estimateのサービスに関するよくあるご質問をまとめました。料金、サポート、導入フローなどについてお答えします。',
  ogTitle: 'よくあるご質問 | Corporate Estimate',
  ogDescription: 'サービスに関するよくあるご質問をまとめました。',
});

interface FaqGroup {
  label: string;
  items: FaqItem[];
}

const groupedFaq = FAQ_CATEGORY_ORDER.reduce<FaqGroup[]>((acc, category) => {
  const items = MOCK_FAQ_ITEMS.filter((item) => item.category === category);
  if (items.length > 0) {
    acc.push({ label: FAQ_CATEGORY_LABELS[category], items });
  }
  return acc;
}, []);

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: MOCK_FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    },
  ],
});
</script>

<style lang="scss" scoped>
.page-faq {
  &__list {
    padding: $spacing-3xl 0;
  }

  &__list-inner {
    @include container;
    max-width: 800px;
  }

  &__group {
    margin-bottom: $spacing-2xl;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__group-heading {
    font-size: $font-size-xl;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: $spacing-lg;
    padding-bottom: $spacing-sm;
    border-bottom: 2px solid var(--color-primary);
  }
}
</style>
