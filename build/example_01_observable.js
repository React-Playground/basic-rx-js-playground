'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInterval$(time) {
  return new _Rx2.default.Observable(function (observer) {
    var index = 0;
    var interval = setInterval(function () {
      console.log('Generating ' + index);
      observer.next(index++);
    }, time);

    return function () {
      clearInterval(interval);
    };
  });
}

var everySecond$ = createInterval$(1000);
var firstFiveSeconds = take$(everySecond$, 5);
var subscription = firstFiveSeconds.subscribe((0, _util.createSubscriber)('one'));

function take$(sourceObservable$, amount) {
  return new _Rx2.default.Observable(function (observer) {
    var count = 0;
    var subscription = sourceObservable$.subscribe({
      next: function next(item) {
        observer.next(item);
        if (++count >= amount) {
          observer.complete();
        }
      },
      error: function error(_error) {
        observer.error(_error);
      },
      complete: function complete() {
        observer.complete();
      }
    });
    return function () {
      return subscription.unsubscribe();
    };
  });
}

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 3000);
var everyTwo$ = createInterval$(2000);
// everyTwo$.subscribe(createSubscriberr('two'));

/* Observable
const simple$ = new Rx.Observable(observer => {
  console.log('Generating observable');
  setTimeout(() => {
    observer.next('an element');
    setTimeout(() => {
      observer.next('another element')
      observer.complete();
    }, 1000);
  }, 1000);
});


simple$.subscribe(
  item => console.log(`one.next${item}`),
  error => console.log(`one.error${error}`),
  () => console.log(`onComplete`)
);

setTimeout(() => {
  simple$.subscribe({
    next: item => console.log(`two,next${item}`),
    error: error => console.log(`two.next${error}`),
    complete: () => console.log(`two.complete`)
  });
}, 3000);
*/

/* Promise
const promise = new Promise((resolve, reject) => {
  console.log('IN PROMISE');
  resolve('hey');
});

promise.then(item =>  console.log(item));
*/