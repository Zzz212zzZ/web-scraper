import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    source!: string;  // 'coinbase'

    @Column()
    url!: string;

    @Column()
    title!: string;

    @Column('text')
    htmlContent!: string;

    @CreateDateColumn()
    scrapedAt!: Date;
}