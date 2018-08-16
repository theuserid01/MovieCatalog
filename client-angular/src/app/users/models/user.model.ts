export class UserModel {
    constructor(
        public _id: string,
        public email: string,
        public roles: string,
        public username: string
    ) { }
}
