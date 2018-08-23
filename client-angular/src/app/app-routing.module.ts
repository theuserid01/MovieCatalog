import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { MoviesModule } from './movies/movies.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UsersModule } from './users/users.module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/movies/all' },
    { path: 'home', redirectTo: '/movies/all' },
    { path: 'movies', loadChildren: () => MoviesModule },
    { path: 'users', loadChildren: () => UsersModule },
    { path: '**', component: NotFoundComponent }
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
