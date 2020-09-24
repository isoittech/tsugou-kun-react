// 「keyof 型」という文で、オブジェクトの型からキーを取り出してくれる。
export type ValueOf<T> = T[keyof T];
