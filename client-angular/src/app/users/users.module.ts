import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { usersComponents } from '.';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';

@NgModule({
    declarations: [
        ...usersComponents
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        UsersRoutingModule
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule { }
