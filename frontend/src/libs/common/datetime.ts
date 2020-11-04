export type Day = {
    year: number;
    month: number;
    day: number;
};

export const getToday = () => {
    const today = new Date();
    const year = today.getFullYear(); // 2019とかを取得できる
    const month = today.getMonth() + 1; // 月は0~11の値で管理されているというトラップ
    const day = today.getDate(); // 日付は普通に1~の数字で管理されている
    return {
        year,
        month,
        day,
    };
};
