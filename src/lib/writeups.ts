import { getCollection } from 'astro:content';

export const PAGE_SIZE = 12;

export async function getPublishedWriteups() {
  const writeups = await getCollection('writeups');

  return writeups
    .filter((writeup) => !writeup.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function paginateWriteups(writeups: Awaited<ReturnType<typeof getPublishedWriteups>>, page: number) {
  const totalPages = Math.max(1, Math.ceil(writeups.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = writeups.slice(start, start + PAGE_SIZE);

  const prevUrl = currentPage > 1 ? currentPage === 2 ? '/' : `/page/${currentPage - 1}` : undefined;
  const nextUrl = currentPage < totalPages ? `/page/${currentPage + 1}` : undefined;

  return {
    pageItems,
    currentPage,
    totalPages,
    prevUrl,
    nextUrl,
  };
}
