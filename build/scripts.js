'use strict';

var controller ={};
var simpleWebDevTool = {};
simpleWebDevTool.controller = {};
simpleWebDevTool.views = {};
simpleWebDevTool.service = {};
simpleWebDevTool.dao = {};
simpleWebDevTool.util = {};

jQuery(function() {
// define a new Sammy.Application bound to the #main element selector
    var app = Sammy('#SimpleWebDevTool', function() {

        // define a 'get' route that will be triggered at '#/path'
        this.get('#/path', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template1')));
            controller = simpleWebDevTool.controller.pathController();
            controller.init();
        });

        this.get('#/path2', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('template2')));
            controller = simpleWebDevTool.controller.path2Controller();
            controller.init();
        });
        this.get('#/vue', function() {
            $('#template').html(_.template(simpleWebDevTool.util.render('vueTemplate')));
            controller = simpleWebDevTool.controller.vueController();
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
            var data = service.getData();
            $('#list').empty();
            _.forEach(data.data, function(elem){
                $('#list').append('<li>'+ elem + '</li>');
            });
            $('#text').text(data.refHtml);
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.pathController = function(){
    var controllerName = 'pathController';
    var service = simpleWebDevTool.service.pathService();

    tinymce.init({
        selector: 'h1.editable',
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    tinymce.init({
        selector: 'div.editable',
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });

    $('div.editable').keyup(function () {
        controller.refer();
    });

    return {
        add : function(){
            console.log('func1 ' + controllerName);
            var addStr = $('#sampleForm').val();
            service.add(addStr);
            controller.refresh();
            console.log('func1 done');
        },
        search : function(){
            console.log('search '  + controllerName);
            var searchStr = $('#sampleForm').val();
            service.search(searchStr);
            controller.refresh();
            console.log('search done');
        },
        init : function(){
            //simpleWebDevTool.util.countStart();
            console.log('init '  + controllerName);
            service.load();
            //simpleWebDevTool.util.timeShow();
        },
        refer : function(){
            var str = $('div.editable').html();
            service.refer(str);
            controller.refresh();
        },
        refresh : function() {
            var data = service.getData();
            $('#list').empty();
            _.forEach(data.data, function(elem){
                $('#list').append('<li>'+ elem + '</li>');
            });
            $('#text').text(data.refHtml);
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.controller.vueController = function(){
    var controllerName = 'vueController';
    var service = simpleWebDevTool.service.vueService();
    var vue = new Vue({
        el: '#template',
        data: {
            texts: ['# hello'],
            list: []
        }
    });

    tinymce.init({
        selector: 'h1.editable',
        inline: true,
        toolbar: 'undo redo',
        menubar: false
    });

    tinymce.init({
        selector: 'div.editable',
        inline: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });

    $('div.editable').keyup(function () {
        controller.refer();
    });

    return {
        add : function(){
            console.log('func1 ' + controllerName);
            var addStr = $('#sampleForm').val();
            service.add(addStr);
            controller.refresh();
            console.log('func1 done');
        },
        search : function(){
            console.log('search '  + controllerName);
            var searchStr = $('#sampleForm').val();
            service.search(searchStr);
            controller.refresh();
            console.log('search done');
        },
        init : function(){
            //simpleWebDevTool.util.countStart();
            console.log('init '  + controllerName);
            service.load();
            //simpleWebDevTool.util.timeShow();
        },
        refer : function(){
            var str = $('div.editable').html();
            service.refer(str);
            controller.refresh();
        },
        refresh : function() {
            var data = service.getData();
            vue.list = data.data;
            vue.texts = [data.refHtml];
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.path2Dao = function(){
    var daoName = 'path2Dao';

    return {
        load : function(serviceData){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', serviceData, controller.refresh);
        },
        save : function(serviceData, reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', serviceData, reqData, controller.refresh);
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.dao.pathDao = function(){
    var daoName = 'pathDao';

    return {
        load : function(serviceData){
            console.log('load '  + daoName);
            return simpleWebDevTool.util.getAjaxAsync('jsonApi/path/2', serviceData, controller.refresh);
        },
        save : function(serviceData, reqData){
            console.log('save '  + daoName);
            return simpleWebDevTool.util.putAjaxAsync('jsonApi/path/2', serviceData, reqData, controller.refresh);
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
            dao2.save(serviceData, data);
        },

        load : function(){
            console.log('load '  + serviceName);
            dao2.load(serviceData);
        },

        getData : function(){
            console.log('refresh '  + serviceName);
            return serviceData;
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
        add : function(addStr){
            console.log('func1 ' + serviceName);
            serviceData.data =  _.map(serviceData.data, function(num) { return num + Number(addStr); });
        },
        search : function(searchStr){
            console.log('func2 '  + serviceName);
            serviceData.str = searchStr;
            serviceData.data = _.filter(serviceData.data, function(num) { return num === Number(searchStr); });
        },

        load : function(){
            console.log('load '  + serviceName);
            dao.load(serviceData);
            console.log(serviceData);
        },

        refer : function(str){
            serviceData.refHtml = str + ' refer';
        },

        getData : function(){
            console.log('refresh '  + serviceName);
            return serviceData;
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.service.vueService = function(){
    var serviceName = 'vueService';
    var dao = simpleWebDevTool.dao.pathDao();
    var serviceData = {};

    return {
        add : function(addStr){
            console.log('func1 ' + serviceName);
            serviceData.data =  _.map(serviceData.data, function(num) { return num + Number(addStr); });
        },
        search : function(searchStr){
            console.log('func2 '  + serviceName);
            serviceData.str = searchStr;
            serviceData.data = _.filter(serviceData.data, function(num) { return num === Number(searchStr); });
        },

        load : function(){
            console.log('load '  + serviceName);
            dao.load(serviceData);
            console.log(serviceData);
        },

        refer : function(str){
            serviceData.refHtml = str + ' refer';
        },

        getData : function(){
            console.log('refresh '  + serviceName);
            return serviceData;
        }
    };
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.util.getAjaxAsync = function(url, serviceData, callback) {
    console.log('getAjaxAsync url:' + url);
    $.ajax({
        type: 'GET',
        url: url,
        async: true
    }).done(function(data) {
        console.log('success');
        console.log(data);
        //simpleWebDevTool.util.dummyWait(1000);
        serviceData.data = data;
        callback();
    }).fail(function() {
        console.error('error');
    });
};

simpleWebDevTool.util.putAjaxAsync = function(url, serviceData, reqData, callback) {
    console.log('putAjaxAsync url:' + url);
    $.ajax({
        type: 'POST',
        url: url,
        async: true,
        data: reqData
    }).done(function(data) {
        console.log('success');
        console.log(data);
        //simpleWebDevTool.util.dummyWait(1000);
        serviceData.data = data;
        callback();
    }).fail(function() {
        console.error(reqData);
    });
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

// this function is cache, you don't need to change
simpleWebDevTool.util.jsonCache = function(key) {
    var cache = [];
    if ( !cache[key] ) {
//        var tmplUrl = 'views/' + tmplName + '.html';
//        var tmplString;
//        $.ajax({
//            url: tmplUrl,
//            method: 'GET',
//            async: false,
//            dataType: 'html',
//            success: function(data) {
//                tmplString = data;
//            }
//        });
//        cache[key] = tmplString;
    }
    return cache[key];
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
};;/**
 * Created by shiba on 14/07/13.
 */

'use strict';

simpleWebDevTool.util.dummyWait = function(time) {
    var d1 = new Date().getTime();
    var d2 = new Date().getTime();
    while (d2 < d1 + time) {
        d2 = new Date().getTime();
    }
    return;
};

simpleWebDevTool.util.time = {};

simpleWebDevTool.util.countStart = function() {
    simpleWebDevTool.util.startTime = new Date().getTime();
    console.info('count start');
};

simpleWebDevTool.util.timeShow = function() {
    var now = new Date().getTime();
    console.info(now - simpleWebDevTool.util.startTime + ' ms');
};