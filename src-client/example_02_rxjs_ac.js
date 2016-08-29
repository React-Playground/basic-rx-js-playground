import moment from "moment";
import $ from "jquery";
import Rx from 'rxjs/Rx';

const $title = $('#title');
const $result = $('#result');

Rx.Observable.fromEvent($title, 'keyup')
  .map(e => e.target.value)
  .distinctUntilChanged()
  .debounceTime(250)
  .switchMap(getItems)
  .subscribe(items => {
    $result.empty();
    $result.append(items.map(item => $('<li />').text(item)))
});


////Helper
function getItems(title) {
  console.log(`Quering ${title}`);
  return new Promise((resolve, reject)  => {
    window.setTimeout(() => {
      resolve([title, 'Item 2', `Another item ${Math.random()}`]);
    }, 500 + (Math.random() * 1000));
  });
}
