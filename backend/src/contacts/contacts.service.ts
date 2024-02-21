import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Contact, ContactSchema } from "@/contacts/schemas/contact";
import { CreateContactDto } from "@/contacts/dto/create-contact.dto";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ContactsService {
  constructor(private client: HttpService) {}

  async getAllContacts(): Promise<Contact[]> {
    const response = await firstValueFrom(this.client.get("/contacts"));

    const rawData = response.data?.["_embedded"]?.["contacts"];
    if (!Array.isArray(rawData)) {
      throw TypeError("Unexpected response from AmoCRM! _embedded.contact is not an array!");
    }

    const data: Contact[] = [];

    for (const contactRaw of rawData) {
      const contact = ContactSchema.parse({
        id: contactRaw["id"],
        name: contactRaw["name"],
        firstName: contactRaw["first_name"],
        lastName: contactRaw["last_name"],
        groupId: contactRaw["group_id"],
        createdAt: contactRaw["created_at"],
        createdBy: contactRaw["created_by"],
        isDeleted: contactRaw["is_deleted"],
      });

      data.push(contact);
    }

    return data;
  }

  async createContact(newContact: CreateContactDto) {
    const body = [
      {
        first_name: newContact.firstName,
        last_name: newContact.lastName,
      },
    ];

    const response = await firstValueFrom(this.client.post("/contacts", body));
    const rawData = response.data?.["_embedded"]?.["contacts"];

    if (!Array.isArray(rawData)) {
      throw TypeError("Unexpected AmoCRM response: _embedded.contacts is not an array!");
    }

    return rawData.map((contact) => {
      return { id: contact["id"] };
    });
  }
}
