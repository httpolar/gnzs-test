<script setup lang="ts">
import { computed } from "vue";
import type { Company } from "@/types/company";

type CompanyCardProps = {
  company: Company;
};

const props = defineProps<CompanyCardProps>();

const createdAt = computed(() =>
  Intl.DateTimeFormat("ru").format(new Date(props.company.createdAt * 1000)),
);
</script>

<template>
  <div :class="$style.companyCard">
    <div :class="$style.titleGroup">
      <h4>{{ company.name }}</h4>
      <span>#{{ company.id }}</span>
    </div>
    <p>Создана {{ createdAt }}</p>
  </div>
</template>

<style module scoped lang="scss">
@import "@/assets/variables";

.companyCard {
  display: flex;
  flex-direction: column;
  border: solid 1px $border;
  border-radius: 6px;
  padding: 1rem;
  background-color: white;
  color: black;

  h4 {
    letter-spacing: -0.025em;
    font-weight: 600;
    line-height: 1;
  }

  p {
    margin-top: 1rem;
    font-size: 0.875rem;
  }
}

.titleGroup {
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.75rem;
    opacity: 0.75;
  }
}
</style>
