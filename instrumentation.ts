export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { installServerMockFetch } = await import("./lib/mock/patch-server");
    installServerMockFetch();
  }
}
