import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
    public spinnerHeight: number;

    constructor() { }

    ngOnInit() {
        const header = document.getElementsByTagName('header')[0];
        const headerHeight = this.getAbsoluteHeight(header);
        this.spinnerHeight = document.body.offsetHeight - headerHeight;
    }

    private getAbsoluteHeight(el) {
        el = (typeof el === 'string') ? document.querySelector(el) : el;

        const styles = window.getComputedStyle(el);
        const marginBottom = parseFloat(styles['marginBottom']);
        const marginTop = parseFloat(styles['marginTop']);
        const margin = marginBottom + marginTop;

        return Math.ceil(el.offsetHeight + margin);
    }
}
