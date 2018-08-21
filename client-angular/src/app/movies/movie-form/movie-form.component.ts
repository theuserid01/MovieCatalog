import { Component, OnInit, Input, Injector, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AbstractComponent } from '../shared/abstract.component';

const fbProps = {
    countries: {
        validators: null
    },
    genres: {
        validators: null
    },
    imageUrl: {
        validators: null
    },
    languages: {
        validators: null
    },
    productionYear: {
        min: 'Production year should be min 1900',
        required: 'Production year is required!',
        validators: Validators.compose(
            [Validators.min(1900), Validators.required]
        )
    },
    synopsis: {
        validators: null
    },
    title: {
        required: 'Title is required!',
        validators: Validators.compose(
            [Validators.required]
        )
    }
};


@Component({
    selector: 'app-movie-form',
    templateUrl: './movie-form.component.html',
    styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent extends AbstractComponent implements OnInit, OnChanges {
    @Input('attr') attr: any;
    @Input('errors') errors: any;
    @Input('formModel') formModel: Object;
    @Input('isFormReady') isFormReady: boolean;
    @Input('isSubmitting') isSubmitting: boolean;
    @Input('onSubmitHandler') onSubmitHandler: Function;
    private fbGroup = {};
    private movieForm: FormGroup;

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

        this.movieForm = this.fb.group(this.fbGroup);

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

    private subscribeToValueChangesAndValidate() {
        Object.keys(this.movieForm.controls).forEach(name => {
            const fieldControl = this.movieForm.get(name);
            fieldControl.valueChanges.subscribe(() => {
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
