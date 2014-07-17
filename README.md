simpleWebDevTool
================


## setup

1. `npm install`
2. `cd app`
3. `bower install`
4. `cd ../`

### check

* `grunt server` -> launch normal-server and jsonAPI-server (via proxy)
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


## Comparison with JS-Frameworks

### AngularJS

フルスタックなMVVMフレームワーク

* Data-binding
* Test環境の充実（DI, Karma）
* Filter sort ng-repeat
* watch（データの変更監視）
* routing ajax
* validation
* Mobile レスポンシブ対応（？）

とか備えている。2.0系の開発が続いていて、化けるかもしれない。

・メリット
裏でよろしくやってくれる。
DOMを意識しなくていい。
世界的に人気が高い。

・デメリット
学習コストが高い。
ComponentをAngular仕様にする（Directiveを定義する）が難しい。
他のライブラリや設計を取り入れづらい。
そんなにいらない。

・感想
裏でよろしく動きすぎていて、eventやデータ変更が把握しきれない。
（watchとかfilterとか、手を加えようとすると鬼門。）
学習コストの割に楽になる気がしない。
Angularにロックインされる。
（Data-bindingだけしたければVue.js使え）


### BackBone.js

ひと通り揃っている。かつ軽量。
「大規模開発向け」と言われている。

・メリット
ある程度の書き方が強制される分、スパゲッティになりにくい（らしい）
日本語の資料が充実している。利用実績が多い。
記述量が減る。

・デメリット
書き方を強制される。
Controllerを介しない、状態監視でイベント発火したりするため、eventを追いにくいかも。

・感想
普通に便利だが、全部は要らないと思う（CollectionとかModelとかは代替可能。）
DOM操作とかはノータッチなのでｊQueryには依存する。
一部だけ導入できるならアリ（router, eventHandler）。差し替えてもいいかも。
学習コスト低め。


### Knockout.js

MVVMフレームワークと言われているが、ただのライブラリ
ModelとDOMとを自動で同期させる。
（Angularのデータバインディング・Vue.jsと同じような感じ）

・メリット
* View（DOM）の操作とJavaScriptの操作を切り離せる。
* idやclassの指定をしなくて済む。

・デメリット
* 人気ない。
* 特徴薄い。

・感想
Vue.jsでいいじゃん。


### ｊQueryそのまま

フレームワークとは違うけども。。。

・メリット
* 理解しやすい（みんなもうｊQuery慣れてるでしょ？）
* 依存が少ない。
* やっぱりｊQueryプラグインが多いのは魅力。

・デメリット
* 記述量が多い
* スパゲッティ化する。
* id classでDOMが汚れる。

・感想
ｊQueryでDOMの操作とajax通信とか配列の処理とか一度にさせるからでは？
使うべきでないメソッドを切ればいいのでは（カスタムビルド）。
どうせどのフレームワークでも使うことになるんでしょ？


### 全体の感想。

* 記述量は多い。
* フレームワークに関することなど、新しい知識はつかない。
* コーディングルールが徹底していれば、構造は保たれる。
* 裏側でよろしくやる処理（data-binding, Ajax通信）がないので理解しやすい。
* 学習コスト少ない。（既存の4-layerに似せてるつもり。依存はjquery、lodashくらい）
* 他へ移植可能（view-controllerをVue.js・Closureへ。）
* underscore.jsよりlodashの方が便利（速度も良いらしいけど計測していない。）
* backBoneの便利な関数や概念は取り入れてもいいかも。
* Yagni原則（必要な分だけ用意する。ただし自分で書かなければいけない）


## Design principle

上記のフレームワークと比べて。

* 記述量は多い。
* フレームワークに関することなど、新しい知識はつかない。
* コーディングルールが徹底していれば、構造は保たれる。
* 裏側でよろしくやる処理（data-binding, Ajax通信）がないので理解しやすい。
* 学習コスト少ない。（既存の4-layerに似せてるつもり。依存はjquery、lodashくらい）
* 他へ移植可能（view-controllerをVue.js・Closureへ。）
* underscore.jsよりlodashの方が便利（速度も良いらしいけど計測していない。）
* backBoneの便利な関数や概念は取り入れてもいいかも。
* YAGNI（ただし自分で書かなければいけない）
* Angularと比べて、Viewのダイナミックな変更（filter, DOM間のデータ同期）は弱いが、そんなに使わないでしょ？

