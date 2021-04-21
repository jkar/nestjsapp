import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Role } from "./Role.entity";

@Entity({ name: "customerhasrole" })
export class CustomerHasRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column()
    roleId: number;

}