import { Component, Injector, OnInit } from '@angular/core';

import { SignInModel } from '../models/sign-in.model';
import { AbstractComponent } from '../shared/abstract.component';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends AbstractComponent implements OnInit {
    public attr = {
        btnColor: 'btn-outline-primary',
        btnText: 'Submit',
        isFieldDisabled: false,
        isFieldVisibleEmail: false,
        isFieldVisiblePassword: true,
        isFieldVisiblePasswordCurrent: false,
        isFieldVisiblePasswordNew: false,
        isFieldVisiblePasswordRepeat: false,
        isFieldVisiblePasswordRepeatNew: false,
        isFieldVisibleUsername: true,
        title: 'Login'
    };
    public errors = {};
    public formModel: SignInModel;
    public isFormReady: boolean;
    public isSubmitting: boolean;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.formModel = {
            password: 'Admin1',
            username: 'admin'
        };

        this.isFormReady = true;
    }

    onSubmitHandler(values: SignInModel) {
        const data = {
            password: values.password,
            username: values.username
        };

        this.isSubmitting = true;
        this.usersService.signIn(data)
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
