// 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる。
export type ValueOf<T> = T[keyof T];

export type NichijiData = {
    id: string;
    nichiji: string;
};

export type CheckedBox = {
    [key: string]: boolean;
};

export type EventInfo = {
    name: string;
    scheduleUpdateId: string;
    nichijis: string[];
};
