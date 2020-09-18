import express from 'express'
import router_event from './controller/event_controller'
import access_log from "./helper/access_log";

const {Sequelize} = require('sequelize');

const app: express.Express = express()
const router: express.Router = express.Router()

// -----------------------------------
// CORSの許可
// -----------------------------------
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


// -----------------------------------
// body-parserに基づいた着信リクエストの解析
// -----------------------------------
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(access_log)


// -----------------------------------
// ルーティング
// -----------------------------------
app.use('/', router_event)
app.use(router)


// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: '../data/tsugoukun_development.sqlite3'
// });
//
// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     }).catch((error: any) => {
//     console.error('Unable to connect to the database:', error);
// })

// -----------------------------------
// 3000番ポートでAPIサーバ起動
// -----------------------------------
let NOW = new Date().toLocaleString();
console.log('-----------------------------------------')
console.log('NOW:' + NOW)
console.log('-----------------------------------------')

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})