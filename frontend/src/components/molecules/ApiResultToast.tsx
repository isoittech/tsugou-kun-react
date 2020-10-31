import React from "react";
import { Link } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

type Props = {
    schedule_update_id: string;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// API実行結果周知Toast
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const ApiResultToast: React.FC<Props> = (props) => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <p className="mb-0">
                <Badge variant="secondary">Yes！</Badge>
                次のリンクでイベント情報の修正ができます。
                <Link id={"scheduleFillUrl"} className={"nav-link"} to={`/edit/${props.schedule_update_id}`}>
                    `{location.href}edit/{props.schedule_update_id}`
                </Link>
                <OverlayTrigger
                    placement={"bottom"}
                    overlay={<Tooltip id={"tooltip-bottom"}>残念ですがバグがあり、まだ機能しません。</Tooltip>}
                >
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                        onClick={() => {
                            const scheduleFillUrl = document.getElementById("scheduleFillUrl");
                            // 文字をすべて選択
                            // @ts-ignore
                            scheduleFillUrl.select();
                            // コピー
                            document.execCommand("copy");

                            alert(
                                "コピーできるようにしました。\nメール・チャット等で貼り付けてお知らせに貼り付けてご利用ください。"
                            );
                        }}
                    >
                        URLをクリップボードにコピー
                    </button>
                </OverlayTrigger>
            </p>
        </>
    );
};
