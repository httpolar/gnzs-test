import { Body, Controller, Get, Post } from "@nestjs/common";
import { LeadsService } from "@/leads/leads.service";
import { CreateLeadDto } from "@/leads/dto/create-lead.dto";

@Controller("leads")
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  async getAllLeads() {
    return this.leadsService.getAllLeads();
  }

  @Post()
  async createLead(@Body() body: CreateLeadDto) {
    return this.leadsService.createLead(body);
  }
}
