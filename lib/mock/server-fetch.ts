import { mockResponseFor } from "./patch-server";

export async function serverFetch(
  input: string,
  init?: RequestInit,
): Promise<Response> {
  const mocked = await mockResponseFor(input, init);
  if (mocked) return mocked;
  return fetch(input, init);
}
