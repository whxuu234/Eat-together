const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var food = require('./food.json');
const port = 10022;

app.use(express.static(__dirname + '/public'));//upload static files

app.use(bodyParser.json()); //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended : false})); //to support URL-encoded bodies

app.post('/post_data', function(req,res) {
    var x = req.body.meal;
    res.send('<h1>' + food[x] + '<h1>');
});

app.get("/ajax_data", function(req, res) {
    res.send('hello, ${' + req.query.fname + '} ${' + req.query.lname + '}');
});

var online_users = {};
var checkOnlineUsers = function() {
    for(i in online_users) {
        if( online_users[i] == 0 ) {
            delete online_users[i];
            console.log(i + ' offlined');
        } else {
            online_users[i]--;
        }
    }
};
setInterval( function() {
        checkOnlineUsers();
        console.log( Object.keys(online_users).length + ' users; ' );
        console.log( online_users );
}, 5000);

app.get("/iamonline", function(req, res) {
    online_users[req.query.username] = 5;
    res.send(JSON.stringify(online_users));
});

app.listen(port);
