import { Component } from '@angular/core';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'app';
    public spinnerComponent = SpinnerComponent;
}
