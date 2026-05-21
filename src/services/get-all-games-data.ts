import { GetAllGames } from "../repositories/get-all-games.ts";
import { BASE_URL } from "../../config/index.ts";

export const getAllGamesData = async () => {
  const data = await GetAllGames.execute({
    url: `${BASE_URL}/browse/game/`,
  });
  return data;
};
