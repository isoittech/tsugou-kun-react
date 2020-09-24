export type EventAddRequest = {
    name: string;
    memo?: string;
    nichiji_kouho: string;
};

export type EventAddResponse = {
    code: string;
    key: string;
    succeed: boolean;
}