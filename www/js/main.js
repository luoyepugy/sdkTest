
requirejs.config({
    paths: {
　　　　　　  "underscore": "../lib/underscore/underscore.min",
　　　　　　  "zepto": "../lib/zepto/zepto.min",
        "angular": "../lib/ionic/js/ionic.bundle",
        'app': './app',
        'routes': './routes'
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
        }
    },
    deps: ['./bootstrap']
});
