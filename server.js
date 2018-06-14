const path = require('path');
const express = require('express');
const exphb = require('express-handlebars');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const mongoHost = "classmongo.engr.oregonstate.edu";
const mongoPort = 27017;
const mongoUser = "cs290_shieldse";
const mongoPassword = "cs290_shieldse";
const mongoDBName = "cs290_shieldse";

const mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' +
    mongoHost + ':' + mongoPort + '/' + mongoDBName;

let mongoDB = null;

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphb({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    routes = mongoDB.collection('routes').find({});
    coords = mongoDB.collection('coords').find({});
    watchlist = mongoDB.collection('watchlist').find({});

    watchlist.toArray((err, docs) => {
        if (err) {
            res.status(500).send("Error fetching watchlist from DB.");
        } else {
            res.status(200);
            console.log(JSON.stringify(docs));
        }
    });

    routes.toArray((err, routeDocs) => {
        if (err) {
            res.status(500).send("Error fetching routes from DB.");
        } else {
            coords.toArray((err, coordsDocs) => {
                if (err) {
                    res.status(500).send("Error fetching routes from DB.");
                } else {
                    res.status(200).render('airport', {
                        routes: routeDocs,
                        routesString: JSON.stringify(routeDocs),
                        coordsString: JSON.stringify(coordsDocs)
                    });
                }
            });
        }
    });
});

app.post('/add/:iata', (req, res, next) => {
    const iata = req.params.iata;
    if (req.body && req.body.iata && req.body.coords) {
        const airport = {
            iata: req.body.iata,
            coords: req.body.coords
        };
        mongoDB.collection('watchlist').insertOne(airport, (err, result) => {
            if (err) {
                res.status(500).send('Error inserting airport into DB.')
            } else {
                res.status(200).end();
            }
        });
    } else {
        res.status(400).send('Request needs a JSON body with iata and coords');
    }
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});

MongoClient.connect(mongoURL, (e, client) => {
    if (e) throw e;
    mongoDB = client.db(mongoDBName);
    app.listen(port, () => {
        console.log("== Server listening on port 3000");
    });
});
