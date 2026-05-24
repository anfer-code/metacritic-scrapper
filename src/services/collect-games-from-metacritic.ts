import { BASE_URL, GAMES_PATH } from "../config/index.ts";
import type { CardGameInfo } from "../interfaces/card-game-info.ts";
import { parseGameCards } from "../parsers/game-parser.ts";
import { getAllGamesData } from "./get-all-games-data.ts";
import { wait } from "../utils/wait.ts";

const MAX_CARDS_PAGES = 10;
const PAGE_DELAY_IN_MS = 3000;

export const collectGamesFromMetacritic = async (): Promise<CardGameInfo[]> => {
  const allCards: CardGameInfo[] = [];

  for (let pageIndex = 0; pageIndex <= MAX_CARDS_PAGES; pageIndex++) {
    console.log("Procesando pagina:", pageIndex);

    const pageUrl = buildGamesPageUrl(pageIndex);
    const html = await getAllGamesData(pageUrl);
    const cards = parseGameCards(html);

    allCards.push(...cards);

    console.log(pageUrl, "procesada");
    console.log("Total de juegos obtenidos hasta ahora:", allCards.length);

    if (pageIndex < MAX_CARDS_PAGES) {
      await wait(PAGE_DELAY_IN_MS);
    }
  }

  return allCards;
};

const buildGamesPageUrl = (pageIndex: number): string =>
  `${BASE_URL}${GAMES_PATH}${pageIndex > 0 ? `?page=${pageIndex}` : ""}`;