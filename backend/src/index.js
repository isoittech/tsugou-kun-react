"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var moyooshi_controller_1 = __importDefault(require("./controller/moyooshi_controller"));
var access_log_1 = __importDefault(require("./helper/access_log"));
var app = express_1.default();
var router = express_1.default.Router();
// -----------------------------------
// CORSの許可
// -----------------------------------
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
// -----------------------------------
// body-parserに基づいた着信リクエストの解析
// -----------------------------------
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(access_log_1.default);
// -----------------------------------
// ルーティング
// -----------------------------------
app.use('/', moyooshi_controller_1.default);
app.use(router);
// -----------------------------------
// 3000番ポートでAPIサーバ起動
// -----------------------------------
var NOW = new Date().toLocaleString();
console.log('-----------------------------------------');
console.log('NOW:' + NOW);
console.log('-----------------------------------------');
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
