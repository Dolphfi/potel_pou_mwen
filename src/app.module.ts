import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'databases/data-source';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';


@Module({
  imports: [
  //   ConfigModule.forRoot({
  //     isGlobal: true,
  //     envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
  //     ignoreEnvFile: process.env.NODE_ENV === 'prod',
  //     validationSchema: Joi.object({
  //         NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  //         DB_HOST_NAME: Joi.string().required(),
  //         DB_DATABASE_NAME: Joi.string().required(),
  //         DB_USERNAME: Joi.string().required(),
  //         DB_PASSWORD: Joi.string().required(),
  //         DB_PORT: Joi.string().required(),
  //     })
  // }),
    TypeOrmModule.forRoot({...AppDataSource, autoLoadEntities: true,}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }), RestaurantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
