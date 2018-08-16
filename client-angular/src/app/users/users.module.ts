import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { usersComponents } from '.';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';
import { SharedModule } from '../shared/shared.module';

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
