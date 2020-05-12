import Router from "next/router";

export const serialize = (values: any) => JSON.parse(JSON.stringify(values));
