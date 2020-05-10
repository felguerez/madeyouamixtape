import * as db from "../db";
import escape from "sql-template-strings";

export type SpotifyUser = {
  display_name: string;
  external_url: string;
  spotify_id: string;
  image_url: string;
};

export type Seconds = number;

export type SpotifyProfile = {
  id: string;
  username: string;
  displayName: string;
  profileUrl: string;
  photos: string[];
  user_id: number;
};

export const spotifyUser = {
  getById: async function getById(id: number): Promise<SpotifyUser> {
    const [spotifyUser] = await db.query(escape`
        SELECT *
        FROM spotify_user
        WHERE id = ${id}
      `);
    return spotifyUser;
  },
  getBySpotifyId: async function getBySpotifyId(
    id: string
  ): Promise<SpotifyUser> {
    const [spotifyUser] = await db.query(escape`
        SELECT *
        FROM spotify_user
        WHERE spotify_id = ${id}
      `);
    return spotifyUser;
  },
  create: async function create(
    attributes: SpotifyProfile
  ): Promise<SpotifyUser> {
    const {
      display_name,
      external_url,
      spotify_id,
      image_url,
    } = this.serialize(attributes);
    const query = escape`
        INSERT INTO spotify_user
          (display_name, external_url, spotify_id, image_url)
        VALUES
          (${display_name}, ${external_url}, ${spotify_id}, ${image_url})
      `;
    await db.query(query);
    return await this.getBySpotifyId(spotify_id);
  },
  findOrCreate: async function findOrCreate(profile) {
    const spotifyUser = await this.getBySpotifyId(profile.id);
    if (spotifyUser) return spotifyUser;
    return await this.create(profile);
  },
  update: async function update({ id, ...attributes }) {
    const updates = Object.keys(attributes)
      .map((field) => {
        return escape`${field}=${attributes[field]}`;
      })
      .join(",");
    const query = escape`
      UPDATE spotify_user
        SET ${updates}
       WHERE id = ${id}
    `;
    await db.query(query);
    return await this.getById(id);
  },
  serialize: function serialize({
    displayName,
    profileUrl,
    id,
    photos,
  }: SpotifyProfile): SpotifyUser {
    return {
      display_name: displayName,
      external_url: profileUrl,
      spotify_id: id,
      image_url: photos[0],
    };
  },
};
