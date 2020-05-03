import fetch from "isomorphic-fetch";
import Layout from "../components/layout";
import * as models from "../lib/models";
import { SpotifyUser } from "../lib/models/spotifyUser";
import { getSession } from "../lib/iron";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Profile = ({
  spotifyUser: { display_name, spotify_id },
  token,
}: {
  spotifyUser: SpotifyUser;
  token: string;
}) => {
  const [playlists, setPlaylists] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      const playlists = await fetch(
        `/api/spotify/users/${spotify_id}/playlists?token=${token}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const { items } = await playlists.json();
      setPlaylists(items);
    }
    if (token && spotify_id) {
      fetchData();
    }
  }, [token, spotify_id]);
  return (
    <Layout>
      <h1>Playlists by {display_name}</h1>
      <div>
        {playlists.length ? (
          <>
            <p>{playlists.length} playlists. Send one of these to your boys!</p>
            <Playlists>
              {playlists.map((playlist) => {
                return (
                  <Playlist key={playlist.id}>
                    <CoverArt src={playlist.images[0].url} />
                    <Metadata>
                      <PlaylistName>{playlist.name}</PlaylistName>
                      <Creator>
                        by{" "}
                        <a href={playlist.owner.href} target="_blank">
                          {playlist.owner.display_name}
                        </a>
                      </Creator>
                    </Metadata>
                  </Playlist>
                );
              })}
            </Playlists>
          </>
        ) : (
          <p>Loading your playlists...</p>
        )}
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  // TODO: how can baseUrl be set by environment variable?
  const baseUrl = "http://localhost:3000";
  const session = await getSession(req);
  const spotifyUser = await models.spotifyUser.getBySpotifyId(
    session.spotify_id
  );
  return {
    props: {
      spotifyUser: { ...spotifyUser } || {},
      token: session.accessToken,
    },
  };
}

const CoverArt = styled.img`
  height: auto;
  width: 160px;
  border-radius: 8px;
  align-self: center;
  margin-bottom: 1rem;
`;

const Playlists = styled.ul`
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
`;

const Playlist = styled.li`
  grid-column: span 1;
  background: #282828;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Creator = styled.span`
  color: rgb(179, 179, 179);
  font-size: 12px;
  display: inline-block;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistName = styled.strong`
  text-overflow: ellipsis;
  width: 160px;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0.5rem;
`;

export default Profile;
