import DBConnection from "../db/DBConnection";
import AppConfigUtil from "../config/AppConfigUtil";
import * as express from "express"
import MSAppInit from "./MSAppInit";
import * as http from "http"

import { MAPP as MICROSERVICE1 } from "my-micro-service";


DBConnection.connect(AppConfigUtil.get(`db:name`)).then(async () => {
    let app = express();
    let h = new http.Server(app);
    app.set('trust proxy', true);

    await MSAppInit.initMicroService(app);



    app.use('/graphql/my-micro-service',
        MICROSERVICE1);

    let port = AppConfigUtil.get("microapps:port")
    let server = h.listen(port, () => {
        console.log('server started at port', port)
        if (process.send) {
            process.send('online');
        }
    })
    MSAppInit.errorHandler(app);

}).catch((err) => {
    console.log('Microservice:mongo connection failed', err)
})


