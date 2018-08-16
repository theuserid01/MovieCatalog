import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        component: AllComponent
    },
    {
        path: 'edit/details/:id',
        component: EditDetailsComponent
    },
    {
        path: 'edit/roles/:id',
        component: EditRolesComponent
    },
    {
        path: 'delete/:id',
        component: DeleteComponent
    },
    {
        path: 'edit/password/:id',
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
