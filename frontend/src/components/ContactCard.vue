<script setup lang="ts">
import type { Contact } from "@/types/contact";
import { computed } from "vue";

type ContactCardProps = {
  contact: Contact;
};

const props = defineProps<ContactCardProps>();

const createdAt = computed(() =>
  Intl.DateTimeFormat("ru").format(new Date(props.contact.createdAt * 1000)),
);
</script>

<template>
  <div :class="$style.contactCard">
    <h4>{{ contact.name }}</h4>
    <p>Создан {{ createdAt }}</p>
  </div>
</template>

<style module scoped lang="scss">
@import "@/assets/variables";

.contactCard {
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
</style>
