<script setup lang="ts">
import { computed, ref, provide, watch } from "vue";
import {
  isOpenKey,
  setSelectedItemKey,
  selectedItemKey,
  handleTriggerClickKey,
} from "@/components/Select/injection";

type SelectRootProps<Value = unknown> = {
  modelValue?: Value;
  disabled?: boolean;
};

const props = withDefaults(defineProps<SelectRootProps>(), {
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function handleTriggerClick() {
  isOpen.value = !isOpen.value;
}

function handleOptionClick(value: SelectRootProps["modelValue"]) {
  selected.value = value;
}

watch(selected, () => {
  isOpen.value = false;
});

provide(handleTriggerClickKey, handleTriggerClick);
provide(setSelectedItemKey, handleOptionClick);
provide(selectedItemKey, selected);
provide(isOpenKey, isOpen);
</script>

<template>
  <div :class="$style.selectRoot">
    <slot />
  </div>
</template>

<style scoped module>
.selectRoot {
  position: relative;
}
</style>
