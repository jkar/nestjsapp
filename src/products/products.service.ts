import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomersService } from "src/customers/customers.service";
import { Customer } from "src/Entities/Customer.entity";
import { Product } from "src/Entities/Product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @Inject(forwardRef(() => CustomersService))
        private readonly customersService: CustomersService
      ) {}

    async findAll(): Promise<Product[]> {
        // async findAll(): Promise<Customer[]> {

        return await this.productsRepository.find({
            relations: ["customer"]
        });
        // return await this.customersService.getCustomers();
    }
}