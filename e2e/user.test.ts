import chai from 'chai';
import chaiHttp from 'chai-http';
import {App} from '../src/app'
import {User} from "../src/user/user.interfaces";
import {nanoid} from "nanoid";

const {expect} = chai;
chai.use(chaiHttp);

describe('User', () => {
    const app = new App();
    const path = '/users';
    const users = require('../data/users.json');

    describe('GET /users', () => {
        it('should return an array of all users', (done) => {
            chai.request(app.app).get(path).then(result => {
                const {users} = result.body;
                expect(users).to.not.be.null;
                expect(users).length.to.be.greaterThan(0);
            });

            done();
        });
    });
    describe('POST /users', () => {
        it('should create new user with valid body data', (done) => {
            const newUser: User = {
                name: nanoid(),
                email: `${nanoid()}@email.com`,
                dateOfBirth: nanoid(),
                phoneNumber: nanoid(),
                address: {
                    city: nanoid(),
                    country: nanoid(),
                    state: nanoid(),
                    street: nanoid(),
                    zipCode: nanoid()
                }
            };
            chai.request(app.app).post(path).send(newUser).then(result => {
                expect(result.status).to.equal(200);
                expect(result.text).to.equal('New User Added');
            });

            done();
        })

        it('should reject new user if already exists', (done) => {
            const newUser: User = users[0];
            chai.request(app.app).post(path).send(newUser).then(result => {
                expect(result.status).to.equal(500);
                expect(result.text).to.equal('Error, User Already Taken');
            });

            done();
        });
    });
    describe('PUT /users', () => {
        it('should update user based on valid id and body', (done) => {
            const newUser: User = users[0];
            const updateUser = {...newUser};
            updateUser.email = 'sampleemail@email.com'
            chai.request(app.app)
                .put(`${path}/${newUser.name}`)
                .send(newUser)
                .then(result => {
                    expect(result).to.throw(Error);
                    expect(result.status).to.equal(200);
                    expect(result.text).to.equal('User Updated');
                });

            done();
        });

        it('should fail due to invalid request id', (done) => {
            const newUser: User = users[0];
            const updateUser = {...newUser};
            updateUser.email = 'sampleemail@email.com'
            chai.request(app.app)
                .put(`${path}`)
                .send(newUser)
                .then(result => {
                    expect(result.status).to.equal(500);
                    expect(result.text).to.equal('Invalid resource requested');
                });

            done();
        });

        it('should fail due to invalid body', (done) => {
            const newUser: User = users[0];
            const updateUser = {...newUser};
            updateUser.email = 'sampleemail@email.com'
            chai.request(app.app)
                .put(`${path}/${newUser.name}`)
                .send({})
                .then(result => {
                    expect(result.status).to.equal(500);
                    expect(result.text).to.equal('Invalid User');
                });

            done();
        });
    });

    describe('DELETE /users', () => {
        it('should delete existing user', (done) => {
            const userId: string = users[0].name;
            chai.request(app.app)
                .delete(`${path}/${userId}`)
                .then(result => {
                    expect(result.status).to.equal(200);
                });
            done();
        });
        it('should reject if user does not exist', (done) => {
            chai.request(app.app)
                .delete(`${path}/${nanoid()}`)
                .then(result => {
                    expect(result.status).to.equal(500);
                });
            done();
        })
    });
})
