<script setup lang="ts">
import Button from '@/components/Button.vue'
import Container from '@/components/Container.vue'
</script>

<template>
  <main class="main" :class="$style.homeContainer">
    <Container>
      <Button variant="blue">Hello</Button>
      <Button variant="blue" loading>Hello</Button>
      <Button variant="blue" disabled>Hello</Button>
    </Container>
  </main>
</template>

<style lang="scss" scoped module>
@import "@/assets/variables";

.homeContainer {
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
