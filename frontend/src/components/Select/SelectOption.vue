<script setup lang="ts">
import { inject } from "vue";
import { setSelectedItemKey, selectedItemKey } from "@/components/Select/injection";
import IconCheck from "@/components/icons/IconCheck.vue";

type SelectOptionProps = {
  value: string | null;
};

const props = withDefaults(defineProps<SelectOptionProps>(), {
  value: null,
});

const selectedItem = inject(selectedItemKey);
const setSelectedItem = inject(setSelectedItemKey);

function handleOptionClick() {
  if (setSelectedItem != null) {
    setSelectedItem(props.value);
  }
}
</script>

<template>
  <li @click="handleOptionClick" :class="$style.optionContainer">
    <span :class="$style.optionLabel">
      <slot />
    </span>

    <IconCheck v-show="props.value === selectedItem" :class="$style.optionSelectedIcon" />
  </li>
</template>

<style lang="scss" scoped module>
.optionContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  padding: 0.25rem 0.5rem;

  border-style: none;
  border-radius: 6px;

  &:hover {
    background-color: darken(#fff, 5);
  }
}

.optionLabel {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.optionSelectedIcon {
  width: 0.75rem;
  height: 0.75rem;
  color: #000;
  opacity: 0.7;
}
</style>
