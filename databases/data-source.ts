import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm'
//
import * as Joi from 'joi';


ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    ignoreEnvFile: process.env.NODE_ENV === 'prod',
    validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST_NAME: Joi.string().required(),
        DB_DATABASE_NAME: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.string().required(),
    })
});
export const AppDataSource:DataSourceOptions = {
 type: 'mysql',
 host: process.env.DB_HOST_NAME,
 port: +process.env.DB_PORT,
 database: process.env.DB_DATABASE_NAME,
 username: process.env.DB_USERNAME,
 password: process.env.DB_PASSWORD,
 entities: ["dist/**/*.entity{.ts,.js}"],

 migrations:["dist/database/migrations/*{.ts,.js}"], 
 synchronize: process.env.NODE_ENV !== 'prod',
 logging: process.env.NODE_ENV !== 'prod',
}
const databaseSource = new DataSource(AppDataSource);
databaseSource.initialize();
export default databaseSource;
