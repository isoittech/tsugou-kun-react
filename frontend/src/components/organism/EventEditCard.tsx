import React, { MutableRefObject } from "react";
import { Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { EventName } from "../molecules/EventName";
import { EventMemo } from "../molecules/EventMemo";
import { EventNichijiKouhoCalendar } from "../molecules/EventNichijiKouhoCalendar";
import { EventNichijiKouho } from "../molecules/EventNichijiKouho";
import { EventNichijiKouhoDelete } from "../molecules/EventNichijiKouhoDelete";
import { CheckedBox, NichijiData } from "../../libs/common/declare";

type Props = {
    eventName: string;
    eventMemo: string;
    eventNichijiKouho: string;
    eventNichijiKouhoDeleteTargets: NichijiData[];
    eventNichijiKouhoDeleteTargetChecks: CheckedBox;
    showA: boolean;
    toastHeader: JSX.Element;
    toastMessage: JSX.Element;
    validated: boolean;
    textArefRef: MutableRefObject<HTMLTextAreaElement>;
    setEventName: (value: string) => void;
    setEventMemo: (value: string) => void;
    setEventNichijiKouho: (value: string) => void;
    setEventNameIsValid: (value: boolean) => void;
    setEventNichijiKouhoDeleteTargetChecks: (value: CheckedBox) => void;
    toggleShowA: () => void;
    handleSubmit: (event) => void;
    onCalendarClick: (value: DayValue) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント編集フォーム（編集）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventEditCardPC: React.FC<Props> = ({
    eventName,
    eventMemo,
    eventNichijiKouho,
    eventNichijiKouhoDeleteTargets,
    eventNichijiKouhoDeleteTargetChecks,
    showA,
    toastHeader,
    toastMessage,
    validated,
    textArefRef,
    setEventName,
    setEventMemo,
    setEventNichijiKouho,
    setEventNameIsValid,
    setEventNichijiKouhoDeleteTargetChecks,
    toggleShowA,
    handleSubmit,
    onCalendarClick,
}) => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Row className={"mt-5"}>
                <Col sm={12}>
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>{toastHeader}</Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </Col>
            </Row>

            <Card className={"mt-5 shadow rounded"}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <EventName
                            value={eventName}
                            displayMode={2}
                            valueSetter={setEventName}
                            validStatusSetter={setEventNameIsValid}
                        ></EventName>
                        <EventMemo value={eventMemo} displayMode={2} valueSetter={setEventMemo}></EventMemo>

                        <EventNichijiKouhoDelete
                            eventNichijiKouhoDeleteTargets={eventNichijiKouhoDeleteTargets}
                            eventNichijiKouhoDeleteTargetChecks={eventNichijiKouhoDeleteTargetChecks}
                            setEventNichijiKouhoDeleteTargetChecks={setEventNichijiKouhoDeleteTargetChecks}
                        ></EventNichijiKouhoDelete>

                        <EventNichijiKouho
                            value={eventNichijiKouho}
                            displayMode={2}
                            valueSetter={setEventNichijiKouho}
                            ref={textArefRef}
                        >
                            <EventNichijiKouhoCalendar clickedHandler={onCalendarClick}></EventNichijiKouhoCalendar>
                        </EventNichijiKouho>

                        <Form.Group className="form-row mt-2 float-right">
                            <Button type="submit">イベント情報を修正する</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
