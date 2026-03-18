<template>
  <div class="layout-default">
    <AppHeader />
    <main class="layout-default__main">
      <slot />
    </main>
    <AppFooter />
    <UiScrollToTop />
  </div>
</template>

<style lang="scss" scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__main {
    flex: 1;
    padding-top: $header-height;
  }
}
</style>
