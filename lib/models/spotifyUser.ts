import { db } from "../db";
import escape from "sql-template-strings";

type SpotifyUser = {
  display_name: string;
  external_url: string;
  spotify_id: string;
  image_url: string;
};

export type SpotifyProfile = {
  id: string;
  username: string;
  displayName: string;
  profileUrl: string;
  photos: string[];
  user_id: number;
};

export const spotifyUser = {
  getById: async function getById(id: string): Promise<SpotifyUser> {
    const [spotifyUser] = await db.query(escape`
        SELECT *
        FROM spotify_user
        WHERE id = ${id}
      `);
    return spotifyUser;
  },
  create: async function create(attributes: SpotifyProfile) {
    const {
      display_name,
      external_url,
      spotify_id,
      image_url,
    } = this.serialize(attributes);
    return await db.query(escape`
        INSERT INTO spotify_user
          (display_name, external_url, spotify_id, image_url)
        VALUES
          (${display_name}, ${external_url}, ${spotify_id}, ${image_url})
      `);
  },
  update: async function update({ id, ...attributes }) {
    const updates = Object.keys(attributes).map((field) => {
      return escape`${field}=${attributes[field]}`;
    });
    const query = escape`
      UPDATE spotify_user
        set ${updates}
       WHERE id = ${id}
    `;
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
