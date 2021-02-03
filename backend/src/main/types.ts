import { CalculatedSankaNichiji } from "./graphql/sankasha.resolver";
import Moyooshi from "./models/moyooshi";
import MoyooshiKouhoNichiji from "./models/moyooshi_kouho_nichiji";
import Sankasha from "./models/sankasha";
import SankaNichiji from "./models/sanka_nichiji";

export enum SankaKahiType {
    MIKAITOU = "MIKAITOU",
    MARU = "MARU",
    SANKAKU = "SANKAKU",
    BATSU = "BATSU",
}

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
    sankasha?: Sankasha;
    sankashas?: Sankasha[];
    sankashaNichijis?: SankaNichiji[];
    calculatedSankanichijis?: CalculatedSankaNichiji[];
};
