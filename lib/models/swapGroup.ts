import { db } from "../db";
import escape from "sql-template-strings";

type SwapGroup = {
  swap_id: number;
};

export const swapGroup = {
  getById: async function getById(id: string): Promise<SwapGroup> {
    const [swapGroup] = await db.query(escape`
        SELECT *
        FROM swap_group
        WHERE id = ${id}
      `);
    return swapGroup;
  },

  getBySwapId: async function getBySwapId(swap_id: string): Promise<SwapGroup> {
    const [swapGroup] = await db.query(escape`
        SELECT *
        FROM swap_group
        WHERE swap_id = ${swap_id}
      `);
    return swapGroup;
  },

  create: async function create({
    swap_id,
  }): Promise<SwapGroup & { id: number }> {
    const query = escape`
        INSERT INTO swap_group
          (swap_id)
        VALUES
          (${swap_id})
      `;
    await db.query(query);
    return await this.getBySwapId(swap_id);
  },
};
