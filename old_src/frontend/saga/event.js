var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_EVENT, successFetchEventApi, failFetchEventApi } from '../action/event';
var requestEventApi = function () {
    var url = 'https://restcountries.eu/rest/v2/all';
    return axios
        .get(url)
        .then(function (response) {
        var country = response.data.map(function (item) { return item.name; });
        return { country: country };
    })
        .catch(function (error) {
        return { error: error };
    });
};
// タスク(2)
function runRequest() {
    var _a, country, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, call(requestEventApi)];
            case 1:
                _a = _b.sent(), country = _a.country, error = _a.error;
                if (!(country && !error)) return [3 /*break*/, 3];
                return [4 /*yield*/, put(successFetchEventApi({ country: country }))];
            case 2:
                _b.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, put(failFetchEventApi({ error: error }))];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}
// タスク(1)
// function* handleRequest() {
//     while (true) {
//         yield take(FETCH_EVENT);
//         yield fork(runRequest);
//     }
// }
// 上記を書き直したのが ↓↓↓
// FETCH_EVENTが発生するまで待つ。
// 発生したら（カブってる？）実行中のタスク(2)を中断し、タスク(2)を実行する。実行したら処理終了する（結果、すぐさまFETCH_EVENT発生を待つことになる）。
// ※takeLatestは連続で呼ばれた場合などで最新のものだけ実行する時に使う。
export var eventSaga = [takeLatest(FETCH_EVENT, runRequest)];
// takeEvery: actionが実行されるたびに関数を実行する
// takeLatest: 実行中の処理があったら中断し、新しく処理を開始する
// all: 配列で指定されたeffectを並列で実行する
// const requestCountryApi = async () => {
//     const url = 'https://restcountries.eu/rest/v2/all'
//
// try {
//     const response = await axios.get(url)
//     const country = response.data.map((item) => item.name)
//     return {country}
//
// } catch (error) {
//     return {error}
//
// }
// }
//# sourceMappingURL=event.js.map