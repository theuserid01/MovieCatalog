import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        NavbarComponent,
        NotFoundComponent,
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
