const REMOTE_HOST = "join-looms.valureach.com";

export function isMockMode(): boolean {
  return process.env.NEXT_PUBLIC_DATA_MODE !== "live";
}

export function isRemoteApiUrl(url: string): boolean {
  return url.includes(REMOTE_HOST);
}

export function toMockUrl(remote: string): string {
  const url = new URL(remote);
  const path = url.pathname.replace(/^\/api/, "");
  return `/api/mock${path}${url.search}`;
}

export function normalizeApiPath(pathname: string): string {
  const pathOnly = pathname.split("?")[0] || "/";
  let path = pathOnly;
  if (path.startsWith("/api/mock")) {
    path = path.slice("/api/mock".length);
  } else if (path.startsWith("/api")) {
    path = path.slice("/api".length);
  }
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}
