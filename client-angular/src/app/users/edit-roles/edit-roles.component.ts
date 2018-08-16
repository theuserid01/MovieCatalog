import { Location } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AbstractComponent } from '../shared/abstract.component';
import { EditRolesModel } from '../models/edit-roles.model';

@Component({
    selector: 'app-edit-roles',
    templateUrl: './edit-roles.component.html',
    styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent extends AbstractComponent implements OnInit {
    public error: boolean;
    public id: string;
    public isSubmitting: boolean;
    public allRoles: string[];
    public availableRoles: string[];
    public currentRoles: string[];
    public selectedRoles: string[];
    public userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _location: Location,
        public injector: Injector
    ) {
        super(injector);
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params.id;
        this.getData();
    }

    cancel() {
        this._location.back();
    }

    getData() {
        this.usersService.editRolesGet(this.id)
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message);
                        return;
                    }
                    const userRoles = res.data;
                    this.allRoles = userRoles.allRoles;
                    this.availableRoles = userRoles.availableRoles;
                    this.currentRoles = userRoles.currentRoles;
                    this.selectedRoles = userRoles.selectedRoles;
                    this.userForm = this.fb.group({
                        availableRoles: [this.availableRoles, null],
                        selectedRoles: [this.selectedRoles, null]
                    });
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    onChangeHandler() {
        this.error = false;
    }

    onClickAllToLeft = () => {
        this.error = false;
        this.availableRoles = this.allRoles;
        this.selectedRoles = [];
    }

    onClickAllToRight = () => {
        this.error = false;
        this.availableRoles = [];
        this.selectedRoles = this.allRoles;
    }

    onClickSelectedToLeft = () => {
        const e = document.getElementById('selectedRoles') as HTMLSelectElement;
        const selectedOption = e.options[e.selectedIndex];
        if (selectedOption === undefined) {
            this.error = true;
            return;
        }

        const roleToMove = selectedOption.value;
        this.availableRoles.push(roleToMove);
        this.availableRoles.sort();
        this.selectedRoles = this.selectedRoles
            .filter(r => r !== roleToMove);
    }

    onClickSelectedToRight = () => {
        const e = document.getElementById('availableRoles') as HTMLSelectElement;
        const selectedOption = e.options[e.selectedIndex];
        if (selectedOption === undefined) {
            this.error = true;
            return;
        }

        const roleToMove = selectedOption.value;
        this.availableRoles = this.availableRoles
            .filter(r => r !== roleToMove);
        this.selectedRoles.push(roleToMove);
        this.selectedRoles.sort();
    }

    onSubmitHandler(data: EditRolesModel) {
        this.isSubmitting = true;
        this.usersService.editRolesPost(this.id, data)
            .subscribe(
                (res: any) => {
                    if (!res.success) {
                        console.log(res.message);
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
