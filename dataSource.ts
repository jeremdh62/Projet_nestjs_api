import { DataSource } from "typeorm";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot();
const datasouce  = new DataSource({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
});

export default datasouce;
