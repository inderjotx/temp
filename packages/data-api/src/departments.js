"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allDepartments = exports.departmentIds = void 0;
const departments_data_json_1 = __importDefault(require("@remotebear/data/departments/departments-data.json"));
exports.departmentIds = departments_data_json_1.default.reduce((acc, department) => {
    acc[department.id] = department.id;
    return acc;
}, {});
exports.allDepartments = departments_data_json_1.default;
