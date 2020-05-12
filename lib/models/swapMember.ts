import * as db from "../db";
import escape from "sql-template-strings";

export type SwapMember = {
  swap_id: number;
  user_id: number;
  selected_playlist_id: string;
  received_playlist_id: string;
  id: number;
};

export const swapMember = {
  getById: async function getById(id: string): Promise<SwapMember> {
    const [swapMember] = await db.query(escape`
        SELECT *
        FROM swap_member
        WHERE id = ${id}
      `);
    return swapMember;
  },

  getBySwapId: async function getBySwapId(
    swap_id: number
  ): Promise<SwapMember[]> {
    return db.query(escape`
      SELECT *
      FROM swap_member
      WHERE swap_id = ${swap_id}
    `);
  },

  create: async function create({ swap_id, user_id }): Promise<SwapMember> {
    const query = escape`
        INSERT INTO swap_member
          (swap_id, user_id)
        VALUES
          (${swap_id}, ${user_id})
      `;
    await db.query(query);
    return await this.getById(swap_id);
  },

  update: async function update({
    id,
    selected_playlist_id,
  }): Promise<SwapMember> {
    const query = escape`
    UPDATE swap_member
    SET selected_playlist_id = ${selected_playlist_id}
    WHERE id=${id}
`;
    await db.query(query);
    return await this.getById(id);
  },
};
