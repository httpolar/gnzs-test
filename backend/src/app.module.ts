import { Module } from "@nestjs/common";
import { CompaniesController } from "@/companies/companies.controller";
import { ContactsController } from "@/contacts/contacts.controller";
import { LeadsController } from "@/leads/leads.controller";
import { HttpModule } from "@nestjs/axios";
import { ContactsService } from "@/contacts/contacts.service";
import { LeadsService } from './leads/leads.service';
import { CompaniesService } from './companies/companies.service';
import * as process from "node:process";

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: `https://${process.env.AMOCRM_BASE_URL}/api/v4`,
        headers: { Authorization: `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}` },
      }),
    }),
  ],
  controllers: [CompaniesController, ContactsController, LeadsController],
  providers: [ContactsService, LeadsService, CompaniesService],
})
export class AppModule {}
