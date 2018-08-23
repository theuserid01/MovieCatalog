import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { moviesComponents } from '.';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';

@NgModule({
    declarations: [
        ...moviesComponents,
    ],
    imports: [
        CommonModule,
        MoviesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule
    ],
    providers: [
        MoviesService
    ]
})
export class MoviesModule { }
