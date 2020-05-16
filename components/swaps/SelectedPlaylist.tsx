import fetch from "isomorphic-fetch";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useSwapDispatch, useSwapState } from "../../contexts/swap-context";
import { ContentCard } from "../../shared/styles";
import { ButtonLink } from "../SwapManager";
import { useRouter } from "next/router";
import Link from "next/link";
import PlaylistTracks from "../../pages/swaps/[id]/PlaylistTracks";

export const SelectedPlaylist = ({
  currentSwapMember: { selected_playlist_id },
}) => {
  const dispatch = useSwapDispatch();
  const router = useRouter();
  const { selectedPlaylist, selectedPlaylistId } = useSwapState();
  useEffect(() => {
    if (!selectedPlaylistId) {
      dispatch({
        type: "SET_SELECTED_PLAYLIST_ID",
        selectedPlaylistId: selected_playlist_id,
      });
    }
  }, [selected_playlist_id]);

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(
        `/api/spotify/playlists/${selectedPlaylistId}`
      ).catch((err) => {
        console.log("err:", err);
      });
      const playlist = await request.json();
      dispatch({ type: "SET_SELECTED_PLAYLIST", playlist });
    }
    if (selectedPlaylistId) {
      fetchData().catch((err) => {
        console.log("err:", err);
      });
    }
  }, [selectedPlaylistId]);
  if (!selectedPlaylist)
    return (
      <BodyContent>
        <h2>Loading...</h2>
      </BodyContent>
    );
  if (router.pathname.includes("selected_playlist")) {
    return (
      <BodyContent>
        <p>playlist goes here</p>
      </BodyContent>
    );
  }
  console.log("selectedPlaylist:", selectedPlaylist);
  return (
    <BodyContent>
      <Container>
        <h2>Selection</h2>
        <p>
          This playlist will be shared with someone else in your group. You'll
          get a new playlist in return.
        </p>
        <p>
          Don't like this one?{" "}
          <ButtonLink
            onClick={() =>
              dispatch({
                type: "SET_PLAYLIST_VIEWER",
                playlistViewer: "selector",
              })
            }
          >
            Choose a new playlist to share
          </ButtonLink>
        </p>
        <ContentCard>
          {selectedPlaylist.images?.length && (
            <CoverArt src={selectedPlaylist.images[0].url} />
          )}
          <Metadata>
            <Copy>
              <PlaylistName>{selectedPlaylist.name}</PlaylistName>
              <Description
                dangerouslySetInnerHTML={{
                  __html: selectedPlaylist.description,
                }}
              />
            </Copy>
            <Creator>
              By{" "}
              <Link
                as={`/users/${selectedPlaylist.owner.id}`}
                href="/users/[spotify_id]"
              >
                <a>{selectedPlaylist.owner.display_name}</a>
              </Link>
            </Creator>
            <TracksCount>
              {selectedPlaylist.tracks.items.length} tracks
            </TracksCount>
          </Metadata>
        </ContentCard>
      </Container>
      <PlaylistTracks playlist={selectedPlaylist} />
    </BodyContent>
  );
};

const BodyContent = styled.div`
  padding: 0;
`;

const Container = styled.div`
  margin-top: 1rem;
`;

const PlaylistName = styled.h3`
  padding: 0;
  margin: 0;
`;

const Copy = styled.div`
  margin: 0 0 auto 0;
`;

const Description = styled.p`
  margin: 0;
`;

const Creator = styled.p`
  display: inline-block;
  margin-bottom: 0;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CoverArt = styled.img`
  height: auto;
  width: 160px;
  border-radius: 8px;
  align-self: center;
  margin-right: 1rem;
`;

const TracksCount = styled.p`
  margin: 0;
  color: rgb(179, 179, 179);
  font-size: 12px;
`;
