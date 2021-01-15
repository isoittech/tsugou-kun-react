import express from "express";
import { graphqlHTTP } from "express-graphql";
import path from "path";
import { buildSchema } from "type-graphql";
const cors = require("cors");

import router_moyooshi from "./controller/moyooshi_controller";
import access_log from "./helper/access_log";
import { logger } from "./helper/logging";

const main = async () => {
    const app: express.Express = express();
    const router: express.Router = express.Router();

    // -----------------------------------
    // CORSの許可
    // -----------------------------------
    app.use(cors());
    // ApolloClientからのリクエストでは下記設定を行ってCORS関連エラーが出てしまうため、上記corsモジュールを使っている。
    // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    //     next();
    // });

    // -----------------------------------
    // body-parserに基づいた着信リクエストの解析
    // -----------------------------------
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(access_log);

    // -----------------------------------
    // GraphQL
    // -----------------------------------
    const schema = await buildSchema({
        resolvers: [__dirname + "/graphql/*.resolver.ts"],
        emitSchemaFile: true,
        validate: false,
    });

    // -----------------------------------
    // ルーティング
    // -----------------------------------
    app.use(express.static(path.join(__dirname, "../../build")));
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../../build", "index.html"));
    });
    app.use("/moyooshi", router_moyooshi);
    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            graphiql: true,
        })
    );
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../../build", "index.html"));
    });
    app.use(router);

    // -----------------------------------
    // 3000番ポートでAPIサーバ起動
    // -----------------------------------
    let NOW = new Date().toLocaleString();
    logger.info("-----------------------------------------");
    logger.info("NOW:" + NOW);
    logger.info("-----------------------------------------");

    app.listen(3000, () => {
        logger.info("Example app listening on port 3000!");
    });
};

main().catch((error) => {
    logger.error(error, "error");
});
