simpleWebDevTool
================


## setup

1. `npm install`
2. `cd app`
3. `bower install`
4. `cd ../`

### check

* `grunt server` -> server start and proxy connected
* `grunt` -> test and build

trouble:

* `Warning: watch ENOSPC` -> watch range is over, 
do the command `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc


## structure

### environment

* bower -> package manager
* grunt -> task runner

### Global object:

* controller -> 
* simpleWebDevTool -> stock controller & service & dao & util

#### library

* -> jQuery

### route

app/appRoute.js

dispatch controller and template by url(with hash)

#### library

* -> Sammy.js http://sammyjs.org/
* crossRoad.js
* director.js https://github.com/flatiron/director
* jQuery router https://github.com/camme/jquery-router-plugin
* jQuery-router https://github.com/tanabe/jQuery-Router

### template

attach template_html to the marker( like `<div id="template"></div>`)

#### library

* -> lodash

### controller-views

bind all action and data to controller & view

#### library

* -> jQuery
* vue.js
* 

### Dao

get json data from server or browser-storage

#### library

* -> jQuery

### service

calculate view-data from dao(json-data), controller(action)

#### library

* -> lodash

### test

simple Unit test

#### library

* -> QUnit

