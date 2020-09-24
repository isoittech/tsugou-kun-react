import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Button, Card, Col, Form} from 'react-bootstrap';
import {Calendar, DayValue} from 'react-modern-calendar-datepicker';
import {getToday} from "../../libs/common/datetime";
import {addEvent} from "../../action/event";
import {EventAddRequest} from "../../model/event";

import 'react-modern-calendar-datepicker/lib/DatePicker.css';

export const EventEditCard: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const [selectedDay, setSelectedDay] = useState<DayValue>(null);
    const [eventName, setEventName] = useState('');
    const [eventNichijiKouho, setEventNichijiKouho] = useState('');
    const [eventMemo, setEventMemo] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const onSelectedOnCalendar = (newValue: DayValue) => {
        const {year, month, day} = newValue
        console.log("OldValue:" + eventNichijiKouho)
        const printedDate = `${eventNichijiKouho}\n${year}/${month}/${day} 19:00～`
        console.log(`DayValue: + ${printedDate.trim()}`)

        setSelectedDay(newValue)
        setEventNichijiKouho(printedDate.trim())
    }

    const onClickToSaveEvent = (event) => {
        // const form = event.currentTarget;
        // event.preventDefault();
        // event.stopPropagation();
        const addedEvent: EventAddRequest = {
            name: eventName,
            memo: eventMemo,
            nichiji_kouho: eventNichijiKouho
        }
        dispatch(addEvent(addedEvent))


    }

    return (
        <>
            <Card className={"mt-5 shadow rounded"}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6">
                                <Form.Group controlId="formEventName">
                                    <Form.Label>イベント名</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="イベント名"
                                        onChange={(e) => {
                                            setEventName(e.target.value)
                                        }}
                                    />
                                    <Form.Control.Feedback>OKです。</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formEventMemo">
                                    <Form.Label>イベントメモ</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        onChange={(e) => {
                                            setEventMemo(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEventNichijiKouho">
                                    <Form.Label>イベント日時候補</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        rows={5}
                                        onChange={(e) => {
                                            setEventNichijiKouho(e.target.value)
                                        }}
                                        defaultValue={eventNichijiKouho}
                                    />
                                    <Form.Control.Feedback>OKです。</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="6" className="pl-5" controlId="formCalendar">
                                <Form.Label>※選択するとイベント日時候補欄に日付が追記されます</Form.Label>
                                <Calendar
                                    value={selectedDay}
                                    onChange={onSelectedOnCalendar}
                                    shouldHighlightWeekends
                                    minimumDate={getToday()}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit" onClick={onClickToSaveEvent}>新規イベントを登録する</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}