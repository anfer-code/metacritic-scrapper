import { MetacriticGamesRepository } from "../repositories/metacritic-games-repository.ts";

export const getAllGamesData = async (url: string) => {
  const data = await MetacriticGamesRepository.execute({
    url,
  });
  return data;
};
