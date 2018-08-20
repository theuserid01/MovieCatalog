import { Component, Injector, OnInit } from '@angular/core';

import { AbstractComponent } from '../shared/abstract.component';
import { SignUpModel } from '../models/sign-up.model';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends AbstractComponent implements OnInit {
    public attr = {
        btnColor: 'btn-outline-primary',
        btnText: 'Submit',
        isFieldDisabled: false,
        isFieldVisibleEmail: true,
        isFieldVisiblePassword: true,
        isFieldVisiblePasswordCurrent: false,
        isFieldVisiblePasswordNew: false,
        isFieldVisiblePasswordRepeat: true,
        isFieldVisiblePasswordRepeatNew: false,
        isFieldVisibleUsername: true,
        title: 'Register'
    };
    public errors = {};
    public formModel: SignUpModel;
    public isFormReady: boolean;
    public isSubmitting: boolean;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.formModel = {
            email: '',
            password: '',
            passwordRepeat: '',
            username: ''
        };

        this.isFormReady = true;
    }

    onSubmitHandler(values: SignUpModel) {
        const data = {
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            username: values.username
        };

        this.isSubmitting = true;
        this.usersService.signUp(data)
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message);
                        this.errors = res.errors;
                        this.isSubmitting = false;
                        return;
                    }
                },
                (err: any) => {
                    console.log(err);
                    this.isSubmitting = false;
                }
            );
    }
}
