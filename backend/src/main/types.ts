import Moyooshi from "./models/moyooshi";
import MoyooshiKouhoNichiji from "./models/moyooshi_kouho_nichiji";
import Sankasha from "./models/sankasha";
import SankaNichiji from "./models/sanka_nichiji";

// 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる。
export type ValueOf<T> = T[keyof T];

export enum SankaKahiType {
    MIKAITOU = "MIKAITOU",
    MARU = "MARU",
    SANKAKU = "SANKAKU",
    BATSU = "BATSU",
}

export const SankaKahiTypeConst = {
    MIKAITOU: "MIKAITOU",
    MARU: "MARU",
    SANKAKU: "SANKAKU",
    BATSU: "BATSU",
} as const;

export type MoyooshiServiceDto = {
    id?: number;
    name: string;
    memo?: string;
    nichiji_kouho: string[];
    deleted_nichiji_kouho?: any /*{ [key: string]: boolean }*/; // TODO anyから相応しい型に直す
};

export type MoyooshiServiceOutputDto = {
    moyooshi?: Moyooshi;
    error_name?: string;
    error_message?: string;
    schedule_update_id?: string;
    nichiji_kouhos?: MoyooshiKouhoNichiji[];
};

export type SankaKahi = {
    moyooshiKouhoNichijiId: number;
    // 下記は、sankaKahiの型を、EventActionTypeの中で定義したリテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」にしてくれる。
    // ※前述「as const」と組み合わせる必要あり。
    sankaKahi?: SankaKahiType;
};

export type SankashaServiceDto = {
    sankasha_id?: number;
    name: string;
    comment?: string;
    moyooshiId: number;
    sankaKahis: SankaKahi[];
};

export type SankashaServiceOutputDto = {
    addedSankasha?: Sankasha;
    addedSankashaNichijis?: SankaNichiji[];
};
