const http = require('http');

const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const compression = require("compression");

const config = require('./config');
const router = require('./routes');

class App {

    constructor() {

        this._app = express();

        this._configureMiddleware();

        // this._auth();

        this._addRoutes();

        this._launch();
    }

    _configureMiddleware() {

        this._app.use(compression());
        this._app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }));
        this._app.set("port", config.get('listenPort'));
        this._app.use(logger("dev"));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));

        // this._app.use(function (err, req, res, next) {
        //     if (err.name === 'UnauthorizedError') {
        //         res.send({
        //             code: 101,
        //             msg: '请登录'
        //         });
        //     }
        // });
    }

    _auth() {

        const jwtAuth = expressJwt({
            secret: mainConf.jwt_secret,
            credentialsRequired: true,
            getToken: function fromBody(req) {
                if (req.body && req.body.token) {
                    return req.body.token;
                }
                return null;
            }
        }).unless({
            path: ['/login']
        });
        app.use(jwtAuth);

        app.use(function (req, res, next) {
            const token = req.body.token;

            if (!token) {
                next();
            } else {
                jwt.verify(token, mainConf.jwt_secret, (err, decoded) => {
                    if (err) {
                        res.json({ code: 101, tips: '无效的token.' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
        });
    }

    _addRoutes() {
        this._app.use("/", router);
    }

    _launch() {

        const server = http.createServer(this._app);

        const port = this._app.get("port");

        server.listen(port);

        server.on('error', error => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

    }

}

module.exports = App;
