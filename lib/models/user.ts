import { db } from "../db";
import escape from "sql-template-strings";
import { SpotifyUser } from "./spotifyUser";

type User = {
  display_name: string;
  spotify_id: string;
};

export const user = {
  getById: async function getById(id: string) {
    const [user] = await db.query(escape`
        SELECT *
        FROM user
        WHERE id = ${id}
      `);
    return user;
  },

  getBySpotifyId: async function getBySpotifyId(
    spotifyId: string
  ): Promise<User> {
    const [user] = await db.query(escape`
      SELECT *
      FROM user
      WHERE spotify_id = ${spotifyId}
    `);
    return user;
  },

  create: async function create({
    display_name,
    spotify_id,
  }: User): Promise<User & { id: number }> {
    const query = escape`
        INSERT INTO user
          (display_name, spotify_id)
        VALUES
          (${display_name}, ${spotify_id})
      `;
    await db.query(query);
    return await this.getBySpotifyId(spotify_id);
  },
  findOrCreate: async function findOrCreate({
    display_name,
    spotify_id,
  }: SpotifyUser): Promise<User & { id: number }> {
    const userBySpotifyId = await this.getBySpotifyId(spotify_id);
    if (userBySpotifyId) return userBySpotifyId;
    return await this.create({
      display_name,
      spotify_id,
    });
  },
};
