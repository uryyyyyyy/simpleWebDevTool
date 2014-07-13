'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};

// this function is cache, you don't need to change
simpleWebDevTool.views._render = function(tmpl_name) {
    var tmpl_cache = [];
    if ( ! tmpl_cache[tmpl_name] ) {
        var tmpl_url = 'views/' + tmpl_name + '.html';
        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            dataType: "html",
            success: function(data) {
                tmpl_string = data;
            }
        });
        tmpl_cache[tmpl_name] = tmpl_string;
    }
    return tmpl_cache[tmpl_name];
}

jQuery(function($) {
// define a new Sammy.Application bound to the #main element selector
    var app = Sammy('#SimpleWebDevTool', function() {

        // define a 'get' route that will be triggered at '#/path'
        this.get('#/path', function() {
            controller = simpleWebDevTool.controller.pathController();
            controller.init();
        });

        this.get('#/path2', function() {
            controller = simpleWebDevTool.controller.path2Controller();
            controller.init();
        });
        this.get('#/path2/:id', function() {
            // this context is a Sammy.EventContext
            console.log(this.params.id);
        });






    });
    app.run();
});
;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.path2Controller = function(){
    var controllerName = 'path2Controller';
    var controllerData = {};
    var service = simpleWebDevTool.service.path2Service();
    var refresh = function() {
        $('#template').html(_.template(simpleWebDevTool.views._render('template2'), { 'people': controllerData}));
    };

    return {
        func1 : function(){
            console.log('func1 ' + controllerName);
            controllerData = service.func1(controllerData);
            refresh();
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            controllerData = service.func2(controllerData);
            refresh();
        },
        init : function(){
            console.log('init '  + controllerName);
            controllerData = service.load();
            refresh();
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.pathController = function(){
    var controllerName = 'pathController';
    var controllerData = {};
    var service = simpleWebDevTool.service.pathService();
    var refresh = function() {
        $('#template').html(_.template(simpleWebDevTool.views._render('template1'), { 'people': controllerData}));
    };

    return {
        func1 : function(){
        console.log('func1 ' + controllerName);
        controllerData = service.func1(controllerData);
        refresh();
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            controllerData = service.func2(controllerData);
            refresh();
        },
        init : function(){
            console.log('init '  + controllerName);
            controllerData = service.load();
            refresh();
        }
    };
};;'use strict';

/**
 * InfoWinow オブジェクトをストックするクラス。
 * 
 */
var InfoWindowStock = function() {
	/**
	 * InfoWindow をストックするハッシュ。
	 * @type {Array}
	 */
	this.stock = [];
};
InfoWindowStock.prototype = {
	/**
	 * ストックする InfoWindow のキーを生成する。
	 * 
	 * @param  {Object} location 緯度・経度を格納したオブジェクト
	 * @return {String} 生成したキー
	 */
	createKey: function(location) {
		var key = location.k + ':' + location.A;
		return key;
	},
	/**
	 * InfoWindow をストックする。
	 * 
	 * @param  {Object} location 緯度・経度を格納したオブジェクト
	 * @param  {Object} infoWindow ストックする InfoWindow オブジェクト
	 */
	put: function(location, infoWindow) {
		var key = this.createKey(location);
		this.stock[key] = infoWindow;
	},
	/**
	 * ストックしてある InfoWindow から該当するものを取得する。
	 * 
	 * @param  {Object} location 緯度・経度を格納したオブジェクト
	 * @return {Object} ストックしてあった InfoWindow オブジェクト
	 */
	get: function(location) {
		var key = this.createKey(location);
		return this.stock[key];
	}
};
;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.path2Service = function(){
    var serviceName = 'path2Service';

    return {
        func1 : function(data){
            console.log('func1 ' + serviceName);
            return  _.map(data, function(num) { return num + 1; });
        },

        func2 : function(data){
            console.log('func2 '  + serviceName);
            return  _.map(data, function(num) { return num + 2; });
        },

        load : function(){
            console.log('load '  + serviceName);
            return  _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 === 1; });
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.pathService = function(){
    var serviceName = 'pathService';

    return {
        func1 : function(data){
            console.log('func1 ' + serviceName);
            return  _.map(data, function(num) { return num - 1; });
        },

        func2 : function(data){
            console.log('func2 '  + serviceName);
            return  _.map(data, function(num) { return num * 2; });
        },

        load : function(){
            console.log('load '  + serviceName);
            return  _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 === 0; });
        }
    };
};