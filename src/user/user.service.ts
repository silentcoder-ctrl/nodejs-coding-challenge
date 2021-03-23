import {User} from './user.interfaces';

export class UserService {
    public users: Array<User> = [];

    constructor(users?: Array<User>) {
        if (users) {
            this.users = users as User[];
        } else {
            this.users = require('../../data/users.json');
        }
    }

    public getUsers = () => {
        return this.users;
    }

    public create(user: User): User {
        const existingUser = this.users.find(({name}) => name === user.name);
        if (existingUser) {
            throw new Error("User already exists");
        }
        this.users.push(user);
        return this.users.find(m => m.name == user.name) as User;
    }

    public update(id: string, user: User): User {
        const existingUser = this.users.find(value => value.name == id);
        if (existingUser) {
            const index = this.users.indexOf((existingUser as User));
            if (!user) {
                throw new Error("Invalid User");
            }
            this.users[index] = user;
            return this.users[index];
        }
        throw new Error("Can not update user");
    }

    public delete(id: string): boolean {
        const existingUser = this.users.find(value => value.name == id);
        if (existingUser) {
            const index = this.users.indexOf((existingUser as User));
            this.users.splice(index, 1);
            return this.users.indexOf((existingUser as User)) === -1;
        }

        return false;
    }
}
