import express from "express";
import path from "path";
import router_moyooshi from "./controller/moyooshi_controller";
import access_log from "./helper/access_log";

const history = require("connect-history-api-fallback");

const app: express.Express = express();
const router: express.Router = express.Router();

// -----------------------------------
// CORSの許可
// -----------------------------------
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// -----------------------------------
// body-parserに基づいた着信リクエストの解析
// -----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(access_log);

// -----------------------------------
// ルーティング
// -----------------------------------
app.use(express.static(path.join(__dirname, "../build")));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});
app.use("/moyooshi", router_moyooshi);
app.use(
    history({
        verbose: true,
        // rewrites: [{ from: /\/.*/, to: "index.html" }],
        // rewrites: [{ from: /\/.*/, to: "/" }],
    })
);
app.use(router);

// -----------------------------------
// 3000番ポートでAPIサーバ起動
// -----------------------------------
let NOW = new Date().toLocaleString();
console.log("-----------------------------------------");
console.log("NOW:" + NOW);
console.log("-----------------------------------------");

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
