export type MoyooshiAddRequest = {
    name: string;
    memo?: string;
    nichiji_kouho: string;
};

export type MoyooshiAddResponse = {
    code: string;
    key: string;
    succeed: boolean;
}