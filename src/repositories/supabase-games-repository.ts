import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import type { CardGameInfo } from "../interfaces/card-game-info.ts";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseGamesRepository {
  static async upsert(games: CardGameInfo[]) {
    return supabase.from("Games").upsert(games, { onConflict: "title" });
  }
}