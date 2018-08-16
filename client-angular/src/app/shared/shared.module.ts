import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    declarations: [
        NavbarComponent,
        PaginationComponent
    ],
    exports: [
        NavbarComponent,
        PaginationComponent
    ],

    imports: [
        CommonModule,
        RouterModule
    ],
})
export class SharedModule { }
