//-----------------------------------------------------------------------------
// IMPORTS.
//-----------------------------------------------------------------------------

import * as angular from "angular"
import * as ng from "angular"
import { StateDeclaration, StateProvider, Transition, TransitionService } from "angular-ui-router"
import { UrlRouterProvider } from "angular-ui-router/lib/urlRouterProvider"

//-----------------------------------------------------------------------------
// COMPONENT.
//-----------------------------------------------------------------------------

class NavComponent implements ng.IComponentOptions {
  bindings = {
    count: "="
  }

  controller = NavController

  template = `
    <div>{{ $ctrl | echo }}</div>
  `
}

//-----------------------------------------------------------------------------
// CONTROLLER.
//-----------------------------------------------------------------------------

class NavController implements ng.IController {
  bar = 0

  baz() {
    this.bar++
  }
}

//-----------------------------------------------------------------------------
// APPLICATION.
//-----------------------------------------------------------------------------

namespace sample.nav {
  export const ng = angular

  export const app = angular.module("navApp", [
    "ui.router"
  ])

  app.filter("echo", () => stringify)
  function stringify(value: any) {
    return "" + JSON.stringify(value)
  }

  app.component("nav", new NavComponent())

  app.config(($locationProvider: ng.ILocationProvider) => {
    $locationProvider.hashPrefix("")
  })

  class NavService {
    private state: StateDeclaration

    title(): string {
      return this.state.data.title
    }

    updateState(state: StateDeclaration) {
      this.state = state
    }
  }

  app.service("navService", NavService)

  app.run(($transitions: TransitionService,
           $rootScope: ng.IRootScopeService,
           navService: NavService) => {
    $transitions.onSuccess({}, (transition: Transition) => {
      navService.updateState(transition.targetState().state())
      $rootScope["navTitle"] = navService.title()
    })
  })

  app.config(($stateProvider: StateProvider,
              $urlRouterProvider: UrlRouterProvider) => {
    $urlRouterProvider.otherwise("/dashboard")
    $stateProvider
      .state("root", {
        abstract: true,
        template: "<ui-view></ui-view>",
        data: {}
      })
      .state("root.authenticated", {
        abstract: true,
        component: NavComponent.name
      })
  })

  app.config(($stateProvider: StateProvider) => {
    $stateProvider
      .state("root.authenticated.dashboard", {
        url: "/dashboard",
        component: NavComponent.name,
        data: { title: "Dashboard" }
      })
  })

  angular.element(document).ready(() => {
    angular.bootstrap(document, [app.name], { strictDi: true })
  })
}
