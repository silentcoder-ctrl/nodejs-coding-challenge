import {NextFunction, Request, Response} from "express";
import {UserService} from "./user.service";
import {User} from "./user.interfaces";

export class UserController {
    service = new UserService();

    constructor() {
    }

    public getUsers = (request: Request, response: Response) => {
        response.send({
            users: this.service.getUsers()
        });
    }

    public create = async (request: Request, response: Response, next: NextFunction) => {
        const user: User = request.body;
        try {
            this.service.create(user);
            response.send({
                status: 200,
                text: 'New User Added'
            });
        } catch (e) {
            next(e);
        }
    }

    public update = (request: Request, response: Response, next: NextFunction) => {
        const user: User = request.body;
        const id = request.params.id;
        if (!id) {
            next("Invalid resource requested");
        }
        try {
            this.service.update(id, user);
            response.send({
                status: 200,
                text: "User Updated"
            })
        } catch (e) {
            next(e);
        }
    }

    public delete = (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        if (!id) {
            next("Invalid resource id");
        }

        try {
            this.service.delete(id);
            response.send({
                status: 200
            });
        } catch (e) {
            next(e);
        }
    }
}
