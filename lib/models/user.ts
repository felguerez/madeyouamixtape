import { db } from "../db";
import escape from "sql-template-strings";
import { SpotifyProfile } from "./spotifyUser";

type User = {
  display_name: string;
  spotify_id: string;
};

export const user = {
  getById: async function getById(id: string) {
    const [user] = await db.query(escape`
        SELECT *
        FROM "user"
        WHERE id = ${id}
      `);
    return user;
  },

  getBySpotifyId: async function getBySpotifyId(
    spotifyId: string
  ): Promise<User> {
    const query = `
      SELECT *
      FROM user
      WHERE spotify_id = "${spotifyId}"
    `;
    const [user] = await db.query(query);
    return user;
  },

  create: async function create({
    display_name,
    spotify_id,
  }: User): Promise<User> {
    const query = escape`
        INSERT INTO user
          (display_name, spotify_id)
        VALUES
          (${display_name}, ${spotify_id})
      `;
    await db.query(query);
    const [user] = await db.query(`
      SELECT *
      from user
      where spotify_id = "${spotify_id}"
    `);
    return user;
  },
  findOrCreate: async function findOrCreate({
    displayName,
    id: spotify_id,
  }: SpotifyProfile): Promise<User> {
    const userBySpotifyId = await this.getBySpotifyId(spotify_id);
    if (userBySpotifyId) return userBySpotifyId;
    return await this.create({ display_name: displayName, spotify_id });
  },
};
