import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
// Components
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MoviesModule } from './movies/movies.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
// Providers
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { SuccessInterceptor } from './core/interceptors/success.interceptor';
import { appReducers } from './redux/reducers/app.reducers';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    entryComponents: [
        SpinnerComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        HttpClientModule,
        MoviesModule,
        NgHttpLoaderModule,
        SharedModule,
        StoreModule.forRoot(appReducers),
        ToastrModule.forRoot(),
        UsersModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SuccessInterceptor,
            multi: true
        }
    ]
})
export class AppModule { }
