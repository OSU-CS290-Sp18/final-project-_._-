const express = require('express');
const exphb = require('exphb');

const routes = require('data.json');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphb({defaultLayout: 'layoutTemplate'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/airports/:n', (req, res) => {
    var airport = req.params.n;
    if (routes[airport]) {
        res.status(200).render('airport', {data: routes[airport]});
    } else {
        res.status(404).render('404');
    }
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});
