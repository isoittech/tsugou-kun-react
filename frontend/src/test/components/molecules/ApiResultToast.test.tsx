import React from "react";
import { BrowserRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { render, fireEvent, screen } from "@testing-library/react";

import { ApiResultToast } from "../../../components/molecules/ApiResultToast";

const sel = (id) => `[data-test="${id}"]`;

describe("<ApiResultToast/>", () => {
    describe("レンダリング確認 ※ Test with Enzyme", () => {
        it("渡したIDでリンクをレンダリングする", () => {
            // ===============================
            // 準備
            // ===============================
            // ===============================
            // レンダリング
            // ===============================
            const wrapper = mount(
                // shallowではなくmountの場合、子コンポーネントまで展開するため、
                // <BrowserRouter>が無いとuseHref云々のエラーが発生する。
                <BrowserRouter>
                    <ApiResultToast schedule_update_id={"test"} />
                </BrowserRouter>
            );

            // ===============================
            // 検証HTML要素取得 ※任意
            // ===============================
            // ===============================
            // 検証
            // // ===============================
            // console.log(wrapper.debug());
            const aLink = wrapper.find("[data-testid='linkEdit']").hostNodes();
            const aLinkRendered = aLink.render()[0];
            // console.log(aLink);
            // console.log(aLink.debug());
            // console.log(aLinkRendered);
            // console.log(expect(aLink));
            // expect(aLink).toHaveProperty("href", "/edit"); // error
            // expect(wrapper.find(sel("linkEdit")).props()).toHaveAttribute("href", "/edit");
            // expect(wrapper.find(sel("linkEdit")).prop("href")).toBe("/edit");
            // expect(wrapper.find("[data-testid='linkEdit']")).toHaveAttribute("href", "/edit");
            // expect(wrapper.find("[data-testid='linkEdit']")).to.have.property("href", "/edit");
            expect(aLinkRendered.attribs.href).toEqual("/edit/test");
        });
    });
    describe("レンダリング確認 ※ Test with React Testing Library", () => {
        it("渡したIDでリンクをレンダリングする", () => {
            // ===============================
            // 準備
            // ===============================
            // ===============================
            // レンダリング
            // ===============================
            render(
                // <BrowserRouter>が無いとuseHref云々のエラーが発生する。
                <BrowserRouter>
                    <ApiResultToast schedule_update_id={"test"} />
                </BrowserRouter>
            );

            // ===============================
            // 検証HTML要素取得 ※任意
            // ===============================
            const aLink = screen.getByTestId("linkEdit");
            const txtForm = screen.getByTestId("txtFormEditUrl");
            // console.log(screen.debug(aLink));

            // ===============================
            // 検証
            // ===============================
            expect(aLink).toHaveAttribute("href", "/edit/test");
            expect(txtForm).toHaveAttribute("value", "http://localhost/edit/test");
        });
    });
});

// describe("レンダリング確認", () => {
//   // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
//   it("前提条件なしで主要タグ・属性値が正しくレンダリングされていること", () => {
//     // ===============================
//     // 準備
//     // ===============================

//     // ===============================
//     // レンダリング
//     // ===============================
//     render(
//       <BrowserRouter>
//         <ApiResultToast schedule_update_id="test" />
//       </BrowserRouter>
//     );

//     // ===============================
//     // 検証HTML要素取得 ※任意
//     // ===============================
//     const elem = screen.getByText("次のリンクでイベント情報の修正ができます。");
//     const elemBtn = screen.getByText("URLをクリップボードにコピー");

//     // ===============================
//     // 検証
//     // ===============================
//     expect(elem).toBeTruthy();
//     expect(elemBtn).toBeTruthy();
//   });

//   // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

// });

// // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// describe("ボタン押下時の挙動", () => {
//   // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
//   it("クリックによりクリップボードにコピーが行われること", () => {
//     // ===============================
//     // 準備
//     // ===============================
//     document.execCommand = jest.fn();

//     // ===============================
//     // レンダリング
//     // ===============================
//     render(
//       <BrowserRouter>
//         <ApiResultToast schedule_update_id="test" />
//       </BrowserRouter>
//     );

//     // ===============================
//     // 検証HTML要素取得 ※任意
//     // ===============================
//     const elemBtn = screen.getByText("URLをクリップボードにコピー");

//     // ===============================
//     // ユーザ操作 ※任意
//     // ===============================
//     // fireEvent.click(elemBtn); // これを実行すると「schedule_fill_url.select();」部分でエラーになる。→    TypeError: schedule_fill_url.select is not a function

//     // ===============================
//     // 検証
//     // ===============================
//     // expect(document.execCommand).toHaveBeenCalledWith("copy");
//   });
// });
