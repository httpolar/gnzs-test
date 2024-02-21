<script setup lang="ts">
import Container from "@/components/Container.vue";
import { useEntitiesStore } from "@/stores/entities";
import SelectRoot from "@/components/Select/SelectRoot.vue";
import { ref } from "vue";
import SelectTrigger from "@/components/Select/SelectTrigger.vue";
import SelectOptions from "@/components/Select/SelectOptions.vue";
import SelectOption from "@/components/Select/SelectOption.vue";
import Button from "@/components/Button.vue";
import ContactCard from "@/components/ContactCard.vue";
import { storeToRefs } from "pinia";
import { generateCompanyName, generateRandomName } from "@/dataset/generators";
import CompanyCard from "@/components/CompanyCard.vue";
import LeadCard from "@/components/LeadCard.vue";
import { randomNumber } from "@/lib/random-number";

const entitiesStore = useEntitiesStore();
const { contacts, companies, leads } = storeToRefs(entitiesStore);

Promise.all([entitiesStore.getContacts(), entitiesStore.getCompanies(), entitiesStore.getLeads()]);

const selectOptions = [
  { label: "Не выбрано", value: null },
  { label: "Сделка", value: "lead" },
  { label: "Контакт", value: "contact" },
  { label: "Компания", value: "company" },
] as const;

const selected = ref<(typeof selectOptions)[number]>(selectOptions[0]);
const isFetching = ref<boolean>(false);

async function handleCreateContact() {
  const [firstName, lastName] = generateRandomName();

  isFetching.value = true;
  await entitiesStore.addContact(firstName, lastName);
  await entitiesStore.getContacts();
  isFetching.value = false;
}

async function handleCreateCompany() {
  const name = generateCompanyName();

  isFetching.value = true;
  await entitiesStore.addCompany(name);
  await entitiesStore.getCompanies();
  isFetching.value = false;
}

async function handleCreateLead() {
  const price = randomNumber(1, 1_000_000);

  isFetching.value = true;
  await entitiesStore.addLead(price);
  await entitiesStore.getLeads();
  isFetching.value = false;
}

async function handleCreateSomething() {
  if (selected.value.value === "contact") {
    await handleCreateContact();
  }

  if (selected.value.value === "company") {
    await handleCreateCompany();
  }

  if (selected.value.value === "lead") {
    await handleCreateLead();
  }
}
</script>

<template>
  <main class="main" :class="$style.homeContainer">
    <Container :class="$style.inputsContainer">
      <h2>Что создадим сегодня?</h2>

      <div :class="$style.selectGroup">
        <SelectRoot v-model="selected" :class="$style.selectMenu">
          <SelectTrigger>{{ selected?.label }}</SelectTrigger>

          <SelectOptions>
            <SelectOption
              v-for="option in selectOptions"
              :key="option.label"
              :value="option"
              :is-selected="selected.value === option.value"
            >
              {{ option.label }}
            </SelectOption>
          </SelectOptions>
        </SelectRoot>

        <Button
          @click="handleCreateSomething"
          variant="blue"
          :disabled="selected.value === null"
          :loading="isFetching"
        >
          Создать
        </Button>
      </div>
    </Container>

    <Container :class="$style.entitiesContainer">
      <template v-if="selected.value === 'contact'">
        <ContactCard
          v-for="contact in contacts"
          :key="`contact-${contact.id}`"
          :contact="contact"
        />
      </template>

      <template v-if="selected.value === 'company'">
        <CompanyCard
          v-for="company in companies"
          :key="`company-${company.id}`"
          :company="company"
        />
      </template>

      <template v-if="selected.value === 'lead'">
        <LeadCard v-for="lead in leads" :key="`lead-${lead.id}`" :lead="lead" />
      </template>
    </Container>
  </main>
</template>

<style lang="scss" scoped module>
@import "@/assets/variables";

.selectMenu {
  width: 150px;
}

.inputsContainer {
  margin-top: 4rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  h2 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.75rem;
  }
}

.selectGroup {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

.homeContainer {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.entitiesContainer {
  margin-top: 4rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  grid-auto-rows: min-content;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
