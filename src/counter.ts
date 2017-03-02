//-----------------------------------------------------------------------------
// CLASSES.
//-----------------------------------------------------------------------------

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
    this.count++
  }

  decrement() {
    this.count--
  }
}

//-----------------------------------------------------------------------------
// OBJECTS.
//-----------------------------------------------------------------------------

const counterComponent = {
  bindings: {
    count: "="
  },

  controller: function () {
    this.increment = function increment() {
      this.count++
    }

    this.decrement = function decrement() {
      this.count--
    }
  },

  template: `
    <div class="todo">
      <input type="text" ng-model="$ctrl.count">
      <button type="button" ng-click="$ctrl.decrement();">-</button>
      <button type="button" ng-click="$ctrl.increment();">+</button>
    </div>
  `
}

const app = angular.module("CounterApp", [])
app.component("counter", new CounterComponent())
// app.component("counter", counterComponent)
