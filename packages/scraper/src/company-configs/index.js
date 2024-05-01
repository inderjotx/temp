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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllConfigs = void 0;
const glob = __importStar(require("glob"));
// Function to load a single company config dynamically
async function loadConfig(file) {
    const module = await Promise.resolve(`${file}`).then(s => __importStar(require(s)));
    return module; // Assuming the configs use `export default`
}
// Function to load all configs and return a promise
async function loadAllConfigs() {
    const files = glob.sync(`${__dirname}/**/*.config.js`);
    const configs = {};
    for (const file of files) {
        const config = await loadConfig(file);
        const companyId = file
            .substr(file.lastIndexOf("/") + 1)
            .replace(/\.config\.js$/, ""); // Properly escape the dot
        configs[companyId] = config;
    }
    return configs; // Return the compiled dictionary of configurations
}
exports.loadAllConfigs = loadAllConfigs;
// Example of how you might use loadAllConfigs in another part of your application
// Not needed if you just want to export the function
