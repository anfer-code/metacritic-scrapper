import { getAllGamesData } from "./src/services/get-all-games-data.ts";
import { getCardGameInfo } from "./src/utils/get-card-game-info.ts";

async function main(): Promise<void> {
  const html = await getAllGamesData();
  const cards = getCardGameInfo(html);
  console.log(cards);
}

main().catch((error: unknown) => {
  console.error("Error inesperado:", error);
});
