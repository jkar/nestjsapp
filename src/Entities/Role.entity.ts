import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer.entity";

@Entity({ name: "role" })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: string;

    // @ManyToMany(() => Customer, customer => customer.roles)
    // @ManyToMany(() => Customer)
    // customers: Customer[];
}