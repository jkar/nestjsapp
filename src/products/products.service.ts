import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomersService } from "src/customers/customers.service";
import { Customer } from "src/Entities/Customer.entity";
import { Product } from "src/Entities/Product.entity";
import { Repository } from "typeorm";
import { ProductDTO } from "./productDTO";

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

    async addProduct(productDTO: ProductDTO): Promise<Product> {
        try {
            const product = new Product();
            product.customerId = productDTO.customerId;
            product.id = Math.random()*100000;
            product.name = productDTO.name;
            product.price = productDTO.price;
            product.genre = productDTO.genre;
            const p = await this.productsRepository.save(product);
            if (!p) {
                throw new NotFoundException('Product has not been added');
            } else {
                return p;
            }
        } catch (err) {
            throw new NotFoundException('product not added');
        }
    }
}