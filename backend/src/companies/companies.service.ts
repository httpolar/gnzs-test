import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { Company, CompanySchema } from "@/companies/schemas/company";
import { CreateCompanyDto } from "@/companies/dto/create-company.dto";

@Injectable()
export class CompaniesService {
  constructor(private client: HttpService) {}

  async getAllCompanies() {
    const response = await firstValueFrom(this.client.get("/companies"));
    const rawData = response.data?.["_embedded"]?.["companies"];

    if (!Array.isArray(rawData)) {
      throw TypeError("Unexpected AmoCRM response: _embedded.companies is not an array!");
    }

    const data: Company[] = [];

    rawData.forEach((rawCompany) => {
      const company = CompanySchema.parse({
        id: rawCompany["id"],
        name: rawCompany["name"],
        createdBy: rawCompany["created_by"],
        updatedBy: rawCompany["updated_by"],
        createdAt: rawCompany["created_at"],
        updatedAt: rawCompany["updated_at"],
        isDeleted: rawCompany["is_deleted"],
      });

      data.push(company);
    });

    return data;
  }

  async createCompany(newCompany: CreateCompanyDto) {
    const json = [{ name: newCompany.name }];

    const response = await firstValueFrom(this.client.post("/companies", json));
    const rawData = response.data?.["_embedded"]?.["companies"];

    if (!Array.isArray(rawData)) {
      throw TypeError("Unexpected AmoCRM response: _embedded.companies is not an array!");
    }

    return rawData.map((company) => {
      return { id: company["id"] };
    });
  }
}
