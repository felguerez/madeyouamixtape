import { useEffect, useReducer } from "react";
import Router from "next/router";
import useSWR from "swr";
import { Swap } from "./models/swap";
import { SwapMember } from "./models/swapMember";
import { initialState, reducer } from "../contexts/swap-context";

const userFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return {
        user: data?.user || null,
        spotifyUser: data?.spotifyUser || null,
      };
    });

const swapsFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((swaps) => {
      return { swaps: swaps || [] };
    });

const swapFetcher = (url: string) => fetch(url).then((r) => r.json());

export function useMySwaps(userId) {
  const { data, error } = useSWR(`/api/users/${userId}/swaps`, swapsFetcher);
  const swaps = data?.swaps;
  const finished = Boolean(data);
  const hasSwaps = Boolean(swaps);

  useEffect(() => {
    if (!finished) return;
  }, [finished, hasSwaps]);
  return error ? null : swaps;
}

export function useSwaps() {
  const { data, error } = useSWR(`/api/swaps`, swapsFetcher);
  const swaps = data?.swaps;
  const finished = Boolean(data);
  const hasSwaps = Boolean(swaps);

  useEffect(() => {
    if (!finished) return;
  }, [finished, hasSwaps]);
  return error ? null : swaps;
}

export function useSwap(id) {
  const { data, error } = useSWR(`/api/swaps/${id}`, swapFetcher);
  const swap: Swap & {
    members: (SwapMember & { display_name: string })[];
    owner_display_name: string;
  } = data?.swap;
  const currentSwapMember: SwapMember & {
    isOwner: boolean;
    isEnrolled: boolean;
  } = data?.currentSwapMember;
  const spotifyId: string = data?.spotifyId;
  const finished = Boolean(data);

  useEffect(() => {
    if (!finished) return;
  }, [finished]);

  return error ? null : { swap, currentSwapMember, spotifyId };
}

export function useUser({
  redirectTo,
  redirectIfFound,
}: { redirectTo?: string; redirectIfFound?: string } = {}) {
  const { data, error } = useSWR("/api/user", userFetcher);
  const user = data?.user;
  const spotifyUser = data?.spotifyUser;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
}
