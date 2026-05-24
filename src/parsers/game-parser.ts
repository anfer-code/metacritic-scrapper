import { load, type Cheerio } from "cheerio";
import type { Element } from "domhandler";
import { normalizeText } from "../utils/normalize-text.ts";
import { BASE_URL } from "../config/index.ts";
import type { CardGameInfo } from "../interfaces/card-game-info.ts";

const cleanTitle = (value: string): string =>
  normalizeText(value).replace(/^\d+\.\s*/, "");

const getAbsoluteUrl = (href: string): string => {
  if (!href) {
    return "";
  }

  return new URL(href, BASE_URL).toString();
};

const extractScore = (element: Cheerio<Element>): string => {
  const score = element.find(".c-siteReviewScore span").first().text();

  if (!score) {
    return "";
  }

  return normalizeText(score);
};

export const parseGameCards = (body: string): CardGameInfo[] => {
  const $ = load(body);

  return $("[data-testid='filter-results']")
    .toArray()
    .map((element) => {
      const card = $(element);
      const titleElement = card.find("[data-testid='product-title']").first();
      const releaseDateElement = titleElement.parent().next();
      const releaseDateText = releaseDateElement.text().split("•")[0];

      const title = cleanTitle(titleElement.text());
      const href = card.find("a[href]").first().attr("href") ?? "";
      const image =
        card.find("[data-testid='product-image'] img").first().attr("src") ??
        card.find("img").first().attr("src") ??
        "";
      const score = extractScore(card);

      return {
        title,
        url: getAbsoluteUrl(href),
        score,
        thumbnail: image,
        release_date: releaseDateText ?? '',
      };
    })
    .filter((card) =>
      Boolean(card.title || card.url || card.score || card.thumbnail || card.release_date),
    );
};
