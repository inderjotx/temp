"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
    // Safety check to make sure we're not importing this file in "website" because
    // it's not treeshakeable and it would end up increasing the bundle size with
    // the entire list of jobs, locations, etc...
    // You can still import stuff from the sub-dirs if needed by updating the
    // package.json's externals field.
    throw new Error(`This file must not be imported in a web app because it's not treeshakeable. Please import the data granularly from their own sub-directories.`);
}
__exportStar(require("./companies.js"), exports);
__exportStar(require("./locations.js"), exports);
__exportStar(require("./jobs.js"), exports);
__exportStar(require("./location-patterns.js"), exports);
__exportStar(require("./departments.js"), exports);
