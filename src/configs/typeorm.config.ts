import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'nolmungshimung',
    entities: [__dirname + '/../**/*.entity.js'],
    // entities: ["dist/boards/boards.entity.js"],
    synchronize: true,
}
