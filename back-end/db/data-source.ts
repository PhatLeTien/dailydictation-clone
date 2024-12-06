import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions:DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', // Thay đổi nếu bạn có username khác
    password: '', // Thay đổi nếu bạn có mật khẩu cho MySQL
    database: 'tttn1', // Tên database bạn muốn kết nối
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,

}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;