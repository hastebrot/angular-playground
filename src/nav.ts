//-----------------------------------------------------------------------------
// IMPORTS.
//-----------------------------------------------------------------------------

import * as angular from "angular"
import * as ng from "angular"
import {
  StateDeclaration, StateProvider, Transition, TransitionService
} from "angular-ui-router"
import { UrlRouterProvider } from "angular-ui-router/lib/urlRouterProvider"

//-----------------------------------------------------------------------------
// COMPONENT.
//-----------------------------------------------------------------------------

class NavComponent implements ng.IComponentOptions {
  public bindings = {
    count: "="
  }

  public controller = NavController

  public template = `
    <div>{{ $ctrl | echo }} <button ng-click="$ctrl.baz()">++</button></div>
    <a ui-sref="root.authenticated.dashboard">dashboard</a>
    <a ui-sref="root.authenticated.settings">settings</a>
  `
}

//----------------------------------------------------------------------k-------
// CONTROLLER.
//-----------------------------------------------------------------------------

class NavController implements ng.IController {
  public bar = 0

  public baz() {
    this.bar++
  }
}

//-----------------------------------------------------------------------------
// SERVICES.
//-----------------------------------------------------------------------------

class NavService {
  private state: StateDeclaration

  public name(): string {
    return this.state.name
  }

  public title(): string {
    return this.state.data.title
  }

  public updateState(state: StateDeclaration) {
    this.state = state
    console.log(this.name())
  }
}

//-----------------------------------------------------------------------------
// APPLICATION.
//-----------------------------------------------------------------------------

namespace sample.utils {
  export function stringify(value: any) {
    return "" + JSON.stringify(value)
  }
}

namespace sample.nav {
  export const ng: ng.IAngularStatic = angular

  export const app: ng.IModule = ng.module("navApp", [
    "ui.router"
  ])

  app.filter("echo", () => utils.stringify)

  app.component("nav", new NavComponent())

  app.service("navService", NavService)

  app.config(($locationProvider: ng.ILocationProvider) => {
    $locationProvider.hashPrefix("")
  })

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
    $stateProvider
      .state("root", {
        abstract: true,
      })
      .state("root.authenticated", {
        abstract: true,
      })
    $urlRouterProvider.otherwise("/dashboard")
  })

  app.config(($stateProvider: StateProvider) => {
    $stateProvider
      .state("root.authenticated.dashboard", {
        url: "/dashboard",
        component: NavComponent.name,
        data: { title: "Dashboard" }
      })
    $stateProvider
      .state("root.authenticated.settings", {
        url: "/settings",
        component: NavComponent.name,
        data: { title: "Settings" }
      })
  })

  ng.element(document).ready(() => {
    ng.bootstrap(document, [app.name], { strictDi: true })
  })
}
