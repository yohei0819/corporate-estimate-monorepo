<template>
  <nav class="breadcrumb" aria-label="パンくずリスト">
    <ol class="breadcrumb__list">
      <li class="breadcrumb__item">
        <NuxtLink to="/" class="breadcrumb__link">ホーム</NuxtLink>
      </li>
      <li
        v-for="(crumb, i) in crumbs"
        :key="crumb.href || i"
        class="breadcrumb__item"
      >
        <span class="breadcrumb__separator" aria-hidden="true">/</span>
        <NuxtLink
          v-if="crumb.href && i < crumbs.length - 1"
          :to="crumb.href"
          class="breadcrumb__link"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="breadcrumb__current" aria-current="page">
          {{ crumb.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

defineProps<{
  crumbs: BreadcrumbItem[];
}>();
</script>

<style lang="scss" scoped>
.breadcrumb {
  padding: $spacing-md 0;

  &__list {
    @include container;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    font-size: $font-size-sm;
    gap: $spacing-xs;
  }

  &__separator {
    color: $color-text-light;
    margin: 0 $spacing-xs;
  }

  &__link {
    color: $color-primary;
    text-decoration: none;
    transition: color $transition-base;

    &:hover {
      text-decoration: underline;
    }
  }

  &__current {
    color: $color-text-light;
  }
}
</style>
