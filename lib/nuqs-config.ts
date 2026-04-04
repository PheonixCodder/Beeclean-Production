import { createSearchParamsCache, parseAsString } from "nuqs/server";

// 1. Define the parsers
export const searchParams = {
  tag: parseAsString.withDefault(""), // Or .optional() if preferred
  search: parseAsString.withDefault(""),
};

// 2. Create the cache (equivalent to what you were trying to do)
export const createURLQuery = createSearchParamsCache(searchParams);
