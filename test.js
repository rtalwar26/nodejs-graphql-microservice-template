"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intern_1 = require("intern");
const fs = require("fs");
const path = require("path");
const express = require("express");
const http = require("http");
const WSApp_1 = require("./src/ws-server/WSApp");
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'intern.json'), 'utf8'));
let serveOnly = process.argv.includes('serveOnly');
config.serveOnly = serveOnly;
(!serveOnly) && (config.reporters = 'runner');
intern_1.default.configure(config);
intern_1.default.on('log', (a) => {
    console.log(a);
});
const webSocketsServerPort = 8888;
let app = express();
let h = new http.Server(app);
WSApp_1.default.init(h).then(io => {
    h.listen(webSocketsServerPort, function () {
        console.log((new Date()) + " Server is listening on port "
            + webSocketsServerPort);
        serveOnly && console.log('http://localhost:9093/__intern/');
        intern_1.default.run().then(() => {
            console.log('finished');
            io.close();
        });
    });
});
