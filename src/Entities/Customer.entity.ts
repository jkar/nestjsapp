import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Role } from "./Role.entity";

@Entity({ name: "customer" })
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    age: number;

    @Column()
    username: string;

    @Column()
    password: string;

    //ME TO eager : true travaw automata ta products p antistoixoun se kathe customer me aplo find(),
    //borw omws  mono s ena apo ta dyo entities k to krataw s auto, sto allo tha tropopoihsw to find()
    @OneToMany(type => Product, product => product.customer,
        //  { eager: true }
        )
    products: Product[];

    // @ManyToMany(() => Role, role => role.customers)
    // @JoinTable()
    // roles: Role[];
    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];
}