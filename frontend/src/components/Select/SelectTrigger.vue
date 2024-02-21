<script setup lang="ts">
import { inject } from "vue";
import { handleTriggerClickKey } from "@/components/Select/injection";
import IconChevronUpDown from '@/components/icons/IconChevronUpDown.vue'

type SelectTriggerProps = {
  placeholder?: string;
  disabled?: boolean;
};

defineProps<SelectTriggerProps>();
const emit = defineEmits(["click"]);

const handleTriggerClick = inject(handleTriggerClickKey);

function handleUnderlyingButtonClick() {
  emit("click");
  if (handleTriggerClick) {
    handleTriggerClick();
  }
}
</script>

<template>
  <button
    role="combobox"
    @click="handleUnderlyingButtonClick"
    :class="$style.selectTriggerButton"
    :disabled="disabled"
  >
    <span :class="$style.selectTriggerPlaceholder">
      <slot />
    </span>

    <IconChevronUpDown :class="$style.icon" />
  </button>
</template>

<style lang="scss" scoped module>
@import "@/assets/variables";

.selectTriggerButton {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  height: 2.25rem;
  padding: 0.5rem 0.75rem;

  border-color: $border;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;

  font-size: 0.875rem;
  line-height: 1.25rem;

  background-color: #fff;
  color: #000;

  transition: all 100ms ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    border-color: darken($border, 20);
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
  }
}

.icon {
  width: 1rem;
  height: 1rem;
  color: #000;
  opacity: 0.75;
}

.selectTriggerPlaceholder {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
