import {Router} from "next/router";

const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";
const SWAP_RECEIVED = "SWAP_RECEIVED";
const SET_PLAYLISTS = "SET_PLAYLISTS";
const SET_SELECTED_PLAYLIST_ID = "SET_SELECTED_PLAYLIST_ID";
const SET_SELECTED_PLAYLIST = "SET_SELECTED_PLAYLIST";
const SET_RECEIVED_PLAYLIST = "SET_RECEIVED_PLAYLIST";
const SET_PLAYING_NODE = "SET_PLAYING_NODE";

export const initialState = {
  swap: undefined,
  currentSwapMember: undefined,
  spotifyId: undefined,
  activeTab: "members",
  playlists: {
    items: [],
  },
  selectedPlaylistId: "",
  selectedPlaylist: undefined,
  receivedPlaylist: undefined,
  node: undefined,
  playingIndex: undefined,
};

export type Action =
  | {
      type: typeof SET_ACTIVE_TAB;
      activeTab: "selection" | "selector" | "received" | "members";
    }
  | {
      type: typeof SWAP_RECEIVED;
      swap;
      currentSwapMember;
      spotifyId;
    }
  | {
      type: typeof SET_PLAYLISTS;
      playlists: { items: object[] };
    }
  | {
      type: typeof SET_SELECTED_PLAYLIST_ID;
      selectedPlaylistId: string;
    }
  | {
      type: typeof SET_SELECTED_PLAYLIST;
      playlist: {
        items: object[];
        images: { url: string }[];
        description: string;
        owner: object;
      };
    }
  | {
      type: typeof SET_RECEIVED_PLAYLIST;
      playlist: {
        items: object[];
        images: { url: string }[];
        description: string;
        owner: object;
      };
    }
  | {
      type: typeof SET_PLAYING_NODE;
      node: HTMLAudioElement;
      index: number;
    };

import React, { Dispatch } from "react";
export const reducer = (state, action) => {
  switch (action.type) {
    case "SWAP_RECEIVED":
      return {
        ...state,
        ...action,
        selectedPlaylistId: action.currentSwapMember.selected_playlist_id,
      };
    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.activeTab,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_SELECTED_PLAYLIST_ID":
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
        selectedPlaylist: undefined,
      };
    case "SET_SELECTED_PLAYLIST":
      return {
        ...state,
        selectedPlaylist: action.playlist,
      };
    case "SET_RECEIVED_PLAYLIST":
      return {
        ...state,
        receivedPlaylist: action.playlist,
      };
    case "SET_PLAYING_NODE":
      if (state.node) {
        state.node.pause();
        state.node.currentTime = 0;
      }
      if (state.node !== action.node) {
        action.node.play();
      }
      return {
        ...state,
        node: action.node,
        playingIndex: action.index,
      };
    case "STOP_PLAYING_NODE":
      state.node.pause();
      state.node.currentTime = 0;
    default:
      return state;
  }
};

const SwapStateContext = React.createContext(null);
const SwapDispatchContext = React.createContext(null);

function SwapProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <SwapStateContext.Provider value={state}>
      <SwapDispatchContext.Provider value={dispatch}>
        {children}
      </SwapDispatchContext.Provider>
    </SwapStateContext.Provider>
  );
}
function useSwapState() {
  const context = React.useContext<typeof initialState>(SwapStateContext);
  if (context === undefined) {
    throw new Error("useSwapState must be used within a SwapProvider");
  }
  return context;
}
function useSwapDispatch() {
  const context = React.useContext<Dispatch<Action>>(SwapDispatchContext);
  if (context === undefined) {
    throw new Error("useSwapDispatch must be used within a SwapProvider");
  }
  return context;
}
export { SwapProvider, useSwapState, useSwapDispatch };
