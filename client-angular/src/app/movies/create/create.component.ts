import { Component, Injector, OnInit } from '@angular/core';

import { AbstractComponent } from '../shared/abstract.component';
import { BaseModel } from '../models/base.model';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent extends AbstractComponent implements OnInit {
    public attr = {
        btnColor: 'btn-outline-primary',
        btnText: 'Save',
        isFieldDisabled: false,
        title: 'Create Movie'
    };
    public errors = {};
    public formModel: BaseModel;
    public isFormReady: boolean;
    public isSubmitting: boolean;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.formModel = {
            countries: '',
            genres: '',
            imageUrl: '',
            languages: '',
            productionYear: (new Date()).getFullYear(),
            synopsis: '',
            title: ''
        };

        this.isFormReady = true;
    }

    onSubmitHandler(values: BaseModel) {
        const data = {
            countries: values.countries,
            genres: values.genres,
            imageUrl: values.imageUrl,
            languages: values.languages,
            productionYear: Number(values.productionYear),
            synopsis: values.synopsis,
            title: values.title
        };

        this.isSubmitting = true;
        this.moviesService.createPost(data)
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
