module.exports = function (compound) {

    var express = require('express');
    var app = compound.app;

    var rwps = require('compound-passport');

    app.configure(function(){
        // init passport
        
        app.use(compound.assetsCompiler.init());
        app.use(express.static(app.root + '/public', {maxAge: 86400000}));
        app.set('view engine', 'ejs');
        app.set('view options', {complexNames: true});
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        app.use(express.session({secret: 'secret'}));
        app.use(express.methodOverride());

        rwps.init(compound);
        // hook up user model
        compound.on('models loaded', function(){
            User = compound.models.User;
            rwps.loadUser(User);
        });

        app.use(app.router);
        
    });

};
