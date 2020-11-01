import { getToday } from "../../../libs/common/datetime";

describe("getToday関数", () => {
    it("正しい年月日を返却する", () => {
        const today = new Date();
        const { year, month, day } = getToday();
        expect(year).toEqual(today.getFullYear());
        expect(month).toEqual(today.getMonth() + 1);
        expect(day).toEqual(today.getDate());
    });
});
