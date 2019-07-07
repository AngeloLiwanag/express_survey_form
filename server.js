var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000},
}))
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// localhost:8000 --- Index Page
app.get("/", function(request, response){
    response.render("index");
});

app.post("/info", function(request, response){
    console.log("Data information", request.body);
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comments = request.body.comments;
    response.redirect("/result");
});

// localhost:8000/result --- Result Page
app.get("/result", function(request, response){
    var name = request.session.name;
    var location = request.session.location;
    var language = request.session.language;
    var comments = request.session.comments;
    response.render("result", request.session);
})

app.listen(8000, function(){
    console.log("listening on port 8000");
});