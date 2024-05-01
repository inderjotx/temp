/* global document */
import { evaluatePage } from "../services/puppeteer";

export async function scrapeJobs() {
  const url = "https://journey.buffer.com";
  const data = await evaluatePage({
    url,
    evaluate: () => {
      return [...document.querySelectorAll("div[data-job-list-items] > a")].map(
        (jobLink: any) => {
          return {
            department: "",
            url: jobLink.href,
            id: jobLink.href,
            location: "Remote",
            title: jobLink.querySelector("p").textContent.trim(),
            _id: jobLink.href,
            _updatedAt: Date.now(),
          };
        }
      );
    },
  });
  return data;
}

