import { Body, Controller, Get, Post } from "@nestjs/common";
import { CompaniesService } from "@/companies/companies.service";
import { CreateCompanyDto } from "@/companies/dto/create-company.dto";

@Controller("companies")
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Post()
  async createCompany(@Body() body: CreateCompanyDto) {
    return this.companiesService.createCompany(body);
  }
}
