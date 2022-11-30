import express, { Application as ExpressApplication } from "express";
import cors from "cors";
import { v1UsersRoutes } from "../routes/v1/index.routes";
import db from "../database/connection";


class Server {
    private app: ExpressApplication;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";

        /** Métodos iniciales*/
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }

    async dbConnection() {
        try {
            await db.authenticate(); 
            console.log("Base de datos está online!");
        } catch (error) {
            throw new Error(error as string);  
        }
    }

    middlewares() {
        // Configurar el CORS
        this.app.use( cors() );
        // Lectura del Body
        this.app.use(express.json());
        // Carpeta publica
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use("/api/v1/users", v1UsersRoutes.default);
    }
}


export default Server;