import { SankaNichiji, SankaKahiType, Sankasha } from "../../generated/graphql";

// 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる。
export type ValueOf<T> = T[keyof T];

export type NichijiData = {
    id: string | number;
    nichiji: string;
};

export type CheckedBox = {
    [key: string]: boolean;
};

export type EventInfo = {
    name: string;
    scheduleUpdateId: string;
    nichijis: string[];
    memo?: string;
};

export type EventInfoCookies = { [scheduleUpdateId: string]: EventInfo };

export type SankashaCookie = {
    sankashaId: number;
    sankashaName: string;
    sankashaComment: string;
};

export type SankashaCookies = { [scheduleUpdateId: string]: SankashaCookie };

export type EventNichijiTableRow = {
    eventNichiji: string;
    maru: number;
    sankaku: number;
    batsu: number;
    eventNichijiKouhoId: number;
};

export type PickedSankaNichiji = Pick<SankaNichiji, "sanka_kahi" | "moyooshi_kouho_nichiji_id">;

export type SankashaTableRow = Pick<Sankasha, "name" | "comment"> & { sankaNichijis: PickedSankaNichiji[] };
