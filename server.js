var express = require('express');
const cors = require('cors');
var api = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');

api.use(bodyParser.json({ type: 'application/json' }));
api.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'diseasesmapadmin',
    password: 'diseasesmap',
    database: 'diseasesmapdb'
})
var portN = 4569
var server = api.listen(portN, function () {
    var host = server.address().address
    var port = server.address().port
})

api.use(cors());
con.connect(function (error) {
    if (error) console.log(error);
    else console.log('server is listening on port ' + portN + '(http://localhost:/' + portN + ')');
})

api.get('/users', function (req, res) {
    con.query('SELECT * FROM diseasesmapdb.server_usuarios;', function (error, rows, fields) {
        if (error) console.log(error);
        else {
            //console.log(rows)
            res.send(rows)
        }
    })
})
api.get('/diseasesInRange', function (req, res) {
    console.log('propriedades abaixo:')
    console.log(req.query)
    var latitude = Number(req.query.latitude);
    var longitude = Number(req.query.longitude);
    var km = Math.max(Number(req.query.km),7);
    var signalLat = 1;
    var signalLon = 1;
    if (latitude < 0) signalLat = -1;
    if (longitude < 0) signalLon = -1;
    var deltaCord = km/111.11;
    latitudemin = signalLat ? latitude - deltaCord : latitude + deltaCord;
    latitudemax = signalLat ? latitude + deltaCord : latitude - deltaCord;
    longitudemin = signalLon ? longitude - deltaCord : longitude + deltaCord;
    longitudemax = signalLon ? longitude + deltaCord : longitude - deltaCord;
    latitudemin = Number(latitudemin).toFixed(4)
    latitudemax = Number(latitudemax).toFixed(4)
    longitudemin = Number(longitudemin).toFixed(4)
    longitudemax = Number(longitudemax).toFixed(4)

    con.query(`WITH citiesInRange as (SELECT nome, id FROM diseasesmapdb.server_localidades
        WHERE latitude BETWEEN ${latitudemin} AND ${latitudemax}
        AND longitude BETWEEN ${longitudemin} AND ${longitudemax}),
        casesInRange AS (SELECT  * FROM  diseasesmapdb.server_notificacoes WHERE idmunicipio_id in (select id from citiesInRange))
        SELECT nome, nomedoenca_id, SUM(casos) AS casosTotal FROM casesInRange, citiesInRange
         where (casesInRange.idmunicipio_id = citiesInRange.id) group by nome, nomedoenca_id order by casosTotal desc;`, function (error, rows, fields) {
        if (error) console.log(error);
        else {
            res.send(rows)
        }
    })
})
api.get('/currentCity', function (req, res) {
    console.log('propriedades abaixo:')
    console.log(req.query)
    var latitude = Number(req.query.latitude);
    var longitude = Number(req.query.longitude);
    var tolerance = 1;
    var signalLat = 1;
    var signalLon = 1;
    if (latitude < 0) signalLat = -1;
    if (longitude < 0) signalLon = -1;
    var latitudemin = signalLat ? latitude - tolerance : latitude + tolerance;
    var latitudemax = signalLat ? latitude + tolerance : latitude - tolerance;
    var longitudemin = signalLon ? longitude - tolerance : longitude + tolerance;
    var longitudemax = signalLon ? longitude + tolerance : longitude - tolerance;

    con.query(`WITH proximos as (SELECT * FROM diseasesmapdb.server_localidades 
        WHERE longitude BETWEEN ${longitudemin} AND ${longitudemax}
        AND latitude BETWEEN ${latitudemin} AND ${latitudemax})
        SELECT nome, POWER(abs(latitude) - abs(${latitude}),2) + POWER(abs(longitude) - abs(${longitude}),2) as dist
        FROM proximos
        ORDER BY dist LIMIT 1;`, function (error, rows, fields) {
        if (error) console.log(error);
        else {
            //console.log("retorno do server:")
            //console.log(rows)
            res.send(rows)
        }
    })
})

api.get('/notInRange', function (req, res) {
    console.log('propriedades abaixo:')
    console.log(req.query)
    var latitude = Number(req.query.latitude);
    var longitude = Number(req.query.longitude);
    var km = Math.max(Number(req.query.km),7);
    var signalLat = 1;
    var signalLon = 1;
    if (latitude < 0) signalLat = -1;
    if (longitude < 0) signalLon = -1;
    var deltaCord = km/111.11;
    latitudemin = signalLat ? latitude - deltaCord : latitude + deltaCord;
    latitudemax = signalLat ? latitude + deltaCord : latitude - deltaCord;
    longitudemin = signalLon ? longitude - deltaCord : longitude + deltaCord;
    longitudemax = signalLon ? longitude + deltaCord : longitude - deltaCord;
    latitudemin = Number(latitudemin).toFixed(4)
    latitudemax = Number(latitudemax).toFixed(4)
    longitudemin = Number(longitudemin).toFixed(4)
    longitudemax = Number(longitudemax).toFixed(4)

    con.query(`WITH citiesInRange as (SELECT * FROM diseasesmapdb.server_localidades 
        WHERE latitude BETWEEN ${latitudemin} AND ${latitudemax}
        AND longitude BETWEEN ${longitudemin} AND ${longitudemax})
        SELECT nome, casos, nomedoenca_id, latitude, longitude FROM diseasesmapdb.server_notificacoes,  citiesInRange
        WHERE diseasesmapdb.server_notificacoes.idmunicipio_id = citiesInRange.id  ;`, function (error, rows, fields) {
        if (error) console.log(error);
        else {
            res.send(rows)
        }
    })
})
