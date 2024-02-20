<script setup lang="ts">
import IconArrowPath from '@/components/icons/IconArrowPath.vue'

type ButtonProps = {
  variant: "blue";
  disabled?: boolean;
  loading?: boolean;
};

defineProps<ButtonProps>();
const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <button
    @click="handleClick"
    :class="[
      $style.buttonBase,
      { [$style.buttonBlue]: variant === 'blue', [$style.buttonDisabled]: disabled === true },
    ]"
    :disabled="disabled"
  >
    <slot v-if="loading !== true" />
    <IconArrowPath v-else :class="$style.loadingIcon" />
  </button>
</template>

<style module scoped lang="scss">
@import "@/assets/variables";

.buttonBase {
  height: 2.25rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  border-color: #bebebe;
  box-sizing: border-box;

  padding: 0.5rem 1rem;

  white-space: nowrap;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;

  * {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
  }

  cursor: pointer;

  transition: all 150ms ease-in-out;
}

.buttonDisabled {
  cursor: not-allowed !important;
  border-color: #bebebe !important;
  background-color: darken(white, 10) !important;
  color: #606060 !important;
}

.buttonBlue {
  background-color: $blue;
  color: white;
  border-color: darken($blue, 10);

  &:hover {
    background-color: rgba($blue, 0.9);
  }
}

.loadingIcon {
  width: 0.8rem;
  height: 0.8rem;
  color: inherit;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(1turn);
  }
}
</style>
