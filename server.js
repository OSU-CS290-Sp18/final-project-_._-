const express = require('express');
const exphb = require('express-handlebars');

const airports = require('./data.json');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphb({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).render('airport', {airports: airports});
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
