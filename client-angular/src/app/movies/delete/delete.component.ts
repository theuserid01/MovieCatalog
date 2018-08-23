import { Component, Injector, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../redux/states/app.state';
import { BaseModel } from '../models/base.model';
import { AbstractComponent } from '../shared/abstract.component';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent extends AbstractComponent implements OnInit {
    public attr = {
        btnColor: 'btn-outline-danger',
        btnText: 'Delete',
        isFieldDisabled: true,
        title: 'Delete Movie'
    };
    public errors = {};
    public formModel: BaseModel;
    public isFormReady: boolean;
    public isSubmitting: boolean;

    constructor(
        private store: Store<AppState>,
        injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.isFormReady = false;
        this.getData();
    }

    getData() {
        const id = this.activatedRoute.snapshot.params.id;
        this.moviesService.deleteGet(id)
            .subscribe(
                () => {
                    this.store
                        .pipe(select(state => state.movies.deleteGet))
                        .subscribe(
                            (res: any) => {
                                if (!res.success) {
                                    console.log(res.message);
                                    return;
                                }
                                this.formModel = res.data;
                                this.isFormReady = true;
                            },
                            (err: any) => {
                                console.log(err);
                            }
                        );
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }

    onSubmitHandler(values: BaseModel) {
        const id = this.activatedRoute.snapshot.params.id;
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
        this.moviesService.deletePost(id, data)
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
