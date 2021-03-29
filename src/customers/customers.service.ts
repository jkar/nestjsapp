import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/Entities/Customer.entity";
import { Product } from "src/Entities/Product.entity";
import { ProductsService } from "src/products/products.service";
import { Repository } from "typeorm";
import { CustomerDTO } from "./customer.model";

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @Inject(forwardRef(() => ProductsService))
        private productsService: ProductsService
      ) {}

    // async addCustomer(name: string, lastname: string, age: number): Promise<Customer> {
    async addCustomer(customerDTO: CustomerDTO): Promise<Customer> {

        try {
            const customer = new Customer();
            customer.id = Math.random()*10;
            customer.name = customerDTO.name;
            customer.lastname = customerDTO.lastname;
            customer.age = customerDTO.age;
            customer.username = customerDTO.username;
            customer.password = customerDTO.password;
            const c = await this.customersRepository.save(customer);
            if (!c) {
                throw new NotFoundException('Customer has not been added');
            }
            return c;
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async getCustomerByUsername(name: string): Promise<Customer | undefined> {
        try {
            const customer = await this.customersRepository.findOne({ where: { username: name } });
            if (!customer) {
                throw new NotFoundException('Customer not found');
            } else {
                return customer;
            }
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async getCustomers(): Promise<Customer[]> {
        // async getCustomers(): Promise<Product[]> {

        //AN VALW STO ENTITY eager: true, THA TRAVIXEI K TO PRODUCTS AUTOMATA, AN T AFAIRESW THA FEREI MONO TOUS CUSTOMERS
        // return await this.customersRepository.find();

        try {
            return await this.customersRepository.find({ relations: ["products"] });
            // return await this.productsService.findAll();
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async getCustomer(id: number): Promise<Customer> {
        const customer = await this.customersRepository.findOne({ where: { id: id } });
        if (!customer) {
            throw new NotFoundException('Customer Not found');
        } else {
            return {...customer};
        }
    }

    // async updateCustomer(id: number, name: string, lastname: string, age: number): Promise<number> {
    async updateCustomer(id: number, CustomerDTO: CustomerDTO): Promise<number> {
        try {
            const customer = await this.getCustomer(id);
            // const updatedCustomer = await this.customersRepository.update(id, name: name, lastname: lastname, age: age);
            const updatedCustomer = await this.customersRepository.update(id, CustomerDTO);
            if (updatedCustomer.affected !== 1) {
                throw new NotFoundException('Customer not updated');
            } else {
                return updatedCustomer.affected
            }
            
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

    async deleteCustomer(id: number): Promise<string> {
        try {
            const res = await this.customersRepository.delete(id);
            if (res.affected === 0) {
                throw new NotFoundException('Customer not deleted');
            } else {
                return 'Customer deleted';
            }
        } catch (err) {
            throw new NotFoundException(err);
        }
    }

}