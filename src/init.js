requirejs.config({
    baseUrl: 'src',
    paths: {
        //
    }
});

require(['main',], function(Main){
    new Main();
});