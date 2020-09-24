// TODO FrontEnd側にも定義しており冗長。tsugou-kun-react用の@typeを作成する。

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