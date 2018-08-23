import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';

// Components
import { AllComponent } from './all/all.component';
import { DeleteComponent } from './delete/delete.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const usersRoutes: Routes = [
    {
        path: 'all',
        canActivate: [AdminGuard],
        component: AllComponent
    },
    {
        path: 'edit/details/:id',
        canActivate: [AuthGuard],
        component: EditDetailsComponent
    },
    {
        path: 'edit/roles/:id',
        canActivate: [AdminGuard],
        component: EditRolesComponent
    },
    {
        path: 'delete/:id',
        canActivate: [AdminGuard],
        component: DeleteComponent
    },
    {
        path: 'edit/password/:id',
        canActivate: [AuthGuard],
        component: EditPasswordComponent
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(usersRoutes)
    ]
})
export class UsersRoutingModule { }
