
requirejs.config({
    baseUrl: './js/',
    paths: {
　　　　　　  underscore: "lib/underscore/underscore-min",
　　　　　　  zepto: "lib/zepto/zepto.min",
        angular: "lib/ionic/js/ionic.bundle",
        domReady: "lib/requirejs-domready/domReady",
        ngCordova: 'lib/ngCordova/dist/ng-cordova.min',
        cordova: '../cordova'
　　　　},
    shim: {
        angular: {
            exports: 'angular'
        },
        zepto: {
            exports: '$'
        },
        ngCordova: {
            deps: ['angular'],
            exports: 'ngCordova'
        },
        cordova: {
            deps: ['ngCordova'],
            exports: 'cordova'
        }
    },
    deps: ['./bootstrap']
});
