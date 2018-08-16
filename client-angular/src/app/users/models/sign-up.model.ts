export class SignUpModel {
    constructor(
        public email: string,
        public password: string,
        public passwordRepeat: string,
        public username: string
    ) { }
}
