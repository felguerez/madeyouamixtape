import * as db from "../db";
import escape from "sql-template-strings";

export type User = {
  display_name: string;
  spotify_id: string;
  image_url: string;
  id: number;
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

  getByIds: async function getByIds(ids: number[]): Promise<User[]> {
    if (!ids.length) return Promise.resolve([]);
    return await db.query(escape`
      SELECT *
      FROM user
      WHERE id in (${ids})
    `);
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
    image_url,
  }: User): Promise<User> {
    const query = escape`
        INSERT INTO user
          (display_name, spotify_id, image_url)
        VALUES
          (${display_name}, ${spotify_id}, ${image_url})
      `;
    await db.query(query);
    return await this.getBySpotifyId(spotify_id);
  },

  findOrCreate: async function findOrCreate({
    display_name,
    spotify_id,
    image_url,
  }: {
    display_name: string;
    spotify_id: string;
    image_url: string;
  }): Promise<User> {
    const userBySpotifyId = await this.getBySpotifyId(spotify_id);
    if (userBySpotifyId) return userBySpotifyId;
    return await this.create({
      display_name,
      spotify_id,
      image_url,
    });
  },

  update: async function update({ display_name, id }) {
    const query = escape`
    UPDATE user
    SET display_name = ${display_name}
    WHERE id=${id}`;
    await db.query(query);
    return this.getById(id);
  },
};
