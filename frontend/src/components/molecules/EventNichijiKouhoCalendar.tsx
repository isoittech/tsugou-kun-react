import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, DayValue } from "react-modern-calendar-datepicker";

import { getToday } from "../../libs/common/datetime";

type Props = {
    clickedHandler: (value: DayValue) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント日時候補用カレンダー（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventNichijiKouhoCalendar: React.FC<Props> = ({ clickedHandler }) => {
    // ========================================================
    // コンポーネントのState
    // ========================================================
    // -------------------------------------
    // フォームの値
    // -------------------------------------
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);

    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Form.Label>※選択すると日時候補欄に日付が追記されます</Form.Label>
            <Calendar
                value={selectedDay}
                onChange={(newValue: DayValue) => {
                    clickedHandler(newValue);
                    setSelectedDay(newValue);
                }}
                shouldHighlightWeekends
                minimumDate={getToday()}
            />
        </>
    );
};
