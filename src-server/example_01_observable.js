import Rx from 'rxjs/Rx';

function createInterval$(time) {
  return new Rx.Observable(observer => {
    let index = 0;
    let interval =  setInterval(() => {
      console.log(`Generating ${index}`);
      observer.next(index++);
    }, time);

    return () => {
      clearInterval(interval);
    };
  });
}

function createSubscriber(tag) {
  return {
    next(item) { console.log(`${tag}.next ${item}`); },
    error(error) {console.log(`${tag}.next ${item}`)},
    complete() {console.log(`${tag}.complete`)}
  };
}


const everySecond$ = createInterval$(1000);
const firstFiveSeconds = take$(everySecond$, 5);
const subscription = firstFiveSeconds.subscribe(createSubscriber('one'));

function take$(sourceObservable$, amount) {
  return new Rx.Observable(observer => {
    let count = 0;
    const subscription = sourceObservable$.subscribe({
      next(item) {
        observer.next(item);
        if (++count >= amount) {
          observer.complete();
        }
      },
      error(error) { observer.error(error)},
      complete() {observer.complete()}
    });
    return () => subscription.unsubscribe();
  });
}

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 3000);
const everyTwo$ = createInterval$(2000);
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
