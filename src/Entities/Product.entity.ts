import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer.entity";

@Entity({ name: "product" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    genre: string;

    @ManyToOne(
        type => Customer,
        //OTAN EXW eager true, travaei automata ton customer sto result,
        //alla de borw na xw k stis duo pleures tou relationship opote tha to kratisw
        // sto Customer entity k s auto tha kanw enafind query p to kanei na fernei k ton customer

        // customer => customer.products, { eager: true }
        customer => customer.products
      )
      customer: Customer;
}