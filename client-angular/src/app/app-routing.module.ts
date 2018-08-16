import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersModule } from './users/users.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'users/all' },
    { path: 'home', redirectTo: 'users/all' },
    { path: 'users', loadChildren: () => UsersModule }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule { }
