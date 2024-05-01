"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teardown = exports.evaluatePage = exports.initialize = void 0;
const puppeteer_cluster_1 = require("puppeteer-cluster");
let cluster;
// Initialize Puppeteer Cluster
async function initialize() {
    cluster = await puppeteer_cluster_1.Cluster.launch({
        concurrency: puppeteer_cluster_1.Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions: {
            // @ts-ignore
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // Ensure correct dash character
        },
    });
}
exports.initialize = initialize;
// Teardown Puppeteer Cluster
async function teardown() {
    await cluster.idle();
    await cluster.close();
    cluster = undefined; // Explicitly mark as undefined
}
exports.teardown = teardown;
// Evaluate a page using the cluster
async function evaluatePage({ url, html, scriptTag, evaluate }) {
    const data = await cluster.execute(async ({ page }) => {
        if (html) {
            await page.setContent(html);
        }
        else if (url) {
            await page.goto(url);
        }
        if (scriptTag) {
            await page.addScriptTag(scriptTag);
        }
        return await page.evaluate(evaluate);
    });
    return data;
}
exports.evaluatePage = evaluatePage;
// export default {
//   initialize,
//   evaluatePage,
//   teardown,
// };
