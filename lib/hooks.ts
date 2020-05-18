import { useEffect, useState } from "react";
import Router from "next/router";
import useSWR from "swr";

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

export function useUser({
  redirectTo,
  redirectIfFound,
}: { redirectTo?: string; redirectIfFound?: string } = {}) {
  const { data, error } = useSWR("/api/user", userFetcher);
  const user = data?.user;
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

export function useFeatures({ ids, playlistId }) {
  // TODO: remove playlistId from this function
  // features endpoint doesn't require a playlist id - it's there out of convenience
  // passing in a playlist id here is unnecessary and confusing
  const [features, setFeatures] = useState<Record<string, number> | null>(null);
  useEffect(() => {
    console.log("features:", features);
    async function fetchData() {
      try {
        const request = await fetch(
          `/api/spotify/playlists/${playlistId}/features?ids=${ids}`
        );
        const response = await request.json();
        const { features } = response;
        setFeatures(features);
      } catch (e) {
        console.log("e:", e);
      }
    }
    if (ids && !features) {
      fetchData();
    }
  }, [ids]);
  return features;
}
