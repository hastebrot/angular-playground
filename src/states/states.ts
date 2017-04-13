// http://localhost:3000/src/states/states.html

//-----------------------------------------------------------------------------
// CLASSES.
//-----------------------------------------------------------------------------

import * as angular from "angular"
import { StateProvider, TransitionService } from "angular-ui-router"
import { UrlRouterProvider } from "angular-ui-router/lib/urlRouterProvider"

class StatesComponent implements ng.IComponentOptions {
  bindings = {
    count: "="
  }

  controller = StatesController

  template = `
    <div>{{ $ctrl | echo }}</div>
  `
}

class StatesController {
  bar = 0

  baz() {
    this.bar++
  }
}

namespace app.states {
  const ng = angular
  const app = ng.module("StatesApp", [
    "ui.router"
  ])

  app.filter("echo", () => stringify)
  function stringify(value: any) {
    return "" + JSON.stringify(value)
  }

  app.component("states", new StatesComponent())

  app.config(($locationProvider: ng.ILocationProvider) => {
    $locationProvider.hashPrefix("")
  })

  app.run(($transitions: TransitionService, $rootScope: ng.IRootScopeService) => {
    $transitions.onSuccess({}, () => console.log("callback"))
  })

  app.config(($stateProvider: StateProvider) => {
    // $urlRouterProvider.otherwise("/dashboard")
    $stateProvider
      .state("root", {
        abstract: true,
        template: "<ui-view></ui-view>",
        data: {}
      })
      .state("root.authenticated", {
        abstract: true,
        component: "StatesComponent"
      })
  })

  app.config(($stateProvider: StateProvider) => {
    $stateProvider
      .state("root.authenticated.dashboard", {
        url: "/dashboard",
        component: "StatesComponent",
        data: {}
      })
  })
}
