const SET_PLAYLIST_VIEWER = "SET_PLAYLIST_VIEWER";
const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
const SWAP_RECEIVED = "SWAP_RECEIVED";

export const reducer = (state, action) => {
  switch (action.type) {
    case "SWAP_RECEIVED":
      return {
        ...state,
        ...action,
      };
    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.activeTab,
      };
    case "SET_PLAYLIST_VIEWER":
      return {
        ...state,
        playlistViewer: action.playlistViewer,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export const initialState = {
  swap: undefined,
  currentSwapMember: undefined,
  spotifyId: undefined,
  activeTab: "members",
  playlistViewer: "selected",
};

export type Action =
  | {
      type: typeof SET_PLAYLIST_VIEWER;
      action: { playlistView: "selection" | "selector" | "received" };
    }
  | {
      type: typeof SET_ACTIVE_TAB;
      action: { activeTab: "members" | "entry" | "received" | "settings" };
    };
