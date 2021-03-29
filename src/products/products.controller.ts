import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.productsService.findAll();
    }
}