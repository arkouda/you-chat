import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcrypt';
import { IsEmail, Length, IsAlphanumeric } from 'class-validator';
import { Trim } from 'class-sanitizer';
import BaseEntity from 'src/helper/base.entity';

@Entity()
export class User extends BaseEntity {

    @BeforeInsert()
    useHashed() {
        if (this.password.length >= 6) {
            this.password = hashSync(this.password);
        }
        else {
            throw ("Password Too Short");
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ length: 50, unique: true, nullable: false })
    @Length(6, 50)
    @Trim()
    @IsAlphanumeric()
    username: string;

    @Column({ length: 500, unique: true })
    @IsEmail()
    @Trim()
    email: string;

    @Column({ length: 100 })
    password: string;
}