import {expect} from "chai";
import {UserService} from "../src/user/user.service";
import {User} from "../src/user/user.interfaces";
import {nanoid} from 'nanoid';

describe('UserService', function () {
    const userService = new UserService([
        {
            email: "Diana_Oberbrunner80@yahoo.com",
            name: "Chasity Torphy",
            dateOfBirth: "1965-11-27T18:03:03.256Z",
            phoneNumber: "1-173-967-0467 x50293",
            address: {
                street: "56599 Yost Plains",
                city: "Lake Justen",
                state: "Louisiana",
                zipCode: "02308",
                country: "Jordan"
            }
        },
        {
            email: "Ethyl.Pagac23@gmail.com",
            name: "Rowena Sipes",
            dateOfBirth: "2006-11-03T04:35:47.097Z",
            phoneNumber: "1-063-578-7024",
            address: {
                street: "94135 Pollich Way",
                city: "Araburgh",
                state: "Oklahoma",
                zipCode: "28184-2383",
                country: "Guatemala"
            }
        }
    ]);

    it('should return stub users when called', () => {
        expect(userService.getUsers().length).equal(2);
    });

    it('create user should create user if user does not exist', () => {
        const user: User = {
            email: "Ethyl.Pagac23@gmail.com",
            name: "Rowena Sipes",
            dateOfBirth: "2006-11-03T04:35:47.097Z",
            phoneNumber: "1-063-578-7024",
            address: {
                street: "94135 Pollich Way",
                city: "Araburgh",
                state: "Oklahoma",
                zipCode: "28184-2383",
                country: "Guatemala"
            }
        };

        const sampleUser: User = {...user};
        sampleUser.name = nanoid();
        const newUser = userService.create(sampleUser);
        expect(newUser).to.not.be.null;
    });

    it('create user should throw error if user already exists', () => {
        const user = userService.users[0];
        expect(() => userService.create(user))
            .to.throw(Error, /User already exists/);
    });

    it('delete user if user exists', () => {
        const existingUser = userService.users[0];
        expect(userService.delete(existingUser.name)).to.be.true;
    });

    it('delete user throws error if user does not exist', () => {
        expect(userService.delete(nanoid())).to.be.false;
    });

    it('update user will update user if exists', () => {
        const existingUser = userService.getUsers()[0];
        const newUser = {...existingUser};
        newUser.name = 'new name';
        const updatedUser = userService.update(existingUser.name, newUser);
        expect(updatedUser.name).to.equal(newUser.name);
    });

    it('update user will throw error if user does not exist', () => {
        const existingUser = userService.getUsers()[0];

        const update = () => userService.update(nanoid(), existingUser);
        expect(update).to.throw(Error, /Can not update user/);
    });
});
