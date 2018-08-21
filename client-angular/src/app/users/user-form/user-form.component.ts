import { Component, OnInit, Input, Injector, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AbstractComponent } from '../shared/abstract.component';

const fbPass = {
    minlength: 'Password should be min 6 symbols long!',
    required: 'Password is required!',
    validators: Validators.compose(
        [Validators.minLength(6), Validators.required]
    )
};

const fbProps = {
    email: {
        email: 'Invalid email!',
        required: 'Email is required!',
        validators: Validators.compose(
            [Validators.email, Validators.required]
        )
    },
    password: fbPass,
    passwordCurrent: fbPass,
    passwordNew: fbPass,
    passwordRepeat: {
        mismatch: 'Passwords do not match!',
        validators: null
    },
    passwordRepeatNew: {
        mismatch: 'Passwords do not match!',
        validators: null
    },
    username: {
        required: 'Username is required!',
        validators: Validators.compose(
            [Validators.required]
        )
    }
};

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends AbstractComponent implements OnInit, OnChanges {
    @Input('attr') attr: any;
    @Input('errors') errors: any;
    @Input('formModel') formModel: Object;
    @Input('isFormReady') isFormReady: boolean;
    @Input('isSubmitting') isSubmitting: boolean;
    @Input('onSubmitHandler') onSubmitHandler: Function;
    private fbGroup = {};
    private userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() { }

    ngOnChanges() {
        // Wait for parent to collect data from service
        if (!this.isFormReady) {
            return;
        }

        this.groupFormModelPropsFromParent();

        this.userForm = this.fb.group(this.fbGroup);

        this.setPasswordValidators();

        this.subscribeToValueChangesAndValidate();
    }

    cancel() {
        this.location.back();
    }

    private groupFormModelPropsFromParent() {
        Object.keys(this.formModel)
            .forEach(key => {
                if (!fbProps.hasOwnProperty(key)) {
                    return;
                }
                this.fbGroup[key] = [
                    {
                        value: this.formModel[key],
                        disabled: this.attr.isFieldDisabled
                    },
                    fbProps[key].validators
                ];
            });
    }

    private passwordMatchValidator(c: AbstractControl, other: AbstractControl) {
        if (c.value !== other.value) {
            return { mismatch: true };
        }

        return null;
    }

    private setPasswordValidators() {
        if (this.userForm.get('passwordRepeat')) {
            this.userForm.get('passwordRepeat')
                .setValidators(Validators.compose([
                    this.passwordMatchValidator.bind(this, this.userForm.get('password')),
                    Validators.required
                ]));
        } else if (this.userForm.get('passwordRepeatNew')) {
            this.userForm.get('passwordRepeatNew')
                .setValidators(Validators.compose([
                    this.passwordMatchValidator.bind(this, this.userForm.get('passwordNew')),
                    Validators.required
                ]));
        }
    }

    private subscribeToValueChangesAndValidate() {
        Object.keys(this.userForm.controls).forEach(name => {
            const fieldControl = this.userForm.get(name);
            fieldControl.valueChanges.subscribe((value) => {
                if (name === 'password' && this.userForm.get('passwordRepeat')) {
                    this.userForm.get('passwordRepeat').updateValueAndValidity();
                } else if (name === 'passwordNew' && this.userForm.get('passwordRepeatNew')) {
                    this.userForm.get('passwordRepeatNew').updateValueAndValidity();
                }
                if (!fieldControl.valid) {
                    this.errors[name] = Object.keys(fieldControl.errors)
                        .map(key => fbProps[name][key]);
                } else {
                    this.errors[name] = null;
                }
            });
        });
    }
}
