({
    // appDir: './src/',
    baseUrl: 'src/js',
    dir: 'www/js/',
    mainConfigFile: 'src/js/main.js',
    modules: [
        {
            name: 'main',
            include: [
                'bootstrap',
                'app',
                'routes'
            ],
            out: 'bundle.js'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true
})
