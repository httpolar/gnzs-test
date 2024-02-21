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

  async function addCompany(name: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ name });

    const options = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/companies`, options);
  }

  async function getContacts() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts`, { method: "GET" });
    const json: Contact[] = await res.json();

    contacts.value = json;
  }

  async function addContact(firstName: string, lastName: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName,
      lastName,
    });

    const options = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts`, options);
  }

  async function getLeads() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/leads`, { method: "GET" });
    const json: Lead[] = await res.json();

    leads.value = json;
  }

  async function addLead(price: number) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({ price });

    const options = {
      method: "POST",
      headers: headers,
      body: raw,
    };

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/leads`, options);
  }

  return {
    companies,
    contacts,
    leads,
    getCompanies,
    addCompany,
    getContacts,
    addContact,
    getLeads,
    addLead,
  };
});
