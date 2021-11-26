import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-100%)' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
        query(':enter', [
          animate('0.3s ease-out', style({ transform: 'translateX(0)' }))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);
