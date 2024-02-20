<template>
  <div :class="$style.container">
    <slot/>
  </div>
</template>

<style lang="scss" module scoped>
@import "@/assets/variables";

.container {
  max-width: $max-content-width;
  width: 100%;

  margin-left: auto;
  margin-right: auto;
}
</style>