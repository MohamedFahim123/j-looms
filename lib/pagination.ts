export function visiblePages(
  current: number,
  total: number,
): Array<number | "gap"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const pages: Array<number | "gap"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("gap");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total - 1) pages.push("gap");
  pages.push(total);
  return pages;
}