## 設計思想

### 冗長でもわかりやすく。

ちょっと手間がかかるが、理解しやすくして、
潜在バグ・不可解な動き、をなくす。

処理の最適化などは行っていないけど、
DOM操作以外はボトルネックにならないだろうとして、
多少冗長でも丁寧に書く。（JSの罠はlodashで回避）

DOMの描画が遅い場合は、Componentの記述だけ書き直す。

### Single-Page-Application

サーバーとクライアントを分離させ、Playテンプレートなどに依存しない。
行うのはJsonのやりとりのみ。
scriptの再読み込みが発生しないため、軽い。

後述するが、状態を持たないのでカオスになりにくいハズ。


### ライブラリ依存を減らす。

フレームワークを使うと、ロックインされ変更に弱くなる。
ライブラリ依存をしまくると、重くなる・依存関係の衝突、が起きうる。
また、いずれも学習コストがかかる（かつ移り変わりが激しく、コスパは微妙。）

なので、依存はjQuery、Lodashくらい。
ただし、自分で書く量は増える。
（DOM操作以外は難しいことやらないようにすれば問題ないかと。）


### 変更可能。

以上から、なるべく変更可能になっているため、

* 良いコンポーネント（ｊQueryプラグイン、Polymer、独自のものなど）を取り入れたい。
* データバインディング（Vue.js, knockout.js）を使ってみたい。

などに対応できるようにする。

### 裏でよろしくやらない。明示的に書く。
rubyみたく、String値でプロパティ指定とかやるとカオスになるので避ける。
ｊQueryプラグインなどで仕方ない場合はComponent内でだけ操作して、他では純粋なデータのみ扱う。

## プログラム構成

* Controller
* Service
* Component
* DAO

基本的には、
ユーザーが操作→Componentイベント発火→Controllerで必要なデータを受ける
→Serviceで演算する(→DaoでServer通信)→Controllerにデータを返す
→Componentにデータを割りあてる→変更があれば再描画。

### Controller

ページごとに一つ割り当てられる。
そのページで使うコンポーネント・イベントは全てここに記載する。
Serviceに処理を投げてComponentにデータを返す。

### Model(data)
特に管理しない。（状態を保持しない）
必要があればComponent（DOM）やDAOから取ってくる。

### Service

DOMやデータ処理を担う。

生JSを触るとめんどくさそうなので、lodashのメソッドを多用する。
ここの処理はボトルネックになりにくいので、わかりやすい記述を意識する。

### Component

DOMのデータ反映・取得を担う。ｊQueryは基本ココでだけ使う。
Component内で閉じないEventは全てControllerに上げる。

### DAO

外部（サーバー）との通信を担う。
同期の場合はLoadでそのまま表示させる。
非同期の場合は、Loadしたデータはキャッシュに入れておいて後でgetするのが簡単。
（ただしLoadしたデータは変更しない。）

### View

Routingした後に割り当てるHTML。
今はlodashのテンプレートで表示している（ｊQueryでも可。）

Idを振った箱を用意しておくだけでいい。
（後はControllerがComponentを設置する）


## 開発環境

### bower
パッケージ管理ツール。mavenみたいな。
基本、ライブラリはこれを使って落としてくる。
もし既存の依存関係とぶつかるのであれば既存のを優先する（ｊQueryのバージョンとか。）


### grunt ビルド

ひと通りのテストとminifyなどのビルド作業をやってくれる。

### grunt server

PlayのDevモードに相当する。
サーバーサイド不要で、minify前のJSなどで簡単に動作させられる。
また、APIサーバーを立ち上げてproxyかましているので、
Ajax通信を模した開発を行える。



## TODO

* tab sample (or data-cache across the pages)
* speed test(view rendering)
* BackBone routing