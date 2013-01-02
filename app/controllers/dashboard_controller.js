load('application');

skipBefore("auth",{only:["index", "status"]});

action(function index() {
    this.title = 'Home';
    render();
});