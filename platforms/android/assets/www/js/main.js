
requirejs.config({
    paths: {
　　　　　　  "underscore": "../lib/underscore/underscore.min",
　　　　　　  "zepto": "../lib/zepto/zepto.min",
        "angular": "../lib/ionic/js/ionic.bundle",
        'app': './app',
        'routes': './routes',
        'angular-route': '../lib/angular-route/angular-route'
　　　　},
    shim: {
　　　　　　  'underscore': {
　　　　　　　　    exports: '_'
　　　　　　  },
        'angular': {
            exports: 'angular'
        },
        'zepto': {
            exports: '$'
        },
        'angular-route': {
            exports: 'angular-route',
            deps: ['angular']
        }
    },
    deps: ['./bootstrap']
});
