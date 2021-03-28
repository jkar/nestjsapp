import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CustomerDTO } from "./customer.model";
import { CustomersService } from "./customers.service";

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {

    }

    @Get()
    async findAll() {
        return await this.customersService.getCustomers();
    }

    @Get(':id') 
    findCustomerById(
        @Param('id') id: number
    ) {
        return this.customersService.getCustomer(id);
    }
    

    @Post()
    addCustomer(
        // @Body('name') name: string,
        // @Body('lastname') lastname: string,
        // @Body('age') age: number
        @Body() customerDTO: CustomerDTO
    ) {
        // return this.customersService.addCustomer(name,lastname, age);
        return this.customersService.addCustomer(customerDTO);

    }

    @Put(':id')
    update(
        @Param('id') id: number,
        // @Body('name') name: string,
        // @Body('lastname') lastname: string,
        // @Body('age') age: number
        @Body() customerDTO :CustomerDTO
    ) {
        // return this.customersService.updateCustomer(id, name, lastname, age);
        return this.customersService.updateCustomer(id, customerDTO);

    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ) {
        return this.customersService.deleteCustomer(id);
    }

}