import { Cluster } from "puppeteer-cluster";

let cluster: Cluster;

// Initialize Puppeteer Cluster
async function initialize(): Promise<void> {
  cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
    puppeteerOptions: {
      // @ts-ignore
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Ensure correct dash character
    },
  });
}

// Teardown Puppeteer Cluster
async function teardown(): Promise<void> {
  await cluster.idle();
  await cluster.close();
  cluster = undefined as any; // Explicitly mark as undefined
}

interface EvaluatePageParams {
  url?: string;
  html?: string;
  scriptTag?: { url?: string; content?: string };
  evaluate: (page: any) => Promise<any> | any; // Specify better type if known
}

// Evaluate a page using the cluster
async function evaluatePage({ url, html, scriptTag, evaluate }: EvaluatePageParams): Promise<any> {
  const data = await cluster.execute(async ({ page }: { page: any }) => {
    if (html) {
      await page.setContent(html);
    } else if (url) {
      await page.goto(url);
    }
    if (scriptTag) {
      await page.addScriptTag(scriptTag);
    }
    return await page.evaluate(evaluate);
  });
  return data;
}

export {
  initialize,
  evaluatePage,
  teardown,
};

// export default {
//   initialize,
//   evaluatePage,
//   teardown,
// };