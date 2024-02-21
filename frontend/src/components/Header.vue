<script setup lang="ts"></script>

<template>
  <header :class="$style.headerContainer">
    <div :class="$style.headerWrapper">
      <nav :class="$style.navContainer">
        <RouterLink to="/" :class="$style.navLink" :active-class="$style.navLinkActive">
          Главная
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style module scoped lang="scss">
@import "@/assets/variables";

.headerContainer {
  height: $header-height;
  border-bottom-style: solid;
  border-bottom-color: $border;
  border-bottom-width: 1px;
}

.headerWrapper {
  max-width: $max-content-width;
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.navContainer {
  display: flex;
  height: 100%;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.navLink {
  font-size: 0.875rem;
  text-decoration: none;
  color: black;
  opacity: 0.7;
}

.navLinkActive {
  opacity: 1 !important;
}
</style>
