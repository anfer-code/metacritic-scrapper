import { collectAllGames } from "./app/index.ts";

async function main(): Promise<void> {
  await collectAllGames();
}

main().catch((error: unknown) => {
  console.error("Error inesperado:", error);
});
