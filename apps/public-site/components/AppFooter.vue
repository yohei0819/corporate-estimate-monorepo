<template>
  <footer class="footer">
    <div class="footer__inner">
      <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li v-for="item in navItems" :key="item.href" class="footer__nav-item">
            <NuxtLink :to="item.href" class="footer__nav-link">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <p class="footer__copyright">{{ copyright }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { COPYRIGHT, FOOTER_NAV_ITEMS } from '@corporate-estimate/shared';

const copyright = COPYRIGHT;
const navItems = FOOTER_NAV_ITEMS;
</script>

<style lang="scss" scoped>
.footer {
  background-color: $color-bg-light;
  border-top: 1px solid $color-border;
  padding: $spacing-xl 0;

  &__inner {
    @include container;
    text-align: center;
  }

  &__nav-list {
    display: flex;
    justify-content: center;
    gap: $spacing-lg;
    list-style: none;
    margin-bottom: $spacing-md;
  }

  &__nav-link {
    font-size: $font-size-sm;
    color: $color-text-light;
    text-decoration: none;
    transition: color $transition-base;

    &:hover {
      color: $color-primary;
    }
  }

  &__copyright {
    font-size: $font-size-xs;
    color: $color-text-light;
  }
}
</style>
