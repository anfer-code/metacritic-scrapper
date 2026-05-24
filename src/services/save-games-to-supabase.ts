import type { CardGameInfo } from "../interfaces/card-game-info.ts";
import { SupabaseGamesRepository } from "../repositories/supabase-games-repository.ts";

export const saveGamesToSupabase = async (
  games: CardGameInfo[],
): Promise<void> => {
  console.log("Enviando datos a Supabase...");

  const uniqueGames = removeDuplicateGamesByTitle(games);
  const { data, error } = await SupabaseGamesRepository.upsert(uniqueGames);

  if (error) {
    console.error("Error al insertar en Supabase:", error);
    return;
  }

  console.log("Datos enviados a Supabase correctamente:", data);
};

const removeDuplicateGamesByTitle = (
  games: CardGameInfo[],
): CardGameInfo[] =>
  Array.from(new Map(games.map((game) => [game.title, game])).values());