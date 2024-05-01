"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.input = void 0;
/* eslint-disable */
const response_1_json_1 = __importDefault(require("./workday-mock/response-1.json"));
const response_2_json_1 = __importDefault(require("./workday-mock/response-2.json"));
const response_3_json_1 = __importDefault(require("./workday-mock/response-3.json"));
const response_4_json_1 = __importDefault(require("./workday-mock/response-4.json"));
const response_5_json_1 = __importDefault(require("./workday-mock/response-5.json"));
const response_6_json_1 = __importDefault(require("./workday-mock/response-6.json"));
const response_7_json_1 = __importDefault(require("./workday-mock/response-7.json"));
const results_json_1 = __importDefault(require("./workday-mock/results.json"));
exports.input = [
    [JSON.stringify(response_1_json_1.default), { status: 200 }],
    [JSON.stringify(response_2_json_1.default), { status: 200 }],
    [JSON.stringify(response_3_json_1.default), { status: 200 }],
    [JSON.stringify(response_4_json_1.default), { status: 200 }],
    [JSON.stringify(response_5_json_1.default), { status: 200 }],
    [JSON.stringify(response_6_json_1.default), { status: 200 }],
    [JSON.stringify(response_7_json_1.default), { status: 200 }],
    ["", { status: 404 }],
];
exports.output = results_json_1.default;
