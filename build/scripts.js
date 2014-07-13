'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};

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
    var service = simpleWebDevTool.service.path2Service();

    return {
        func1 : function(){
            console.log('func1 ' + controllerName);
            service.func1();
            console.log('func1 done');
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            service.func2();
            console.log('func2 done');
        },
        func3 : function(){
            var uiData = [1, 3];
            console.log('func3 '  + controllerName);
            service.save(uiData);
            console.log('func3 done');
        },
        init : function(){
            console.log('init '  + controllerName);
            service.load();
            console.log('init done');
        },
        refresh : function() {
            console.log('refresh '  + controllerName);
            var res = service.refresh();
            $('#template').html(_.template(simpleWebDevTool.util.render('template2'), { 'people': res}));
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.pathController = function(){
    var controllerName = 'pathController';
    var service = simpleWebDevTool.service.pathService();

    return {
        func1 : function(){
            console.log('func1 ' + controllerName);
            service.func1();
            console.log('func1 done');
        },

        func2 : function(){
            console.log('func2 '  + controllerName);
            service.func2();
            console.log('func2 done');
        },
        init : function(){
            console.log('init '  + controllerName);
            service.load();
        },
        refresh : function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1'), { 'people': service.refresh()}));
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.path2Dao = function(){
    var daoName = 'path2Dao';

    return {
        load : function(){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', controller.refresh);
        },
        save : function(reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.pathDao = function(){
    var daoName = 'pathDao';

    return {
        load : function(){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', controller.refresh);
        },
        save : function(reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', reqData, controller.refresh);
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
    var dao2 = simpleWebDevTool.dao.path2Dao();
    var serviceData = {};

    return {
        func1 : function(){
            console.log('func1 ' + serviceName);
            serviceData.data = _.map(serviceData.data, function(num) { return num + 1; });
            controller.refresh();
        },

        func2 : function(){
            console.log('func2 '  + serviceName);
            serviceData.data = _.filter(serviceData.data, function(num) { return num % 2 === 0; });
            controller.refresh();
        },
        save : function(data){
            console.log('save '  + serviceName);
            serviceData = dao2.save(data);
        },

        load : function(){
            console.log('load '  + serviceName);
            serviceData = dao2.load();
        },

        refresh : function(){
            console.log('refresh '  + serviceName);
            return serviceData.data;
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.pathService = function(){
    var serviceName = 'pathService';
    var dao = simpleWebDevTool.dao.pathDao();
    var serviceData = {};

    return {
        func1 : function(){
            console.log('func1 ' + serviceName);
            serviceData.load =  _.map(serviceData.load, function(num) { return num - 1; });
            controller.refresh();
        },

        func2 : function(){
            console.log('func2 '  + serviceName);
            serviceData.load = _.filter(serviceData.load, function(num) { return num % 2 === 1; });
            controller.refresh();
        },

        load : function(){
            console.log('load '  + serviceName);
            serviceData = dao.load();
            console.log(serviceData);
        },

        refresh : function(){
            console.log('refresh '  + serviceName);
            return serviceData.load;
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.util.getAjaxAsync = function(url, callback) {
    console.log('getAjaxAsync url:' + url);
    var resData = {};
    $.ajax({
        type: 'GET',
        url: url,
        async: true
    }).done(function(data) {
        console.log('success');
        console.log(data);
        simpleWebDevTool.util.dummyWait(1000);
        resData.data = data;
        callback();
    }).fail(function() {
        console.error('error');
    });
    return resData;
};

simpleWebDevTool.util.putAjaxAsync = function(url, reqData, callback) {
    console.log('putAjaxAsync url:' + url);
    var resData = {};
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    }).done(function(data) {
        console.log('success');
        console.log(data);
        simpleWebDevTool.util.dummyWait(1000);
        resData.data = data;
        callback();
    }).fail(function() {
        console.error(reqData);
    });
    return resData;
};

simpleWebDevTool.util.dummyWait = function(time) {
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while (d2 < d1 + time) {
        d2 = new Date().getTime();
    }
    return;
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

// this function is cache, you don't need to change
simpleWebDevTool.util.render = function(tmplName) {
    var tmplCache = [];
    if ( ! tmplCache[tmplName] ) {
        var tmplUrl = 'views/' + tmplName + '.html';
        var tmplString;
        $.ajax({
            url: tmplUrl,
            method: 'GET',
            async: false,
            dataType: 'html',
            success: function(data) {
                tmplString = data;
            }
        });
        tmplCache[tmplName] = tmplString;
    }
    return tmplCache[tmplName];
};