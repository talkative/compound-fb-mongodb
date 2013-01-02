load('application');

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New user';
    this.user = new User;
    render();
});

action(function create() {
    User.create(req.body.User, function (err, user) {
        if (err) {
            flash('error', 'User can not be created');
            render('new', {
                user: user,
                title: 'New user'
            });
        } else {
            flash('info', 'User created');
            redirect(path_to.users());
        }
    });
});

action(function index() {
    this.title = 'Users index';
    User.all(function (err, users) {
        switch(params.format) {
            case "json":
                send(users);
                break;
            default:
                render({
                    users: users
                });
        }
    });
});

action(function show() {
    this.title = 'User show';
    switch(params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'User edit';
    switch(params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});

action(function update() {
    this.user.updateAttributes(body.User, function (err) {
        if (!err) {
            flash('info', 'User updated');
            redirect(path_to.user(this.user));
        } else {
            flash('error', 'User can not be updated');
            this.title = 'Edit user details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.user.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy user');
        } else {
            flash('info', 'User successfully removed');
        }
        send("'" + path_to.users() + "'");
    });
});

function loadUser() {
    User.find(params.id, function (err, user) {
        if (err || !user) {
            redirect(path_to.users());
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}
