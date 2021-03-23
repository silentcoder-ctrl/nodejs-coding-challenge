import {UserController} from "./user.controller";
import {Router} from 'express';

export class UserRouter {
    path = '/users';
    router = Router();
    userService = new UserController();

    constructor() {
        this.configure();
    }

    public configure() {
        this.router.get(`${this.path}`, this.userService.getUsers);
        this.router.post(`${this.path}`, this.userService.create);
        this.router.put(`${this.path}/:id`, this.userService.update);
        this.router.delete(`${this.path}/:id`, this.userService.delete);
    }
}
