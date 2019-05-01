import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { hashSync } from 'bcrypt-nodejs';
import { IsEmail, Length, IsAlphanumeric } from 'class-validator';
import { Trim } from 'class-sanitizer';
import BaseEntity from 'src/helper/base.entity';

@Entity()
export class User extends BaseEntity {

    @BeforeInsert()
    useHashed() {
        if (this.password.length >= 6 && this.password.length <=32) {
            this.password = hashSync(this.password);
        }
        else {
            if (this.password.length !== 60)
                throw ("Invalid Password");
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ length: 50, unique: true, nullable: false })
    @Length(3, 50)
    @Trim()
    @IsAlphanumeric()
    username: string;

    @Column({ length: 500, unique: true })
    @IsEmail()
    @Trim()
    email: string;

    @Column({ length: 60 })
    password: string;

    @Column({ default: false })
    isConfirmed: Boolean
}