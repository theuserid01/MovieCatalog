export class EditPasswordModel {
    constructor(
        public passwordCurrent: string,
        public passwordNew: string,
        public passwordRepeatNew: string
    ) { }
}
