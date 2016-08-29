'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require('./lib/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rx.Observable.interval(500)
//   .take(5)
//   .subscribe(createSubscriber('one'));

// Rx.Observable.timer(1000, 500)
//   .take(3)
//   .subscribe(createSubscriber('timer'));


_Rx2.default.Observable.of(['array', 'arraytwo']).subscribe((0, _util.createSubscriber)('one'));

_Rx2.default.Observable.from([1, 2, 3, 4, 5]).map(function (i) {
  return i * 5;
}).subscribe((0, _util.createSubscriber)('from'));

_Rx2.default.Observable.throw(4324234).subscribe((0, _util.createSubscriber)('error'));

_Rx2.default.Observable.empty().subscribe((0, _util.createSubscriber)('empty'));

var sideEffect = 0;
var defer$ = _Rx2.default.Observable.defer(function () {
  sideEffect++;
  return _Rx2.default.Observable.of(sideEffect);
});

defer$.subscribe((0, _util.createSubscriber)('defer$.one'));
defer$.subscribe((0, _util.createSubscriber)('defer$.two'));
defer$.subscribe((0, _util.createSubscriber)('defer$.three'));

_Rx2.default.Observable.range(10, 30).subscribe((0, _util.createSubscriber)('range'));

// function* genereat() {
//   yield 1;
//   yield 5;
//   yield 'hey';
// };