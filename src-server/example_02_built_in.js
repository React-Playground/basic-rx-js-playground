import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util.js';

// Rx.Observable.interval(500)
//   .take(5)
//   .subscribe(createSubscriber('one'));

// Rx.Observable.timer(1000, 500)
//   .take(3)
//   .subscribe(createSubscriber('timer'));


Rx.Observable.of(['array', 'arraytwo'])
  .subscribe(createSubscriber('one'));

  Rx.Observable.from([1,2,3,4,5])
  .map(i => i * 5)
  .subscribe(createSubscriber('from'));


  Rx.Observable.throw(4324234)
    .subscribe(createSubscriber('error'))

  Rx.Observable.empty()
    .subscribe(createSubscriber('empty'))

let sideEffect = 0;
const defer$ = Rx.Observable.defer(() => {
  sideEffect++;
  return Rx.Observable.of(sideEffect);
});

defer$.subscribe(createSubscriber('defer$.one'))
defer$.subscribe(createSubscriber('defer$.two'))
defer$.subscribe(createSubscriber('defer$.three'))

Rx.Observable.range(10, 30)
  .subscribe(createSubscriber('range'))

// function* genereat() {
//   yield 1;
//   yield 5;
//   yield 'hey';
// };
