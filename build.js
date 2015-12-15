({
    // appDir: './src/',
    baseUrl: 'www/js/',
    dir: 'www/bundle/',
    mainConfigFile: 'www/js/main.js',
    modules: [
        {
            name: 'main',
            include: [
                'bootstrap',
                'app',
                'routes',
		'config'
            ],
            out: 'main.js'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true
})
