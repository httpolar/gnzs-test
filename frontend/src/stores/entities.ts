import { defineStore } from "pinia";
import { ref } from "vue";
import type { Company } from "@/types/company";
import type { Contact } from "@/types/contact";
import type { Lead } from "@/types/lead";

export const useEntitiesStore = defineStore("entities", () => {
  const companies = ref<Company[]>([]);
  const contacts = ref<Contact[]>([]);
  const leads = ref<Lead[]>([]);

  async function getCompanies() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/companies`, { method: "GET" });
    const json: Company[] = await res.json();

    companies.value = json;
  }

  async function getContacts() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts`, { method: "GET" });
    const json: Contact[] = await res.json();

    contacts.value = json;
  }

  async function getLeads() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/leads`, { method: "GET" });
    const json: Lead[] = await res.json();

    leads.value = json;
  }

  return { companies, contacts, leads, getCompanies, getContacts, getLeads };
});
