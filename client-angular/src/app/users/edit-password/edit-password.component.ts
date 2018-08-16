import { Component, Injector, OnInit } from '@angular/core';

import { AbstractComponent } from '../shared/abstract.component';
import { EditPasswordModel } from '../models/edit-password.model';

@Component({
    selector: 'app-edit-password',
    templateUrl: './edit-password.component.html',
    styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent extends AbstractComponent implements OnInit {
    public attr = {
        btnColor: 'btn-outline-primary',
        btnText: 'Save',
        isFieldDisabled: false,
        isFieldVisibleEmail: false,
        isFieldVisiblePassword: false,
        isFieldVisiblePasswordCurrent: true,
        isFieldVisiblePasswordNew: true,
        isFieldVisiblePasswordRepeat: false,
        isFieldVisiblePasswordRepeatNew: true,
        isFieldVisibleUsername: false,
        title: 'Edit Password'
    };
    public errors = {};
    public id: string;
    public formModel: EditPasswordModel;
    public isFormReady: boolean;
    public isSubmitting: boolean;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;

        this.formModel = {
            passwordCurrent: '',
            passwordNew: '',
            passwordRepeatNew: ''
        };

        this.isFormReady = true;
    }

    onSubmitHandler(data: EditPasswordModel) {
        this.isSubmitting = true;
        this.usersService.editPasswordPost(this.id, data)
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
