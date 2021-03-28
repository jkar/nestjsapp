import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerModule } from "src/customers/customer.module";
import { Product } from "src/Entities/Product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Global()
@Module({
    //AN DE VALW TON DECORATOR @GLOBAL STO CUSTOMERMODULE, PREPEI NA TO DHLWSW STA IMORTS
    //GIA NA XRHSIMOPOIHSW TO CUSTOMERSERVICE STO PRODUCTSSERVICE
    // imports: [CustomerModule, TypeOrmModule.forFeature([Product])],
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {

}