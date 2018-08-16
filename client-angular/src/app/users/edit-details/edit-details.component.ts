import { Component, Injector, OnInit } from '@angular/core';

import { AbstractComponent } from '../shared/abstract.component';
import { BaseModel } from '../models/base.model';

@Component({
    selector: 'app-edit-details',
    templateUrl: './edit-details.component.html',
    styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent extends AbstractComponent implements OnInit {
    public attr = {
        btnColor: 'btn-outline-primary',
        btnText: 'Save',
        isFieldDisabled: false,
        isFieldVisibleEmail: true,
        isFieldVisiblePassword: false,
        isFieldVisiblePasswordCurrent: false,
        isFieldVisiblePasswordNew: false,
        isFieldVisiblePasswordRepeat: false,
        isFieldVisiblePasswordRepeatNew: false,
        isFieldVisibleUsername: true,
        title: 'Edit Details'
    };
    public errors = {};
    public formModel: BaseModel;
    public id: string;
    public isFormReady: boolean;
    public isSubmitting: boolean;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;
        this.isFormReady = false;
        this.getData();
    }

    getData() {
        this.usersService.editDetailsGet(this.id)
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message)
                        return;
                    }
                    this.formModel = res.data;
                    this.isFormReady = true;
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    onSubmitHandler(data: BaseModel) {
        this.isSubmitting = true;
        this.usersService.editDetailsPost(this.id, data)
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
