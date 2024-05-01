"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeJobs = void 0;
/* global document */
const puppeteer_1 = require("../services/puppeteer");
async function scrapeJobs() {
    const url = "https://vercel.com/careers";
    const data = await (0, puppeteer_1.evaluatePage)({
        url,
        evaluate: () => {
            return [...document.querySelectorAll(".career-content")].map((jobOfferContainer) => {
                return {
                    department: "",
                    url: jobOfferContainer.baseURI,
                    id: jobOfferContainer.baseURI,
                    location: "Remote",
                    title: jobOfferContainer.querySelector("h3").textContent.trim(),
                    _id: jobOfferContainer.baseURI,
                    _updatedAt: Date.now(),
                };
            });
        },
    });
    return data;
}
exports.scrapeJobs = scrapeJobs;
