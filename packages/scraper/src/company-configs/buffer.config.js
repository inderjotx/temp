"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeJobs = void 0;
/* global document */
const puppeteer_1 = require("../services/puppeteer");
async function scrapeJobs() {
    const url = "https://journey.buffer.com";
    const data = await (0, puppeteer_1.evaluatePage)({
        url,
        evaluate: () => {
            return [...document.querySelectorAll("div[data-job-list-items] > a")].map((jobLink) => {
                return {
                    department: "",
                    url: jobLink.href,
                    id: jobLink.href,
                    location: "Remote",
                    title: jobLink.querySelector("p").textContent.trim(),
                    _id: jobLink.href,
                    _updatedAt: Date.now(),
                };
            });
        },
    });
    return data;
}
exports.scrapeJobs = scrapeJobs;
