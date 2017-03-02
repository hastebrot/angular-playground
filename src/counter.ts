class CounterComponent implements ng.IComponentOptions {
  bindings = {
    count: "="
  }

  controller = CounterController

  template = `
    <div class="todo">
      <input type="text" ng-model="$ctrl.count">
      <button type="button" ng-click="$ctrl.decrement();">-</button>
      <button type="button" ng-click="$ctrl.increment();">+</button>
    </div>
  `
}

class CounterController {
  count = 0

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}

let counterComponent = {
  bindings: {
    count: "="
  },
  controller: function () {
    function increment() {
      this.count++;
    }
    function decrement() {
      this.count--;
    }
    this.increment = increment;
    this.decrement = decrement;
  },
  template: `
    <div class="todo">
      <input type="text" ng-model="$ctrl.count">
      <button type="button" ng-click="$ctrl.decrement();">-</button>
      <button type="button" ng-click="$ctrl.increment();">+</button>
    </div>
  `
}

angular.module("CounterApp", [])
  .component("counter", new CounterComponent())
  // .component("counter", counterComponent)