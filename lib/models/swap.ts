import { db } from "../db";
import escape from "sql-template-strings";

type Swap = {
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
