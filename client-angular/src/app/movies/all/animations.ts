import {
    animate,
    keyframes,
    query,
    stagger,
    style,
    transition,
    trigger
} from '@angular/animations';

const animations = [
    trigger('fadeInDetails', [
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
    ]),
    trigger('fadeInThumbs', [
        transition('* => *', [
            query('img', style({ opacity: 0 }), { optional: true }),
            query('img', stagger('100ms', [
                animate('200ms ease-in', keyframes([
                    style({
                        offset: 0,
                        opacity: 0,
                        transform: 'translateX(-75px)'
                    }),
                    style({
                        offset: 0.3,
                        opacity: 0.5,
                        transform: 'translateX(35px)'
                    }),
                    style({
                        offset: 1,
                        opacity: 1,
                        transform: 'translateX(0)'
                    })
                ]))
            ]))
        ])
    ])
];

export { animations };
