import {
    animate,
    keyframes,
    style,
    transition,
    trigger
} from '@angular/animations';

const animations = [
    trigger('fadeIn', [
        transition('init => fadeIn', [
            animate('1000ms ease', keyframes([
                style({
                    opacity: 0,
                    transform: 'translateX(-100px)'
                }),
                style({
                    opacity: 0.1,
                    transform: 'translateX(-50px)'
                }),
                style({
                    opacity: 0.7,
                    transform: 'translateX(-30px)'
                }),
                style({
                    opacity: 0.8,
                    transform: 'translateX(-20px)'
                }),
                style({
                    opacity: 0.9,
                    transform: 'translateX(-10px)'
                }),
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })
            ]))
        ])
    ])
];

export { animations };
