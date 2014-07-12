// define a new Sammy.Application bound to the #main element selector
var app = Sammy('#main', function() {

    // define a 'get' route that will be triggered at '#/path'
    this.get('#/path', function() {
        // this context is a Sammy.EventContext
        console.log('dada');
    });

    this.get('#/path2', function() {
        // this context is a Sammy.EventContext
        console.log('dadadadadada');
    });
    this.get('#/path2/:id', function() {
        // this context is a Sammy.EventContext
        console.log(this.params["id"]);
    });
});
app.run();