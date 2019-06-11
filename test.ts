import intern from "intern";
import * as fs from 'fs';
import * as path from 'path';
import * as express from "express"
import * as http from "http"
import WSApp from './src/ws-server/WSApp';



let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'intern.json'), 'utf8'));
let serveOnly = (process.argv as string[]).includes('serveOnly');
config.serveOnly = serveOnly;
(!serveOnly) && (config.reporters = 'runner');
intern.configure(config);
intern.on('log', (a) => {
    console.log(a);
})
const webSocketsServerPort = 8888;
let app = express();
let h = new http.Server(app);
WSApp.init(h).then(io=>{
    h.listen(webSocketsServerPort, function () {
        console.log((new Date()) + " Server is listening on port "
            + webSocketsServerPort);       
    
 serveOnly && console.log('http://localhost:9093/__intern/');

    intern.run().then(() => {
        console.log('finished');            
        io.close();
    });

    });
    
});


