import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
// Guards
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';

const moviesRoutes: Routes = [
    {
        path: 'all',
        component: AllComponent
    },
    {
        path: 'all/:id',
        component: AllComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CreateComponent
    },
    {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: EditComponent
    },
    {
        path: 'delete/:id',
        canActivate: [AdminGuard],
        component: DeleteComponent
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(moviesRoutes)
    ]
})
export class MoviesRoutingModule { }
