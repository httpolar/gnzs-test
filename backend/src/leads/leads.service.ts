import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { CreateLeadDto } from "@/leads/dto/create-lead.dto";
import { Lead, LeadSchema } from "@/leads/schemas/lead.schema";

@Injectable()
export class LeadsService {
  constructor(private client: HttpService) {}

  async getAllLeads() {
    const response = await firstValueFrom(this.client.get("/leads"));
    const rawData = response.data?.["_embedded"]?.["leads"];

    if (!Array.isArray(rawData)) {
      throw TypeError("Unexpected AmoCRM response: _embedded.leads is not an array!");
    }

    const data: Lead[] = [];

    rawData.forEach((rawLead: Record<string, unknown>) => {
      const lead = LeadSchema.parse({
        id: rawLead["id"],
        name: rawLead["name"],
        price: rawLead["price"],
        score: rawLead["score"],
        statusId: rawLead["status_id"],
        createdBy: rawLead["created_by"],
        createdAt: rawLead["created_at"],
        closedAt: rawLead["closed_at"],
        isDeleted: rawLead["is_deleted"],
      });

      data.push(lead);
    });

    return data;
  }

  async createLead(newLeadData: CreateLeadDto) {
    const json = [
      {
        name: newLeadData.name,
        price: newLeadData.price,
      },
    ];

    const response = await firstValueFrom(this.client.post("/leads", json));
    const rawData = response.data?.["_embedded"]?.["leads"];

    if (!Array.isArray(rawData)) {
      throw TypeError("Unexpected AmoCRM response: _embedded.leads is not an array!");
    }

    return rawData.map((lead) => {
      return { id: lead["id"] };
    });
  }
}
