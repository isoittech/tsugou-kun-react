// TODO FrontEnd側にも定義しており冗長。こちら（サーバ側）でtsugou-kun-react用の@typeを作成し、フロント側に参照させる。

export type MoyooshiAddRequest = {
    name: string;
    memo?: string;
    nichiji_kouho: string;
};
//
// export type moyooshiAddResponse = {
//     code: string;
//     key: string;
//     succeed: boolean;
// }