<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__logo">
        {{ siteName }}
      </NuxtLink>
      <button class="header__toggle" type="button" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="メニュー">
        <span class="header__toggle-bar" />
        <span class="header__toggle-bar" />
        <span class="header__toggle-bar" />
      </button>
      <nav class="header__nav" :class="{ 'header__nav--open': menuOpen }">
        <ul class="header__nav-list">
          <li v-for="item in navItems" :key="item.href" class="header__nav-item">
            <NuxtLink :to="item.href" class="header__nav-link" @click="menuOpen = false">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { SITE_NAME, HEADER_NAV_ITEMS } from '@corporate-estimate/shared';

const menuOpen = ref(false);
const siteName = SITE_NAME;
const navItems = HEADER_NAV_ITEMS;
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  background-color: $color-white;
  border-bottom: 1px solid $color-border;
  z-index: 100;

  &__inner {
    @include container;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__logo {
    font-size: $font-size-lg;
    font-weight: 700;
    color: $color-primary;
    text-decoration: none;
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: $spacing-sm;

    @include respond-to(md) {
      display: none;
    }
  }

  &__toggle-bar {
    display: block;
    width: 22px;
    height: 2px;
    background-color: $color-text;
    border-radius: 1px;
  }

  &__nav {
    @media (max-width: 767px) {
      display: none;
      position: absolute;
      top: $header-height;
      left: 0;
      right: 0;
      background-color: $color-white;
      border-bottom: 1px solid $color-border;
      box-shadow: $shadow-md;

      &--open {
        display: block;
      }
    }
  }

  &__nav-list {
    display: flex;
    gap: $spacing-lg;
    list-style: none;

    @media (max-width: 767px) {
      flex-direction: column;
      padding: $spacing-md $spacing-lg;
      gap: 0;
    }
  }

  &__nav-item {
    @media (max-width: 767px) {
      border-bottom: 1px solid $color-border;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &__nav-link {
    font-size: $font-size-sm;
    color: $color-text;
    text-decoration: none;
    transition: color $transition-base;

    @media (max-width: 767px) {
      display: block;
      padding: $spacing-md 0;
    }

    &:hover {
      color: $color-primary;
    }
  }
}
</style>
