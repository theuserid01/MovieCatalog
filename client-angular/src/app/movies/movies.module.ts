import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { moviesComponents } from '.';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ...moviesComponents
    ],
    imports: [
        CommonModule,
        MoviesRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
        MoviesService
    ]
})
export class MoviesModule { }
