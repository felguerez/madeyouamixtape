import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const userFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

const swapsFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((swaps) => {
      return { swaps: swaps || [] };
    });

const swapFetcher = (url: string) => fetch(url).then((r) => r.json());

export function useSwaps() {
  const { data, error } = useSWR("/api/swaps", swapsFetcher);
  const swaps = data?.swaps;
  const finished = Boolean(data);
  const hasSwaps = Boolean(swaps);

  useEffect(() => {
    if (!finished) return;
  }, [finished, hasSwaps]);
  return error ? null : swaps;
}

export function useSwap(id) {
  if (!id) return;
  const { data, error } = useSWR(`/api/swaps/${id}`, swapFetcher);
  const swap = data?.swap;
  const owner = data?.owner;
  const finished = Boolean(data);
  const hasSwap = Boolean(swap);

  useEffect(() => {
    if (!finished) return;
  }, [finished, hasSwap]);

  return error ? null : { swap, owner };
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
