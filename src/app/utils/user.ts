interface UserType {
    name : string;
    age : number;
    sex : string;
    address : string;
    phoneNumber : string;
}

export class User implements UserType {
    name : string;
    age : number;
    sex : string;
    address : string;
    phoneNumber : string;

    constructor( _name : string , _age : number , _sex : string , _address : string , _phoneNumber : string ) {
        this.name = _name;
        this.age = _age;
        this.sex = _sex;
        this.address = _address;
        this.phoneNumber = _phoneNumber;
    }
}
