before('protect from forgery', function () {
    protectFromForgery('171a699341aa0c5cc80ae6d006b2fdf53a0df318');
});


before("auth", function requireManager() {
    if (!session.passport.user) {
        req.session.redirect = req.path;
        redirect('/auth/facebook');
    } else {
        User.find(session.passport.user, function (err, user) {
            if (user) {
                req.user = user;
                next();
            } else {
                flash('error', 'You have no permission to access this area');
                redirect('/');
            }
        });
    }
});
