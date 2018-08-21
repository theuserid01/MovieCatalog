import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
    public spinnerHeight: number;

    constructor() { }

    ngOnInit() {
        const headerHeight = document.getElementsByTagName('header')[0].clientHeight;
        this.spinnerHeight = document.body.clientHeight - headerHeight;
    }
}
