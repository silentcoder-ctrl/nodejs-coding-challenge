interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface User {
    email: string;
    name: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: Address;
}

export {User, Address};
