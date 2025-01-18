import { defaultLimit, defaultPage } from '../constants';

export function buildPagination(
  limit: string,
  page: string,
): { _limit: number; _page: number } {
  const _limit = Number(limit) ? Number(limit) : defaultLimit;
  const _page = Number(page) ? Number(page) - 1 : defaultPage;
  return { _limit, _page };
}
