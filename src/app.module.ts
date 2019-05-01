import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "youchat",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
