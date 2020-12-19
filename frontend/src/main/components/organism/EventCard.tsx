import React, { MutableRefObject } from "react";
import { Button, Card, Col, Form, Row, Toast } from "react-bootstrap";
import { DayValue } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

import { EventName } from "../molecules/EventName";
import { EventMemo } from "../molecules/EventMemo";
import { EventNichijiKouho } from "../molecules/EventNichijiKouho";
import { EventNichijiKouhoCalendar } from "../molecules/EventNichijiKouhoCalendar";
import { CheckedBox, NichijiData } from "../../libs/common/declare";
import { EventNichijiKouhoDelete } from "../molecules/EventNichijiKouhoDelete";

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// EventCardProps
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export type EventCardProps = {
    eventNichijiKouho: string;
    showA: boolean;
    toastHeader: JSX.Element;
    toastMessage: JSX.Element;
    validated: boolean;
    textArefRef: MutableRefObject<HTMLTextAreaElement>;
    formRef: MutableRefObject<HTMLFormElement>;
    isAdd?: boolean;
    setEventName: (value: string) => void;
    setEventMemo: (value: string) => void;
    setEventNichijiKouho: (value: string) => void;
    setEventNameIsValid: (value: boolean) => void;
    setEventNichijiKouhoIsValid: (value: boolean) => void;
    toggleShowA: () => void;
    handleSubmit: (event) => void;
    onCalendarClick: (value: DayValue) => void;
    // 以下、編集画面用途
    eventName?: string;
    eventMemo?: string;
    eventNichijiKouhoDeleteTargets?: NichijiData[];
    eventNichijiKouhoDeleteTargetChecks?: CheckedBox;
    setEventNichijiKouhoDeleteTargetChecks?: (value: CheckedBox) => void;
};

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// イベント編集フォーム（新規追加）
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
export const EventCardPC: React.FC<EventCardProps> = ({
    eventName,
    eventMemo,
    eventNichijiKouhoDeleteTargets,
    eventNichijiKouhoDeleteTargetChecks,
    eventNichijiKouho,
    showA,
    toastHeader,
    toastMessage,
    validated,
    textArefRef,
    formRef,
    isAdd = true,
    setEventName,
    setEventMemo,
    setEventNichijiKouho,
    setEventNameIsValid,
    setEventNichijiKouhoIsValid,
    toggleShowA,
    handleSubmit,
    onCalendarClick,
    setEventNichijiKouhoDeleteTargetChecks,
}) => {
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    // レンダー
    // ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    return (
        <>
            <Row className={"mt-5"}>
                <Col sm={12}>
                    <Toast show={showA} onClose={toggleShowA} className={"overrideToastStyle"}>
                        <Toast.Header>{toastHeader}</Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            {isAdd && (
                <Card className={"mt-5 shadow rounded"}>
                    <Card.Body>
                        <Form noValidate onSubmit={handleSubmit} ref={formRef}>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <EventName
                                        valueSetter={setEventName}
                                        validStatusSetter={setEventNameIsValid}
                                    ></EventName>
                                    <EventMemo valueSetter={setEventMemo}></EventMemo>
                                    <EventNichijiKouho
                                        value={eventNichijiKouho}
                                        valueSetter={setEventNichijiKouho}
                                        validStatusSetter={setEventNichijiKouhoIsValid}
                                        ref={textArefRef}
                                    ></EventNichijiKouho>
                                </Form.Group>
                                <Form.Group as={Col} md="6" className="pl-5" controlId="formCalendar">
                                    <Form.Label>※選択すると日時候補欄に日付が追記されます</Form.Label>
                                    <EventNichijiKouhoCalendar
                                        clickedHandler={onCalendarClick}
                                    ></EventNichijiKouhoCalendar>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit" disabled={!validated}>
                                新規イベントを登録する
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            {!isAdd && (
                <Card className={"mt-5 shadow rounded"}>
                    <Card.Body>
                        <Form noValidate onSubmit={handleSubmit} ref={formRef}>
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
            )}
        </>
    );
};
