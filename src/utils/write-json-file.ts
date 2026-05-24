import fs from "node:fs";
import path from "node:path";

export const writeJsonFile = (filePath: string, data: unknown): void => {
  const directoryPath = path.dirname(filePath);

  fs.mkdirSync(directoryPath, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};