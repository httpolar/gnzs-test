import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateContactDto } from "@/contacts/dto/create-contact.dto";
import { ContactsService } from "@/contacts/contacts.service";

@Controller("contacts")
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  async getAllContacts() {
    return await this.contactsService.getAllContacts();
  }

  @Post()
  async createContact(@Body() body: CreateContactDto) {
    return await this.contactsService.createContact(body);
  }
}
