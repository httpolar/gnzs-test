<script setup lang="ts">
import { inject, ref } from "vue";
import { isOpenKey } from "@/components/Select/injection";
import { onClickOutside } from "@vueuse/core";

const isOpen = inject(isOpenKey);
const listContainerRef = ref(null);

onClickOutside(listContainerRef, () => {
  if (typeof isOpen !== "undefined") {
    isOpen.value = false;
  }
});
</script>

<template>
  <ul ref="listContainerRef" v-if="isOpen" :class="$style.selectOptionsContainer">
    <slot />
  </ul>
</template>

<style lang="scss" scoped module>
@import "@/assets/variables";

.selectOptionsContainer {
  position: absolute;
  top: 2.5rem;

  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 0.25rem;

  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  border-color: darken($border, 20);

  background-color: #ffffff;
}
</style>
