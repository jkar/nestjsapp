import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customers/customer.module';
import { Customer } from './Entities/Customer.entity';
import { Product } from './Entities/Product.entity';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Role } from './Entities/Role.entity';
import { CustomerHasRole } from './Entities/CustomerHasRole.entity';

@Module({
  imports: [CustomerModule, ProductsModule, TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'nestapp',
    entities: [Customer, Product, Role, CustomerHasRole],
    synchronize: true,
  }
  ), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {

  }
}
