const express = require('express');
const app = express();
const session = require('express-session');


const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('static'));

app.use(session({
    secret: 'hbjas6GHJ=3nla8HsffGFDFST6fsfa662!%%/=gchcasvd1343457',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Load routing
require('./route/index')(app);

var server = app.listen(3000, function () {
    console.log("On :3000")
});