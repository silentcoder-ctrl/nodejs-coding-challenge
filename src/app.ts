import {UserRouter} from "./user/user.router";
const bodyParser = require('body-parser')
const express = require("express");

export class App {
    public app = express();
    port = 8080;

    constructor() {
        this.addMiddleware();
        this.addRoutes();
    }

    private addRoutes() {
        const userRoutes = new UserRouter();
        this.app.use(userRoutes.router);
    }

    private addMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(express.json());
    }

    listen(port?: number) {
        this.app.listen(port ?? this.port, () => {
            console.log(`server listening on ${this.port}`)
        });
    }
}
