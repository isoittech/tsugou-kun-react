export type Moyooshi = {
    id?: number;
    name: string;
    memo?: string;
    nichiji_kouho: string[];
    schedule_update_id?: string;
    deleted_nichiji_kouho?: { [key: string]: boolean };
};
