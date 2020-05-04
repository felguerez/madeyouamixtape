import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

const userFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

const swapFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((swaps) => {
      return { swaps: swaps || [] };
    });

export function useSwaps() {
  const { data, error } = useSWR("/api/swaps", swapFetcher);
  const swaps = data?.swaps;
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
