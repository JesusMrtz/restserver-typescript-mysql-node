import { Sequelize } from "sequelize";


const db = new Sequelize(String(process.env.DB_NAME), String(process.env.DB_USERNAME), String(process.env.DB_PASSWORD), {
    host: String(process.env.DB_HOST),
    dialect: "mysql",
    port: Number(process.env.DB_PORT),
});


export default db;