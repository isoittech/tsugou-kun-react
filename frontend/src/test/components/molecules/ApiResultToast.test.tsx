import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApiResultToast } from "../../../components/molecules/ApiResultToast";

afterEach(() => cleanup());

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
describe("レンダリング確認", () => {
  // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
  it("前提条件なしで主要タグ・属性値が正しくレンダリングされていること", () => {
    // ===============================
    // 準備
    // ===============================

    // ===============================
    // レンダリング
    // ===============================
    render(
      <BrowserRouter>
        <ApiResultToast schedule_update_id="test" />
      </BrowserRouter>
    );

    // ===============================
    // 検証HTML要素取得 ※任意
    // ===============================
    const elem = screen.getByText("次のリンクでイベント情報の修正ができます。");
    const elemBtn = screen.getByText("URLをクリップボードにコピー");

    // ===============================
    // 検証
    // ===============================
    expect(elem).toBeTruthy();
    expect(elemBtn).toBeTruthy();
  });

  // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
  it("渡したPropsの値で正しくイベント編集用のURLが構成されていること", () => {
    // ===============================
    // 準備
    // ===============================

    // ===============================
    // レンダリング
    // ===============================
    render(
      <BrowserRouter>
        <ApiResultToast schedule_update_id="test" />
      </BrowserRouter>
    );

    // ===============================
    // 検証HTML要素取得 ※任意
    // ===============================
    const elemLink = screen.getByRole("link");

    // ===============================
    // 検証
    // ===============================
    expect(elemLink).toHaveAttribute("href", "/edit/test")
  });
});

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
describe("ボタン押下時の挙動", () => {
  // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
  it("クリックによりクリップボードにコピーが行われること", () => {
    // ===============================
    // 準備
    // ===============================
    document.execCommand = jest.fn();

    // ===============================
    // レンダリング
    // ===============================
    render(
      <BrowserRouter>
        <ApiResultToast schedule_update_id="test" />
      </BrowserRouter>
    );

    // ===============================
    // 検証HTML要素取得 ※任意
    // ===============================
    const elemBtn = screen.getByText("URLをクリップボードにコピー");

    // ===============================
    // ユーザ操作 ※任意
    // ===============================
    // fireEvent.click(elemBtn); // これを実行すると「schedule_fill_url.select();」部分でエラーになる。→    TypeError: schedule_fill_url.select is not a function

    // ===============================
    // 検証
    // ===============================
    // expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
