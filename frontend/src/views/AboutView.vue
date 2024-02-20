<script setup lang="ts">
import SelectRoot from "@/components/Select/SelectRoot.vue";
import SelectTrigger from "@/components/Select/SelectTrigger.vue";
import SelectOptions from "@/components/Select/SelectOptions.vue";
import SelectOption from "@/components/Select/SelectOption.vue";
import { ref } from "vue";
import Container from '@/components/Container.vue'

const selected = ref<string | null>(null);
</script>

<template>
  <Container>
    <SelectRoot v-model="selected" style="width: 200px">
      <SelectTrigger placeholder="Choose something" />

      <SelectOptions>
        <SelectOption value="Anime">Anime</SelectOption>
        <SelectOption value="Games">Games</SelectOption>
      </SelectOptions>
    </SelectRoot>
  </Container>
</template>


