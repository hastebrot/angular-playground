# angular-playground

<!-- TOC depthFrom:2 orderedList:true -->

1. [Usage](#usage)
2. [Dependencies](#dependencies)
3. [Documentation](#documentation)

<!-- /TOC -->

## Usage

Install dependencies, build source code, and run development server.

~~~
$ yarn install
$ yarn build
$ yarn dev
~~~

Open samples:

~~~
$ xdg-open http://localhost:3000/src/hello.html
$ xdg-open http://localhost:3000/src/counter.html
~~~

## Dependencies

Dependencies in `package.json`:

~~~json
"dependencies": {
  "angular": "^1.6.2",
  "angular-ui-router": "^0.4.2",
  "bootstrap": "^3.3.7",
  "ui-grid": "^0.0.0",
  "ui-select": "^0.19.6"
}
~~~

Development dependencies in `package.json`:

~~~json
"devDependencies": {
  "@types/angular": "^1.6.7",
  "@types/angular-ui-router": "^1.1.36",
  "@types/ui-grid": "^0.0.35",
  "@types/ui-select": "^0.13.28",
  "typescript": "^2.2.1"
}
~~~

## Documentation

- Angular `component()` (replacement for views and directives since Angular 1.5)
  - https://toddmotto.com/exploring-the-angular-1-5-component-method/
  - http://almerosteyn.com/2016/02/angular15-component-typescript
