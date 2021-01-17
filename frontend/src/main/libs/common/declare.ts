import { resultKeyNameFromField } from "@apollo/client/utilities";

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

// 「as const」というConstアサーションを利用。
// これとValueOf※を利用することで、後続の宣言SankaNichiji.sankaKahiの型が「string」ではなく
// リテラル型の「MARU|SANKAKU|BATSU」となる。
// ※ValueOf: 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる自前の型。
export const SankaKahiType = {
    MARU: "MARU",
    SANKAKU: "SANKAKU",
    BATSU: "BATSU",
} as const;

export class Sankasha {
    name: string;
    comment: string;
    sankaNichijis: SankaNichiji[];

    constructor(public _name: string, public _comment: string, public _sankaNichijis: SankaNichiji[]) {
        this.name = _name;
        this.comment = _comment;
        this.sankaNichijis = _sankaNichijis;
    }

    public getSankaKahi(nichiji: string): string {
        let result: string = "-";

        for (let index = 0; index < this.sankaNichijis.length; index++) {
            const sankaNichiji = this.sankaNichijis[index];

            if (sankaNichiji.nichiji != nichiji) continue;

            if (sankaNichiji.sankaKahi == SankaKahiType.MARU) result = "◯";
            else if (sankaNichiji.sankaKahi == SankaKahiType.SANKAKU) result = "△";
            else if (sankaNichiji.sankaKahi == SankaKahiType.BATSU) result = "✕";
            else result = "-";
        }
        return result;
    }
}

export type SankaNichiji = {
    nichiji: string;
    // 下記は、sankaKahiの型を、EventActionTypeの中で定義したリテラル型の「ADD_EVENT|SUCCESS_～|FAIL_～…」にしてくれる。
    // ※前述「as const」と組み合わせる必要あり。
    sankaKahi?: ValueOf<typeof SankaKahiType>;
};
