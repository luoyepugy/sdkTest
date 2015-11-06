
requirejs.config({
    paths: {
　　　　　　  underscore: "../lib/underscore/underscore.min",
　　　　　　  zepto: "../lib/zepto/zepto.min",
        angular: "../lib/ionic/js/ionic.bundle",
        domReady: "../lib/requirejs-domready/domReady",
        cordova: '../lib/cordova/cordova.android',
        ngCordova: '../lib/ngCordova/dist/ng-cordova.min',
        app: './app',
        routes: './routes'
　　　　},
    shim: {
　　　　　　  underscore: {
　　　　　　　　    exports: '_'
　　　　　　  },
        angular: {
            exports: 'angular'
        },
        zepto: {
            exports: '$'
        },
        ngCordova: {
            deps: ['cordova'],
            exports: 'ngCordova'
        }
    },
    deps: ['./bootstrap']
});
