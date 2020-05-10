import * as db from "../db";
import escape from "sql-template-strings";

export type Swap = {
  title: string;
  description: string;
  owner_id: number;
  swap_group_id: number;
};

export const swap = {
  getById: async function getById(id: string): Promise<Swap> {
    const [swap] = await db.query(escape`
        SELECT *
        FROM swap
        WHERE id = ${id}
      `);
    return swap;
  },

  getSwapsByOwnerId: async function getByOwnerId(
    userId: number
  ): Promise<Swap[]> {
    return await db.query(escape`
      SELECT *
      FROM swap
      WHERE owner_id = ${userId}
    `);
  },

  getSwapsByUserId: async function getByUserId(userId): Promise<Swap[]> {
    const query = escape`
      SELECT swap.id, swap.title, swap.description, spotify_user.display_name AS owner_display_name
      FROM swap
      INNER JOIN swap_member ON swap.id=swap_member.swap_id
      INNER JOIN user ON swap.owner_id=${userId}
      INNER JOIN spotify_user ON user.spotify_id = spotify_user.spotify_id
    `;
    const results = await db.query(query);
    return results;
  },

  create: async function create({
    title = "cool swap",
    description = "we're gonna swap playlists and expand our music palettes",
    owner_id,
  }): Promise<Swap & { id: number }> {
    const query = escape`
        INSERT INTO swap
          (title, description, owner_id)
        VALUES
          (${title}, ${description}, ${owner_id})
      `;
    await db.query(query);
    const swaps = await this.getSwapsByOwnerId(owner_id);
    return swaps[0];
  },
};
