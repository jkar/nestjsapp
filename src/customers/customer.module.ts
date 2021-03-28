import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/Entities/Customer.entity';
import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

//VAZW TO DECORATOR ,GLOBAL, K PLEON TO MODULE CUSTOMERMODULE EINAI ACCESIBLE PANTOU
//XWRIS TO GLOBAL PREPEI NA TO PERASW STA IMPORTS TOU MODULE P THELW NA TO XRHSIMOPOIHSW
@Global()
@Module({
  // imports: [ProductsModule, TypeOrmModule.forFeature([Customer])]
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomerModule {}