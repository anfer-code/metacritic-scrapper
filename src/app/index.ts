import type { CardGameInfo } from "../interfaces/card-game-info.ts";
import { collectGamesFromMetacritic } from "../services/collect-games-from-metacritic.ts";
import { saveGamesToSupabase } from "../services/save-games-to-supabase.ts";

export const collectAllGames = async (): Promise<CardGameInfo[]> => {
  const allCards = await collectGamesFromMetacritic();
  await saveGamesToSupabase(allCards);

  return allCards;
};
