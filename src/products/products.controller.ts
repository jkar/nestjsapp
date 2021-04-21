import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Role } from "src/roles/role.enum";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { ProductDTO } from "./productDTO";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    @Get()
    async findAll() {
        return await this.productsService.findAll();
    }

    
    @Post()
    async addProduct(
        @Body() productDto: ProductDTO
    ) {
        return await this.productsService.addProduct(productDto);
    }
}