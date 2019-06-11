

const { describe, it, before, after } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
const webSocketsServerPort = 8888;
const test_suit = `WS_Connection_open`
const io = require('socket.io-client');
describe(test_suit, () => {

    var connection_url = `http://localhost:${webSocketsServerPort}/`;
    before(() => {

    })
    it(`Initialize ws client`, () => {
        return new Promise((resolve, reject) => {
            const socket = io(connection_url);
            socket.on('connect', () => {
                socket.close();
                resolve();
              });            
            socket.on('error', (error) => {
                
                socket.close();
                reject(error);
              });           
        })

    }) 

    it(`test health`, () => {
        return new Promise((resolve, reject) => {
            const socket = io(connection_url);
            socket.on('connect', () => {

                socket.on('health',(msg)=>{
                    msg != 'ok' ? reject(new Error(`Health :${msg}`)) : resolve();
                    socket.close();
                })
                socket.emit('health','any');
                
              });            
            socket.on('error', (error) => {
                socket.close();
                reject(error);
              });           
        })

    })
    after(() => {

    })
});